import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Play,
  Code2,
  Bot,
  GraduationCap,
  Clapperboard,
  Cpu,
  Cloud,
  Database,
  Layers,
  Zap,
  Globe,
  Instagram,
  Twitter,
  Linkedin,
  Github,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { ThemeSwapper } from "@/components/ThemeSwapper";
import { Reveal, SplitWords, MagneticButton } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      {
        title: "EX-Creative Technology — Building Digital Experiences Through Innovation",
      },
      {
        name: "description",
        content:
          "Parent company of EX-Media, EX-Technology, EX-Edu, EX-Bot. Award-winning digital products, AI, education and automation.",
      },
      { property: "og:title", content: "EX-Creative Technology" },
      {
        property: "og:description",
        content: "Building digital experiences through innovation.",
      },
    ],
  }),
});

/* ============================================================
   Palettes for section-based theme swaps
   ============================================================ */
const PALETTES = {
  parent: { a: "#ffffff", b: "#c9c9d1", c: "#6b6b76", bg: "#050505" },
  media: { a: "#D81B60", b: "#8A2BE2", c: "#FF6EC7", bg: "#0a040e" },
  tech: { a: "#00E5FF", b: "#3B82F6", c: "#7CC9FF", bg: "#03060f" },
  edu: { a: "#A855F7", b: "#7C3AED", c: "#E9D5FF", bg: "#0a0616" },
  bot: { a: "#25D366", b: "#22C55E", c: "#86EFAC", bg: "#03110a" },
} as const;

/* ============================================================
   Loader
   ============================================================ */
function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v += Math.random() * 9 + 4;
      if (v >= 100) {
        v = 100;
        clearInterval(id);
        setTimeout(() => {
          setGone(true);
          setTimeout(onDone, 700);
        }, 350);
      }
      setPct(Math.floor(v));
    }, 90);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: gone ? 0 : 1, y: gone ? "-100%" : 0 }}
      transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] relative noise"
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <motion.div
        className="font-display text-white text-5xl md:text-7xl tracking-tight"
        initial={{ letterSpacing: "0.4em", opacity: 0 }}
        animate={{ letterSpacing: "-0.02em", opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        EX<span className="text-white/40">/</span>
      </motion.div>
      <div className="mt-10 h-[2px] w-64 md:w-96 bg-white/10 overflow-hidden">
        <motion.div
          className="h-full bg-white"
          style={{ width: `${pct}%` }}
          transition={{ ease: "linear" }}
        />
      </div>
      <div className="mt-4 font-mono text-xs text-white/50 tabular-nums">
        {String(pct).padStart(3, "0")} / 100 — booting creative engine
      </div>
    </motion.div>
  );
}

/* ============================================================
   Scroll progress bar
   ============================================================ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX: w, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[80] bg-[color:var(--color-brand-a)]"
    />
  );
}

/* ============================================================
   Nav
   ============================================================ */
function Nav() {
  const links = [
    { href: "#companies", label: "Companies" },
    { href: "#tech", label: "Technology" },
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1200px,94vw)]">
      <div className="glass rounded-full flex items-center justify-between px-5 py-3">
        <a href="#top" className="flex items-center gap-2 font-display text-white text-lg">
          <span className="inline-block w-2 h-2 rounded-full bg-[color:var(--color-brand-a)] animate-pulse" />
          EX<span className="opacity-50">·</span>Creative
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-white/70">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-white transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[color:var(--color-brand-a)] hover:after:w-full after:transition-all"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-1 text-xs font-medium rounded-full px-4 py-2 bg-white text-black hover:opacity-90 transition"
        >
          Start a Project <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </header>
  );
}

