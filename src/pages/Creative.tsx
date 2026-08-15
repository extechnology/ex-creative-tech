import CreativeHero from "@/components/creative/CreativeHero";
import Ticker from "@/components/creative/Ticker";
import CreativeCta from "@/components/creative/CreativeCta";
import GrowthJourney from "@/components/creative/Growth";
import CreativeCapabilities from "@/components/creative/Creativecapabilities";
import ApproachFlowSection from "@/components/creative/Approch";



export default function Creative() {


  return (


    <div className="relative bg-[color:var(--color-background)] transition-colors duration-700 overflow-x-hidden">

      <CreativeHero />

      <Ticker />

      <GrowthJourney />

      <CreativeCapabilities />

      <ApproachFlowSection />

      <CreativeCta />

    </div>


  );

}
