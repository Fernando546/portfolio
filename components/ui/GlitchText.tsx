"use client";

import { useRef, useEffect, useState } from "react";

interface GlitchTextProps {
    text: string;
    className?: string;
    as?: "span" | "h1" | "h2" | "h3" | "p";
    children?: React.ReactNode;
}

export default function GlitchText({ text, className = "", as: Tag = "span", children }: GlitchTextProps) {
    const ref = useRef<HTMLElement>(null);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Small delay for dramatic effect
                    setTimeout(() => setActive(true), 100);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <Tag
            ref={ref as React.Ref<any>}
            data-text={text}
            className={`glitch-text ${active ? "glitch-active" : ""} ${className}`}
        >
            {children || text}
        </Tag>
    );
}
