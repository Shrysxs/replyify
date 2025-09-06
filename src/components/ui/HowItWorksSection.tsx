"use client";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Write Your Thoughts",
    description: "Share what's on your mind or what you want to convey",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Choose Your Style",
    description: "Pick a persona, tone, and goal to match your brand and intent",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Generate & Refine",
    description: "Get polished, context-aware text ready to use",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function HowItWorksSection() {
  return (
    <section className="h-full min-h-0 overflow-hidden px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-7xl mx-auto w-full flex flex-col py-20 sm:py-24 lg:py-28">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-heading text-neutral-100 mb-4">
            How it works — for everyone
          </h2>
          <p className="text-body text-neutral-400 max-w-2xl mx-auto">
            Three simple steps to transform your thoughts into polished, professional content
          </p>
        </motion.div>

        {/* Feature Columns with enhanced styling */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Connecting lines for desktop */}
          <div aria-hidden className="hidden md:block absolute top-16 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Card content with glassmorphism */}
              <div className="relative p-8 rounded-2xl border border-white/8 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] hover:border-white/12 transition-all duration-300">
                {/* Step number with icon */}
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] mb-4 group-hover:bg-[var(--accent)]/15 transition-colors duration-300">
                    {step.icon}
                  </div>
                  <span className="text-xs font-medium text-neutral-500 tracking-wider uppercase">
                    Step {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-neutral-100 mb-3 text-center">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-neutral-400 leading-relaxed text-center">
                  {step.description}
                </p>

                {/* Subtle background illustration */}
                <div aria-hidden className={`feature-illustration feature-illustration-${index + 1} opacity-30`} />
              </div>

              {/* Connection arrow for desktop */}
              {index < steps.length - 1 && (
                <div aria-hidden className="hidden md:block absolute top-16 -right-6 w-12 h-px bg-white/10">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-r border-t border-white/20 rotate-45" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
