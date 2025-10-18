interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-16 animate-fade-in relative">
      <div className="relative">
        <h2 className="text-5xl md:text-5xl font-semibold text-white mb-4">
          {title}
        </h2>
        {subtitle && (
          <div className="flex gap-3 items-center">
            <div className="h-1.5 w-12 bg-stone-500 rounded-full"></div>
            <p className="text-lg text-stone-400 font-normal">{subtitle}</p>
          </div>
        )}
      </div>
    </div>
  );
}
