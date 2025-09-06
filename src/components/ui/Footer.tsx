"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/[0.03] via-transparent to-[var(--accent)]/[0.03] pointer-events-none" />
      
      {/* Multiple radial glows for depth */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-[var(--accent)]/8 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container-responsive relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="py-20"
        >
          {/* Main footer content */}
          <div className="border border-white/8 rounded-3xl p-12 bg-white/[0.02] backdrop-blur-sm">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 mb-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-neutral-100">
                  REPLYIFY
                </h2>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-neutral-400 text-lg max-w-2xl mx-auto mb-8"
              >
                Transform your ideas into polished, professional content with AI-powered writing assistance
              </motion.p>
              
              {/* Feature highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-wrap items-center justify-center gap-6 mb-12"
              >
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  Context-Aware
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  Multiple Tones
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  Instant Results
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-500">
                  <div className="w-2 h-2 bg-[var(--accent)] rounded-full" />
                  Human-like Output
                </div>
              </motion.div>
            </div>
            
            {/* Footer links and info */}
            <div className="border-t border-white/8 pt-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="flex flex-col sm:flex-row items-center gap-6"
                >
                  <div className="text-sm text-neutral-500">
                    2024 Replyify. Crafted with for better writing.
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-8"
                >
                  <a
                    href="https://x.com/Shrysxs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-[var(--accent)]/40 hover:bg-white/5 transition-all duration-300 text-neutral-400 hover:text-[var(--accent)]"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 1200 1227" fill="currentColor">
                      <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
                    </svg>
                    <span className="text-sm font-medium">@Shrysxs</span>
                  </a>
                  
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>Online & Ready</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Bottom spacing */}
          <div className="h-8" />
        </motion.div>
      </div>
    </footer>
  );
}
