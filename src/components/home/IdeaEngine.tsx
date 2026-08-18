import { useState, useRef, useMemo } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useReducedMotion,
    type MotionValue,
} from "motion/react";
import {
    Lightbulb,
    PenTool,
    Layers,
    Rocket,
    ArrowUpRight,
    Sparkles,
    ChevronRight,
} from "lucide-react";

/* ── Exact User Content Constants ────────────────────────────── */
const EYEBROW = "THE IDEA ENGINE";
const SUBTITLE = "Every great outcome starts with an idea.";
const HEADLINE_LINE_1 = "Ideas Are the Beginning.";
const HEADLINE_LINE_2 = "Possibilities Are the Destination.";
const DESCRIPTION =
    "From a simple thought to a powerful brand, digital experience, campaign, or business solution, we transform ideas into something people can see, use, remember, and engage with.";

const STAGES = [
    {
        index: "01",
        label: "IDEATE",
        note: "Where every build begins",
        category: "Discovery & Strategy",
        icon: Lightbulb,
        accent: "#6366F1", // Electric Indigo
        glow: "rgba(99, 102, 241, 0.5)",
        borderGlow: "rgba(99, 102, 241, 0.4)",
        gradient: "from-[#6366F1]/20 via-[#6366F1]/5 to-transparent",
    },
    {
        index: "02",
        label: "CREATE",
        note: "Shape it into something real",
        category: "Architecture & Craft",
        icon: PenTool,
        accent: "#A855F7", // Electric Violet
        glow: "rgba(168, 85, 247, 0.5)",
        borderGlow: "rgba(168, 85, 247, 0.4)",
        gradient: "from-[#A855F7]/20 via-[#A855F7]/5 to-transparent",
    },
    {
        index: "03",
        label: "VISUALIZE",
        note: "Give it a form worth noticing",
        category: "Design & Immersion",
        icon: Layers,
        accent: "#EC4899", // Vivid Rose Pink
        glow: "rgba(236, 72, 153, 0.5)",
        borderGlow: "rgba(236, 72, 153, 0.4)",
        gradient: "from-[#EC4899]/20 via-[#EC4899]/5 to-transparent",
    },
    {
        index: "04",
        label: "EXPRESS",
        note: "Put it in front of the world",
        category: "Launch & Global Scale",
        icon: Rocket,
        accent: "#F59E0B", // Glowing Amber Gold
        glow: "rgba(245, 158, 11, 0.5)",
        borderGlow: "rgba(245, 158, 11, 0.4)",
        gradient: "from-[#F59E0B]/20 via-[#F59E0B]/5 to-transparent",
    },
] as const;

const PARTICLES = [
    { left: "8%", top: "16%", size: 3, duration: 7, delay: 0 },
    { left: "18%", top: "64%", size: 2, duration: 9, delay: 0.8 },
    { left: "82%", top: "20%", size: 2.5, duration: 7.5, delay: 1.2 },
    { left: "90%", top: "72%", size: 3, duration: 8.5, delay: 0.4 },
    { left: "48%", top: "12%", size: 2, duration: 10, delay: 1.8 },
    { left: "68%", top: "86%", size: 2.5, duration: 7.2, delay: 0.9 },
];

const easeOut = [0.16, 1, 0.3, 1] as const;

