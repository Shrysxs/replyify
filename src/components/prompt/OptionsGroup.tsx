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
    <div className="space-y-6">
      <div className="text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2 text-responsive">{title}</div>
      <div className="flex flex-wrap gap-3 sm:gap-4 lg:flex-nowrap lg:overflow-x-auto lg:gap-3 lg:-mx-1 lg:px-1 lg:[&>*]:flex-shrink-0 hide-scrollbar">
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
                  // Enforce single, required selection: do not allow clearing to empty.
                  if (!isSelected) onChange(opt);
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
