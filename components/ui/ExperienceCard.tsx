"use client";

import { useRef, useEffect, useState } from "react";

interface ExperienceCardProps {
  company?: string;
  title: string;
  period: string;
  description?: string;
  type?: "work" | "education";
}

export default function ExperienceCard({
  company,
  title,
  period,
  description,
}: ExperienceCardProps) {
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

  return (
    <div
      ref={ref}
      className={`terminal-card group p-5 border-l-2 border-zinc-800 hover:border-emerald-500/30 transition-all duration-500 ease-out ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
        }`}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-emerald-400 font-mono text-xs">→</span>
            <h3 className="text-sm font-semibold text-white font-mono">{title}</h3>
          </div>
          {company && (
            <p className="text-zinc-500 font-mono text-xs ml-5">{company}</p>
          )}
        </div>
        <span className="text-xs font-mono text-zinc-600 whitespace-nowrap">
          {period}
        </span>
      </div>
      {description && (
        <p className="text-zinc-400 text-sm leading-relaxed mt-3 ml-5">
          {description}
        </p>
      )}
    </div>
  );
}
