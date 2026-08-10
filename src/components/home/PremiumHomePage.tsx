import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
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
  Code2,
  Cpu,
  Layers,
  Lightbulb,
  Network,
  PenTool,
  Rocket,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import MagicRings from "@/components/MagicRings";

/* ------------------------------------------------------------------ */
/*  Design tokens                                                      */
/* ------------------------------------------------------------------ */

const PALETTES = {
  core: { a: "#f5f5ff", b: "#c084fc", c: "#fb7185", bg: "#050505", progress: "#f5f5ff" },
  growth: { a: "#fb7185", b: "#c084fc", c: "#22d3ee", bg: "#050505", progress: "#fb7185" },
  tech: { a: "#22d3ee", b: "#60a5fa", c: "#8b5cf6", bg: "#050505", progress: "#22d3ee" },
  edu: {
    a: "#fbbf24",
    b: "#34d399",
    c: "#a78bfa",
    bg: "#050505",
    progress: "linear-gradient(90deg, #fbbf24, #34d399 52%, #a78bfa)",
  },
  final: {
    a: "#a78bfa",
    b: "#38bdf8",
    c: "#f472b6",
    bg: "#07060d",
    progress: "linear-gradient(90deg, #07060d, #7c3aed 48%, #38bdf8)",
  },
} as const;

/** Shared easing curve used across every scroll/hover animation on the page. */
const EASE_OUT = [0.2, 0.8, 0.2, 1] as const;

/** Shared "has this scrolled into view" thresholds, reused so every section reveals consistently. */
const VIEWPORT = {
  default: { once: true, amount: 0.4 },
  early: { once: true, amount: 0.25 },
  eager: { once: true, amount: 0.6 },
} as const;

const growthSteps = [
  {
    number: "01",
    label: "DEFINE",
    description:
      "Shape the vision, identity, and purpose that give your business a strong foundation.",
    icon: PenTool,
    gradient: "linear-gradient(135deg, #fb7185, #c084fc)",
    glow: "rgba(251, 113, 133, 0.4)",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=85",
  },
  {
    number: "02",
    label: "CONNECT",
    description: "Build meaningful connections between your brand and the people who matter most.",
    icon: Network,
    gradient: "linear-gradient(135deg, #c084fc, #38bdf8)",
    glow: "rgba(192, 132, 252, 0.4)",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=85",
  },
  {
    number: "03",
    label: "CREATE",
    description:
      "Turn ideas into distinctive creative experiences that capture attention and build recognition.",
    icon: Sparkles,
    gradient: "linear-gradient(135deg, #f472b6, #8b5cf6)",
    glow: "rgba(244, 114, 182, 0.42)",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=85",
  },
  {
    number: "04",
    label: "GROW",
    description:
      "Transform brand presence into sustainable business growth through continuous innovation and strategic evolution.",
    icon: Rocket,
    gradient: "linear-gradient(135deg, #22d3ee, #2563eb)",
    glow: "rgba(34, 211, 238, 0.38)",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=85",
  },
] satisfies JourneyStep[];

const capabilitySteps = [
  {
    number: "01",
    label: "INSPIRE",
    description:
      "Cultivating creative thinking and fresh perspectives that generate innovative ideas and new business possibilities.",
    icon: Lightbulb,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=85",
    accent: "#fbbf24",
    glow: "rgba(251, 191, 36, 0.34)",
  },
  {
    number: "02",
    label: "DEVELOP",
    description:
      "Building practical creative, digital, and strategic capabilities that strengthen brand and business potential.",
    icon: Layers,
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=85",
    accent: "#34d399",
    glow: "rgba(52, 211, 153, 0.32)",
  },
  {
    number: "03",
    label: "CONNECT",
    description:
      "Bridging creativity with real-world business needs to create meaningful brands, stronger communication, and market relevance.",
    icon: Network,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=85",
    accent: "#a78bfa",
    glow: "rgba(167, 139, 250, 0.32)",
  },
  {
    number: "04",
    label: "ACCELERATE",
    description:
      "Turning knowledge, creativity, and innovation into actionable outcomes that support sustainable business growth and long-term success.",
    icon: Zap,
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=85",
    accent: "#fb7185",
    glow: "rgba(251, 113, 133, 0.32)",
  },
] satisfies CapabilityStepData[];

