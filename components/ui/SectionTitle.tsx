interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-16 animate-fade-in relative">
      <div className="relative">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-mono tracking-tight">
          <span className="text-emerald-400 mr-3">&gt;</span>{title}<span className="animate-blink text-emerald-400 ml-1 font-light">_</span>
        </h2>
        {subtitle && (
          <div className="flex gap-3 items-center ml-8">
            <div className="h-px w-8 bg-zinc-700" />
            <p className="text-sm text-zinc-500 font-mono">{subtitle}</p>
          </div>
        )}
      </div>
    </div>
  );
}
