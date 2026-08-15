"use client";

/**
 * ApproachCompassSection
 * ---------------------------------------------------------------
 * EX EDU Brand Theme Edition
 * ---------------------------------------------------------------
 * Features:
 * - Word-by-word scroll-driven parallax reveal animation for intro text.
 * - Perfect seamless background blending with top (#04070C) & bottom (#050505) sections (No color gaps!).
 * - EX EDU signature purple/violet theme (#A855F7, #C084FC, #8B5CF6, #D8B4FE).
 * - Solid clean white stage headlines.
 * - Mobile application-level responsiveness.
 * ---------------------------------------------------------------
 */

import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useSpring,
    useReducedMotion,
    useScroll,
    useTransform,
    type MotionValue,
} from "framer-motion";

type Stage = {
    key: string;
    title: string;
    body: string;
    bridge: string;
    color: string;
};

const STAGES: Stage[] = [
    {
        key: "inspire",
        title: "INSPIRE",
        body: "Cultivating creative thinking and fresh perspectives that generate innovative ideas and new business possibilities.",
        bridge: "Ideas become capability",
        color: "#9333EA", // Bold Electric EX EDU Purple
    },
    {
        key: "develop",
        title: "DEVELOP",
        body: "Building practical creative, digital, and strategic capabilities that strengthen brand and business potential.",
        bridge: "Capability meets the market",
        color: "#A855F7", // Bold Vibrant Purple
    },
    {
        key: "connect",
        title: "CONNECT",
        body: "Bridging creativity with real-world business needs to create meaningful brands, stronger communication, and market relevance.",
        bridge: "Relevance becomes momentum",
        color: "#8B5CF6", // Bold Iris Violet
    },
    {
        key: "accelerate",
        title: "ACCELERATE",
        body: "Turning knowledge, creativity, and innovation into actionable outcomes that support sustainable business growth and long-term success.",
        bridge: "The approach begins again",
        color: "#7C3AED", // Bold Deep EX EDU Violet
    },
];

const N = STAGES.length;
const RING_R = 118;
const RING_CENTER = 150;
const GAP_DEG = 5;

const PARTICLES = Array.from({ length: 22 }).map((_, i) => ({
    left: (i * 47) % 100,
    top: (i * 29 + 5) % 100,
    size: 1 + (i % 3),
    delay: (i % 7) * 0.4,
    duration: 3.5 + (i % 4),
}));

const INTRO_TEXT =
    "Our institution catalyzes vision into meaningful brand experiences, strengthens market identity, develops innovative thinking, and empowers businesses with the creative capabilities needed to achieve goals, build influence, and grow sustainably.";

