import React, { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useReducedMotion,
} from "framer-motion";

/**
 * EngagementFlow (Automated Messaging Section)
 * ─────────────────────────────────────────────────────────────
 * Nicely Placed Glass Cards & Connected Laser Pipeline UI.
 * Features 4 sleek glassmorphism cards connected by a top laser rail,
 * custom high-res animated SVGs, glowing theme background, mobile-app
 * level responsiveness, and 100% exact text retention.
 * ─────────────────────────────────────────────────────────────
 */

type Stage = {
    index: string;
    title: string;
    copy: string;
    accent: string;
    glow: string;
    badge: string;
    Icon: React.FC<{ accent: string; reduced: boolean }>;
};

/* ───────────────────── High-Tech Animated SVGs ───────────────────── */

const RespondIcon: React.FC<{ accent: string; reduced: boolean }> = ({ accent, reduced }) => (
    <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" fill="none">
            <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke={accent}
                strokeWidth="1.6"
                strokeDasharray="6 8"
                opacity="0.5"
                animate={reduced ? { rotate: 0 } : { rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "50px 50px" }}
            />
            {[0, 1, 2].map((i) => (
                <motion.circle
                    key={i}
                    cx="50"
                    cy="50"
                    r="14"
                    stroke={accent}
                    strokeWidth="1.8"
                    initial={{ opacity: 0.9, scale: 0.4 }}
                    animate={
                        reduced
                            ? { opacity: 0.3, scale: 1 }
                            : { opacity: [0.9, 0], scale: [0.4, 2.5] }
                    }
                    transition={
                        reduced
                            ? undefined
                            : {
                                duration: 2.6,
                                delay: i * 0.85,
                                repeat: Infinity,
                                ease: "easeOut",
                            }
                    }
                    style={{ transformOrigin: "50px 50px" }}
                />
            ))}
            <line x1="50" y1="8" x2="50" y2="18" stroke={accent} strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
            <line x1="50" y1="82" x2="50" y2="92" stroke={accent} strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
            <line x1="8" y1="50" x2="18" y2="50" stroke={accent} strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
            <line x1="82" y1="50" x2="92" y2="50" stroke={accent} strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
            <circle cx="50" cy="50" r="7" fill={accent} className="filter drop-shadow-[0_0_10px_rgba(45,212,238,1)]" />
            <circle cx="50" cy="50" r="3" fill="#ffffff" />
        </svg>
    </div>
);

const EngageIcon: React.FC<{ accent: string; reduced: boolean }> = ({ accent, reduced }) => (
    <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" fill="none">
            <path
                d="M18 30a10 10 0 0 1 10-10h30a10 10 0 0 1 10 10v16a10 10 0 0 1-10 10H36l-12 10v-10h-6a10 10 0 0 1-10-10V30Z"
                stroke={accent}
                strokeWidth="2.2"
                fill="url(#engage-grad-1)"
                opacity="0.9"
            />
            <path
                d="M44 50a10 10 0 0 1 10-10h18a10 10 0 0 1 10 10v14a10 10 0 0 1-10 10h-3l7 7-9-7h-13a10 10 0 0 1-10-10V50Z"
                stroke={accent}
                strokeWidth="1.6"
                fill="url(#engage-grad-2)"
                opacity="0.6"
            />
            <defs>
                <linearGradient id="engage-grad-1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={accent} stopOpacity="0.02" />
                </linearGradient>
                <linearGradient id="engage-grad-2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={accent} stopOpacity="0.12" />
                    <stop offset="100%" stopColor={accent} stopOpacity="0.0" />
                </linearGradient>
            </defs>
            {[0, 1, 2].map((i) => (
                <motion.circle
                    key={i}
                    cx="34"
                    cy={30 + i * 7}
                    r="2.8"
                    fill={accent}
                    animate={reduced ? { opacity: 0.8 } : { x: [0, 4, 0], opacity: [0.4, 1, 0.4] }}
                    transition={
                        reduced
                            ? undefined
                            : { duration: 1.2, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }
                    }
                    className="filter drop-shadow-[0_0_6px_rgba(95,184,246,0.9)]"
                />
            ))}
        </svg>
    </div>
);

