import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "motion/react";
import {
  GraduationCap,
  Sparkles,
  RefreshCw,
  Rocket,
  ArrowUpRight,
  Cpu,
} from "lucide-react";

/* ── Exact User Content Constants ────────────────────────────── */
const EYEBROW = "KNOWLEDGE THAT KEEPS MOVING";
const HEADLINE_LINE_1 = "The ecosystem doesn't only create technology;";
const HEADLINE_LINE_2 = "it creates people who can create technology.";
const PILLARS_STRING = "Learn. Create. Adapt. Lead";
const DESCRIPTION =
  "The digital world never stops evolving. We build creative and digital capabilities through practical learning, industry-focused skills, technology and continuous innovation.";

const PILLARS = [
  {
    index: "01",
    label: "Learn",
    tagline: "Skills & System Fundamentals",
    metric: "98% Skill Velocity",
    code: "CAPABILITY_01",
    icon: GraduationCap,
    accent: "#38BDF8", // Sky Cyan
    glow: "rgba(56, 189, 248, 0.55)",
    coords: { x: 22, y: 24 },
  },
  {
    index: "02",
    label: "Create",
    tagline: "Hands-on Building & Craft",
    metric: "Production-Ready Output",
    code: "CAPABILITY_02",
    icon: Sparkles,
    accent: "#818CF8", // Electric Indigo
    glow: "rgba(129, 140, 248, 0.55)",
    coords: { x: 78, y: 24 },
  },
  {
    index: "03",
    label: "Adapt",
    tagline: "Evolution & AI Agility",
    metric: "Adaptive Intelligence",
    code: "CAPABILITY_03",
    icon: RefreshCw,
    accent: "#C084FC", // Neon Violet
    glow: "rgba(192, 132, 252, 0.55)",
    coords: { x: 22, y: 76 },
  },
  {
    index: "04",
    label: "Lead",
    tagline: "Innovation & Vision",
    metric: "Ecosystem Mastery",
    code: "CAPABILITY_04",
    icon: Rocket,
    accent: "#FB7185", // Coral Rose
    glow: "rgba(251, 113, 133, 0.55)",
    coords: { x: 78, y: 76 },
  },
] as const;

const PARTICLES = [
  { left: "10%", top: "18%", size: 3, duration: 7, delay: 0 },
  { left: "22%", top: "66%", size: 2, duration: 9, delay: 0.8 },
  { left: "78%", top: "16%", size: 2.5, duration: 7.5, delay: 1.2 },
  { left: "88%", top: "72%", size: 3, duration: 8.5, delay: 0.4 },
  { left: "50%", top: "12%", size: 2, duration: 10, delay: 1.8 },
  { left: "62%", top: "84%", size: 2.5, duration: 7.2, delay: 0.9 },
];

const easeOut = [0.16, 1, 0.3, 1] as const;

/* Autoplay timing — shared by the interval and the progress ring so
   they always stay in sync. */
const AUTOPLAY_MS = 4000;

