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
        "group inline-flex items-center select-none text-sm font-medium",
        "rounded-full px-4 py-2 transition-all duration-200 border",
        selected
          ? "bg-[color:rgb(0_207_255_/_.15)] border-[color:rgb(255_255_255_/_0.15)] text-neutral-100"
          : "border-white/15 text-neutral-300 hover:text-neutral-100 hover:border-[var(--accent)]/50",
        "focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:ring-offset-0",
        "hover:-translate-y-0.5 hover:shadow-[0_2px_12px_rgba(0,207,255,0.15)]",
        className || "",
      ].join(" ")}
    >
      <span className="relative">
        {label}
        <span className="block h-px w-0 bg-[var(--accent)]/80 transition-all duration-200 group-hover:w-full" />
      </span>
    </button>
  );
}
