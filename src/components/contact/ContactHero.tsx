import { motion } from "motion/react";
import { ArrowUpRight, MessageSquare, Clock, Globe, Sparkles } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[#050505] text-white">
      {/* Ambient Emerald & Teal Gradient Blur Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] bg-gradient-to-tr from-emerald-600/20 via-teal-600/25 to-cyan-500/10 rounded-full blur-[120px] pointer-events-none z-0 opacity-75" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-teal-600/15 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Grid line overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Small Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-inner text-xs sm:text-sm text-white/80 font-medium"
            >
              <span className="flex h-2 w-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 animate-pulse" />
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span className="tracking-wide">Contact & Collaboration</span>
            </motion.div>

            {/* Huge Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
              className="font-sans text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]"
            >
              Let's Build <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-white via-white/90 to-white/40 bg-clip-text text-transparent">
                Something Great
              </span>{" "}
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent italic font-serif font-normal">
                Together.
              </span>
            </motion.h1>

            {/* Short Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg text-white/60 leading-relaxed font-normal"
            >
              Have a project in mind, an architectural question, or an AI concept? Reach out to our engineering team — we respond within 24 business hours to map out your product roadmap.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <a
                href="#contact-form"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-all duration-300 shadow-[0_0_30px_rgba(0,230,118,0.25)] hover:shadow-[0_0_40px_rgba(0,230,118,0.45)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Start Inquiry</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#hubs"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 text-white font-medium text-sm backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Hubs</span>
              </a>
            </motion.div>
          </div>

          {/* Right Hero Image Column with Floating Overlay Cards */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl shadow-2xl group"
            >
              <div className="relative rounded-2xl overflow-hidden h-[340px] sm:h-[440px]">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
                  alt="EX-Creative Global Collaboration Workspace"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
