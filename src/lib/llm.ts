import { chatComplete, type ChatMessage } from "@/lib/groq";
import { summarizeStyle } from "@/config/promptOptions";

export type GenerateParams = {
  // Primary text provided by the user (conversation, draft tweet, thought, etc.)
  input?: string;
  // Structured controls
  tone?: string;
  persona?: string;
  goal?: string;
  topic?: string;
  // Additional context that model can use as grounding
  context?: string;
  // Optional system prompt override/addition
  system?: string;
  // Model selection and tunables
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stop?: string[];
};

// Default system message that bakes in Replyify persona/behavior
export function defaultSystemPrompt({ persona, tone, goal }: { persona?: string; tone?: string; goal?: string }) {
  const lines: string[] = [];
  lines.push("You are Replyify — an efficient assistant that rewrites and drafts short, high-signal replies.");
  const style = summarizeStyle(persona, tone, goal);
  if (style) {
    lines.push("\nStyle profile:");
    lines.push(style);
  } else {
    if (persona) lines.push(`Adopt the persona of: ${persona}.`);
    if (tone) lines.push(`Write with a ${tone} tone.`);
    if (goal) lines.push(`Primary goal: ${goal}.`);
  }
  lines.push(
    [
      "\nGuidelines:",
      "- Mirror the style profile exactly (diction, register, sentence length, directness).",
      "- Preserve the user's intent; improve clarity and flow.",
      "- If 'Context' is provided, treat it as authoritative grounding.",
      "- Do not add disclaimers, meta commentary, or role labels.",
      "- Keep it concise; prefer 1-3 short sentences unless the goal requires more.",
      "- Return only the rewritten text."
    ].join("\n")
  );
  return lines.join("\n");
}

// Compose chat messages from structured params or a raw user string
function composeMessages(params: GenerateParams | string): ChatMessage[] {
  if (typeof params === "string") {
    // raw input, minimal system prompt
    return [
      { role: "system", content: defaultSystemPrompt({}) },
      { role: "user", content: params },
    ];
  }

  const { input = "", tone, persona, goal, topic, context, system } = params;

  const sys = [defaultSystemPrompt({ persona, tone, goal }), system].filter(Boolean).join("\n\n");

  const parts: string[] = [];
  if (topic) parts.push(`Topic: ${topic}`);
  if (context && context.trim()) {
    parts.push(`Context (authoritative grounding when relevant):\n${context.trim()}`);
  }
  parts.push(
    [
      "Task:",
      "- Rewrite to strictly match the style profile (persona/tone/goal).",
      "- Use wording and cadence consistent with the profile.",
      "- Keep specifics from the input; remove fluff; fix clarity.",
      "- If context supplies facts or constraints, reflect them explicitly.",
      "- Output only the rewritten text.",
    ].join("\n")
  );
  parts.push(`\nInput:\n"""\n${input}\n"""`);

  return [
    { role: "system", content: sys },
    { role: "user", content: parts.join("\n\n") },
  ];
}

// Single, clear entry point for LLM calls
export async function generateReply(params: GenerateParams | string): Promise<string> {
  const messages = composeMessages(params);
  const opts = typeof params === "string" ? {} : params;
  const text = await chatComplete({
    messages,
    model: opts?.model,
    temperature: opts?.temperature,
    maxTokens: opts?.maxTokens,
    stop: opts?.stop,
  });

  // Basic output formatting: trim and collapse excessive whitespace
  const formatted = text.replace(/\n{3,}/g, "\n\n").trim();
  return formatted;
}
