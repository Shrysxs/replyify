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
    <section className="h-full min-h-0 overflow-hidden px-4 sm:px-6 lg:px-8 flex">
      <div className="max-w-6xl mx-auto w-full flex flex-col py-20 sm:py-24 lg:py-28">
        {/* Section Header (left-aligned like reference) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="text-left text-[clamp(2rem,5.5vw,3.25rem)] font-semibold text-neutral-100">
            How it works — for everyone
          </h2>
        </motion.div>

        {/* Feature Columns with vertical dividers */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* vertical dividers */}
          <div aria-hidden className="hidden md:block absolute inset-y-0 left-1/3 w-px bg-white/10" />
          <div aria-hidden className="hidden md:block absolute inset-y-0 left-2/3 w-px bg-white/10" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Card content */}
              <div className="relative pt-6 pr-2 pb-28 lg:pb-36">
                {/* Title row */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-[var(--accent)]/90">
                    <span className="text-xs font-medium">{step.number}</span>
                  </div>
                  <h3 className="text-lg font-medium text-neutral-100">{step.title}</h3>
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
                  {step.description}
                </p>

                {/* Faint illustration background */}
                <div aria-hidden className={`feature-illustration feature-illustration-${index + 1}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
