import React, { JSX, useRef, useMemo } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useReducedMotion,
    MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/Reveal";

interface Stage {
    n: string;
    label: string;
    copy: string;
    Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

const STAGES: Stage[] = [
    {
        n: "01",
        label: "Digitize",
        copy: "Transform traditional processes into efficient digital systems that improve productivity and business performance.",
        Icon: IconChip,
    },
    {
        n: "02",
        label: "Connect",
        copy: "Use technology to connect businesses with customers, markets, teams, and opportunities without boundaries.",
        Icon: IconNetwork,
    },
    {
        n: "03",
        label: "Optimize",
        copy: "Leverage automation, data, and smart tools to reduce complexity, improve decisions, and maximize efficiency.",
        Icon: IconGauge,
    },
    {
        n: "04",
        label: "Achieve",
        copy: "Turn technology-driven strategies into measurable results, stronger competitiveness, and sustainable business growth.",
        Icon: IconTarget,
    },
];

const INTRO_TEXT =
    "Technology empowers businesses to work smarter, operate faster, connect with wider markets, and make informed decisions. By enabling innovation, automation, digital transformation, and scalable solutions, technology turns business ambitions into measurable results, strengthens competitiveness, and creates sustainable opportunities for continuous growth.";

export default function TechPlatform(): JSX.Element {
    const sectionRef = useRef<HTMLElement | null>(null);
    const introRef = useRef<HTMLDivElement | null>(null);
    const flowRef = useRef<HTMLDivElement | null>(null);
    const prefersReducedMotion = useReducedMotion();

    const { scrollYProgress: sectionProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const { scrollYProgress: introProgress } = useScroll({
        target: introRef,
        offset: ["start 85%", "end 35%"],
    });

    const { scrollYProgress: flowProgress } = useScroll({
        target: flowRef,
        offset: ["start 75%", "end 55%"],
    });

    const blobA = useTransform(sectionProgress, [0, 1], [-80, 100]);
    const blobB = useTransform(sectionProgress, [0, 1], [60, -130]);
    const spineFill = useTransform(flowProgress, [0, 1], ["2%", "100%"]);

    const words = useMemo(() => INTRO_TEXT.split(" "), []);
    const totalWords = words.length;

    return (
        <section
            ref={sectionRef}
            id="ex-technology"
            className="relative w-full overflow-hidden bg-[#03050b] py-20 sm:py-14 md:py-20"
            data-palette=""
            data-palette-a="#35e0ff"
            data-palette-b="#6d5efc"
            data-palette-c="#a855f7"
            data-palette-bg="#03050b"
            data-palette-progress="linear-gradient(90deg, #35e0ff 0%, #6d5efc 55%, #a855f7 100%)"
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap');

        .tf-display { font-family: 'Space Grotesk', sans-serif; }
        .tf-mono { font-family: 'JetBrains Mono', monospace; }
        .tf-body { font-family: 'Inter', sans-serif; }

        @keyframes tf-flow {
          0%   { transform: translateY(-40%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(140%); opacity: 0; }
        }
        @keyframes tf-pulse-ring {
          0%   { transform: scale(0.85); opacity: 0.6; }
          100% { transform: scale(2.15); opacity: 0; }
        }
        @keyframes tf-spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes tf-grid-drift {
          0%   { background-position: 0 0; }
          100% { background-position: 0 64px; }
        }
        @keyframes tf-float {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }
        .tf-grid-bg {
          background-image:
            linear-gradient(to right, rgba(120,160,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(120,160,255,0.06) 1px, transparent 1px);
          background-size: 46px 46px;
          animation: tf-grid-drift 14s linear infinite;
        }
        .tf-ring-spin {
          background: conic-gradient(from 0deg, rgba(53,224,255,0.55), transparent 30%, rgba(109,94,252,0.5) 55%, transparent 80%, rgba(53,224,255,0.55));
          animation: tf-spin 7s linear infinite;
        }
      `}</style>

            {/* Ambient background glow & grid */}
            <div className="pointer-events-none absolute inset-0">
                <div className="tf-grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_25%,black,transparent)]" />
                <motion.div
                    style={prefersReducedMotion ? undefined : { y: blobA }}
                    className="absolute -left-48 top-0 h-[32rem] w-[32rem] rounded-full bg-[#35e0ff]/15 blur-[140px]"
                />
                <motion.div
                    style={prefersReducedMotion ? undefined : { y: blobB }}
                    className="absolute -right-40 bottom-0 h-[36rem] w-[36rem] rounded-full bg-[#6d5efc]/15 blur-[150px]"
                />
                <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-[#23e6b0]/10 blur-[120px]" />
            </div>

            <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
                {/* ── INTRO: WORD-BY-WORD SCROLL REVEAL (BIDIRECTIONAL SCROLL) ── */}
                <div ref={introRef} className="mx-auto max-w-5xl text-center">
                    {/* Eyebrow Badge & Vertical Guide Line */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8 flex flex-col items-center"
                    >
                        <span className="tf-mono text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-[#35e0ff] bg-[#35e0ff]/10 px-4 py-1.5 rounded-full border border-[#35e0ff]/30 shadow-[0_0_20px_rgba(53,224,255,0.25)] flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#35e0ff] shadow-[0_0_10px_rgba(53,224,255,0.8)] animate-pulse" />
                            System / Technology
                        </span>
                        <div className="mt-4 h-12 sm:h-14 w-px bg-gradient-to-b from-[#35e0ff]/70 to-transparent" />
                    </motion.div>

                    {/* Word-by-Word Scroll Reveal Paragraph */}
                    <p className="tf-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.35] sm:leading-[1.4] text-white">
                        {words.map((word, i) => {
                            const start = (i / totalWords) * 0.85;
                            const end = Math.min(1, start + (1 / totalWords) * 2.0);
                            return (
                                <TechWordItem
                                    key={`${word}-${i}`}
                                    word={word}
                                    progress={introProgress}
                                    range={[start, end]}
                                />
                            );
                        })}
                    </p>
                </div>

                {/* ── PURE SCROLL-DRIVEN CIRCUIT FLOW & STAGES ── */}
                <div ref={flowRef} className="relative mt-20 sm:mt-28 md:mt-36">
                    <Spine fillTo={spineFill} />

                    <div className="relative flex flex-col gap-20 sm:gap-28 md:gap-36">
                        {STAGES.map((stage, i) => (
                            <StageRow key={stage.n} stage={stage} index={i} progress={flowProgress} />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}

/* ── WORD ITEM FOR SCROLL REVEAL (SCROLL DOWN = FADE IN, SCROLL UP = FADE OUT) ── */
function TechWordItem({
    word,
    progress,
    range,
}: {
    word: string;
    progress: MotionValue<number>;
    range: [number, number];
}) {
    const opacity = useTransform(progress, range, [0.14, 1]);
    const y = useTransform(progress, range, [12, 0]);
    const scale = useTransform(progress, range, [0.96, 1]);

    const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");

    const isHighlight =
        cleanWord === "smarter" ||
        cleanWord === "faster" ||
        cleanWord === "innovation" ||
        cleanWord === "automation" ||
        cleanWord === "digital" ||
        cleanWord === "transformation" ||
        cleanWord === "scalable" ||
        cleanWord === "solutions" ||
        cleanWord === "measurable" ||
        cleanWord === "results" ||
        cleanWord === "competitiveness" ||
        cleanWord === "growth";

    return (
        <span className="inline-block relative mr-[0.28em] my-[0.06em] whitespace-nowrap">
            <motion.span
                style={{ opacity, y, scale, display: "inline-block" }}
                className={
                    isHighlight
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-[#35e0ff] to-[#6d5efc] font-semibold drop-shadow-[0_0_25px_rgba(53,224,255,0.5)]"
                        : "text-white/90 font-medium"
                }
            >
                {word}
            </motion.span>
        </span>
    );
}

/* ── SPINE LINES & STAGES ── */
function Spine({ fillTo }: { fillTo: MotionValue<string> }): JSX.Element {
    return (
        <>
            <div className="absolute bottom-0 left-6 top-0 w-px sm:left-8 md:hidden">
                <SpineLine fillTo={fillTo} />
            </div>
            <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 md:block">
                <SpineLine fillTo={fillTo} />
            </div>
        </>
    );
}

function SpineLine({ fillTo }: { fillTo: MotionValue<string> }): JSX.Element {
    return (
        <div className="relative h-full w-full">
            <div className="absolute inset-0 w-px bg-white/10" />

            <motion.div
                style={{ height: fillTo }}
                className="absolute left-0 top-0 w-px bg-gradient-to-b from-[#35e0ff] via-[#8b7dfc] to-[#23e6b0] shadow-[0_0_16px_2px_rgba(53,224,255,0.55)]"
            />

            <span
                className="absolute left-1/2 top-0 h-20 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#c7f3ff] to-transparent shadow-[0_0_12px_3px_rgba(199,243,255,0.9)]"
                style={{ animation: "tf-flow 3s linear infinite" }}
            />
            <span
                className="absolute left-1/2 top-0 h-20 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#c7f3ff] to-transparent shadow-[0_0_12px_3px_rgba(199,243,255,0.9)]"
                style={{ animation: "tf-flow 3s linear infinite", animationDelay: "1.5s" }}
            />
        </div>
    );
}

/* ── PURE SCROLL-DRIVEN STAGE ROW (FADES IN ON SCROLL DOWN, FADES OUT ON SCROLL BACKWARDS) ── */
function StageRow({
    stage,
    index,
    progress,
}: {
    stage: Stage;
    index: number;
    progress: MotionValue<number>;
}): JSX.Element {
    const { n, label, copy, Icon } = stage;
    const isEven = index % 2 === 0;

    // Scroll progress window for each stage: 4 stages spread over [0, 1]
    const start = index * 0.22;
    const enter = Math.min(1, start + 0.22);

    const stageOpacity = useTransform(progress, [start, enter], [0, 1]);
    const stageY = useTransform(progress, [start, enter], [40, 0]);
    const stageScale = useTransform(progress, [start, enter], [0.94, 1]);

    const dir = isEven ? 1 : -1;
    const numeralY = useTransform(progress, [0, 1], [dir * 25, dir * -25]);
    const iconY = useTransform(progress, [0, 1], [dir * -15, dir * 15]);

    return (
        <motion.div
            style={{ opacity: stageOpacity, y: stageY, scale: stageScale }}
            className="relative grid grid-cols-1 items-center md:grid-cols-2 md:gap-x-20"
        >
            {/* Mobile layout */}
            <div className="flex gap-4 pl-14 sm:gap-5 sm:pl-16 md:hidden">
                <NodeStub
                    side="mobile"
                    Icon={Icon}
                    numeral={n}
                    numeralY={numeralY}
                    iconY={iconY}
                />
                <StageCopy label={label} copy={copy} align="left" />
            </div>

            {/* Desktop alternating layout */}
            {isEven ? (
                <>
                    <div className="hidden md:flex md:justify-end md:pr-16">
                        <StageCopy label={label} copy={copy} align="right" />
                    </div>
                    <div className="hidden md:flex md:items-center md:pl-16">
                        <NodeStub
                            side="left"
                            Icon={Icon}
                            numeral={n}
                            numeralY={numeralY}
                            iconY={iconY}
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className="hidden md:flex md:items-center md:justify-end md:pr-16">
                        <NodeStub
                            side="right"
                            Icon={Icon}
                            numeral={n}
                            numeralY={numeralY}
                            iconY={iconY}
                        />
                    </div>
                    <div className="hidden md:flex md:pl-16">
                        <StageCopy label={label} copy={copy} align="left" />
                    </div>
                </>
            )}
        </motion.div>
    );
}

function NodeStub({
    side,
    Icon,
    numeral,
    numeralY,
    iconY,
}: {
    side: "mobile" | "left" | "right";
    Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
    numeral: string;
    numeralY: MotionValue<number>;
    iconY: MotionValue<number>;
}): JSX.Element {
    return (
        <div className={`relative flex items-center gap-3 sm:gap-4 ${side === "right" ? "flex-row-reverse" : ""}`}>
            {side !== "mobile" && (
                <span
                    className={`absolute top-1/2 h-px w-16 -translate-y-1/2 ${side === "right"
                            ? "right-full bg-gradient-to-l from-[#35e0ff]/70 to-transparent"
                            : "left-full bg-gradient-to-r from-[#35e0ff]/70 to-transparent"
                        }`}
                />
            )}
            {side === "mobile" && (
                <span className="absolute -left-14 top-1/2 h-px w-14 -translate-y-1/2 bg-gradient-to-r from-[#35e0ff]/70 to-transparent sm:-left-16 sm:w-16" />
            )}

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#35e0ff]/20 blur-[60px] sm:h-52 sm:w-52" />

            <motion.div
                style={{ y: iconY }}
                className="group relative flex h-20 w-20 shrink-0 items-center justify-center sm:h-24 sm:w-24"
            >
                <span
                    className="tf-ring-spin absolute inset-[-6px] rounded-[1.6rem] opacity-70"
                    style={{
                        WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 1.5px))",
                        mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 1.5px))",
                    }}
                />
                <span
                    className="absolute inset-0 rounded-[1.4rem] border border-[#35e0ff]/40"
                    style={{ animation: "tf-pulse-ring 2.6s ease-out infinite" }}
                />
                <div
                    className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[1.3rem] border border-white/10 bg-white/[0.03] text-[#8be9ff] shadow-[0_0_32px_-6px_rgba(53,224,255,0.6)] backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 sm:h-[5.5rem] sm:w-[5.5rem]"
                    style={{
                        clipPath:
                            "polygon(22% 0%, 78% 0%, 100% 22%, 100% 78%, 78% 100%, 22% 100%, 0% 78%, 0% 22%)",
                        animation: "tf-float 6s ease-in-out infinite",
                    }}
                >
                    <Icon className="h-7 w-7 sm:h-9 sm:w-9" />
                </div>
            </motion.div>

            <motion.span
                style={{ y: numeralY, WebkitTextStroke: "1.5px rgba(139,233,255,0.35)" }}
                className="tf-display select-none text-[3.5rem] font-bold leading-none text-transparent sm:text-[4.5rem] md:text-[5.5rem]"
            >
                {numeral}
            </motion.span>
        </div>
    );
}

function StageCopy({
    label,
    copy,
    align,
}: {
    label: string;
    copy: string;
    align: "left" | "right";
}): JSX.Element {
    const isRight = align === "right";
    return (
        <div className={`max-w-sm border-white/10 ${isRight ? "border-r pr-7 text-right" : "border-l pl-7 text-left"}`}>
            <h3 className="tf-display text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                {label}
            </h3>
            <p className="tf-body mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
                {copy}
            </p>
        </div>
    );
}

/* ── ICONS ── */
function IconChip(props: React.SVGProps<SVGSVGElement>): JSX.Element {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
            <rect x="7" y="7" width="10" height="10" rx="1.5" />
            <path d="M9.5 7V4M14.5 7V4M9.5 20v-3M14.5 20v-3M7 9.5H4M7 14.5H4M20 9.5h-3M20 14.5h-3" strokeLinecap="round" />
            <circle cx="10.5" cy="10.5" r="0.5" fill="currentColor" />
            <circle cx="13.5" cy="13.5" r="0.5" fill="currentColor" />
        </svg>
    );
}

function IconNetwork(props: React.SVGProps<SVGSVGElement>): JSX.Element {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
            <circle cx="12" cy="5" r="2" />
            <circle cx="5" cy="18" r="2" />
            <circle cx="19" cy="18" r="2" />
            <path d="M12 7v4M12 11 6.4 16.4M12 11l5.6 5.4" strokeLinecap="round" />
        </svg>
    );
}

function IconGauge(props: React.SVGProps<SVGSVGElement>): JSX.Element {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
            <path d="M4 15a8 8 0 1 1 16 0" strokeLinecap="round" />
            <path d="M12 15 16 9" strokeLinecap="round" />
            <circle cx="12" cy="15" r="1" fill="currentColor" stroke="none" />
        </svg>
    );
}

function IconTarget(props: React.SVGProps<SVGSVGElement>): JSX.Element {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
            <circle cx="12" cy="12" r="8" />
            <circle cx="12" cy="12" r="4.2" />
            <path d="m15.5 8.5 2.7-2.7M18.2 5.8V3.3M18.2 5.8h2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}