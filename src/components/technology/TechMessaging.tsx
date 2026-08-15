import React, {
    useRef,
    useMemo,
    useEffect,
    useState,
    useCallback,
} from "react";
import {
    motion,
    useScroll,
    useTransform,
    useMotionValue,
    useSpring,
    useAnimationFrame,
    useInView,
    type Variants,
} from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Theme tokens — single source of truth for the section's palette    */
/* ------------------------------------------------------------------ */

const THEME = {
    cyan: "#5ee7ff",
    teal: "#3fe0d0",
    violet: "#8c6bff",
    pink: "#ff6bd6",
} as const;

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Stage = {
    id: string;
    index: string;
    title: string;
    description: string;
    Icon: React.FC<{ active: boolean }>;
};

const STAGES: Stage[] = [
    {
        id: "respond",
        index: "01",
        title: "Respond",
        description:
            "Deliver instant responses to customer queries, ensuring no opportunity is missed.",
        Icon: RespondIcon,
    },
    {
        id: "engage",
        index: "02",
        title: "Engage",
        description:
            "Maintain meaningful and personalized conversations that keep customers connected with your brand.",
        Icon: EngageIcon,
    },
    {
        id: "convert",
        index: "03",
        title: "Convert",
        description:
            "Turn conversations into qualified leads, sales opportunities, and stronger customer relationships.",
        Icon: ConvertIcon,
    },
    {
        id: "retain",
        index: "04",
        title: "Retain",
        description:
            "Provide consistent follow-ups and support that build trust, loyalty, and long-term business growth.",
        Icon: RetainIcon,
    },
];

/* ------------------------------------------------------------------ */
/*  Animated SVG icons                                                 */
/*  Each icon draws itself in once, then idles with a small looping    */
/*  motion so the cards never feel static — a slow pulse / spin / trace*/
/* ------------------------------------------------------------------ */

const iconDraw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number = 0) => ({
        pathLength: 1,
        opacity: 1,
        transition: {
            pathLength: { duration: 0.9, delay: i * 0.08, ease: "easeInOut" },
            opacity: { duration: 0.3, delay: i * 0.08 },
        },
    }),
};

/** Shared wrapper: handles the draw-in, then hands off to an idle loop. */
function IconFrame({
    active,
    children,
    idle,
}: {
    active: boolean;
    children: React.ReactNode;
    idle?: React.ComponentProps<typeof motion.svg>["animate"];
}) {
    return (
        <motion.svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-7 w-7"
            animate={active ? idle : undefined}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
            {children}
        </motion.svg>
    );
}

function RespondIcon({ active }: { active: boolean }) {
    return (
        <IconFrame active={active} idle={{ y: [0, -1.5, 0] }}>
            <motion.path
                d="M4 5.5h16a1 1 0 0 1 1 1V15a1 1 0 0 1-1 1H9l-4.2 3.5a.5.5 0 0 1-.8-.4V16H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z"
                stroke={THEME.cyan}
                strokeWidth={1.4}
                strokeLinejoin="round"
                variants={iconDraw}
                initial="hidden"
                animate={active ? "visible" : "hidden"}
                custom={0}
            />
            <motion.path
                d="M8 10.2 10.4 12.6 16 7"
                stroke={THEME.cyan}
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={iconDraw}
                initial="hidden"
                animate={active ? "visible" : "hidden"}
                custom={1}
            />
        </IconFrame>
    );
}

