import HomeHero from "@/components/home/HomeHero";
import Ticker from "@/components/home/Ticker";
import HomeCta from "@/components/home/HomeCta";
import GrowthJourney from "@/components/home/Growth";
import CreativeCapabilities from "@/components/home/Creativecapabilities";
import ApproachFlowSection from "@/components/home/Approch";



export default function HomePage() {


  return (


    <div className="relative bg-[color:var(--color-background)] transition-colors duration-700 overflow-x-hidden">
    
      <HomeHero />

      <Ticker />

      <GrowthJourney />

      <CreativeCapabilities />

      <ApproachFlowSection />

      <HomeCta />

    </div>


  );

}
