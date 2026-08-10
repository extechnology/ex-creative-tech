import { useRef, useState, useId } from "react";
import { motion } from "motion/react";
import { Play, Pause, Volume2, VolumeX,
  Code2, Layers, Zap, Globe,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import PageLoader from "@/components/PageLoader";



/* ── Palettes for section-based theme swaps ────────────────── */
const PALETTES = {
  parent: { a: "#ffffff", b: "#c9c9d1", c: "#6b6b76", bg: "#050505" },
  media: { a: "#D81B60", b: "#8A2BE2", c: "#FF6EC7", bg: "#0a040e" },
  tech: { a: "#00E5FF", b: "#3B82F6", c: "#7CC9FF", bg: "#03060f" },
  edu: { a: "#A855F7", b: "#7C3AED", c: "#E9D5FF", bg: "#0a0616" },
  bot: { a: "#25D366", b: "#22C55E", c: "#86EFAC", bg: "#03110a" },
} as const;

/* ── Hero Section — full-screen video player ───────────────── */
function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    const bar = barRef.current;
    if (!v || !bar || !v.duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    v.currentTime = ratio * v.duration;
    setProgress(ratio * 100);
  };

  return (
    <section
      id="top"
      data-palette=""
      data-palette-a={PALETTES.parent.a}
      data-palette-b={PALETTES.parent.b}
      data-palette-c={PALETTES.parent.c}
      data-palette-bg={PALETTES.parent.bg}
      className="relative h-[100svh] w-full overflow-hidden noise"
    >
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/vidssave.com Cinematic Watch Product Video Commercial Example _ Rolex Timex Omega Samsung Apple Jewelry Amazon Ad 1080p.mp4"
        autoPlay
        muted
        loop
        playsInline
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Contrast overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/85" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,black_90%)]" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Content — just a title + description, centered and clean */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-5 text-center sm:px-8">
        <div className="mx-auto w-[min(900px,92vw)]">
          <Reveal delay={0.1}>
            <h1 className="font-display text-white text-[11vw] leading-[1.02] tracking-tight sm:text-[7vw] md:text-[5.5vw]">
              Building Digital <span className="gradient-text">Experiences.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.3} className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/60 sm:mt-6 sm:text-base md:text-lg">
            The parent studio behind EX-Media, EX-Technology, EX-Edu and EX-Bot.
          </Reveal>
        </div>
      </div>

      {/* Modern video player controls */}
      <div className="absolute inset-x-4 bottom-5 z-20 sm:inset-x-8 sm:bottom-8 md:inset-x-auto md:right-8 md:w-[380px]">
        <div className="glass flex items-center gap-3 rounded-full px-3 py-2 sm:gap-4 sm:px-4 sm:py-2.5">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 sm:h-9 sm:w-9"
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 translate-x-0.5" />}
          </button>

          <div
            ref={barRef}
            onClick={seek}
            className="relative h-1 flex-1 cursor-pointer overflow-hidden rounded-full bg-white/15"
          >
            <div
              className="h-full rounded-full bg-white"
              style={{ width: `${progress}%` }}
            />
          </div>

          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white sm:h-9 sm:w-9"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-white/40 md:block">
        Scroll · Enter the ecosystem
      </div>
    </section>
  );
}

