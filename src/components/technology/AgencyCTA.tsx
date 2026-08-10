import { motion } from "motion/react";
import { ArrowUpRight, Sparkles, Mail } from "lucide-react";
import Strands from "../Strands";

export default function AgencyCTA() {
  return (
    <section id="contact" className="py-16 md:py-24 px-5 lg:px-8 max-w-7xl mx-auto text-white relative overflow-hidden">
      {/* Strands Animated WebGL Canvas Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-85"
        style={{ width: "100%", height: "100%" }}
      >
        <Strands
          colors={["#F97316", "#7C3AED", "#06B6D4"]}
          count={3}
          speed={0.5}
          amplitude={1}
          waviness={1}
          thickness={0.7}
          glow={2.6}
          taper={3}
          spread={1}
          intensity={0.6}
          saturation={2}
          opacity={1}
          scale={1.5}
          glass={false}
          refraction={1}
          dispersion={1}
          glassSize={1}
          hueShift={0}
        />
      </div>

    

      {/* Glass Container Card (MINIMAL BORDER as requested) */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 rounded-3xl border sm:rounded-[40px] bg-[#090a0f]/40 backdrop-blur-sm p-8 sm:p-14 md:p-16 text-center shadow-2xl overflow-hidden"
      >
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/80 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>Start Your Journey</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight font-sans">
            Ready to build something{" "}
            <span className="bg-gradient-to-r from-red-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent italic font-serif font-normal">
              incredible?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-white/65 leading-relaxed max-w-xl mx-auto font-normal">
            Whether you need a ground-up digital product, a WebGL experience, or a complete brand transformation — let's make it happen.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <a
              href="/contact"
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-red-500 via-purple-600 to-indigo-600 text-white font-medium text-xs sm:text-sm shadow-[0_0_25px_rgba(239,68,68,0.4)] hover:shadow-[0_0_35px_rgba(239,68,68,0.7)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href="mailto:contact@excreative.tech"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-medium text-xs sm:text-sm backdrop-blur-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            >
              <Mail className="w-4 h-4 text-purple-400" />
              <span>Contact Us</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}