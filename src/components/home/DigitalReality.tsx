import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "motion/react";
import {
  ArrowUpRight,
  LayoutGrid,
  Code2,
  Network,
  Bot,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

/* ── Content Constants & Types ───────────────────────────────── */
export type DigitalStep = {
  number: string;
  label: string;
  tagline: string;
  description: string;
  badge: string;
  icon: LucideIcon;
  accent: string;
  glow: string;
};

const EYEBROW = "FROM CONCEPT TO DIGITAL REALITY";
const SUBTITLE = "Ideas become powerful when technology gives them form.";
const HEADLINE_LINE_1 = "We Turn Concepts";
const HEADLINE_LINE_2 = "Into Digital Experiences.";
const MANIFESTO_TEXT =
  "Digital Business platforms and intelligent systems, designed to make businesses faster, smarter, and more connected.";

const STEPS: DigitalStep[] = [
  {
    number: "01",
    label: "Design",
    tagline: "UI/UX & System Architecture",
    description:
      "Blueprint intuitive user journeys, interface paradigms, and responsive digital architectures designed for scale.",
    badge: "CANVAS & WIREFRAME",
    icon: LayoutGrid,
    accent: "#06B6D4", // Electric Cyan
    glow: "rgba(6, 182, 212, 0.55)",
  },
  {
    number: "02",
    label: "Develop",
    tagline: "High-Velocity Engineering",
    description:
      "Engineer resilient full-stack web applications, mobile platforms, and high-performance real-time software engines.",
    badge: "0.8MS ENGINE LATENCY",
    icon: Code2,
    accent: "#3B82F6", // Hyper Blue
    glow: "rgba(59, 130, 246, 0.55)",
  },
  {
    number: "03",
    label: "Integrate",
    tagline: "Connected Ecosystems",
    description:
      "Bridge enterprise APIs, cloud infrastructure, secure data pipelines, and real-time payment connectivity.",
    badge: "UNIFIED CLOUD MESH",
    icon: Network,
    accent: "#8B5CF6", // Quantum Violet
    glow: "rgba(139, 92, 246, 0.55)",
  },
  {
    number: "04",
    label: "Automate",
    tagline: "Intelligent Systems & AI",
    description:
      "Deploy autonomous workflows, intelligent AI models, and self-optimizing operations that accelerate business growth.",
    badge: "99.99% AUTO-SCALE",
    icon: Bot,
    accent: "#10B981", // Emerald Teal
    glow: "rgba(16, 185, 129, 0.55)",
  },
];

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const;
const VIEWPORT = { once: true, amount: 0.35 } as const;

/* ── Ambient Background & Radar Pings ─────────────────────────── */
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  left: (i * 35.7) % 100,
  top: (i * 51.3 + 6) % 100,
  size: 1.5 + (i % 3),
  delay: (i % 6) * 0.4,
  duration: 3.6 + (i % 5) * 0.7,
}));

