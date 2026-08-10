import { motion } from "motion/react";
import { type ReactNode, type ComponentType } from "react";
import { ArrowUpRight } from "lucide-react";

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
    line2: string;
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
  ambientGradients?: {
    mainBlobClass?: string;
    topBlobClass?: string;
    bottomBlobClass?: string;
  };
  rightVisual?: ReactNode;
}

export default function BasePageHero({
  badge,
  heading,
  description,
  primaryCta,
  secondaryCta,
  ambientGradients = {
    mainBlobClass: "from-cyan-600/20 via-blue-600/25 to-sky-500/10",
    topBlobClass: "bg-cyan-500/15",
    bottomBlobClass: "bg-blue-600/15",
  },
  rightVisual,
}: BasePageHeroProps) {
  const BadgeIcon = badge.icon;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[#050505] text-white">
      {/* Ambient Gradient Blur Blobs */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] bg-gradient-to-tr ${ambientGradients.mainBlobClass || "from-cyan-600/20 via-blue-600/25 to-sky-500/10"} rounded-full blur-[120px] pointer-events-none z-0 opacity-75`} />
      <div className={`absolute top-1/3 -right-20 w-80 h-80 ${ambientGradients.topBlobClass || "bg-cyan-500/15"} rounded-full blur-[100px] pointer-events-none z-0`} />
      <div className={`absolute bottom-10 -left-20 w-80 h-80 ${ambientGradients.bottomBlobClass || "bg-blue-600/15"} rounded-full blur-[100px] pointer-events-none z-0`} />

      {/* Grid line overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Small Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-inner text-xs sm:text-sm text-white/80 font-medium"
            >
              <span className={`flex h-2 w-2 rounded-full bg-gradient-to-r ${badge.dotGradientClass || "from-cyan-400 to-blue-500"} animate-pulse`} />
              <BadgeIcon className={`w-3.5 h-3.5 ${badge.iconColorClass || "text-cyan-400"}`} />
              <span className="tracking-wide">{badge.label}</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
              className="font-sans text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] text-balance"
            >
              {heading.line1}{" "}
              <span className="bg-gradient-to-r from-white via-white/90 to-white/40 bg-clip-text text-transparent">
                {heading.whiteGradientText}
              </span>{" "}
              {heading.line2}{" "}
              <span className={`bg-gradient-to-r ${heading.accentGradientClass} bg-clip-text text-transparent italic font-serif font-normal`}>
                {heading.accentText}
              </span>
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg text-white/60 leading-relaxed font-normal"
            >
              {description}
            </motion.p>

            {/* CTA Buttons */}
            {(primaryCta || secondaryCta) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
              >
                {primaryCta && (
                  <a
                    href={primaryCta.href}
                    className={`group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-all duration-300 ${
                      primaryCta.shadowClass || "shadow-[0_0_30px_rgba(0,229,255,0.25)] hover:shadow-[0_0_40px_rgba(0,229,255,0.45)]"
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

          {/* Right Visual Slot */}
          {rightVisual && (
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              {rightVisual}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