/* ============================================================
   Hero
   ============================================================ */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      data-palette=""
      data-palette-a={PALETTES.parent.a}
      data-palette-b={PALETTES.parent.b}
      data-palette-c={PALETTES.parent.c}
      data-palette-bg={PALETTES.parent.bg}
      className="relative min-h-[100svh] flex items-center overflow-hidden noise"
    >
      <div className="aurora" />
      <div className="absolute inset-0 grid-bg opacity-60" />
      <FloatingOrbs />

      <motion.div style={{ y, scale, opacity }} className="relative z-10 w-[min(1200px,94vw)] mx-auto pt-32">
        <Reveal delay={0.1}>
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-white/70">
            <Sparkles className="w-3.5 h-3.5 text-[color:var(--color-brand-a)]" />
            A parent company of four future-shaping brands
          </div>
        </Reveal>

        <h1 className="mt-8 font-display text-white text-[13vw] md:text-[9vw] leading-[0.9] tracking-tight">
          <div className="overflow-hidden">
            <SplitWords text="Building digital" />
          </div>
          <div className="overflow-hidden">
            <span className="gradient-text italic">
              <SplitWords text="experiences" delay={0.15} />
            </span>
          </div>
          <div className="overflow-hidden">
            <SplitWords text="through innovation." delay={0.3} />
          </div>
        </h1>

        <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <Reveal delay={0.6} className="max-w-lg text-white/60 text-base md:text-lg text-balance">
            EX-Creative Technology is the parent studio behind EX-Media, EX-Technology,
            EX-Edu and EX-Bot — engineering cinematic products at the intersection of design,
            AI, learning and automation.
          </Reveal>
          <Reveal delay={0.8} className="flex flex-wrap gap-3">
            <MagneticButton href="#companies">
              Explore the ecosystem <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton href="#about" variant="ghost">
              <Play className="w-3.5 h-3.5" /> Our story
            </MagneticButton>
          </Reveal>
        </div>

        <Reveal delay={1} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
          {[
            ["04", "brands under one roof"],
            ["120+", "digital experiences shipped"],
            ["18", "countries reached"],
            ["99.98%", "uptime across products"],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="font-display text-3xl md:text-4xl text-white">{k}</div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/40 mt-1">{v}</div>
            </div>
          ))}
        </Reveal>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-[10px] tracking-[0.4em] uppercase">
        Scroll · Enter the ecosystem
      </div>
    </section>
  );
}

function FloatingOrbs() {
  const orbs = [
    { size: 320, top: "10%", left: "6%", d: 0 },
    { size: 220, top: "62%", left: "78%", d: 1 },
    { size: 160, top: "78%", left: "18%", d: 2 },
    { size: 100, top: "22%", left: "82%", d: 0.5 },
  ];
  return (
    <>
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none blur-2xl"
          style={{
            width: o.size,
            height: o.size,
            top: o.top,
            left: o.left,
            background: `radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--color-brand-a) 30%, transparent), transparent 70%)`,
          }}
          animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
          transition={{ duration: 10 + o.d * 2, repeat: Infinity, ease: "easeInOut", delay: o.d }}
        />
      ))}
    </>
  );
}

/* ============================================================
   Marquee
   ============================================================ */
