import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight, Code2, Bot, GraduationCap, Clapperboard,
  ChevronDown, Sparkles,
} from "lucide-react";
import ServicesHero from "@/components/services/ServicesHero";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { Reveal, MagneticButton } from "@/components/Reveal";

/* ── Services Data ─────────────────────────────────────────── */
/* Each group = one capability pillar. Each item = a service under it.
   defaultOpen marks which item starts expanded, matching the reference
   layout where one row per group is already showing its description. */

const GROUPS = [
  {
    id: "product-engineering",
    title: "Product Engineering",
    tag: "Build",
    Icon: Code2,
    palette: "#00E5FF",
    blurb: "Full-stack web, mobile, and internal tools built with a design-engineer mindset — from rapid prototype to production-grade platform.",
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=700&q=80",
    ],
    side: "right",
    defaultOpen: 1,
    items: [
      { title: "React · Next.js · TypeScript", desc: "Interfaces built on a modern, type-safe stack — component-driven, accessible by default, and fast to iterate on." },
      { title: "REST & GraphQL APIs", desc: "Backend services designed around the data your product actually needs, with clean contracts and predictable errors." },
      { title: "Cloud Infrastructure · CI/CD", desc: "Deployment pipelines that ship confidently — automated tests, previews, and rollbacks built in from day one." },
      { title: "Edge Performance Optimization", desc: "Sub-second loads through caching, code-splitting, and edge delivery tuned to real user conditions." },
    ],
  },
  {
    id: "brand-motion",
    title: "Brand & Motion Design",
    tag: "Design",
    Icon: Clapperboard,
    palette: "#FF2A85",
    blurb: "3D motion graphics, brand design systems, and cinematic content that makes your product feel inevitable and stops the scroll.",
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=700&q=80",
    ],
    side: "left",
    defaultOpen: 1,
    items: [
      { title: "Brand Identity Systems", desc: "Logos, type systems, and visual language that stay consistent from a pitch deck to a product screen." },
      { title: "Brand Strategy & Positioning", desc: "How a brand stands out in the market — its identity, values, and messaging defined to build lasting trust with customers." },
      { title: "Cinematic 3D Motion", desc: "Motion design that gives static screens weight and depth, built for hero moments and launch films." },
      { title: "Campaign Production", desc: "End-to-end creative for launches — concept, shoot, edit, and delivery across every channel." },
    ],
  },
  {
    id: "ai-automation",
    title: "AI & Automation",
    tag: "Intelligence",
    Icon: Bot,
    palette: "#00E676",
    blurb: "Custom RAG pipelines, fine-tuned LLM agents, and WhatsApp-first automated workflows that eliminate repetitive work.",
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=700&q=80",
    ],
    side: "right",
    defaultOpen: 1,
    items: [
      { title: "Custom LLM Agent Pipelines", desc: "Task-specific agents chained together to handle multi-step work with guardrails and human checkpoints." },
      { title: "WhatsApp API Integration", desc: "Conversational workflows deployed where your customers already are, wired into your existing systems." },
      { title: "Enterprise RAG Systems", desc: "Retrieval pipelines grounded in your own data, so answers stay accurate and auditable at scale." },
      { title: "Workflow Automation", desc: "Repetitive operational work handed off to automation, freeing your team for the parts that need judgment." },
    ],
  },
  {
    id: "learning-programs",
    title: "Learning Programs",
    tag: "Grow",
    Icon: GraduationCap,
    palette: "#B537FF",
    blurb: "Cohort-based technical training and AI mentorship for team enablement, with curriculum designed around real production outcomes.",
    images: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80",
    ],
    side: "left",
    defaultOpen: 0,
    items: [
      { title: "Live Cohort Bootcamps", desc: "Structured, instructor-led sprints that take a team from fundamentals to shipping real features." },
      { title: "1:1 Technical Mentorship", desc: "Focused pairing sessions built around each engineer's actual gaps, not a generic curriculum." },
      { title: "Enterprise Team Upskilling", desc: "Org-wide programs that raise the floor on a whole engineering function, tracked against real outcomes." },
      { title: "AI-Native Curriculum", desc: "Training built for how software actually gets written now — with AI tooling as a first-class skill, not an add-on." },
    ],
  },
];

/* ── Interlocking image pair ───────────────────────────────── */
/* One large frame plus a smaller frame overlapping its bottom-right
   corner, sharing a single border color, flat — no blur, no shadow soup. */
