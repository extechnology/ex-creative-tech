import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import {
    Briefcase,
    Calendar,
    X,
    Upload,
    CheckCircle2,
    ArrowUpRight,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────
   TYPES
──────────────────────────────────────────────────────────── */

type CompanyId = "exmedia" | "exedu" | "exbot" | "extechnology";

type Job = {
    id: string;
    title: string;
    company: CompanyId;
    companyLabel: string;
    logo: string;
    date: string;
    description: string;
};

type Theme = {
    gradient: string;
    glow: string;
    text: string;
    soft: string;
    dot: string;
    beam: string;
};

/* ────────────────────────────────────────────────────────────
   DATA
   Add new roles/companies here — everything else (cards, modal,
   colors) scales automatically.
──────────────────────────────────────────────────────────── */

const JOBS: Job[] = [
    {
        id: "graphic-designer",
        title: "Graphic Designer",
        company: "exmedia",
        companyLabel: "EX Media",
        logo: "/ex-media-logo.png",
        date: "10/08/2026",
        description:
            "We are looking for a creative Graphic Designer with strong visual skills, fresh ideas, and passion for creating impactful brand communication and digital experience.",
    },
    {
        id: "digital-marketing-faculty",
        title: "Faculty – Digital Marketing",
        company: "exedu",
        companyLabel: "EX Edu",
        logo: "/ex-edu-logo.png",
        date: "10/08/2026",
        description:
            "We are looking for an experienced Digital Marketing Faculty member with industry knowledge, practical expertise, and a passion for mentoring learners in modern digital marketing strategies.",
    },
    {
        id: "hr-admin",
        title: "HR & Admin",
        company: "exbot",
        companyLabel: "EX Bot",
        logo: "/ex-bot-logo.png",
        date: "10/08/2026",
        description:
            "We seek a responsible HR & Admin professional to manage people, operations, coordination, workplace systems, and organizational efficiency in our creative environment.",
    },
    {
        id: "customer-care-executive",
        title: "Customer Care Executive",
        company: "extechnology",
        companyLabel: "EX Technology",
        logo: "/ex-tech-logo.png",
        date: "01/08/2026",
        description:
            "We are looking for confident Customer Executives & Telecallers to handle customer communication, generate leads, follow up with prospects, and build strong relationships.",
    },
];

const COMPANY_THEME: Record<CompanyId, Theme> = {
    exmedia: {
        gradient: "from-red-500 via-rose-500 to-orange-400",
        glow: "rgba(244,63,94,0.34)",
        text: "text-red-300",
        soft: "bg-red-500/[0.10]",
        dot: "bg-red-400",
        beam: "#fb7185",
    },
    extechnology: {
        gradient: "from-violet-500 via-indigo-500 to-cyan-400",
        glow: "rgba(99,102,241,0.34)",
        text: "text-indigo-300",
        soft: "bg-indigo-500/[0.10]",
        dot: "bg-cyan-400",
        beam: "#818cf8",
    },
    exedu: {
        gradient: "from-purple-500 via-violet-500 to-fuchsia-400",
        glow: "rgba(168,85,247,0.34)",
        text: "text-purple-300",
        soft: "bg-purple-500/[0.10]",
        dot: "bg-fuchsia-400",
        beam: "#c084fc",
    },
    exbot: {
        gradient: "from-emerald-500 via-green-500 to-teal-400",
        glow: "rgba(16,185,129,0.34)",
        text: "text-emerald-300",
        soft: "bg-emerald-500/[0.10]",
        dot: "bg-emerald-400",
        beam: "#34d399",
    },
};

const FALLBACK_THEME = COMPANY_THEME.exmedia;
const getTheme = (company: CompanyId): Theme => COMPANY_THEME[company] ?? FALLBACK_THEME;

const INPUT_CLASS =
    "w-full rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none transition-all focus:border-red-400/40 focus:bg-white/[0.055] focus:shadow-[0_0_0_4px_rgba(244,63,94,0.07)]";

/* ────────────────────────────────────────────────────────────
   MAIN SECTION
──────────────────────────────────────────────────────────── */

export default function JobOpenings() {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    useLockBodyScroll(Boolean(selectedJob));

    return (
        <section
            id="openings"
            className="relative isolate overflow-hidden bg-[#0c0607] px-4 py-16 sm:px-8 sm:py-20"
        >
            <BackgroundDecor />

            <div className="mx-auto max-w-6xl">
                <SectionHeader />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                    {JOBS.map((job, index) => (
                        <JobCard
                            key={job.id}
                            job={job}
                            index={index}
                            onApply={() => setSelectedJob(job)}
                        />
                    ))}
                </div>
            </div>

            <style>{`
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }

        html.job-modal-open,
        body.job-modal-open {
          overflow: hidden !important;
          overscroll-behavior: none !important;
        }

        @media (max-width: 640px) {
          html.job-modal-open,
          body.job-modal-open {
            height: 100%;
            width: 100%;
          }
        }
      `}</style>

            {mounted &&
                createPortal(
                    <ApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />,
                    document.body
                )}
        </section>
    );
}

/* ────────────────────────────────────────────────────────────
   BACKGROUND DECOR
──────────────────────────────────────────────────────────── */

function BackgroundDecor() {
    return (
        <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-[12%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-red-600/[0.10] blur-[150px]" />
            <div className="absolute -left-[180px] top-[35%] h-[420px] w-[420px] rounded-full bg-rose-600/[0.09] blur-[140px]" />
            <div className="absolute -right-[180px] top-[55%] h-[480px] w-[480px] rounded-full bg-orange-500/[0.09] blur-[150px]" />
            <div
                className="absolute inset-0 opacity-[0.055]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)
          `,
                    backgroundSize: "64px 64px",
                }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0c0607_80%)]" />
        </div>
    );
}

/* ────────────────────────────────────────────────────────────
   SECTION HEADER
──────────────────────────────────────────────────────────── */

function SectionHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="mb-9 sm:mb-12"
        >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 shadow-[0_0_30px_rgba(244,63,94,.10)] backdrop-blur-xl">
                <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400" />
                </span>
                <Briefcase className="h-3.5 w-3.5 text-red-300" />
                <span className="text-xs font-medium tracking-wide text-white/65 sm:text-sm">
                    Latest Openings
                </span>
            </div>

            <h2 className="max-w-3xl text-[clamp(2.3rem,7vw,4.2rem)] font-bold leading-[0.98] tracking-[-0.045em] text-white">
                Roles Open{" "}
                <span className="bg-gradient-to-r from-red-500 via-rose-500 to-orange-400 bg-clip-text italic text-transparent">
                    Right Now.
                </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/45 sm:text-base sm:text-lg">
                Across our studios — media, education, technology, and automation.
                Find where you fit.
            </p>
        </motion.div>
    );
}

/* ────────────────────────────────────────────────────────────
   JOB CARD
──────────────────────────────────────────────────────────── */

function JobCard({
    job,
    index,
    onApply,
}: {
    job: Job;
    index: number;
    onApply: () => void;
}) {
    const theme = getTheme(job.company);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, delay: index * 0.08 }}
            whileHover={{ y: -7 }}
            className="group relative"
        >
            <div
                className="relative h-full overflow-hidden rounded-[26px] bg-[#120a0a]/80 p-5 backdrop-blur-2xl transition-all duration-500 sm:rounded-[30px] sm:p-7"
                style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,.06), 0 20px 60px rgba(0,0,0,.25)" }}
            >
                <div
                    className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full opacity-20 blur-[80px] transition-opacity duration-500 group-hover:opacity-45"
                    style={{ background: theme.glow }}
                />
                <div
                    className="pointer-events-none absolute -bottom-28 -left-28 h-52 w-52 rounded-full opacity-[0.08] blur-[90px] transition-opacity duration-500 group-hover:opacity-25"
                    style={{ background: theme.glow }}
                />

                <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                            <CompanyLogo job={job} theme={theme} />

                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-white/85">
                                    {job.companyLabel}
                                </p>
                                <div className="mt-1 flex items-center gap-1.5">
                                    <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
                                    <span className="text-[10px] uppercase tracking-[0.16em] text-white/30">
                                        Hiring
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[10px] text-white/35">
                            <Calendar className="h-3 w-3" />
                            {job.date}
                        </div>
                    </div>

                    <h3 className="mt-7 text-[22px] font-semibold leading-tight tracking-[-0.025em] text-white sm:text-[25px]">
                        {job.title}
                    </h3>

                    <p className="mt-3 min-h-[72px] text-sm leading-[1.7] text-white/45">
                        {job.description}
                    </p>

                    <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2 text-xs text-white/30">
                            <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
                            Open position
                        </div>

                        <button
                            onClick={onApply}
                            className="group/button inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-transparent px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-black active:scale-[0.97] sm:w-auto"
                        >
                            Apply Now
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

/**
 * Fixed-aspect logo tile. Uses `object-contain` (not `object-cover`) so
 * initials/wordmark logos like "EX" or "TECH" are never cropped, and a
 * fixed square frame so every card lines up regardless of source image size.
 */
function CompanyLogo({ job, theme }: { job: Job; theme: Theme }) {
    return (
        <div
            className={`relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/[0.06] ${theme.soft} transition-all duration-500 group-hover:scale-105`}
            style={{ boxShadow: `0 0 18px ${theme.glow}` }}
        >
            <img
                src={job.logo}
                alt={`${job.companyLabel} logo`}
                className="h-full w-full object-contain object-center p-2 transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent opacity-60" />
        </div>
    );
}

/* ────────────────────────────────────────────────────────────
   APPLY MODAL
──────────────────────────────────────────────────────────── */

function ApplyModal({ job, onClose }: { job: Job | null; onClose: () => void }) {
    const [submitted, setSubmitted] = useState(false);

    // Reset local form state whenever a new job is opened.
    useEffect(() => {
        if (job) setSubmitted(false);
    }, [job]);

    const theme = job ? getTheme(job.company) : FALLBACK_THEME;

    return (
        <AnimatePresence>
            {job && (
                <motion.div
                    className="fixed inset-0 z-[2147483647] flex items-end justify-center p-0 sm:items-center sm:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                >
                    <motion.div
                        className="absolute inset-0 bg-[#0c0507]/85 backdrop-blur-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <div
                        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[130px]"
                        style={{ background: theme.glow }}
                    />

                    <motion.div
                        data-job-modal-content
                        initial={{ opacity: 0, y: 70, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                        onWheel={(e) => e.stopPropagation()}
                        onTouchMove={(e) => e.stopPropagation()}
                        className="no-scrollbar relative z-10 max-h-[94dvh] w-full overflow-y-auto overscroll-contain rounded-t-[30px] border border-white/[0.14] bg-[#0e0708]/95 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.75)] sm:max-h-[88dvh] sm:max-w-4xl sm:rounded-[30px]"
                        style={{ boxShadow: `0 30px 100px rgba(0,0,0,.75), 0 0 80px ${theme.glow}` }}
                    >
                        <div
                            className="pointer-events-none absolute -top-32 left-1/2 h-[280px] w-[520px] -translate-x-1/2 rounded-full opacity-35 blur-[110px]"
                            style={{ background: theme.glow }}
                        />
                        <div className={`pointer-events-none absolute left-8 right-8 top-0 h-px bg-gradient-to-r ${theme.gradient} opacity-80`} />

                        <div className="sticky top-0 z-30 flex justify-center pt-3 sm:hidden">
                            <div className="h-1.5 w-11 rounded-full bg-white/20 backdrop-blur-md" />
                        </div>

                        <div className="relative px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-5 sm:px-10 sm:pb-10 sm:pt-9">
                            <div className="mb-7 flex items-start justify-between gap-4">
                                <div>
                                    <div className="mb-3 flex items-center gap-2">
                                        <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
                                        <span className={`text-xs font-semibold uppercase tracking-[0.18em] ${theme.text}`}>
                                            {job.companyLabel}
                                        </span>
                                    </div>
                                    <h3 className="text-[26px] font-semibold leading-tight tracking-tight text-white sm:text-3xl">
                                        {submitted ? "Application Sent" : job.title}
                                    </h3>
                                </div>

                                <button
                                    onClick={onClose}
                                    aria-label="Close"
                                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/50 transition-all hover:bg-white/[0.10] hover:text-white active:scale-90"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <SuccessState key="success" job={job} theme={theme} onDone={onClose} />
                                ) : (
                                    <ApplicationForm
                                        key="form"
                                        job={job}
                                        theme={theme}
                                        onSubmitted={() => setSubmitted(true)}
                                    />
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function SuccessState({
    job,
    theme,
    onDone,
}: {
    job: Job;
    theme: Theme;
    onDone: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center py-12 text-center"
        >
            <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 ${theme.soft}`}
                style={{ boxShadow: `0 0 60px ${theme.glow}` }}
            >
                <CheckCircle2 className={`h-9 w-9 ${theme.text}`} />
            </motion.div>

            <p className="max-w-sm text-sm leading-relaxed text-white/60">
                Thanks for applying to{" "}
                <span className="font-medium text-white">{job.title}</span>. Our team
                will reach out if you're shortlisted.
            </p>

            <button
                onClick={onDone}
                className="mt-7 rounded-full border border-white/20 bg-transparent px-7 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-black active:scale-95"
            >
                Done
            </button>
        </motion.div>
    );
}

function ApplicationForm({
    job,
    theme,
    onSubmitted,
}: {
    job: Job;
    theme: Theme;
    onSubmitted: () => void;
}) {
    const [fileName, setFileName] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setSubmitting(true);

        // Replace with a real API call — this is a placeholder delay so the
        // submit button shows its loading state.
        window.setTimeout(() => {
            setSubmitting(false);
            onSubmitted();
        }, 900);
    };

    return (
        <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Name" required>
                    <input required type="text" placeholder="Your full name" className={INPUT_CLASS} />
                </Field>

                <Field label="Contact No." required>
                    <input required type="tel" placeholder="+91 00000 00000" className={INPUT_CLASS} />
                </Field>
            </div>

            <Field label="Job Profile" required>
                <input required type="text" defaultValue={job.title} className={INPUT_CLASS} />
            </Field>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Educational Qualification">
                    <textarea rows={3} placeholder="Describe your educational background" className={`${INPUT_CLASS} resize-none`} />
                </Field>

                <Field label="Description of Your Skills">
                    <textarea rows={3} placeholder="Tell us what you're great at" className={`${INPUT_CLASS} resize-none`} />
                </Field>
            </div>

            <Field label="Upload Resume">
                <label className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-dashed border-white/10 bg-white/[0.025] px-4 py-4 transition-all hover:border-white/20 hover:bg-white/[0.05]">
                    <span className="flex min-w-0 items-center gap-2.5 truncate text-sm text-white/45">
                        <Upload className="h-4 w-4 shrink-0" />
                        <span className="truncate">{fileName || "PDF, DOC — up to 5MB"}</span>
                    </span>

                    <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-white/70">
                        Browse
                    </span>

                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                    />
                </label>
            </Field>

            <button
                type="submit"
                disabled={submitting}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-transparent py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-black active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {submitting ? (
                    <>
                        <motion.span
                            className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                        />
                        Submitting…
                    </>
                ) : (
                    <>
                        Submit Application
                        <ArrowUpRight className="h-4 w-4" />
                    </>
                )}
            </button>
        </motion.form>
    );
}

