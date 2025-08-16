"use client";
import * as React from "react";
import OptionsGroup from "./OptionsGroup";
import { personas, tones, goals, type PromptConfig } from "@/config/promptOptions";

type Props = {
  value: PromptConfig;
  onChange: (cfg: PromptConfig) => void;
};

export default function PromptConfigurator({ value, onChange }: Props) {
  
  return (
    <div className="grid gap-6">
      <OptionsGroup
        title="PERSONA / AUDIENCE"
        options={personas}
        value={value.persona}
        onChange={(persona) => onChange({ ...value, persona })}
      />
      <OptionsGroup
        title="TONE"
        options={tones}
        value={value.tone}
        onChange={(tone) => onChange({ ...value, tone })}
      />
      <OptionsGroup
        title="GOAL / TASK"
        options={goals}
        value={value.goal}
        onChange={(goal) => onChange({ ...value, goal })}
      />

      <div className="grid gap-2">
        <div id="msg-label" className="text-[10px] uppercase tracking-widest opacity-75">MESSAGE OR CONTEXT</div>
        <textarea
          value={value.input}
          onChange={(e) => onChange({ ...value, input: e.target.value })}
          placeholder="Paste the message you're replying to, or add context…"
          aria-label="Message or context to reply to"
          aria-describedby="msg-label"
          className="w-full min-h-[140px] border border-white/30 bg-transparent p-3 outline-none focus:border-[var(--accent)]"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange({ persona: "", tone: "", goal: "", topic: "", input: "" })}
          className="border border-white/30 px-3 py-2 text-xs uppercase tracking-wider hover:border-white/60"
        >
          CLEAR
        </button>
      </div>
    </div>
  );
}
