"use client";
import * as React from "react";

type ChipProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
} & React.HTMLAttributes<HTMLButtonElement>;

export function Chip({ label, selected, onClick, className, ...rest }: ChipProps) {
  return (
    <button
      {...rest}
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      data-selected={selected ? "true" : "false"}
      className={[
        "group inline-flex items-center select-none uppercase tracking-wider text-xs font-medium",
        "rounded-full px-4 py-2 transition-colors duration-200",
        selected
          ? "bg-black/30 border border-green-400/60 text-green-300"
          : "border border-white/10 text-neutral-300 hover:text-white hover:border-green-400/40",
        "focus:outline-none focus:ring-2 focus:ring-green-400/40 focus:ring-offset-0",
        className || "",
      ].join(" ")}
    >
      <span>{label}</span>
    </button>
  );
}
