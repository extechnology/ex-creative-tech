import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Minus, Plus, Upload, type LucideIcon } from "lucide-react";
import ContactHero from "@/components/contact/ContactHero";

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

const IDEA_TAGS = ["Technology", "Automation", "Business", "Digital Innovation"];

function IdeaProgramBackdrop() {
  const stars = [
    ["9%", "17%", "2px"],
    ["22%", "9%", "3px"],
    ["31%", "86%", "2px"],
    ["43%", "24%", "2px"],
    ["48%", "58%", "3px"],
    ["56%", "92%", "2px"],
    ["67%", "18%", "2px"],
    ["78%", "72%", "3px"],
    ["88%", "48%", "2px"],
    ["95%", "12%", "2px"],
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* emerald/teal ambient blobs — matches hero's mainBlobClass */}
      <div className="absolute -left-64 top-0 h-[48rem] w-[32rem] bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.18),transparent_62%)] blur-3xl" />
      <div className="absolute -right-72 bottom-[-18rem] h-[38rem] w-[44rem] bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.15),transparent_66%)] blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_16%,rgba(5,5,8,0.72)_80%)]" />
      <div className="absolute inset-0 grid-bg opacity-[0.035]" />
      <svg
        aria-hidden="true"
        className="absolute left-0 top-24 h-[520px] w-[520px] opacity-25"
        viewBox="0 0 520 520"
      >
        <path
          d="M0 384 C86 250 184 188 298 162"
          fill="none"
          stroke="rgba(52, 211, 153, 0.35)"
          strokeWidth="1"
        />
        <path
          d="M26 430 C104 330 202 278 356 248"
          fill="none"
          stroke="rgba(255, 255, 255, 0.13)"
          strokeDasharray="4 12"
          strokeWidth="1"
        />
      </svg>
      {stars.map(([left, top, size]) => (
        <span
          key={`${left}-${top}`}
          className="absolute rounded-full bg-white/35 shadow-[0_0_12px_rgba(255,255,255,0.35)]"
          style={{ left, top, width: size, height: size }}
        />
      ))}
    </div>
  );
}

function OpenCallIntro() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className="max-w-7xl"
    >
      <div
        className="mb-7 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase text-emerald-300/75"
        style={{ letterSpacing: "0.28em" }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.95)]" />
        <span>Open Call · Ideas Program</span>
      </div>

      <h2
        className="font-sans text-[clamp(3rem,5vw,4.75rem)] font-semibold leading-[1.04] text-white"
        style={{ letterSpacing: 0 }}
      >
        Have an idea that could make a{" "}
        <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
          difference?
        </span>
      </h2>

      <p className="mt-7 max-w-[455px] text-[15px] font-medium leading-7 text-slate-400">
        Share your concept with us. Whether it&apos;s a new technology solution, business idea,
        automation concept, or digital innovation — let&apos;s explore its potential together.
      </p>

      <div className="mt-9 flex flex-wrap gap-3">
        {IDEA_TAGS.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-semibold text-white/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-12 flex items-center gap-5">
        <span className="h-px w-14 bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />
        <span className="text-sm font-bold text-white">
          Turn Your Idea Into{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Possibility
          </span>
        </span>
      </div>
    </motion.div>
  );
}

function FormLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-2 block font-mono text-[11px] font-bold text-emerald-300/72">
      <span className="text-white/28">//</span> {children}
    </span>
  );
}

function IdeaInput({
  label,
  id,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  id: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <FormLabel>{label}</FormLabel>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-white/[0.075] bg-white/[0.045] px-4 text-sm font-semibold text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/45 focus:bg-white/[0.065] focus:shadow-[0_0_0_3px_rgba(52,211,153,0.08)]"
      />
    </label>
  );
}

function IdeaTextarea({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <FormLabel>Tell us about your idea</FormLabel>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="What problem does it solve? How does it work? Who is it for?"
        rows={4}
        className="min-h-[88px] w-full resize-none rounded-xl border border-white/[0.075] bg-white/[0.045] px-4 py-3 text-sm font-semibold leading-relaxed text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-300/45 focus:bg-white/[0.065] focus:shadow-[0_0_0_3px_rgba(52,211,153,0.08)]"
      />
    </label>
  );
}

function UploadField({ fileName }: { fileName: string }) {
  return (
    <label className="block cursor-pointer">
      <FormLabel>Upload file (optional)</FormLabel>
      <div className="flex min-h-[66px] items-center gap-4 rounded-xl border border-dashed border-white/[0.08] bg-white/[0.04] px-4 transition hover:border-emerald-300/35 hover:bg-white/[0.055]">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-300/10 text-emerald-300 shadow-[0_0_22px_rgba(52,211,153,0.13)]">
          <Upload className="h-4 w-4" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-bold text-white/78">
            {fileName || "Drop a file or click to browse"}
          </span>
          <span className="mt-0.5 block text-xs font-medium text-slate-500">
            PDF, DOCX, PNG, JPG — up to 10MB
          </span>
        </span>
      </div>
      <input type="file" className="sr-only" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" />
    </label>
  );
}

