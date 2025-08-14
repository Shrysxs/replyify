"use client";
import * as React from "react";
import OptionsGroup from "./OptionsGroup";
import { personas, tones, goals, type PromptConfig } from "@/config/promptOptions";

type Props = {
  onChange?: (cfg: PromptConfig) => void;
};

export default function PromptConfigurator({ onChange }: Props) {
  const [config, setConfig] = React.useState<PromptConfig>({
    persona: "",
    tone: "",
    goal: "",
    topic: "",
    input: "",
  });

  React.useEffect(() => {
    onChange?.(config);
  }, [config, onChange]);

  return (
    <div className="grid gap-6">
      <OptionsGroup
        title="PERSONA / AUDIENCE"
        options={personas}
        value={config.persona}
        onChange={(persona) => setConfig((c) => ({ ...c, persona }))}
      />
      <OptionsGroup
        title="TONE"
        options={tones}
        value={config.tone}
        onChange={(tone) => setConfig((c) => ({ ...c, tone }))}
      />
      <OptionsGroup
        title="GOAL / TASK"
        options={goals}
        value={config.goal}
        onChange={(goal) => setConfig((c) => ({ ...c, goal }))}
      />

      <div className="grid gap-2">
        <div id="msg-label" className="text-[10px] uppercase tracking-widest opacity-75">MESSAGE OR CONTEXT</div>
        <textarea
          value={config.input}
          onChange={(e) => setConfig((c) => ({ ...c, input: e.target.value }))}
          placeholder="Paste the message you're replying to, or add context…"
          aria-label="Message or context to reply to"
          aria-describedby="msg-label"
          className="w-full min-h-[140px] border border-white/30 bg-transparent p-3 outline-none focus:border-[var(--accent)]"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() =>
            setConfig({ persona: "", tone: "", goal: "", topic: "", input: "" })
          }
          className="border border-white/30 px-3 py-2 text-xs uppercase tracking-wider hover:border-white/60"
        >
          CLEAR
        </button>
      </div>
    </div>
  );
}
