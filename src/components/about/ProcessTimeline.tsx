import { motion } from "motion/react";
import {
  DollarSign,
  TrendingUp,
  ArrowLeftRight,
  Lock,
  Settings,
  Headphones,
} from "lucide-react";

const PROCESS_ITEMS = [
  {
    id: "savings",
    title: "Instant Savings",
    desc: "Get immediate savings on every project, powered by intelligent workflow optimization and clear strategic alignment.",
    icon: DollarSign,
  },
  {
    id: "insights",
    title: "Real-Time Insights",
    desc: "Make smarter decisions with live data and actionable design engineering insights, delivered in real-time to stay ahead of the curve.",
    icon: TrendingUp,
  },
  {
    id: "plans",
    title: "Flexible Plans",
    desc: "Choose plans that adapt to your business needs, offering unparalleled scalability and cost-effectiveness for every phase.",
    icon: ArrowLeftRight,
  },
  {
    id: "secure",
    title: "Secure Transactions",
    desc: "Prioritize safety with cutting-edge encryption and robust security features for every interaction and deployment.",
    icon: Lock,
  },
  {
    id: "adaptive",
    title: "Adaptive Features",
    desc: "Leverage AI-driven features that evolve with your business, ensuring efficiency and innovation at every step.",
    icon: Settings,
  },
  {
    id: "support",
    title: "Dedicated Support",
    desc: "Access expert assistance 24/7 to ensure you're never alone on your growth journey and technical execution.",
    icon: Headphones,
  },
];

export default function ProcessTimeline() {
  return (
    <section className="py-12 md:py-16 px-5 lg:px-8 max-w-7xl mx-auto text-white relative overflow-hidden">
      {/* Glowing background spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/20 to-purple-600/15 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Section Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-3 mb-10 md:mb-14">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="block text-xs font-mono tracking-[0.25em] uppercase text-blue-400 font-semibold"
        >
          Our Capabilities
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-sans"
        >
          Streamlined Execution for Maximum Impact.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xs sm:text-sm text-white/60 max-w-lg mx-auto font-normal"
        >
          Built for scale, security, and speed — empowering your business with modern web engineering.
        </motion.p>
      </div>

      {/* Grid: 3 columns x 2 rows (desktop), 1 column (mobile) */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {PROCESS_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl sm:rounded-[22px] bg-[#090a10]/90 backdrop-blur-2xl border border-white/[0.08] hover:border-blue-500/40 p-7 flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.7)] transition-all duration-300 overflow-hidden"
            >
              {/* Softer Inner Radial Glow on Hover */}
              <div className="absolute -top-14 -left-14 w-32 h-32 bg-blue-500/15 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/30 transition-colors duration-500" />

              <div>
                {/* Square Icon Box with Glowing Blue Accent */}
                <div className="w-12 h-12 rounded-xl bg-[#0e1220] border border-blue-500/35 shadow-[0_0_18px_rgba(59,130,246,0.3)] flex items-center justify-center text-blue-400 mb-6 group-hover:border-blue-400 group-hover:shadow-[0_0_22px_rgba(59,130,246,0.5)] transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-2.5 font-sans">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-white/55 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}