import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight, Code2, Bot, GraduationCap, Clapperboard,
  Cpu, Cloud, Database, Layers, Zap, Globe, Sparkles, Plus, Minus, CheckCircle2,
} from "lucide-react";
import ServicesHero from "@/components/services/ServicesHero";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { Reveal, MagneticButton } from "@/components/Reveal";

/* ── Services Data ─────────────────────────────────────────── */
const SERVICES = [
  {
    num: "01",
    title: "Product Engineering",
    tag: "Build",
    Icon: Code2,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80",
    desc: "From rapid prototype to production-grade platform. Full-stack web, mobile, and internal tools built with a design-engineer mindset.",
    details: ["React · Next.js · TypeScript", "REST & GraphQL APIs", "Cloud Infrastructure · CI/CD", "Edge Performance Optimization"],
    palette: "#00E5FF",
  },
  {
    num: "02",
    title: "Brand & Motion Design",
    tag: "Design",
    Icon: Clapperboard,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    desc: "3D motion graphics, brand design systems, and cinematic content that makes your product feel inevitable and stops the scroll.",
    details: ["Brand Identity Systems", "Cinematic 3D Motion", "Campaign Production", "Content Strategy & Direction"],
    palette: "#FF2A85",
  },
  {
    num: "03",
    title: "AI & Automation",
    tag: "Intelligence",
    Icon: Bot,
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1000&q=80",
    desc: "Custom RAG pipelines, fine-tuned LLM agents, and WhatsApp-first automated workflows that eliminate repetitive work.",
    details: ["Custom LLM Agent Pipelines", "WhatsApp API Integration", "Enterprise RAG Systems", "Workflow Automation"],
    palette: "#00E676",
  },
  {
    num: "04",
    title: "Learning Programs",
    tag: "Grow",
    Icon: GraduationCap,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80",
    desc: "Cohort-based technical training and AI mentorship for team enablement — curriculum designed around real production outcomes.",
    details: ["Live Cohort Bootcamps", "1:1 Technical Mentorship", "Enterprise Team Upskilling", "AI-Native Curriculum"],
    palette: "#B537FF",
  },
];

/* ── Service Row with Image Preview ────────────────────────── */
function ServiceRow({ svc, index }: { svc: typeof SERVICES[number]; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      className="border-b border-white/[0.08] overflow-hidden"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-7 text-left group"
        data-cursor="hover"
      >
        <div className="flex items-center gap-5 md:gap-8">
          <span className="font-mono text-xs text-white/30">{svc.num}</span>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
            style={{
              background: open ? `${svc.palette}25` : "rgba(255,255,255,0.04)",
              border: `1px solid ${open ? svc.palette + "50" : "rgba(255,255,255,0.08)"}`,
            }}
          >
            <svc.Icon className="w-5 h-5 transition-colors" style={{ color: open ? svc.palette : "rgba(255,255,255,0.6)" }} />
          </div>
          <div>
            <span className="font-display text-2xl sm:text-3xl text-white font-bold group-hover:text-white/80 transition-colors">
              {svc.title}
            </span>
            <span
              className="ml-3 text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full hidden md:inline-flex border"
              style={{ background: `${svc.palette}15`, color: svc.palette, borderColor: `${svc.palette}40` }}
            >
              {svc.tag}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-white/40 shrink-0 ml-4">
          <span className="text-xs hidden md:block font-mono">{open ? "CLOSE" : "EXPAND"}</span>
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        style={{ overflow: "hidden" }}
      >
        <div className="pb-8 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <p className="text-white/65 text-base sm:text-lg leading-relaxed">{svc.desc}</p>
            <div className="grid sm:grid-cols-2 gap-3 mt-2">
              {svc.details.map((d) => (
                <div key={d} className="glass rounded-xl p-3.5 border border-white/10 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: svc.palette }} />
                  <span className="text-sm text-white/80 font-medium">{d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden glass border border-white/15 h-[220px]">
            <img src={svc.image} alt={svc.title} className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <span className="text-xs font-mono text-white/70">CAPABILITY PREVIEW</span>
              <a href="/contact" className="text-xs font-semibold px-3 py-1 rounded-full text-white glass border border-white/20 hover:bg-white/20 transition">
                Book Scope ↗
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Services Page Component ──────────────────────────── */
export default function ServicesPage() {
  return (
    <div className="bg-[#050505] text-white selection:bg-cyan-500 selection:text-black">
      {/* 1. Hero Section */}
      <ServicesHero />

      {/* Section Separator */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* 2. Accordion Capabilities List */}
      <section id="capabilities" className="relative py-24 md:py-32">
        <div className="w-[min(1280px,94vw)] mx-auto">
          <SectionIntro
            eyebrow="Our Core Capabilities"
            title="Services built for leverage."
            copy="Click any category below to inspect our process, deliverables, and technical stack."
            className="mb-12"
          />
          <div className="border-t border-white/[0.08]">
            {SERVICES.map((svc, i) => (
              <ServiceRow key={svc.num} svc={svc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 border-t border-white/[0.08] noise">
        <div className="aurora opacity-40" />
        <div className="relative z-10 w-[min(900px,94vw)] mx-auto text-center flex flex-col items-center gap-6">
          <h2 className="font-display text-4xl sm:text-6xl text-white font-bold tracking-tight">
            Ready to ship your next <span className="gradient-text italic">big platform?</span>
          </h2>
          <MagneticButton href="/contact">
            Get in touch <ArrowUpRight className="w-4 h-4 ml-1" />
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
