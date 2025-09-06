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
  const [, setError] = React.useState<string | null>(null);
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-xl bg-black/40 border-b border-white/8" : "bg-transparent border-b border-transparent"}`}>
        <div className="container-responsive">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center"
            >
              <h1 className="text-lg font-semibold tracking-tight text-neutral-100">REPLYIFY</h1>
            </motion.div>
            
            <div className="flex items-center gap-3">
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                onClick={scrollToApp}
                className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-full border border-white/12 text-neutral-200 hover:text-black hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all duration-200 will-change-transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--accent)]/20 text-responsive"
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
                className="border border-white/8 rounded-full p-2.5 hover:border-[var(--accent)]/40 hover:bg-white/5 transition-all duration-200 group"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 1200 1227"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-neutral-400 group-hover:text-[var(--accent)] transition-colors duration-200"
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
          <main className="relative">
            {/* Hero-style header with better visual hierarchy */}
            <div className="relative overflow-hidden">
              {/* Subtle background gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent)]/[0.02] to-transparent pointer-events-none" />
              
              <div className="container-responsive relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="pt-24 pb-20 text-center"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/5 text-[var(--accent)] text-sm font-medium mb-8">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    AI-Powered Writing
                  </div>
                  
                  <h2 className="text-display text-neutral-100 mb-6 max-w-4xl mx-auto">
                    Start creating
                    <span className="block text-neutral-400 text-heading mt-2">amazing content</span>
                  </h2>
                  
                  <p className="text-body text-neutral-400 max-w-2xl mx-auto mb-8">
                    Configure your preferences and generate context-aware text that matches your style
                  </p>
                </motion.div>
              </div>
            </div>
            
            <div className="container-responsive">
              <div className="max-w-4xl mx-auto pb-16">
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className="space-y-12"
                >
                  {/* Configuration Cards */}
                  <div className="grid gap-8">
                    <PromptConfigurator
                      value={config}
                      onChange={setConfig}
                    />
                    
                    {/* Enhanced Temperature Slider */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/5 via-transparent to-[var(--accent)]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative rounded-3xl p-10 border border-white/8 bg-white/[0.02] backdrop-blur-sm hover:border-white/12 transition-all duration-300">
                        <div className="flex items-center justify-between mb-10">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center">
                              <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <div>
                              <label htmlFor="temp" className="text-sm font-semibold text-neutral-200 block">
                                Creativity Level
                              </label>
                              <p className="text-xs text-neutral-500 mt-1">Adjust the creative freedom of AI responses</p>
                            </div>
                          </div>
                          <div className="tooltip text-xs text-neutral-400">
                            <span className="underline decoration-dotted cursor-help hover:text-[var(--accent)] transition-colors">
                              Learn more
                            </span>
                            <span className="tooltip-content">
                              0.0-0.3: Conservative, predictable | 0.4-0.6: Balanced | 0.7-1.0: Creative, varied, spontaneous
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="flex items-center gap-8">
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
                            <div className="flex items-center gap-2">
                              <span className="text-lg tabular-nums text-[var(--accent)] font-mono font-semibold">
                                {temperature.toFixed(2)}
                              </span>
                              <div className="w-16 h-8 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-lg flex items-center justify-center">
                                <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
                              </div>
                            </div>
                          </div>
                          
                          {/* Visual indicators */}
                          <div className="flex justify-between text-xs text-neutral-500">
                            <span className={temperature <= 0.3 ? 'text-[var(--accent)] font-medium' : ''}>Conservative</span>
                            <span className={temperature > 0.3 && temperature <= 0.7 ? 'text-[var(--accent)] font-medium' : ''}>Balanced</span>
                            <span className={temperature > 0.7 ? 'text-[var(--accent)] font-medium' : ''}>Creative</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
              
                  {/* Enhanced Action Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/10 via-transparent to-[var(--accent)]/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative border border-white/8 rounded-3xl p-12 bg-white/[0.02] backdrop-blur-sm hover:border-white/12 transition-all duration-300">
                      <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/5 text-[var(--accent)] text-sm font-medium mb-4">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                          </svg>
                          Ready to Generate
                        </div>
                        <h3 className="text-xl font-semibold text-neutral-100 mb-2">Generate Your Content</h3>
                        <p className="text-neutral-400 text-sm max-w-md mx-auto">Transform your ideas into polished, professional text with AI assistance</p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
                        <button
                          type="button"
                          onClick={handleGenerate}
                          disabled={loading || humanizing || !config.input}
                          aria-busy={loading}
                          aria-controls="reply-output"
                          className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-2xl bg-[var(--accent)] text-black hover:bg-[var(--accent)]/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed will-change-transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-[var(--accent)]/30 min-w-[200px]"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <span className="relative inline-flex items-center">
                            {loading ? (
                              <>
                                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-3" />
                                Generating<span className="loading-dots" aria-hidden="true"></span>
                              </>
                            ) : (
                              <>
                                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Generate Text
                              </>
                            )}
                          </span>
                        </button>
                        
                        <button
                          type="button"
                          onClick={handleHumanize}
                          disabled={humanizing || loading || !output}
                          aria-busy={humanizing}
                          className="inline-flex items-center justify-center px-8 py-5 text-base font-medium rounded-2xl border-2 border-white/12 hover:border-[var(--accent)]/40 hover:bg-white/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-neutral-300 hover:text-neutral-100 will-change-transform hover:-translate-y-0.5 min-w-[160px]"
                        >
                          {humanizing ? (
                            <>
                              <div className="w-4 h-4 border-2 border-neutral-400/30 border-t-neutral-400 rounded-full animate-spin mr-2" />
                              Humanizing<span className="loading-dots" aria-hidden="true"></span>
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              Humanize
                            </>
                          )}
                        </button>
                      </div>
                      
                      {/* Clear all button */}
                      <div className="flex justify-center mt-8 pt-8 border-t border-white/5">
                        <button
                          type="button"
                          onClick={() => setConfig({
                            persona: personas[0] || "",
                            tone: tones[0] || "",
                            goal: goals[0] || "",
                            topic: "",
                            input: "",
                          })}
                          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-200 text-neutral-400 hover:text-neutral-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Clear All Settings
                        </button>
                      </div>
                    </div>
                  </motion.div>
            </motion.section>

            {/* Output Section */}
            {output && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                id="reply-output"
                className="border border-white/8 rounded-2xl p-8 bg-white/[0.02] backdrop-blur-sm mt-8"
                aria-live="polite"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Generated Output</div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    disabled={!output}
                    className="px-5 py-2.5 text-sm rounded-full border border-white/12 hover:border-[var(--accent)]/40 hover:bg-white/5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-neutral-300 hover:text-neutral-100 will-change-transform hover:-translate-y-0.5 font-medium"
                    aria-label="Copy output to clipboard"
                  >
                    {copied ? "✓ Copied" : "Copy"}
                  </button>
                </div>
                <div className="whitespace-pre-wrap leading-relaxed text-neutral-200 text-base break-words overflow-hidden bg-black/20 p-6 rounded-xl border border-white/5">
                  {output}
                </div>
              </motion.section>
            )}
              </div>
            </div>
          </main>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
