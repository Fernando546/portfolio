"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef, useCallback } from "react";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
}

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
}

export const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 10,
  maxSpeed = 30,
  minDelay = 1200,
  maxDelay = 4200,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 10,
  starHeight = 2,
  className,
}) => {
  const [star, setStar] = useState<ShootingStar | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const isVisibleRef = useRef(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animFrameRef = useRef<number>(0);

  const getRandomStartPoint = useCallback(() => {
    const side = Math.floor(Math.random() * 4);
    const offset = Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000);
    const h = typeof window !== "undefined" ? window.innerHeight : 800;
    const w = typeof window !== "undefined" ? window.innerWidth : 1000;

    switch (side) {
      case 0: return { x: offset, y: 0, angle: 45 };
      case 1: return { x: w, y: offset, angle: 135 };
      case 2: return { x: offset, y: h, angle: 225 };
      case 3: return { x: 0, y: offset, angle: 315 };
      default: return { x: 0, y: 0, angle: 45 };
    }
  }, []);

  // IntersectionObserver — pause when off-screen
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );

    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  // Create stars on interval
  useEffect(() => {
    const createStar = () => {
      if (isVisibleRef.current) {
        const { x, y, angle } = getRandomStartPoint();
        setStar({
          id: Date.now(),
          x,
          y,
          angle,
          scale: 1,
          speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
          distance: 0,
        });
      }

      const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
      timeoutRef.current = setTimeout(createStar, randomDelay);
    };

    createStar();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [minSpeed, maxSpeed, minDelay, maxDelay, getRandomStartPoint]);

  // Animate star movement — using requestAnimationFrame with ref, not state per frame
  useEffect(() => {
    if (!star) return;

    const moveStar = () => {
      setStar((prevStar) => {
        if (!prevStar) return null;
        if (!isVisibleRef.current) return prevStar;

        const newX =
          prevStar.x +
          prevStar.speed * Math.cos((prevStar.angle * Math.PI) / 180);
        const newY =
          prevStar.y +
          prevStar.speed * Math.sin((prevStar.angle * Math.PI) / 180);
        const newDistance = prevStar.distance + prevStar.speed;
        const newScale = 1 + newDistance / 100;

        const w = typeof window !== "undefined" ? window.innerWidth : 1000;
        const h = typeof window !== "undefined" ? window.innerHeight : 800;

        if (newX < -20 || newX > w + 20 || newY < -20 || newY > h + 20) {
          return null;
        }
        return {
          ...prevStar,
          x: newX,
          y: newY,
          distance: newDistance,
          scale: newScale,
        };
      });

      animFrameRef.current = requestAnimationFrame(moveStar);
    };

    animFrameRef.current = requestAnimationFrame(moveStar);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [star?.id]); // Only re-run when a new star is created (new id), not on every position update

  return (
    <svg
      ref={svgRef}
      className={cn("w-full h-full absolute inset-0", className)}
    >
      {star && (
        <rect
          key={star.id}
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight}
          fill="url(#gradient)"
          transform={`rotate(${star.angle}, ${star.x + (starWidth * star.scale) / 2
            }, ${star.y + starHeight / 2})`}
        />
      )}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop
            offset="100%"
            style={{ stopColor: starColor, stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};
