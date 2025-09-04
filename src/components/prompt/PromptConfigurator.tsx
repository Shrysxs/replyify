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
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <OptionsGroup
          title="PERSONA / AUDIENCE"
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
          title="TONE"
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
          title="GOAL / TASK"
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
        className="rounded-2xl p-6 border border-white/10 bg-transparent"
      >
        <div id="msg-label" className="text-sm uppercase tracking-widest text-neutral-300 font-medium retro mb-4">
          YOUR THOUGHTS OR IDEAS
        </div>
        <div className="relative">
          <textarea
            value={value.input}
            onChange={(e) => onChange({ ...value, input: e.target.value })}
            placeholder="Write what's on your mind or what you want to convey…"
            aria-label="Your thoughts or ideas to transform"
            aria-describedby="msg-label"
            className="w-full min-h-[160px] border border-white/15 bg-transparent p-4 rounded-xl outline-none focus:ring-2 focus:ring-green-400/40 transition-colors duration-200 text-neutral-200 placeholder:text-neutral-500 resize-none"
          />
          {value.input && (
            <div className="absolute bottom-3 right-3 text-xs text-neutral-500 font-mono">
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
          onClick={() => onChange({ persona: "", tone: "", goal: "", topic: "", input: "" })}
          className="border border-white/15 px-4 py-2 text-xs uppercase tracking-wider rounded-full transition-colors duration-200 text-neutral-300 hover:text-white hover:border-white/30"
        >
          CLEAR ALL
        </button>
      </motion.div>
    </div>
  );
}
