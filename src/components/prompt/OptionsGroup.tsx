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
    <div className="grid gap-2">
      <div className="text-[10px] uppercase tracking-widest opacity-75">{title}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = value === opt;
          return (
            <Chip
              key={opt}
              label={opt}
              selected={isSelected}
              onClick={() => {
                if (process.env.NODE_ENV !== "production") {
                  try {
                    console.debug(`[OptionsGroup] ${title} click`, { opt, isSelected, next: isSelected ? "" : opt });
                  } catch {}
                }
                onChange(isSelected ? "" : opt);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
