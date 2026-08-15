import { Gem } from "lucide-react";
import BasePageHero from "@/components/layout/BasePageHero";
import PrismaticBurst from "../PrismaticBurst";


export default function ShopHero() {
    return (
        <BasePageHero
            badge={{
                label: "Shop",
                icon: Gem,
                iconColorClass: "text-fuchsia-400",
                dotGradientClass: "from-fuchsia-500 to-purple-500",
            }}
            heading={{
                line1: "Every Idea Deserves A",
                whiteGradientText: "Home Worth",
                line2: "Owning",
                accentText: "Shop The Craft.",
                accentGradientClass: "from-fuchsia-400 via-pink-400 to-purple-400",
            }}
            description="Curated Merch – Prints – Kits – Limited Drops"
            primaryCta={{
                label: "Browse Shop",
                href: "#browse",
            }}
            palette={{
                a: "#e879f9",
                b: "#f472b6",
                c: "#a855f7",
                bg: "#050505",
                progress: "linear-gradient(90deg, #e879f9 0%, #f472b6 50%, #a855f7 100%)",
            }}
            background={
                <PrismaticBurst
                    animationType="rotate3d"
                    intensity={2}
                    speed={0.5}
                    distort={0}
                    paused={false}
                    offset={{ x: 0, y: 0 }}
                    hoverDampness={0.25}
                    rayCount={0}
                    mixBlendMode="lighten"
                    colors={["#FF4FD8", "#C44CFF", "#FF1493"]}
                />
            }
        />
    );
}