function EngageIcon({ active }: { active: boolean }) {
    return (
        <IconFrame active={active}>
            <motion.circle
                cx={8.5}
                cy={8.5}
                r={4}
                stroke={THEME.cyan}
                strokeWidth={1.4}
                variants={iconDraw}
                initial="hidden"
                animate={
                    active
                        ? { pathLength: 1, opacity: 1, cx: [8.5, 9, 8.5] }
                        : "hidden"
                }
                custom={0}
                transition={{
                    pathLength: { duration: 0.9, ease: "easeInOut" },
                    opacity: { duration: 0.3 },
                    cx: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                }}
            />
            <motion.circle
                cx={15}
                cy={15}
                r={4}
                stroke={THEME.cyan}
                strokeWidth={1.4}
                variants={iconDraw}
                initial="hidden"
                animate={
                    active
                        ? { pathLength: 1, opacity: 1, cy: [15, 14.5, 15] }
                        : "hidden"
                }
                custom={0.5}
                transition={{
                    pathLength: { duration: 0.9, delay: 0.04, ease: "easeInOut" },
                    opacity: { duration: 0.3, delay: 0.04 },
                    cy: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                }}
            />
            <motion.path
                d="M11.2 11.2 12.3 12.3"
                stroke={THEME.cyan}
                strokeWidth={1.4}
                strokeLinecap="round"
                variants={iconDraw}
                initial="hidden"
                animate={active ? "visible" : "hidden"}
                custom={1}
            />
        </IconFrame>
    );
}

function ConvertIcon({ active }: { active: boolean }) {
    return (
        <IconFrame active={active} idle={{ y: [0, 1.5, 0] }}>
            <motion.path
                d="M4 6h16l-6 7.5V18l-4 2v-6.5Z"
                stroke={THEME.cyan}
                strokeWidth={1.4}
                strokeLinejoin="round"
                variants={iconDraw}
                initial="hidden"
                animate={active ? "visible" : "hidden"}
                custom={0}
            />
        </IconFrame>
    );
}

function RetainIcon({ active }: { active: boolean }) {
    return (
        <IconFrame active={active} idle={{ rotate: 360 }}>
            <motion.path
                d="M18 8a6 6 0 1 0-2 4.5"
                stroke={THEME.cyan}
                strokeWidth={1.4}
                strokeLinecap="round"
                variants={iconDraw}
                initial="hidden"
                animate={active ? "visible" : "hidden"}
                custom={0}
            />
            <motion.path
                d="M18 4v4h-4"
                stroke={THEME.cyan}
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={iconDraw}
                initial="hidden"
                animate={active ? "visible" : "hidden"}
                custom={0.3}
            />
            <motion.path
                d="M6 16a6 6 0 0 0 8.5 2"
                stroke={THEME.cyan}
                strokeWidth={1.4}
                strokeLinecap="round"
                variants={iconDraw}
                initial="hidden"
                animate={active ? "visible" : "hidden"}
                custom={0.5}
            />
            <motion.path
                d="M6 20v-4h4"
                stroke={THEME.cyan}
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={iconDraw}
                initial="hidden"
                animate={active ? "visible" : "hidden"}
                custom={0.8}
            />
        </IconFrame>
    );
}

/* ------------------------------------------------------------------ */
/*  FloatingDots — reusable ambient particle background                */
/*  Canvas-based so it scales cleanly to hundreds of dots without      */
/*  taxing the DOM. Fully configurable and drop-in anywhere.           */
/* ------------------------------------------------------------------ */

type FloatingDotsProps = {
    className?: string;
    count?: number;
    color?: string;
    minRadius?: number;
    maxRadius?: number;
    minSpeed?: number;
    maxSpeed?: number;
};

type Dot = {
    x: number;
    y: number;
    r: number;
    vx: number;
    vy: number;
    baseOpacity: number;
};

