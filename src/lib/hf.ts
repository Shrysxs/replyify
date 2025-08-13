import axios, { AxiosError } from "axios";

// Helper for server-side usage to call Hugging Face Inference API
// Ensure HF_API_KEY is set in your .env.local (do NOT expose it on the client)
const HF_API_KEY = process.env.HF_API_KEY ?? process.env.HF_API_TOKEN;

const MODEL = process.env.HF_MODEL?.trim() || "tiiuae/falcon-7b-instruct";
const USE_ROUTER = ["1", "true", "yes"].includes(
  (process.env.HF_USE_ROUTER || process.env.HF_USE_CHAT || "").toLowerCase()
);

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };
type ChatChoice = { index?: number; message?: ChatMessage; finish_reason?: string };
type ChatCompletion = { id?: string; object?: string; created?: number; model?: string; choices?: ChatChoice[] };

// Tunables via env
const TIMEOUT_MS = Number(process.env.HF_TIMEOUT_MS || 120_000);
const MAX_NEW_TOKENS = Number(process.env.HF_MAX_NEW_TOKENS || 200);
const MAX_TOKENS = Number(process.env.HF_MAX_TOKENS || 200); // for router
const TEMPERATURE = Number(process.env.HF_TEMPERATURE || 0.7);
const STOP_SEQS = (process.env.HF_STOP || "").split(",").map((s) => s.trim()).filter(Boolean);

