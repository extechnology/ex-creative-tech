import { motion } from "motion/react";
import { Cpu } from "lucide-react";
import BasePageHero from "@/components/shared/BasePageHero";

export default function CompanyHero() {
  const companyVisual = (
    <div className="w-full relative mt-6 lg:mt-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl shadow-2xl group"
      >
        <div className="relative rounded-2xl overflow-hidden h-[340px] sm:h-[440px]">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
            alt="EX-Creative Engineering & Capability Dashboard"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent" />
        </div>
      </motion.div>
    </div>
  );

  return (
    <BasePageHero
      badge={{
        label: "Companies",
        icon: Cpu,
        iconColorClass: "text-cyan-400",
        dotGradientClass: "from-cyan-400 to-blue-500",
      }}
      heading={{
        line1: "Engineering Digital",
        whiteGradientText: "Platforms",
        line2: "From Concept To",
        accentText: "Scale.",
        accentGradientClass: "from-cyan-400 via-sky-400 to-blue-500",
      }}
      description="EX-Creative is a family of independent studios working in unison to deliver high-end digital products to global brands and high-growth startups."
      primaryCta={{
        label: "Explore Companies",
        href: "#companies",
        shadowClass: "shadow-[0_0_30px_rgba(0,229,255,0.25)] hover:shadow-[0_0_40px_rgba(0,229,255,0.45)]",
      }}
      secondaryCta={{
        label: "Start A Project",
        href: "/contact",
      }}
      ambientGradients={{
        mainBlobClass: "from-cyan-600/20 via-blue-600/25 to-sky-500/10",
        topBlobClass: "bg-cyan-500/15",
        bottomBlobClass: "bg-blue-600/15",
      }}
      rightVisual={companyVisual}
    />
  );
}
