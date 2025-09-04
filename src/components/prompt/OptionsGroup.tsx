"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Chip } from "../ui/Chip";

type Props = {
  title: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
};

export default function OptionsGroup({ title, options, value, onChange }: Props) {
  return (
    <div className="rounded-2xl p-6 border border-white/10 bg-transparent">
      <div className="text-sm uppercase tracking-widest text-neutral-300 font-medium retro mb-4">{title}</div>
      <div className="flex flex-wrap gap-3">
        {options.map((opt, index) => {
          const isSelected = value === opt;
          return (
            <motion.div
              key={opt}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              viewport={{ once: true }}
            >
              <Chip
                label={opt}
                selected={isSelected}
                onClick={() => {
                  onChange(isSelected ? "" : opt);
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
