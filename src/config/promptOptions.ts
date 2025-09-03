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

// Removed unused topics array - not referenced anywhere in the codebase

// Rich, compact guides that the prompt engine can use to enforce option-specific style.
// Keep descriptions short to minimize tokens while providing clear stylistic targets.
export const personaGuides: Record<string, string> = {
  "friend": "warm, informal, uses simple language, match input length exactly, no jargon",
  "customer": "respectful, professional, acknowledges concerns, proportional length to input",
  "investor": "succinct, metrics-oriented, confident but measured, avoid hype, brief responses",
  "hiring-manager": "clear, outcome-focused, highlights accountability, match input brevity",
  "classmate": "casual, collaborative, suggests study/action items, keep it short like input",
  "audience-general": "plain language, inclusive, avoids niche jargon, proportional to input length",
};

export const toneGuides: Record<string, string> = {
  "witty": "light wordplay, clever but not snarky, match input length, avoid sarcasm",
  "contrarian": "challenge assumptions politely, brief counterpoints, proportional to input",
  "formal": "complete sentences, precise vocabulary, no emojis, match input length",
  "casual": "conversational, contractions ok, friendly, keep length proportional to input",
  "playful": "upbeat, energetic, tasteful humor, stay concise like input",
  "empathetic": "acknowledge feelings, validate, supportive phrasing, match input brevity",
  "assertive": "direct, confident, clear asks, no hedging, proportional length",
  "minimal": "ultra concise, only essentials, no filler, extremely brief",
  "wise": "measured, reflective, principle-driven phrasing, match input length",
};

export const goalGuides: Record<string, string> = {
  "clarify": "ask a precise question or restate in simpler terms, keep it brief",
  "persuade": "state position, give 1-2 reasons, clear call-to-action, match input length",
  "support": "offer encouragement and specific resource, proportional to input length",
  "disagree-politely": "acknowledge point, state disagreement with reason, keep it concise",
  "apologize": "own the mistake, state fix, avoid excuses, match input brevity",
  "ask-for-help": "state need, provide context, specify the ask, proportional length",
  "follow-up": "reference prior touchpoint, summarize, propose next step, keep it brief",
  "close-deal": "summarize value, address objection, concrete close step, match input length",
  "network": "brief intro, clear purpose, low-friction ask, stay concise",
};

export function summarizeStyle(persona?: string, tone?: string, goal?: string) {
  const parts: string[] = [];
  if (persona && personaGuides[persona]) parts.push(`Persona: ${persona} — ${personaGuides[persona]}`);
  if (tone && toneGuides[tone]) parts.push(`Tone: ${tone} — ${toneGuides[tone]}`);
  if (goal && goalGuides[goal]) parts.push(`Goal: ${goal} — ${goalGuides[goal]}`);
  return parts.join("\n");
}
