import { motion } from "motion/react";
import { Sparkles, Calendar, Rocket, Users, Globe2 } from "lucide-react";

const TIMELINE = [
  {
    year: "2022",
    title: "Company started",
    desc: "EX-Creative Technology was founded as a boutique studio focusing on design systems & frontend engineering for ambitious tech founders.",
    icon: Rocket,
  },
  {
    year: "2023",
    title: "First SaaS product",
    desc: "Shipped our first proprietary internal tool platform that scaled to over 100,000 active monthly users with zero downtime.",
    icon: Sparkles,
  },
  {
    year: "2024",
    title: "20+ global clients",
    desc: "Expanded client roster across US, Europe, and Asia, engineering high-throughput Web3, AI, and enterprise web applications.",
    icon: Users,
  },
  {
    year: "2025",
    title: "Global expansion",
    desc: "Opened collaborative design hubs in Mumbai and London, growing our team of product designers, engineers, and creative directors.",
    icon: Globe2,
  },
];

export default function CompanyStory() {
  return (
    <section id="our-story" className="py-16 md:py-16 px-5 lg:px-8 max-w-7xl mx-auto text-white relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-3xl mb-12 md:mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="block text-xs font-mono tracking-[0.25em] uppercase text-red-400 mb-4"
        >
          Our journey
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.05]"
        >
          Crafting digital platforms from zero to one.
        </motion.h2>
      </div>

      {/* Grid: Left Image & Story / Right Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Image & Company Story text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 space-y-6"
        >
          {/* Large Image, no frame/border */}
          <div className="relative rounded-2xl overflow-hidden group">
            <div className="h-[340px] sm:h-[440px]">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
                alt="EX-Creative Technology Founders Workshop"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-purple-300">
                Design & engineering lab
              </span>
              <h4 className="text-xl font-semibold text-white mt-1">
                Iterative craft & rigor
              </h4>
            </div>
          </div>

          {/* Text Paragraphs */}
          <div className="space-y-4 text-white/60 text-base leading-relaxed max-w-lg">
            <p>
              EX-Creative Technology was created out of a simple frustration: most digital products look generic and feel sluggish. We set out to change that by fusing high-taste visual design with ultra-performant engineering.
            </p>
            <p>
              We don't build template websites. We architect custom digital engines — combining framer-motion micro-interactions, responsive design systems, and robust full-stack codebases that help our partners dominate their categories.
            </p>
          </div>
        </motion.div>

        {/* Right Column: Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-6"
        >
          {TIMELINE.map((item, idx) => {
            const Icon = item.icon;
            const isLast = idx === TIMELINE.length - 1;
            return (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`group py-7 ${!isLast ? "border-b border-white/[0.08]" : ""}`}
              >
                <div className="flex items-start gap-6">
                  <span className="text-3xl sm:text-4xl font-mono font-bold text-white/15 group-hover:text-red-400/80 transition-colors duration-300 tabular-nums leading-none pt-1">
                    {item.year}
                  </span>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>{item.title}</span>
                    </h3>
                    <p className="text-sm sm:text-base text-white/50 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}