function FloatingDots({
    className,
    count = 120,
    color = "#ffffff",
    minRadius = 0.8,
    maxRadius = 2.2,
    minSpeed = 0.15,
    maxSpeed = 0.7,
}: FloatingDotsProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dotsRef = useRef<Dot[]>([]);
    const rafRef = useRef<number>(0);

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const buildDots = useCallback(
        (width: number, height: number) => {
            const effectiveCount = width < 640 ? Math.round(count * 0.5) : count;
            dotsRef.current = Array.from({ length: effectiveCount }, () => {
                const angle = rand(0, Math.PI * 2);
                const speed = rand(minSpeed, maxSpeed);
                return {
                    x: rand(0, width),
                    y: rand(0, height),
                    r: rand(minRadius, maxRadius),
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    baseOpacity: rand(0.15, 0.6),
                };
            });
        },
        [count, minRadius, maxRadius, minSpeed, maxSpeed]
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        const parent = canvas?.parentElement;
        if (!canvas || !parent) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Cap the backing store aggressively: the visual difference is tiny,
        // but a huge retina canvas can become expensive while the page scrolls.
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        let isVisible = true;
        let isPageVisible = document.visibilityState === "visible";

        const resize = () => {
            const { width, height } = parent.getBoundingClientRect();
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            buildDots(width, height);
        };

        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(parent);

        const updateVisibility = () => {
            const rect = parent.getBoundingClientRect();
            isVisible = rect.bottom > -100 && rect.top < window.innerHeight + 100;
        };

        const handlePageVisibility = () => {
            isPageVisible = document.visibilityState === "visible";
        };

        const draw = () => {
            if (isVisible && isPageVisible) {
                const width = canvas.width / dpr;
                const height = canvas.height / dpr;

                ctx.clearRect(0, 0, width, height);
                ctx.fillStyle = color;

                for (const dot of dotsRef.current) {
                    dot.x += dot.vx;
                    dot.y += dot.vy;

                    if (dot.x < -5) dot.x = width + 5;
                    if (dot.x > width + 5) dot.x = -5;
                    if (dot.y < -5) dot.y = height + 5;
                    if (dot.y > height + 5) dot.y = -5;

                    ctx.globalAlpha = dot.baseOpacity;
                    ctx.beginPath();
                    ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.globalAlpha = 1;
            }

            rafRef.current = requestAnimationFrame(draw);
        };

        const handleScroll = () => updateVisibility();
        updateVisibility();

        document.addEventListener("visibilitychange", handlePageVisibility);
        window.addEventListener("scroll", handleScroll, { passive: true });

        rafRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(rafRef.current);
            ro.disconnect();
            document.removeEventListener("visibilitychange", handlePageVisibility);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [buildDots, color]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            aria-hidden
        />
    );
}

/* ------------------------------------------------------------------ */
/*  SectionBackground — glow blobs + floating dots + vignette          */
/*  Everything ambient lives here so the section body stays focused    */
/*  on layout/content, and the background can be reused elsewhere.     */
/* ------------------------------------------------------------------ */

type GlowBlob = {
    className: string;
    color: string;
};

const GLOW_BLOBS: GlowBlob[] = [
    {
        className:
            "absolute left-1/2 top-0 h-[520px] w-[620px] -translate-x-1/2 rounded-full blur-[150px]",
        color: "rgba(217,70,239,0.14)", // fuchsia
    },
    {
        className:
            "absolute -left-[160px] top-[40%] h-[400px] w-[400px] rounded-full blur-[140px]",
        color: "rgba(147,51,234,0.11)", // purple
    },
    {
        className:
            "absolute -right-[160px] top-[60%] h-[440px] w-[440px] rounded-full blur-[150px]",
        color: "rgba(236,72,153,0.10)", // pink
    },
];

function SectionBackground({
    containerRef,
}: {
    containerRef: React.RefObject<HTMLElement | null>;
}) {
    // Subtle parallax that follows the cursor, applied to the glow blobs only.
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 40, damping: 20 });
    const sy = useSpring(my, { stiffness: 40, damping: 20 });

    const parallax = [
        { x: useTransform(sx, (v) => v * 30), y: useTransform(sy, (v) => v * 30) },
        { x: useTransform(sx, (v) => v * -40), y: useTransform(sy, (v) => v * -20) },
        { x: useTransform(sx, (v) => v * 20), y: useTransform(sy, (v) => v * -30) },
    ];

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const handler = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            mx.set((e.clientX - rect.left) / rect.width - 0.5);
            my.set((e.clientY - rect.top) / rect.height - 0.5);
        };
        el.addEventListener("mousemove", handler);
        return () => el.removeEventListener("mousemove", handler);
    }, [containerRef, mx, my]);

    return (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            {GLOW_BLOBS.map((blob, i) => (
                <motion.div key={i} style={parallax[i]} className={`${blob.className} will-change-transform`}>
                    <div
                        className="h-full w-full rounded-full"
                        style={{ background: blob.color }}
                    />
                </motion.div>
            ))}

            <FloatingDots
                className="absolute inset-0 h-full w-full"
                count={200}
                color="#ffffff"
                minRadius={0.8}
                maxRadius={2.2}
                minSpeed={0.15}
                maxSpeed={0.7}
            />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050810_82%)]" />
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Signal pipeline — animated connector path with a traveling pulse   */
/* ------------------------------------------------------------------ */

