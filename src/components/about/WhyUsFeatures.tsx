import { motion } from "motion/react";
import { ArrowRight, Code2, Paintbrush, Zap } from "lucide-react";

const FEATURES = [
  {
    id: 1,
    badge: "01 / CRAFT OVER CODE",
    title: "Unapologetic Visual Craftsmanship",
    desc: "We believe that aesthetics matter fundamentally. Every pixel, micro-interaction, and font weight is meticulously engineered to leave a lasting mark on your visitors.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    imageRight: false,
    icon: Paintbrush,
  },
  {
    id: 2,
    badge: "02 / DESIGN RIGOR",
    title: "Engineering Built for Sub-Second Speed",
    desc: "High taste means nothing if the app stutters. We optimize client-side WebGL canvas shaders, dynamic chunk loading, and layout shifts to achieve flawless 60fps interaction performance.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    imageRight: true,
    icon: Code2,
  },
  {
    id: 3,
    badge: "03 / OUTCOME DRIVEN",
    title: "Radical Focus on Business Outcomes",
    desc: "We don't just ship pretty websites. We align interface design directly with your conversion funnel, product adoption metrics, and long-term user retention goals.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    imageRight: false,
    icon: Zap,
  },
];

export default function WhyUsFeatures() {
  return (
    <section className="py-12 md:py-16 px-5 lg:px-8 max-w-7xl mx-auto text-white relative space-y-16 md:space-y-20">
      {/* Rich Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/15 via-red-600/15 to-blue-600/10 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto space-y-3">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="block text-xs font-mono tracking-[0.25em] uppercase text-purple-400"
        >
          What Makes Us Different
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-sans"
        >
          Built Different. Built Better.
        </motion.h2>
      </div>

      {/* Feature Blocks */}
      <div className="relative z-10 space-y-16 md:space-y-20">
        {FEATURES.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div key={feat.id} className="space-y-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Image Column */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className={`lg:col-span-6 ${
                    feat.imageRight ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl shadow-2xl group">
                    <div className="relative rounded-2xl overflow-hidden h-[280px] sm:h-[360px]">
                      <img
                        src={feat.image}
                        alt={feat.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-transparent" />
                    </div>
                  </div>
                </motion.div>

                {/* Text Column */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className={`lg:col-span-6 space-y-5 ${
                    feat.imageRight ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-purple-400">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{feat.badge}</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight font-sans">
                    {feat.title}
                  </h3>

                  <p className="text-sm sm:text-base text-white/60 leading-relaxed font-normal">
                    {feat.desc}
                  </p>

                  <div className="pt-1">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-red-400 transition-colors group"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Section Separator Line */}
              {idx < FEATURES.length - 1 && (
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
