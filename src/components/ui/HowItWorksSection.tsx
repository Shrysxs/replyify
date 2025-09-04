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
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-200 mb-4 retro uppercase tracking-wider">
            How It Works
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Transform your ideas into polished, professional text in three simple steps
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Glass Card */}
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 h-full transition-all duration-300 hover:bg-white/8 hover:border-green-400/30 hover:shadow-[0_0_30px_rgba(0,255,120,0.15)]">
                {/* Step Number */}
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-400/20 to-green-500/20 border border-green-400/30 mb-6 group-hover:shadow-[0_0_20px_rgba(0,255,120,0.3)] transition-all duration-300">
                  <span className="text-2xl font-bold text-green-400 retro">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-neutral-200 mb-3 group-hover:text-white transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">
                  {step.description}
                </p>

                {/* Connecting Line (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-12 w-6 lg:w-12 h-px bg-gradient-to-r from-green-400/50 to-transparent transform -translate-y-1/2" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
