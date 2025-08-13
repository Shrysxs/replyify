"use client";
import * as React from "react";
import OptionsGroup from "./OptionsGroup";
import { personas, tones, goals, topics, type PromptConfig } from "@/config/promptOptions";

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
    <div className="space-y-6">
      <OptionsGroup
        title="Persona / Audience"
        options={personas}
        value={config.persona}
        onChange={(persona) => setConfig((c) => ({ ...c, persona }))}
      />
      <OptionsGroup
        title="Tone"
        options={tones}
        value={config.tone}
        onChange={(tone) => setConfig((c) => ({ ...c, tone }))}
      />
      <OptionsGroup
        title="Goal / Task"
        options={goals}
        value={config.goal}
        onChange={(goal) => setConfig((c) => ({ ...c, goal }))}
      />
      <OptionsGroup
        title="Topic / Context"
        options={topics}
        value={config.topic}
        onChange={(topic) => setConfig((c) => ({ ...c, topic }))}
      />

      <div className="space-y-2">
        <div className="text-xs uppercase tracking-wide opacity-75">Message or Context</div>
        <textarea
          value={config.input}
          onChange={(e) => setConfig((c) => ({ ...c, input: e.target.value }))}
          placeholder="Paste the message you're replying to, or add context…"
          className="w-full min-h-[120px] rounded-xl border border-white/10 bg-transparent p-3 outline-none focus:ring-2 focus:ring-white/20"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() =>
            setConfig({ persona: "", tone: "", goal: "", topic: "", input: "" })
          }
          className="rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
