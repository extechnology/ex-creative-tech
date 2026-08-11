import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import {
    ArrowUpRight,
    Code2, Bot, GraduationCap, Clapperboard, Zap,
    Eye, Palette, Award, Rocket, Server, Cpu, Users, MessageCircle, Building2,
} from "lucide-react";
import { Reveal, MagneticButton } from "@/components/Reveal";



/* ── Palettes for section-based theme swaps ────────────────── */
const PALETTES = {
    parent: { a: "#ffffff", b: "#c9c9d1", c: "#6b6b76", bg: "#050505" },
    media: { a: "#D81B60", b: "#8A2BE2", c: "#FF6EC7", bg: "#0a040e" },
    tech: { a: "#CC01FF", b: "#00E5FF", c: "#7CC9FF", bg: "#05030f" },
    edu: { a: "#A855F7", b: "#7C3AED", c: "#E9D5FF", bg: "#0a0616" },
    bot: { a: "#25D366", b: "#22C55E", c: "#86EFAC", bg: "#03110a" },
} as const;


/* ── Original Full-Screen Company Sections ─────────────────── */
type CompanyKey = Exclude<keyof typeof PALETTES, "parent">;

type Company = {
    key: CompanyKey;
    anchorId: string;
    code: string;
    name: string;
    titleLine1: string;
    titleLine2: string;
    url: string;
    tagline: string;
    desc: string;
    logo: string;
    Icon: typeof Clapperboard;
    stats: [string, string][];
    statIcons: (typeof Clapperboard)[];
};

