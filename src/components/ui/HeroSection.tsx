"use client";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onStartWriting: () => void;
}

export default function HeroSection({ onStartWriting }: HeroSectionProps) {
  return (
    <section className="relative h-full min-h-0 overflow-hidden px-4 sm:px-6 lg:px-8 flex items-center touch-pan-y">
      {/* Right-side light beam background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="hero-beam" />
        <div className="hero-vignette" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full pt-16">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.2em] text-neutral-500 mb-8 font-medium uppercase"
        >
          [ WRITE WITH CONTEXT ]
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Headline + CTA */}
          <div className="lg:col-span-7 xl:col-span-6">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-display text-neutral-100 mb-6"
            >
              Craft concise,
              <span className="block text-neutral-400">on‑brand writing</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-body text-neutral-300 max-w-lg mb-8 leading-relaxed"
            >
              Transform scattered thoughts into polished, context-aware text. Set your persona, tone, and goals — get tailored content instantly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={onStartWriting}
                className="group inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full bg-[var(--accent)] text-black hover:bg-[var(--accent)]/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40 will-change-transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--accent)]/25"
              >
                Start writing
                <svg
                  className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <button
                onClick={onStartWriting}
                className="inline-flex items-center justify-center rounded-full border border-white/12 px-6 py-4 text-base text-neutral-200 hover:bg-white/5 hover:border-white/20 transition-all duration-200 group"
              >
                See how it works
                <svg className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          </div>

          {/* Right: keep empty so beam has space */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6" />
        </div>
      </div>
    </section>
  );
}
