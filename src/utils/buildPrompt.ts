export function buildPrompt(
  rawInput: string,
  tone: string,
  persona: string,
  goal: string,
  topic?: string
): string {
  return `
You are Replyify — an AI assistant specialized in refining messages.

Persona: ${persona}
Tone: ${tone}
Goal: ${goal}
Topic: ${topic || "None"}

Task: Rewrite the following message so it:
- Preserves the user’s intent
- Matches the persona, tone, and goal
- Feels natural and engaging
- Is clear and ready to post

Raw input:
"""
${rawInput}
"""
`;
}
