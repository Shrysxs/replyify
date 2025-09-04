"use client";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onStartWriting: () => void;
}

export default function HeroSection({ onStartWriting }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-100 mb-4">
            <span className="block">
              Replyify
            </span>
          </h1>
          
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl sm:text-2xl lg:text-3xl text-neutral-300 font-light leading-relaxed max-w-3xl mx-auto"
          >
            Polish your thoughts into context-aware replies — instantly.
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
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-black rounded-full bg-[var(--accent)] transition-colors duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <span className="uppercase tracking-wide">Start Writing</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
