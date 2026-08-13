import React, { useEffect, useRef } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useScroll,
    useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * TechnologyQuoteCtaSection (TechQcta.tsx)
 * ──────────────────────────────────────────────────────────────────
 * High-impact section featuring:
 * 1. Left side: The updated technology quote, description, and action buttons.
 *    - Headline: "Technology Is the Engine. Innovation Is the Fuel. Growth Is the Destination"
 *    - Subtext: "Technology powers business operations, innovation drives new possibilities, and strategic execution turns potential into progress..."
 *    - Buttons: "Find Out Your Need" (scrolls to #ex-technology session) and "Let's Reconstruct Your Path" (links to https://extechnology.in)
 * 2. Right side: Ultra-aligned 2x2 Glassmorphism Studio & Platform Hub.
 *    - Mathematically calculated SVG beams connecting the center CPU chip to the 4 card nodes with pixel-perfect alignment.
 *    - Mobile application-level responsive scaling.
 * ──────────────────────────────────────────────────────────────────
 */

interface PillarCardData {
    id: string;
    label: string;
    sub: string;
    x: number; // percentage in 0-100 viewBox
    y: number; // percentage in 0-100 viewBox
    Icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
}

const PILLARS: PillarCardData[] = [
    { id: "01", label: "Digitize", sub: "Systems & Process", x: 20, y: 20, Icon: IconChip },
    { id: "02", label: "Connect", sub: "Markets & Teams", x: 80, y: 20, Icon: IconNetwork },
    { id: "03", label: "Optimize", sub: "Data & Automation", x: 20, y: 80, Icon: IconGauge },
    { id: "04", label: "Achieve", sub: "Sustainable Growth", x: 80, y: 80, Icon: IconTarget },
];

// SVG Beam geometry helper
const CHIP_RADIUS = 8.5; // Radius of center CPU chip in SVG viewBox units
const CARD_MARGIN = 9.5; // Offset distance from card center in SVG viewBox units

function calculateBeam(cx: number, cy: number) {
    const dx = cx - 50;
    const dy = cy - 50;
    const dist = Math.hypot(dx, dy);
    const ux = dx / dist;
    const uy = dy / dist;

    return {
        x1: 50 + ux * CHIP_RADIUS,
        y1: 50 + uy * CHIP_RADIUS,
        x2: cx - ux * CARD_MARGIN,
        y2: cy - uy * CARD_MARGIN,
    };
}

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

export default function TechnologyQuoteCtaSection(): React.JSX.Element {
    const sectionRef = useRef<HTMLElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const glowY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

    // 3D Parallax Tilt on Mouse Hover
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const smx = useSpring(mx, { stiffness: 60, damping: 22 });
    const smy = useSpring(my, { stiffness: 60, damping: 22 });
    const tiltX = useTransform(smy, [-30, 30], [6, -6]);
    const tiltY = useTransform(smx, [-30, 30], [-6, 6]);

    useEffect(() => {
        const handlePointerMove = (e: PointerEvent) => {
            const { innerWidth, innerHeight } = window;
            mx.set((e.clientX / innerWidth - 0.5) * 60);
            my.set((e.clientY / innerHeight - 0.5) * 60);
        };
        window.addEventListener("pointermove", handlePointerMove);
        return () => window.removeEventListener("pointermove", handlePointerMove);
    }, [mx, my]);

    return (
        <section
            ref={sectionRef}
            id="technology-quote-cta"
            className="relative w-full overflow-hidden bg-[#03050b] px-4 py-16 sm:px-6 sm:py-20 lg:py-20"
            data-palette=""
            data-palette-a="#35e0ff"
            data-palette-b="#6d5efc"
            data-palette-c="#a855f7"
            data-palette-bg="#03050b"
            data-palette-progress="linear-gradient(90deg, #35e0ff 0%, #6d5efc 55%, #a855f7 100%)"
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap');
        .tech-display { font-family: 'Space Grotesk', sans-serif; }
        .tech-mono { font-family: 'JetBrains Mono', monospace; }
        .tech-body { font-family: 'Inter', sans-serif; }

        @keyframes tech-ring { 0% { transform: scale(0.85); opacity: 0.5; } 100% { transform: scale(1.75); opacity: 0; } }
        @keyframes tech-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes tech-spin-rev { 0% { transform: rotate(0deg); } 100% { transform: rotate(-360deg); } }
        @keyframes tech-breathe { 0%, 100% { opacity: 0.45; transform: scale(1); } 50% { opacity: 0.9; transform: scale(1.08); } }
        @keyframes tech-pulse-glow { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.7; } }
        
        .tech-grid-bg {
          background-image:
            linear-gradient(to right, rgba(120,160,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(120,160,255,0.05) 1px, transparent 1px);
          background-size: 36px 36px;
        }
        @media (min-width: 640px) {
          .tech-grid-bg { background-size: 48px 48px; }
        }
      `}</style>

            {/* Ambient Background Lights & Grid */}
            <div className="pointer-events-none absolute inset-0">
                <div className="tech-grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,black,transparent)]" />
                <motion.div
                    style={{ y: glowY }}
                    className="absolute right-0 top-1/3 h-[24rem] w-[24rem] -translate-y-1/2 rounded-full bg-[#35e0ff]/12 blur-[120px] sm:h-[32rem] sm:w-[32rem] sm:blur-[160px] lg:h-[38rem] lg:w-[38rem]"
                />
                <div className="absolute left-4 bottom-0 h-64 w-64 rounded-full bg-[#8b7dfc]/12 blur-[110px] sm:left-10 sm:h-80 sm:w-80 sm:blur-[140px]" />
            </div>

            <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 sm:gap-14 lg:grid-cols-2 lg:gap-12">
                {/* ── LEFT COLUMN: HEADLINE, COPY & CTAS ── */}
                <div className="text-center lg:text-left">
                    {/* Eyebrow Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 rounded-full border border-[#35e0ff]/30 bg-[#35e0ff]/10 px-3.5 py-1.5 shadow-[0_0_15px_rgba(53,224,255,0.2)]"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#35e0ff] shadow-[0_0_8px_rgba(53,224,255,0.8)] animate-pulse" />
                        <span className="tech-mono text-[10px] font-semibold uppercase tracking-[0.35em] text-[#35e0ff] sm:text-[11px]">
                            Technology & Innovation
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.75, delay: 0.08 }}
                        className="tech-display mt-5 text-[2.1rem] font-bold leading-[1.12] tracking-tight text-white sm:mt-6 sm:text-4xl lg:text-5xl xl:text-[3.25rem]"
                    >
                        Technology Is the Engine.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.75, delay: 0.16 }}
                        className="tech-display mt-1.5 text-[1.75rem] font-semibold italic leading-tight tracking-tight sm:mt-2 sm:text-3xl lg:text-4xl xl:text-[2.6rem]"
                    >
                        <span className="bg-gradient-to-r from-[#35e0ff] via-[#8b7dfc] to-[#a855f7] bg-clip-text text-transparent">
                            Innovation Is the Fuel.
                        </span>
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.75, delay: 0.24 }}
                        className="tech-display mt-1.5 text-[1.4rem] font-semibold tracking-tight text-white/90 sm:mt-2 sm:text-2xl lg:text-3xl xl:text-[2.1rem]"
                    >
                        Growth Is the Destination.
                    </motion.p>

                    {/* Description Paragraph (Shortened & Punchy) */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="tech-body mx-auto mt-4 max-w-lg text-[14px] leading-6 text-slate-300/85 sm:mt-5 sm:text-base sm:leading-7 lg:mx-0 lg:text-[16px]"
                    >
                        Technology powers operations, innovation drives new possibilities, and strategic execution turns vision into sustainable business growth.
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.7, delay: 0.38 }}
                        className="mt-8 flex flex-col items-stretch gap-3.5 sm:mt-9 sm:flex-row sm:items-center sm:justify-center sm:gap-4 lg:justify-start"
                    >
                        <a
                            href="#ex-technology"
                            className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-7 py-3.5 text-sm font-medium tech-body text-white shadow-[0_0_20px_rgba(53,224,255,0.15)] backdrop-blur-md transition-all duration-300 hover:border-[#35e0ff]/60 hover:bg-white/[0.09] hover:shadow-[0_0_28px_rgba(53,224,255,0.35)] active:scale-[0.98]"
                        >
                            <span>Find Out Your Need</span>
                            <ArrowUpRight className="h-4 w-4 text-[#35e0ff] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                        <a
                            href="https://extechnology.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center justify-center gap-2 rounded-full border border-transparent px-6 py-3.5 text-sm font-semibold tech-body text-white/90 transition-all duration-300 hover:text-[#8be9ff] hover:bg-white/[0.03] active:scale-[0.98]"
                        >
                            <span>Let's Reconstruct Your Path</span>
                            <ArrowUpRight className="h-4 w-4 text-white/70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#8be9ff]" />
                        </a>
                    </motion.div>
                </div>

                {/* ── RIGHT COLUMN: ULTRA-ALIGNED STUDIO & PLATFORM HUB ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    style={{ rotateX: tiltX, rotateY: tiltY, perspective: 1000 }}
                    className="relative mx-auto aspect-square w-full max-w-[310px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[490px]"
                >
                    <AlignedHubVisual />
                </motion.div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* AlignedHubVisual Component                                         */
/* ------------------------------------------------------------------ */

function AlignedHubVisual(): React.JSX.Element {
    const beams = PILLARS.map((pillar) => ({
        ...pillar,
        ...calculateBeam(pillar.x, pillar.y),
    }));

    return (
        <div className="relative h-full w-full">
            {/* Ambient Intense Neon Glow Halo */}
            <div
                className="pointer-events-none absolute inset-[2%] rounded-full bg-gradient-to-br from-[#35e0ff]/25 via-[#8b7dfc]/25 to-[#a855f7]/25 blur-3xl"
                style={{ animation: "tech-pulse-glow 3.5s ease-in-out infinite" }}
            />

            {/* SVG Connector Beams Overlay */}
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
                className="absolute inset-0 h-full w-full overflow-visible pointer-events-none z-10"
            >
                <defs>
                    <linearGradient id="tech-beam-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#35e0ff" stopOpacity="1" />
                        <stop offset="50%" stopColor="#8b7dfc" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0.85" />
                    </linearGradient>

                    <filter id="tech-[#35e0ff]-laser-glow" x="-300%" y="-300%" width="700%" height="700%">
                        <feGaussianBlur stdDeviation="2.2" result="blur1" />
                        <feGaussianBlur stdDeviation="4.5" result="blur2" />
                        <feMerge>
                            <feMergeNode in="blur2" />
                            <feMergeNode in="blur1" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    <radialGradient id="tech-packet-grad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                        <stop offset="40%" stopColor="#35e0ff" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Counter-rotating Glowing Orbit Rings */}
                <g style={{ transformOrigin: "50px 50px", animation: "tech-spin 22s linear infinite" }}>
                    <circle cx="50" cy="50" r="26" stroke="rgba(53,224,255,0.3)" strokeWidth="0.45" strokeDasharray="1.5 3.5" fill="none" filter="url(#tech-[#35e0ff]-laser-glow)" />
                </g>
                <g style={{ transformOrigin: "50px 50px", animation: "tech-spin-rev 28s linear infinite" }}>
                    <circle cx="50" cy="50" r="34" stroke="rgba(168,85,247,0.25)" strokeWidth="0.45" strokeDasharray="0.8 4" fill="none" filter="url(#tech-[#35e0ff]-laser-glow)" />
                </g>

                {/* Intense Ambient Glow Underlay Lines */}
                <g opacity="0.85" filter="url(#tech-[#35e0ff]-laser-glow)">
                    {beams.map((b) => (
                        <line
                            key={`glow-beam-${b.id}`}
                            x1={b.x1}
                            y1={b.y1}
                            x2={b.x2}
                            y2={b.y2}
                            stroke="url(#tech-beam-grad)"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                        />
                    ))}
                </g>

                {/* Main Precision Laser Beams & Animated Light Packets */}
                {beams.map((b, i) => {
                    const midX = lerp(b.x1, b.x2, 0.5);
                    const midY = lerp(b.y1, b.y2, 0.5);

                    return (
                        <g key={`beam-${b.id}`}>
                            {/* Core Laser Line with Pulsing Glow */}
                            <motion.line
                                x1={b.x1}
                                y1={b.y1}
                                x2={b.x2}
                                y2={b.y2}
                                stroke="url(#tech-beam-grad)"
                                strokeWidth="0.85"
                                strokeLinecap="round"
                                filter="url(#tech-[#35e0ff]-laser-glow)"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.9, delay: 0.2 + i * 0.08 }}
                            />

                            {/* Midpoint Glowing Diamond Gem Stud */}
                            <motion.rect
                                x={midX - 1.4}
                                y={midY - 1.4}
                                width="2.8"
                                height="2.8"
                                fill="#ffffff"
                                filter="url(#tech-[#35e0ff]-laser-glow)"
                                transform={`rotate(45 ${midX} ${midY})`}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: [0, 1, 0.9], scale: [0, 1.5, 1] }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 1.1, delay: 0.45 + i * 0.08 }}
                                style={{ transformOrigin: `${midX}px ${midY}px` }}
                            />

                            {/* Connection Dot on Card Edge with Neon Glow */}
                            <motion.circle
                                cx={b.x2}
                                cy={b.y2}
                                r="1.3"
                                fill="#35e0ff"
                                filter="url(#tech-[#35e0ff]-laser-glow)"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: [0, 1, 0.95] }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.9, delay: 0.6 + i * 0.08 }}
                            />

                            {/* Outer Light Packet Traveling Outward */}
                            <circle r="1.5" fill="url(#tech-packet-grad)" filter="url(#tech-[#35e0ff]-laser-glow)">
                                <animateMotion
                                    dur={`${1.8 + (i % 2) * 0.3}s`}
                                    repeatCount="indefinite"
                                    path={`M${b.x1},${b.y1} L${b.x2},${b.y2}`}
                                    begin={`${i * 0.25}s`}
                                />
                                <animate
                                    attributeName="opacity"
                                    values="0;1;0"
                                    dur={`${1.8 + (i % 2) * 0.3}s`}
                                    repeatCount="indefinite"
                                    begin={`${i * 0.25}s`}
                                />
                            </circle>

                            {/* Second Light Packet Traveling Inward */}
                            <circle r="1.3" fill="url(#tech-packet-grad)" filter="url(#tech-[#35e0ff]-laser-glow)">
                                <animateMotion
                                    dur={`${2.2 + (i % 2) * 0.4}s`}
                                    repeatCount="indefinite"
                                    path={`M${b.x2},${b.y2} L${b.x1},${b.y1}`}
                                    begin={`${0.6 + i * 0.25}s`}
                                />
                                <animate
                                    attributeName="opacity"
                                    values="0;0.9;0"
                                    dur={`${2.2 + (i % 2) * 0.4}s`}
                                    repeatCount="indefinite"
                                    begin={`${0.6 + i * 0.25}s`}
                                />
                            </circle>
                        </g>
                    );
                })}
            </svg>

            {/* Central CPU Chip Node */}
            <div className="absolute left-1/2 top-1/2 z-20 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:h-16 sm:w-16 lg:h-20 lg:w-20">
                <span
                    className="absolute inset-[-14px] rounded-full bg-[#35e0ff]/20 blur-xl"
                    style={{ animation: "tech-breathe 3.4s ease-in-out infinite" }}
                />
                <span
                    className="absolute inset-[-3px] rounded-full border border-[#35e0ff]/40"
                    style={{ animation: "tech-ring 2.8s ease-out infinite" }}
                />
                <span
                    className="absolute inset-[-3px] rounded-full border border-[#8b7dfc]/35"
                    style={{ animation: "tech-ring 2.8s ease-out infinite 1.4s" }}
                />
                <div
                    className="relative flex h-full w-full items-center justify-center rounded-2xl border border-white/15 bg-[#080d1a]/80 text-[#35e0ff] shadow-[0_0_35px_-4px_rgba(53,224,255,0.65)] backdrop-blur-md"
                    style={{ clipPath: "polygon(22% 0%, 78% 0%, 100% 22%, 100% 78%, 78% 100%, 22% 100%, 0% 78%, 0% 22%)" }}
                >
                    <IconCpu className="h-6 w-6 sm:h-8 sm:w-8 lg:h-9 lg:w-9" />
                </div>
            </div>

            {/* 4 Corner Studio Glass Cards (Aligned to matching x%, y% percentages) */}
            {PILLARS.map((pillar, i) => (
                <div
                    key={pillar.id}
                    className="absolute z-20"
                    style={{
                        left: `${pillar.x}%`,
                        top: `${pillar.y}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.65, delay: 0.4 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        className="group relative flex w-[110px] sm:w-[140px] md:w-[155px] flex-col justify-between rounded-2xl border border-white/10 bg-[#090e1a]/70 p-3 sm:p-4 backdrop-blur-md shadow-[0_0_25px_-6px_rgba(53,224,255,0.25)] transition-all duration-300 hover:scale-105 hover:border-[#35e0ff]/50 hover:shadow-[0_0_35px_-4px_rgba(53,224,255,0.6)]"
                    >
                        {/* Top row: Icon + Index */}
                        <div className="flex items-center justify-between">
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#35e0ff] transition-transform duration-300 group-hover:scale-110 sm:h-9 sm:w-9">
                                <pillar.Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                            </div>
                            <span className="tech-mono text-[10px] font-semibold text-slate-400/70 sm:text-[11px]">
                                {pillar.id}
                            </span>
                        </div>

                        {/* Bottom row: Title + Subtitle */}
                        <div className="mt-3 text-left sm:mt-4">
                            <h4 className="tech-display text-xs font-bold tracking-tight text-white sm:text-sm md:text-base">
                                {pillar.label}
                            </h4>
                            <p className="tech-body mt-0.5 text-[9px] text-slate-400 sm:text-[10px]">
                                {pillar.sub}
                            </p>
                        </div>
                    </motion.div>
                </div>
            ))}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Custom Vector Icons                                                 */
