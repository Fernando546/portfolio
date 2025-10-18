interface HobbyCardProps {
  title: string;
  description: string;
}

export default function HobbyCard({ title, description }: HobbyCardProps) {
  return (
    <div className="group animate-fade-in-up relative rounded-lg border border-stone-700 bg-stone-800/50 hover:bg-stone-700/70 hover:border-stone-600 hover:shadow-lg transition-all duration-300 p-6 backdrop-blur-sm">
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-stone-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
