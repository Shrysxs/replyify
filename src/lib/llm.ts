import { chatComplete, type ChatMessage } from "@/lib/groq";
import { summarizeStyle } from "@/config/promptOptions";

export type GenerateParams = {
  // Raw thoughts or ideas the user wants to transform into polished text
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
  lines.push("You are Replyify — an efficient assistant that transforms thoughts and ideas into polished, context-aware text.");
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
      "- Transform the user's raw thoughts into polished text that matches the style profile exactly.",
      "- Preserve the user's core intent while improving clarity, flow, and appropriateness for the target audience.",
      "- If 'Context' is provided, treat it as authoritative grounding for the message.",
      "- Do not add disclaimers, meta commentary, or role labels.",
      "- Keep it concise and natural; prefer 1-3 short sentences unless the goal requires more.",
      "- Return only the transformed text."
    ].join("\n")
  );
  return lines.join("\n");
}

// Compose chat messages from structured params or raw user input
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
      "- Transform the input into polished text that strictly matches the style profile (persona/tone/goal).",
      "- Use wording and cadence consistent with the profile.",
      "- Keep the user's core message and specifics; improve clarity and remove unnecessary elements.",
      "- If context supplies facts or constraints, reflect them appropriately in the output.",
      "- Output only the transformed text.",
    ].join("\n")
  );
  parts.push(`\nInput:\n"""\n${input}\n"""`);

  return [
    { role: "system", content: sys },
    { role: "user", content: parts.join("\n\n") },
  ];
}

// Single, clear entry point for context-aware text generation
export async function generateText(params: GenerateParams | string): Promise<string> {
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
