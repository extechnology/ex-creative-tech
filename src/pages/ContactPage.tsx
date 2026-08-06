import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Mail, MapPin, Phone, Plus, Minus, Send, User, Building2, MessageSquare } from "lucide-react";
import ContactHero from "@/components/contact/ContactHero";
import { MagneticButton } from "@/components/Reveal";

/* ── Contact Info Cards ────────────────────────────────────── */
const CONTACT_INFO = [
  { Icon: Mail,   label: "Email Support", value: "hello@ex-creative.tech",       href: "mailto:hello@ex-creative.tech", tag: "Fastest Response" },
  { Icon: Phone,  label: "Direct Line",   value: "+91 000 000 0000",             href: "tel:+910000000000",             tag: "Mon - Fri 9am-6pm" },
  { Icon: MapPin, label: "Studio Hubs",   value: "Mumbai · Bengaluru · Remote",  href: "#",                             tag: "Global Distributed" },
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

/* ── Section backdrop: glow only, no grid ──────────────────── */
function SectionBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute left-1/2 -top-40 -translate-x-1/2 w-[50rem] h-[50rem] rounded-full"
        style={{ background: "radial-gradient(circle, var(--color-brand-a)22, transparent 62%)", filter: "blur(85px)" }}
      />
    </div>
  );
}

/* ── Tight intro block (eyebrow + copy, small controlled gap) ─ */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="w-5 h-px bg-white/30" />
      <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/45">{children}</span>
    </div>
  );
}

/* ── Floating glass field ──────────────────────────────────── */
function Field({
  id, label, type, placeholder, value, onChange, Icon, textarea = false, rows,
}: {
  id: string; label: string; type?: string; placeholder: string; value: string;
  onChange: (v: string) => void; Icon: React.ComponentType<{ className?: string }>;
  textarea?: boolean; rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <label className="block group">
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/35">{label}</span>
      <div
        className="mt-2 flex items-start gap-3 rounded-xl px-4 py-3 bg-white/[0.03] border transition-all duration-300"
        style={{
          borderColor: focused ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.08)",
          boxShadow: focused ? "0 0 0 3px rgba(255,255,255,0.06)" : "none",
        }}
      >
        <Icon className={`w-4 h-4 mt-0.5 shrink-0 transition-colors ${focused ? "text-white/70" : "text-white/25"}`} />
        {textarea ? (
          <textarea
            id={id}
            rows={rows ?? 4}
            required
            placeholder={placeholder}
            value={value}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-white placeholder:text-white/20 resize-none leading-relaxed"
          />
        ) : (
          <input
            id={id}
            type={type ?? "text"}
            required
            placeholder={placeholder}
            value={value}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-white placeholder:text-white/20"
          />
        )}
      </div>
    </label>
  );
}

/* ── Form Component: black card, white glow border ─────────── */
function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", project: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div
      className="relative rounded-3xl bg-[#070707] p-8 sm:p-10 overflow-hidden"
      style={{
        border: "1px solid rgba(255,255,255,0.16)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.03), 0 0 30px rgba(255,255,255,0.07), 0 0 90px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="absolute -top-24 -left-24 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.06), transparent 65%)", filter: "blur(50px)" }}
      />

      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-16 text-center flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center border border-white/20 bg-white/[0.04]">
              <Send className="w-6 h-6 text-white/80" />
            </div>
            <h3 className="font-display text-3xl font-bold text-white">Message received.</h3>
            <p className="text-white/50 text-sm max-w-sm leading-relaxed">
              We'll review your project details and reply within 24 hours.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="relative space-y-6"
          >
            <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
              <span className="font-display text-xl font-bold text-white">Project Inquiry</span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[color:var(--color-brand-a)] px-2.5 py-1 rounded-full border border-[color:var(--color-brand-a)]/25 bg-[color:var(--color-brand-a)]/[0.06]">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[color:var(--color-brand-a)] opacity-60 animate-ping" />
                  <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-[color:var(--color-brand-a)]" />
                </span>
                Accepting Q3 projects
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field id="name" label="Your name" Icon={User} placeholder="Ada Lovelace"
                value={form.name} onChange={(v) => setForm((p) => ({ ...p, name: v }))} />
              <Field id="email" label="Email" type="email" Icon={Mail} placeholder="you@company.com"
                value={form.email} onChange={(v) => setForm((p) => ({ ...p, email: v }))} />
              <div className="sm:col-span-2">
                <Field id="company" label="Company / Org" Icon={Building2} placeholder="Where do you work?"
                  value={form.company} onChange={(v) => setForm((p) => ({ ...p, company: v }))} />
              </div>
            </div>

            <Field
              id="project" label="Tell us about your project" Icon={MessageSquare} textarea rows={4}
              placeholder="What platform or product are you building? What is your timeline?"
              value={form.project} onChange={(v) => setForm((p) => ({ ...p, project: v }))}
            />

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