const ConvertIcon: React.FC<{ accent: string; reduced: boolean }> = ({ accent, reduced }) => (
    <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" fill="none">
            <path
                d="M22 24h56l-20 28v24l-16 8V52L22 24Z"
                stroke={accent}
                strokeWidth="2.2"
                strokeLinejoin="round"
                fill="url(#convert-grad)"
                opacity="0.9"
            />
            <defs>
                <linearGradient id="convert-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
                    <stop offset="100%" stopColor={accent} stopOpacity="0.03" />
                </linearGradient>
            </defs>
            {[0, 1, 2].map((i) => (
                <motion.circle
                    key={i}
                    r="3.2"
                    fill={accent}
                    initial={{ cx: 32 + i * 18, cy: 24 }}
                    animate={
                        reduced
                            ? { cy: 62, opacity: 0.9 }
                            : { cy: [24, 52, 65], cx: [32 + i * 18, 50, 50], opacity: [1, 0.85, 0] }
                    }
                    transition={
                        reduced ? undefined : { duration: 2.2, delay: i * 0.75, repeat: Infinity, ease: "easeIn" }
                    }
                    className="filter drop-shadow-[0_0_8px_rgba(167,139,250,1)]"
                />
            ))}
            <motion.path
                d="M40 68l6 6 14-14"
                stroke={accent}
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                    reduced
                        ? { pathLength: 1, opacity: 1 }
                        : { pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }
                }
                transition={
                    reduced
                        ? undefined
                        : { duration: 2.2, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.75, 1] }
                }
                className="filter drop-shadow-[0_0_10px_rgba(167,139,250,1)]"
            />
        </svg>
    </div>
);

const RetainIcon: React.FC<{ accent: string; reduced: boolean }> = ({ accent, reduced }) => (
    <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" fill="none">
            <path
                id="retain-infinity-path"
                d="M 32 50 C 32 38, 44 38, 50 50 C 56 62, 68 62, 68 50 C 68 38, 56 38, 50 50 C 44 62, 32 62, 32 50 Z"
                stroke={accent}
                strokeWidth="2.4"
                strokeLinecap="round"
                opacity="0.8"
            />
            <circle cx="50" cy="50" r="38" stroke={accent} strokeWidth="1" strokeDasharray="5 10" opacity="0.35" />
            <motion.circle
                r="4"
                fill={accent}
                animate={reduced ? { opacity: 0.9 } : { offsetDistance: ["0%", "100%"] }}
                transition={reduced ? undefined : { duration: 3.2, repeat: Infinity, ease: "linear" }}
                style={
                    reduced
                        ? { opacity: 0.9 }
                        : ({
                            offsetPath: "path('M 32 50 C 32 38, 44 38, 50 50 C 56 62, 68 62, 68 50 C 56 38, 50 50 C 44 62, 32 62, 32 50 Z')",
                        } as React.CSSProperties)
                }
                className="filter drop-shadow-[0_0_10px_rgba(244,114,182,1)]"
            />
            <motion.circle
                r="2.5"
                fill="#ffffff"
                animate={reduced ? { opacity: 0.85 } : { offsetDistance: ["50%", "150%"] }}
                transition={reduced ? undefined : { duration: 3.2, repeat: Infinity, ease: "linear" }}
                style={
                    reduced
                        ? { opacity: 0.85 }
                        : ({
                            offsetPath: "path('M 32 50 C 32 38, 44 38, 50 50 C 56 62, 68 62, 68 50 C 56 38, 50 50 C 44 62, 32 62, 32 50 Z')",
                        } as React.CSSProperties)
                }
            />
        </svg>
    </div>
);

/* ───────────────────── Data Model ───────────────────── */

const STAGES: Stage[] = [
    {
        index: "01",
        title: "RESPOND",
        copy: "Deliver instant responses to customer queries, ensuring no opportunity is missed.",
        accent: "#2dd4ee",
        glow: "rgba(45,212,238,0.35)",
        badge: "INSTANT RESPONSE",
        Icon: RespondIcon,
    },
    {
        index: "02",
        title: "ENGAGE",
        copy: "Maintain meaningful and personalized conversations that keep customers connected with your brand.",
        accent: "#5fb8f6",
        glow: "rgba(95,184,246,0.35)",
        badge: "PERSONALIZED DIALOGUE",
        Icon: EngageIcon,
    },
    {
        index: "03",
        title: "CONVERT",
        copy: "Turn conversations into qualified leads, sales opportunities, and stronger customer relationships.",
        accent: "#a78bfa",
        glow: "rgba(167,139,250,0.35)",
        badge: "LEAD CONVERSION",
        Icon: ConvertIcon,
    },
    {
        index: "04",
        title: "RETAIN",
        copy: "Provide consistent follow-ups and support that build trust, loyalty, and long-term business growth",
        accent: "#f472b6",
        glow: "rgba(244,114,182,0.35)",
        badge: "CONTINUOUS RETENTION",
        Icon: RetainIcon,
    },
];

