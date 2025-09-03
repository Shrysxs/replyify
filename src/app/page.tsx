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

  // Removed debug logging for better performance

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
    <div className="min-h-screen bg-grid-pattern relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
      </div>
      
      <main className="relative z-10 mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        {/* Hero Section */}
        <header className="text-center py-8 sm:py-12 lg:py-16">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-12 h-12 glass neon-hover rounded-full flex items-center justify-center pulse-glow">
              <div className="w-6 h-6 bg-accent rounded-full animate-pulse"></div>
            </div>
            <h1 className="retro text-4xl sm:text-5xl lg:text-6xl uppercase tracking-widest glow-text">
              REPLYIFY
            </h1>
            <a
              href="https://x.com/Shrysxs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow @Shrysxs on X"
              className="glass neon-hover rounded-full p-3 border border-white/20 hover:border-accent/50 transition-all duration-300 hover:scale-110"
            >
              <svg width="20" height="20" viewBox="0 0 1200 1227" xmlns="http://www.w3.org/2000/svg" className="fill-current">
                <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"/>
              </svg>
            </a>
          </div>
          
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-lg sm:text-xl mb-4 typing-animation">
              Transform your thoughts into polished, context-aware text
            </p>
            <p className="text-sm opacity-70 uppercase tracking-wide">
              AI-powered • Context-aware • Lightning fast
            </p>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:gap-8 xl:grid-cols-3 2xl:grid-cols-4">
          {/* How it Works - Compact Card */}
          <section className="xl:col-span-1 2xl:col-span-1">
            <div className="glass neon-hover p-4 sm:p-6 h-full">
              <h2 className="text-sm uppercase tracking-widest opacity-90 retro mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                How it works
              </h2>
              <ol className="space-y-3 text-sm leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                  <span>Write your thoughts or ideas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                  <span>Choose persona, tone & goal</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                  <span>Generate & refine instantly</span>
                </li>
              </ol>
            </div>
          </section>

          {/* Configuration Panel */}
          <section className="xl:col-span-2 2xl:col-span-2">
            <div className="grid gap-4">
              <PromptConfigurator value={config} onChange={setConfig} />
              
              {/* Temperature Slider */}
              <div className="glass neon-hover p-4">
                <div className="flex items-center justify-between mb-3">
                  <label htmlFor="temp" className="text-xs uppercase tracking-widest opacity-90 flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent/60 rounded-full"></span>
                    Temperature
                  </label>
                  <div className="tooltip text-xs opacity-80">
                    <span className="underline decoration-dotted cursor-help">effects</span>
                    <span className="tooltip-content">0.0-0.3: Conservative | 0.4-0.6: Balanced | 0.7-1.0: Creative</span>
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTemperature(parseFloat(e.target.value))}
                    className="w-full glow-range"
                  />
                  <span className="text-xs tabular-nums opacity-80 w-12 text-right bg-black/30 px-2 py-1 rounded border border-white/10">
                    {temperature.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Action Panel & Output */}
          <section className="xl:col-span-3 2xl:col-span-4">
            <div className="space-y-6">
              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={loading || humanizing || !config.input}
                  className="glass neon-hover border border-accent text-accent px-6 py-3 text-sm uppercase tracking-wider disabled:opacity-50 hover:bg-accent/10 transition-all duration-300 flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                  {loading ? (
                    <span>GENERATING<span className="loading-dots"></span></span>
                  ) : (
                    "GENERATE"
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleHumanize}
                  disabled={humanizing || loading || !output}
                  className="glass neon-hover border border-white/30 px-5 py-3 text-sm uppercase tracking-wider disabled:opacity-50 hover:border-white/50 transition-all duration-300"
                >
                  {humanizing ? (
                    <span>HUMANIZING<span className="loading-dots"></span></span>
                  ) : (
                    "HUMANIZE"
                  )}
                </button>
                
                {error && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
                    <span>{error}</span>
                  </div>
                )}
              </div>

              {/* Output Terminal */}
              {output && (
                <div className="terminal glass neon-hover p-6 flicker">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-accent rounded-full animate-pulse"></span>
                      <span className="text-xs uppercase opacity-75 tracking-wider">OUTPUT</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopy}
                      disabled={!output}
                      className="glass neon-hover border border-white/30 px-3 py-1.5 text-xs uppercase tracking-widest hover:border-accent/50 transition-all duration-300"
                    >
                      {copied ? "✓ COPIED" : "COPY"}
                    </button>
                  </div>
                  <div className="whitespace-pre-wrap leading-relaxed typewriter text-base">
                    {output}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
