import AgencyHero from "@/components/about/AgencyHero";
import CompanyStory from "@/components/about/CompanyStory";
import WhyUsFeatures from "@/components/about/WhyUsFeatures";
import ProcessTimeline from "@/components/about/ProcessTimeline";
import BehindTheScenes from "@/components/about/BehindTheScenes";
import FaqAccordion from "@/components/about/FaqAccordion";
import AgencyCTA from "@/components/about/AgencyCTA";

export default function AboutPage() {
  return (
    <div className="bg-[#050505] min-h-screen text-white overflow-x-hidden font-sans selection:bg-red-500 selection:text-white">
      {/* 1. Hero Section */}
      <AgencyHero />

      {/* Section Separator */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* 2. Company Story & Timeline */}
      <CompanyStory />

      {/* Section Separator */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* 3. What Makes Us Different */}
      <WhyUsFeatures />

      {/* Section Separator */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* 4. Process Timeline (Exact Mockup Match) */}
      <ProcessTimeline />

      {/* Section Separator */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* 5. Behind The Scenes Gallery (Interactive Modal) */}
      <BehindTheScenes />

      {/* Section Separator */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* 6. FAQ Accordion (Glowing BG & Borderless) */}
      <FaqAccordion />

      {/* 7. CTA Section */}
      <AgencyCTA />
    </div>
  );
}