import { useRef, useState, useId } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import {
  ArrowUpRight, Play, Pause, Volume2, VolumeX,
  Code2, Bot, GraduationCap, Clapperboard, Layers, Zap, Globe,
  Eye, Palette, Award, Rocket, Server, Cpu, Users, MessageCircle, Building2,
  Sparkles,
} from "lucide-react";
import { Reveal, MagneticButton } from "@/components/Reveal";
import Plasma from "../components/Plasma";



/* ── Palettes for section-based theme swaps ────────────────── */
const PALETTES = {
  parent: { a: "#ffffff", b: "#c9c9d1", c: "#6b6b76", bg: "#050505" },
  media: { a: "#D81B60", b: "#8A2BE2", c: "#FF6EC7", bg: "#0a040e" },
  tech: { a: "#00E5FF", b: "#3B82F6", c: "#7CC9FF", bg: "#03060f" },
  edu: { a: "#A855F7", b: "#7C3AED", c: "#E9D5FF", bg: "#0a0616" },
  bot: { a: "#25D366", b: "#22C55E", c: "#86EFAC", bg: "#03110a" },
} as const;

/* ── Loader ────────────────────────────────────────────────── */
function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);
  useState(() => {
    let v = 0;
    const id = setInterval(() => {
      v += Math.random() * 9 + 4;
      if (v >= 100) {
        v = 100;
        clearInterval(id);
        setTimeout(() => { setGone(true); setTimeout(onDone, 700); }, 350);
      }
      setPct(Math.floor(v));
    }, 90);
    return () => clearInterval(id);
  });

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: gone ? 0 : 1, y: gone ? "-100%" : 0 }}
      transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050505] noise"
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <motion.div
        className="font-display text-white text-6xl md:text-8xl tracking-tight"
        initial={{ letterSpacing: "0.4em", opacity: 0 }}
        animate={{ letterSpacing: "-0.02em", opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        EX Creative Technology<span className="text-white/30">/</span>
      </motion.div>
      <div className="mt-10 h-[2px] w-56 md:w-80 bg-white/10 overflow-hidden rounded-full">
        <motion.div className="h-full bg-white rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-4 font-mono text-[11px] text-white/40 tabular-nums">
        {String(pct).padStart(3, "0")} / 100 — booting creative engine
      </div>
    </motion.div>
  );
}

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

/* ── Original Full-Screen Company Sections ─────────────────── */
type CompanyKey = Exclude<keyof typeof PALETTES, "parent">;

type Company = {
  key: CompanyKey;
  code: string;
  name: string;
  tagline: string;
  desc: string;
  Icon: typeof Clapperboard;
  stats: [string, string][];
  statIcons: (typeof Clapperboard)[];
};

const COMPANIES: Company[] = [
  {
    key: "media",
    code: "01",
    name: "EX-Media",
    tagline: "Creative that moves culture.",
    desc: "A full-service creative studio building brand systems, campaigns, motion design and content that stops the scroll and starts conversations.",
    Icon: Clapperboard,
    stats: [
      ["240M+", "Views generated"],
      ["60+", "Brand identities"],
      ["18", "Awards"],
    ],
    statIcons: [Eye, Palette, Award],
  },
  {
    key: "tech",
    code: "02",
    name: "EX-Technology",
    tagline: "Engineering at the edge.",
    desc: "Custom software, cloud infrastructure and AI systems. We ship production-grade platforms for teams that treat engineering as leverage.",
    Icon: Code2,
    stats: [
      ["120+", "Products shipped"],
      ["99.98%", "Platform uptime"],
      ["45", "AI models trained"],
    ],
    statIcons: [Rocket, Server, Cpu],
  },
  {
    key: "edu",
    code: "03",
    name: "EX-Edu",
    tagline: "The future of learning, personal.",
    desc: "AI-native learning paths and mentorship for the next generation of builders. Curriculum designed around outcomes, not attendance.",
    Icon: GraduationCap,
    stats: [
      ["24K+", "Learners"],
      ["96%", "Placement rate"],
      ["140", "Live cohorts"],
    ],
    statIcons: [Users, Award, GraduationCap],
  },
  {
    key: "bot",
    code: "04",
    name: "EX-Bot",
    tagline: "Automate business, humanly.",
    desc: "WhatsApp-first AI agents, workflow automation and conversational commerce that feels like a great teammate — not a chatbot.",
    Icon: Bot,
    stats: [
      ["18M+", "Messages/mo"],
      ["3.2s", "Avg. response"],
      ["500+", "Businesses"],
    ],
    statIcons: [MessageCircle, Zap, Building2],
  },
];

