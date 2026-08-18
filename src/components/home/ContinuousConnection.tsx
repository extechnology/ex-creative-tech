import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "motion/react";
import {
  Network,
  MessageSquare,
  Bot,
  TrendingUp,
  ChevronRight,
  Sparkles,
  Cpu,
  Play,
  Pause,
} from "lucide-react";

/* ── Exact User Content Constants ────────────────────────────── */
const EYEBROW = "ONE ECOSYSTEM. CONTINUOUS CONNECTION.";
const SUBTITLE = "Communication connects everything together.";
const HEADLINE_LINE_1 = "Create. Connect.";
const HEADLINE_LINE_2 = "Automate. Grow.";
const DESCRIPTION =
  "Bring your audience, technology and communication together through intelligent digital engagement — turning every interaction into an opportunity to build relationships and accelerate growth.";

const STAGES = [
  {
    key: "connect",
    index: "01",
    label: "CONNECT",
    tagline: "OMNI-CHANNEL INTEGRATION",
    description:
      "Unify all communication channels and messaging touchpoints into one synchronous digital fabric.",
    bridge: "Channels converge into engagement",
    stat: "Omni-Channel Sync",
    icon: Network,
    accent: "#06B6D4", // Electric Cyan
    glow: "rgba(6, 182, 212, 0.4)",
    startDeg: 275,
    endDeg: 355,
  },
  {
    key: "engage",
    index: "02",
    label: "ENGAGE",
    tagline: "INTELLIGENT INTERACTION",
    description:
      "Deliver contextual, personalized experiences that turn casual interactions into lasting relationships.",
    bridge: "Interaction activates automation",
    stat: "Real-Time Telemetry",
    icon: MessageSquare,
    accent: "#3B82F6", // Hyper Blue
    glow: "rgba(59, 130, 246, 0.4)",
    startDeg: 5,
    endDeg: 85,
  },
  {
    key: "automate",
    index: "03",
    label: "AUTOMATE",
    tagline: "INSTANT RESPONSE SYSTEMS",
    description:
      "Deploy intelligent workflows and automated response engines that route and nurture in milliseconds.",
    bridge: "Automation drives exponential growth",
    stat: "<10ms Dispatch",
    icon: Bot,
    accent: "#A855F7", // Quantum Purple
    glow: "rgba(168, 85, 247, 0.4)",
    startDeg: 95,
    endDeg: 175,
  },
  {
    key: "grow",
    index: "04",
    label: "GROW",
    tagline: "COMPOUNDING IMPACT",
    description:
      "Transform connected digital journeys into sustained trust, retention, and scalable business velocity.",
    bridge: "The continuous ecosystem expands",
    stat: "Exponential Scale",
    icon: TrendingUp,
    accent: "#10B981", // Emerald Green
    glow: "rgba(16, 185, 129, 0.4)",
    startDeg: 185,
    endDeg: 265,
  },
] as const;

const PARTICLES = [
  { left: "10%", top: "20%", size: 3, duration: 7, delay: 0 },
  { left: "24%", top: "66%", size: 2, duration: 9, delay: 0.8 },
  { left: "76%", top: "18%", size: 2.5, duration: 7.5, delay: 1.2 },
  { left: "88%", top: "72%", size: 3, duration: 8.5, delay: 0.4 },
  { left: "48%", top: "12%", size: 2, duration: 10, delay: 1.8 },
  { left: "62%", top: "84%", size: 2.5, duration: 7.2, delay: 0.9 },
];

const easeOut = [0.16, 1, 0.3, 1] as const;

/* Auto-advance timing (ms) */
const AUTOPLAY_MS = 4800;
/* How long a manual click pauses autoplay before it resumes (ms) */
const MANUAL_PAUSE_MS = 6500;

/* ── SVG Math Helpers ─────────────────────────────────────────── */
function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const start = polarToCartesian(cx, cy, r, endDeg);
  const end = polarToCartesian(cx, cy, r, startDeg);
  const largeArc = endDeg - startDeg <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

