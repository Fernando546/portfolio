interface SkillCardProps {
  name: string;
  icon?: string;
  proficiency?: "beginner" | "intermediate" | "advanced";
}

export default function SkillCard({ name, proficiency }: SkillCardProps) {
  return (
    <div className="group animate-fade-in-up relative p-6 rounded-lg border border-stone-700 bg-stone-800/50 hover:bg-stone-700/70 hover:border-stone-600 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
      <div className="relative z-10">
        <p className="text-lg font-semibold text-white">{name}</p>
        {proficiency && (
          <div className="mt-4 flex gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 w-10 rounded-full transition-all duration-300 ${
                  i <=
                  (proficiency === "beginner"
                    ? 1
                    : proficiency === "intermediate"
                      ? 2
                      : 3)
                    ? "bg-stone-500 shadow-lg shadow-stone-500/50"
                    : "bg-stone-700"
                }`}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