type JourneyStep = {
  number: string;
  label: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  glow: string;
  image: string;
};

type CapabilityStepData = {
  number: string;
  label: string;
  description: string;
  icon: LucideIcon;
  image: string;
  accent: string;
  glow: string;
};

type PaletteName = keyof typeof PALETTES;

function paletteAttrs(name: PaletteName) {
  const palette = PALETTES[name];
  return {
    "data-palette": "",
    "data-palette-a": palette.a,
    "data-palette-b": palette.b,
    "data-palette-c": palette.c,
    "data-palette-bg": palette.bg,
    "data-palette-progress": palette.progress,
  };
}

/* ------------------------------------------------------------------ */
/*  Reveal — the single reusable "animate in on scroll" primitive.     */
/*  Every text block, card, and cluster of controls on the page runs   */
/*  through this so the reveal motion stays consistent and DRY.        */
/* ------------------------------------------------------------------ */

type RevealProps = {
  children: ReactNode;
  /** Extra delay in seconds, useful for staggering siblings. */
  delay?: number;
  /** Distance (px) the element travels in from. */
  y?: number;
  duration?: number;
  viewport?: keyof typeof VIEWPORT;
  className?: string;
};

function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.7,
  viewport = "default",
  className,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT[viewport]}
      transition={{ duration, delay, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container: reveals its direct children one after another as it scrolls into view. */
function RevealGroup({
  children,
  className,
  stagger = 0.12,
  viewport = "default",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  viewport?: keyof typeof VIEWPORT;
}) {
  const prefersReducedMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: prefersReducedMotion
        ? undefined
        : { staggerChildren: stagger, delayChildren: 0.05 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT[viewport]}
      variants={container}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** A single staggered child — pair with RevealGroup. */
function RevealItem({
  children,
  y = 20,
  duration = 0.6,
  className,
}: {
  children: ReactNode;
  y?: number;
  duration?: number;
  className?: string;
}) {
  const item: Variants = {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration, ease: EASE_OUT } },
  };

  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared building blocks                                             */
/* ------------------------------------------------------------------ */

function SectionLabel({
  eyebrow,
  tone = "core",
}: {
  eyebrow: string;
  tone?: PaletteName;
}) {
  const palette = PALETTES[tone];

  return (
    <Reveal y={18} duration={0.7} className="inline-flex">
      <div
        className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase text-white/65 backdrop-blur-xl"
        style={{ letterSpacing: "0.14em" }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: `linear-gradient(135deg, ${palette.a}, ${palette.c})` }}
        />
        <span>{eyebrow}</span>
      </div>
    </Reveal>
  );
}

/** Animated section heading — every usage reveals on scroll for free. */
function GradientHeading({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.h2
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT.default}
      transition={{ duration: 0.75, delay, ease: EASE_OUT }}
      className={`font-sans font-semibold leading-[1.03] text-white ${className}`}
      style={{ letterSpacing: 0 }}
    >
      {children}
    </motion.h2>
  );
}

