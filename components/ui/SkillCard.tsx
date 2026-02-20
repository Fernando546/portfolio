"use client";

import { motion } from "motion/react";

interface SkillCardProps {
  name: string;
  icon?: string;
  proficiency?: "beginner" | "intermediate" | "advanced";
}

export default function SkillCard({ name, proficiency }: SkillCardProps) {
  const proficiencyConfig = {
    beginner: { label: "Familiar", barWidth: "w-1/3" },
    intermediate: { label: "Intermediate", barWidth: "w-2/3" },
    advanced: { label: "Advanced", barWidth: "w-full" },
  };

  const config = proficiency ? proficiencyConfig[proficiency] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="terminal-card group p-5 hover:translate-y-[-2px]"
    >
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-emerald-400 font-mono text-xs">$</span>
          <span className="text-white font-mono text-sm font-medium">{name}</span>
        </div>

        {config && (
          <div className="space-y-2">
            <span className="font-mono text-xs text-zinc-500">
              {config.label}
            </span>
            <div className="h-px bg-zinc-800 rounded-full overflow-hidden">
              <div className={`h-full bg-emerald-400/40 rounded-full ${config.barWidth} transition-all duration-500`} />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
