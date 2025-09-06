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
        "rounded-full px-5 py-2.5 transition-all duration-200 border backdrop-blur-sm",
        selected
          ? "bg-[var(--accent)]/12 border-[var(--accent)]/40 text-neutral-100 shadow-[0_4px_20px_rgba(0,212,255,0.15)]"
          : "border-white/8 text-neutral-300 hover:text-neutral-100 hover:border-[var(--accent)]/30 hover:bg-white/[0.02]",
        "focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:ring-offset-0",
        "hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,212,255,0.12)]",
        className || "",
      ].join(" ")}
    >
      <span className="relative font-medium">
        {label}
        <span className={[
          "absolute bottom-0 left-0 h-px bg-[var(--accent)] transition-all duration-200",
          selected ? "w-full opacity-80" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-60",
        ].join(" ")} />
      </span>
    </button>
  );
}
