import { motion } from "motion/react";

const STEPS = [
    {
        n: "01",
        title: "We sit in on sales calls",
        body: "Before a line of code is written, someone from the team listens to real reps hit a real wall in their workflow.",
    },
    {
        n: "02",
        title: "We ship the smallest fix",
        body: "Not the roadmap version. The smallest thing that removes the friction we just watched happen.",
    },
    {
        n: "03",
        title: "We watch adoption, not opinions",
        body: "Usage tells us what to build next. Feature requests are a hypothesis; login data is the answer.",
    },
];

export default function ProcessSteps() {
    return (
        <section className="py-16 sm:py-24 px-5 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <div className="mb-10 sm:mb-14 text-center">
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#06B6D4]">
                    How we build
                </span>
                <h2 className="mt-3 text-2xl sm:text-4xl font-semibold tracking-tight text-white">
                    The same three steps, every time
                </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 sm:gap-4 relative">
                {/* connecting rule, desktop only */}
                <div className="hidden sm:block absolute top-6 left-[16.6%] right-[16.6%] h-px bg-white/10" />

                {STEPS.map((s, idx) => (
                    <motion.div
                        key={s.n}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="relative bg-[#0a0b0f] sm:bg-transparent border sm:border-0 border-white/[0.08] rounded-2xl p-5 sm:p-0"
                    >
                        <div className="font-mono text-xs text-white/30 sm:bg-[#050508] sm:w-12 sm:inline-block relative z-10">
                            {s.n}
                        </div>
                        <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-white">
                            {s.title}
                        </h3>
                        <p className="mt-2 text-sm text-white/50 leading-relaxed">{s.body}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}