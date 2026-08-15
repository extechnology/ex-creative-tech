import { motion } from "motion/react";
import { Briefcase } from "lucide-react";
import BasePageHero from "@/components/layout/BasePageHero";
import LightRays from "../LightRays";
import Scanner from "../Scanner";

export default function CareerHero() {

    return (
        <BasePageHero
            badge={{
                label: "Careers",
                icon: Briefcase,
                iconColorClass: "text-red-400",
                dotGradientClass: "from-red-500 to-rose-500",
            }}
            heading={{
                line1: "Find Your Next",
                whiteGradientText: "Job at",
                line2: "EXCT",
                accentText: "Build With Us.",
                accentGradientClass: "from-red-500 via-rose-500 to-orange-400",
            }}
            description="Open Roles – Culture – Growth – Benefits"
            primaryCta={{
                label: "View Openings",
                href: "#openings",
                shadowClass: "shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]",
            }}
            palette={{
                a: "#f87171",
                b: "#fb7185",
                c: "#fb923c",
                bg: "#050505",
                progress: "linear-gradient(90deg, #ef4444 0%, #f87171 50%, #fb923c 100%)",
            }}
            background={
                <Scanner
                    color1="#ed0029"
                    color2="#EF4444"
                    color3="#FFFFFF"
                    speed={0.5}
                    sweepSpeed={0.25}
                    sweepWidth={2}
                    sweepFalloff={6}
                    scale={1.5}
                    frequency={2}
                    ripple={0.22}
                    bandDensity={11}
                    lineSharpness={5.5}
                    glow={0.22}
                    scanDirection="vertical"
                    colorSpread={0.7}
                    brightness={1}
                    contrast={1.15}
                    softness={1.4}
                    vignette={0.45}
                    scanline
                    grain
                    grainIntensity={0.05}
                    opacity={1}
                    mouseInteraction
                    mouseRadius={0.5}
                    mouseStrength={0.5}
                />
            }
        />
    );
}