function Marquee() {
  const words = [
    "Creative Engineering",
    "AI",
    "Motion Design",
    "Product Studio",
    "Automation",
    "Immersive UX",
    "Cinematic Web",
    "Cloud Native",
    "Education",
  ];
  return (
    <div className="relative py-8 border-y border-white/10 overflow-hidden bg-black/30">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...words, ...words, ...words].map((w, i) => (
          <span
            key={i}
            className="mx-8 font-display text-3xl md:text-5xl text-white/20 hover:text-white/70 transition-colors"
          >
            {w} <span className="text-[color:var(--color-brand-a)]">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Companies
   ============================================================ */
type Company = {
  key: Exclude<keyof typeof PALETTES, "parent">;
  code: string;
  name: string;
  tagline: string;
  desc: string;
  Icon: typeof Clapperboard;
  stats: [string, string][];
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
  },
];

function Companies() {
  return (
    <section id="companies" className="relative">
      <SectionIntro
        eyebrow="The Ecosystem"
        title="Four studios. One creative engine."
        copy="Each brand is fully independent — with its own team, tools and identity. Together, they cover the full arc from imagination to automation."
      />
      {COMPANIES.map((c, i) => (
        <CompanySection key={c.key} c={c} index={i} />
      ))}
    </section>
  );
}

function CompanySection({ c, index }: { c: Company; index: number }) {
  const p = PALETTES[c.key];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const bigOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.18, 0.05]);
  const Icon = c.Icon;

  return (
    <div
      ref={ref}
      data-palette=""
      data-palette-a={p.a}
      data-palette-b={p.b}
      data-palette-c={p.c}
      data-palette-bg={p.bg}
      className="relative min-h-[100svh] flex items-center overflow-hidden py-32 noise"
    >
      <div className="aurora" />
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Gigantic bg number */}
      <motion.div
        style={{ opacity: bigOpacity }}
        className="absolute -right-8 top-1/2 -translate-y-1/2 font-display font-bold text-[42vw] leading-none text-white pointer-events-none select-none"
      >
        {c.code}
      </motion.div>

      <div className="relative z-10 w-[min(1200px,94vw)] mx-auto grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-6">
          <Reveal>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/50">
              <span>{c.code}</span>
              <span className="w-8 h-px bg-white/30" />
              <span>Company</span>
            </div>
          </Reveal>
          <h3 className="mt-6 font-display text-white text-6xl md:text-8xl leading-[0.95] tracking-tight">
            <SplitWords text={c.name} />
          </h3>
          <Reveal delay={0.2} className="mt-4 text-xl md:text-2xl gradient-text italic font-display">
            {c.tagline}
          </Reveal>
          <Reveal delay={0.35} className="mt-6 max-w-xl text-white/60 leading-relaxed">
            {c.desc}
          </Reveal>

          <Reveal delay={0.5} className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            {c.stats.map(([k, v]) => (
              <div key={k} className="glass rounded-xl p-4">
                <div className="font-display text-2xl text-white">{k}</div>
                <div className="text-[10px] mt-1 uppercase tracking-widest text-white/50">{v}</div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.65} className="mt-8">
            <MagneticButton href="#contact">
              Visit {c.name} <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
          </Reveal>
        </div>

        {/* Visual */}
        <div className="md:col-span-6 relative h-[500px]">
          <motion.div
            style={{ y: y1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative w-[380px] h-[380px]">
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-70"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${p.a}, transparent 60%), radial-gradient(circle at 70% 70%, ${p.b}, transparent 60%)`,
                }}
              />
              <div className="absolute inset-6 glass rounded-3xl flex flex-col justify-between p-8">
                <div className="flex items-center justify-between">
                  <Icon className="w-8 h-8 text-white" />
                  <span className="text-white/40 font-mono text-xs">{c.code}/04</span>
                </div>
                <div>
                  <div className="text-white/50 text-xs uppercase tracking-widest">
                    Now shipping
                  </div>
                  <div className="mt-2 font-display text-3xl text-white">{c.name}</div>
                  <div className="mt-4 h-1 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: "20%" }}
                      whileInView={{ width: "84%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, ease: "easeOut" }}
                      className="h-full"
                      style={{ background: p.a }}
                    />
                  </div>
                </div>
              </div>
              {/* Orbiting dots */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
                  style={
                    {
                      background: p.a,
                      boxShadow: `0 0 20px ${p.a}`,
                      "--r": `${180 + i * 20}px`,
                    } as React.CSSProperties
                  }
                  animate={{ rotate: 360 }}
                  transition={{ duration: 14 + i * 3, repeat: Infinity, ease: "linear" }}
                >
                  <span
                    className="block w-3 h-3 rounded-full"
                    style={{ transform: `translateX(${180 + i * 20}px)` }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Floating chips */}
          <motion.div style={{ y: y2 }} className="absolute inset-0 pointer-events-none">
            {CompanyBadges(c, index)}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function CompanyBadges(c: Company, i: number) {
  const chips: Record<Company["key"], { label: string; x: string; y: string }[]> = {
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
      className="absolute glass rounded-full px-3 py-1.5 text-xs text-white/80 animate-float-slow"
      style={{ left: chip.x, top: chip.y, animationDelay: `${(i + idx) * 0.5}s` }}
    >
      {chip.label}
    </motion.div>
  ));
}

/* ============================================================
   Section helper
   ============================================================ */
function SectionIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="relative w-[min(1200px,94vw)] mx-auto pt-32 pb-16">
      <Reveal>
        <div className="text-xs uppercase tracking-[0.3em] text-white/50">— {eyebrow}</div>
      </Reveal>
      <h2 className="mt-4 font-display text-white text-5xl md:text-7xl tracking-tight leading-[0.95] max-w-4xl">
        <SplitWords text={title} />
      </h2>
      <Reveal delay={0.3} className="mt-5 max-w-2xl text-white/60">
        {copy}
      </Reveal>
    </div>
  );
}

/* ============================================================
   Tech Orbit
   ============================================================ */
function TechShowcase() {
  const tech = [
    { name: "React", Icon: Code2 },
    { name: "Next.js", Icon: Layers },
    { name: "TypeScript", Icon: Code2 },
    { name: "Node.js", Icon: Cpu },
    { name: "MongoDB", Icon: Database },
    { name: "Tailwind", Icon: Sparkles },
    { name: "Docker", Icon: Layers },
    { name: "AWS", Icon: Cloud },
    { name: "OpenAI", Icon: Zap },
    { name: "Python", Icon: Code2 },
    { name: "Meta", Icon: Globe },
    { name: "Cloudflare", Icon: Cloud },
  ];
  return (
    <section
      id="tech"
      data-palette=""
      data-palette-a={PALETTES.parent.a}
      data-palette-b={PALETTES.parent.b}
      data-palette-c={PALETTES.parent.c}
      data-palette-bg={PALETTES.parent.bg}
      className="relative overflow-hidden noise"
    >
      <div className="aurora" />
      <SectionIntro
        eyebrow="Technology"
        title="The stack behind every experience."
        copy="We're pragmatic maximalists — the right tool for the job, wired together with taste. Everything below powers something we ship every week."
      />
      <div className="relative w-[min(1200px,94vw)] mx-auto pb-32 grid md:grid-cols-2 gap-16 items-center">
        {/* Orbit */}
        <div className="relative h-[520px] flex items-center justify-center">
          <div
            className="absolute w-[420px] h-[420px] rounded-full border border-white/10"
            style={{ boxShadow: "inset 0 0 80px rgba(255,255,255,0.03)" }}
          />
          <div className="absolute w-[300px] h-[300px] rounded-full border border-white/10" />
          <div className="absolute w-[160px] h-[160px] rounded-full border border-white/10" />
          <div className="absolute w-24 h-24 rounded-full glass flex items-center justify-center font-display text-2xl text-white">
            EX
          </div>
          {tech.map((t, i) => {
            const ring = i % 3;
            const radius = ring === 0 ? 80 : ring === 1 ? 150 : 210;
            const total = tech.filter((_, j) => j % 3 === ring).length;
            const idxInRing = Math.floor(i / 3);
            const angle = (idxInRing / total) * Math.PI * 2 + ring;
            const speed = 30 + ring * 10;
            return (
              <motion.div
                key={t.name}
                className="absolute"
                style={{ left: "50%", top: "50%" }}
                animate={{ rotate: 360 }}
                transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
              >
                <div
                  style={{
                    transform: `rotate(${(angle * 180) / Math.PI}deg) translateX(${radius}px)`,
                  }}
                >
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
                    className="glass rounded-full px-3 py-1.5 text-xs text-white/80 flex items-center gap-1.5 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
                  >
                    <t.Icon className="w-3 h-3 text-[color:var(--color-brand-a)]" />
                    {t.name}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Copy */}
        <div>
          <Reveal className="text-white/60 max-w-lg">
            React, TypeScript, cloud-native infra, edge compute, and a growing ML stack.
            We build with what will still be here in five years.
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {[
              ["Front-end", "React · TS · Motion · R3F"],
              ["Back-end", "Node · Python · Postgres"],
              ["Infra", "AWS · Cloudflare · Docker"],
              ["AI", "OpenAI · custom RAG · agents"],
            ].map(([k, v]) => (
              <Reveal key={k} className="glass rounded-2xl p-4">
                <div className="text-xs uppercase tracking-widest text-white/40">{k}</div>
                <div className="mt-1 text-sm text-white">{v}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Services
   ============================================================ */
function Services() {
  const services = [
    {
      title: "Product Engineering",
      copy: "From prototype to production. Web platforms, mobile, and internal tools built with a design-engineer mindset.",
      tag: "Build",
    },
    {
      title: "Brand & Motion",
      copy: "Identity systems, cinematic motion, and content that make your product feel inevitable.",
      tag: "Design",
    },
    {
      title: "AI & Automation",
      copy: "Custom agents, copilots, RAG systems and WhatsApp-first workflows that actually replace work.",
      tag: "Intelligence",
    },
    {
      title: "Learning Programs",
      copy: "Cohort-based training on modern web, AI and creative engineering — for teams and individuals.",
      tag: "Grow",
    },
  ];
  return (
    <section id="services" className="relative">
      <SectionIntro
        eyebrow="Services"
        title="How we work with you."
        copy="Four studios means the entire arc — strategy, brand, product, AI and enablement — all under one roof, moving at one speed."
      />
      <div className="w-[min(1200px,94vw)] mx-auto pb-32 grid md:grid-cols-2 gap-6">
        {services.map((s, i) => (
          <ServiceCard key={s.title} {...s} index={i} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({
  title,
  copy,
  tag,
  index,
}: {
  title: string;
  copy: string;
  tag: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
        const y = ((e.clientY - r.top) / r.height - 0.5) * -10;
        setT({ x, y });
      }}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      style={{ transform: `perspective(1000px) rotateY(${t.x}deg) rotateX(${t.y}deg)` }}
      className="relative group glass rounded-3xl p-8 md:p-10 overflow-hidden transition-transform"
      data-cursor="hover"
    >
      <div
        className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity"
        style={{
          background: `radial-gradient(circle, var(--color-brand-a), transparent 60%)`,
        }}
      />
      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-white/40">{tag}</span>
          <span className="font-mono text-xs text-white/40">0{index + 1}</span>
        </div>
        <h3 className="mt-6 font-display text-3xl md:text-4xl text-white">{title}</h3>
        <p className="mt-4 text-white/60 max-w-md">{copy}</p>
        <div className="mt-8 flex items-center gap-2 text-sm text-[color:var(--color-brand-a)]">
          Learn more <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   About / Timeline
   ============================================================ */
function About() {
  const timeline = [
    ["2019", "Founded", "EX-Creative Technology begins as a two-person studio building brand systems for startups."],
    ["2021", "EX-Media", "Media arm formed. First cinematic campaign hits 40M views."],
    ["2022", "EX-Technology", "Engineering team spins up. Ships flagship AI product."],
    ["2024", "EX-Edu", "Launches learner-first education platform. 10K students in year one."],
    ["2025", "EX-Bot", "WhatsApp-native automation product ships to 500+ businesses."],
    ["2026", "Global", "18 countries, 4 studios, one creative engine."],
  ];
  return (
    <section id="about" className="relative">
      <SectionIntro
        eyebrow="About"
        title="A studio built for the next decade."
        copy="We started with a simple thesis: the best products are built where craft, engineering and story meet. Seven years in, we're still writing that story."
      />
      <div className="w-[min(1200px,94vw)] mx-auto pb-32">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            ["Mission", "Make the internet feel handmade again — through cinematic products people love."],
            ["Vision", "A future where design, engineering and AI collaborate as one craft."],
            ["Values", "Taste. Rigor. Speed. Kindness. In that order, on repeat."],
          ].map(([k, v]) => (
            <Reveal key={k} className="glass rounded-3xl p-8">
              <div className="text-xs uppercase tracking-widest text-white/40">{k}</div>
              <div className="mt-3 text-lg text-white/80">{v}</div>
            </Reveal>
          ))}
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10" />
          {timeline.map(([year, title, copy], i) => (
            <Reveal key={year} delay={i * 0.05} className="relative pl-14 md:pl-0 mb-12 md:grid md:grid-cols-2 md:gap-16">
              <div
                className={
                  i % 2 === 0
                    ? "md:text-right md:pr-16"
                    : "md:col-start-2 md:pl-16"
                }
              >
                <div className="font-display text-4xl md:text-6xl gradient-text">{year}</div>
                <div className="mt-2 text-xl text-white">{title}</div>
                <div className="mt-1 text-white/60 text-sm max-w-sm md:max-w-none md:inline-block">
                  {copy}
                </div>
              </div>
              <div className="absolute left-2 md:left-1/2 top-3 -translate-x-1/2 w-4 h-4 rounded-full bg-[color:var(--color-brand-a)]">
                <span
                  className="absolute inset-0 rounded-full"
                  style={{
                    boxShadow: `0 0 0 6px color-mix(in oklab, var(--color-brand-a) 25%, transparent)`,
                  }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Contact
   ============================================================ */
function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="w-[min(1200px,94vw)] mx-auto pt-24 pb-32 grid md:grid-cols-2 gap-12">
        <div>
          <Reveal>
            <div className="text-xs uppercase tracking-[0.3em] text-white/50">— Contact</div>
          </Reveal>
          <h2 className="mt-4 font-display text-white text-5xl md:text-7xl leading-[0.95]">
            <SplitWords text="Say hello." />
          </h2>
          <Reveal delay={0.3} className="mt-6 max-w-md text-white/60">
            Tell us about your project — a brand launch, a new product, an AI experiment.
            We reply within one business day.
          </Reveal>

          <div className="mt-10 space-y-4 text-white/70">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[color:var(--color-brand-a)]" />
              hello@ex-creative.tech
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[color:var(--color-brand-a)]" />
              +91 000 000 0000
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[color:var(--color-brand-a)]" />
              Mumbai · Bengaluru · Remote
            </div>
          </div>
        </div>

        <Reveal delay={0.2} className="glass rounded-3xl p-8 relative overflow-hidden">
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-40"
            style={{ background: "radial-gradient(circle, var(--color-brand-a), transparent 60%)" }}
          />
          <form
            onSubmit={(e) => e.preventDefault()}
            className="relative space-y-5"
          >
            {[
              { l: "Your name", t: "text", p: "Ada Lovelace" },
              { l: "Email", t: "email", p: "you@company.com" },
              { l: "Company", t: "text", p: "Where do you work?" },
            ].map((f) => (
              <label key={f.l} className="block">
                <span className="text-xs uppercase tracking-widest text-white/50">{f.l}</span>
                <input
                  type={f.t}
                  placeholder={f.p}
                  className="mt-2 w-full bg-transparent border-b border-white/15 focus:border-[color:var(--color-brand-a)] outline-none py-3 text-white placeholder:text-white/25 transition-colors"
                />
              </label>
            ))}
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-white/50">Project</span>
              <textarea
                rows={4}
                placeholder="Tell us what you're building…"
                className="mt-2 w-full bg-transparent border-b border-white/15 focus:border-[color:var(--color-brand-a)] outline-none py-3 text-white placeholder:text-white/25 transition-colors resize-none"
              />
            </label>
            <div className="pt-2">
              <MagneticButton>
                Send message <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   Footer
   ============================================================ */
function Footer() {
  return (
    <footer className="relative min-h-[70svh] flex flex-col justify-between overflow-hidden noise pt-24 pb-8">
      <div className="aurora" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative w-[min(1400px,96vw)] mx-auto">
        <h2 className="font-display text-white text-[12vw] md:text-[9vw] leading-[0.9] tracking-tight">
          <div className="overflow-hidden">
            <SplitWords text="Let's build" />
          </div>
          <div className="overflow-hidden">
            <span className="gradient-text italic">
              <SplitWords text="something extraordinary." delay={0.2} />
            </span>
          </div>
        </h2>

        <div className="mt-16 flex flex-wrap gap-4">
          <MagneticButton href="#contact">
            Start a project <ArrowUpRight className="w-4 h-4" />
          </MagneticButton>
          <MagneticButton href="mailto:hello@ex-creative.tech" variant="ghost">
            <Mail className="w-4 h-4" /> hello@ex-creative.tech
          </MagneticButton>
        </div>
      </div>

      <div className="relative w-[min(1400px,96vw)] mx-auto mt-20 pt-8 border-t border-white/10 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-display text-white text-xl">EX·Creative Technology, LLP</div>
          <div className="text-white/50 mt-2 max-w-xs">
            Parent studio of EX-Media, EX-Technology, EX-Edu and EX-Bot.
          </div>
        </div>
        <FooterCol
          title="Studios"
          items={["EX-Media", "EX-Technology", "EX-Edu", "EX-Bot"]}
        />
        <FooterCol
          title="Company"
          items={["About", "Services", "Careers", "Press"]}
        />
        <div>
          <div className="text-xs uppercase tracking-widest text-white/50">Follow</div>
          <div className="mt-3 flex gap-3">
            {[Instagram, Twitter, Linkedin, Github].map((I, i) => (
              <a
                key={i}
                href="#"
                className="glass w-10 h-10 rounded-full grid place-items-center text-white/70 hover:text-white hover:scale-110 transition"
                data-cursor="hover"
              >
                <I className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-[min(1400px,96vw)] mx-auto mt-8 flex justify-between text-xs text-white/40">
        <span>© {new Date().getFullYear()} EX-Creative Technology, LLP. All rights reserved.</span>
        <span className="font-mono">v1.0 · Handcrafted with taste</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-white/50">{title}</div>
      <ul className="mt-3 space-y-2">
        {items.map((i) => (
          <li key={i}>
            <a
              href="#"
              className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-1"
            >
              {i} <ArrowUpRight className="w-3 h-3 opacity-50" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============================================================
   Page
   ============================================================ */
function HomePage() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative bg-background text-foreground overflow-hidden">
      {loading && <Loader onDone={() => setLoading(false)} />}
      <SmoothScroll />
      <Cursor />
      <ThemeSwapper />
      <ScrollProgress />
      <Nav />

      <main>
        <Hero />
        <Marquee />
        <Companies />
        <TechShowcase />
        <Services />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

function _typeGuard(_: ReactNode) {}
_typeGuard(null);