function CompanyBadges(c: Company, i: number) {
  const chips: Record<CompanyKey, { label: string; x: string; y: string }[]> = {
    media: [
      { label: "🎬 Motion", x: "10%", y: "10%" },
      { label: "🎨 Brand", x: "78%", y: "20%" },
      { label: "📸 Content", x: "5%", y: "78%" },
      { label: "🌀 Campaigns", x: "72%", y: "70%" },
    ],
    tech: [
      { label: "</> React", x: "10%", y: "12%" },
      { label: "☁️ AWS", x: "78%", y: "18%" },
      { label: "🧠 OpenAI", x: "5%", y: "78%" },
      { label: "⚡ Edge", x: "76%", y: "72%" },
    ],
    edu: [
      { label: "🎓 Cohorts", x: "12%", y: "14%" },
      { label: "🧭 Mentors", x: "76%", y: "20%" },
      { label: "🏅 Certs", x: "8%", y: "76%" },
      { label: "🤖 AI Tutor", x: "74%", y: "68%" },
    ],
    bot: [
      { label: "💬 WhatsApp", x: "12%", y: "12%" },
      { label: "⚙️ Workflows", x: "76%", y: "18%" },
      { label: "🧠 Agents", x: "6%", y: "78%" },
      { label: "🔗 Integrations", x: "72%", y: "70%" },
    ],
  };
  return chips[c.key].map((chip, idx) => (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
      className="absolute glass rounded-full px-3 py-1.5 text-xs text-white/80 animate-float-slow hidden sm:block"
      style={{ left: chip.x, top: chip.y, animationDelay: `${(i + idx) * 0.5}s` }}
    >
      {chip.label}
    </motion.div>
  ));
}

