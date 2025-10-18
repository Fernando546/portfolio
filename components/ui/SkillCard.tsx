interface SkillCardProps {
  name: string;
  icon?: string;
  proficiency?: "beginner" | "intermediate" | "advanced";
}

export default function SkillCard({ name, proficiency }: SkillCardProps) {
  const proficiencyLabel = {
    beginner: "Familiar",
    intermediate: "Intermediate",
    advanced: "Advanced",
  };

  return (
    <div className="group animate-fade-in-up relative p-6 rounded-lg border border-stone-700 bg-stone-800/50 hover:bg-stone-700/70 hover:border-stone-600 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
      <div className="relative z-10 flex justify-between items-center">
        <p className="text-lg font-semibold text-white">{name}</p>
        {proficiency && (
          <span className="ml-4 px-3 py-1 bg-stone-600/50 text-stone-200 text-xs font-semibold rounded-full border border-stone-600">
            {proficiencyLabel[proficiency]}
          </span>
        )}
      </div>
    </div>
  );
}