export default function EngagementFlow() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const reduced = !!useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 0.85", "end 0.15"],
    });

    const lineDraw = useTransform(scrollYProgress, [0, 0.85], [0, 1]);
    const bgOrbA = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const bgOrbB = useTransform(scrollYProgress, [0, 1], [0, 90]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden bg-[#050505] py-20 sm:py-28 md:py-36 selection:bg-cyan-500/30 selection:text-cyan-200 noise text-white"
        >
            {/* ───────────── Ambient Background & Parallax ───────────── */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                <motion.div
                    style={{ y: bgOrbA }}
                    className="absolute -left-40 top-1/4 h-[32rem] w-[32rem] rounded-full bg-cyan-500/12 blur-[140px]"
                />
                <motion.div
                    style={{ y: bgOrbB }}
                    className="absolute -right-40 bottom-1/4 h-[35rem] w-[35rem] rounded-full bg-fuchsia-500/12 blur-[150px]"
                />
                <div className="absolute inset-0 grid-bg opacity-15" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_0%,#050505_90%)]" />
            </div>

            {/* ───────────── Header Block (Clean & Nicely Placed) ───────────── */}
            <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6 }}
                    className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 backdrop-blur-xl shadow-[0_0_20px_rgba(45,212,238,0.2)]"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300 font-mono">
                        Automated Messaging
                    </span>
                </motion.div>

                {/* Headline (Proportioned & Crisp) */}
                <motion.h2
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.75, delay: 0.08 }}
                    className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-white text-balance"
                >
                    Every Query Deserves a Response.
                    <br />
                    <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300 bg-clip-text text-transparent">
                        Every Customer Deserves Attention.
                    </span>
                </motion.h2>

                {/* Subtext Paragraph */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.75, delay: 0.16 }}
                    className="mx-auto mt-5 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-white/70 font-normal"
                >
                    Every customer interaction is an opportunity to build trust. Automated messaging ensures timely responses, consistent communication, personalized engagement, and continuous support, helping businesses strengthen relationships, capture opportunities, and accelerate growth.
                </motion.p>
            </div>

            {/* ───────────── 4 Nicely Placed Glass Cards ───────────── */}
            <div className="relative z-10 mx-auto mt-16 max-w-7xl px-5 sm:px-8 md:mt-24">

                {/* Connected Top Pipeline Line (Desktop) */}
                <div className="pointer-events-none absolute left-12 right-12 top-0 hidden lg:block h-1">
                    <div className="h-full w-full bg-white/10 rounded-full" />
                    <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[#2dd4ee] via-[#a78bfa] to-[#f472b6] shadow-[0_0_12px_#38bdf8]"
                        style={{ scaleX: reduced ? 1 : lineDraw, transformOrigin: "left" }}
                    />
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 pt-4">
                    {STAGES.map((stage, i) => (
                        <motion.div
                            key={stage.title}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.75, delay: i * 0.12 }}
                            whileHover={{ y: -6, transition: { duration: 0.3 } }}
                            className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                        >
                            {/* Card Ambient Background Overlay */}
                            <div
                                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                style={{
                                    background: `radial-gradient(circle at 50% 0%, ${stage.glow}, transparent 75%)`,
                                }}
                            />

                            {/* Card Top Info Bar */}
                            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
                                <span className="text-xs font-mono font-bold tracking-wider" style={{ color: stage.accent }}>
                                    STAGE {stage.index}
                                </span>
                                <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] font-mono tracking-widest text-white/50 border border-white/5 uppercase">
                                    {stage.badge}
                                </span>
                            </div>

                            {/* Animated SVG Centerpiece */}
                            <div className="relative z-10 my-6 flex items-center justify-center py-2">
                                <div
                                    className="relative flex items-center justify-center rounded-2xl p-4 transition-transform duration-500 group-hover:scale-105"
                                    style={{
                                        border: `1.5px solid ${stage.accent}40`,
                                        background: "rgba(10, 10, 15, 0.6)",
                                        boxShadow: `0 0 25px -5px ${stage.glow}, inset 0 0 15px ${stage.accent}15`,
                                    }}
                                >
                                    <stage.Icon accent={stage.accent} reduced={reduced} />
                                </div>
                            </div>

                            {/* Content Block (100% Exact Copy Preserved) */}
                            <div className="relative z-10">
                                <h3
                                    className="text-xl sm:text-2xl font-extrabold tracking-tight text-white"
                                    style={{ textShadow: `0 0 20px ${stage.glow}` }}
                                >
                                    <span style={{ color: stage.accent }}>{stage.title}</span>
                                </h3>

                                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-white/70 font-normal">
                                    {stage.copy}
                                </p>

                                {/* Hover Accent Line */}
                                <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-white/10">
                                    <div
                                        className="h-full w-0 transition-all duration-500 ease-out group-hover:w-full"
                                        style={{ backgroundColor: stage.accent }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}