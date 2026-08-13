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
        iconColorClass: "text-cyan-400",
        dotGradientClass: "from-cyan-400 to-indigo-500",
      }}
      heading={{
        line1: "Your Goal Is The Vision.",
        whiteGradientText: "Technology Is The",
        line2: "Power",
        accentText: "Achieve It.",
        accentGradientClass: "from-cyan-400 via-sky-400 to-indigo-400",
      }}
      description="Redefine through Web – Apps – CRM – Software – Automation"
      primaryCta={{
        label: "Our Story",
        href: "#our-story",
      }}
      palette={{
        a: "#35e0ff",
        b: "#6d5efc",
        c: "#a855f7",
        bg: "#050505",
        progress: "linear-gradient(90deg, #35e0ff 0%, #6d5efc 55%, #a855f7 100%)",
      }}
      background={
        <WebThreads
          color1="#22D3EE"
          color2="#38BDF8"
          color3="#818CF8"
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
