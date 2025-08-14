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
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [output, setOutput] = React.useState<string>("");

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setOutput("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseText: config.input,
          tone: config.tone,
          persona: config.persona,
          goal: config.goal,
          topic: config.topic,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(typeof data?.error === "string" ? data.error : "Failed to generate reply");
      }
      setOutput(typeof data?.text === "string" ? data.text : JSON.stringify(data));
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Replyify — Prompt Configurator</h1>
      <p className="opacity-70 text-sm">
        Select persona, tone, goal, and topic; then paste the message. Step 2 will wire this to the LLM.
      </p>
      <PromptConfigurator onChange={setConfig} />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading || !config.input}
          className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/5 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Reply"}
        </button>
        {error ? (
          <span className="text-sm text-red-400">{error}</span>
        ) : null}
      </div>
      <div className="rounded-xl border border-white/10 p-4">
        <div className="text-xs uppercase opacity-75 mb-2">Live Config (dev)</div>
        <pre className="text-xs overflow-auto">{JSON.stringify(config, null, 2)}</pre>
      </div>
      {output ? (
        <div className="rounded-xl border border-white/10 p-4">
          <div className="text-xs uppercase opacity-75 mb-2">Generated Reply</div>
          <div className="whitespace-pre-wrap leading-relaxed">{output}</div>
        </div>
      ) : null}
    </main>
  );
}
