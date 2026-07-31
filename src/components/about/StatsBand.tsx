import { motion } from "motion/react";

const STATS = [
    { value: "50K+", label: "Teams onboard" },
    { value: "5M+", label: "Users worldwide" },
    { value: "98%", label: "Would recommend us" },
    { value: "4 yrs", label: "Building the same thing" },
];

export default function StatsBand() {
    return (
        <section className="px-5 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7 }}
                className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0a0b0f] px-6 py-10 sm:px-12 sm:py-14"
            >
                <div
                    className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ background: "#7C3AED" }}
                />
                <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4">
                    {STATS.map((s, idx) => (
                        <div
                            key={s.label}
                            className={`text-center sm:text-left ${idx < STATS.length - 1 ? "sm:border-r sm:border-white/10" : ""
                                } sm:pr-4`}
                        >
                            <div className="font-mono text-3xl sm:text-4xl font-medium tracking-tight text-white">
                                {s.value}
                            </div>
                            <div className="mt-1.5 text-xs sm:text-sm text-white/45">{s.label}</div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}