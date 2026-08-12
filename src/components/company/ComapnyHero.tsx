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
      background={
        <LightTunnel
          cableColor="#00CFFF"
          pulseColor="#00CFFF"
          tunnelColor="#0066FF"
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
