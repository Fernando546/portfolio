"use client";

import { useRef, useEffect, useState } from "react";

interface SkillCardProps {
  name: string;
  icon?: string;
  proficiency?: "beginner" | "intermediate" | "advanced";
}

export default function SkillCard({ name, proficiency }: SkillCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const proficiencyConfig = {
    beginner: { label: "Familiar", barWidth: "w-1/3" },
    intermediate: { label: "Intermediate", barWidth: "w-2/3" },
    advanced: { label: "Advanced", barWidth: "w-full" },
  };

  const config = proficiency ? proficiencyConfig[proficiency] : null;

  return (
    <div
      ref={ref}
      className={`terminal-card group p-5 hover:translate-y-[-2px] transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
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
    </div>
  );
}
