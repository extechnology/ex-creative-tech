import ComapnyHero from "@/components/company/ComapnyHero";
import CompanySection from "@/components/company/List";
import Plasma from "@/components/Plasma";
import { MagneticButton, Reveal } from "@/components/Reveal";
import { ArrowUpRight, Sparkles } from "lucide-react";



/* ── Main Services Page Component ──────────────────────────── */
export default function CompanyPage() {

  return (

    <div className="bg-[#050505] text-white selection:bg-cyan-500 selection:text-black overflow-x-hidden">

      {/* 1. Hero Section */}
      <ComapnyHero />

      {/* Section Separator */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* 2. Companies Section */}
      <CompanySection />



      <section className="relative overflow-hidden py-20 noise sm:py-28 md:py-36">
      {/* Plasma background */}
      <div className="pointer-events-none absolute inset-0">
        <Plasma
          color="#B497CF"
          speed={1}
          direction="forward"
          scale={1}
          opacity={1}
          mouseInteractive={false}
          renderScale={0.55}
          maxDpr={1.5}
          targetFps={60}
          iterations={60}
        />
      </div>

      {/* Contrast overlays so text stays readable over the plasma */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,black_85%)]" />
      <div className="absolute inset-0 grid-bg opacity-[0.12]" />

      <div className="relative mx-auto w-[min(760px,92vw)] text-center">
        {/* Icon mark */}
        <Reveal>
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-[0_8px_30px_rgba(180,151,207,0.25)] backdrop-blur-xl sm:mb-8 sm:h-14 sm:w-14">
            <Sparkles className="h-5 w-5  sm:h-6 sm:w-6" />
          </div>
        </Reveal>

        {/* Heading */}
        <Reveal delay={0.1}>
          <h2 className="font-display text-white text-[clamp(2rem,7vw,4.25rem)] leading-[1.05] tracking-tight">
            Ready to Build
            <br />
            <span className="">Something Extraordinary?</span>
          </h2>
        </Reveal>

        {/* Subtext */}
        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-md text-balance text-sm text-white/50 sm:mt-6 sm:text-base">
            Join thousands of teams who have already brought their ideas to
            life with our creative studio.
          </p>
        </Reveal>

        {/* CTA buttons */}
        <Reveal delay={0.3} className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4">
          <MagneticButton href="/contact">
            Get Started <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton href="/about" variant="ghost">
            Learn about us
          </MagneticButton>
        </Reveal>
      </div>
    </section>
      

    </div>

  );

}