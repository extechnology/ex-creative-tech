import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TESTIMONIALS = [
    {
        id: 0,
        name: "David Vance",
        role: "Chief Executive Officer",
        avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        quote:
            "Closeify allowed us to automate complex sales operations across 12 territories. Revenue grew 45% in our first two quarters.",
    },
    {
        id: 1,
        name: "Sarah Jenkins",
        role: "VP of Customer Operations",
        avatar:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
        quote:
            "The workflow automation and real-time dashboard eliminated hours of repetitive tasks. Our response times are 3x faster.",
    },
    {
        id: 2,
        name: "Michael Carter",
        role: "Customer Success Manager",
        avatar:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
        quote:
            "This CRM changed how we handle customer interactions. The automation saved us hours every week, and the analytics gave us insight we never had.",
    },
    {
        id: 3,
        name: "Elena Rostova",
        role: "Product Lead",
        avatar:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
        quote:
            "The interface and the API integrations make Closeify a pleasure to use every day. It's built for modern teams, not legacy ones.",
    },
    {
        id: 4,
        name: "Marcus Thorne",
        role: "Growth Director",
        avatar:
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
        quote:
            "Retention hit an all-time high within months of deploying Closeify. The analytics give us clarity we didn't have before.",
    },
];

export default function TestimonialsCarousel() {
    const [active, setActive] = useState(0);

    const prev = () => setActive((p) => (p === 0 ? TESTIMONIALS.length - 1 : p - 1));
    const next = () => setActive((p) => (p === TESTIMONIALS.length - 1 ? 0 : p + 1));
    const current = TESTIMONIALS[active];

    return (
        <section className="py-16 sm:py-24 px-5 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#F97316]">
                Customer stories
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-semibold tracking-tight text-white">
                What teams say after switching
            </h2>

            <div className="mt-10 sm:mt-12 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                        className="bg-[#0a0b0f] border border-white/[0.08] rounded-3xl p-6 sm:p-10 relative"
                    >
                        <Quote className="w-7 h-7 text-white/10 mx-auto mb-4" strokeWidth={1.5} />
                        <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-xl mx-auto">
                            {current.quote}
                        </p>

                        <div className="mt-6 flex items-center justify-center gap-3">
                            <img
                                src={current.avatar}
                                alt={current.name}
                                className="w-9 h-9 rounded-full object-cover"
                            />
                            <div className="text-left">
                                <div className="text-sm font-medium text-white">{current.name}</div>
                                <div className="text-xs text-white/45">{current.role}</div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* arrows */}
                <button
                    onClick={prev}
                    aria-label="Previous testimonial"
                    className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -left-14 w-10 h-10 rounded-xl bg-[#0c0d12] border border-white/10 items-center justify-center text-white/60 hover:text-white hover:border-white/25 transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                    onClick={next}
                    aria-label="Next testimonial"
                    className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -right-14 w-10 h-10 rounded-xl bg-[#0c0d12] border border-white/10 items-center justify-center text-white/60 hover:text-white hover:border-white/25 transition-colors"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            {/* dot / avatar selector */}
            <div className="mt-6 flex items-center justify-center gap-2.5">
                {TESTIMONIALS.map((t, idx) => (
                    <button
                        key={t.id}
                        onClick={() => setActive(idx)}
                        aria-label={`Show testimonial from ${t.name}`}
                        className={`rounded-full transition-all duration-300 ${idx === active ? "w-6 h-2 bg-[#F97316]" : "w-2 h-2 bg-white/20 hover:bg-white/40"
                            }`}
                    />
                ))}
            </div>

            {/* mobile arrows */}
            <div className="flex sm:hidden justify-center gap-4 mt-6">
                <button
                    onClick={prev}
                    aria-label="Previous testimonial"
                    className="w-10 h-10 rounded-xl bg-[#0c0d12] border border-white/10 flex items-center justify-center text-white/60 active:scale-95"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                    onClick={next}
                    aria-label="Next testimonial"
                    className="w-10 h-10 rounded-xl bg-[#0c0d12] border border-white/10 flex items-center justify-center text-white/60 active:scale-95"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </section>
    );
}