function RadarPing({ className, accent }: { className: string; accent: string }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden="true">
      <svg viewBox="0 0 80 80" className="h-16 w-16 sm:h-20 sm:w-20">
        <circle cx="40" cy="40" r="3" fill={accent} />
        {!prefersReducedMotion && (
          <>
            <motion.circle
              cx="40"
              cy="40"
              r="3"
              fill="none"
              stroke={accent}
              strokeWidth="1"
              animate={{ r: [3, 26], opacity: [0.55, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.circle
              cx="40"
              cy="40"
              r="3"
              fill="none"
              stroke={accent}
              strokeWidth="1"
              animate={{ r: [3, 26], opacity: [0.55, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut", delay: 1.6 }}
            />
          </>
        )}
        <circle cx="40" cy="40" r="14" fill="none" stroke={accent} strokeOpacity="0.25" strokeWidth="0.75" />
      </svg>
    </div>
  );
}

function AmbientField({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const prefersReducedMotion = useReducedMotion();
  const orbOneY = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const orbTwoY = useTransform(scrollYProgress, [0, 1], [30, -60]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <motion.div
        style={prefersReducedMotion ? undefined : { y: orbOneY }}
        className="absolute -left-[12%] top-[6%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.22),transparent_70%)] blur-3xl"
      />
      <motion.div
        style={prefersReducedMotion ? undefined : { y: orbTwoY }}
        className="absolute -right-[10%] bottom-[6%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.18),transparent_70%)] blur-3xl"
      />
      <div className="absolute left-1/2 top-1/2 h-[580px] w-[840px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12),transparent_72%)] blur-3xl" />

      <RadarPing className="left-[4%] top-[12%] hidden sm:block" accent="#06B6D4" />
      <RadarPing className="right-[5%] bottom-[14%] hidden sm:block" accent="#10B981" />

      {!prefersReducedMotion &&
        PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-cyan-200"
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
            animate={{ opacity: [0.12, 0.7, 0.12] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
    </div>
  );
}

/* ── Measured SVG Path Spine ──────────────────────────────────── */
type SpinePoint = { x: number; y: number };
type SpineData = { d: string; width: number; height: number; points: SpinePoint[] };
const EMPTY_SPINE: SpineData = { d: "", width: 0, height: 0, points: [] };

function buildSmoothPath(points: SpinePoint[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const cur = points[i];
    const next = points[i + 1];
    const midY = (cur.y + next.y) / 2;
    d += ` C ${cur.x} ${midY}, ${next.x} ${midY}, ${next.x} ${next.y}`;
  }
  return d;
}

function useMeasuredSpine(trackRef: React.RefObject<HTMLDivElement | null>, count: number) {
  const nodeRefs = useRef<Array<HTMLElement | null>>([]);
  const [spine, setSpine] = useState<SpineData>(EMPTY_SPINE);
  const rafPending = useRef(false);

  const registerNode = (index: number) => (el: HTMLElement | null) => {
    nodeRefs.current[index] = el;
  };

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const containerRect = track.getBoundingClientRect();
    const points = nodeRefs.current
      .map((el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - containerRect.left,
          y: r.top + r.height / 2 - containerRect.top,
        };
      })
      .filter((p): p is SpinePoint => p !== null);

    if (points.length < 2 || containerRect.width === 0) return;

    setSpine((prev) => {
      const next = {
        d: buildSmoothPath(points),
        width: containerRect.width,
        height: containerRect.height,
        points,
      };
      if (prev.d === next.d && prev.width === next.width && prev.height === next.height) {
        return prev;
      }
      return next;
    });
  }, [trackRef]);

  const remeasure = useCallback(() => {
    if (rafPending.current) return;
    rafPending.current = true;
    requestAnimationFrame(() => {
      rafPending.current = false;
      measure();
    });
  }, [measure]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    measure();

    const settleTimers = [60, 200, 450, 800, 1200, 1800].map((delay) =>
      window.setTimeout(measure, delay)
    );

    const resizeObserver = new ResizeObserver(() => measure());
    resizeObserver.observe(track);
    nodeRefs.current.forEach((el) => el && resizeObserver.observe(el));

    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);

    return () => {
      settleTimers.forEach((t) => window.clearTimeout(t));
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, [count, measure, trackRef]);

  return { registerNode, spine, remeasure };
}

function DigitalSpine({
  spine,
  drawProgress,
  scrollYProgress,
}: {
  spine: SpineData;
  drawProgress: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
}) {
  const drawn = useSpring(drawProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });
  const prefersReducedMotion = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const [pathEl, setPathEl] = useState<SVGPathElement | null>(null);
  const [totalLength, setTotalLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setPathEl(pathRef.current);
      setTotalLength(pathRef.current.getTotalLength());
    }
  }, [spine.d]);

  const cometStyle = useTransform(scrollYProgress, (v) => {
    if (!pathEl || !totalLength) return "translate(-9999px, -9999px)";
    const clamped = Math.min(0.999, Math.max(0, v));
    const pt = pathEl.getPointAtLength(totalLength * clamped);
    return `translate(${pt.x}px, ${pt.y}px)`;
  });

  if (!spine.d) return null;

  return (
    <>
      <svg
        viewBox={`0 0 ${spine.width} ${spine.height}`}
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="digital-spine-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="33%" stopColor="#3B82F6" />
            <stop offset="66%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <filter id="digital-spine-glow" x="-60%" y="-20%" width="220%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path d={spine.d} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={2.5} />

        <motion.path
          ref={pathRef}
          d={spine.d}
          fill="none"
          stroke="url(#digital-spine-gradient)"
          strokeWidth={3.5}
          strokeLinecap="round"
          filter="url(#digital-spine-glow)"
          style={{ pathLength: prefersReducedMotion ? 1 : drawn }}
        />

        {!prefersReducedMotion && (
          <motion.path
            d={spine.d}
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeDasharray="2 44"
            animate={{ strokeDashoffset: [0, -480] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
          />
        )}

        {spine.points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={4}
            fill="#050505"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth={1.5}
          />
        ))}
      </svg>

      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-20 -ml-2 -mt-2 h-4 w-4 rounded-full"
          style={{
            transform: cometStyle,
            background: "radial-gradient(circle, #fff 0%, rgba(6,182,212,0.6) 45%, transparent 75%)",
            boxShadow: "0 0 16px 4px rgba(6,182,212,0.9)",
          }}
        />
      )}
    </>
  );
}

/* ── Mobile Vertical Rail ─────────────────────────────────────── */
function MobileRail({ progress }: { progress: MotionValue<number> }) {
  const scaleY = useSpring(progress, { stiffness: 90, damping: 26, restDelta: 0.001 });
  return (
    <div className="absolute left-[27px] top-0 h-full w-px bg-white/10 sm:left-9 lg:hidden" aria-hidden="true">
      <motion.div
        style={{ scaleY }}
        className="h-full w-full origin-top bg-gradient-to-b from-[#06B6D4] via-[#3B82F6] via-[#8B5CF6] to-[#10B981]"
      />
    </div>
  );
}

/* ── Step Journey Item (Clean Cyber-Tech Card Styling) ─────────── */
function StepItem({
  step,
  index,
  side,
  active,
  registerBadgeRef,
  onEnter,
  onLeave,
  onSettled,
}: {
  step: DigitalStep;
  index: number;
  side: "left" | "right";
  active: boolean;
  registerBadgeRef: (el: HTMLElement | null) => void;
  onEnter: () => void;
  onLeave: () => void;
  onSettled: () => void;
}) {
  const Icon = step.icon;
  const isRight = side === "right";

  const card: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease: EASE_OUT } },
  };

  return (
    <div
      className={`relative flex min-h-[220px] items-center sm:min-h-[300px] lg:min-h-[360px] xl:min-h-[400px] ${
        isRight ? "lg:justify-end" : "lg:justify-start"
      }`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
    >
      {/* Soft Focus Glow Behind Active Node */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="pointer-events-none absolute -inset-x-6 inset-y-6 -z-10 rounded-[3rem] blur-3xl"
        style={{
          background: `radial-gradient(60% 60% at ${isRight ? "70%" : "30%"} 50%, ${step.glow}, transparent 72%)`,
        }}
      />

      <motion.article
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={card}
        tabIndex={0}
        onAnimationComplete={(definition) => {
          if (definition === "show") {
            onSettled();
            requestAnimationFrame(onSettled);
            window.setTimeout(onSettled, 100);
          }
        }}
        className={`group relative w-full max-w-xl outline-none lg:w-[88%] ${
          isRight ? "lg:pr-[6%] lg:text-right" : "lg:pl-[6%]"
        }`}
      >
        {/* Giant Ghost Numeral */}
        <motion.span
          aria-hidden="true"
          animate={{ color: active ? `${step.accent}33` : "rgba(255,255,255,0.05)" }}
          transition={{ duration: 0.6 }}
          className={`pointer-events-none absolute -top-12 select-none font-sans text-[6rem] font-bold leading-none sm:-top-16 sm:text-[9rem] lg:-top-18 lg:text-[12rem] xl:text-[14rem] ${
            isRight ? "right-0" : "left-0"
          }`}
        >
          {step.number}
        </motion.span>

        <div className={`relative flex items-center gap-4 sm:gap-5 ${isRight ? "lg:flex-row-reverse" : ""}`}>
          {/* Cybernetic Glass Icon Badge */}
          <motion.span
            ref={registerBadgeRef}
            animate={{
              boxShadow: active
                ? `0 0 0 1px ${step.accent}66, 0 8px 32px -4px ${step.glow}, inset 0 1px 1px rgba(255,255,255,0.55), inset 0 -8px 16px -8px rgba(0,0,0,0.4)`
                : `0 0 0 1px rgba(255,255,255,0.14), 0 8px 24px -6px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.3), inset 0 -8px 16px -8px rgba(0,0,0,0.4)`,
              scale: active ? 1.06 : 1,
            }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="relative z-10 isolate flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-2xl backdrop-saturate-150 sm:h-18 sm:w-18 lg:h-22 lg:w-22"
            style={{ color: step.accent }}
          >
            {/* Liquid Sheen */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 via-white/[0.04] to-transparent opacity-70"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-3/4 left-1/5 h-[140%] w-2/3 -rotate-12 rounded-full bg-white/25 blur-lg"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                background: `radial-gradient(120% 100% at 50% 120%, ${step.glow}, transparent 60%)`,
                opacity: 0.35,
              }}
            />
            <Icon className="relative h-6 w-6 drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)] sm:h-8 sm:w-8 lg:h-9 lg:w-9" />
          </motion.span>

          {/* Phase Badge & Tagline */}
          <div
            className={`flex items-center gap-2.5 font-mono text-[11px] uppercase sm:text-xs ${
              isRight ? "lg:flex-row-reverse" : ""
            }`}
            style={{ letterSpacing: "0.16em" }}
          >
            <span className="font-bold" style={{ color: step.accent }}>
              PHASE {step.number}
            </span>
            <span className="h-px w-8 sm:w-10" style={{ background: `${step.accent}90` }} />
            <span className="text-white/40">{step.badge}</span>
          </div>
        </div>

        {/* Step Label */}
        <h3 className="relative mt-5 font-sans text-4xl font-semibold leading-[0.96] text-white sm:mt-6 sm:text-5xl lg:text-6xl xl:text-7xl">
          {step.label}
        </h3>

        {/* Subtitle */}
        <p className="mt-2 font-mono text-xs uppercase tracking-wider text-cyan-300/70">
          {step.tagline}
        </p>

        {/* Description */}
        <p
          className={`relative mt-4 max-w-lg text-sm leading-relaxed text-white/65 sm:mt-5 sm:text-base lg:text-lg ${
            isRight ? "lg:ml-auto" : ""
          }`}
        >
          {step.description}
        </p>
      </motion.article>
    </div>
  );
}

/* ── Word-by-Word Scroll Reveal for Manifesto ────────────────── */
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
    word.toLowerCase().includes("faster") ||
    word.toLowerCase().includes("smarter") ||
    word.toLowerCase().includes("connected");

  return (
    <span className="mr-[0.26em] my-[0.04em] inline-block whitespace-nowrap">
      <motion.span
        style={{ opacity, y, scale, display: "inline-block" }}
        className={
          isHighlight
            ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-teal-300 font-semibold drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            : "text-white/90 font-medium"
        }
      >
        {word}
      </motion.span>
    </span>
  );
}

