"use client";
import * as React from "react";
import { motion } from "framer-motion";
import OptionsGroup from "./OptionsGroup";
import { personas, tones, goals, type PromptConfig } from "@/config/promptOptions";

type Props = {
  value: PromptConfig;
  onChange: (cfg: PromptConfig) => void;
};

export default function PromptConfigurator({ value, onChange }: Props) {
  
  return (
    <div className="space-y-12">
      {/* Configuration Cards Grid */}
      <div className="grid gap-8 lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/5 via-transparent to-[var(--accent)]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative border border-white/8 rounded-3xl p-8 bg-white/[0.02] backdrop-blur-sm hover:border-white/12 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-100">Persona & Audience</h3>
                <p className="text-sm text-neutral-400">Who are you writing for?</p>
              </div>
            </div>
            <OptionsGroup
              title=""
              options={personas}
              value={value.persona}
              onChange={(persona) => onChange({ ...value, persona })}
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/5 via-transparent to-[var(--accent)]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative border border-white/8 rounded-3xl p-8 bg-white/[0.02] backdrop-blur-sm hover:border-white/12 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 2v12a2 2 0 002 2h6a2 2 0 002-2V6M9 10h6M9 14h6" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-100">Tone & Style</h3>
                <p className="text-sm text-neutral-400">How should it sound?</p>
              </div>
            </div>
            <OptionsGroup
              title=""
              options={tones}
              value={value.tone}
              onChange={(tone) => onChange({ ...value, tone })}
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/5 via-transparent to-[var(--accent)]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative border border-white/8 rounded-3xl p-8 bg-white/[0.02] backdrop-blur-sm hover:border-white/12 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-100">Goal & Purpose</h3>
                <p className="text-sm text-neutral-400">What do you want to achieve?</p>
              </div>
            </div>
            <OptionsGroup
              title=""
              options={goals}
              value={value.goal}
              onChange={(goal) => onChange({ ...value, goal })}
            />
          </div>
        </motion.div>
      </div>

      {/* Enhanced Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/5 via-transparent to-[var(--accent)]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative border border-white/8 rounded-3xl p-8 bg-white/[0.02] backdrop-blur-sm hover:border-white/12 transition-all duration-300">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-100">Your Content</h3>
              <p className="text-sm text-neutral-400">Share your thoughts, ideas, or draft text</p>
            </div>
          </div>
          
          <div className="relative">
            <textarea
              value={value.input}
              onChange={(e) => onChange({ ...value, input: e.target.value })}
              placeholder="Write what's on your mind or what you want to convey… ✨"
              aria-label="Your thoughts or ideas to transform"
              className="w-full min-h-[200px] border border-white/10 bg-black/20 backdrop-blur-sm p-6 rounded-2xl outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)]/40 transition-all duration-300 text-neutral-200 placeholder:text-neutral-500 resize-none hover:border-white/20 text-base leading-relaxed"
            />
            {value.input && (
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <div className="text-xs text-neutral-500 font-mono bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                  {value.input.length} characters
                </div>
              </div>
            )}
            
            {/* Input enhancement indicators */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              {value.input.length > 50 && (
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" title="Good length" />
              )}
              {value.input.length > 200 && (
                <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" title="Great detail" />
              )}
            </div>
          </div>
          
          {/* Input tips */}
          <div className="mt-6 p-4 bg-black/20 rounded-xl border border-white/5">
            <div className="text-xs text-neutral-400 mb-2 font-medium">💡 Pro Tips:</div>
            <ul className="text-xs text-neutral-500 space-y-1">
              <li>• Be specific about your context and audience</li>
              <li>• Include key points you want to emphasize</li>
              <li>• Mention any constraints or requirements</li>
            </ul>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