function Field({
    label,
    required,
    children,
}: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <label className="block">
            <span className="mb-2 block text-xs font-medium text-white/45">
                {label} {required && <span className="text-red-400">*</span>}
            </span>
            {children}
        </label>
    );
}

/* ────────────────────────────────────────────────────────────
   HOOK — lock background scroll while a modal is open
──────────────────────────────────────────────────────────── */

function useLockBodyScroll(locked: boolean) {
    useEffect(() => {
        if (!locked) return;

        const html = document.documentElement;
        const body = document.body;
        const scrollY = window.scrollY;

        const previous = {
            htmlOverflow: html.style.overflow,
            bodyOverflow: body.style.overflow,
            bodyPosition: body.style.position,
            bodyTop: body.style.top,
            bodyWidth: body.style.width,
            bodyTouchAction: body.style.touchAction,
        };

        html.style.overflow = "hidden";
        body.style.overflow = "hidden";
        body.style.position = "fixed";
        body.style.top = `-${scrollY}px`;
        body.style.width = "100%";
        body.style.touchAction = "none";

        html.classList.add("job-modal-open");
        body.classList.add("job-modal-open");

        const preventBackgroundScroll = (event: WheelEvent | TouchEvent) => {
            const target = event.target as HTMLElement | null;
            if (!target?.closest("[data-job-modal-content]")) {
                event.preventDefault();
            }
        };

        document.addEventListener("wheel", preventBackgroundScroll, { passive: false });
        document.addEventListener("touchmove", preventBackgroundScroll, { passive: false });

        return () => {
            html.style.overflow = previous.htmlOverflow;
            body.style.overflow = previous.bodyOverflow;
            body.style.position = previous.bodyPosition;
            body.style.top = previous.bodyTop;
            body.style.width = previous.bodyWidth;
            body.style.touchAction = previous.bodyTouchAction;

            html.classList.remove("job-modal-open");
            body.classList.remove("job-modal-open");

            document.removeEventListener("wheel", preventBackgroundScroll);
            document.removeEventListener("touchmove", preventBackgroundScroll);

            window.scrollTo(0, scrollY);
        };
    }, [locked]);
}