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
        "inline-flex items-center border px-3 py-1 text-xs transition uppercase tracking-wider",
        "select-none",
        selected
          ? "border-[var(--accent)] text-[var(--accent)]"
          : "border-white/30 hover:border-white/60",
        className || "",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
