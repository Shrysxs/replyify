import axios, { AxiosError } from "axios";

// Server-side helper to call Groq's OpenAI-compatible Chat Completions API
// Ensure GROQ_API_KEY is set in your environment (never expose it on the client)
const GROQ_API_KEY = process.env.GROQ_API_KEY || process.env.GROQ_KEY;

const MODEL =
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

export async function generateText(prompt: string): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not set in environment");
  }

  const payload = {
    model: MODEL,
    messages: [{ role: "user", content: prompt }],
    temperature: TEMPERATURE,
    max_tokens: MAX_TOKENS,
    stream: false,
    ...(STOP_SEQS.length ? { stop: STOP_SEQS } : {}),
  };

  try {
    const resp = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      payload,
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: TIMEOUT_MS,
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
