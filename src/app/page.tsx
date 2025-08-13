"use client";
import * as React from "react";
import PromptConfigurator from "@/components/prompt/PromptConfigurator";
import type { PromptConfig } from "@/config/promptOptions";

export default function Home() {
  const [config, setConfig] = React.useState<PromptConfig>({
    persona: "",
    tone: "",
    goal: "",
    topic: "",
    input: "",
  });

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Replyify — Prompt Configurator</h1>
      <p className="opacity-70 text-sm">
        Select persona, tone, goal, and topic; then paste the message. Step 2 will wire this to the LLM.
      </p>
      <PromptConfigurator onChange={setConfig} />
      <div className="rounded-xl border border-white/10 p-4">
        <div className="text-xs uppercase opacity-75 mb-2">Live Config (dev)</div>
        <pre className="text-xs overflow-auto">{JSON.stringify(config, null, 2)}</pre>
      </div>
    </main>
  );
}
