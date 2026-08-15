import { Newspaper } from "lucide-react";
import BasePageHero from "@/components/layout/BasePageHero";
import SlicedWaves from "../SlicedWaves";


export default function UpdatesHero() {
  return (
    <BasePageHero
      badge={{
        label: "Updates",
        icon: Newspaper,
        iconColorClass: "text-amber-400",
        dotGradientClass: "from-amber-400 to-orange-500",
      }}
      heading={{
        line1: "Stories, Insights &",
        whiteGradientText: "Ideas That",
        line2: "Shape Tomorrow's",
        accentText: "Digital World.",
        accentGradientClass: "from-amber-400 via-orange-400 to-rose-400",
      }}
      description="Explore thought leadership, behind-the-scenes craft notes, product launches, and the ideas driving the future of digital experience design."
      primaryCta={{
        label: "Read Latest",
        href: "#blog",
        shadowClass:
          "shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:shadow-[0_0_40px_rgba(245,158,11,0.55)] border-amber-500/30 hover:border-amber-500/60",
      }}
      secondaryCta={{
        label: "Subscribe",
        href: "#subscribe",
      }}
      palette={{
        a: "#F59E0B",
        b: "#FB923C",
        c: "#EF4444",
        bg: "#050505",
        progress:
          "linear-gradient(90deg, #F59E0B 0%, #FB923C 50%, #EF4444 100%)",
      }}
      background={
        <SlicedWaves
          color1="#ffd962"
          color2="#EAB308"
          color3="#EAB308"
          columns={14}
          rows={8}
          barThickness={0.1}
          speed={0.35}
          travel={0.7}
          waveSpread={0.9}
          rowOffset={1}
          softness={0.05}
          glow={0}
          brightness={1}
          contrast={1}
          opacity={0.5}
          orientation="horizontal"
          alternate={false}
          mouseInteraction
          mouseStrength={1}
          mouseRadius={0.3}
          grain
          grainIntensity={0.05}
        />
      }
    />
  );
}