export async function generateText(prompt: string): Promise<string> {
  if (!HF_API_KEY) {
    throw new Error("HF_API_KEY/HF_API_TOKEN is not set in environment");
  }

  try {
    const doCall = async (model: string) => {
      if (USE_ROUTER) {
        // OpenAI-compatible Chat Completions via HF Router
        const payload = {
          model,
          messages: [{ role: "user", content: prompt }] as ChatMessage[],
          stream: false,
          max_tokens: MAX_TOKENS,
          temperature: TEMPERATURE,
          ...(STOP_SEQS.length ? { stop: STOP_SEQS } : {}),
        };
        return axios.post(
          "https://router.huggingface.co/v1/chat/completions",
          payload,
          {
            headers: {
              Authorization: `Bearer ${HF_API_KEY}`,
              "Content-Type": "application/json",
            },
            timeout: TIMEOUT_MS,
          }
        );
      }
      // Fallback to direct model Inference API
      return axios.post(
        `https://api-inference.huggingface.co/models/${model}`,
        {
          inputs: prompt,
          parameters: {
            max_new_tokens: MAX_NEW_TOKENS,
            temperature: TEMPERATURE,
            return_full_text: false,
          },
          options: {
            wait_for_model: true,
            use_cache: true,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${HF_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: TIMEOUT_MS,
        }
      );
    };

    const maxAttempts = 3;
    const backoff = (n: number) => new Promise((r) => setTimeout(r, 500 * Math.pow(2, n)));

    let lastErr: unknown = null;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const response = await doCall(MODEL);
        const data = response.data;

        // Minimal debug to help troubleshoot unexpected shapes
        if (process.env.NODE_ENV !== "production") {
          try {
            const preview = typeof data === "string" ? data.slice(0, 200) : JSON.stringify(data).slice(0, 200);
            console.debug("HF raw response preview:", preview);
          } catch {}
        }

        // Normalize possible HF shapes
        const normalize = (d: unknown): string | null => {
          if (!d) return null;
          if (typeof d === "string") return d;
          // Router chat completions shape
          if (USE_ROUTER && typeof d === "object") {
            const cc = d as ChatCompletion;
            const content = cc?.choices?.[0]?.message?.content;
            if (typeof content === "string" && content.trim()) return content;
          }
          // Common HF shapes
          if (Array.isArray(d)) {
            const first = d[0] as Record<string, unknown> | undefined;
            if (!first) return null;
            if (typeof first["generated_text"] === "string") return first["generated_text"] as string;
            if (typeof first["summary_text"] === "string") return first["summary_text"] as string;
            if (typeof first["text"] === "string") return first["text"] as string;
          } else if (typeof d === "object") {
            const rec = d as Record<string, unknown>;
            if (typeof rec["generated_text"] === "string") return rec["generated_text"] as string;
            if (typeof rec["summary_text"] === "string") return rec["summary_text"] as string;
            if (typeof rec["text"] === "string") return rec["text"] as string;
            // Some models return { outputs: [{ generated_text: ... }] }
            const outputs = rec["outputs"] as unknown;
            if (Array.isArray(outputs)) {
              const first = outputs[0] as Record<string, unknown> | undefined;
              if (first) {
                if (typeof first["generated_text"] === "string") return first["generated_text"] as string;
                if (typeof first["summary_text"] === "string") return first["summary_text"] as string;
                if (typeof first["text"] === "string") return first["text"] as string;
              }
            }
          }
          return null;
        };

        const text = normalize(data);
        if (typeof text === "string" && text.trim()) return text.trim();

        // If nothing recognizable, return empty to signal 502 upstream
        return "";
      } catch (e) {
        lastErr = e;
        const ax = e as AxiosError;
        const status = ax.response?.status ?? 0;
        const code = (ax as AxiosError & { code?: string }).code ?? "";
        const body = ax.response?.data;
        // If 404/403, try fallback model if provided
        if ((status === 404 || status === 403) && process.env.HF_FALLBACK_MODEL) {
          try {
            const response = await doCall(process.env.HF_FALLBACK_MODEL);
            const data = response.data;
            // Reuse normalization
            const normalize = (d: unknown): string | null => {
              if (!d) return null;
              if (typeof d === "string") return d;
              if (USE_ROUTER && typeof d === "object") {
                const cc = d as ChatCompletion;
                const content = cc?.choices?.[0]?.message?.content;
                if (typeof content === "string" && content.trim()) return content;
              }
              if (Array.isArray(d)) {
                const first = d[0] as Record<string, unknown> | undefined;
                if (!first) return null;
                if (typeof first["generated_text"] === "string") return first["generated_text"] as string;
                if (typeof first["summary_text"] === "string") return first["summary_text"] as string;
                if (typeof first["text"] === "string") return first["text"] as string;
              } else if (typeof d === "object") {
                const rec = d as Record<string, unknown>;
                if (typeof rec["generated_text"] === "string") return rec["generated_text"] as string;
                if (typeof rec["summary_text"] === "string") return rec["summary_text"] as string;
                if (typeof rec["text"] === "string") return rec["text"] as string;
                const outputs = rec["outputs"] as unknown;
                if (Array.isArray(outputs)) {
                  const first = outputs[0] as Record<string, unknown> | undefined;
                  if (first) {
                    if (typeof first["generated_text"] === "string") return first["generated_text"] as string;
                    if (typeof first["summary_text"] === "string") return first["summary_text"] as string;
                    if (typeof first["text"] === "string") return first["text"] as string;
                  }
                }
              }
              return null;
            };
            const text = normalize(data);
            if (typeof text === "string" && text.trim()) return text.trim();
            return "";
          } catch (fe) {
            lastErr = fe;
          }
          break; // don't retry more on 404/403 after fallback attempt
        }
        // Retry on transient statuses or timeouts
        if (([429, 500, 502, 503, 504].includes(status) || code === "ECONNABORTED") && attempt < maxAttempts - 1) {
          await backoff(attempt);
          continue;
        }
        // Non-retriable or exhausted
        const detailStr = typeof body === "string" ? body : JSON.stringify(body);
        console.error("HF API error detail:", status, detailStr || ax.message);
        throw new Error(`HF API error (${status}): ${detailStr || ax.message}`);
      }
    }
    throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));

  } catch (error: unknown) {
    const err = error as { response?: { data?: unknown }; message?: string } | unknown;
    const detail = (err as { response?: { data?: unknown } })?.response?.data || (err as { message?: string })?.message || err;
    const detailStr = typeof detail === "string" ? detail : JSON.stringify(detail);
    throw new Error(`HF API error: ${detailStr}`);
  }
}
