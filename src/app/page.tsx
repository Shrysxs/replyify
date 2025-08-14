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
  const controllerRef = React.useRef<AbortController | null>(null);

  async function handleGenerate() {
    // Cancel any in-flight request to keep UI responsive
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const ctrl = new AbortController();
    controllerRef.current = ctrl;
    setLoading(true);
    setError(null);
    setOutput("");
    try {
      const payload: Record<string, unknown> = {};
      const t = (s: string) => s.trim();
      if (t(config.input)) payload.rawInput = t(config.input);
      if (t(config.tone)) payload.tone = t(config.tone);
      if (t(config.persona)) payload.persona = t(config.persona);
      if (t(config.goal)) payload.goal = t(config.goal);
      if (t(config.topic)) payload.topic = t(config.topic);

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(typeof data?.error === "string" ? data.error : "Failed to generate reply");
      }
      setOutput(typeof data?.text === "string" ? data.text : JSON.stringify(data));
    } catch (e) {
      // Swallow abort errors; show other errors
      if (e instanceof DOMException && e.name === "AbortError") {
        return;
      }
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl p-6 grid gap-6">
      <header className="grid gap-1">
        <h1 className="text-3xl uppercase tracking-widest">REPLYIFY</h1>
        <p className="text-xs opacity-70 uppercase tracking-wide">
          Turn any message into a concise, on‑brand reply—fast.
        </p>
      </header>

      <section aria-labelledby="how-it-works-title" className="grid gap-2">
        <h2 id="how-it-works-title" className="text-sm uppercase tracking-widest opacity-80">
          How it works
        </h2>
        <ol className="grid gap-2 text-[13px] leading-relaxed list-decimal pl-5">
          <li>
            Paste the message or context you need to respond to.
          </li>
          <li>
            Pick a persona, tone, and goal to match your brand and intent.
          </li>
          <li>
            Generate and refine—copy the reply that fits and ship it.
          </li>
        </ol>
      </section>

      <PromptConfigurator onChange={setConfig} />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading || !config.input}
          aria-busy={loading}
          aria-controls="reply-output"
          className="border px-5 py-2 text-xs uppercase tracking-wider disabled:opacity-50
                     border-[var(--accent)] text-[var(--accent)] hover:opacity-90"
        >
          {loading ? "GENERATING…" : "GENERATE"}
        </button>
        {error ? (
          <span role="alert" aria-live="assertive" className="text-xs text-red-400 uppercase tracking-wide">{error}</span>
        ) : null}
      </div>

      {output ? (
        <section id="reply-output" className="terminal p-4" aria-live="polite">
          <div className="text-[10px] uppercase opacity-75 mb-2">OUTPUT</div>
          <div className="whitespace-pre-wrap leading-relaxed typewriter">{output}</div>
        </section>
      ) : null}
    </main>
  );
}
