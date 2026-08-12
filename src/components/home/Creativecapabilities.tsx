import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import {
    ArrowUpRight,
    Code2,
    Layers,
    Bot,
    GraduationCap,
    Cpu,
} from "lucide-react";
import { Reveal, MagneticButton } from "@/components/Reveal";

/* ── Engineering-studio palette — cyan/blue "circuit" variant ───── */
const PALETTE = {
    a: "#22D3EE",
    b: "#2563EB",
    c: "#CFFAFE",
    bg: "#04070C",
} as const;

/* ── The four studios, arranged as quadrants around a shared core ─
   Positions are percentages of the visual's square container, so the
   connector lines in the SVG line up with the tile centers. ────── */
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
            className="absolute flex w-[38%] flex-col items-start gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 backdrop-blur-sm sm:w-[36%] sm:p-4"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
            }}
            animate={{
                boxShadow: [
                    "0 0 0px 0px transparent",
                    `0 0 22px 1px ${p.a}55`,
                    "0 0 0px 0px transparent",
                ],
            }}
            transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
            }}
        >
            <div className="flex w-full items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] sm:h-9 sm:w-9">
                    <Icon
                        className="h-4 w-4 text-white sm:h-4.5 sm:w-4.5"
                        strokeWidth={1.75}
                    />
                </div>

                <span className="font-mono text-[10px] tracking-widest text-white/30">
                    {index}
                </span>
            </div>

            <span className="text-xs font-medium leading-tight text-white/85 sm:text-sm">
                {label}
            </span>
        </motion.div>
    );
}

function StudioGrid({ palette }: { palette: typeof PALETTE }) {
    const p = palette;

    return (
        <div className="relative flex h-full w-full items-center justify-center">
            <div className="relative aspect-square w-full max-w-[620px]">
                {/* ── Connector lines — sync pulses running to the core ── */}
                <svg
                    viewBox="0 0 100 100"
                    className="pointer-events-none absolute inset-0 h-full w-full"
                >
                    <defs>
                        <linearGradient
                            id="syncStroke"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="1"
                        >
                            <stop offset="0%" stopColor={p.a} />
                            <stop offset="100%" stopColor={p.b} />
                        </linearGradient>
                    </defs>

                    {STUDIOS.map((s, i) => (
                        <motion.line
                            key={s.label}
                            x1={s.x}
                            y1={s.y}
                            x2={50}
                            y2={50}
                            stroke="url(#syncStroke)"
                            strokeWidth="0.6"
                            strokeDasharray="2.5 3"
                            opacity={0.55}
                            animate={{
                                strokeDashoffset: [0, -22],
                            }}
                            transition={{
                                duration: 2.4,
                                repeat: Infinity,
                                ease: "linear",
                                delay: i * 0.15,
                            }}
                        />
                    ))}
                </svg>

                {/* ── Ambient particles ────────────────────────────────── */}
                {[...Array(5)].map((_, i) => (
                    <motion.span
                        key={i}
                        className="absolute h-1 w-1 rounded-full"
                        style={{
                            background: i % 2 === 0 ? p.a : p.c,
                            left: `${18 + i * 16}%`,
                            top: `${12 + ((i * 41) % 76)}%`,
                            boxShadow: `0 0 8px 2px ${i % 2 === 0 ? p.a : p.c}`,
                        }}
                        animate={{
                            y: [0, -10, 0],
                            opacity: [0.15, 0.8, 0.15],
                        }}
                        transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.4,
                        }}
                    />
                ))}

                {/* ── Central core — the "synchronized roof" ─────────── */}
                <div
                    className="absolute flex h-14 w-14 items-center justify-center rounded-2xl sm:h-16 sm:w-16"
                    style={{
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <motion.div
                        className="absolute inset-0 rounded-2xl blur-xl"
                        style={{
                            background: `radial-gradient(circle, ${p.a}bb, ${p.b}55 60%, transparent 75%)`,
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                            duration: 2.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    <div className="relative flex h-full w-full items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-md">
                        <Cpu
                            className="h-5 w-5 text-white sm:h-6 sm:w-6"
                            strokeWidth={1.5}
                        />
                    </div>
                </div>

                {/* ── The four studio tiles ────────────────────────────── */}
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
    // TODO: swap these for your real numbers before shipping
    stats = [
        { value: "4", label: "Studios" },
        { value: "99.9%", label: "Uptime SLA" },
        { value: "120+", label: "Sprints Shipped" },
    ],
    primaryCta = {
        label: "Explore the System",
        href: "#exmedia-session",
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

    const y1 = useTransform(
        smoothProgress,
        [0, 1],
        [80, -80]
    );

    return (
        <div
            id={anchorId}
            ref={ref}
            data-palette=""
            data-palette-a={p.a}
            data-palette-b={p.b}
            data-palette-c={p.c}
            data-palette-bg={p.bg}
            className="relative flex items-center overflow-hidden scroll-mt-28 py-20 noise transition-colors duration-700 sm:py-14 md:py-16"
            style={{
                backgroundColor: p.bg,
                contentVisibility: "auto",
                containIntrinsicSize: "1200px",
            }}
        >
            {/* ── Aurora background ──────────────────────────────────── */}
            <div
                className="aurora pointer-events-none absolute inset-0 opacity-75"
                style={{
                    background: `
            radial-gradient(
              45rem 32rem at 15% 25%,
              ${p.a}30,
              transparent 70%
            ),
            radial-gradient(
              40rem 30rem at 85% 75%,
              ${p.b}30,
              transparent 70%
            )
          `,
                }}
            />


            {/* ── Main content ────────────────────────────────────────── */}
            <div className="relative z-10 mx-auto grid w-[min(1200px,94vw)] grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-10">
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
                        className="mt-6 text-xl italic gradient-text sm:text-2xl md:text-4xl"
                    >
                        {tagline}
                    </Reveal>

                    <Reveal
                        delay={0.5}
                        className="mt-5 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base"
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
                            target={
                                primaryCta.external ? "_blank" : undefined
                            }
                            rel={
                                primaryCta.external
                                    ? "noopener noreferrer"
                                    : undefined
                            }
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
                            target={
                                secondaryCta.external ? "_blank" : undefined
                            }
                            rel={
                                secondaryCta.external
                                    ? "noopener noreferrer"
                                    : undefined
                            }
                            className="glass inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white/90 transition-colors duration-300 hover:bg-white/10 sm:w-auto"
                        >
                            {secondaryCta.label}

                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </Reveal>
                </div>

                {/* ── Studio grid visual side ─────────────────────────────── */}
                <div className="relative h-[340px] md:col-span-6 sm:h-[440px] md:h-[500px]">
                    <motion.div
                        style={{
                            y: y1,
                            willChange: "transform",
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