const PATH_D =
    "M 75,40 C 300,40 300,180 480,180 C 660,180 660,40 830,40 C 1000,40 1000,180 1105,180";

function PipelinePath({ inView }: { inView: boolean }) {
    const pathRef = useRef<SVGPathElement>(null);
    const dotARef = useRef<SVGCircleElement>(null);
    const dotBRef = useRef<SVGCircleElement>(null);
    const pointsRef = useRef<{ x: number; y: number }[]>([]);
    const pathLenRef = useRef(0);

    useEffect(() => {
        const path = pathRef.current;
        if (!path) return;

        const length = path.getTotalLength();
        pathLenRef.current = length;

        // Sample once. Calling getPointAtLength() every frame is surprisingly
        // expensive during page scroll, so animation frames only read this cache.
        const samples = 240;
        const points = new Array<{ x: number; y: number }>(samples);

        for (let i = 0; i < samples; i++) {
            const point = path.getPointAtLength((i / (samples - 1)) * length);
            points[i] = { x: point.x, y: point.y };
        }

        pointsRef.current = points;
    }, []);

    useAnimationFrame((t) => {
        if (!inView || !pathLenRef.current || pointsRef.current.length === 0) return;

        const speed = 5500;
        const points = pointsRef.current;
        const last = points.length - 1;

        const getPoint = (time: number) => {
            const progress = ((time % speed) / speed) * last;
            const index = Math.floor(progress);
            const next = Math.min(index + 1, last);
            const amount = progress - index;

            const a = points[index];
            const b = points[next];

            return {
                x: a.x + (b.x - a.x) * amount,
                y: a.y + (b.y - a.y) * amount,
            };
        };

        const pt1 = getPoint(t);
        const pt2 = getPoint(t + speed / 2);

        if (dotARef.current) {
            dotARef.current.setAttribute("cx", String(pt1.x));
            dotARef.current.setAttribute("cy", String(pt1.y));
        }

        if (dotBRef.current) {
            dotBRef.current.setAttribute("cx", String(pt2.x));
            dotBRef.current.setAttribute("cy", String(pt2.y));
        }
    });

    return (
        <svg
            viewBox="0 0 1180 220"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible md:block"
        >
            <defs>
                <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={THEME.teal} />
                    <stop offset="50%" stopColor={THEME.violet} />
                    <stop offset="100%" stopColor={THEME.pink} />
                </linearGradient>
            </defs>
            <motion.path
                ref={pathRef}
                d={PATH_D}
                fill="none"
                stroke="url(#pathGrad)"
                strokeWidth={1.5}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 0.55 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}
            />
            <circle
                ref={dotARef}
                r={4.5}
                fill={THEME.cyan}
                opacity={inView ? 1 : 0}
                style={{
                    filter:
                        "drop-shadow(0 0 6px rgba(94,231,255,0.9)) drop-shadow(0 0 14px rgba(94,231,255,0.5))",
                    transition: "opacity 0.6s ease 1.2s",
                }}
            />
            <circle
                ref={dotBRef}
                r={3}
                fill={THEME.cyan}
                opacity={inView ? 0.6 : 0}
                style={{
                    filter: "drop-shadow(0 0 6px rgba(94,231,255,0.8))",
                    transition: "opacity 0.6s ease 1.4s",
                }}
            />
        </svg>
    );
}

