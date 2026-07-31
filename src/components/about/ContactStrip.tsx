import { motion } from "motion/react";
import { Mail, Headphones, Briefcase, LucideIcon } from "lucide-react";

const CONTACT_INFO: { id: string; title: string; value: string; icon: LucideIcon }[] = [
    { id: "email", title: "Email", value: "closeify1@gmail.com", icon: Mail },
    { id: "phone", title: "Phone", value: "+1 (123) 456-7890", icon: Headphones },
    { id: "address", title: "Address", value: "Suite 400, New York, USA", icon: Briefcase },
];

export default function ContactStrip() {
    return (
        <section className="px-5 sm:px-6 lg:px-8 max-w-5xl mx-auto -mt-6 sm:-mt-10 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
            >
                {CONTACT_INFO.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.id}
                            className="flex items-center gap-3.5 bg-[#0b0c12]/90 backdrop-blur-md border border-white/[0.08] hover:border-white/20 rounded-2xl px-4 py-3.5 transition-colors"
                        >
                            <div className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center flex-shrink-0 text-white/60">
                                <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                                <div className="text-[11px] text-white/40">{item.title}</div>
                                <div className="text-xs sm:text-sm text-white/85 truncate">{item.value}</div>
                            </div>
                        </div>
                    );
                })}
            </motion.div>
        </section>
    );
}