function CollageImage({ images, palette }: { images: string[]; palette: string }) {
  return (
    <div className="relative w-full aspect-square sm:aspect-[6/5]">
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden bg-[#0a0e1a]"
        style={{ border: `1.5px solid ${palette}` }}
      >
        <img src={images[0]} alt="" className="w-full h-full object-cover" />
      </div>
      <div
        className="absolute bottom-[6%] right-[6%] w-[46%] h-[46%] overflow-hidden bg-[#0a0e1a] rounded-tr-2xl rounded-br-2xl rounded-bl-2xl"
        style={{
          border: `1.5px solid ${palette}`,
          borderTopLeftRadius: 0,
        }}
      >
        <img src={images[1]} alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

/* ── Sub-item accordion row ────────────────────────────────── */
function ServiceItem({
  item, open, palette, onToggle,
}: {
  item: { title: string; desc: string };
  open: boolean;
  palette: string;
  onToggle: () => void;
}) {
  return (
    <div className="border-t border-white/10 first:border-t-0">
      <button
        onClick={onToggle}
        data-cursor="hover"
        className="w-full flex items-center justify-between gap-4 py-4 text-left"
      >
        <span
          className={`text-[15px] sm:text-base transition-colors ${open ? "text-white font-semibold" : "text-white/70 font-medium"
            }`}
        >
          {item.title}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          className="shrink-0"
        >
          <ChevronDown className="w-4 h-4" style={{ color: open ? palette : "rgba(255,255,255,0.35)" }} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p className="pb-5 pr-8 text-sm leading-relaxed text-white/45">
              {item.desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Service group block (image + accordion list) ─────────── */
function ServiceGroup({ group, index }: { group: typeof GROUPS[number]; index: number }) {
  const [openIdx, setOpenIdx] = useState<number>(group.defaultOpen);
  const imageFirst = group.side === "right"; // image sits on the right on desktop

  return (
    <Reveal>
      <div
        className={`grid lg:grid-cols-12 gap-8 lg:gap-14 items-center py-14 sm:py-16 border-b border-white/[0.06] ${index === 0 ? "pt-2" : ""
          }`}
      >
        {/* Image */}
        <div
          className={`lg:col-span-5 ${imageFirst ? "lg:order-2" : "lg:order-1"
            }`}
        >
          <CollageImage images={group.images} palette={group.palette} />
        </div>

        {/* Text + accordion */}
        <div className={`lg:col-span-7 ${imageFirst ? "lg:order-1" : "lg:order-2"}`}>
          <h3 className="font-display text-2xl sm:text-[28px] font-bold text-white mb-2 tracking-tight">
            {group.title}
          </h3>
          <p className="text-white/45 text-sm leading-relaxed mb-7 max-w-lg">
            {group.blurb}
          </p>

          <div>
            {group.items.map((item, i) => (
              <ServiceItem
                key={item.title}
                item={item}
                open={openIdx === i}
                palette={group.palette}
                onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Glowing CTA button ─────────────────────────────────────── */
function GlowCTA() {
  return (
    <div className="relative inline-flex items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{
          background: "linear-gradient(90deg, #00E5FF, #B537FF, #FF2A85, #00E5FF)",
          backgroundSize: "300% 100%",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -inset-1 rounded-full opacity-70 blur-md"
        style={{
          background: "linear-gradient(90deg, #00E5FF, #B537FF, #FF2A85, #00E5FF)",
          backgroundSize: "300% 100%",
        }}
        animate={{ backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <MagneticButton
        href="/contact"

      >
        <Sparkles className="w-4 h-4 mr-1" style={{ color: "#00E5FF" }} />
        Get in touch <ArrowUpRight className="w-4 h-4 ml-1" />
      </MagneticButton>
    </div>
  );
}

/* ── Main Services Page Component ──────────────────────────── */
export default function ServicesPage() {
  return (
    <div className="bg-[#050505] text-white selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      {/* 1. Hero Section */}
      <ServicesHero />

      {/* Section Separator */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* 2. Grouped Capability Sections */}
      <section id="capabilities" className="relative py-20 sm:py-28 md:py-32">
        <div className="w-[min(1180px,92vw)] mx-auto">
          <SectionIntro
            eyebrow="Our Core Capabilities"
            title="Services built for leverage."
            copy="Tap any category below to inspect our process, deliverables, and technical stack."
            className="mb-8 sm:mb-12"
          />
          <div>
            {GROUPS.map((group, i) => (
              <ServiceGroup key={group.id} group={group} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 sm:py-32 border-t border-white/[0.08] noise overflow-hidden">
        <div className="aurora opacity-40" />
        <div className="relative z-10 w-[min(900px,94vw)] mx-auto text-center flex flex-col items-center gap-8 px-5">
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-white font-bold tracking-tight leading-[1.1]">
            Ready to ship your next <span className="gradient-text italic">big platform?</span>
          </h2>
          <p className="text-white/50 text-sm sm:text-base max-w-md">
            Tell us what you're building — we'll scope it, staff it, and ship it.
          </p>
          <GlowCTA />
        </div>
      </section>
    </div>
  );
}