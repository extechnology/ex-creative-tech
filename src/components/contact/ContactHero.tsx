import { MessageSquare } from "lucide-react";
import BasePageHero from "@/components/shared/BasePageHero";
import GradientWaves from "../GradientWaves";

export default function ContactHero() {

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
        accentText: "Together",
        accentGradientClass: "from-emerald-400 via-teal-400 to-cyan-400",
      }}
      description="Have a project in mind, an architectural question, or an AI concept? Reach out to our engineering team — we respond within 24 business hours to map out your product roadmap."
      primaryCta={{
        label: "Start Inquiry",
        href: "#contact-form",
        shadowClass: "shadow-[0_0_30px_rgba(0,230,118,0.25)] hover:shadow-[0_0_40px_rgba(0,230,118,0.45)]",
      }}
      background={
        <GradientWaves
          horizonColor="#064E5B"
          waveColor="#00D9C0"
          crestColor="#00E5FF"
          speed={0.4}
          amplitude={2.5}
          waveScale={0.6}
          waveRatio={0.9}
          swell={35}
          turbulence={20}
          tilt={1.11}
          zoom={1}
          height={5.5}
          fogDepth={15}
          detail="medium"
          brightness={1}
          opacity={1}
          mouseInteraction
          parallaxStrength={0.5}
          grain
          grainIntensity={0.05}
        />
      }
    />
  );
}