function MagneticButton({
  href,
  children,
  variant = "primary",
  ariaLabel,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "tech" | "edu" | "creative" | "creativeGhost";
  ariaLabel?: string;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const styles = {
    primary: "bg-white text-black shadow-[0_18px_60px_rgba(255,255,255,0.18)] hover:bg-white/90",
    ghost:
      "border border-white/14 bg-white/[0.04] text-white hover:border-white/28 hover:bg-white/[0.08]",
    tech: "bg-cyan-300 text-black shadow-[0_18px_60px_rgba(34,211,238,0.28)] hover:bg-cyan-200",
    edu: "bg-gradient-to-r from-amber-300 via-emerald-300 to-violet-300 text-black shadow-[0_18px_70px_rgba(52,211,153,0.22)]",
    creative:
      "border border-violet-200/20 bg-gradient-to-r from-violet-400 via-indigo-400 to-sky-300 text-[#050505] shadow-[0_18px_70px_rgba(124,58,237,0.34)] hover:shadow-[0_22px_80px_rgba(56,189,248,0.24)]",
    creativeGhost:
      "border border-violet-100/24 bg-violet-100/[0.055] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-sky-200/40 hover:bg-sky-100/[0.08]",
  } as const;

  const onMouseMove = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.16;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.2;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const reset = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate3d(0, 0, 0)";
  };

  const onClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) return;
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", href);
  };

  return (
    <a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      onBlur={reset}
      data-cursor="hover"
      className={`group inline-flex min-h-12 touch-manipulation items-center justify-center gap-2 rounded-full px-6 py-3 text-center text-sm font-semibold transition-[background,border-color,box-shadow,opacity] duration-300 sm:px-7 ${styles[variant]} ${className}`}
    >
      <span>{children}</span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

function AnimatedNumber({ value }: { value: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT.eager}
      transition={{ duration: 0.65, ease: EASE_OUT }}
      className="font-mono text-xs text-white/35"
    >
      {value}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Growth Journey section                                             */
/* ------------------------------------------------------------------ */

function GrowthCardBackground({ step, active }: { step: JourneyStep; active: boolean }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[30px]">
      <motion.img
        src={step.image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        sizes="(min-width: 1024px) 26vw, 92vw"
        animate={prefersReducedMotion ? undefined : { scale: active ? 1.07 : 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Legibility gradient: dark enough at top/bottom for text, clearer through the middle */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/94" />

      {/* Brand-colored glow, brighter while the card is active/hovered */}
      <motion.div
        className="absolute inset-0"
        style={{ background: `radial-gradient(120% 85% at 18% 100%, ${step.glow}, transparent 62%)` }}
        animate={{ opacity: active ? 1 : 0.55 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      />

      <div className="absolute inset-0 grid-bg opacity-[0.06]" />
    </div>
  );
}

function GrowthCard({
  step,
  index,
  active,
  onActivate,
}: {
  step: JourneyStep;
  index: number;
  active: boolean;
  onActivate: () => void;
}) {
  const Icon = step.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 46, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={VIEWPORT.early}
      transition={{ duration: 0.85, delay: index * 0.1, ease: EASE_OUT }}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      tabIndex={0}
      className={`group relative flex min-h-[420px] cursor-pointer flex-col overflow-hidden rounded-[30px] border p-6 outline-none transition-[border-color,box-shadow,transform] duration-500 active:scale-[0.99] sm:p-7 lg:min-h-[560px] ${active
        ? "border-white/25 shadow-[0_32px_100px_rgba(0,0,0,0.62)]"
        : "border-white/[0.1] shadow-[0_18px_70px_rgba(0,0,0,0.36)]"
        }`}
      style={
        {
          flex: active ? "1.23 1 0" : "1 1 0",
          boxShadow: active ? `0 28px 110px rgba(0,0,0,0.55), 0 0 90px ${step.glow}` : undefined,
        } as CSSProperties
      }
    >
      <GrowthCardBackground step={step} active={active} />

      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <AnimatedNumber value={step.number} />
          <span className="text-white/22">—</span>
          <span className="text-xs font-semibold text-white/70" style={{ letterSpacing: "0.12em" }}>
            {step.label}
          </span>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 backdrop-blur-md transition-all duration-300 group-hover:border-white/30 group-hover:text-white">
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="relative z-10 mt-auto max-w-[270px]">
        <h3 className="mb-4 font-sans text-3xl font-semibold text-white sm:text-4xl">
          {step.label}
        </h3>
        <p className="text-sm leading-relaxed text-white/68 sm:text-[15px]">{step.description}</p>
      </div>

      <div className="absolute bottom-7 right-7 z-20 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full border border-white/12 bg-white text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <ArrowUpRight className="h-4 w-4" />
      </div>
    </motion.article>
  );
}

function GrowthJourney() {
  const [active, setActive] = useState(0);

  return (
    <section
      {...paletteAttrs("growth")}
      className="relative overflow-hidden bg-[#050505] px-5 py-24 text-white sm:px-8 md:py-20"
    >
      <div className="absolute inset-0 grid-bg opacity-[0.1]" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-0 h-[700px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(192,132,252,0.18),transparent_68%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-[min(1320px,94vw)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel eyebrow="Growth Journey" tone="growth" />
            <GradientHeading className="mt-6 max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              From Vision To Sustainable Growth.
            </GradientHeading>
          </div>
          <Reveal delay={0.15} className="max-w-sm">
            <p className="text-sm leading-relaxed text-white/48">
              A progressive operating rhythm for building clarity, momentum, recognition, and
              long-term market strength.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-5 lg:mt-20 lg:flex-row lg:items-stretch">
          {growthSteps.map((step, index) => (
            <GrowthCard
              key={step.label}
              step={step}
              index={index}
              active={active === index}
              onActivate={() => setActive(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Engineering / Technology Identity section                          */
/* ------------------------------------------------------------------ */

function TechnologySystemVisual() {
  const prefersReducedMotion = useReducedMotion();
  const graphPath = "M10 94 C64 72 96 86 136 54 C178 20 214 42 260 18";

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={VIEWPORT.early}
      transition={{ duration: 0.9, ease: EASE_OUT }}
      className="relative min-h-[520px] overflow-hidden rounded-[34px] border border-cyan-200/15 bg-[#071018] shadow-[0_34px_130px_rgba(34,211,238,0.14)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(34,211,238,0.2),transparent_44%),radial-gradient(ellipse_at_84%_70%,rgba(96,165,250,0.18),transparent_50%)]" />
      <div className="absolute inset-0 grid-bg opacity-[0.16]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/5 to-[#050505]/72" />

      <div className="relative z-10 grid h-full min-h-[520px] grid-rows-[auto_1fr_auto] gap-5 p-5 sm:p-7">
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/28 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            <span className="h-2 w-2 rounded-full bg-blue-300/70" />
            <span className="h-2 w-2 rounded-full bg-violet-300/70" />
          </div>
          <span
            className="font-mono text-[10px] uppercase text-white/42"
            style={{ letterSpacing: "0.16em" }}
          >
            Platform telemetry
          </span>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
          <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-black/32 p-5 backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between">
              <span
                className="text-xs font-medium uppercase text-cyan-200/80"
                style={{ letterSpacing: "0.14em" }}
              >
                System graph
              </span>
              <Cpu className="h-4 w-4 text-cyan-200/70" />
            </div>
            <svg viewBox="0 0 280 120" className="h-44 w-full overflow-visible">
              <defs>
                <linearGradient id="tech-graph" x1="0" x2="1" y1="0" y2="0">
                  <stop stopColor="#22d3ee" />
                  <stop offset="0.55" stopColor="#60a5fa" />
                  <stop offset="1" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
              {[24, 48, 72, 96].map((line) => (
                <line
                  key={line}
                  x1="0"
                  x2="280"
                  y1={line}
                  y2={line}
                  stroke="rgba(255,255,255,0.08)"
                />
              ))}
              <motion.path
                d={graphPath}
                fill="none"
                stroke="url(#tech-graph)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={VIEWPORT.eager}
                transition={{ duration: 1.5, ease: EASE_OUT }}
              />
              {[10, 136, 260].map((x, index) => (
                <motion.circle
                  key={x}
                  cx={x}
                  cy={index === 0 ? 94 : index === 1 ? 54 : 18}
                  r="5"
                  fill="#050505"
                  stroke="#67e8f9"
                  strokeWidth="2"
                  animate={
                    prefersReducedMotion ? undefined : { r: [5, 7, 5], opacity: [0.7, 1, 0.7] }
                  }
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: index * 0.4,
                  }}
                />
              ))}
            </svg>
            <div className="grid grid-cols-3 gap-3">
              {["AI ops", "3D render", "API mesh"].map((label) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.045] px-3 py-3"
                >
                  <span
                    className="block text-[10px] uppercase text-white/35"
                    style={{ letterSpacing: "0.1em" }}
                  >
                    {label}
                  </span>
                  <span className="mt-2 block h-1 rounded-full bg-gradient-to-r from-cyan-300 to-transparent" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-2 text-cyan-200/80">
                <Code2 className="h-4 w-4" />
                <span
                  className="font-mono text-[10px] uppercase"
                  style={{ letterSpacing: "0.14em" }}
                >
                  Release layer
                </span>
              </div>
              <div className="space-y-2 font-mono text-[11px] leading-relaxed text-white/45">
                <p>
                  <span className="text-cyan-200">deploy</span> platform.core
                </p>
                <p>
                  <span className="text-violet-200">sync</span> motion.pipeline
                </p>
                <p>
                  <span className="text-blue-200">route</span> automation.agent
                </p>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <span
                  className="font-mono text-[10px] uppercase text-white/38"
                  style={{ letterSpacing: "0.14em" }}
                >
                  Load shape
                </span>
                <span className="rounded-full bg-cyan-300/12 px-2 py-1 text-[10px] text-cyan-100">
                  live
                </span>
              </div>
              <div className="flex h-24 items-end gap-2">
                {[38, 58, 44, 76, 62, 88, 71].map((height, index) => (
                  <motion.span
                    key={height + index}
                    className="flex-1 rounded-t-lg bg-gradient-to-t from-cyan-400/35 to-cyan-100"
                    style={{ height: `${height}%` }}
                    animate={prefersReducedMotion ? undefined : { opacity: [0.42, 0.88, 0.42] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: index * 0.12,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {["architecture", "dashboards", "AI systems", "data visualization"].map((label) => (
            <span
              key={label}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] text-white/55 backdrop-blur-xl"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function EngineeringSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [70, -60]);

  return (
    <section
      ref={sectionRef}
      {...paletteAttrs("tech")}
      className="relative overflow-hidden bg-[#050505] px-5 py-24 text-white sm:px-8 md:py-16"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_28%,rgba(34,211,238,0.18),transparent_42%),radial-gradient(ellipse_at_18%_78%,rgba(59,130,246,0.14),transparent_48%)]" />
      <div className="absolute inset-0 grid-bg opacity-[0.1]" />
      <div className="relative z-10 mx-auto grid w-[min(1320px,94vw)] gap-20 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div>
          <SectionLabel eyebrow="Technology Identity" tone="tech" />
          <GradientHeading className="mt-7 text-4xl sm:text-5xl md:text-5xl lg:text-6xl" delay={0.05}>
            Engineering Digital Platforms From Concept To{" "}
            <span className="bg-gradient-to-r from-cyan-200 via-blue-300 to-violet-300 bg-clip-text text-transparent italic">
              Scale.
            </span>
          </GradientHeading>
          <Reveal delay={0.15}>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/58 sm:text-lg">
              Four specialized studios under one synchronized roof. Full-stack engineering, 3D
              motion design, custom AI automation, and technical team bootcamps tailored for
              high-growth tech leaders.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href="#ex-media" variant="tech" ariaLabel="Explore the system ↗">
              Explore the system
            </MagneticButton>
            <MagneticButton
              href="https://extechnology.in"
              variant="ghost"
              ariaLabel="Let’s confirm identity ↗"
            >
              Let’s confirm identity
            </MagneticButton>
          </Reveal>
        </div>

        <motion.div style={prefersReducedMotion ? undefined : { y: imageY }}>
          <TechnologySystemVisual />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Capability Journey section                                         */
/*  Left column is truly pinned (position: sticky) for the full        */
/*  duration of the right-hand card stack. Note: sticky positioning    */
/*  breaks if any ancestor has overflow-hidden, so the decorative      */
/*  grid background is isolated in its own clipped layer instead of    */
/*  living on the section element itself.                              */
/* ------------------------------------------------------------------ */

function useActiveIndex(progress: MotionValue<number>, count: number) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const unsubscribe = progress.on("change", (value) => {
      const next = Math.min(count - 1, Math.max(0, Math.round(value * (count - 1))));
      setActive((current) => (current === next ? current : next));
    });
    return () => unsubscribe();
  }, [progress, count]);

  return active;
}

function CapabilityRail({
  progress,
  activeIndex,
}: {
  progress: MotionValue<number>;
  activeIndex: number;
}) {
  const scaleY = useSpring(progress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <div className="hidden gap-5 lg:flex">
      <div className="relative w-px overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="absolute inset-x-0 top-0 w-full origin-top rounded-full bg-gradient-to-b from-amber-300 via-emerald-300 to-violet-300"
          style={{ scaleY, height: "100%" }}
        />
      </div>
      <div className="flex flex-col justify-between py-1">
        {capabilitySteps.map((step, index) => (
          <div key={step.label} className="flex items-center gap-3">
            <span
              className="h-1.5 w-1.5 rounded-full transition-all duration-500"
              style={{
                background: index === activeIndex ? step.accent : "rgba(255,255,255,0.18)",
                boxShadow: index === activeIndex ? `0 0 14px ${step.glow}` : "none",
                transform: index === activeIndex ? "scale(1.4)" : "scale(1)",
              }}
            />
            <span
              className="font-mono text-[10px] uppercase transition-colors duration-500"
              style={{
                letterSpacing: "0.14em",
                color: index === activeIndex ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.3)",
              }}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CapabilityStep({
  step,
  index,
  total,
}: {
  step: CapabilityStepData;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 82%", "start 30%"],
  });
  const revealY = useTransform(scrollYProgress, [0, 1], [56, 0]);
  const revealOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const revealScale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0.15, 0.6], [0, 1]);
  const Icon = step.icon;

  return (
    <motion.article
      ref={ref}
      style={
        prefersReducedMotion
          ? undefined
          : { y: revealY, opacity: revealOpacity, scale: revealScale }
      }
      className="relative"
    >
      {/* Ambient glow that eases in as the card takes center stage */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[48px] blur-3xl"
        style={{
          background: `radial-gradient(60% 60% at 30% 20%, ${step.glow}, transparent 72%)`,
          opacity: prefersReducedMotion ? 0.7 : glowOpacity,
        }}
      />

      <div className="relative overflow-hidden rounded-[36px] p-[1px]">
        {/* Soft gradient border */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[36px] opacity-70"
          style={{
            background: `linear-gradient(160deg, ${step.accent}55, rgba(255,255,255,0.06) 38%, rgba(255,255,255,0.02) 70%)`,
          }}
        />

        <div className="relative grid gap-8 rounded-[35px] border border-white/[0.06] bg-[#0a0a0c]/90 p-6 backdrop-blur-2xl sm:p-9 lg:grid-cols-[0.72fr_1fr] lg:items-center lg:gap-10">
          {/* Oversized ghost numeral — editorial texture, not a literal step counter */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-6 right-6 select-none font-sans text-[7rem] font-bold leading-none text-white/[0.035] sm:text-[9rem]"
          >
            {step.number}
          </span>

          <div className="relative">
            <div className="mb-7 flex items-center gap-3">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-2xl border"
                style={{
                  borderColor: `${step.accent}40`,
                  background: `${step.accent}14`,
                  color: step.accent,
                }}
              >
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <div className="flex items-center gap-2.5">
                <span
                  className="font-mono text-[11px] uppercase text-white/35"
                  style={{ letterSpacing: "0.16em" }}
                >
                  {step.number}
                </span>
                <span className="h-px w-8" style={{ background: `${step.accent}80` }} />
                <span
                  className="font-mono text-[10px] uppercase text-white/30"
                  style={{ letterSpacing: "0.14em" }}
                >
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>
            </div>

            <h3 className="font-sans text-5xl font-semibold leading-[0.96] tracking-tight text-white sm:text-6xl">
              {step.label}
            </h3>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/55 sm:text-base">
              {step.description}
            </p>
          </div>

          <div className="relative min-h-[240px] overflow-hidden rounded-[26px] border border-white/[0.08] bg-black/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] lg:min-h-[300px]">
            <motion.img
              src={step.image}
              alt={`${step.label} creative capability`}
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1024px) 42vw, 92vw"
              initial={prefersReducedMotion ? undefined : { scale: 1.12 }}
              whileInView={{ scale: 1 }}
              viewport={VIEWPORT.early}
              transition={{ duration: 1.1, ease: EASE_OUT }}
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/92 via-[#050505]/20 to-transparent" />
            <div
              className="absolute inset-0 mix-blend-overlay"
              style={{ background: `radial-gradient(120% 90% at 15% 100%, ${step.accent}55, transparent 60%)` }}
            />
            <div className="absolute inset-0 grid-bg opacity-[0.06]" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div
                className="mt-4 flex items-center justify-between text-[10px] uppercase text-white/40"
                style={{ letterSpacing: "0.12em" }}
              >
                <span>creative capability</span>
                <span style={{ color: step.accent }}>
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function CapabilityJourney() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const activeIndex = useActiveIndex(scrollYProgress, capabilitySteps.length);

  return (
    <section {...paletteAttrs("edu")} className="relative bg-[#050505] px-5 py-24 text-white sm:px-8 md:py-20">
      {/* Decorative layer only — isolated so it never blocks position:sticky on descendants */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 grid-bg opacity-[0.1]" />
        <div className="absolute left-1/2 top-1/3 h-[560px] w-[820px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.14),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-[min(1320px,94vw)]">
        {/* Track wraps only the sticky column + the scrolling cards, so the aside
            stays pinned for exactly as long as the card stack takes to scroll past. */}
        <div ref={trackRef} className="grid gap-12 lg:grid-cols-[0.36fr_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <SectionLabel eyebrow="Capability Journey" tone="edu" />
            <GradientHeading className="mt-6 text-4xl sm:text-5xl">
              Building creative strength in motion.
            </GradientHeading>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/45">
                One continuous capability, expressed in four disciplines. Scroll to move through
                each without losing your place.
              </p>
            </Reveal>
            <div className="mt-10 h-[38vh] min-h-[220px]">
              <CapabilityRail progress={scrollYProgress} activeIndex={activeIndex} />
            </div>
          </aside>

          <div className="space-y-8 lg:space-y-10">
            {capabilitySteps.map((step, index) => (
              <CapabilityStep
                key={step.label}
                step={step}
                index={index}
                total={capabilitySteps.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Final CTA section                                                  */
/* ------------------------------------------------------------------ */

function FinalCTA() {
  return (
    <section
      {...paletteAttrs("final")}
      className="relative min-h-[100svh] overflow-hidden bg-[#07060d] px-4 pb-8 pt-28 text-white sm:min-h-[92svh] sm:px-8 sm:py-16 md:py-20"
    >
      <div className="absolute inset-0 bg-[#07060d]" />
      <div className="pointer-events-none absolute inset-0 scale-[1.18] opacity-80 sm:scale-100 sm:opacity-95">
        <MagicRings
          color="#8B5CF6"
          colorTwo="#38BDF8"
          ringCount={6}
          speed={1}
          attenuation={10}
          lineThickness={1.8}
          baseRadius={0.35}
          radiusStep={0.1}
          scaleRate={0.1}
          opacity={1}
          blur={0}
          noiseAmount={0.1}
          rotation={0}
          ringGap={1.5}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse={false}
          mouseInfluence={0.2}
          hoverScale={1.2}
          parallax={0.05}
          clickBurst={false}
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(7,6,13,0.12),rgba(7,6,13,0.58)_58%,rgba(5,5,5,0.94)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050505] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-9rem)] w-full max-w-[1200px] flex-col items-center justify-center text-center sm:min-h-[72svh] sm:w-[min(1200px,94vw)]">
        <SectionLabel eyebrow="Next Move" tone="final" />
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT.default}
          transition={{ duration: 0.85, ease: EASE_OUT }}
          className="mt-6 max-w-[22rem] font-sans text-4xl font-semibold leading-[1.04] text-white sm:mt-8 sm:max-w-5xl sm:text-6xl sm:leading-[1.02] md:text-7xl"
          style={{ letterSpacing: 0 }}
        >
          Creative Capabilities.
          <span className="block bg-gradient-to-r from-violet-100 via-sky-100 to-fuchsia-100 bg-clip-text text-transparent italic">
            Stronger Businesses.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT.default}
          transition={{ duration: 0.75, delay: 0.12, ease: EASE_OUT }}
          className="mt-5 max-w-[22rem] text-[15px] leading-6 text-white/62 sm:mt-7 sm:max-w-2xl sm:text-base sm:leading-7 md:text-lg"
        >
          Build the skills, ideas, and practical expertise to create stronger brands, solve
          business challenges, adapt to markets, and grow sustainably.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT.default}
          transition={{ duration: 0.8, delay: 0.18, ease: EASE_OUT }}
          className="mt-8 flex w-full flex-col items-center gap-3 px-1 sm:mt-10 sm:w-auto sm:flex-row sm:justify-center sm:px-0"
        >
          <MagneticButton
            href="#ex-edu"
            variant="creative"
            ariaLabel="Identify the Platform ↗"
            className="w-full max-w-[360px] sm:w-auto sm:max-w-none"
          >
            Identify the Platform
          </MagneticButton>
          <MagneticButton
            href="https://exedu.in"
            variant="creativeGhost"
            ariaLabel="Increase Creative Strength ↗"
            className="w-full max-w-[360px] sm:w-auto sm:max-w-none"
          >
            Increase Creative Strength
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function PremiumHomePage() {
  return (
    <div className="relative isolate overflow-x-hidden bg-[#050505] text-white">
      <GrowthJourney />

      {/* Section Separator */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <CapabilityJourney />

      <FinalCTA />
    </div>
  );
}
