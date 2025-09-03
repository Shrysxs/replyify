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
      "- Transform the user's raw thoughts into natural text that matches the style profile exactly.",
      "- Match the LENGTH of the input - short input = short output, longer input = proportionally longer output.",
      "- STRICTLY embody the selected persona, tone, and goal - don't deviate from these choices.",
      "- Write like a real person would - avoid overly polished or AI-sounding language.",
      "- Use natural flow, contractions, and conversational patterns appropriate for the persona/tone.",
      "- TEMPERATURE EFFECTS: Lower temp (0.0-0.3) = more predictable, focused, conservative word choices. Higher temp (0.7-1.0) = more creative, varied, spontaneous expressions.",
      "- If 'Context' is provided, treat it as authoritative grounding for the message.",
      "- Do not add disclaimers, meta commentary, or role labels.",
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
      "- Transform the input into natural, human-sounding text that STRICTLY matches the style profile (persona/tone/goal).",
      "- Keep output length proportional to input length - don't expand a simple message into an essay.",
      "- EXACTLY embody the selected persona, tone, and goal - these are non-negotiable requirements.",
      "- Apply temperature setting: LOW temp = safe, predictable phrasing. HIGH temp = creative, varied, unexpected word choices.",
      "- Write like a real person would - avoid overly formal or AI-generated patterns.",
      "- Keep the user's core message and specifics; make it sound authentic and conversational.",
      "- If context supplies facts or constraints, reflect them naturally in the output.",
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
