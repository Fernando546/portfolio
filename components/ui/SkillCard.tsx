"use client";

import { useRef, useEffect, useState } from "react";

interface SkillCardProps {
  name: string;
}

export default function SkillCard({ name }: SkillCardProps) {
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
      className={`terminal-card group p-4 hover:translate-y-[-2px] transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-emerald-400 font-mono text-xs">$</span>
        <span className="text-white font-mono text-sm font-medium">{name}</span>
      </div>
    </div>
  );
}
