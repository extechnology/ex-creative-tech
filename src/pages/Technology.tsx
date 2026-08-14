import TechnologyHero from "@/components/technology/TechnologyHero";
import TechPlatform from "@/components/technology/TechPlatform";
import TechnologyQuoteCtaSection from "@/components/technology/TechQcta";

export default function TechnologyPage() {

  return (

    <div className="bg-[#050505] min-h-screen text-white overflow-x-hidden font-sans selection:bg-red-500 selection:text-white">


      {/* 1. Hero Section */}
      <TechnologyHero />


      {/* Section Separator */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>


      {/* 2. Technology Enablement — DIGITIZE · CONNECT · OPTIMIZE · ACHIEVE */}
      <TechPlatform />


      {/* 3. Quote & CTA Section */}
      <TechnologyQuoteCtaSection />


      {/* 4. Message Flow Section */}
      {/* <MessageFlowSection /> */}


    </div>


  );


}