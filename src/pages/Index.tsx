import HomeHero from "@/components/home/HomeHero";
import IdeaEngineSection from "@/components/home/IdeaEngine";
import DigitalRealitySection from "@/components/home/DigitalReality";
import KnowledgeMovingSection from "@/components/home/KnowledgeMoving";
import ContinuousConnectionSection from "@/components/home/ContinuousConnection";

export default function Index() {
    return (
        <div className="relative bg-[color:var(--color-background)] transition-colors duration-700 overflow-x-hidden">
            <HomeHero />
            <IdeaEngineSection />
            <DigitalRealitySection />
            <KnowledgeMovingSection />
            <ContinuousConnectionSection />
        </div>
    );
}