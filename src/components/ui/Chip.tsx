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
        "group inline-flex items-center select-none text-sm font-medium will-change-transform",
        "rounded-full px-4 py-2 transition-all duration-200 border",
        selected
          ? "bg-[var(--accent)]/15 border-[var(--accent)]/60 text-neutral-100 shadow-[0_2px_18px_rgba(0,255,120,0.12)]"
          : "border-white/15 text-neutral-300 hover:text-neutral-100 hover:border-[var(--accent)]/50",
        "focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:ring-offset-0",
        "hover:-translate-y-0.5 hover:shadow-[0_2px_12px_rgba(0,207,255,0.15)]",
        className || "",
      ].join(" ")}
    >
      <span className="relative">
        {label}
        <span className={[
          "block h-px bg-[var(--accent)]/80 transition-all duration-200",
          selected ? "w-full" : "w-0 group-hover:w-full",
        ].join(" ")} />
      </span>
    </button>
  );
}
