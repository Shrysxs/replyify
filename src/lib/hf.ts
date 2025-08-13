import axios, { AxiosError } from "axios";

// Helper for server-side usage to call Hugging Face Inference API
// Ensure HF_API_KEY is set in your .env.local (do NOT expose it on the client)
const HF_API_KEY = process.env.HF_API_KEY ?? process.env.HF_API_TOKEN;

const MODEL = process.env.HF_MODEL?.trim() || "tiiuae/falcon-7b-instruct";

export async function generateText(prompt: string): Promise<string> {
  if (!HF_API_KEY) {
    throw new Error("HF_API_KEY/HF_API_TOKEN is not set in environment");
  }

  try {
    const doCall = async (model: string) => {
      return axios.post(
        `https://api-inference.huggingface.co/models/${model}`,
        {
          inputs: prompt,
          parameters: {
            max_new_tokens: 200,
            temperature: 0.7,
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
          timeout: 60_000,
        }
      );
    };

    const maxAttempts = 3;
    const backoff = (n: number) => new Promise((r) => setTimeout(r, 500 * Math.pow(2, n)));

    let lastErr: unknown = null;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const response = await doCall(MODEL);
        // HF may return array or object; normalize to text
        const data = response.data;
        if (Array.isArray(data)) {
          const first = data[0] as Record<string, unknown> | undefined;
          const gt = first?.["generated_text"];
          const st = first?.["summary_text"];
          if (typeof gt === "string") return gt;
          if (typeof st === "string") return st;
        } else if (data && typeof data === "object") {
          const rec = data as Record<string, unknown>;
          const gt = rec["generated_text"];
          const st = rec["summary_text"];
          if (typeof gt === "string") return gt;
          if (typeof st === "string") return st;
        }
        return "";
      } catch (e) {
        lastErr = e;
        const ax = e as AxiosError;
        const status = ax.response?.status ?? 0;
        const body = ax.response?.data;
        // If 404/403, try fallback model if provided
        if ((status === 404 || status === 403) && process.env.HF_FALLBACK_MODEL) {
          try {
            const response = await doCall(process.env.HF_FALLBACK_MODEL);
            const data = response.data;
            if (Array.isArray(data)) {
              const first = data[0] as Record<string, unknown> | undefined;
              const gt = first?.["generated_text"];
              const st = first?.["summary_text"];
              if (typeof gt === "string") return gt;
              if (typeof st === "string") return st;
            } else if (data && typeof data === "object") {
              const rec = data as Record<string, unknown>;
              const gt = rec["generated_text"];
              const st = rec["summary_text"];
              if (typeof gt === "string") return gt;
              if (typeof st === "string") return st;
            }
            return "";
          } catch (fe) {
            lastErr = fe;
          }
          break; // don't retry more on 404/403 after fallback attempt
        }
        // Retry on transient statuses
        if ([429, 500, 502, 503, 504].includes(status) && attempt < maxAttempts - 1) {
          await backoff(attempt);
          continue;
        }
        // Non-retriable or exhausted
        const detailStr = typeof body === "string" ? body : JSON.stringify(body);
        throw new Error(`HF API error (${status}): ${detailStr || ax.message}`);
      }
    }
    throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));

  } catch (error: unknown) {
    const err = error as any;
    const detail = err?.response?.data || err?.message || err;
    const detailStr = typeof detail === "string" ? detail : JSON.stringify(detail);
    throw new Error(`HF API error: ${detailStr}`);
  }
}
