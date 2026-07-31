import { motion } from "motion/react";
import { Zap, ShieldCheck, Eye, TrendingUp, LucideIcon } from "lucide-react";

const VALUES: { icon: LucideIcon; title: string; body: string; accent: string }[] = [
    {
        icon: Zap,
        title: "Speed",
        body: "If an update takes more than two clicks, we consider it a bug, not a feature request.",
        accent: "#F97316",
    },
    {
        icon: Eye,
        title: "Clarity",
        body: "One pipeline view, not six dashboards pretending to be one source of truth.",
        accent: "#7C3AED",
    },
    {
        icon: ShieldCheck,
        title: "Trust",
        body: "Your customer data is the product's foundation, not a growth-hacking asset.",
        accent: "#06B6D4",
    },
    {
        icon: TrendingUp,
        title: "Scale",
        body: "Built to hold up at 5 million users without asking your team to relearn it.",
        accent: "#F97316",
    },
];

export default function ValuesGrid() {
    return (
        <section className="py-16 sm:py-24 px-5 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <div className="mb-10 sm:mb-14 text-center">
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#7C3AED]">
                    What we believe
                </span>
                <h2 className="mt-3 text-2xl sm:text-4xl font-semibold tracking-tight text-white">
                    Four rules we don't bend on
                </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {VALUES.map((v, idx) => {
                    const Icon = v.icon;
                    return (
                        <motion.div
                            key={v.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: idx * 0.06 }}
                            className="group relative bg-[#0a0b0f] border border-white/[0.08] rounded-2xl p-4 sm:p-6 hover:border-white/20 transition-colors"
                        >
                            <div
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mb-4 border"
                                style={{
                                    backgroundColor: `${v.accent}14`,
                                    borderColor: `${v.accent}33`,
                                }}
                            >
                                <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" style={{ color: v.accent }} />
                            </div>
                            <h3 className="text-sm sm:text-base font-semibold text-white">{v.title}</h3>
                            <p className="mt-1.5 text-xs sm:text-sm text-white/50 leading-relaxed">
                                {v.body}
                            </p>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}   