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
            <span className="block" data-parallax="0.02">
              Replyify
            </span>
          </h1>
          
          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl sm:text-2xl lg:text-3xl text-neutral-300 font-light leading-relaxed max-w-3xl mx-auto"
            data-parallax="0.01"
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
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-black bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,120,0.4)] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-black"
          >
            <span className="relative z-10 uppercase tracking-wide">Start Writing</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </button>
        </motion.div>

        {/* Floating elements for visual interest */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-400 rounded-full opacity-60"
          data-parallax="0.3"
          style={{
            boxShadow: '0 0 20px rgba(0, 255, 120, 0.6)',
          }}
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute top-3/4 right-1/3 w-1 h-1 bg-green-400 rounded-full opacity-40"
          data-parallax="0.4"
          style={{
            boxShadow: '0 0 15px rgba(0, 255, 120, 0.4)',
          }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-green-400 rounded-full opacity-50"
          data-parallax="0.25"
          style={{
            boxShadow: '0 0 18px rgba(0, 255, 120, 0.5)',
          }}
        />
      </div>
    </section>
  );
}