function CompanySection({ c, index }: { c: Company; index: number }) {
  const p = PALETTES[c.key];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Spring-smoothed scroll values: cheaper to animate from and decouples
  // the visual update from raw per-pixel scroll events, which is the
  // main source of jank when several of these sections are mounted at once.
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 300, damping: 40, mass: 0.4 });
  const y1 = useTransform(smoothProgress, [0, 1], [80, -80]);
  const y2 = useTransform(smoothProgress, [0, 1], [-40, 40]);
  const bigOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.05, 0.2, 0.05]);
  const Icon = c.Icon;

  return (
    <div
      ref={ref}
      data-palette=""
      data-palette-a={p.a}
      data-palette-b={p.b}
      data-palette-c={p.c}
      data-palette-bg={p.bg}
      className="relative min-h-[100svh] flex items-center overflow-hidden py-20 sm:py-28 md:py-32 noise transition-colors duration-700"
      style={{
        backgroundColor: p.bg,
        // Let the browser skip layout/paint for sections scrolled out of view —
        // huge win when stacking several full-viewport animated sections.
        contentVisibility: "auto",
        containIntrinsicSize: "1200px",
      }}
    >
      <div
        className="aurora opacity-75 pointer-events-none"
        style={{
          background: `radial-gradient(45rem 32rem at 15% 25%, ${p.a}35, transparent 70%), radial-gradient(40rem 30rem at 85% 75%, ${p.b}30, transparent 70%)`,
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Big background number */}
      <motion.div
        style={{ opacity: bigOpacity, willChange: "opacity" }}
        className="absolute -right-8 top-1/2 -translate-y-1/2 font-display font-bold text-[55vw] leading-none text-white pointer-events-none select-none md:text-[42vw]"
      >
        {c.code}
      </motion.div>

      <div className="relative z-10 w-[min(1200px,94vw)] mx-auto grid grid-cols-1 gap-10 items-center md:grid-cols-12 md:gap-10">
        {/* Text side */}
        <div className="md:col-span-6">
          <Reveal>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/50">
              <span>{c.code}</span>
              <span className="w-8 h-px bg-white/30" />
              <span>Company</span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h3 className="mt-3 font-display font-bold text-white text-6xl leading-[0.88] tracking-tight sm:mt-4 sm:text-7xl md:text-8xl lg:text-9xl">
              {c.name}
            </h3>
          </Reveal>

          {/* Stat cards right under the name / label block */}
          <Reveal delay={0.3} className="mt-6 grid grid-cols-3 gap-3 max-w-xl sm:mt-7 sm:gap-4">
            {c.stats.map(([k, v], si) => {
              const StatIcon = c.statIcons[si];
              return (
                <div key={k} className="glass rounded-2xl p-4 sm:p-5 md:p-6">
                  <StatIcon className="mb-2 h-4 w-4 text-white/50 sm:mb-3 sm:h-5 sm:w-5" />
                  <div className="font-display text-xl text-white sm:text-2xl md:text-3xl">{k}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-white/50 sm:text-[11px]">{v}</div>
                </div>
              );
            })}
          </Reveal>

          <Reveal delay={0.45} className="mt-6 text-xl gradient-text italic font-display sm:text-2xl md:text-4xl">
            {c.tagline}
          </Reveal>
          <Reveal delay={0.55} className="mt-5 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
            {c.desc}
          </Reveal>

          <Reveal delay={0.65} className="mt-8">
            <MagneticButton href="/contact">
              Visit {c.name} <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
          </Reveal>
        </div>

        {/* Visual side */}
        <div className="md:col-span-6 relative h-[320px] sm:h-[440px] md:h-[500px]">
          <motion.div style={{ y: y1, willChange: "transform" }} className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px]">
              {/* Glow blob */}
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-60"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${p.a}, transparent 60%), radial-gradient(circle at 70% 70%, ${p.b}, transparent 60%)`,
                }}
              />
              {/* Card — kept transparent so the background number reads through */}
              <div className="absolute inset-4 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md flex flex-col justify-between p-5 sm:inset-6 sm:p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <Icon className="w-7 h-7 text-white sm:w-8 sm:h-8" />
                  <span className="text-white/40 font-mono text-xs">{c.code}/04</span>
                </div>
                <div>
                  <div className="text-white/50 text-xs uppercase tracking-widest">Now shipping</div>
                  <div className="mt-2 font-display text-2xl text-white sm:text-3xl">{c.name}</div>
                  <div className="mt-4 h-1 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: "20%" }}
                      whileInView={{ width: "84%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: p.a }}
                    />
                  </div>
                </div>
              </div>
              {/* Orbiting dots — only animate while their section is actually in view */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
                  style={{
                    background: p.a,
                    boxShadow: `0 0 20px ${p.a}`,
                    willChange: "transform",
                  } as React.CSSProperties}
                  initial={{ rotate: 0 }}
                  whileInView={{ rotate: 360 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 14 + i * 3, repeat: Infinity, ease: "linear" }}
                >
                  <span
                    className="block w-3 h-3 rounded-full"
                    style={{ transform: `translateX(${160 + i * 18}px)` }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Floating chips */}
          <motion.div style={{ y: y2, willChange: "transform" }} className="absolute inset-0 pointer-events-none">
            {CompanyBadges(c, index)}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Companies() {
  return (
    <section id="companies" className="relative">
      {COMPANIES.map((c, i) => (
        <CompanySection key={c.key} c={c} index={i} />
      ))}
    </section>
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



/* ── Home CTA ──────────────────────────────────────────────── */
function HomeCTA() {
  return (
    <section className="relative overflow-hidden py-20 noise sm:py-28 md:py-36">
      {/* Plasma background */}
      <div className="pointer-events-none absolute inset-0">
        <Plasma
          color="#B497CF"
          speed={1}
          direction="forward"
          scale={1}
          opacity={1}
          mouseInteractive={false}
          renderScale={0.55}
          maxDpr={1.5}
          targetFps={60}
          iterations={60}
        />
      </div>

      {/* Contrast overlays so text stays readable over the plasma */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,black_85%)]" />
      <div className="absolute inset-0 grid-bg opacity-[0.12]" />

      <div className="relative mx-auto w-[min(760px,92vw)] text-center">
        {/* Icon mark */}
        <Reveal>
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-[0_8px_30px_rgba(180,151,207,0.25)] backdrop-blur-xl sm:mb-8 sm:h-14 sm:w-14">
            <Sparkles className="h-5 w-5 text-[color:var(--color-brand-a)] sm:h-6 sm:w-6" />
          </div>
        </Reveal>

        {/* Heading */}
        <Reveal delay={0.1}>
          <h2 className="font-display text-white text-[clamp(2rem,7vw,4.25rem)] leading-[1.05] tracking-tight">
            Ready to Build
            <br />
            <span className="gradient-text">Something Extraordinary?</span>
          </h2>
        </Reveal>

        {/* Subtext */}
        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-md text-balance text-sm text-white/50 sm:mt-6 sm:text-base">
            Join thousands of teams who have already brought their ideas to
            life with our creative studio.
          </p>
        </Reveal>

        {/* CTA buttons */}
        <Reveal delay={0.3} className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4">
          <MagneticButton href="/contact">
            Get Started <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton href="/about" variant="ghost">
            Learn about us
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}



/* ── Page ──────────────────────────────────────────────────── */
export default function HomePage() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative bg-[color:var(--color-background)] transition-colors duration-700 overflow-x-hidden">
      {loading && <Loader onDone={() => setLoading(false)} />}
      <Hero />
      <Ticker />
      <Companies />
      <Numbers />
      <Process />
      <HomeCTA />
    </div>
  );
}