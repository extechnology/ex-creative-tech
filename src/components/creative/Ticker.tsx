export default function Ticker() {
  const words = [
    "Creative Engineering",
    "AI Systems",
    "Motion Design",
    "Product Studio",
    "Automation",
    "Immersive UX",
    "Cinematic Web",
    "Cloud Native",
    "Education",
  ];

  return (
    <div className="relative py-6 border-y border-white/[0.06] overflow-hidden bg-black/20">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...words, ...words, ...words].map((w, i) => (
          <span key={i} className="mx-10 font-display text-2xl md:text-4xl text-white/15 hover:text-white/50 transition-colors">
            {w} <span className="text-[color:var(--color-brand-a)] opacity-60">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
