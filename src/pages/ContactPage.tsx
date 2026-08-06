import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Mail, MapPin, Phone, ChevronDown, Send, CheckCircle2, Clock, Globe } from "lucide-react";
import ContactHero from "@/components/contact/ContactHero";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { Reveal, MagneticButton } from "@/components/Reveal";

/* ── Contact Info Cards ────────────────────────────────────── */
const CONTACT_INFO = [
  { Icon: Mail,   label: "Email Support", value: "hello@ex-creative.tech",  href: "mailto:hello@ex-creative.tech", tag: "Fastest Response" },
  { Icon: Phone,  label: "Direct Line",   value: "+91 000 000 0000",         href: "tel:+910000000000",        tag: "Mon - Fri 9am-6pm" },
  { Icon: MapPin, label: "Studio Hubs",   value: "Mumbai · Bengaluru · Remote", href: "#",                   tag: "Global Distributed" },
];

/* ── Offices Data with Unsplash Images ─────────────────────── */
const OFFICES = [
  {
    city: "Mumbai",
    country: "India",
    tz: "IST (UTC+5:30)",
    type: "Headquarters",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
    address: "Bandra Kurla Complex, Tech Park",
  },
  {
    city: "Bengaluru",
    country: "India",
    tz: "IST (UTC+5:30)",
    type: "Engineering Lab",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80",
    address: "Indiranagar 100ft Road, Innovation Center",
  },
  {
    city: "Remote",
    country: "Global",
    tz: "Async-First",
    type: "Distributed Team",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    address: "18+ Countries & Timezones",
  },
];

/* ── FAQ Items ─────────────────────────────────────────────── */
const FAQ = [
  {
    q: "How quickly can you kick off a new project?",
    a: "We can start within 1 to 2 weeks post-discovery alignment. We begin with a 45-minute scope call to map out goals, deliverables, and timelines.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Yes! Some of our most successful work has been building MVPs from scratch for seed-stage startups, as well as scaling platforms for series A+ companies.",
  },
  {
    q: "Can you audit and modernise an existing codebase?",
    a: "Absolutely. We perform full architectural audits covering performance, security, and scalability, followed by a clear refactoring and modernization roadmap.",
  },
  {
    q: "What are your standard engagement models?",
    a: "We offer fixed-scope project builds, dedicated monthly studio retainers, and embedded engineering teams.",
  },
];

/* ── Form Component ────────────────────────────────────────── */
function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", project: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="glass rounded-3xl p-8 sm:p-10 border border-white/15 relative overflow-hidden shadow-2xl">
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--color-brand-a)25, transparent 65%)", filter: "blur(40px)" }} />

      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-16 text-center flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full glass flex items-center justify-center border border-white/20">
              <Send className="w-7 h-7 text-[color:var(--color-brand-a)]" />
            </div>
            <h3 className="font-display text-3xl font-bold text-white">Message Received!</h3>
            <p className="text-white/60 text-sm max-w-sm">We'll review your project details and get back to you within 24 hours.</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="relative space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="font-display text-xl font-bold text-white">Project Inquiry</span>
              <span className="inline-flex items-center gap-1.5 text-xs text-[#00E676] font-mono">
                <span className="w-2 h-2 rounded-full bg-[#00E676] animate-ping" />
                ACCEPTING Q3 PROJECTS
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { id: "name",    label: "Your name",  type: "text",  placeholder: "Ada Lovelace", field: "name" as const },
                { id: "email",   label: "Email",       type: "email", placeholder: "you@company.com", field: "email" as const },
                { id: "company", label: "Company / Org",type: "text",  placeholder: "Where do you work?", field: "company" as const },
              ].map((f) => (
                <label key={f.id} className={`block ${f.id === "company" ? "sm:col-span-2 md:col-span-1" : ""}`}>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-white/40">{f.label}</span>
                  <input
                    id={f.id}
                    type={f.type}
                    required
                    placeholder={f.placeholder}
                    value={form[f.field]}
                    onChange={(e) => setForm((p) => ({ ...p, [f.field]: e.target.value }))}
                    className="mt-2 w-full bg-transparent border-b border-white/15 focus:border-[color:var(--color-brand-a)] outline-none py-3 text-white text-sm placeholder:text-white/20 transition-colors"
                  />
                </label>
              ))}
            </div>

            <label className="block">
              <span className="text-[11px] font-mono uppercase tracking-widest text-white/40">Tell us about your project</span>
              <textarea
                id="project"
                rows={4}
                required
                placeholder="What platform or product are you building? What is your timeline?"
                value={form.project}
                onChange={(e) => setForm((p) => ({ ...p, project: e.target.value }))}
                className="mt-2 w-full bg-transparent border-b border-white/15 focus:border-[color:var(--color-brand-a)] outline-none py-3 text-white text-sm placeholder:text-white/20 transition-colors resize-none"
              />
            </label>

            <div className="pt-2">
              <MagneticButton>
                Send message <ArrowUpRight className="w-4 h-4 ml-1" />
              </MagneticButton>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main Contact Page Component ───────────────────────────── */
export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-[#050505] text-white selection:bg-emerald-500 selection:text-black">
      {/* 1. Hero Section */}
      <ContactHero />

      {/* Section Separator */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Main Grid: Form + Info Cards */}
      <section id="contact-form" className="relative py-20 md:py-28">
        <div className="w-[min(1280px,94vw)] mx-auto grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <SectionIntro
              eyebrow="Get In Touch"
              title="Start the conversation."
              copy="We partner with ambitious teams to engineer products that win."
              className="mb-4"
            />

            <div className="flex flex-col gap-4">
              {CONTACT_INFO.map(({ Icon, label, value, href, tag }) => (
                <a
                  key={label}
                  href={href}
                  className="glass rounded-2xl p-5 border border-white/10 flex items-center justify-between hover:border-white/30 transition-all group"
                  data-cursor="hover"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl glass flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 text-[color:var(--color-brand-a)]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">{label}</span>
                      <h4 className="text-white font-semibold text-base group-hover:text-white/80 transition-colors">{value}</h4>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full glass border border-white/15 text-white/60">
                    {tag}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Office Hubs Grid with Visual Cards */}
      <section id="hubs" className="relative py-20 border-t border-white/[0.08]">
        <div className="w-[min(1280px,94vw)] mx-auto">
          <SectionIntro eyebrow="Global Presence" title="Our studio hubs." className="mb-10" />
          <div className="grid md:grid-cols-3 gap-6">
            {OFFICES.map(({ city, country, tz, type, image, address }) => (
              <div key={city} className="glass rounded-3xl overflow-hidden border border-white/10 group">
                <div className="h-44 relative overflow-hidden">
                  <img src={image} alt={city} className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full glass border border-white/20 text-white">
                    {type}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-display text-2xl font-bold text-white">{city}</h3>
                    <span className="text-xs font-mono text-white/40">{tz}</span>
                  </div>
                  <p className="text-white/60 text-xs mb-3">{address}</p>
                  <span className="text-[11px] text-white/40 font-mono uppercase">{country}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="relative py-24 border-t border-white/[0.08]">
        <div className="w-[min(900px,94vw)] mx-auto">
          <SectionIntro eyebrow="FAQ" title="Frequently asked questions." align="center" className="mb-12" />
          <div className="flex flex-col divide-y divide-white/[0.08]">
            {FAQ.map(({ q, a }, i) => (
              <div key={q} className="py-6">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left"
                  data-cursor="hover"
                >
                  <span className="text-white text-lg font-semibold">{q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-5 h-5 text-white/40" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="pt-4 text-white/60 text-sm leading-relaxed">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
