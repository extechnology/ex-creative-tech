import { Sparkles } from "lucide-react";
import BasePageHero from "@/components/shared/BasePageHero";
import Strands from "../Strands";
import WebThreads from "../WebThreads";


export default function TechnologyHero() {

  return (
    <BasePageHero
      badge={{
        label: "Technology",
        icon: Sparkles,
        iconColorClass: "text-red-400",
        dotGradientClass: "from-red-500 to-purple-500",
      }}
      heading={{
        line1: "Your Goal Is The Vision.",
        whiteGradientText: "Technology Is The",
        line2: "Power",
        accentText: "Achieve It.",
        accentGradientClass: "from-red-400 via-purple-400 to-indigo-400",
      }}
      description="Redefine through Web – Apps- CRM – Software – Automation"
      primaryCta={{
        label: "Our Story",
        href: "#our-story",
      }}
      background={
        <WebThreads
          color1="#ca27ff"
          color2="#FF9FFC"
          color3="#cc2222"
          speed={0.2}
          threadCount={6}
          frequency={5}
          spread={0.18}
          taper={1}
          position={0.5}
          fanMode="center"
          glow={0.02}
          falloff={0.6}
          thickness={1.1}
          brightness={0.6}
          opacity={1}
          mirror
          shimmer={false}
          grain
          grainIntensity={0.05}
          mouseInteraction
          mouseStrength={0.3}
        />
      }

    />
  );
}