const COMPANIES: Company[] = [
    {
        key: "media",
        anchorId: "ex-media",
        code: "01",
        name: "ex-media",
        titleLine1: "Creative Media",
        titleLine2: "& Studio",
        url: "https://www.exmedia.in/",
        tagline: "Creative that moves culture.",
        desc: "A full-service creative studio building brand systems, campaigns, motion design and content that stops the scroll and starts conversations.",
        logo: "/ex-media-logo.png",
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
        anchorId: "ex-technology",
        code: "02",
        name: "ex-technology",
        titleLine1: "Engineering",
        titleLine2: "& AI Systems",
        url: "https://extechnology.in/",
        tagline: "Engineering at the edge.",
        desc: "Custom software, cloud infrastructure and AI systems. We ship production-grade platforms for teams that treat engineering as leverage.",
        logo: "/ex-tech-logo.png",
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
        anchorId: "ex-edu",
        code: "03",
        name: "ex-edu",
        titleLine1: "AI Learning",
        titleLine2: "& Mentorship",
        url: "https://exedu.in/",
        tagline: "The future of learning, personal.",
        desc: "AI-native learning paths and mentorship for the next generation of builders. Curriculum designed around outcomes, not attendance.",
        logo: "/ex-edu-logo.png",
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
        anchorId: "ex-bot",
        code: "04",
        name: "ex-bot",
        titleLine1: "WhatsApp",
        titleLine2: "& AI Automation",
        url: "https://exbot.in/",
        tagline: "Automate business, humanly.",
        desc: "WhatsApp-first AI agents, workflow automation and conversational commerce that feels like a great teammate — not a chatbot.",
        logo: "/ex-bot-logo.png",
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
            id={c.anchorId}
            ref={ref}
            data-palette=""
            data-palette-a={p.a}
            data-palette-b={p.b}
            data-palette-c={p.c}
            data-palette-bg={p.bg}
            className="relative min-h-[100svh] scroll-mt-28 flex items-center overflow-hidden py-20 sm:py-28 md:py-32 noise transition-colors duration-700"
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
                className="absolute -right-8 top-1/2 -translate-y-1/2 font-bold text-[55vw] leading-none text-white pointer-events-none select-none md:text-[42vw]"
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
                        <h3 className="mt-3 font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight sm:mt-4">
                            <span className="block sm:whitespace-nowrap">{c.titleLine1}</span>
                            <span className="block sm:whitespace-nowrap">{c.titleLine2}</span>
                        </h3>
                    </Reveal>

                    {/* Stat cards right under the name / label block */}
                    <Reveal delay={0.3} className="mt-6 grid grid-cols-3 gap-3 max-w-xl sm:mt-7 sm:gap-4">
                        {c.stats.map(([k, v], si) => {
                            const StatIcon = c.statIcons[si];
                            return (
                                <div key={k} className="glass rounded-2xl p-4 sm:p-5 md:p-6">
                                    <StatIcon className="mb-2 h-4 w-4 text-white/50 sm:mb-3 sm:h-5 sm:w-5" />
                                    <div className="text-xl text-white sm:text-2xl md:text-3xl">{k}</div>
                                    <div className="mt-1 text-[10px] uppercase tracking-widest text-white/50 sm:text-[11px]">{v}</div>
                                </div>
                            );
                        })}
                    </Reveal>

                    <Reveal delay={0.45} className="mt-6 text-xl gradient-text italic sm:text-2xl md:text-4xl">
                        {c.tagline}
                    </Reveal>
                    <Reveal delay={0.55} className="mt-5 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
                        {c.desc}
                    </Reveal>

                    <Reveal delay={0.65} className="mt-8">
                        <a href={c.url} target="_blank" rel="noopener noreferrer" className="inline-block">
                            <MagneticButton>
                                Visit {c.name} <ArrowUpRight className="w-4 h-4" />
                            </MagneticButton>
                        </a>
                    </Reveal>
                </div>

                {/* Visual side */}
                <div className="md:col-span-6 relative h-[320px] sm:h-[440px] md:h-[500px]">
                    <motion.div style={{ y: y1, willChange: "transform" }} className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
                            {/* Ambient Glow blob matched with company palette */}
                            <div
                                className="absolute inset-0 rounded-full blur-3xl opacity-70 pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle at 40% 40%, ${p.a}aa, transparent 70%), radial-gradient(circle at 60% 60%, ${p.b}88, transparent 70%)`,
                                }}
                            />
                            {/* Card — kept transparent so the background number reads through */}
                            <div className="absolute inset-2 sm:inset-4 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md flex flex-col justify-between p-5 sm:p-7 md:p-8 overflow-hidden group transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05]">
                                {/* Soft ambient inner glow matched with logo color (no dot) */}
                                <div
                                    className="absolute inset-0 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(circle at 50% 50%, ${p.a}, transparent 75%)`,
                                    }}
                                />

                                <div className="flex items-center justify-between z-10">
                                    <div className="flex items-center gap-2">
                                        <Icon className="w-5 h-5 text-white/70 sm:w-6 sm:h-6" />
                                        <span className="text-xs font-mono text-white/50 tracking-wider uppercase hidden sm:inline">{c.key}</span>
                                    </div>
                                    <span className="text-white/40 font-mono text-xs">{c.code}/04</span>
                                </div>

                                {/* Center Company Logo Display - Clean & Larger */}
                                <div className="my-auto py-2 px-2 flex items-center justify-center relative z-10 min-h-[140px] sm:min-h-[180px]">
                                    <motion.img
                                        src={c.logo}
                                        alt={`${c.name} Logo`}
                                        initial={{ scale: 0.9, opacity: 0.9 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        whileHover={{ scale: 1.05 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        className="relative h-28 sm:h-36 md:h-44 max-h-[180px] sm:max-h-[220px] w-auto max-w-[92%] object-contain filter drop-shadow-[0_12px_30px_rgba(0,0,0,0.7)]"
                                    />
                                </div>

                                <div className="z-10">
                                    <div className="text-white/50 text-[10px] sm:text-xs uppercase tracking-widest font-mono">Now shipping</div>
                                    <div className="mt-1 text-xl text-white sm:text-2xl md:text-3xl">{c.name}</div>
                                    <div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden">
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



export default function Companies() {
    return (
        <section id="companies" className="relative">
            {COMPANIES.map((c, i) => (
                <CompanySection key={c.key} c={c} index={i} />
            ))}
        </section>
    );
}