/* ── Info card ─────────────────────────────────────────────── */
function InfoCard({ Icon, label, value, href, tag }: (typeof CONTACT_INFO)[number]) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative rounded-2xl p-5 border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl flex items-center justify-between gap-4 overflow-hidden group"
      data-cursor="hover"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "radial-gradient(120px circle at 0% 50%, rgba(255,255,255,0.06), transparent 70%)" }}
      />
      <div className="relative flex items-center gap-4 min-w-0">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-white/10 bg-white/[0.04] group-hover:border-white/25 transition-colors">
          <Icon className="w-5 h-5 text-[color:var(--color-brand-a)]" />
        </div>
        <div className="min-w-0">
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/35">{label}</span>
          <h4 className="text-white font-semibold text-base truncate group-hover:text-white/85 transition-colors">{value}</h4>
        </div>
      </div>
      <span className="relative shrink-0 text-[10px] font-mono px-2.5 py-1 rounded-full border border-white/10 text-white/50 bg-white/[0.02]">
        {tag}
      </span>
    </motion.a>
  );
}

/* ── FAQ card ──────────────────────────────────────────────── */
function FaqCard({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <motion.div
      layout
      className="rounded-2xl border backdrop-blur-xl transition-colors duration-300 overflow-hidden"
      style={{
        borderColor: open ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.06)",
        background: open ? "rgba(255,255,255,0.035)" : "rgba(255,255,255,0.02)",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 text-left px-7 py-6"
        data-cursor="hover"
      >
        <span className={`text-lg font-semibold transition-colors ${open ? "text-white" : "text-white/80"}`}>{q}</span>
        <span
          className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-colors"
          style={{
            borderColor: open ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
            background: open ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)",
          }}
        >
          {open ? (
            <Minus className="w-3.5 h-3.5 text-white/80" />
          ) : (
            <Plus className="w-3.5 h-3.5 text-white/60" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p className="px-7 pb-6 text-white/55 text-sm leading-relaxed max-w-xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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
      <section id="contact-form" className="relative py-14 md:py-20 overflow-hidden">
        <SectionBackdrop />
        <div className="relative w-[min(1280px,94vw)] mx-auto grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="space-y-2.5">
              <Eyebrow>Get In Touch</Eyebrow>
              <p className="text-white/60 text-base leading-relaxed max-w-sm">
                We partner with ambitious teams to engineer products that win.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {CONTACT_INFO.map((info) => (
                <InfoCard key={info.label} {...info} />
              ))}
            </div>
          </div>

          {/* Right Column Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="relative py-14 md:py-20 border-t border-white/[0.06] overflow-hidden">
        <SectionBackdrop />
        <div className="relative w-[min(860px,94vw)] mx-auto">
          <div className="flex flex-col items-center text-center space-y-2.5 mb-8">
            <Eyebrow>Got Questions?</Eyebrow>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Frequently asked questions.
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {FAQ.map((item, i) => (
              <FaqCard
                key={item.q}
                q={item.q}
                a={item.a}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}