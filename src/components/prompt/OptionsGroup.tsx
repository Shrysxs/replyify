"use client";
import * as React from "react";
import { Chip } from "../ui/Chip";

type Props = {
  title: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
};

export default function OptionsGroup({ title, options, value, onChange }: Props) {
  return (
    <div className="grid gap-3 glass neon-hover p-4">
      <div className="text-[10px] uppercase tracking-widest opacity-90 retro">{title}</div>
      <div className="flex flex-wrap gap-2 transition-all">
        {options.map((opt) => {
          const isSelected = value === opt;
          return (
            <Chip
              key={opt}
              label={opt}
              selected={isSelected}
              onClick={() => {
                onChange(isSelected ? "" : opt);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