/* ── Holographic Nexus Stage: Interactive Cyber-Engine ────────── */
function HolographicNexusStage({
  activePillar,
  setActivePillar,
  isPaused,
  setIsPaused,
  cycleKey,
}: {
  activePillar: number;
  setActivePillar: (i: number) => void;
  isPaused: boolean;
  setIsPaused: (v: boolean) => void;
  cycleKey: number;
}) {
  const current = PILLARS[activePillar];
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="relative aspect-square w-full max-w-[480px] lg:max-w-[520px] mx-auto flex items-center justify-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Dynamic Ambient Backing Halo — color tweened via animate, not a hard class swap */}
      <motion.div
        className="pointer-events-none absolute inset-6 rounded-full opacity-30 blur-3xl"
        animate={{ backgroundColor: current.accent }}
        transition={{ duration: 0.8, ease: easeOut }}
      />

      {/* Futuristic SVG Laser Conduits & Orbital Hologram */}
      <svg
        viewBox="0 0 100 100"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      >
        <defs>
          <linearGradient id="nexusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="35%" stopColor="#818CF8" />
            <stop offset="70%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#FB7185" />
          </linearGradient>

          <filter id="neonBeamGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Orbital Grid Track */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="0.6"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="0.8"
          strokeDasharray="2 6"
        />

        {/* Autoplay Progress Ring — sweeps once per cycle, resets on slide change */}
        {!prefersReducedMotion && (
          <motion.circle
            key={cycleKey}
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={current.accent}
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="283" // ~2 * PI * 45
            initial={{ strokeDashoffset: 283, opacity: 0.9 }}
            animate={
              isPaused
                ? { strokeDashoffset: undefined }
                : { strokeDashoffset: 0 }
            }
            transition={{
              duration: AUTOPLAY_MS / 1000,
              ease: "linear",
            }}
            style={{ transform: "rotate(-90deg)", transformOrigin: "50px 50px" }}
            filter="url(#neonBeamGlow)"
          />
        )}

        {/* Diagonal Crosshair Coordinate Rays */}
        <line
          x1="10"
          y1="50"
          x2="90"
          y2="50"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="0.5"
          strokeDasharray="2 4"
        />
        <line
          x1="50"
          y1="10"
          x2="50"
          y2="90"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="0.5"
          strokeDasharray="2 4"
        />

        {/* Active Laser Conduits Connecting the 4 Nodes to Center */}
        {PILLARS.map((p, i) => {
          const isTarget = activePillar === i;
          return (
            <g key={p.label}>
              {/* Base Line — now a motion.line so stroke color actually tweens
                  instead of snapping (a plain <line> can't animate its own
                  attribute change without a motion value). */}
              <motion.line
                x1={p.coords.x}
                y1={p.coords.y}
                x2={50}
                y2={50}
                animate={{
                  stroke: isTarget ? p.accent : "rgba(255,255,255,0.12)",
                  strokeWidth: isTarget ? 1.2 : 0.6,
                  strokeOpacity: isTarget ? 0.9 : 0.4,
                }}
                transition={{ duration: 0.6, ease: easeOut }}
                filter={isTarget ? "url(#neonBeamGlow)" : undefined}
              />

              {/* Pulsing Energy Conduit */}
              <motion.line
                x1={p.coords.x}
                y1={p.coords.y}
                x2={50}
                y2={50}
                stroke="url(#nexusGrad)"
                strokeDasharray="3 3"
                filter="url(#neonBeamGlow)"
                animate={{
                  strokeDashoffset: [0, -24],
                  strokeWidth: isTarget ? 2 : 1,
                }}
                transition={{
                  strokeDashoffset: {
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  strokeWidth: { duration: 0.6, ease: easeOut },
                }}
              />

              {/* Traveling Light Orb */}
              <motion.circle
                fill={p.accent}
                filter="url(#neonBeamGlow)"
                animate={{
                  r: isTarget ? 2 : 1.2,
                  cx: [p.coords.x, 50, p.coords.x],
                  cy: [p.coords.y, 50, p.coords.y],
                  opacity: isTarget ? [0.4, 1, 0.4] : [0.1, 0.5, 0.1],
                }}
                transition={{
                  cx: {
                    duration: 2.4 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  },
                  cy: {
                    duration: 2.4 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  },
                  opacity: {
                    duration: 2.4 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  },
                  r: { duration: 0.4, ease: easeOut },
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Central Animated Liquid-Glass Core Sphere (No Solid Black) */}
      <div className="relative z-20 flex h-28 w-28 sm:h-32 sm:w-32 lg:h-36 lg:w-36 items-center justify-center">
        {/* Animated Liquid Radial Aura — color tweened, not swapped */}
        <motion.div
          className="absolute -inset-4 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.65, 0.95, 0.65],
            background: `radial-gradient(circle, ${current.accent}aa, rgba(129,140,248,0.35) 55%, transparent 75%)`,
          }}
          transition={{
            scale: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
            background: { duration: 0.8, ease: easeOut },
          }}
        />

        {/* Counter-Rotating Orbital Rings */}
        <motion.div
          animate={prefersReducedMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-2 rounded-full border border-dashed border-white/30"
        />
        <motion.div
          animate={prefersReducedMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-4 rounded-full border border-dotted border-cyan-400/40"
        />

        {/* Liquid Glass Core Sphere with Radiant Sheen */}
        <motion.div
          animate={{
            boxShadow: [
              `0 0 20px -2px ${current.accent}66, inset 0 1px 2px rgba(255,255,255,0.6), inset 0 -4px 12px rgba(0,0,0,0.3)`,
              `0 0 35px 4px ${current.accent}88, inset 0 1px 3px rgba(255,255,255,0.8), inset 0 -4px 12px rgba(0,0,0,0.3)`,
              `0 0 20px -2px ${current.accent}66, inset 0 1px 2px rgba(255,255,255,0.6), inset 0 -4px 12px rgba(0,0,0,0.3)`,
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-full w-full flex-col items-center justify-center rounded-full border border-white/30 bg-white/[0.08] backdrop-blur-2xl p-3 text-center overflow-hidden"
        >
          {/* Animated Liquid Gradient Backing — color tweened */}
          <motion.div
            animate={{
              rotate: [0, 360],
              background: `conic-gradient(from 0deg, transparent, ${current.accent}, #818CF8, transparent)`,
            }}
            transition={{
              rotate: { duration: 12, repeat: Infinity, ease: "linear" },
              background: { duration: 0.8, ease: easeOut },
            }}
            className="pointer-events-none absolute -inset-10 opacity-40 blur-lg"
          />

          {/* Liquid Sheen */}
          <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/35 via-white/[0.05] to-transparent opacity-80" />

          {/* Core Content — label crossfades in on change */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <Cpu className="h-5 w-5 sm:h-6 sm:w-6 text-white animate-pulse drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-widest text-white uppercase mt-1 drop-shadow-md">
              KNOWLEDGE
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={current.label}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0, color: current.accent }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.35, ease: easeOut }}
                className="font-mono text-[8px] sm:text-[9px] font-bold tracking-wider uppercase mt-0.5"
              >
                {current.label}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* 4 Compact Holographic Glass Tiles in Quadrants */}
      {PILLARS.map((pillar, i) => {
        const Icon = pillar.icon;
        const isSelected = activePillar === i;

        return (
          <motion.div
            key={pillar.label}
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.06, y: -4 }}
            animate={{
              scale: isSelected ? 1.03 : 1,
              boxShadow: isSelected
                ? `0 0 25px -3px ${pillar.glow}, inset 0 0 12px ${pillar.accent}25`
                : "0 8px 24px -8px rgba(0,0,0,0.5)",
            }}
            transition={{ duration: 0.5, ease: easeOut }}
            onClick={() => {
              setActivePillar(i);
              setIsPaused(true);
            }}
            onMouseEnter={() => setActivePillar(i)}
            className={`group absolute flex w-[43%] sm:w-[41%] flex-col justify-between rounded-2xl border p-3.5 sm:p-4 backdrop-blur-2xl transition-colors duration-400 -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden ${isSelected
                ? "border-white/45 bg-white/[0.09]"
                : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]"
              }`}
            style={{
              left: `${pillar.coords.x}%`,
              top: `${pillar.coords.y}%`,
            }}
          >
            {/* Ambient Corner Glow */}
            <div
              className="pointer-events-none absolute -inset-6 rounded-full opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-45"
              style={{ backgroundColor: pillar.accent }}
            />

            {/* Top Accent Stroke */}
            <motion.div
              className="absolute inset-x-0 top-0 h-[2px]"
              animate={{ opacity: isSelected ? 1 : 0 }}
              transition={{ duration: 0.4, ease: easeOut }}
              style={{
                background: `linear-gradient(90deg, transparent, ${pillar.accent}, transparent)`,
              }}
            />

            {/* Tile Header: Icon & Phase Numeral */}
            <div className="relative z-10 flex w-full items-center justify-between">
              <div
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-md transition-colors duration-300 group-hover:bg-white/15"
                style={{ color: pillar.accent }}
              >
                <Icon className="h-4 w-4 text-white sm:h-4.5 sm:w-4.5" />
              </div>

              <span
                className="font-mono text-[9px] sm:text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.03]"
                style={{ color: pillar.accent }}
              >
                {pillar.index}
              </span>
            </div>

            {/* Title & Tagline (Short & Clean) */}
            <div className="relative z-10 mt-2">
              <span className="text-sm sm:text-base font-bold leading-tight text-white group-hover:text-white">
                {pillar.label}
              </span>
              <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-cyan-300/70 mt-0.5 truncate">
                {pillar.tagline}
              </p>
            </div>

            {/* Tile Footer */}
            <div className="relative z-10 mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40 group-hover:text-white">
              <span className="truncate">{pillar.metric}</span>
              <ArrowUpRight className="h-3 w-3 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ── Main Section Component ───────────────────────────────────── */
export default function KnowledgeMovingSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activePillar, setActivePillar] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const blob1Y = useTransform(sectionProgress, [0, 1], [-60, 60]);
  const blob2Y = useTransform(sectionProgress, [0, 1], [60, -60]);

  // Autoplay: advance to the next pillar every AUTOPLAY_MS, unless paused
  // (hover / manual click). cycleKey forces the progress ring to restart
  // its sweep whenever the active pillar changes for any reason.
  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;
    const timer = setInterval(() => {
      setActivePillar((prev) => (prev + 1) % PILLARS.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  useEffect(() => {
    setCycleKey((k) => k + 1);
  }, [activePillar]);

  const handleSetActivePillar = useCallback((i: number) => {
    setActivePillar(i);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="knowledge-moving"
      className="relative w-full overflow-hidden bg-[#050505] px-4 py-20 sm:px-8 sm:py-14 md:py-20 lg:px-12 selection:bg-cyan-400 selection:text-black"
    >
      {/* ── AMBIENT BACKDROPS ──────────────────────────────────── */}
      <motion.div
        style={{ y: prefersReducedMotion ? 0 : blob1Y }}
        className="pointer-events-none absolute -left-48 top-1/4 h-[480px] w-[480px] rounded-full bg-[#38BDF8]/14 blur-[130px]"
      />
      <motion.div
        style={{ y: prefersReducedMotion ? 0 : blob2Y }}
        className="pointer-events-none absolute -right-48 bottom-1/4 h-[460px] w-[460px] rounded-full bg-[#FB7185]/12 blur-[130px]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(56,189,248,0.04),transparent_75%)]" />

      {/* Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

      {/* Floating Particles */}
      {!prefersReducedMotion &&
        PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="pointer-events-none absolute rounded-full bg-cyan-200/35"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              boxShadow: "0 0 8px rgba(56,189,248,0.7)",
            }}
            animate={{
              y: [0, -18, 0],
              opacity: [0.15, 0.7, 0.15],
              scale: [0.9, 1.25, 0.9],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      <div className="relative mx-auto max-w-7xl">
        {/* ── 2-COLUMN SIDE-TO-SIDE ARCHITECTURE ─────────────────── */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Narrative Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Eyebrow Pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-sky-500/20 bg-sky-500/[0.04] px-4 py-1.5 backdrop-blur-md shadow-lg"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38BDF8]" />
              </span>
              <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
                {EYEBROW}
              </span>
            </motion.div>

            {/* Subtitle / Four Pillars Ribbon */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.6, ease: easeOut, delay: 0.08 }}
              className="mb-4 font-mono text-xs sm:text-sm font-medium tracking-wider text-sky-300/80 uppercase"
            >
              {PILLARS_STRING}
            </motion.p>

            {/* Main Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: easeOut, delay: 0.14 }}
              className="text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.04em] text-white sm:text-4xl lg:text-[3.2rem]"
            >
              <span>{HEADLINE_LINE_1}</span>
              <br />
              <span
                className="inline-block transition-transform duration-500 hover:scale-[1.01]"
                style={{
                  WebkitTextStroke: "1.5px rgba(56, 189, 248, 0.95)",
                  color: "transparent",
                }}
              >
                {HEADLINE_LINE_2}
              </span>
            </motion.h2>

            {/* Exact User Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease: easeOut, delay: 0.22 }}
              className="mt-6 text-sm sm:text-base leading-relaxed text-white/60 md:text-lg max-w-xl"
            >
              {DESCRIPTION}
            </motion.p>
          </div>

          {/* Right Column: Holographic Knowledge Nexus Stage */}
          <div className="lg:col-span-6 flex items-center justify-center">
            {/* Desktop / Tablet Orbital Stage */}
            <div className="hidden sm:block w-full">
              <HolographicNexusStage
                activePillar={activePillar}
                setActivePillar={handleSetActivePillar}
                isPaused={isPaused}
                setIsPaused={setIsPaused}
                cycleKey={cycleKey}
              />
            </div>

            {/* Mobile Touch-Stack Cards (< sm) */}
            <div className="block sm:hidden w-full space-y-3">
              {PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                const isSelected = activePillar === idx;

                return (
                  <motion.div
                    key={pillar.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, ease: easeOut, delay: idx * 0.08 }}
                    animate={{
                      boxShadow: isSelected
                        ? "0 8px 25px rgba(0,0,0,0.8)"
                        : "0 0px 0px rgba(0,0,0,0)",
                    }}
                    onClick={() => {
                      setActivePillar(idx);
                      setIsPaused(true);
                    }}
                    className={`relative flex items-center justify-between rounded-2xl border p-4 backdrop-blur-xl transition-colors duration-300 active:scale-[0.98] ${isSelected
                        ? "border-white/35 bg-white/[0.08]"
                        : "border-white/10 bg-white/[0.03]"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06]"
                        style={{ color: pillar.accent }}
                      >
                        <Icon className="h-4.5 w-4.5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {pillar.label}
                        </h4>
                        <span className="font-mono text-[10px] text-white/40 uppercase">
                          {pillar.tagline}
                        </span>
                      </div>
                    </div>

                    <span
                      className="font-mono text-xs font-bold px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.04]"
                      style={{ color: pillar.accent }}
                    >
                      {pillar.index}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}