function Manifesto({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 50%"],
  });
  const words = useMemo(() => text.split(" "), [text]);
  const total = words.length;

  return (
    <p
      ref={ref}
      className="mx-auto max-w-5xl text-center font-sans text-xl font-medium leading-[1.35] text-white sm:text-3xl sm:leading-[1.3] lg:text-[2.6rem] lg:leading-[1.28]"
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

/* ── Main Section Component ───────────────────────────────────── */
export default function DigitalRealitySection() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: trackProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 30%"],
  });

  const { registerNode, spine, remeasure } = useMeasuredSpine(trackRef, STEPS.length);

  const activeIndex = useTransform(trackProgress, [0, 1], [0, STEPS.length - 1]);
  useEffect(() => {
    return activeIndex.on("change", (v) => {
      setActiveStep(Math.min(STEPS.length - 1, Math.max(0, Math.round(v))));
    });
  }, [activeIndex]);

  return (
    <section
      ref={containerRef}
      id="digital-reality"
      className="relative isolate overflow-hidden bg-[#050505] px-4 py-28 text-white sm:px-8 sm:py-16 lg:px-12 lg:py-20"
    >
      <AmbientField scrollYProgress={scrollYProgress} />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* ── CLEAN HEADER AREA (NO SLIDE 2) ────────────────────── */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Clean Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-cyan-500/20 bg-cyan-500/[0.04] px-4 py-1.5 backdrop-blur-md shadow-lg"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06B6D4]" />
            </span>
            <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
              {EYEBROW}
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.08 }}
            className="mb-4 font-mono text-xs sm:text-sm font-medium tracking-wider text-cyan-300/80 uppercase"
          >
            {SUBTITLE}
          </motion.p>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.14 }}
            className="text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-[4.2rem]"
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
              Into Digital Experiences.
            </span>
          </motion.h2>

          {/* Clean Stage Breadcrumb Ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.22 }}
            className="mx-auto mt-8 inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 sm:p-2 backdrop-blur-xl shadow-2xl"
          >
            {STEPS.map((s, idx) => (
              <div key={s.label} className="flex items-center gap-1.5 sm:gap-2.5">
                <span
                  className={`flex items-center gap-2 rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-mono font-semibold tracking-widest uppercase transition-all duration-300 ${
                    activeStep === idx
                      ? "bg-cyan-400 text-black shadow-[0_0_20px_rgba(6,182,212,0.5)] scale-105"
                      : "text-white/60 bg-white/5"
                  }`}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: s.accent }}
                  />
                  <span>{s.label}</span>
                </span>
                {idx < STEPS.length - 1 && (
                  <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white/20" />
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── MANIFESTO WORD-BY-WORD SCROLL REVEAL ───────────── */}
        <div className="mt-20 sm:mt-28 lg:mt-20">
          <Manifesto text={MANIFESTO_TEXT} />
        </div>

        {/* ── ALTERNATING JOURNEY PIPELINE WITH CURVED SVG SPINE ─ */}
        <div ref={trackRef} className="relative mt-20 sm:mt-28 lg:mt-24">
          {/* Desktop Curved Measured SVG Spine */}
          <div className="hidden lg:block">
            <DigitalSpine
              spine={spine}
              drawProgress={trackProgress}
              scrollYProgress={trackProgress}
            />
          </div>

          {/* Mobile Vertical Neon Rail */}
          <MobileRail progress={trackProgress} />

          {/* 4 Alternating Journey Steps */}
          <div className="relative space-y-12 sm:space-y-16 lg:space-y-24">
            {STEPS.map((step, index) => (
              <StepItem
                key={step.label}
                step={step}
                index={index}
                side={index % 2 === 0 ? "left" : "right"}
                active={activeStep === index}
                registerBadgeRef={registerNode(index)}
                onEnter={() => setActiveStep(index)}
                onLeave={() => {}}
                onSettled={remeasure}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
