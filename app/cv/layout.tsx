import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "CV — Dawid Feruś | Full-Stack Developer",
    description: "CV programisty Full-Stack — doświadczenie, umiejętności, projekty",
};

export default function CVLayout({ children }: { children: React.ReactNode }) {
    return children;
}
