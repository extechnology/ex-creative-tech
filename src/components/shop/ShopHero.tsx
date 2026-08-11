import { motion } from "motion/react";
import { Gem } from "lucide-react";
import BasePageHero from "@/components/shared/BasePageHero";

export default function ShopHero() {
    const shopVisual = (
        <div className="w-full relative mt-6 lg:mt-0">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl shadow-2xl group"
            >
                <div className="relative rounded-2xl overflow-hidden h-[340px] sm:h-[440px]">
                    <img
                        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"
                        alt="EX-Creative Technology Curated Shop"
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
                label: "Shop",
                icon: Gem,
                iconColorClass: "text-fuchsia-400",
                dotGradientClass: "from-fuchsia-500 to-purple-500",
            }}
            heading={{
                line1: "Every Idea Deserves A",
                whiteGradientText: "Home Worth",
                line2: "Owning",
                accentText: "Shop The Craft.",
                accentGradientClass: "from-fuchsia-400 via-pink-400 to-purple-400",
            }}
            description="Curated Merch – Prints – Kits – Limited Drops"
            primaryCta={{
                label: "Browse Shop",
                href: "#browse",
                shadowClass: "shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]",
            }}
            secondaryCta={{
                label: "New Arrivals",
                href: "#new-arrivals",
            }}
            ambientGradients={{
                mainBlobClass: "from-fuchsia-600/20 via-pink-600/25 to-yellow-500/10",
                topBlobClass: "bg-fuchsia-500/15",
                bottomBlobClass: "bg-fuchsia-400/15",
            }}
            rightVisual={shopVisual}
        />
    );
}