/* ------------------------------------------------------------------ */

function IconCpu(props: React.SVGProps<SVGSVGElement>): React.JSX.Element {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
            <rect x="6" y="6" width="12" height="12" rx="2" />
            <rect x="9.5" y="9.5" width="5" height="5" rx="0.5" />
            <path d="M9 3v2.2M15 3v2.2M9 18.8V21M15 18.8V21M3 9h2.2M3 15h2.2M18.8 9H21M18.8 15H21" strokeLinecap="round" />
        </svg>
    );
}

function IconChip(props: React.SVGProps<SVGSVGElement>): React.JSX.Element {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
            <rect x="7" y="7" width="10" height="10" rx="1.5" />
            <path d="M9.5 7V4M14.5 7V4M9.5 20v-3M14.5 20v-3M7 9.5H4M7 14.5H4M20 9.5h-3M20 14.5h-3" strokeLinecap="round" />
            <circle cx="10.5" cy="10.5" r="0.5" fill="currentColor" />
            <circle cx="13.5" cy="13.5" r="0.5" fill="currentColor" />
        </svg>
    );
}

function IconNetwork(props: React.SVGProps<SVGSVGElement>): React.JSX.Element {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
            <circle cx="12" cy="5" r="2" />
            <circle cx="5" cy="18" r="2" />
            <circle cx="19" cy="18" r="2" />
            <path d="M12 7v4M12 11 6.4 16.4M12 11l5.6 5.4" strokeLinecap="round" />
        </svg>
    );
}

function IconGauge(props: React.SVGProps<SVGSVGElement>): React.JSX.Element {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
            <path d="M4 15a8 8 0 1 1 16 0" strokeLinecap="round" />
            <path d="M12 15 16 9" strokeLinecap="round" />
            <circle cx="12" cy="15" r="1" fill="currentColor" stroke="none" />
        </svg>
    );
}

function IconTarget(props: React.SVGProps<SVGSVGElement>): React.JSX.Element {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
            <circle cx="12" cy="12" r="8" />
            <circle cx="12" cy="12" r="4.2" />
            <path d="m15.5 8.5 2.7-2.7M18.2 5.8V3.3M18.2 5.8h2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}