import { motion } from "motion/react";

/** Reusable section eyebrow label */
export function SectionLabel({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
      className={`inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/40 ${className}`}
    >
      <span className="w-6 h-px bg-[color:var(--color-brand-a)] opacity-60" />
      {text}
    </motion.div>
  );
}

/** Animated section heading */
export function SectionHeading({
  children,
  delay = 0,
  className = "",
}: {
  children: string;
  delay?: number;
  className?: string;
}) {
  const words = children.split(" ");
  return (
    <h2 className={`font-display text-white leading-[0.93] tracking-tight ${className}`} aria-label={children}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.22em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.07,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

/** Standard section intro block */
export function SectionIntro({
  eyebrow,
  title,
  copy,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className}`}>
      <SectionLabel text={eyebrow} className={align === "center" ? "justify-center" : ""} />
      <SectionHeading className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
        {title}
      </SectionHeading>
      {copy && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className={`mt-5 text-white/50 leading-relaxed max-w-2xl ${align === "center" ? "mx-auto" : ""}`}
        >
          {copy}
        </motion.p>
      )}
    </div>
  );
}
