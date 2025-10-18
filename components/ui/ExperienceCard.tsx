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
  type = "work",
}: ExperienceCardProps) {
  return (
    <div className="group animate-fade-in-up relative pl-8 pb-8 border-l-2 border-stone-700 hover:border-stone-500 transition-all duration-300">
      <div className="absolute -left-3.5 top-1 w-6 h-6 bg-stone-800 border-2 border-stone-500 rounded-full"></div>
      <div className="rounded-lg p-4 bg-stone-800/30 border border-stone-700 hover:border-stone-600 hover:shadow-sm transition-all duration-300">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            {company && (
              <p className="text-stone-400 font-normal text-sm">{company}</p>
            )}
          </div>
          <span className="text-xs font-mono text-stone-300 font-semibold">{period}</span>
        </div>
        {description && (
          <p className="text-stone-400 text-sm leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