/* ── Individual Stage Card with Scroll Parallax & Spotlight ────── */
function StageCard({
    stage,
    index,
    total,
    scrollYProgress,
    active,
    onHover,
}: {
    stage: (typeof STAGES)[number];
    index: number;
    total: number;
    scrollYProgress: MotionValue<number>;
    active: boolean;
    onHover: () => void;
}) {
    const Icon = stage.icon;
    const prefersReducedMotion = useReducedMotion();

    // Distinct parallax offset per card for fluid wave-like movement
    const parallaxOffsets = [-24, 18, -16, 26];
    const cardY = useTransform(
        scrollYProgress,
        [0, 1],
        prefersReducedMotion ? [0, 0] : [parallaxOffsets[index] * -1, parallaxOffsets[index]]
    );

    return (
        <motion.div
            style={{ y: cardY }}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: easeOut, delay: index * 0.1 }}
            onMouseEnter={onHover}
            className={`group min-h-[320px] sm:min-h-[340px] lg:min-h-[420px] relative flex flex-col justify-between rounded-3xl border bg-white/[0.03] p-6 sm:p-7 lg:p-8 backdrop-blur-2xl transition-all duration-500 overflow-hidden cursor-pointer ${active
                    ? "border-white/40 bg-white/[0.07] shadow-[0_20px_50px_rgba(0,0,0,0.9)] scale-[1.02] -translate-y-1.5"
                    : "border-white/10 hover:border-white/25 hover:bg-white/[0.05]"
                }`}
        >
            {/* Dynamic Background Glow on Card Hover */}
            <div
                className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-15 blur-3xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-45"
                style={{ backgroundColor: stage.accent }}
            />
            <div
                className="pointer-events-none absolute -left-16 -bottom-16 h-40 w-40 rounded-full opacity-10 blur-3xl transition-all duration-500 group-hover:opacity-30"
                style={{ backgroundColor: stage.accent }}
            />

            {/* Top Ambient Highlight Bar */}
            <div
                className="absolute inset-x-0 top-0 h-[2px] transition-all duration-500"
                style={{
                    background: active
                        ? `linear-gradient(90deg, transparent, ${stage.accent}, transparent)`
                        : "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                }}
            />

            {/* Ghost Stage Number in Background */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-6 right-2 select-none font-sans text-[6.5rem] sm:text-[7.5rem] lg:text-[8.5rem] font-black leading-none text-white/[0.03] transition-colors duration-500 group-hover:text-white/[0.07]"
            >
                {stage.index}
            </span>

            {/* Top Header Row */}
            <div className="relative z-10">
                <div className="flex items-center justify-between gap-3">
                    {/* Stage Badge */}
                    <div className="flex items-center gap-2">
                        <span
                            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-bold tracking-widest uppercase border border-white/10 bg-white/[0.04]"
                            style={{ color: stage.accent }}
                        >
                            <span
                                className="h-1.5 w-1.5 rounded-full shadow-sm"
                                style={{ backgroundColor: stage.accent }}
                            />
                            STAGE {stage.index}
                        </span>
                    </div>

                    {/* Liquid Glass Icon Tile */}
                    <div
                        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-xl shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                        style={{
                            boxShadow: active
                                ? `0 0 24px -2px ${stage.glow}, inset 0 1px 1px rgba(255,255,255,0.4)`
                                : `0 4px 16px -2px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.2)`,
                        }}
                    >
                        <Icon
                            className="h-5 w-5 text-white transition-transform duration-300"
                            style={{ filter: `drop-shadow(0 0 8px ${stage.glow})` }}
                        />
                    </div>
                </div>

                {/* Stage Label */}
                <h3 className="mt-6 font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white transition-colors duration-300">
                    {stage.label}
                </h3>

                {/* Category Tagline */}
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-white/45">
                    {stage.category}
                </p>

                {/* Exact User Note */}
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/70">
                    {stage.note}
                </p>
            </div>

            {/* Card Bottom Interactive Flow Footer */}
            <div className="relative z-10 mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40 transition-colors duration-300 group-hover:text-white">
                <span className="flex items-center gap-1.5">
                    <span
                        className="h-1.5 w-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: stage.accent }}
                    />
                    Live Node
                </span>
                <div className="flex items-center gap-1">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
            </div>
        </motion.div>
    );
}

export default function IdeaEngineSection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const cardsContainerRef = useRef<HTMLDivElement | null>(null);
    const [activeStage, setActiveStage] = useState<number>(0);
    const prefersReducedMotion = useReducedMotion();

    const { scrollYProgress: sectionProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const { scrollYProgress: cardsProgress } = useScroll({
        target: cardsContainerRef,
        offset: ["start 0.85", "end 0.25"],
    });

    const smoothProgress = useSpring(cardsProgress, {
        stiffness: 75,
        damping: 24,
        restDelta: 0.001,
    });

    const blob1Y = useTransform(sectionProgress, [0, 1], [-90, 90]);
    const blob2Y = useTransform(sectionProgress, [0, 1], [90, -90]);
    const svgLineDraw = useTransform(smoothProgress, [0, 1], [0, 1]);

    return (
        <section
            ref={sectionRef}
            id="idea-engine"
            className="relative w-full overflow-hidden bg-[#050505] px-4 py-24 sm:px-8 sm:py-16 md:py-20 lg:px-12 selection:bg-white selection:text-black"
        >
            {/* ── AMBIENT ATMOSPHERE BACKDROPS ───────────────────────── */}
            <motion.div
                style={{ y: prefersReducedMotion ? 0 : blob1Y }}
                className="pointer-events-none absolute -left-48 top-1/4 h-[540px] w-[540px] rounded-full bg-[#6366F1]/18 blur-[140px]"
            />
            <motion.div
                style={{ y: prefersReducedMotion ? 0 : blob2Y }}
                className="pointer-events-none absolute -right-48 bottom-1/4 h-[520px] w-[520px] rounded-full bg-[#F59E0B]/14 blur-[140px]"
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_50%,rgba(168,85,247,0.06),transparent_75%)]" />

            {/* Grid Pattern Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />

            {/* Floating Micro-Particles */}
            {!prefersReducedMotion &&
                PARTICLES.map((p, i) => (
                    <motion.div
                        key={i}
                        className="pointer-events-none absolute rounded-full bg-white/35"
                        style={{
                            left: p.left,
                            top: p.top,
                            width: p.size,
                            height: p.size,
                            boxShadow: "0 0 10px rgba(255,255,255,0.7)",
                        }}
                        animate={{
                            y: [0, -24, 0],
                            opacity: [0.15, 0.7, 0.15],
                            scale: [0.9, 1.3, 0.9],
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
                        className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-md shadow-lg"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366F1]" />
                        </span>
                        <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
                            {EYEBROW}
                        </span>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.7 }}
                        transition={{ duration: 0.6, ease: easeOut, delay: 0.08 }}
                        className="mb-4 font-mono text-xs sm:text-sm font-medium tracking-wider text-indigo-300/85 uppercase"
                    >
                        {SUBTITLE}
                    </motion.p>

                    {/* Main Headline */}
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.8, ease: easeOut, delay: 0.14 }}
                        className="text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-[4.2rem]"
                    >
                        <span>{HEADLINE_LINE_1}</span>
                        <br className="hidden sm:inline" />{" "}
                        <span
                            className="inline-block transition-transform duration-500 hover:scale-[1.01]"
                            style={{
                                WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.95)",
                                color: "transparent",
                            }}
                        >
                            Possibilities
                        </span>{" "}
                        <span>Are the Destination.</span>
                    </motion.h2>

                    {/* Exact User Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.7, ease: easeOut, delay: 0.22 }}
                        className="mx-auto mt-6 sm:mt-8 max-w-2xl text-balance text-sm sm:text-base leading-relaxed text-white/60 md:text-lg"
                    >
                        {DESCRIPTION}
                    </motion.p>

                    {/* Stage Flow Interactive Ribbon */}
                    <motion.div
                        initial={{ opacity: 0, y: 16, scale: 0.96 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.6, ease: easeOut, delay: 0.28 }}
                        className="mx-auto mt-8 inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 sm:p-2 backdrop-blur-xl shadow-2xl"
                    >
                        {STAGES.map((stage, idx) => (
                            <div key={stage.label} className="flex items-center gap-1.5 sm:gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => setActiveStage(idx)}
                                    className={`group relative flex items-center gap-2 rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-mono font-semibold tracking-widest uppercase transition-all duration-300 ${activeStage === idx
                                            ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105"
                                            : "text-white/60 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    <span
                                        className="h-1.5 w-1.5 rounded-full"
                                        style={{ backgroundColor: stage.accent }}
                                    />
                                    <span>{stage.label}</span>
                                </button>
                                {idx < STAGES.length - 1 && (
                                    <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white/20" />
                                )}
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* ── 4 LUXURY STAGE CARDS WITH SCROLL PARALLAX ─────────── */}
                <div ref={cardsContainerRef} className="relative mt-16 sm:mt-24">
                    {/* Animated Connecting Gradient Top Line */}
                    <div className="relative mb-8 h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                        <motion.div
                            className="h-full w-full origin-left bg-gradient-to-r from-[#6366F1] via-[#A855F7] via-[#EC4899] to-[#F59E0B]"
                            style={{ scaleX: prefersReducedMotion ? 1 : svgLineDraw }}
                        />
                    </div>

                    {/* Cards Grid: Zero Gap Disconnect, High Polish Aesthetic */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                        {STAGES.map((stage, index) => (
                            <StageCard
                                key={stage.label}
                                stage={stage}
                                index={index}
                                total={STAGES.length}
                                scrollYProgress={cardsProgress}
                                active={activeStage === index}
                                onHover={() => setActiveStage(index)}
                            />
                        ))}
                    </div>
                </div>


            </div>
        </section>
    );
}