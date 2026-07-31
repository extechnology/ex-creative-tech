import React from "react";
import { motion } from "motion/react";
import DarkVeil from "@/components/DarkVeil";

export interface HeroSectionProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Full-bleed hero. DarkVeil sits absolutely inside a relatively-positioned
 * container that owns its own height — the shader never has to guess its
 * bounds. Height is mobile-first: enough to breathe on a phone (100dvh
 * capped) without leaving desktop with an awkward wall of empty canvas.
 */
export default function HeroSection({
  eyebrow = "About Closeify",
  title,
  subtitle,
  children,
  className = "",
}: HeroSectionProps) {
  return (
    <section
      className={`relative w-full overflow-hidden bg-[#050508] min-h-[100dvh] sm:min-h-0 sm:h-[640px] lg:h-[720px] flex items-center ${className}`}
    >
      {/* DarkVeil background — fills the section exactly */}
      <div style={{ position: "absolute", inset: 0 }}>
        <DarkVeil
          hueShift={252}
          noiseIntensity={0.035}
          scanlineIntensity={0.12}
          speed={0.4}
          scanlineFrequency={7}
          warpAmount={0.16}
        />
      </div>

      {/* Vignette so type stays legible over the shader at every viewport */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/70 via-transparent to-[#050508] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#050508_92%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-5 sm:px-6 text-center py-16 sm:py-0">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-white/70">
            {eyebrow}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          className="font-sans text-[2.1rem] leading-[1.08] sm:text-5xl md:text-6xl font-semibold tracking-tight text-white text-balance"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14 }}
            className="mt-5 max-w-xl mx-auto text-sm sm:text-base text-white/55 leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* Scroll cue — desktop only, quiet */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="hidden sm:flex absolute bottom-7 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-10"
      >
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30">
          Scroll
        </span>
        <span className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
}