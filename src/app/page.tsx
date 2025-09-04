"use client";
import * as React from "react";
import { motion } from "framer-motion";
import PromptConfigurator from "@/components/prompt/PromptConfigurator";
import type { PromptConfig } from "@/config/promptOptions";
import { personas, tones, goals } from "@/config/promptOptions";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import HeroSection from "@/components/ui/HeroSection";
import HowItWorksSection from "@/components/ui/HowItWorksSection";
import Footer from "@/components/ui/Footer";

export default function Home() {
  const [config, setConfig] = React.useState<PromptConfig>({
    persona: personas[0] || "",
    tone: tones[0] || "",
    goal: goals[0] || "",
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

  const appRef = React.useRef<HTMLElement>(null);

  const scrollToApp = () => {
    appRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [scrolled, setScrolled] = React.useState(false);
  // @ts-expect-error - react types noise in this env; React.useEffect is available at runtime
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="snap-container h-screen overflow-y-auto">
      <AnimatedBackground />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? "backdrop-blur-md bg-black/30 border-b border-white/10" : "bg-transparent border-b border-transparent"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-lg font-semibold tracking-tight text-neutral-200">REPLYIFY</h1>
            </motion.div>
            
            <div className="flex items-center gap-3">
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                onClick={scrollToApp}
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full border border-white/15 text-[var(--foreground)] hover:text-black hover:bg-[var(--accent)]/90 hover:border-[var(--accent)]/60 transition-colors duration-200 will-change-transform hover:-translate-y-0.5"
              >
                Try Replyify
              </motion.button>

              <motion.a
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                href="https://x.com/Shrysxs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open X profile @Shrysxs"
                className="border border-white/10 rounded-full p-2 hover:border-[var(--accent)]/50 hover:bg-white/5 transition-colors duration-200"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 1200 1227"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-neutral-300"
                  fill="currentColor"
                >
                  <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="snap-section h-screen">
        <HeroSection onStartWriting={scrollToApp} />
      </section>
      
      {/* How It Works Section */}
      <section className="snap-section h-screen">
        <HowItWorksSection />
      </section>

      {/* Main App Section (snapped, internally scrollable) */}
      <section ref={appRef} className="snap-section h-screen">
        <div className="viewport-scroll">
          <main className="relative px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col min-h-0">
              {/* Simple header (non-sticky) */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="pt-8"
              >
                <h2 className="font-semibold text-neutral-100 text-[clamp(1.75rem,4.8vw,2.25rem)] mb-2">
                  Start creating
                </h2>
                <p className="text-neutral-400 max-w-2xl text-[clamp(0.95rem,2.6vw,1.125rem)]">
                  Configure your preferences and generate context-aware text that matches your style
                </p>
              </motion.div>

              {/* Content grid; single scroll container, wider columns */}
              <div className="flex-1 min-h-0 py-6 lg:py-8 grid gap-6 lg:gap-8 lg:[grid-template-columns:1.25fr_1fr]">

            <motion.section
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <PromptConfigurator
                value={config}
                onChange={setConfig}
              />
              
              {/* Temperature Slider */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="rounded-2xl p-6 border border-white/10 bg-transparent"
              >
                <div className="flex items-center justify-between mb-4">
                  <label htmlFor="temp" className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                    Temperature
                  </label>
                  <div className="tooltip text-xs text-neutral-400">
                    <span className="underline decoration-dotted cursor-help hover:text-[var(--accent)] transition-colors">
                      effects
                    </span>
                    <span className="tooltip-content">
                      0.0-0.3: Conservative, predictable | 0.4-0.6: Balanced | 0.7-1.0: Creative, varied, spontaneous
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    id="temp"
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={temperature}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTemperature(parseFloat(e.target.value))}
                    className="flex-1 glow-range"
                    aria-valuemin={0}
                    aria-valuemax={1}
                    aria-valuenow={Number.isFinite(temperature) ? Number(temperature.toFixed(2)) : 0.7}
                  />
                  <span className="text-sm tabular-nums text-[var(--accent)] font-mono w-12 text-right">
                    {temperature.toFixed(2)}
                  </span>
                </div>
              </motion.div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Action Buttons */}
              <div className="border border-white/10 rounded-2xl p-6 bg-transparent">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={loading || humanizing || !config.input}
                    aria-busy={loading}
                    aria-controls="reply-output"
                    className="group inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-full border border-white/15 text-[var(--foreground)] hover:text-black hover:bg-[var(--accent)]/90 hover:border-[var(--accent)]/60 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed will-change-transform hover:-translate-y-0.5"
                  >
                    <span className="inline-flex items-center">
                      {loading ? (
                        <span>
                          Generating<span className="loading-dots" aria-hidden="true"></span>
                        </span>
                      ) : (
                        <>
                          Generate
                          <svg
                            className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleHumanize}
                    disabled={humanizing || loading || !output}
                    aria-busy={humanizing}
                    className="px-6 py-3 text-sm rounded-full border border-white/15 hover:border-[var(--accent)]/60 hover:bg-white/5 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-neutral-300 hover:text-neutral-100 flex-shrink-0 will-change-transform hover:-translate-y-0.5"
                  >
                    {humanizing ? (
                      <span>
                        Humanizing<span className="loading-dots" aria-hidden="true"></span>
                      </span>
                    ) : (
                      "Humanize"
                    )}
                  </button>
                </div>
                
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                    role="alert"
                    aria-live="assertive"
                  >
                    {error}
                  </motion.div>
                )}
              </div>

              {/* Output Section */}
              {output && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  id="reply-output"
                  className="border border-white/10 rounded-2xl p-6 bg-transparent"
                  aria-live="polite"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Output</div>
                    <button
                      type="button"
                      onClick={handleCopy}
                      disabled={!output}
                      className="px-4 py-2 text-xs rounded-full border border-white/15 hover:border-[var(--accent)]/60 hover:bg-white/5 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-neutral-300 hover:text-neutral-100 will-change-transform hover:-translate-y-0.5"
                      aria-label="Copy output to clipboard"
                    >
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="whitespace-pre-wrap leading-relaxed text-neutral-200 font-mono text-sm break-words overflow-hidden">
                    {output}
                  </div>
                </motion.section>
              )}
            </motion.section>
              </div>
            </div>
          </main>

          {/* Footer inside scrollable area */}
          <Footer />
        </div>
      </section>
    </div>
  );
}
