"use client";

import { useRef, useEffect, useState } from "react";
import { useMotionValue, useSpring, useTransform } from "motion/react";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
}

export default function ProjectCard({
  title,
  description,
  tech,
  link,
  github,
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["10deg", "-10deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-10deg", "10deg"]
  );

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX / rect.width - rect.left / rect.width - 0.5);
    y.set(e.clientY / rect.height - rect.top / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        // @ts-expect-error motion values work as CSS values
        "--rx": rotateX,
        "--ry": rotateY,
        transform: `perspective(800px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))`,
        transformStyle: "preserve-3d",
      }}
      className={`terminal-card group glitch-hover transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
    >
      {/* Terminal Header */}
      <div className="terminal-header">
        <div className="terminal-dot red" />
        <div className="terminal-dot yellow" />
        <div className="terminal-dot green" />
        <span className="ml-3 text-xs font-mono text-zinc-600 truncate">
          {title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}
        </span>
      </div>

      {/* Content */}
      <div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 p-6"
      >
        <h3 className="text-lg font-bold text-white mb-2 font-mono glitch-text" data-text={title}>
          {title}
        </h3>
        <p className="text-zinc-400 mb-4 text-sm leading-relaxed">
          {description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tech.map((t) => (
            <span
              key={t}
              className="inline-block px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs rounded font-mono hover:border-zinc-600 transition-all duration-300"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-zinc-800/50">
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-medium text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-md hover:bg-emerald-500/5 hover:border-emerald-400/40 transition-all duration-300"
            >
              Live Demo →
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-medium text-zinc-300 border border-zinc-700 px-4 py-2 rounded-md hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-300"
            >
              Source →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
