"use client";

import { ReactNode, useRef, useEffect, useState } from "react";

interface HobbyCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export default function HobbyCard({ title, description, icon }: HobbyCardProps) {
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
      className={`terminal-card group p-5 hover:translate-y-[-2px] transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
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
    </div>
  );
}
