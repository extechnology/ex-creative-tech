import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
    motion,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    type MotionValue,
    type Variants,
} from "framer-motion";
import {
    ArrowUpRight,
    Network,
    PenTool,
    Rocket,
    Sparkles,
    type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types & default content (EX-MEDIA Logo Brand Theme)               */
/* ------------------------------------------------------------------ */

export type GrowthJourneyStep = {
    number: string;
    label: string;
    description: string;
    icon: LucideIcon;
    /** Hex accent used for the icon ring, path segment glow & ghost number. */
    accent: string;
    /** rgba glow color, usually the accent at low alpha. */
    glow: string;
};

const DEFAULT_STEPS: GrowthJourneyStep[] = [
    {
        number: "01",
        label: "Define",
        description:
            "Shape the vision, identity, and purpose that give your business a strong foundation.",
        icon: PenTool,
        accent: "#E11D48", // EX-MEDIA Crimson Red
        glow: "rgba(225, 29, 72, 0.55)",
    },
    {
        number: "02",
        label: "Connect",
        description:
            "Build meaningful connections between your brand and the people who matter most.",
        icon: Network,
        accent: "#FB7185", // EX-MEDIA Bright Coral Rose
        glow: "rgba(251, 113, 133, 0.55)",
    },
    {
        number: "03",
        label: "Create",
        description:
            "Turn ideas into distinctive creative experiences that capture attention and build recognition.",
        icon: Sparkles,
        accent: "#D946EF", // EX-MEDIA Vibrant Magenta
        glow: "rgba(217, 70, 239, 0.55)",
    },
    {
        number: "04",
        label: "Grow",
        description:
            "Transform brand presence into sustainable business growth through continuous innovation and strategic evolution.",
        icon: Rocket,
        accent: "#9333EA", // EX-MEDIA Electric Deep Purple
        glow: "rgba(147, 51, 234, 0.55)",
    },
];

const DEFAULT_MANIFESTO =
    "We transform ideas into opportunities, opportunities into strong foundations, and foundations into sustainable growth — empowering businesses to establish, evolve, innovate, and continuously move forward in an ever-changing market.";

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const;
const VIEWPORT = { once: true, amount: 0.35 } as const;

/* ------------------------------------------------------------------ */
/*  Small local primitives                                             */
/* ------------------------------------------------------------------ */

function FadeIn({
    children,
    delay = 0,
    y = 20,
    className,
}: {
    children: ReactNode;
    delay?: number;
    y?: number;
    className?: string;
}) {
    const prefersReducedMotion = useReducedMotion();
    return (
        <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, delay, ease: EASE_OUT }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

function Eyebrow({ children }: { children: ReactNode }) {
    return (
        <FadeIn y={14} className="flex justify-center">
            <div
                className="inline-flex items-center gap-3 rounded-full border border-[#F43F5E]/30 bg-[#E11D48]/10 px-4 py-2 text-[11px] font-semibold uppercase text-white/90 backdrop-blur-xl shadow-[0_0_20px_rgba(244,63,94,0.2)]"
                style={{ letterSpacing: "0.14em" }}
            >
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#F43F5E] via-[#C084FC] to-[#9333EA]" />
                <span>{children}</span>
            </div>
        </FadeIn>
    );
}

/* ------------------------------------------------------------------ */
/*  Manifesto — Word-by-Word Scroll Reveal (EX-MEDIA Theme)           */
/* ------------------------------------------------------------------ */

function RevealWord({
    word,
    progress,
    range,
}: {
    word: string;
    progress: MotionValue<number>;
    range: [number, number];
}) {
    const prefersReducedMotion = useReducedMotion();
    const opacity = useTransform(progress, range, [0.15, 1]);
    const y = useTransform(progress, range, [14, 0]);
    const scale = useTransform(progress, range, [0.95, 1]);

    const isHighlight =
        word.includes("transform") ||
        word.includes("opportunities,") ||
        word.includes("sustainable") ||
        word.includes("growth") ||
        word.includes("innovate,") ||
        word.includes("forward");

    if (prefersReducedMotion) {
        return <span className="mr-[0.28em] inline-block">{word}</span>;
    }

    return (
        <span className="mr-[0.26em] my-[0.04em] inline-block whitespace-nowrap">
            <motion.span
                style={{ opacity, y, scale, display: "inline-block" }}
                className={
                    isHighlight
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F43F5E] to-[#9333EA] font-semibold drop-shadow-[0_0_20px_rgba(244,63,94,0.4)]"
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
        offset: ["start 75%", "end 50%"],
    });
    const words = useMemo(() => text.split(" "), [text]);
    const total = words.length;

    return (
        <p
            ref={ref}
            className="mx-auto max-w-5xl text-center font-display text-xl font-medium leading-[1.35] text-white sm:text-3xl sm:leading-[1.3] lg:text-[2.7rem] lg:leading-[1.28]"
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

/* ------------------------------------------------------------------ */
/*  Ambient background field (EX-MEDIA Crimson & Purple Gradient Glow)*/
/* ------------------------------------------------------------------ */

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
    left: (i * 37.5) % 100,
    top: (i * 53.5 + 8) % 100,
    size: 1 + (i % 3),
    delay: (i % 7) * 0.35,
    duration: 3.4 + (i % 5) * 0.6,
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
                            transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                        />
                        <motion.circle
                            cx="40"
                            cy="40"
                            r="3"
                            fill="none"
                            stroke={accent}
                            strokeWidth="1"
                            animate={{ r: [3, 26], opacity: [0.55, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1.5 }}
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
                className="absolute -left-[12%] top-[4%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(244,63,94,0.22),transparent_70%)] blur-3xl"
            />
            <motion.div
                style={prefersReducedMotion ? undefined : { y: orbTwoY }}
                className="absolute -right-[10%] bottom-[6%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.20),transparent_70%)] blur-3xl"
            />
            <div className="absolute left-1/2 top-1/2 h-[560px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(225,29,72,0.12),transparent_72%)] blur-3xl" />

            <RadarPing className="left-[4%] top-[10%] hidden sm:block" accent="#F43F5E" />
            <RadarPing className="right-[5%] bottom-[12%] hidden sm:block" accent="#9333EA" />

            {!prefersReducedMotion &&
                PARTICLES.map((p, i) => (
                    <motion.span
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size }}
                        animate={{ opacity: [0.12, 0.65, 0.12] }}
                        transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
                    />
                ))}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Node spine — measured from DOM & updated for full line reach       */
/* ------------------------------------------------------------------ */

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

        const settleTimers = [60, 200, 450, 800, 1200, 1800].map((delay) => window.setTimeout(measure, delay));

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

function GrowthSpine({
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
                    {/* EX-MEDIA Crimson to Purple Brand Gradient */}
                    <linearGradient id="spine-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#E11D48" />
                        <stop offset="33%" stopColor="#FB7185" />
                        <stop offset="66%" stopColor="#D946EF" />
                        <stop offset="100%" stopColor="#9333EA" />
                    </linearGradient>
                    <filter id="spine-glow" x="-60%" y="-20%" width="220%" height="140%">
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
                    stroke="url(#spine-gradient)"
                    strokeWidth={3.5}
                    strokeLinecap="round"
                    filter="url(#spine-glow)"
                    style={{ pathLength: prefersReducedMotion ? 1 : drawn }}
                />

                {!prefersReducedMotion && (
                    <motion.path
                        d={spine.d}
                        fill="none"
                        stroke="rgba(255,255,255,0.55)"
                        strokeWidth={1.4}
                        strokeLinecap="round"
                        strokeDasharray="2 46"
                        animate={{ strokeDashoffset: [0, -480] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                    />
                )}

                {spine.points.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r={4} fill="#050505" stroke="rgba(255,255,255,0.6)" strokeWidth={1.5} />
                ))}
            </svg>

            {!prefersReducedMotion && (
                <motion.div
                    className="pointer-events-none absolute left-0 top-0 z-20 -ml-2 -mt-2 h-4 w-4 rounded-full"
                    style={{
                        transform: cometStyle,
                        background: "radial-gradient(circle, #fff 0%, rgba(244,63,94,0.6) 45%, transparent 75%)",
                        boxShadow: "0 0 18px 6px rgba(244,63,94,0.65)",
                    }}
                />
            )}
        </>
    );
}

/* ------------------------------------------------------------------ */
/*  Node card (Decreased vertical spacing for compact flow)            */
/* ------------------------------------------------------------------ */

function GrowthNode({
    step,
    index,
    side,
    active,
    registerBadgeRef,
    onEnter,
    onLeave,
    onSettled,
}: {
    step: GrowthJourneyStep;
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
            className={`relative flex min-h-[220px] items-center sm:min-h-[300px] lg:min-h-[380px] xl:min-h-[420px] ${isRight ? "lg:justify-end" : "lg:justify-start"
                }`}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            onFocus={onEnter}
            onBlur={onLeave}
        >
            {/* Soft focus wash behind active node */}
            <motion.div
                aria-hidden="true"
                animate={{ opacity: active ? 1 : 0 }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
                className={`pointer-events-none absolute -inset-x-6 inset-y-6 -z-10 rounded-[3rem] blur-3xl`}
                style={{ background: `radial-gradient(60% 60% at ${isRight ? "70%" : "30%"} 50%, ${step.glow}, transparent 72%)` }}
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
                className={`group relative w-full max-w-xl outline-none lg:w-[88%] ${isRight ? "lg:pr-[6%] lg:text-right" : "lg:pl-[6%]"
                    }`}
            >
                <motion.span
                    aria-hidden="true"
                    animate={{ color: active ? `${step.accent}33` : "rgba(255,255,255,0.05)" }}
                    transition={{ duration: 0.6 }}
                    className={`pointer-events-none absolute -top-12 select-none font-sans text-[6rem] font-bold leading-none sm:-top-16 sm:text-[9rem] lg:-top-18 lg:text-[12rem] xl:text-[14rem] ${isRight ? "right-0" : "left-0"
                        }`}
                >
                    {step.number}
                </motion.span>

                <div className={`relative flex items-center gap-4 sm:gap-5 ${isRight ? "lg:flex-row-reverse" : ""}`}>
                    <motion.span
                        ref={registerBadgeRef}
                        animate={{
                            boxShadow: active
                                ? `0 0 0 1px ${step.accent}55, 0 8px 32px -4px ${step.glow}, inset 0 1px 1px rgba(255,255,255,0.55), inset 0 -8px 16px -8px rgba(0,0,0,0.4)`
                                : `0 0 0 1px rgba(255,255,255,0.14), 0 8px 24px -6px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.3), inset 0 -8px 16px -8px rgba(0,0,0,0.4)`,
                            scale: active ? 1.06 : 1,
                        }}
                        transition={{ duration: 0.5, ease: EASE_OUT }}
                        className="relative z-10 isolate flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-2xl backdrop-saturate-150 sm:h-18 sm:w-18 lg:h-22 lg:w-22"
                        style={{ color: step.accent }}
                    >
                        {/* liquid-glass sheen */}
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
                            style={{ background: `radial-gradient(120% 100% at 50% 120%, ${step.glow}, transparent 60%)`, opacity: 0.35 }}
                        />
                        <Icon className="relative h-6 w-6 drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)] sm:h-8 sm:w-8 lg:h-9 lg:w-9" />
                    </motion.span>

                    <div
                        className="flex items-center gap-2.5 font-mono text-[11px] uppercase text-white/35 sm:text-xs"
                        style={{ letterSpacing: "0.16em" }}
                    >
                        <span>{step.number}</span>
                        <span className="h-px w-8 sm:w-10" style={{ background: `${step.accent}90` }} />
                    </div>
                </div>

                <h3 className="relative mt-5 font-sans text-4xl font-semibold leading-[0.96] text-white sm:mt-6 sm:text-5xl lg:text-6xl xl:text-7xl">
                    {step.label}
                </h3>
                <p
                    className={`relative mt-4 max-w-lg text-sm leading-relaxed text-white/60 sm:mt-5 sm:text-base lg:text-lg ${isRight ? "lg:ml-auto" : ""
                        }`}
                >
                    {step.description}
                </p>

                <div
                    className={`relative mt-5 flex items-center gap-2 text-xs font-medium uppercase text-white/30 transition-colors duration-300 group-hover:text-white/70 sm:mt-6 ${isRight ? "lg:justify-end" : ""
                        }`}
                    style={{ letterSpacing: "0.12em" }}
                >
                    <span>Stage {String(index + 1).padStart(2, "0")}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
            </motion.article>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Mobile-friendly rail (EX-MEDIA Gradient)                           */
/* ------------------------------------------------------------------ */
function MobileRail({ progress }: { progress: MotionValue<number> }) {
    const scaleY = useSpring(progress, { stiffness: 90, damping: 26, restDelta: 0.001 });
    return (
        <div className="absolute left-[27px] top-0 h-full w-px bg-white/10 sm:left-9 lg:hidden" aria-hidden="true">
            <motion.div
                style={{ scaleY }}
                className="h-full w-full origin-top bg-gradient-to-b from-[#E11D48] via-[#FB7185] via-[#D946EF] to-[#9333EA]"
            />
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Active-node tracking                                              */
/* ------------------------------------------------------------------ */
function useScrollActiveIndex(progress: MotionValue<number>, count: number) {
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

/* ------------------------------------------------------------------ */
/*  Section                                                             */
/* ------------------------------------------------------------------ */
export default function GrowthJourney({
    steps = DEFAULT_STEPS,
    eyebrow = "Our Process",
    manifesto = DEFAULT_MANIFESTO,
}: {
    steps?: GrowthJourneyStep[];
    eyebrow?: string;
    manifesto?: string;
}) {
    const trackRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ["start 75%", "end 85%"],
    });

    const { registerNode, spine, remeasure } = useMeasuredSpine(trackRef, steps.length);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", () => remeasure());
        return () => unsubscribe();
    }, [scrollYProgress, remeasure]);

    const scrollActiveIndex = useScrollActiveIndex(scrollYProgress, steps.length);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const activeIndex = hoverIndex ?? scrollActiveIndex;

    return (
        <section
            data-palette=""
            data-palette-a="#f5f5ff"
            data-palette-b="#c084fc"
            data-palette-c="#f43f5e"
            data-palette-bg="#04070c"
            data-palette-progress="linear-gradient(90deg, #f43f5e, #c084fc 50%, #9333ea)"
            className="relative overflow-hidden bg-[#04070C] px-5 py-24 text-white sm:px-8 sm:py-28 lg:py-20"
        >
            <AmbientField scrollYProgress={scrollYProgress} />

            <div className="relative z-10 mx-auto w-[min(1440px,96vw)]">
                <div className="flex flex-col items-center gap-7">
                    <Eyebrow>{eyebrow}</Eyebrow>
                    <Manifesto text={manifesto} />
                </div>

                <div ref={trackRef} className="relative mt-20 pl-16 sm:mt-16 sm:pl-20 lg:px-24">
                    <MobileRail progress={scrollYProgress} />

                    <div className="pointer-events-none absolute inset-0 hidden lg:block">
                        <GrowthSpine spine={spine} drawProgress={scrollYProgress} scrollYProgress={scrollYProgress} />
                    </div>

                    <div className="relative z-10">
                        {steps.map((step, index) => (
                            <GrowthNode
                                key={step.label}
                                step={step}
                                index={index}
                                side={index % 2 === 0 ? "left" : "right"}
                                active={activeIndex === index}
                                registerBadgeRef={registerNode(index)}
                                onEnter={() => setHoverIndex(index)}
                                onLeave={() => setHoverIndex(null)}
                                onSettled={remeasure}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}