function pointAtClock(cx: number, cy: number, r: number, angleDeg: number) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(
    cx: number,
    cy: number,
    r: number,
    startDeg: number,
    endDeg: number
) {
    const start = pointAtClock(cx, cy, r, endDeg);
    const end = pointAtClock(cx, cy, r, startDeg);
    const largeArc = endDeg - startDeg <= 180 ? 0 : 1;
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

/** ── Word-by-Word Parallax Scroll Reveal Component ────────────────────── */
function WordItem({
    word,
    progress,
    range,
}: {
    word: string;
    progress: MotionValue<number>;
    range: [number, number];
}) {
    const opacity = useTransform(progress, range, [0.12, 1]);
    const y = useTransform(progress, range, [14, 0]);
    const scale = useTransform(progress, range, [0.95, 1]);

    const isHighlight =
        word.includes("meaningful") ||
        word.includes("brand") ||
        word.includes("experiences,") ||
        word.includes("innovative") ||
        word.includes("creative") ||
        word.includes("capabilities") ||
        word.includes("sustainably");

    return (
        <span className="inline-block relative mr-[0.28em] my-[0.06em] whitespace-nowrap">
            <motion.span
                style={{
                    opacity,
                    y,
                    scale,
                    display: "inline-block",
                }}
                className={
                    isHighlight
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-[#A855F7] to-[#9333EA] font-semibold drop-shadow-[0_0_25px_rgba(147,51,234,0.55)]"
                        : "text-white/90 font-medium"
                }
            >
                {word}
            </motion.span>
        </span>
    );
}

function WordByWordScrollText({ text }: { text: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 75%", "end 50%"],
    });

    const words = useMemo(() => text.split(" "), [text]);
    const total = words.length;

    return (
        <div
            ref={containerRef}
            className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 text-center"
        >
            {/* Tag / Eyebrow */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8 flex flex-col items-center"
            >
                <span className="font-mono text-[11px] sm:text-[12px] tracking-[0.4em] uppercase text-[#A855F7] font-semibold bg-[#9333EA]/15 px-4 py-1.5 rounded-full border border-[#A855F7]/30 shadow-[0_0_20px_rgba(147,51,234,0.25)]">
                    OUR APPROACH
                </span>
                <div className="mt-4 h-14 w-px bg-gradient-to-b from-[#9333EA]/70 to-transparent" />
            </motion.div>

            {/* Word-by-Word Parallax Reveal Paragraph */}
            <p className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.35] sm:leading-[1.4] text-white">
                {words.map((word, i) => {
                    const start = (i / total) * 0.9;
                    const end = Math.min(1, start + (1 / total) * 1.8);
                    return (
                        <WordItem
                            key={i}
                            word={word}
                            progress={scrollYProgress}
                            range={[start, end]}
                        />
                    );
                })}
            </p>

            {/* Connecting guide line to compass */}
            <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                whileInView={{ opacity: 1, scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="mx-auto mt-12 sm:mt-16 h-20 w-px bg-gradient-to-b from-[#A855F7] via-[#8B5CF6]/50 to-transparent origin-top"
            />
        </div>
    );
}

function CompassRing({ activeIndex }: { activeIndex: number }) {
    const reduceMotion = useReducedMotion();
    const stage = STAGES[activeIndex];
    const outerTicks = Array.from({ length: 60 });

    const wrapRef = useRef<HTMLDivElement>(null);
    const rx = useMotionValue(0);
    const ry = useMotionValue(0);
    const srx = useSpring(rx, { stiffness: 120, damping: 14 });
    const sry = useSpring(ry, { stiffness: 120, damping: 14 });

    function handleMove(e: React.MouseEvent<HTMLDivElement>) {
        if (reduceMotion) return;
        const el = wrapRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * 14);
        rx.set(py * -14);
    }
    function handleLeave() {
        rx.set(0);
        ry.set(0);
    }

    return (
        <div className="relative">
            {/* Halo pulse in EX EDU theme color */}
            <motion.div
                aria-hidden
                animate={{ opacity: [0.45, 0.75, 0.45], scale: [0.96, 1.04, 0.96] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ backgroundColor: stage.color }}
                className="pointer-events-none absolute left-1/2 top-1/2 h-[95%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[85px] sm:blur-[100px] transition-colors duration-700"
            />

            <div
                ref={wrapRef}
                onMouseMove={handleMove}
                onMouseLeave={handleLeave}
                style={{ perspective: 900 }}
                className="relative aspect-square w-[75vw] max-w-[290px] sm:max-w-[360px] md:w-[440px] md:max-w-none mx-auto"
            >
                <motion.div
                    style={{ rotateX: srx, rotateY: sry }}
                    className="relative h-full w-full"
                >
                    {/* Orbiting satellite */}
                    {!reduceMotion && (
                        <motion.div
                            aria-hidden
                            className="absolute inset-0"
                            animate={{ rotate: -360 }}
                            transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
                        >
                            <span
                                className="absolute -top-[2px] left-1/2 h-[6px] w-[6px] -translate-x-1/2 rounded-full transition-colors duration-700"
                                style={{
                                    backgroundColor: stage.color,
                                    boxShadow: `0 0 12px 3px ${stage.color}`,
                                }}
                            />
                        </motion.div>
                    )}

                    {/* Ambient bezel rotation */}
                    <motion.svg
                        aria-hidden
                        viewBox="0 0 300 300"
                        className="absolute inset-0 h-full w-full opacity-40"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
                    >
                        {outerTicks.map((_, i) => {
                            const angle = (360 / outerTicks.length) * i;
                            const inner = pointAtClock(150, 150, 139, angle);
                            const outer = pointAtClock(150, 150, i % 5 === 0 ? 126 : 133, angle);
                            return (
                                <line
                                    key={i}
                                    x1={inner.x}
                                    y1={inner.y}
                                    x2={outer.x}
                                    y2={outer.y}
                                    stroke="white"
                                    strokeOpacity={i % 5 === 0 ? 0.4 : 0.12}
                                    strokeWidth={i % 5 === 0 ? 1.1 : 0.6}
                                />
                            );
                        })}
                    </motion.svg>

                    {/* Radar sweep */}
                    {!reduceMotion && (
                        <motion.div
                            aria-hidden
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                            className="absolute inset-[10%] rounded-full"
                            style={{
                                background: `conic-gradient(from 0deg, transparent 0deg, ${stage.color}33 18deg, transparent 46deg)`,
                                mixBlendMode: "screen",
                            }}
                        />
                    )}

                    {/* Rings + active stage arc */}
                    <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full">
                        <defs>
                            {STAGES.map((s) => (
                                <filter key={s.key} id={`glow-${s.key}`} x="-80%" y="-80%" width="260%" height="260%">
                                    <feGaussianBlur stdDeviation="5" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            ))}
                        </defs>

                        <circle cx={150} cy={150} r={92} stroke="white" strokeOpacity={0.06} fill="none" />
                        <circle cx={150} cy={150} r={62} stroke="white" strokeOpacity={0.06} fill="none" />

                        {STAGES.map((s, i) => {
                            const start = (360 / N) * i + GAP_DEG / 2;
                            const end = (360 / N) * (i + 1) - GAP_DEG / 2;
                            const isActive = i <= activeIndex;
                            const isCurrent = i === activeIndex;
                            return (
                                <path
                                    key={s.key}
                                    d={describeArc(RING_CENTER, RING_CENTER, RING_R, start, end)}
                                    stroke={s.color}
                                    strokeWidth={isActive ? (isCurrent ? 6 : 4.5) : 2}
                                    strokeLinecap="round"
                                    fill="none"
                                    opacity={isActive ? 1 : 0.16}
                                    filter={isActive ? `url(#glow-${s.key})` : undefined}
                                    style={{ transition: "all 0.6s cubic-bezier(.4,0,.2,1)" }}
                                />
                            );
                        })}

                        <motion.circle
                            cx={RING_CENTER}
                            cy={RING_CENTER}
                            r={4}
                            fill={stage.color}
                            animate={{ r: [4, 7.5, 4], opacity: [1, 0.4, 1] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                            style={{ filter: `url(#glow-${stage.key})` }}
                        />
                    </svg>

                    {/* Compass-point labels */}
                    {STAGES.map((s, i) => {
                        const mid = (360 / N) * i + 360 / N / 2;
                        const pos = pointAtClock(50, 50, 45, mid);
                        const active = i === activeIndex;
                        return (
                            <span
                                key={s.key}
                                className="absolute font-mono text-[9px] sm:text-[10px] font-medium tracking-[0.25em] uppercase transition-all duration-500"
                                style={{
                                    left: `${pos.x}%`,
                                    top: `${pos.y}%`,
                                    transform: `translate(-50%, -50%) scale(${active ? 1.15 : 1})`,
                                    color: active ? s.color : "rgba(255,255,255,0.3)",
                                    textShadow: active ? `0 0 14px ${s.color}` : "none",
                                }}
                            >
                                {s.title.slice(0, 3)}
                            </span>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}

type PinState = "before" | "pin" | "after";

export default function ApproachCompassSection() {
    const pinContainerRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();
    const [active, setActive] = useState(0);
    const [pinState, setPinState] = useState<PinState>("before");
    const [progress, setProgress] = useState(0);
    const rafId = useRef<number | null>(null);

    const measure = useCallback(() => {
        const el = pinContainerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;

        let nextState: PinState;
        let nextProgress: number;

        if (rect.top > 0) {
            nextState = "before";
            nextProgress = 0;
        } else if (rect.bottom < vh) {
            nextState = "after";
            nextProgress = 1;
        } else {
            nextState = "pin";
            const scrollable = rect.height - vh;
            nextProgress = scrollable > 0 ? (0 - rect.top) / scrollable : 0;
        }

        setPinState((prev) => (prev === nextState ? prev : nextState));
        setProgress(nextProgress);
        const idx = Math.min(N - 1, Math.max(0, Math.floor(nextProgress * N)));
        setActive((prev) => (prev === idx ? prev : idx));
    }, []);

    useEffect(() => {
        function onScroll() {
            if (rafId.current != null) return;
            rafId.current = requestAnimationFrame(() => {
                rafId.current = null;
                measure();
            });
        }
        measure();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (rafId.current != null) cancelAnimationFrame(rafId.current);
        };
    }, [measure]);

    const stage = STAGES[active];
    const particles = useMemo(() => PARTICLES, []);

    const blobX = -4 + progress * 10;
    const blobX2 = 4 - progress * 10;

    const pinnedStyle: React.CSSProperties =
        pinState === "pin"
            ? { position: "fixed", top: 0, left: 0, width: "100%", height: "100vh" }
            : pinState === "after"
                ? { position: "absolute", bottom: 0, left: 0, width: "100%", height: "100vh" }
                : { position: "absolute", top: 0, left: 0, width: "100%", height: "100vh" };

    return (
        <section className="relative w-full bg-[#04070C] overflow-x-hidden">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .font-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        .font-display { font-family: 'Space Grotesk', sans-serif; }
      `}</style>

            {/* ── Seamless Top Transition Gradient (Blending from CreativeCapabilities #04070C) ── */}
            <div
                aria-hidden
                className="pointer-events-none absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#04070C] via-[#04070C] to-transparent z-20"
            />

            {/* ── Seamless Ambient EX EDU Glow Header connecting into Compass ────── */}
            <div className="relative z-10 pt-24 pb-20 sm:pt-32 sm:pb-28 md:pt-24 md:pb-24">
                {/* Ambient EX EDU Glow radial aura */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-[750px] h-[350px] rounded-full blur-[120px] opacity-40"
                    style={{
                        background: "radial-gradient(circle, #A855F7 0%, #8B5CF6 50%, transparent 80%)",
                    }}
                />

                {/* Word-by-Word Scroll Parallax Text */}
                <WordByWordScrollText text={INTRO_TEXT} />
            </div>

            {/* ── Pin track for scroll-driven compass interaction ── */}
            <div
                ref={pinContainerRef}
                className="relative"
                style={{ height: `${N * 100}vh` }}
            >
                <div
                    style={{ ...pinnedStyle, backgroundColor: "#04070C" }}
                    className="w-full h-[100dvh] overflow-hidden flex items-center justify-center"
                >
                    {/* Drifting aurora color-locked to EX EDU active stage */}
                    <div
                        aria-hidden
                        style={{
                            transform: reduceMotion ? undefined : `translateX(${blobX}%)`,
                            backgroundColor: stage.color,
                            transition: "transform 0.1s linear, background-color 0.7s",
                        }}
                        className="pointer-events-none absolute -left-[10%] top-1/4 h-[55vh] w-[55vh] sm:h-[62vh] sm:w-[62vh] rounded-full opacity-[0.22] blur-[130px]"
                    />
                    <div
                        aria-hidden
                        style={{
                            transform: reduceMotion ? undefined : `translateX(${blobX2}%)`,
                            backgroundColor: stage.color,
                            transition: "transform 0.1s linear, background-color 0.7s",
                        }}
                        className="pointer-events-none absolute -right-[8%] bottom-1/5 h-[48vh] w-[48vh] sm:h-[52vh] sm:w-[52vh] rounded-full opacity-[0.16] blur-[120px]"
                    />

                    {/* Faint grain */}
                    <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05] mix-blend-overlay">
                        <filter id="grain">
                            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#grain)" />
                    </svg>

                    {/* Ambient particles */}
                    <div aria-hidden className="pointer-events-none absolute inset-0">
                        {particles.map((p, i) => (
                            <motion.span
                                key={i}
                                className="absolute rounded-full bg-white"
                                style={{
                                    left: `${p.left}%`,
                                    top: `${p.top}%`,
                                    width: p.size,
                                    height: p.size,
                                }}
                                animate={
                                    reduceMotion
                                        ? undefined
                                        : { opacity: [0.1, 0.6, 0.1], scale: [1, 1.4, 1] }
                                }
                                transition={{
                                    duration: p.duration,
                                    delay: p.delay,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>

                    {/* Top & bottom vignettes inside pin container */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(#04070C 0%, transparent 12%, transparent 88%, #050505 100%), radial-gradient(120% 60% at 50% 0%, rgba(168,85,247,0.08), transparent 60%)",
                        }}
                    />

                    {/* Vertical progress rail on desktop */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute left-6 md:left-10 top-1/2 hidden -translate-y-1/2 sm:flex flex-col items-center gap-3"
                    >
                        <span className="font-mono text-[9px] tracking-[0.2em] text-white/25">01</span>
                        <div className="relative h-[28vh] w-px bg-white/10">
                            <div
                                className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-700"
                                style={{
                                    top: `${progress * 100}%`,
                                    backgroundColor: stage.color,
                                    boxShadow: `0 0 10px 2px ${stage.color}`,
                                }}
                            />
                        </div>
                        <span className="font-mono text-[9px] tracking-[0.2em] text-white/25">04</span>
                    </div>

                    {/* Main Section Content Stack */}
                    <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-8 sm:gap-12 md:flex-row md:items-center md:justify-between md:gap-20 px-6 md:pl-16 pt-8 md:pt-0">
                        {/* Compass Instrument */}
                        <div className="shrink-0">
                            <CompassRing activeIndex={active} />
                        </div>

                        {/* Stage Details */}
                        <div className="w-full max-w-xl text-center md:text-left">
                            <div className="flex items-center justify-center gap-3 md:justify-start">
                                <span
                                    className="h-1.5 w-1.5 rounded-full transition-colors duration-500"
                                    style={{ backgroundColor: stage.color, boxShadow: `0 0 10px ${stage.color}` }}
                                />
                                <span
                                    className="font-mono text-[11px] tracking-[0.35em] uppercase transition-colors duration-500 font-medium"
                                    style={{ color: stage.color }}
                                >
                                    Stage {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                                </span>
                            </div>

                            {/* Stage Headline - Pure Solid White Text */}
                            <div className="relative mt-3 sm:mt-4 h-[3.2rem] sm:h-[4.8rem] md:h-[6.2rem] overflow-hidden">
                                <AnimatePresence mode="popLayout">
                                    <motion.div
                                        key={stage.key}
                                        initial={{ y: reduceMotion ? 0 : 40, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: reduceMotion ? 0 : -40, opacity: 0 }}
                                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                                        className="absolute inset-0"
                                    >
                                        <h3
                                            className="font-display font-bold leading-none tracking-tight text-white"
                                            style={{
                                                fontSize: "clamp(2.4rem, 7vw, 5.4rem)",
                                            }}
                                        >
                                            {stage.title}
                                        </h3>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Body Description */}
                            <div className="relative mt-4 sm:mt-6 min-h-[5rem] sm:min-h-[6rem]">
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={stage.key}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -12 }}
                                        transition={{ duration: 0.4 }}
                                        className="font-['Inter',sans-serif] text-sm sm:text-base md:text-xl leading-relaxed text-white/70 max-w-lg mx-auto md:mx-0"
                                    >
                                        {stage.body}
                                    </motion.p>
                                </AnimatePresence>
                            </div>

                            {/* Bridge line */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={stage.key}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-4 sm:mt-6 flex items-center justify-center gap-3 md:justify-start"
                                >
                                    <motion.span
                                        initial={{ width: 0 }}
                                        animate={{ width: 32 }}
                                        transition={{ duration: 0.6, delay: 0.15 }}
                                        className="h-px"
                                        style={{ backgroundColor: stage.color }}
                                    />
                                    <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/40">
                                        {stage.bridge}
                                    </span>
                                    <motion.span
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                                        className="text-[13px]"
                                        style={{ color: stage.color }}
                                    >
                                        →
                                    </motion.span>
                                </motion.div>
                            </AnimatePresence>

                            {/* Progress Dots */}
                            <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2 md:justify-start">
                                {STAGES.map((s, i) => (
                                    <span
                                        key={s.key}
                                        className="h-1.5 rounded-full transition-all duration-500"
                                        style={{
                                            width: i === active ? 26 : 6,
                                            backgroundColor: i <= active ? s.color : "rgba(255,255,255,0.15)",
                                            boxShadow: i === active ? `0 0 10px ${s.color}` : "none",
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        </section>
    );
}