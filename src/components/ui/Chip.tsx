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
        "group relative inline-flex items-center select-none uppercase tracking-wider text-xs font-medium",
        "border rounded-full px-4 py-2 transition-all duration-300",
        "backdrop-blur-xl",
        selected
          ? "bg-green-400/10 border-green-400/50 text-green-400 shadow-[0_0_20px_rgba(0,255,120,0.25)] hover:shadow-[0_0_25px_rgba(0,255,120,0.35)] hover:scale-105"
          : "bg-white/5 border-white/20 text-neutral-300 hover:bg-white/10 hover:border-green-400/30 hover:text-green-400 hover:shadow-[0_0_15px_rgba(0,255,120,0.15)] hover:scale-105",
        "focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:ring-offset-2 focus:ring-offset-black",
        className || "",
      ].join(" ")}
    >
      <span className="relative z-10">{label}</span>
      {selected && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 to-green-500/20 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
      )}
    </button>
  );
}
