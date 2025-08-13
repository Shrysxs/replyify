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
