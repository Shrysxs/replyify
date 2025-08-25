"use client";
import * as React from "react";

type ChipProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
};

export function Chip({ label, selected, onClick, className }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      data-selected={selected ? "true" : "false"}
      style={selected ? { borderColor: "var(--accent)", color: "var(--accent)" } : undefined}
      className={[
        "inline-flex items-center select-none uppercase tracking-wider text-xs",
        "border rounded-full px-3 py-1 transition-all",
        "glass neon-hover",
        selected
          ? "border-[var(--accent)] text-[var(--accent)] shadow-[0_0_12px_rgba(0,255,120,0.25)]"
          : "border-white/30 hover:border-white/60",
        className || "",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
