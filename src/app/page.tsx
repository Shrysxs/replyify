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
      // Add a system nudge to humanize with mobile keyboard style
      payload.system = [
        "Make this sound like it was typed on a mobile keyboard by a real person.",
        "Remove formal punctuation - minimal commas, periods, semicolons.",
        "Use natural mobile typing patterns: contractions, lowercase starts, casual flow.",
        "Add subtle imperfections like missing apostrophes, run-on sentences, natural pauses.",
        "Make it feel spontaneous and conversational, not polished or AI-generated.",
        "Keep the core meaning but make it sound authentically human-typed.",
        "Output only the humanized text."
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
    } catch {
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
        throw new Error(typeof data?.error === "string" ? data.error : "Failed to generate text");
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
    <main className="mx-auto max-w-6xl p-6 grid gap-6">
      <header className="grid gap-2">
        <div className="flex items-center justify-between gap-3">
          <h1 className="retro text-3xl uppercase tracking-widest">REPLYIFY</h1>
          <a
            href="https://x.com/xshrey_9"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open X profile @xshrey_9"
            className="no-underline opacity-90 hover:opacity-100 transition-opacity"
            style={{ color: "var(--foreground)" }}
          >
            <div className="glass neon-hover rounded-full p-2 border border-white/20">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                className="block"
              >
                <path
                  fill="currentColor"
                  d="M18.244 2.25 12.98 8.248 8.6 2.25H2l7.513 9.898L2 21.75h6.6l4.38-5.998 5.27 5.998H23l-7.9-9.76 7.4-9.74h-4.256Z"
                />
              </svg>
              <span className="sr-only">X</span>
            </div>
          </a>
        </div>
        <p className="text-xs opacity-70 uppercase tracking-wide">
          Transform your thoughts into polished, context-aware text—fast.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <section aria-labelledby="how-it-works-title" className="grid gap-2 glass neon-hover p-4">
          <h2 id="how-it-works-title" className="text-sm uppercase tracking-widest opacity-90 retro">
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
          <div className="grid gap-2 glass neon-hover p-4">
            <div className="flex items-center justify-between">
              <label htmlFor="temp" className="text-xs uppercase tracking-widest opacity-90">Temperature</label>
              <div className="tooltip text-[11px] opacity-80">
                <span className="underline decoration-dotted cursor-help">effects</span>
                <span className="tooltip-content">0.0-0.3: Conservative, predictable | 0.4-0.6: Balanced | 0.7-1.0: Creative, varied, spontaneous</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="temp"
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full glow-range"
                aria-valuemin={0}
                aria-valuemax={1}
                aria-valuenow={Number.isFinite(temperature) ? Number(temperature.toFixed(2)) : 0.7}
              />
              <span className="text-xs tabular-nums opacity-80 w-10 text-right">{temperature.toFixed(2)}</span>
            </div>
          </div>
        </section>

        <section className="grid content-start gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading || humanizing || !config.input}
              aria-busy={loading}
              aria-controls="reply-output"
              className="glass neon-hover border px-5 py-2 text-xs uppercase tracking-wider disabled:opacity-50 border-[var(--accent)] text-[var(--accent)]"
            >
              {loading ? (
                <span>
                  GENERATING<span className="loading-dots" aria-hidden="true"></span>
                </span>
              ) : (
                "GENERATE"
              )}
            </button>
            <button
              type="button"
              onClick={handleHumanize}
              disabled={humanizing || loading || !output}
              aria-busy={humanizing}
              className="glass neon-hover border border-white/30 px-4 py-2 text-xs uppercase tracking-wider disabled:opacity-50"
            >
              {humanizing ? (
                <span>
                  HUMANIZING<span className="loading-dots" aria-hidden="true"></span>
                </span>
              ) : (
                "HUMANIZE"
              )}
            </button>
            {error ? (
              <span role="alert" aria-live="assertive" className="text-xs text-red-400 uppercase tracking-wide">{error}</span>
            ) : null}
          </div>

          {output ? (
            <section id="reply-output" className="terminal glass neon-hover p-4 flicker" aria-live="polite">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] uppercase opacity-75">OUTPUT</div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    disabled={!output}
                    className="glass neon-hover border border-white/30 px-2 py-1 text-[10px] uppercase tracking-widest disabled:opacity-50"
                    aria-label="Copy output to clipboard"
                  >
                    {copied ? "COPIED" : "COPY"}
                  </button>
                </div>
              </div>
              <div className="whitespace-pre-wrap leading-relaxed typewriter">{output}</div>
            </section>
          ) : null}
        </section>
      </div>
    </main>
  );
}
