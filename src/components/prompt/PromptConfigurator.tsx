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
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <OptionsGroup
          title="Persona / Audience"
          options={personas}
          value={value.persona}
          onChange={(persona) => onChange({ ...value, persona })}
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <OptionsGroup
          title="Tone"
          options={tones}
          value={value.tone}
          onChange={(tone) => onChange({ ...value, tone })}
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <OptionsGroup
          title="Goal / Task"
          options={goals}
          value={value.goal}
          onChange={(goal) => onChange({ ...value, goal })}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="space-y-4"
      >
        <div id="msg-label" className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
          Your thoughts or ideas
        </div>
        <div className="relative">
          <textarea
            value={value.input}
            onChange={(e) => onChange({ ...value, input: e.target.value })}
            placeholder="Write what's on your mind or what you want to convey…"
            aria-label="Your thoughts or ideas to transform"
            aria-describedby="msg-label"
            className="w-full min-h-[180px] border border-white/8 bg-white/[0.02] backdrop-blur-sm p-6 rounded-2xl outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)]/20 transition-all duration-200 text-neutral-200 placeholder:text-neutral-500 resize-none hover:border-white/12"
          />
          {value.input && (
            <div className="absolute bottom-4 right-4 text-xs text-neutral-500 font-mono bg-black/20 px-2 py-1 rounded-md backdrop-blur-sm">
              {value.input.length} chars
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="flex items-center gap-3"
      >
        <button
          type="button"
          onClick={() => onChange({
            persona: personas[0] || "",
            tone: tones[0] || "",
            goal: goals[0] || "",
            topic: "",
            input: "",
          })}
          className="border border-white/15 px-4 py-2 text-xs rounded-full transition-colors duration-200 text-neutral-300 hover:text-neutral-100 hover:border-[var(--accent)]/50"
        >
          Clear all
        </button>
      </motion.div>
    </div>
  );
}
