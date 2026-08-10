import { motion } from "motion/react";
import { MessageSquare } from "lucide-react";
import BasePageHero from "@/components/shared/BasePageHero";

export default function ContactHero() {
  const contactVisual = (
    <div className="w-full relative mt-6 lg:mt-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl shadow-2xl group"
      >
        <div className="relative rounded-2xl overflow-hidden h-[340px] sm:h-[440px]">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
            alt="EX-Creative Global Collaboration Workspace"
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
        label: "Contact & Collaboration",
        icon: MessageSquare,
        iconColorClass: "text-emerald-400",
        dotGradientClass: "from-emerald-400 to-teal-500",
      }}
      heading={{
        line1: "Let's Build",
        whiteGradientText: "Something Great",
        line2: "",
        accentText: "Together.",
        accentGradientClass: "from-emerald-400 via-teal-400 to-cyan-400",
      }}
      description="Have a project in mind, an architectural question, or an AI concept? Reach out to our engineering team — we respond within 24 business hours to map out your product roadmap."
      primaryCta={{
        label: "Start Inquiry",
        href: "#contact-form",
        shadowClass: "shadow-[0_0_30px_rgba(0,230,118,0.25)] hover:shadow-[0_0_40px_rgba(0,230,118,0.45)]",
      }}
      secondaryCta={{
        label: "Explore Hubs",
        href: "#hubs",
      }}
      ambientGradients={{
        mainBlobClass: "from-emerald-600/20 via-teal-600/25 to-cyan-500/10",
        topBlobClass: "bg-emerald-500/15",
        bottomBlobClass: "bg-teal-600/15",
      }}
      rightVisual={contactVisual}
    />
  );
}
