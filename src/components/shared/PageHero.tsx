import { motion } from "motion/react";
import { type ReactNode } from "react";

/**
 * Reusable page hero section with parallax bg, animated headline.
 * Each page passes its own content.
 */
interface PageHeroProps {
  eyebrow: string;
  headingLine1: string;
  headingLine2?: string;
  headingLine2Gradient?: boolean;
  subtext?: string;
  children?: ReactNode;
  /** data-palette attributes for ThemeSwapper */
  palette?: { a: string; b: string; c: string; bg: string };
  minHeight?: string;
}

export default function PageHero({
  eyebrow,
  headingLine1,
  headingLine2,
  headingLine2Gradient = true,
  subtext,
  children,
  palette = { a: "#ffffff", b: "#c9c9d1", c: "#6b6b76", bg: "#050505" },
  minHeight = "min-h-[85svh]",
}: PageHeroProps) {
  return (
    <section
      data-palette=""
      data-palette-a={palette.a}
      data-palette-b={palette.b}
      data-palette-c={palette.c}
      data-palette-bg={palette.bg}
      className={`relative ${minHeight} flex items-end overflow-hidden noise pb-16 md:pb-24`}
    >
      <div className="aurora" />
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Huge background character */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.2, 0.8, 0.2, 1] }}
        className="absolute top-1/2 right-0 -translate-y-1/2 font-display font-bold text-[28vw] leading-none text-white/[0.025] pointer-events-none select-none overflow-hidden"
      >
        EX
      </motion.div>

      <div className="relative z-10 w-[min(1200px,94vw)] mx-auto pt-28">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-white/60 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-brand-a)]" />
          {eyebrow}
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display text-white text-[min(13vw,88px)] leading-[0.92] tracking-tight"
          >
            {headingLine1}
          </motion.h1>
        </div>

        {headingLine2 && (
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
              className={`font-display text-[min(13vw,88px)] leading-[0.92] tracking-tight italic ${
                headingLine2Gradient ? "gradient-text" : "text-white"
              }`}
            >
              {headingLine2}
            </motion.div>
          </div>
        )}

        {/* Sub-text */}
        {subtext && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-7 max-w-xl text-white/50 text-base md:text-lg leading-relaxed"
          >
            {subtext}
          </motion.p>
        )}

        {/* Optional extra content (buttons, etc.) */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-10"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
