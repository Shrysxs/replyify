import { generateText as groqGenerateText } from "../lib/groq";

export async function generateReply({
  baseText,
  tone,
  persona,
  goal,
  topic,
}: {
  baseText: string;
  tone: string;
  persona: string;
  goal: string;
  topic?: string;
}): Promise<string> {
  // GROQ_API_KEY is validated inside lib/groq

  const lines: string[] = [];
  lines.push(`You are acting as a ${persona || "helpful assistant"} with a ${tone || "neutral"} tone.`);
  lines.push(`Your goal is to ${goal || "assist the user effectively"}.`);
  if (topic && topic.trim()) {
    lines.push(`Topic: ${topic.trim()}.`);
  }
  lines.push(`Base text: "${baseText}"`);
  lines.push(
    "Generate the best possible version of this text that aligns with the tone, persona, and goal. Keep it clear and engaging."
  );

  const prompt = lines.join("\n");

  if (process.env.NODE_ENV !== "production") {
    try {
      console.debug("[LLM] Constructed prompt:\n" + prompt);
    } catch {}
  }

  try {
    const text = (await groqGenerateText(prompt)).trim();

    if (process.env.NODE_ENV !== "production") {
      try {
        console.debug("[LLM] Model output (preview):", text.slice(0, 300));
      } catch {}
    }

    if (!text) {
      throw new Error("Empty response from Groq API");
    }

    return text;
  } catch (err: unknown) {
    const ax = err as { response?: { status?: number; data?: unknown }; message?: string };
    const status = ax?.response?.status;
    const detail = ax?.response?.data ?? ax?.message ?? String(err);
    const detailStr = typeof detail === "string" ? detail : JSON.stringify(detail);
    throw new Error(`Groq API error${status ? ` (${status})` : ""}: ${detailStr}`);
  }
}
