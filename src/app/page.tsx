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
  const [humanizing, setHumanizing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [output, setOutput] = React.useState<string>("");
  const controllerRef = React.useRef<AbortController | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [temperature, setTemperature] = React.useState<number>(0.7);

  // Debug: verify that option selections update parent state
  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      try {
        console.debug("config updated:", config);
      } catch {}
    }
  }, [config]);

  async function handleHumanize() {
    if (!output) return;
    // Cancel any in-flight request
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const ctrl = new AbortController();
    controllerRef.current = ctrl;
    setHumanizing(true);
    setError(null);
    try {
      const payload: Record<string, unknown> = {};
      const t = (s: string) => s.trim();
      // Use current output as input to humanize
      payload.rawInput = t(output);
      if (t(config.tone)) payload.tone = t(config.tone);
      if (t(config.persona)) payload.persona = t(config.persona);
      if (t(config.goal)) payload.goal = t(config.goal);
      if (t(config.topic)) payload.topic = t(config.topic);
      // Add a system nudge to humanize
      payload.system = [
        "Humanize the text to sound natural, conversational, and authentic.",
        "Keep original meaning; improve readability; vary sentence length; use light contractions where appropriate.",
        "Avoid AI-ish hedging or over-explanation; keep it concise and personable.",
        "Output only the rewritten text; no preambles."
      ].join(" ");

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(typeof data?.error === "string" ? data.error : "Failed to humanize");
      }
      setOutput(typeof data?.text === "string" ? data.text : JSON.stringify(data));
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    } finally {
      setHumanizing(false);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      // Fallback
      try {
        const ta = document.createElement("textarea");
        ta.value = output;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch {}
    }
  }

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
      if (typeof temperature === "number") payload.temperature = temperature;

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
            Write what&apos;s on your mind or what you want to convey.
          </li>
          <li>
            Pick a persona, tone, and goal to match your brand and intent.
          </li>
          <li>
            Generate and refine.
          </li>
        </ol>
      </section>

      <section className="grid gap-4">
        <PromptConfigurator
          value={config}
          onChange={setConfig}
        />
        {/* Temperature Slider */}
        <div className="grid gap-2">
          <label htmlFor="temp" className="text-xs uppercase tracking-widest opacity-80">Temperature</label>
          <div className="flex items-center gap-3">
            <input
              id="temp"
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full accent-[var(--accent)]"
              aria-valuemin={0}
              aria-valuemax={1}
              aria-valuenow={Number.isFinite(temperature) ? Number(temperature.toFixed(2)) : 0.7}
            />
            <span className="text-xs tabular-nums opacity-80 w-10 text-right">{temperature.toFixed(2)}</span>
          </div>
          <p className="text-[11px] opacity-60">
            Lower = more focused. Higher = more creative.
          </p>
        </div>
      </section>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading || humanizing || !config.input}
          aria-busy={loading}
          aria-controls="reply-output"
          className="border px-5 py-2 text-xs uppercase tracking-wider disabled:opacity-50
                     border-[var(--accent)] text-[var(--accent)] hover:opacity-90"
        >
          {loading ? "GENERATING…" : "GENERATE"}
        </button>
        <button
          type="button"
          onClick={handleHumanize}
          disabled={humanizing || loading || !output}
          aria-busy={humanizing}
          className="border border-white/30 px-4 py-2 text-xs uppercase tracking-wider disabled:opacity-50 hover:border-white/60"
        >
          {humanizing ? "HUMANIZING…" : "HUMANIZE"}
        </button>
        {error ? (
          <span role="alert" aria-live="assertive" className="text-xs text-red-400 uppercase tracking-wide">{error}</span>
        ) : null}
      </div>

      {output ? (
        <section id="reply-output" className="terminal p-4" aria-live="polite">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] uppercase opacity-75">OUTPUT</div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                disabled={!output}
                className="border border-white/30 px-2 py-1 text-[10px] uppercase tracking-widest disabled:opacity-50 hover:border-white/60"
                aria-label="Copy output to clipboard"
              >
                {copied ? "COPIED" : "COPY"}
              </button>
            </div>
          </div>
          <div className="whitespace-pre-wrap leading-relaxed typewriter">{output}</div>
        </section>
      ) : null}
    </main>
  );
}
