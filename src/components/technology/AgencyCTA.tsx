import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GradientWaves from "../GradientWaves";

/* ------------------------------------------------------------------ */
/* Theme — matched to TechnologyHero                                  */
/* ------------------------------------------------------------------ */

const THEME = {
  cyan: "#35e0ff",
  blue: "#6d5efc",
  purple: "#a855f7",
  background: "#050505",
} as const;

/* ------------------------------------------------------------------ */
/* Content                                                            */
/* ------------------------------------------------------------------ */

const CONTENT = {
  badge: "Automate & Scale",
  headingLine1: "Personalized Messaging,",
  headingLine2: "Powered by Automation.",
  description:
    "Deliver personalized communication at scale with intelligent automation that engages customers, strengthens relationships, and drives growth.",
  primaryCta: {
    label: "Initiate the Action",
    href: "/companies#ex-edu",
  },
  secondaryCta: {
    label: "Automate Your Message",
    href: "https://exedu.in",
  },
};

/* ------------------------------------------------------------------ */
/* CTA Button                                                         */
/* ------------------------------------------------------------------ */

function PillButton({
  label,
  href,
  variant,
}: {
  label: string;
  href: string;
  variant: "solid" | "outline";
}) {
  const isExternal = href.startsWith("http");

  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={[
        "inline-flex w-full items-center justify-center rounded-full px-6 py-3.5",
        "text-[14px] font-semibold tracking-wide transition-all duration-300",
        "sm:w-auto sm:px-7 sm:text-[15px]",
        variant === "solid"
          ? "text-[#050505] shadow-[0_10px_30px_-8px_rgba(53,224,255,0.55)]"
          : "border border-white/15 bg-white/[0.025] text-slate-100 backdrop-blur-sm hover:border-[#35e0ff]/40 hover:bg-[#35e0ff]/[0.06]",
      ].join(" ")}
      style={
        variant === "solid"
          ? {
            background: `linear-gradient(
                120deg,
                ${THEME.cyan} 0%,
                ${THEME.blue} 55%,
                ${THEME.purple} 100%
              )`,
          }
          : undefined
      }
    >
      {label}
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/* Main CTA Section                                                   */
/* ------------------------------------------------------------------ */

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  const inView = useInView(sectionRef, {
    once: true,
    amount: 0.25,
  });

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex w-full items-center overflow-hidden py-20 sm:py-24 lg:py-24"
      style={{ background: THEME.background }}
    >
      {/* ------------------------------------------------------------ */}
      {/* Gradient Waves Background                                    */}
      {/* ------------------------------------------------------------ */}

      <div className="absolute inset-0 -z-20">
        <GradientWaves
          horizonColor="#02070A"
          waveColor="#006B8F"
          crestColor="#00D9FF"
          speed={0.4}
          amplitude={2.5}
          waveScale={0.6}
          waveRatio={0.9}
          swell={35}
          turbulence={20}
          tilt={1.11}
          zoom={1}
          height={5.5}
          fogDepth={15}
          detail="medium"
          brightness={1}
          opacity={1}
          mouseInteraction
          parallaxStrength={0.5}
          grain
          grainIntensity={0.05}
        />
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Subtle Gradient Overlay                                      */}
      {/* ------------------------------------------------------------ */}

      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          background: `
            radial-gradient(
              circle at 50% 45%,
              ${THEME.cyan}18 0%,
              ${THEME.blue}10 35%,
              transparent 70%
            )
          `,
        }}
      />

      {/* ------------------------------------------------------------ */}
      {/* Content                                                      */}
      {/* ------------------------------------------------------------ */}

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 text-center sm:px-8">
        {/* Badge */}

        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            ease: [0.2, 0.7, 0.2, 1],
          }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#35e0ff]/25 bg-[#35e0ff]/[0.05] px-4 py-[7px] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#35e0ff] sm:text-[12px]"
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: THEME.cyan,
              boxShadow: `0 0 8px 2px ${THEME.cyan}99`,
            }}
          />

          {CONTENT.badge}
        </motion.span>

        {/* Heading */}

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.75,
            delay: 0.1,
            ease: [0.2, 0.7, 0.2, 1],
          }}
          className="max-w-4xl text-[32px] font-extrabold leading-[1.12] tracking-tight text-slate-50 sm:text-[46px] lg:text-[58px]"
        >
          {CONTENT.headingLine1}

          <br />

          <span
            className="bg-clip-text italic text-transparent"
            style={{
              backgroundImage: `linear-gradient(
                90deg,
                ${THEME.cyan} 0%,
                ${THEME.blue} 55%,
                ${THEME.purple} 100%
              )`,
            }}
          >
            {CONTENT.headingLine2}
          </span>
        </motion.h2>

        {/* Description */}

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.2, 0.7, 0.2, 1],
          }}
          className="mx-auto mt-5 max-w-2xl text-[14.5px] leading-relaxed text-slate-400 sm:mt-6 sm:text-[16px]"
        >
          {CONTENT.description}
        </motion.p>

        {/* CTA Buttons */}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: [0.2, 0.7, 0.2, 1],
          }}
          className="mt-8 flex w-full max-w-md flex-col items-center gap-3 sm:mt-9 sm:w-auto sm:max-w-none sm:flex-row sm:justify-center sm:gap-4"
        >
          <PillButton
            label={CONTENT.primaryCta.label}
            href={CONTENT.primaryCta.href}
            variant="outline"
          />

          <PillButton
            label={CONTENT.secondaryCta.label}
            href={CONTENT.secondaryCta.href}
            variant="outline"
          />
        </motion.div>
      </div>
    </section>
  );
}