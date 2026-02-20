"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

interface HobbyCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export default function HobbyCard({ title, description, icon }: HobbyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="terminal-card group p-5 hover:translate-y-[-2px]"
    >
      <div className="relative z-10">
        {icon && (
          <div className="mb-3 text-zinc-500 group-hover:text-emerald-400 transition-colors duration-300">
            {icon}
          </div>
        )}
        <h3 className="text-sm font-semibold text-white mb-2 font-mono">{title}</h3>
        <p className="text-zinc-500 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
