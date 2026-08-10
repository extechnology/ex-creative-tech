import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import BasePageHero from "@/components/shared/BasePageHero";

export default function TechnologyHero() {
  const techVisual = (
    <div className="w-full relative mt-6 lg:mt-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl shadow-2xl group"
      >
        <div className="relative rounded-2xl overflow-hidden h-[340px] sm:h-[440px]">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
            alt="EX-Creative Technology Team Workspace"
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
        label: "Technology",
        icon: Sparkles,
        iconColorClass: "text-red-400",
        dotGradientClass: "from-red-500 to-purple-500",
      }}
      heading={{
        line1: "Building Digital",
        whiteGradientText: "Experiences",
        line2: "That People",
        accentText: "Remember.",
        accentGradientClass: "from-red-400 via-purple-400 to-indigo-400",
      }}
      description="We are an award-winning digital design & engineering studio crafting high-impact platforms, brand identities, and futuristic web experiences for visionary tech teams worldwide."
      primaryCta={{
        label: "Our Story",
        href: "#our-story",
        shadowClass: "shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]",
      }}
      secondaryCta={{
        label: "View Work",
        href: "#work",
      }}
      ambientGradients={{
        mainBlobClass: "from-red-600/20 via-purple-600/25 to-indigo-600/10",
        topBlobClass: "bg-red-500/15",
        bottomBlobClass: "bg-purple-600/15",
      }}
      rightVisual={techVisual}
    />
  );
}
