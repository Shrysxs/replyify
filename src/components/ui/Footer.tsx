"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-12 sm:py-16 border-t border-white/8 mt-16">
      {/* Enhanced gradient overlay */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-transparent via-[#0A0A0A]/60 to-[#0A0A0A] opacity-90" />
      {/* footer radial glow anchored to bottom (x.ai-style) */}
      <div aria-hidden className="footer-radial-glow" />
      <div className="relative container-responsive">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          {/* Left: Copyright */}
          <div className="text-sm text-neutral-500 font-medium text-responsive text-center sm:text-left">
            © {new Date().getFullYear()} Replyify. All rights reserved.
          </div>

          {/* Right: Builder + GitHub */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center sm:justify-end">
            <a
              href="https://x.com/Shrysxs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--accent)] hover:text-[var(--accent)]/80 transition-colors font-medium text-responsive"
            >
              Built by Shrysxs
            </a>
            <a
              href="https://github.com/Shrysxs"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-neutral-400 hover:text-[var(--accent)] transition-colors p-2 rounded-full hover:bg-white/5 touch-manipulation"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.562 21.8 24 17.302 24 12 24 5.373 18.627 0 12 0z" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
