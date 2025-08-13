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
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-sm transition",
        selected
          ? "bg-white/10 dark:bg-white/10 border-white/20 ring-1 ring-white/20"
          : "border-white/10 hover:bg-white/5",
        className || "",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
