import { motion } from "motion/react";

const MILESTONES = [
    {
        year: "2020",
        title: "The spreadsheet broke",
        body: "A shared sheet buried a renewal date and it cost the team a six-figure account. That mistake is the entire reason Closeify exists.",
        dot: "#F97316",
    },
    {
        year: "2021",
        title: "First 50 customers",
        body: "We built the part that mattered first: pipeline stages and reminders that update themselves, so nobody has to remember to open the CRM.",
        dot: "#7C3AED",
    },
    {
        year: "2023",
        title: "Global rollout",
        body: "Twelve territories, one dashboard. Real-time visibility replaced the weekly status email nobody read anyway.",
        dot: "#06B6D4",
    },
    {
        year: "Now",
        title: "50,000+ teams, same brief",
        body: "We're still building the one thing we set out to: a CRM people open because it helps, not because it's mandatory.",
        dot: "#F97316",
    },
];

export default function StoryTimeline() {
    return (
        <section className="py-16 sm:py-24 px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <div className="mb-12 sm:mb-16">
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#F97316]">
                    Our story
                </span>
                <h2 className="mt-3 text-2xl sm:text-4xl font-semibold tracking-tight text-white">
                    Four years, one recurring complaint
                </h2>
            </div>

            <div className="relative">
                {/* signature connecting thread */}
                <div
                    className="absolute left-[7px] sm:left-1/2 top-2 bottom-2 w-px sm:-translate-x-1/2"
                    style={{
                        background:
                            "linear-gradient(to bottom, #F97316, #7C3AED, #06B6D4, transparent)",
                        opacity: 0.35,
                    }}
                />

                <div className="space-y-10 sm:space-y-0">
                    {MILESTONES.map((m, idx) => {
                        const isRight = idx % 2 === 1;
                        return (
                            <div
                                key={m.year}
                                className={`relative sm:grid sm:grid-cols-2 sm:gap-10 ${idx > 0 ? "sm:mt-10" : ""
                                    }`}
                            >
                                {/* node */}
                                <div
                                    className="absolute left-0 sm:left-1/2 top-1 sm:-translate-x-1/2 w-3.5 h-3.5 rounded-full ring-4 ring-[#050508] z-10"
                                    style={{ backgroundColor: m.dot }}
                                />

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.6 }}
                                    className={`pl-7 sm:pl-0 ${isRight
                                            ? "sm:col-start-2 sm:pl-10"
                                            : "sm:col-start-1 sm:pr-10 sm:text-right"
                                        }`}
                                >
                                    <span className="font-mono text-xs tracking-wider text-white/40">
                                        {m.year}
                                    </span>
                                    <h3 className="mt-1 text-lg sm:text-xl font-semibold text-white">
                                        {m.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-white/55 leading-relaxed max-w-md sm:ml-0 sm:inline-block">
                                        {m.body}
                                    </p>
                                </motion.div>

                                {/* empty grid cell to keep alternating rhythm on desktop */}
                                <div
                                    className={`hidden sm:block ${isRight ? "sm:col-start-1" : "sm:col-start-2"
                                        }`}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}