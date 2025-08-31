export type PromptConfig = {
  persona: string;
  tone: string;
  goal: string;
  topic: string;
  input: string;
};

export const personas = [
  "friend",
  "customer",
  "investor",
  "hiring-manager",
  "classmate",
  "audience-general",
];

export const tones = [
  "witty",
  "contrarian",
  "formal",
  "casual",
  "playful",
  "empathetic",
  "assertive",
  "minimal",
  "wise",
];

export const goals = [
  "clarify",
  "persuade",
  "support",
  "disagree-politely",
  "apologize",
  "ask-for-help",
  "follow-up",
  "close-deal",
  "network",
];

export const topics = [
  "tech",
  "startups",
  "ai",
  "design",
  "growth",
  "education",
  "philosophy",
  "science",
  "career",
];

// Rich, compact guides that the prompt engine can use to enforce option-specific style.
// Keep descriptions short to minimize tokens while providing clear stylistic targets.
export const personaGuides: Record<string, string> = {
  "friend": "warm, informal, uses simple language, 1-2 short sentences, no jargon",
  "customer": "respectful, professional, acknowledges concerns, proposes a next step",
  "investor": "succinct, metrics-oriented, confident but measured, avoid hype",
  "hiring-manager": "clear, outcome-focused, highlights accountability and timelines",
  "classmate": "casual, collaborative, suggests study/action items",
  "audience-general": "plain language, inclusive, avoids niche jargon",
};

export const toneGuides: Record<string, string> = {
  "witty": "light wordplay, clever but not snarky, avoid sarcasm that could misread",
  "contrarian": "challenge assumptions politely, present 1-2 counterpoints with evidence",
  "formal": "complete sentences, precise vocabulary, no emojis, respectful register",
  "casual": "conversational, contractions ok, friendly, may use emoji sparingly",
  "playful": "upbeat, energetic, tasteful humor, keep it concise",
  "empathetic": "acknowledge feelings, validate, supportive phrasing",
  "assertive": "direct, confident, clear asks, no hedging",
  "minimal": "ultra concise, only essentials, no filler",
  "wise": "measured, reflective, principle-driven phrasing",
};

export const goalGuides: Record<string, string> = {
  "clarify": "ask a precise question or restate in simpler terms",
  "persuade": "state position, give 1-2 reasons/evidence, end with a clear call-to-action",
  "support": "offer encouragement and a specific resource or next step",
  "disagree-politely": "acknowledge point, state disagreement with reason, invite dialogue",
  "apologize": "own the mistake, state fix, avoid excuses",
  "ask-for-help": "state need, provide context, specify the ask",
  "follow-up": "reference prior touchpoint, summarize, propose next step/time",
  "close-deal": "summarize value, address last objection, propose concrete close step",
  "network": "brief intro, clear purpose, low-friction ask",
};

export function summarizeStyle(persona?: string, tone?: string, goal?: string) {
  const parts: string[] = [];
  if (persona && personaGuides[persona]) parts.push(`Persona: ${persona} — ${personaGuides[persona]}`);
  if (tone && toneGuides[tone]) parts.push(`Tone: ${tone} — ${toneGuides[tone]}`);
  if (goal && goalGuides[goal]) parts.push(`Goal: ${goal} — ${goalGuides[goal]}`);
  return parts.join("\n");
}
