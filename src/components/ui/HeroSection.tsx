"use client";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onStartWriting: () => void;
}

export default function HeroSection({ onStartWriting }: HeroSectionProps) {
  return (
    <section className="relative h-full min-h-0 overflow-hidden px-4 sm:px-6 lg:px-8 flex items-start">
      {/* Right-side light beam background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="hero-beam" />
        <div className="hero-vignette" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-28 sm:pt-32 lg:pt-40 text-xs tracking-[0.25em] text-neutral-500 mb-8"
        >
          [ WRITE WITH CONTEXT ]
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Headline + CTA */}
          <div className="lg:col-span-6">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="font-semibold text-left leading-[0.9] text-[clamp(2.75rem,8vw,6rem)] text-neutral-200/90"
            >
              Craft concise,
              <span className="block text-neutral-400">on‑brand writing</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
              className="mt-8"
            >
              <button
                onClick={onStartWriting}
                className="group inline-flex items-center justify-center px-7 py-3 text-sm sm:text-base font-medium rounded-full border border-white/15 text-[var(--foreground)] hover:text-black hover:bg-[var(--accent)]/90 hover:border-[var(--accent)]/60 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
              >
                Start writing
                <svg
                  className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </motion.div>
          </div>

          {/* Right: keep empty so beam has space */}
          <div className="hidden lg:block lg:col-span-6" />
        </div>

        {/* Bottom row: small description left, secondary CTA right */}
        <div className="mt-24 flex items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-xl text-sm text-neutral-400 leading-relaxed"
          >
            Replyify turns scattered context into clear, on‑brand writing. Set persona, tone, and goals — get tailored drafts and rewrites instantly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hidden sm:block"
          >
            <button
              onClick={onStartWriting}
              className="inline-flex items-center rounded-full border border-white/15 px-5 py-2 text-sm text-neutral-200/90 hover:bg-white hover:text-black transition-colors"
            >
              Try Replyify →
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