/* ── Word-by-Word Scroll Reveal for Narrative ─────────────────── */
function RevealWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const y = useTransform(progress, range, [10, 0]);
  const scale = useTransform(progress, range, [0.96, 1]);
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <span className="mr-[0.28em] inline-block">{word}</span>;
  }

  const isHighlight =
    word.toLowerCase().includes("audience") ||
    word.toLowerCase().includes("communication") ||
    word.toLowerCase().includes("relationships") ||
    word.toLowerCase().includes("growth");

  return (
    <span className="mr-[0.26em] my-[0.04em] inline-block whitespace-nowrap">
      <motion.span
        style={{ opacity, y, scale, display: "inline-block" }}
        className={
          isHighlight
            ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-300 font-semibold drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            : "text-white/85 font-medium"
        }
      >
        {word}
      </motion.span>
    </span>
  );
}

function NarrativeStatement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 55%"],
  });
  const words = useMemo(() => text.split(" "), [text]);
  const total = words.length;

  return (
    <p
      ref={ref}
      className="mx-auto max-w-4xl text-center font-sans text-lg font-medium leading-[1.4] text-white sm:text-2xl sm:leading-[1.35] lg:text-[1.85rem] lg:leading-[1.35]"
    >
      {words.map((word, i) => {
        const start = (i / total) * 0.9;
        const end = Math.min(1, start + (1 / total) * 1.8);
        return (
          <RevealWord
            key={`${word}-${i}`}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
}

/* ── Interactive 3D Perspective Compass Loom & Liquid Glass Card ─ */
function EcosystemCompassLoom({
  activeIdx,
  onSelect,
  isPaused,
}: {
  activeIdx: number;
  onSelect: (i: number) => void;
  isPaused: boolean;
}) {
  const activeStage = STAGES[activeIdx];
  const prefersReducedMotion = useReducedMotion();
  const Icon = activeStage.icon;

  const wrapRef = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 14 });
  const sry = useSpring(ry, { stiffness: 120, damping: 14 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 14);
    rx.set(py * -14);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  /* Satellite marker that travels continuously along the active arc,
     visually reinforcing which quadrant is "live" and hinting at the
     auto-slide direction. */
  const satelliteAngle = useMotionValue(activeStage.startDeg);
  useEffect(() => {
    satelliteAngle.set(activeStage.startDeg);
  }, [activeIdx]);

  return (
    <div className="relative mx-auto w-full max-w-7xl">
      <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Left Column: Wider Circular Loom SVG with Subtle Elegant Glow */}
        <div className="lg:col-span-6 flex items-center justify-center">
          <div
            ref={wrapRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ perspective: 1000 }}
            className="relative aspect-square w-full max-w-[320px] xs:max-w-[380px] sm:max-w-[460px] md:max-w-[500px] lg:max-w-[540px]"
          >
            {/* Subtle Toned-Down Ambient Glow */}
            <motion.div
              animate={{ opacity: [0.15, 0.28, 0.15], scale: [0.96, 1.04, 0.96] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ backgroundColor: activeStage.accent }}
              className="pointer-events-none absolute inset-10 rounded-full blur-[75px] transition-colors duration-700"
            />

            <motion.div
              style={{ rotateX: srx, rotateY: sry }}
              className="relative h-full w-full"
            >
              {/* Circular Compass SVG */}
              <svg
                viewBox="0 0 340 340"
                className="h-full w-full overflow-visible select-none"
              >
                <defs>
                  <filter id="arcGlow" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="5" result="blur1" />
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur2" />
                    <feMerge>
                      <feMergeNode in="blur1" />
                      <feMergeNode in="blur2" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="nodeGlow" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Outer Dashed Compass Ring */}
                <circle
                  cx="170"
                  cy="170"
                  r="150"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                />
                <circle
                  cx="170"
                  cy="170"
                  r="150"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1.2"
                  strokeDasharray="3 18"
                />

                {/* Rotating Radar Scanner Beam */}
                {!prefersReducedMotion && (
                  <motion.line
                    x1="170"
                    y1="170"
                    x2="170"
                    y2="20"
                    stroke={activeStage.accent}
                    strokeWidth="1.5"
                    strokeOpacity="0.7"
                    filter="url(#arcGlow)"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "170px 170px" }}
                  />
                )}

                {/* Spokes connecting center to each node — a faint "loom" lattice */}
                {STAGES.map((s) => {
                  const mid = (s.startDeg + s.endDeg) / 2;
                  const pos = polarToCartesian(170, 170, 120, mid);
                  const isSelected = activeStage.key === s.key;
                  return (
                    <motion.line
                      key={`spoke-${s.key}`}
                      x1="170"
                      y1="170"
                      x2={pos.x}
                      y2={pos.y}
                      stroke={s.accent}
                      strokeWidth="1"
                      strokeDasharray="2 5"
                      animate={{
                        strokeOpacity: isSelected ? [0.15, 0.55, 0.15] : 0.08,
                      }}
                      transition={
                        isSelected
                          ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
                          : { duration: 0.4 }
                      }
                    />
                  );
                })}

                {/* 4 Quadrant Arcs (CONNECT, ENGAGE, AUTOMATE, GROW) */}
                {STAGES.map((s, idx) => {
                  const isSelected = activeIdx === idx;
                  const pathD = describeArc(170, 170, 120, s.startDeg, s.endDeg);
                  const midAngle = (s.startDeg + s.endDeg) / 2;
                  const pos = polarToCartesian(170, 170, 120, midAngle);

                  return (
                    <g
                      key={s.key}
                      onClick={() => onSelect(idx)}
                      onMouseEnter={() => onSelect(idx)}
                      className="cursor-pointer"
                    >
                      {/* Invisible wide hit-area for easier tapping on mobile */}
                      <path d={pathD} fill="none" stroke="transparent" strokeWidth="26" />

                      {/* Background Arc */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke="rgba(255,255,255,0.12)"
                        strokeWidth={isSelected ? "7" : "4"}
                        strokeLinecap="round"
                      />

                      {/* Soft breathing glow layer beneath the active arc */}
                      {isSelected && !prefersReducedMotion && (
                        <motion.path
                          d={pathD}
                          fill="none"
                          stroke={s.accent}
                          strokeLinecap="round"
                          filter="url(#arcGlow)"
                          animate={{ strokeWidth: [10, 16, 10], strokeOpacity: [0.25, 0.55, 0.25] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}

                      {/* Active Glowing Arc */}
                      <motion.path
                        d={pathD}
                        fill="none"
                        stroke={s.accent}
                        strokeLinecap="round"
                        filter={isSelected ? "url(#arcGlow)" : undefined}
                        animate={{
                          strokeWidth: isSelected ? 7 : 4,
                          strokeOpacity: isSelected ? 1 : 0.35,
                        }}
                        transition={{ duration: 0.45, ease: easeOut }}
                      />

                      {/* Traveling pulse along the active arc */}
                      {/* Target Node Pin */}
                      <motion.circle
                        cx={pos.x}
                        cy={pos.y}
                        fill="#050505"
                        stroke={s.accent}
                        animate={{
                          r: isSelected ? 6.5 : 3.5,
                          strokeWidth: isSelected ? 2.5 : 1.5,
                        }}
                        transition={{ duration: 0.35, ease: easeOut }}
                        style={{
                          filter: isSelected ? `drop-shadow(0 0 6px ${s.accent})` : undefined,
                        }}
                      />
                      {/* Label */}
                      <text
                        x={pos.x}
                        y={pos.y - 14}
                        textAnchor="middle"
                        fill={isSelected ? "#ffffff" : "rgba(255,255,255,0.4)"}
                        fontSize="9.5"
                        fontFamily="monospace"
                        fontWeight="bold"
                        letterSpacing="1"
                      >
                        {s.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Central Liquid-Glass Singularity Sphere */}
              <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full sm:h-28 sm:w-28">
                {/* Outer soft halo, wider and slower than the inner wash */}
                <motion.div
                  className="absolute -inset-6 rounded-full blur-2xl transition-colors duration-700"
                  style={{
                    background: `radial-gradient(circle, ${activeStage.accent}55, transparent 70%)`,
                  }}
                  animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.65, 0.35] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Liquid Glow Wash */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-xl transition-colors duration-700"
                  style={{
                    background: `radial-gradient(circle, ${activeStage.accent}99, transparent 75%)`,
                  }}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Rotating conic halo ring hugging the glass core */}
                {!prefersReducedMotion && (
                  <motion.div
                    className="absolute -inset-1 rounded-full opacity-70"
                    style={{
                      background: `conic-gradient(from 0deg, transparent, ${activeStage.accent}, transparent 35%)`,
                      filter: "blur(2px)",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  />
                )}

                {/* Frosted Glass Core */}
                <div className="relative flex h-full w-full flex-col items-center justify-center rounded-full border border-white/20 bg-white/[0.06] backdrop-blur-2xl p-2 text-center shadow-xl overflow-hidden">
                  <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/[0.04] to-transparent opacity-75" />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStage.key}
                      initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.7, rotate: 20 }}
                      transition={{ duration: 0.35, ease: easeOut }}
                      className="flex flex-col items-center"
                    >
                      <Icon
                        className="h-5 w-5 sm:h-6 sm:w-6 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
                      />
                      <span className="font-mono text-[8px] sm:text-[9px] font-bold tracking-widest text-white uppercase mt-1">
                        ECOSYSTEM
                      </span>
                      <span
                        className="font-mono text-[7px] sm:text-[8px] font-bold tracking-wider uppercase transition-colors duration-500 mt-0.5"
                        style={{ color: activeStage.accent }}
                      >
                        {activeStage.label}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                  <Cpu className="pointer-events-none absolute h-6 w-6 text-white/0" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Clean Liquid-Glass Showcase Card (No floating outer chips) */}
        <div className="relative lg:col-span-6">
          {/* Ambient glow blob sitting behind the whole card, breathing with the accent */}
          <motion.div
            className="pointer-events-none absolute inset-0 -z-10 rounded-[2.5rem] blur-[60px] transition-colors duration-700"
            style={{ background: `radial-gradient(60% 60% at 50% 50%, ${activeStage.accent}55, transparent 75%)` }}
            animate={{ opacity: [0.3, 0.55, 0.3], scale: [0.97, 1.02, 0.97] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.key}
              initial={{ opacity: 0, x: 24, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -24, scale: 0.98 }}
              transition={{ duration: 0.45, ease: easeOut }}
              className="group relative rounded-3xl p-[1.5px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.75)]"
            >
              {/* Rotating gradient ring — the liquid-glass "frame" */}
              {!prefersReducedMotion && (
                <motion.div
                  className="pointer-events-none absolute -inset-[60%] opacity-90"
                  style={{
                    background: `conic-gradient(from 0deg, transparent 0%, ${activeStage.accent} 12%, transparent 28%, transparent 60%, ${activeStage.accent}aa 78%, transparent 92%)`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                />
              )}
              {prefersReducedMotion && (
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl"
                  style={{ boxShadow: `inset 0 0 0 1.5px ${activeStage.accent}66` }}
                />
              )}

              {/* Frosted glass body sits above the rotating ring, revealing only a thin glowing edge */}
              <div className="relative flex flex-col justify-between rounded-[calc(1.5rem-1.5px)] border border-white/10 bg-[#0a0b0f]/90 p-6 sm:p-8 md:p-10 lg:p-11 backdrop-blur-2xl backdrop-saturate-150 overflow-hidden">
                {/* Soft Ambient Inner Glow Matched with Theme Accent */}
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-3xl blur-3xl transition-colors duration-700"
                  style={{
                    background: `radial-gradient(circle at 50% 35%, ${activeStage.accent}77, transparent 70%)`,
                  }}
                  animate={{ opacity: [0.22, 0.4, 0.22] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Liquid Sheen Overlay */}
                <span className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-white/[0.03] to-transparent opacity-70" />

                {/* Diagonal sheen sweep on hover, liquid-glass signature move */}
                <motion.span
                  className="pointer-events-none absolute -inset-y-10 -left-1/3 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100"
                  animate={{ x: ["-20%", "260%"] }}
                  transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.2 }}
                />

                {/* Card Header (Icon & Phase Tag) */}
                <div className="relative z-10 flex items-center justify-between">
                  <motion.div
                    className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-md"
                    style={{ color: activeStage.accent }}
                    animate={{
                      boxShadow: [
                        `0 0 0px ${activeStage.glow}`,
                        `0 0 18px ${activeStage.glow}`,
                        `0 0 0px ${activeStage.glow}`,
                      ],
                    }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </motion.div>

                  <span
                    className="font-mono text-[10px] sm:text-xs font-bold tracking-widest px-2.5 sm:px-3 py-1 rounded-full border border-white/15 bg-white/[0.04]"
                    style={{ color: activeStage.accent }}
                  >
                    PHASE {activeStage.index}
                  </span>
                </div>

                {/* Center Content: Title, Tagline & Description */}
                <div className="relative z-10 mt-6 sm:mt-7">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-white tracking-tight leading-tight">
                    {activeStage.label}
                  </h3>
                  <div
                    className="mt-1 font-mono text-[11px] sm:text-xs uppercase tracking-wider font-semibold"
                    style={{ color: activeStage.accent }}
                  >
                    {activeStage.tagline}
                  </div>
                  <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-white/70">
                    {activeStage.description}
                  </p>
                </div>

                {/* Card Footer: Bridge Statement & Stat Pill */}
                <div className="relative z-10 mt-7 sm:mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                  <span className="text-white/45 italic flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5" style={{ color: activeStage.accent }} />
                    {activeStage.bridge}
                  </span>

                  <span
                    className="px-3 py-1 rounded-full border border-white/15 bg-white/[0.04] text-white font-bold backdrop-blur-md self-start sm:self-auto"
                    style={{ color: activeStage.accent }}
                  >
                    {activeStage.stat}
                  </span>
                </div>

                {/* Autoplay progress rail */}
                {!prefersReducedMotion && (
                  <div className="relative z-10 mt-5 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      key={`${activeStage.key}-${isPaused ? "paused" : "playing"}`}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${activeStage.accent}, ${activeStage.accent})`,
                        transformOrigin: "left",
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isPaused ? 0 : 1 }}
                      transition={
                        isPaused
                          ? { duration: 0.2 }
                          : { duration: AUTOPLAY_MS / 1000, ease: "linear" }
                      }
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ───────────────────────────────────────────── */
export default function ContinuousConnectionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isHovering, setIsHovering] = useState(false);
  const [manualPause, setManualPause] = useState(false);
  const manualTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [userPaused, setUserPaused] = useState(false);

  /* NOTE: autoplay is intentionally NOT gated on prefersReducedMotion —
     that flag is meant to govern decorative animation (particles, spins,
     sweeps), not whether the carousel itself advances. Gating the interval
     on it caused the whole auto-slide to silently never start in
     environments that report reduced-motion by default. The visible,
     always-available pause button below covers the accessibility need. */
  const isPaused = isHovering || manualPause || userPaused;

  const handleSelect = useCallback((idx: number) => {
    setActiveIdx(idx);
    setManualPause(true);
    if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    manualTimeoutRef.current = setTimeout(() => setManualPause(false), MANUAL_PAUSE_MS);
  }, []);

  /* Auto-slide loop */
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % STAGES.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isPaused]);

  useEffect(() => {
    return () => {
      if (manualTimeoutRef.current) clearTimeout(manualTimeoutRef.current);
    };
  }, []);

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const blob1Y = useTransform(sectionProgress, [0, 1], [-60, 60]);
  const blob2Y = useTransform(sectionProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={sectionRef}
      id="continuous-connection"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative w-full overflow-hidden bg-[#050505] px-4 py-20 sm:px-8 sm:py-16 md:py-20 lg:px-12 selection:bg-cyan-400 selection:text-black"
    >
      {/* ── AMBIENT BACKDROPS (CLEAN & SUBTLE) ──────────────────── */}
      <motion.div
        style={{ y: prefersReducedMotion ? 0 : blob1Y }}
        className="pointer-events-none absolute -left-48 top-1/4 h-[300px] w-[300px] sm:h-[460px] sm:w-[460px] rounded-full bg-[#06B6D4]/10 blur-[100px] sm:blur-[130px]"
      />
      <motion.div
        style={{ y: prefersReducedMotion ? 0 : blob2Y }}
        className="pointer-events-none absolute -right-48 bottom-1/4 h-[280px] w-[280px] sm:h-[440px] sm:w-[440px] rounded-full bg-[#A855F7]/[0.08] blur-[100px] sm:blur-[130px]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(6,182,212,0.03),transparent_75%)]" />

      {/* Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

      {/* Floating Particles */}
      {!prefersReducedMotion &&
        PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="pointer-events-none absolute rounded-full bg-cyan-200/30"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              boxShadow: "0 0 6px rgba(6,182,212,0.5)",
            }}
            animate={{
              y: [0, -18, 0],
              opacity: [0.15, 0.65, 0.15],
              scale: [0.9, 1.2, 0.9],
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
        {/* ── HEADER CONTENT ────────────────────────────────────── */}
        <div className="relative mx-auto max-w-7xl text-center">
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-cyan-500/20 bg-cyan-500/[0.04] px-3.5 py-1.5 sm:px-4 backdrop-blur-md shadow-lg"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06B6D4]" />
            </span>
            <span className="font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/85">
              {EYEBROW}
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.08 }}
            className="mb-4 font-mono text-xs sm:text-sm font-medium tracking-wider text-cyan-300/80 uppercase"
          >
            {SUBTITLE}
          </motion.p>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.14 }}
            className="text-balance text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-[4.2rem] lg:tracking-[-0.04em]"
          >
            <span>{HEADLINE_LINE_1}</span>
            <br className="hidden sm:inline" />{" "}
            <span
              className="inline-block transition-transform duration-500 hover:scale-[1.01]"
              style={{
                WebkitTextStroke: "1.5px rgba(6, 182, 212, 0.95)",
                color: "transparent",
              }}
            >
              {HEADLINE_LINE_2}
            </span>
          </motion.h2>

          {/* Word-by-Word Scroll Reveal Narrative */}
          <div className="mt-7 sm:mt-8">
            <NarrativeStatement text={DESCRIPTION} />
          </div>

          {/* Stage Breadcrumb Ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.28 }}
            className="mx-auto mt-7 sm:mt-8 inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 sm:p-2 backdrop-blur-xl shadow-2xl"
          >
            {STAGES.map((stg, idx) => (
              <div key={stg.label} className="flex items-center gap-1.5 sm:gap-2.5">
                <button
                  type="button"
                  onClick={() => handleSelect(idx)}
                  className={`relative flex items-center gap-2 overflow-hidden rounded-xl px-3 py-2 sm:px-4 text-[10px] sm:text-xs font-mono font-semibold tracking-widest uppercase transition-all duration-300 ${activeIdx === idx
                      ? "bg-cyan-400 text-black shadow-[0_0_20px_rgba(6,182,212,0.5)] scale-105"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: activeIdx === idx ? "#050505" : stg.accent }}
                  />
                  <span>{stg.label}</span>
                </button>
                {idx < STAGES.length - 1 && (
                  <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white/20" />
                )}
              </div>
            ))}

            <span className="mx-1 h-5 w-px bg-white/10" />

            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? "Play autoplay" : "Pause autoplay"}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 transition-all duration-300 hover:text-white hover:bg-white/10"
            >
              {userPaused ? (
                <Play className="h-3.5 w-3.5" />
              ) : (
                <Pause className="h-3.5 w-3.5" />
              )}
            </button>
          </motion.div>
        </div>

        {/* ── ECOSYSTEM COMPASS LOOM & LIQUID GLASS SHOWCASE STAGE ─ */}
        <div className="mt-14 sm:mt-20 lg:mt-20">
          <EcosystemCompassLoom
            activeIdx={activeIdx}
            onSelect={handleSelect}
            isPaused={isPaused}
          />
        </div>
      </div>
    </section>
  );
}