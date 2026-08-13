import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
    ArrowUpRight,
    Code2,
    Layers,
    Bot,
    GraduationCap,
    Cpu,
} from "lucide-react";
import { Reveal, MagneticButton } from "@/components/Reveal";

/* ── EX-MEDIA Crimson & Purple Brand Theme Palette ──────────────── */
const PALETTE = {
    a: "#F43F5E", // EX-MEDIA Crimson Rose
    b: "#E11D48", // EX-MEDIA Ruby Crimson
    c: "#C084FC", // EX-MEDIA Bright Purple
    d: "#9333EA", // EX-MEDIA Electric Deep Purple
    bg: "#04070C",
} as const;

/* ── The four studios arranged as quadrants around the CPU core ─── */
const STUDIOS: {
    icon: typeof Code2;
    label: string;
    index: string;
    x: number;
    y: number;
}[] = [
        { icon: Code2, label: "Engineering", index: "01", x: 25, y: 25 },
        { icon: Layers, label: "3D Motion", index: "02", x: 75, y: 25 },
        { icon: Bot, label: "AI Automation", index: "03", x: 25, y: 75 },
        { icon: GraduationCap, label: "Bootcamps", index: "04", x: 75, y: 75 },
    ];

function StudioTile({
    icon: Icon,
    label,
    index,
    x,
    y,
    palette,
    delay,
}: {
    icon: typeof Code2;
    label: string;
    index: string;
    x: number;
    y: number;
    palette: typeof PALETTE;
    delay: number;
}) {
    const p = palette;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.06, y: -6 }}
            animate={{
                boxShadow: [
                    `0 0 16px -2px ${p.a}33, inset 0 0 10px ${p.a}15`,
                    `0 0 32px 4px ${p.c}55, inset 0 0 18px ${p.c}25`,
                    `0 0 16px -2px ${p.a}33, inset 0 0 10px ${p.a}15`,
                ],
                borderColor: [
                    "rgba(255,255,255,0.14)",
                    `${p.a}77`,
                    "rgba(255,255,255,0.14)",
                ],
            }}
            transition={{
                boxShadow: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay },
                borderColor: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay },
                default: { duration: 0.6, delay: delay * 0.25 },
            }}
            className="absolute flex w-[44%] sm:w-[38%] flex-col items-start gap-2 rounded-2xl border bg-white/[0.05] p-3.5 sm:p-4.5 backdrop-blur-md transition-all duration-300 -translate-x-1/2 -translate-y-1/2 group cursor-pointer overflow-hidden"
            style={{
                left: `${x}%`,
                top: `${y}%`,
            }}
        >
            {/* Ambient liquid glow backing inside card */}
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-10 rounded-full opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-75"
                style={{
                    background: `radial-gradient(circle, ${p.a}66, ${p.c}44 60%, transparent 80%)`,
                }}
                animate={{
                    scale: [0.85, 1.2, 0.85],
                    opacity: [0.25, 0.55, 0.25],
                }}
                transition={{
                    duration: 3.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay,
                }}
            />

            {/* Glowing border outline on hover */}
            <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    boxShadow: `0 0 28px 4px ${p.a}88, inset 0 0 20px ${p.c}44`,
                    border: `1px solid ${p.a}`,
                }}
            />

            <div className="relative z-10 flex w-full items-center justify-between">
                <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] sm:h-9.5 sm:w-9.5 transition-colors duration-300 group-hover:bg-[#F43F5E]/25"
                    style={{ color: p.a }}
                >
                    <Icon className="h-4 w-4 text-white sm:h-5 sm:w-5 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
                </div>

                <span className="font-mono text-[10px] tracking-widest text-white/40 group-hover:text-white/90">
                    {index}
                </span>
            </div>

            <span className="relative z-10 text-xs sm:text-sm font-semibold leading-tight text-white/90 group-hover:text-white">
                {label}
            </span>
        </motion.div>
    );
}