/* ── Ticker ────────────────────────────────────────────────── */
function Ticker() {
  const words = [
    "Creative Engineering", "AI Systems", "Motion Design",
    "Product Studio", "Automation", "Immersive UX",
    "Cinematic Web", "Cloud Native", "Education",
  ];
  return (
    <div className="relative py-6 border-y border-white/[0.06] overflow-hidden bg-black/20">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...words, ...words, ...words].map((w, i) => (
          <span key={i} className="mx-10 font-display text-2xl md:text-4xl text-white/15 hover:text-white/50 transition-colors">
            {w} <span className="text-[color:var(--color-brand-a)] opacity-60">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}





/* ── Process data ──────────────────────────────────────────── */
const PROCESS = [
  {
    num: "01",
    title: "Discover",
    desc: "We start with deep research — understanding your audience, market and goals before a single pixel is drawn.",
    icon: Globe,
    variant: "circles" as const,
    from: "#fb923c",
    to: "#dc2626",
  },
  {
    num: "02",
    title: "Architect",
    desc: "We map out the full system — design language, tech stack, information architecture and interaction patterns.",
    icon: Layers,
    variant: "triangleLayers" as const,
    from: "#6ee7b7",
    to: "#059669",
  },
  {
    num: "03",
    title: "Build",
    desc: "Design and engineering happen in parallel. We ship fast, iterate constantly and keep you in the loop daily.",
    icon: Code2,
    variant: "blobLayers" as const,
    from: "#7dd3fc",
    to: "#2563eb",
  },
  {
    num: "04",
    title: "Accelerate",
    desc: "We embed, train and automate — so every product keeps getting smarter, faster and more delightful over time.",
    icon: Zap,
    variant: "triangleSolid" as const,
    from: "#c4b5fd",
    to: "#7c3aed",
  },
];

/* ── Decorative per-card visual ── */
function ProcessVisual({
  variant,
  from,
  to,
}: {
  variant: "circles" | "triangleLayers" | "blobLayers" | "triangleSolid";
  from: string;
  to: string;
}) {
  const id = useId();
  const gradId = `pv-grad-${id}`;
  const blurId = `pv-blur-${id}`;

  return (
    <svg viewBox="0 0 200 180" className="h-full w-full" preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <filter id={blurId}>
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>

      {variant === "circles" && (
        <g>
          <circle cx="100" cy="78" r="52" fill={`url(#${gradId})`} opacity="0.55" />
          <circle cx="68" cy="122" r="52" fill={`url(#${gradId})`} opacity="0.75" />
          <circle cx="132" cy="122" r="52" fill={`url(#${gradId})`} opacity="0.9" />
        </g>
      )}

      {variant === "triangleLayers" && (
        <g>
          <polygon points="100,20 182,172 18,172" fill={to} opacity="0.18" />
          <polygon points="100,52 160,172 40,172" fill={to} opacity="0.4" />
          <polygon points="100,90 132,172 68,172" fill={to} opacity="0.68" />
          <polygon points="100,128 116,172 84,172" fill={`url(#${gradId})`} opacity="1" />
        </g>
      )}

      {variant === "blobLayers" && (
        <g filter={`url(#${blurId})`}>
          <circle cx="100" cy="145" r="60" fill={to} opacity="0.25" />
          <circle cx="100" cy="118" r="46" fill={to} opacity="0.45" />
          <circle cx="100" cy="90" r="34" fill={to} opacity="0.7" />
          <circle cx="100" cy="66" r="22" fill={`url(#${gradId})`} opacity="1" />
        </g>
      )}

      {variant === "triangleSolid" && (
        <polygon points="100,18 184,172 16,172" fill={`url(#${gradId})`} />
      )}
    </svg>
  );
}

/* ── Process ───────────────────────────────────────────────── */
function Process() {
  return (
    <section className="relative overflow-hidden  py-20 sm:py-24 md:py-20">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.12]" />

      <div className="relative w-[min(1300px,94vw)] mx-auto">
        {/* Header — big bold title left, description right */}
        <div className="mb-12 flex flex-col gap-6 sm:mb-16 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display font-extrabold uppercase leading-[0.95] tracking-tight text-white text-[clamp(2.25rem,7.5vw,4rem)]"
          >
            How We Work
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-[280px] text-sm leading-relaxed text-white/50 sm:mt-2"
          >
            Work with a team that only makes data-driven decisions. Launch
            delightful user experiences that result in an engaged user base.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
              className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-3xl bg-white/[0.02] sm:min-h-[420px] md:min-h-[520px]"
            >
              {/* base fade into the card's accent color */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 opacity-25 transition-opacity duration-500 group-hover:opacity-40"
                style={{
                  background: `linear-gradient(to top, ${step.to}, transparent)`,
                }}
              />

              {/* text */}
              <div className="relative z-10 p-6 sm:p-7">
                <div className="mb-3 flex items-center gap-2 text-white/25">
                  <step.icon className="h-4 w-4" />
                  <span className="font-mono text-[11px]">{step.num}</span>
                </div>
                <h3 className="font-display text-lg text-white sm:text-xl">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[220px] text-xs leading-relaxed text-white/45 sm:text-[13px]">
                  {step.desc}
                </p>
              </div>

              {/* visual */}
              <div className="relative z-0 mt-auto h-[180px] w-full sm:h-[210px] md:h-[230px]">
                <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105">
                  <ProcessVisual variant={step.variant} from={step.from} to={step.to} />
                </div>
              </div>

              {/* hover ring */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/0 transition-all duration-500 group-hover:ring-white/10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



/* ── Numbers ───────────────────────────────────────────────── */
function Numbers() {
  const stats = [
    { value: "240M+", label: "Views generated by EX-Media" },
    { value: "24K+", label: "Learners on EX-Edu platform" },
    { value: "18M+", label: "Messages/mo via EX-Bot" },
    { value: "99.98%", label: "Uptime across all platforms" },
  ];

  return (
    <section
      data-palette=""
      data-palette-a={PALETTES.parent.a}
      data-palette-b={PALETTES.parent.b}
      data-palette-c={PALETTES.parent.c}
      data-palette-bg={PALETTES.parent.bg}
      className="relative py-20 md:py-28 border-t border-white/[0.06] overflow-hidden"
    >
      <div className="absolute inset-0 aurora" />
      <div className="relative w-[min(1200px,94vw)] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-3xl overflow-hidden">
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="bg-[#050505] flex flex-col gap-2 p-8 md:p-10"
            >
              <span className="font-display text-4xl md:text-5xl text-white">{value}</span>
              <span className="text-xs text-white/40 leading-relaxed">{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



/* ── Page ──────────────────────────────────────────────────── */
export default function HomePage() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative bg-[color:var(--color-background)] transition-colors duration-700 overflow-x-hidden">
      {loading && <PageLoader onDone={() => setLoading(false)} />}
      <Hero />
      <Ticker />
      <Numbers />
      <Process />
    </div>
  );
}
