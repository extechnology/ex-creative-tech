import { motion } from "motion/react";
import { Cpu } from "lucide-react";
import BasePageHero from "@/components/shared/BasePageHero";
import MagicRings from "../MagicRings";
import LightTunnel from "../LightTunnel";

export default function CompanyHero() {
  return (
    <BasePageHero
      badge={{
        label: "Companies",
        icon: Cpu,
        iconColorClass: "text-[#FF6EC7]",
        dotGradientClass: "from-[#D81B60] via-[#FF6EC7] to-[#8A2BE2]",
      }}
      heading={{
        line1: "Engineering Digital",
        whiteGradientText: "Platforms",
        line2: "From Concept To",
        accentText: "Scale.",
        accentGradientClass: "from-[#F43F5E] via-[#D81B60] to-[#8A2BE2]",
      }}
      description="EX-Creative is a family of independent studios working in unison to deliver high-end digital products to global brands and high-growth startups."
      primaryCta={{
        label: "Explore Companies",
        href: "#companies",
        shadowClass: "shadow-[0_0_30px_rgba(216,27,96,0.35)] hover:shadow-[0_0_40px_rgba(216,27,96,0.55)] border-pink-500/30 hover:border-pink-500/60",
      }}
      palette={{
        a: "#D81B60",
        b: "#FF6EC7",
        c: "#8A2BE2",
        bg: "#050505",
        progress: "linear-gradient(90deg, #D81B60 0%, #FF6EC7 50%, #8A2BE2 100%)",
      }}
      background={
        <LightTunnel
          cableColor="#D81B60"
          pulseColor="#FF6EC7"
          tunnelColor="#8A2BE2"
          tunnelOpacity={0}
          speed={0.1}
          flowDirection="outward"
          pulseSpeed={2}
          pulseLength={0.28}
          pulseBlend={1}
          pulseWidth={1}
          cableCount={20}
          thickness={0.35}
          rimWidth={0.15}
          waviness={0.3}
          sway={0.5}
          size={1}
          centerX={0}
          centerY={0}
          glow={1}
          fadeNear={0.5}
          fadeFar={2}
          brightness={1}
          colorVariance
          grain
          grainIntensity={0.05}
          opacity={1}
          mouseInteraction
          mouseStrength={0.1}
        />
      }
    />
  );
}