/* ------------------------------------------------------------------ */
/*  Stage card                                                         */
/* ------------------------------------------------------------------ */

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.15, ease: [0.2, 0.7, 0.2, 1] },
    }),
};

function StageCard({ stage, i }: { stage: Stage; i: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.4 });
    const Icon = stage.Icon;

    return (
        <motion.div
            ref={ref}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="group relative [contain:layout_paint]"
        >
            {/* continuously rotating conic gradient border */}
            <div className="absolute inset-0 overflow-hidden rounded-[28px] p-[1.5px]">
                <motion.div
                    className="absolute inset-[-60%] opacity-40 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                        background: `conic-gradient(from 0deg, ${THEME.teal}, ${THEME.violet}, ${THEME.pink}, ${THEME.teal})`,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* card body */}
            <article
                className="relative m-[1.5px] overflow-hidden rounded-[27px] border border-white/5 bg-gradient-to-b from-slate-900/90 to-slate-950/95 p-8 pb-10 backdrop-blur-md
                   sm:p-9 sm:pb-11 lg:p-10 lg:pb-12 xl:p-11 xl:pb-14"
            >
                {/* breathing halo */}
                <motion.div
                    className="pointer-events-none absolute -inset-16 -z-10 rounded-full bg-[radial-gradient(circle,rgba(94,231,255,0.25),transparent_65%)] blur-2xl"
                    animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.06, 0.9] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                />

                {/* giant ghost index number, echoing the source UI's oversized numerals */}
                <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-3 -right-1 select-none bg-gradient-to-b from-white/[0.07] to-transparent bg-clip-text font-[Sora,sans-serif] text-[110px] font-bold leading-none text-transparent sm:text-[130px] lg:text-[150px]"
                >
                    {stage.index}
                </span>

                {/* hover sheen */}
                <div className="pointer-events-none absolute inset-0 -z-10 rounded-[27px] bg-gradient-to-br from-cyan-300/0 via-transparent to-violet-400/0 opacity-0 transition-opacity duration-500 group-hover:from-cyan-300/[0.08] group-hover:to-violet-400/[0.08] group-hover:opacity-100" />

                {/* corner HUD brackets */}
                <span className="pointer-events-none absolute left-4 top-4 h-4 w-4 border-l-2 border-t-2 border-cyan-300/0 transition-colors duration-500 group-hover:border-cyan-300/70 sm:left-5 sm:top-5" />
                <span className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-cyan-300/0 transition-colors duration-500 group-hover:border-cyan-300/70 sm:bottom-5 sm:right-5" />

                <span className="relative z-10 mb-1 block font-[Sora,sans-serif] text-[12px] font-semibold tracking-widest text-slate-500">
                    {stage.index} / 04
                </span>

                {/* icon badge with rotating dashed ring */}
                <div className="relative z-10 mb-7 mt-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/25 bg-[radial-gradient(circle_at_30%_20%,rgba(94,231,255,0.22),rgba(140,107,255,0.08))] sm:h-[74px] sm:w-[74px] lg:mb-8 lg:h-20 lg:w-20 xl:h-[88px] xl:w-[88px]">
                    <motion.svg
                        viewBox="0 0 100 100"
                        className="absolute -inset-3 h-[calc(100%+24px)] w-[calc(100%+24px)] opacity-50"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                        <circle
                            cx="50"
                            cy="50"
                            r="46"
                            fill="none"
                            stroke={THEME.cyan}
                            strokeWidth="1"
                            strokeDasharray="3 7"
                        />
                    </motion.svg>
                    <motion.div
                        className="absolute -inset-2 rounded-2xl border border-cyan-300/25"
                        animate={{ opacity: [0.25, 0.6, 0.25], scale: [1, 1.08, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                    />
                    <motion.div
                        className="scale-125 sm:scale-[1.45] lg:scale-150 xl:scale-[1.65]"
                        whileHover={{ scale: 1.15 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                        <Icon active={inView} />
                    </motion.div>
                </div>

                <h3 className="relative z-10 mb-4 flex items-center text-[17px] font-bold uppercase tracking-[0.18em] text-slate-50 sm:text-[18px] lg:text-[20px]">
                    <span className="mr-2.5 inline-block h-[2px] w-[22px] bg-gradient-to-r from-cyan-300 to-transparent" />
                    {stage.title}
                </h3>

                <p className="relative z-10 max-w-[46ch] text-[clamp(15px,1.6vw,18px)] leading-[1.7] text-slate-300">
                    {stage.description}
                </p>
            </article>
        </motion.div>
    );
}

/* ------------------------------------------------------------------ */
/*  Mobile connector between stacked cards                             */
/* ------------------------------------------------------------------ */

function MobileConnector() {
    return (
        <div className="relative z-10 flex h-6 justify-center md:hidden">
            <svg viewBox="0 0 22 22" className="h-6 w-6">
                <motion.line
                    x1={11}
                    y1={0}
                    x2={11}
                    y2={22}
                    stroke={THEME.cyan}
                    strokeWidth={2}
                    strokeDasharray="2 5"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -14 }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                    opacity={0.8}
                />
            </svg>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Main section                                                       */
/* ------------------------------------------------------------------ */

export default function MessagingPipeline() {
    const sectionRef = useRef<HTMLElement>(null);
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReducedMotion(media.matches);
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);
    const pipelineRef = useRef<HTMLDivElement>(null);
    const headerInView = useInView(sectionRef, { once: true, amount: 0.3 });
    const pipelineInView = useInView(pipelineRef, { once: true, amount: 0.2 });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const bgParallax = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

    return (
        <section
            ref={sectionRef}
            className="relative isolate overflow-hidden bg-gradient-to-b from-[#050810] via-[#0a0f1c] to-[#050810] py-16 sm:py-14 lg:py-20 [contain:layout_style]"
        >
            <motion.div style={{ y: bgParallax }} className="absolute inset-0 -z-10">
                <SectionBackground containerRef={sectionRef} />
            </motion.div>

            <div className="relative z-10 mx-auto max-w-[1360px] px-4 sm:px-8 xl:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
                    className="mx-auto mb-16 max-w-4xl text-center sm:mb-20"
                >
                    <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/[0.06] px-4 py-[7px] text-[12px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                        <motion.span
                            className="h-1.5 w-1.5 rounded-full bg-cyan-300"
                            style={{ boxShadow: "0 0 8px 2px rgba(94,231,255,0.8)" }}
                            animate={{ opacity: [1, 0.4, 1], scale: [1, 0.7, 1] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                        />
                        Automated Messaging
                    </span>

                    <h2 className="text-[28px] font-bold leading-[1.18] tracking-tight text-slate-50 sm:text-[38px] lg:text-[46px]">
                        Every Query Deserves a{" "}
                        <span className="bg-gradient-to-r from-[#35e0ff] via-[#6d5efc] to-[#a855f7] bg-clip-text text-transparent">
                            Response.
                        </span>
                        <br />
                        Every Customer Deserves{" "}
                        <span className="bg-gradient-to-r from-[#35e0ff] via-[#6d5efc] to-[#a855f7] bg-clip-text text-transparent">
                            Attention.
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-400 sm:text-[18.5px]">
                        Every customer interaction is an opportunity to build trust. Automated
                        messaging ensures timely responses, consistent communication, personalized
                        engagement, and continuous support, helping businesses strengthen
                        relationships, capture opportunities, and accelerate growth.
                    </p>
                </motion.div>

                {/* Pipeline */}
                <div ref={pipelineRef} className="relative">
                    <PipelinePath inView={pipelineInView} />

                    <div className="relative z-10 grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-8 xl:gap-10">
                        {STAGES.map((stage, i) => (
                            <React.Fragment key={stage.id}>
                                <StageCard stage={stage} i={i} />
                                {i < STAGES.length - 1 && <MobileConnector />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}