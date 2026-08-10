import { useState } from "react";
import PageLoader from "@/components/PageLoader";
import HomeHero from "@/components/home/HomeHero";
import Ticker from "@/components/home/Ticker";
import Numbers from "@/components/home/Numbers";
import Process from "@/components/home/Process";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative bg-[color:var(--color-background)] transition-colors duration-700 overflow-x-hidden">
      {loading && <PageLoader onDone={() => setLoading(false)} />}
      <HomeHero />
      <Ticker />
      <Numbers />
      <Process />
    </div>
  );
}
