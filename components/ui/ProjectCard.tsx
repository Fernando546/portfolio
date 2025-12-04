import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

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

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="group animate-fade-in-up relative overflow-hidden rounded-lg border border-stone-700 bg-stone-800/50 hover:bg-stone-700/70 hover:border-stone-600 hover:shadow-lg transition-all duration-300 p-6 backdrop-blur-sm"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="relative z-10"
      >
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-stone-400 mb-4 text-sm leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((t) => (
            <span
              key={t}
              className="inline-block px-3 py-1 bg-stone-700/80 border border-stone-600 text-stone-200 text-xs rounded-full hover:border-stone-500 hover:shadow-lg hover:shadow-stone-500/30 transition-all duration-300 font-medium"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-white bg-stone-600 px-4 py-2 rounded-lg hover:bg-stone-500 hover:shadow-lg hover:shadow-stone-600/50 transition-all duration-300"
            >
              Live Demo →
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-white border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-stone-800 transition-all duration-300"
            >
              GitHub →
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
