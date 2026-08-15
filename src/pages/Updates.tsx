import UpdatesHero from "@/components/updates/UpdatesHero";
import BlogSection from "@/components/updates/blog/BlogSection";
import Plasma from "@/components/Plasma";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRight } from "lucide-react";



export default function UpdatesPage() {


  return (


    <div className="bg-[#050505] text-white selection:bg-amber-500 selection:text-black overflow-x-hidden">


      {/* 1. Hero */}
      <UpdatesHero />


      {/* Section Separator with Amber Glow */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-4 bg-amber-500/15 blur-lg pointer-events-none" />
      </div>


      {/* 2. Blog Section */}
      <BlogSection />


      {/* Section Separator with Amber Glow */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-4 bg-amber-500/15 blur-lg pointer-events-none" />
      </div>


      {/* 3. Newsletter CTA Section */}
      <section className="relative overflow-hidden py-24 noise sm:py-12 md:py-16">


        {/* Plasma background */}
        <div className="pointer-events-none absolute inset-0">
          <Plasma
            color="#F59E0B"
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


        {/* Dark overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/80 via-black/35 to-black/90" />


        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,rgba(0,0,0,0.88)_85%)]" />


        <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.10]" />


        {/* Content */}
        <div className="relative mx-auto flex w-[min(760px,92vw)] flex-col items-center text-center">


          {/* Eyebrow */}
          <Reveal>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
              </span>

              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
                Stay in the loop
              </span>
            </div>
          </Reveal>


          {/* Heading */}
          <Reveal delay={0.08}>
            <h2 className="max-w-[720px] text-[clamp(2.6rem,7vw,5rem)] font-medium leading-[0.98] tracking-[-0.045em] text-white">
              Ideas worth
              <br />
              <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                knowing about.
              </span>
            </h2>
          </Reveal>


          {/* Description */}
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-[560px] text-[14px] leading-7 text-white/45 sm:mt-7 sm:text-[15px]">
              Stories, insights, and ideas from the people building
              <br className="hidden sm:block" />
              what comes next — delivered straight to your inbox.
            </p>
          </Reveal>


          {/* Newsletter form */}
          <Reveal
            delay={0.24}
            className="mt-3 w-full sm:mt-5"
          >

            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Add newsletter subscription logic here
              }}
              className="group relative mx-auto flex w-full max-w-[620px] flex-col gap-2 rounded-[20px] border border-white/[0.12] bg-black/40 p-2 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-500 hover:border-white/20 focus-within:border-amber-400/40 focus-within:shadow-[0_20px_80px_rgba(245,158,11,0.12)] sm:flex-row"
            >
              {/* Ambient glow */}
              <div className="pointer-events-none absolute -inset-px -z-10 rounded-[21px] bg-gradient-to-r from-amber-400/0 via-amber-400/10 to-rose-400/0 opacity-0 blur-xl transition-opacity duration-500 group-focus-within:opacity-100" />

              {/* Email input */}
              <div className="relative flex min-w-0 flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-[17px] w-[17px] text-white/25 transition-colors duration-300 group-focus-within:text-amber-400/60"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 6.75A2.25 2.25 0 0 1 5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 17.25V6.75Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m3.75 6 7.017 5.263a2 2 0 0 0 2.466 0L20.25 6"
                    />
                  </svg>
                </div>

                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  aria-label="Email address"
                  className="h-[58px] w-full rounded-[14px] bg-white/[0.035] pl-11 pr-4 text-[14px] text-white outline-none placeholder:text-white/30 transition-all duration-300 focus:bg-white/[0.055]"
                />
              </div>

              {/* Subscribe button */}
              <button
                type="submit"
                className="group/button relative flex h-[58px] shrink-0 items-center justify-center gap-2.5 overflow-hidden rounded-[14px] border border-amber-300/30 bg-gradient-to-r from-amber-400 via-orange-400 to-orange-500 px-7 text-[13px] font-semibold text-black shadow-[0_8px_30px_rgba(245,158,11,0.22)] transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_12px_35px_rgba(245,158,11,0.32)] active:translate-y-0"
              >
                {/* Button shine */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/button:translate-x-full" />

                <span className="relative">
                  Subscribe
                </span>

                <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
              </button>
            </form>
          </Reveal>

          {/* Trust / metadata */}
          <Reveal delay={0.32}>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-white/30">
              <span>Weekly newsletter</span>

              <span className="h-1 w-1 rounded-full bg-white/20" />

              <span>Curated insights</span>

              <span className="h-1 w-1 rounded-full bg-white/20" />

              <span>No spam</span>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
