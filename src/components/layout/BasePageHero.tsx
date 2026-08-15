import { motion } from "motion/react";
import { type ComponentType, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export interface BasePageHeroPalette {
  /** Primary brand colour (used for --brand-a and --scroll-progress by default) */
  a?: string;
  b?: string;
  c?: string;
  /** Page background colour */
  bg?: string;
  /** Scroll-progress bar colour/gradient — falls back to `a` */
  progress?: string;
}

export interface BasePageHeroProps {
  badge: {
    label: string;
    icon: ComponentType<{ className?: string }>;
    iconColorClass?: string;
    dotGradientClass?: string;
  };
  heading: {
    line1: string;
    whiteGradientText: string;
    line2?: string;
    accentText: string;
    accentGradientClass: string;
  };
  description: string;
  primaryCta?: {
    label: string;
    href: string;
    shadowClass?: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  /**
   * Full background layer for the hero — pass in whatever visual
   * component the page wants (GradientBlinds, Beams, Plasma, Strands,
   * a static gradient, etc). Rendered edge-to-edge behind the content.
   * Falls back to a plain dark background when omitted.
   */
  background?: ReactNode;
  /**
   * Optional brand-palette token overrides for this hero.
   * When provided, the section gets data-palette-* attributes so
   * ThemeSwapper can update the scroll progress bar and global brand
   * colours as soon as the hero scrolls into view.
   */
  palette?: BasePageHeroPalette;
}

export default function BasePageHero({
  badge,
  heading,
  description,
  primaryCta,
  secondaryCta,
  background,
  palette,
}: BasePageHeroProps) {
  const BadgeIcon = badge.icon;

  // Build the heading as word-level segments so the whole line can
  // stagger in on scroll, while each part keeps its own styling.
  const headingSegments: { text: string; className?: string }[] = [
    ...heading.line1.split(" ").map((w) => ({ text: w })),
    ...heading.whiteGradientText
      .split(" ")
      .map((w) => ({
        text: w,
        className: "bg-gradient-to-r from-white via-white/90 to-white/40 bg-clip-text text-transparent",
      })),
    ...(heading.line2?.split(" ").map((w) => ({ text: w })) || []),
    ...heading.accentText.split(" ").map((w) => ({
      text: w,
      className: `bg-gradient-to-r ${heading.accentGradientClass} bg-clip-text text-transparent italic font-serif font-normal`,
    })),
  ];
  // Cap the stagger so a long headline doesn't push the paragraph/CTAs out too far.
  const headingRevealTime = 0.1 + Math.min(headingSegments.length, 8) * 0.045;

  // Spread data-palette-* attributes when a palette is provided
  const paletteDataAttrs = palette
    ? {
        "data-palette": "",
        "data-palette-a": palette.a,
        "data-palette-b": palette.b,
        "data-palette-c": palette.c,
        "data-palette-bg": palette.bg,
        "data-palette-progress": palette.progress ?? palette.a,
      }
    : {};

  return (
    <section
      className="relative min-h-[100vh] flex items-center justify-center pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[#050505] text-white"
      {...paletteDataAttrs}
    >
      {/* Background layer, supplied by the page */}
      {background && (
        <div className="absolute inset-0 z-0">
          {background}
          {/* soften the background toward the edges so text stays legible */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,transparent_0%,#050505_85%)]" />
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-5 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8">
          {/* Small Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-inner text-xs sm:text-sm text-white/80 font-medium"
          >
            <span className={`flex h-2 w-2 rounded-full bg-gradient-to-r ${badge.dotGradientClass || "from-cyan-400 to-blue-500"} animate-pulse`} />
            <BadgeIcon className={`w-3.5 h-3.5 ${badge.iconColorClass || "text-cyan-400"}`} />
            <span className="tracking-wide">{badge.label}</span>
          </motion.div>

          {/* Heading — word-by-word reveal on scroll */}
          <h1 className="font-sans text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] text-balance flex flex-wrap justify-center gap-x-[0.28em]">
            {headingSegments.map((segment, i) => (
              <motion.span
                key={`${segment.text}-${i}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: 0.1 + Math.min(i, 8) * 0.045, ease: [0.215, 0.61, 0.355, 1] }}
                className={`inline-block ${segment.className || ""}`}
              >
                {segment.text}
              </motion.span>
            ))}
          </h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: headingRevealTime + 0.1 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-white/60 leading-relaxed font-normal"
          >
            {description}
          </motion.p>

          {/* CTA Buttons */}
          {(primaryCta || secondaryCta) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: headingRevealTime + 0.2 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-2"
            >
              {primaryCta && (
                <a
                  href={primaryCta.href}
                  className={`group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/5 border border-white text-white font-medium text-sm hover:bg-white/10 transition-all duration-300 ${primaryCta.shadowClass || ""
                    } hover:scale-[1.02] active:scale-[0.98]`}
                >
                  <span>{primaryCta.label}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}

              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-xl"
                >
                  <span>{secondaryCta.label}</span>
                </a>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}