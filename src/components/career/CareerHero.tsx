import { motion } from "motion/react";
import { Briefcase } from "lucide-react";
import BasePageHero from "@/components/shared/BasePageHero";

export default function CareerHero() {
    const careerVisual = (
        <div className="w-full relative mt-6 lg:mt-0">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl shadow-2xl group"
            >
                <div className="relative rounded-2xl overflow-hidden h-[340px] sm:h-[440px]">
                    <img
                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80"
                        alt="EX-Creative Technology Team Culture"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
                </div>
            </motion.div>
        </div>
    );

    return (
        <BasePageHero
            badge={{
                label: "Careers",
                icon: Briefcase,
                iconColorClass: "text-red-400",
                dotGradientClass: "from-red-500 to-rose-500",
            }}
            heading={{
                line1: "Find Your Next",
                whiteGradientText: "Job at",
                line2: "EXCT",
                accentText: "Build With Us.",
                accentGradientClass: "from-red-500 via-rose-500 to-orange-400",
            }}
            description="Open Roles – Culture – Growth – Benefits"
            primaryCta={{
                label: "View Openings",
                href: "#openings",
                shadowClass: "shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]",
            }}
            ambientGradients={{
                mainBlobClass: "from-red-600/20 via-rose-600/25 to-orange-500/10",
                topBlobClass: "bg-red-500/15",
                bottomBlobClass: "bg-rose-600/15",
            }}
            rightVisual={careerVisual}
        />
    );
}