function StudioGrid({ palette }: { palette: typeof PALETTE }) {
    const p = palette;

    return (
        <div className="relative flex h-full w-full items-center justify-center">
            <div className="relative aspect-square w-full max-w-[580px]">
                {/* ── Animated SVG Connector Lines with flowing pulses & light orbs ── */}
                <svg
                    viewBox="0 0 100 100"
                    className="pointer-events-none absolute inset-0 h-full w-full"
                >
                    <defs>
                        <linearGradient id="exMediaLineGrad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor={p.a} />
                            <stop offset="50%" stopColor={p.c} />
                            <stop offset="100%" stopColor={p.d} />
                        </linearGradient>
                        <filter id="lineGlow">
                            <feGaussianBlur stdDeviation="1.5" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {STUDIOS.map((s, i) => (
                        <g key={s.label}>
                            {/* Base track line */}
                            <line
                                x1={s.x}
                                y1={s.y}
                                x2={50}
                                y2={50}
                                stroke="rgba(255,255,255,0.12)"
                                strokeWidth="0.8"
                            />
                            {/* Animated glowing dashed energy pulse */}
                            <motion.line
                                x1={s.x}
                                y1={s.y}
                                x2={50}
                                y2={50}
                                stroke="url(#exMediaLineGrad)"
                                strokeWidth="1.6"
                                strokeDasharray="4 4"
                                filter="url(#lineGlow)"
                                animate={{
                                    strokeDashoffset: [0, -32],
                                }}
                                transition={{
                                    duration: 1.8,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                            {/* Traveling energy light orb gliding along the connector line */}
                            <motion.circle
                                r="1.5"
                                fill={i % 2 === 0 ? p.a : p.c}
                                filter="url(#lineGlow)"
                                animate={{
                                    cx: [s.x, 50, s.x],
                                    cy: [s.y, 50, s.y],
                                    opacity: [0.3, 1, 0.3],
                                }}
                                transition={{
                                    duration: 3 + i * 0.4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.3,
                                }}
                            />
                        </g>
                    ))}
                </svg>

                {/* ── Ambient Floating Particles ────────────────────────────── */}
                {[...Array(6)].map((_, i) => (
                    <motion.span
                        key={i}
                        className="absolute h-1.5 w-1.5 rounded-full"
                        style={{
                            background: i % 2 === 0 ? p.a : p.c,
                            left: `${18 + i * 14}%`,
                            top: `${14 + ((i * 37) % 72)}%`,
                            boxShadow: `0 0 10px 2px ${i % 2 === 0 ? p.a : p.c}`,
                        }}
                        animate={{
                            y: [0, -12, 0],
                            opacity: [0.2, 0.9, 0.2],
                            scale: [0.8, 1.3, 0.8],
                        }}
                        transition={{
                            duration: 3.6 + i * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.3,
                        }}
                    />
                ))}

                {/* ── Central CPU Core Node ────────────────────────────────── */}
                <div
                    className="absolute flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl -translate-x-1/2 -translate-y-1/2"
                    style={{
                        left: "50%",
                        top: "50%",
                    }}
                >
                    <motion.div
                        className="absolute inset-0 rounded-2xl blur-xl"
                        style={{
                            background: `radial-gradient(circle, ${p.a}dd, ${p.d}77 60%, transparent 80%)`,
                        }}
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.75, 1, 0.75],
                        }}
                        transition={{
                            duration: 2.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    <div className="relative flex h-full w-full items-center justify-center rounded-2xl border border-white/20 bg-white/[0.08] backdrop-blur-md shadow-[0_0_25px_rgba(244,63,94,0.35)]">
                        <Cpu className="h-5 w-5 sm:h-6 sm:w-6 text-white" strokeWidth={1.5} />
                    </div>
                </div>

                {/* ── The Four Studio Quadrant Tiles ────────────────────────── */}
                {STUDIOS.map((s, i) => (
                    <StudioTile
                        key={s.label}
                        icon={s.icon}
                        label={s.label}
                        index={s.index}
                        x={s.x}
                        y={s.y}
                        palette={p}
                        delay={i * 0.3}
                    />
                ))}
            </div>
        </div>
    );
}

type CTA = {
    label: string;
    href: string;
    external?: boolean;
};

type Stat = {
    value: string;
    label: string;
};

export default function EngineeringStudiosSection({
    anchorId = "engineering-capabilities",
    eyebrow = "Studios",
    titleLine1 = "Engineering Digital",
    titleLine2 = "Platforms",
    tagline = "From concept to scale.",
    desc = "Four specialized studios under one synchronized roof. Full-stack engineering, 3D motion design, custom AI automation, and technical team bootcamps tailored for high-growth tech leaders.",
    primaryCta = {
        label: "Explore the System",
        href: "/companies#ex-media",
    },
    secondaryCta = {
        label: "Let's Confirm Identity",
        href: "https://exmedia.in/",
        external: true,
    },
}: {
    anchorId?: string;
    eyebrow?: string;
    titleLine1?: string;
    titleLine2?: string;
    tagline?: string;
    desc?: string;
    stats?: Stat[];
    primaryCta?: CTA;
    secondaryCta?: CTA;
}) {
    const p = PALETTE;

    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 300,
        damping: 40,
        mass: 0.4,
    });

    const y1 = useTransform(smoothProgress, [0, 1], [40, -40]);

    return (
        <div
            id={anchorId}
            ref={ref}
            data-palette=""
            data-palette-a={p.a}
            data-palette-b={p.b}
            data-palette-c={p.c}
            data-palette-bg={p.bg}
            className="relative flex items-center overflow-hidden scroll-mt-28 py-20 noise transition-colors duration-700 sm:py-16 md:py-24"
            style={{
                backgroundColor: p.bg,
            }}
        >
            {/* ── EX-MEDIA Crimson/Purple Aurora background ─────────────── */}
            <div
                className="aurora pointer-events-none absolute inset-0 opacity-80"
                style={{
                    background: `
            radial-gradient(
              45rem 32rem at 15% 25%,
              ${p.a}35,
              transparent 70%
            ),
            radial-gradient(
              40rem 30rem at 85% 75%,
              ${p.d}35,
              transparent 70%
            )
          `,
                }}
            />

            {/* ── Main content ────────────────────────────────────────── */}
            <div className="relative z-10 mx-auto grid w-[min(1200px,94vw)] grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-10">
                {/* ── Text side ─────────────────────────────────────────── */}
                <div className="md:col-span-6">
                    <Reveal>
                        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/50">
                            <span
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ background: p.a }}
                            />

                            <span>{eyebrow}</span>
                        </div>
                    </Reveal>

                    <Reveal delay={0.15}>
                        <h3 className="mt-3 text-3xl font-bold leading-[1.05] tracking-tight text-white sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl">
                            <span className="block sm:whitespace-nowrap">
                                {titleLine1}
                            </span>

                            <span className="block sm:whitespace-nowrap">
                                {titleLine2}
                            </span>
                        </h3>
                    </Reveal>

                    <Reveal
                        delay={0.4}
                        className="mt-6 text-xl italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#F43F5E] via-[#C084FC] to-[#9333EA] sm:text-2xl md:text-4xl drop-shadow-[0_0_20px_rgba(244,63,94,0.3)]"
                    >
                        {tagline}
                    </Reveal>

                    <Reveal
                        delay={0.5}
                        className="mt-5 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base"
                    >
                        {desc}
                    </Reveal>

                    {/* ── CTA buttons ─────────────────────────────────────── */}
                    <Reveal
                        delay={0.6}
                        className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
                    >
                        {/* Primary CTA */}
                        <a
                            href={primaryCta.href}
                            target={primaryCta.external ? "_blank" : undefined}
                            rel={primaryCta.external ? "noopener noreferrer" : undefined}
                            className="inline-block"
                        >
                            <MagneticButton variant="ghost">
                                {primaryCta.label}
                                <ArrowUpRight className="h-4 w-4" />
                            </MagneticButton>
                        </a>

                        {/* Secondary CTA */}
                        <a
                            href={secondaryCta.href}
                            target={secondaryCta.external ? "_blank" : undefined}
                            rel={secondaryCta.external ? "noopener noreferrer" : undefined}
                            className="glass inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white/90 transition-colors duration-300 hover:bg-white/10 sm:w-auto"
                        >
                            {secondaryCta.label}
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </Reveal>
                </div>

                {/* ── Studio grid visual side ─────────────────────────────── */}
                <div className="relative h-[360px] sm:h-[440px] md:h-[500px] md:col-span-6">
                    <motion.div
                        style={{
                            y: y1,
                        }}
                        className="absolute inset-0"
                    >
                        <StudioGrid palette={p} />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}