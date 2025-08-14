import axios, { AxiosError } from "axios";
import https from "https";

// Server-side helper to call Groq's OpenAI-compatible Chat Completions API
// Ensure GROQ_API_KEY is set in your environment (never expose it on the client)
const GROQ_API_KEY = process.env.GROQ_API_KEY || process.env.GROQ_KEY;

const DEFAULT_MODEL =
  (process.env.GROQ_MODEL && process.env.GROQ_MODEL.trim()) ||
  "meta-llama/llama-4-scout-17b-16e-instruct";

// Tunables via env
const TIMEOUT_MS = Number(process.env.GROQ_TIMEOUT_MS || 120_000);
const MAX_TOKENS = Number(process.env.GROQ_MAX_TOKENS || 512);
const TEMPERATURE = Number(process.env.GROQ_TEMPERATURE || 0.7);
const STOP_SEQS = (process.env.GROQ_STOP || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export async function chatComplete({
  messages,
  model,
  temperature,
  maxTokens,
  stop,
}: {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stop?: string[];
}): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not set in environment");
  }

  const payload = {
    model: (model && model.trim()) || DEFAULT_MODEL,
    messages,
    temperature: typeof temperature === "number" ? temperature : TEMPERATURE,
    max_tokens: typeof maxTokens === "number" ? maxTokens : MAX_TOKENS,
    stream: false,
    ...(((stop && stop.length ? stop : STOP_SEQS).length)
      ? { stop: (stop && stop.length ? stop : STOP_SEQS) }
      : {}),
  };

  try {
    const httpsAgent = new https.Agent({ keepAlive: true, keepAliveMsecs: 1000, maxSockets: 50 });
    const resp = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      payload,
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: TIMEOUT_MS,
        httpsAgent,
      }
    );

    const data = resp.data as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const text = data?.choices?.[0]?.message?.content || "";
    return (text || "").trim();
  } catch (e) {
    const ax = e as AxiosError;
    const status = ax.response?.status ?? 0;
    const body = ax.response?.data;
    const detailStr = typeof body === "string" ? body : JSON.stringify(body || ax.message);
    throw new Error(`Groq API error (${status}): ${detailStr}`);
  }
}

// Backward-compatible simple call for single user prompt
export async function generateText(prompt: string, opts?: { model?: string }): Promise<string> {
  return chatComplete({ messages: [{ role: "user", content: prompt }], model: opts?.model });
}