function IdeaSubmissionCard() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    title: "",
    idea: "",
  });
  const [fileName, setFileName] = useState("");

  const update = (key: keyof typeof form) => (value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 34, scale: 0.97 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.85, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      onSubmit={handleSubmit}
      className="relative w-full max-w-[500px] overflow-hidden rounded-[25px] border border-emerald-300/16 bg-[#0c111b]/88 p-8 shadow-[0_28px_90px_rgba(0,0,0,0.52),0_0_0_1px_rgba(255,255,255,0.025),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl sm:p-9"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/35 to-transparent" />
      <div className="absolute -left-28 bottom-16 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="absolute -right-24 bottom-4 h-56 w-56 rounded-full bg-cyan-400/12 blur-3xl" />

      <div className="relative flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Submit your idea</h3>
        <span className="font-mono text-[10px] font-bold uppercase text-white/28">FORM_01</span>
      </div>

      <div className="relative mt-7 grid gap-5 sm:grid-cols-2">
        <IdeaInput
          id="idea-name"
          label="Your name"
          placeholder="Jordan Lee"
          value={form.name}
          onChange={update("name")}
        />
        <IdeaInput
          id="idea-contact"
          label="Email / Phone"
          placeholder="you@email.com"
          type="text"
          value={form.contact}
          onChange={update("contact")}
        />
      </div>

      <div className="relative mt-5">
        <IdeaInput
          id="idea-title"
          label="Idea title"
          placeholder="Give your idea a name"
          value={form.title}
          onChange={update("title")}
        />
      </div>

      <div className="relative mt-5">
        <IdeaTextarea value={form.idea} onChange={update("idea")} />
      </div>

      <div
        className="relative mt-5"
        onChange={(event) => {
          const input = event.target as HTMLInputElement;
          setFileName(input.files?.[0]?.name ?? "");
        }}
      >
        <UploadField fileName={fileName} />
      </div>

      <button
        type="submit"
        className="group relative mt-7 flex h-12 w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-sm font-extrabold text-[#111827] shadow-[0_18px_44px_rgba(0,230,118,0.28)] transition hover:brightness-110"
        data-cursor="hover"
      >
        <span className="absolute inset-0 translate-x-[-110%] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-[110%]" />
        <span className="relative">Submit your idea</span>
        <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      <p className="relative mt-4 text-center text-[11px] font-semibold text-slate-500">
        We review every submission personally. No idea is too small.
      </p>
    </motion.form>
  );
}

function IdeaSubmissionSection() {
  return (
    <section
      id="contact-form"
      className="relative min-h-[760px] overflow-hidden border-y border-white/[0.04] bg-[#05060b] px-5 py-20 text-white sm:px-8 md:py-20"
    >
      <IdeaProgramBackdrop />
      <div className="relative z-10 mx-auto grid w-[min(1220px,92vw)] items-center gap-14 lg:grid-cols-[0.99fr_1.06fr] lg:gap-10">
        <OpenCallIntro />
        <div className="flex justify-center lg:justify-end">
          <IdeaSubmissionCard />
        </div>
      </div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-px w-5 bg-white/30" />
      <span
        className="font-mono text-[11px] uppercase text-white/45"
        style={{ letterSpacing: "0.25em" }}
      >
        {children}
      </span>
    </div>
  );
}

function SectionBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 -top-40 h-[50rem] w-[50rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--color-brand-a)_0%,transparent_62%)] opacity-[0.08] blur-[85px]" />
    </div>
  );
}

function FaqCard({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      layout
      className="overflow-hidden rounded-2xl border backdrop-blur-xl transition-colors duration-300"
      style={{
        borderColor: open ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.06)",
        background: open ? "rgba(255,255,255,0.035)" : "rgba(255,255,255,0.02)",
      }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left"
        data-cursor="hover"
      >
        <span
          className={`text-lg font-semibold transition-colors ${open ? "text-white" : "text-white/80"
            }`}
        >
          {q}
        </span>
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors"
          style={{
            borderColor: open ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
            background: open ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)",
          }}
        >
          {open ? (
            <Minus className="h-3.5 w-3.5 text-white/80" />
          ) : (
            <Plus className="h-3.5 w-3.5 text-white/60" />
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
            <p className="max-w-xl px-7 pb-6 text-sm leading-relaxed text-white/55">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-[#050505] text-white selection:bg-emerald-500 selection:text-black">
      <ContactHero />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <IdeaSubmissionSection />

      <section className="relative overflow-hidden border-t border-white/[0.06] py-14 md:py-20">
        <SectionBackdrop />
        <div className="relative mx-auto w-[min(860px,94vw)]">
          <div className="mb-8 flex flex-col items-center space-y-2.5 text-center">
            <Eyebrow>Got Questions?</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
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