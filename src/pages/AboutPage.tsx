import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Sparkles, Award, ShieldCheck, Rocket, HeartHandshake, Layers, Code2, Users } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { Reveal, MagneticButton } from "@/components/Reveal";

/* ── Timeline ─────────────────────────────────────────────── */
const TIMELINE = [
  { year: "2019", title: "Founded",       desc: "EX-Creative Technology begins as a two-person design engineering studio building brand systems for tech startups.", tag: "Inception" },
  { year: "2021", title: "EX-Media",      desc: "Media & creative arm formed. First cinematic digital campaign hits 40M+ views across global platforms.", tag: "Expansion" },
  { year: "2022", title: "EX-Technology", desc: "Engineering team spins up. Ships flagship cloud AI platform maintaining 99.98% uptime from day one.", tag: "Scale" },
  { year: "2024", title: "EX-Edu",        desc: "Launches learner-first outcome-driven education platform with over 10K active students enrolled.", tag: "Education" },
  { year: "2025", title: "EX-Bot",        desc: "WhatsApp-native conversational automation product ships to over 500 businesses globally.", tag: "Automation" },
  { year: "2026", title: "Global Ecosystem", desc: "18 countries, 4 independent studios under one creative engine — and we're just getting started.", tag: "Global" },
];

/* ── Core Values ───────────────────────────────────────────── */
const VALUES = [
  { icon: Award,          tag: "Obsessive Taste",   desc: "We care about aesthetics at a fundamental level — every micro-interaction, font weight, and color token matters." },
  { icon: ShieldCheck,    tag: "Engineering Rigor", desc: "We build platforms that hold up under immense pressure, with clean architecture and strict quality standards." },
  { icon: Rocket,         tag: "Bias Toward Action",desc: "Build, test, learn, iterate. We move at extraordinary speed without sacrificing code quality." },
  { icon: HeartHandshake, tag: "Radical Empathy",   desc: "We treat every client, team member, and line of code with deep care and long-term commitment." },
];

/* ── Team / Craft Highlights ───────────────────────────────── */
const STATS = [
  { label: "Years of Craft", value: "07+", icon: Sparkles },
  { label: "Global Team",     value: "45+", icon: Users },
  { label: "Products Shipped",value: "120+",icon: Code2 },
  { label: "Client NPS",       value: "98%", icon: ShieldCheck },
];

/* ── Parallax Image Strip ──────────────────────────────────── */
function ParallaxImageStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="relative py-16 overflow-hidden border-y border-white/[0.08] bg-black/40">
      <div className="w-[min(1280px,94vw)] mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left Image Card */}
        <motion.div style={{ y: y1 }} className="relative rounded-3xl overflow-hidden glass border border-white/15 shadow-2xl h-[320px] sm:h-[400px]">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
            alt="EX-Creative Team Collaborating"
            className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#00E5FF]">STUDIO CULTURE</span>
              <h4 className="font-display text-xl text-white font-bold mt-1">Design & Engineering Workshop</h4>
            </div>
            <span className="glass rounded-full px-3 py-1 text-xs text-white/80 border border-white/20">Mumbai HQ</span>
          </div>
        </motion.div>

        {/* Right Image Card */}
        <motion.div style={{ y: y2 }} className="relative rounded-3xl overflow-hidden glass border border-white/15 shadow-2xl h-[320px] sm:h-[400px]">
          <img
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80"
            alt="Futuristic Tech Lab"
            className="w-full h-full object-cover opacity-75 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#A855F7]">RESEARCH & LABS</span>
              <h4 className="font-display text-xl text-white font-bold mt-1">AI & Interactive Media Lab</h4>
            </div>
            <span className="glass rounded-full px-3 py-1 text-xs text-white/80 border border-white/20">Bengaluru</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── About Page Component ──────────────────────────────────── */
export default function AboutPage() {
  return (
    <div className="bg-[#050505]">
      {/* Page Hero */}
      <PageHero
        eyebrow="About EX-Creative"
        headingLine1="We engineering"
        headingLine2="the future of digital."
        subtext="A parent studio of four independent specialized brands — building products, brands, AI systems and learning paths that move culture."
      >
        <div className="flex flex-wrap gap-4">
          <MagneticButton href="/contact">
            Work with us <ArrowUpRight className="w-4 h-4 ml-1" />
          </MagneticButton>
          <MagneticButton href="/services" variant="ghost">
            Our services
          </MagneticButton>
        </div>
      </PageHero>

      {/* Stats Counter Strip */}
      <section className="relative py-12 border-y border-white/[0.08] bg-white/[0.01]">
        <div className="w-[min(1280px,94vw)] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(({ label, value, icon: Icon }) => (
            <div key={label} className="glass rounded-2xl p-6 border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center shrink-0 border border-white/15">
                <Icon className="w-6 h-6 text-[color:var(--color-brand-a)]" />
              </div>
              <div>
                <span className="font-display text-3xl font-bold text-white block">{value}</span>
                <span className="text-xs text-white/50">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Image Strip */}
      <ParallaxImageStrip />

      {/* Timeline Section */}
      <section className="relative py-24 md:py-32">
        <div className="w-[min(1100px,94vw)] mx-auto">
          <SectionIntro
            eyebrow="Our Story"
            title="Seven years of continuous craft."
            copy="From a two-person design engineering shop to a multi-studio holding group operating across 18 countries."
            className="mb-16"
          />

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10" />
            <div className="flex flex-col gap-12">
              {TIMELINE.map(({ year, title, desc, tag }, i) => (
                <Reveal key={year} delay={i * 0.05} className="relative pl-12 md:pl-0">
                  <div className={`md:grid md:grid-cols-2 md:gap-16 ${i % 2 !== 0 ? "md:[direction:rtl]" : ""}`}>
                    <div className={`${i % 2 !== 0 ? "md:[direction:ltr] md:text-left" : "md:text-right md:pr-16"} md:pl-0 pl-4`}>
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest glass text-[color:var(--color-brand-a)] border border-white/10 mb-2">
                        {tag}
                      </span>
                      <span className="font-display text-4xl sm:text-5xl font-bold gradient-text block">{year}</span>
                      <span className="text-xl text-white font-display font-semibold mt-1 block">{title}</span>
                      <p className="text-white/60 text-sm mt-2 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-[9px] md:left-[calc(50%-7px)] top-2 w-3.5 h-3.5 rounded-full bg-[color:var(--color-brand-a)] ring-4 ring-[color:var(--color-brand-a)]/30" />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-24 md:py-28 border-t border-white/[0.08]">
        <div className="w-[min(1280px,94vw)] mx-auto">
          <SectionIntro
            eyebrow="Our Mindset"
            title="Core principles we live by."
            copy="Not corporate buzzwords on a wall — practical guidelines for how we write code, design products, and ship."
            className="mb-14"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, tag, desc }, i) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="glass rounded-3xl p-7 border border-white/10 hover:border-white/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-[color:var(--color-brand-a)]" />
                </div>
                <h3 className="font-display text-xl text-white font-bold mb-3">{tag}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
