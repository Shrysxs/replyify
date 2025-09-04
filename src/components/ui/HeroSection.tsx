"use client";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onStartWriting: () => void;
}

export default function HeroSection({ onStartWriting }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle starfield overlay */}
      <div aria-hidden className="absolute inset-0 hero-stars opacity-70 pointer-events-none" />
      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <h1 className="font-semibold tracking-tight text-neutral-100 mb-4 leading-[0.95] text-[clamp(2.25rem,7vw,4.5rem)]">
            <span className="block">Write with context.</span>
            <span className="block text-neutral-300">Fast, on‑brand, and precise.</span>
          </h1>
          
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-neutral-300 font-light leading-relaxed max-w-3xl mx-auto text-[clamp(1rem,2.4vw,1.375rem)]"
          >
            Transform your thoughts into polished, context-aware writing — fast.
          </motion.p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mb-12"
        >
          <button
            onClick={onStartWriting}
            className="group inline-flex items-center justify-center px-7 py-3 text-base font-medium rounded-full border border-white/15 text-[var(--foreground)] hover:text-black hover:bg-[var(--accent)]/90 hover:border-[var(--accent)]/60 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40 will-change-transform hover:-translate-y-0.5"
          >
            <span>Start Writing</span>
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
    </section>
  );
}
