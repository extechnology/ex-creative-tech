import { motion } from "motion/react";
import {
  Cpu,
  Globe2,
  Zap,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

const PILLARS: {
  label: string;
  desc: string;
  icon: LucideIcon;
  image: string;
  accent: string;
  glow: string;
  iconBg: string;
}[] = [
    {
      label: "Digitize",
      desc: "Transform traditional processes into efficient digital systems that boost productivity.",
      icon: Cpu,
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
      accent: "text-violet-300",
      glow: "rgba(139,92,246,0.45)",
      iconBg: "bg-violet-500/15",
    },
    {
      label: "Connect",
      desc: "Bridge businesses with customers, markets, and opportunities without boundaries.",
      icon: Globe2,
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85",
      accent: "text-fuchsia-300",
      glow: "rgba(217,70,239,0.45)",
      iconBg: "bg-fuchsia-500/15",
    },
    {
      label: "Optimize",
      desc: "Leverage automation and data to simplify decisions and maximize efficiency.",
      icon: Zap,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
      accent: "text-rose-300",
      glow: "rgba(244,63,94,0.45)",
      iconBg: "bg-rose-500/15",
    },
    {
      label: "Achieve",
      desc: "Turn strategy into measurable results and sustainable, competitive growth.",
      icon: TrendingUp,
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
      accent: "text-red-300",
      glow: "rgba(239,68,68,0.45)",
      iconBg: "bg-red-500/15",
    },
  ];



function PillarCard({
  label,
  desc,
  icon: Icon,
  image,
  accent,
  glow,
  iconBg,
  index,
}: {
  label: string;
  desc: string;
  icon: LucideIcon;
  image: string;
  accent: string;
  glow: string;
  iconBg: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.65,
        delay: index * 0.1,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className="group relative"
    >
      <div
        className="relative h-[530px] overflow-hidden rounded-[28px] bg-[#0a0a0b] shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-all duration-500 group-hover:-translate-y-2"
      >
        {/* Image */}
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Simple dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/90" />


        {/* Top information */}
        <div className="absolute left-7 right-7 top-7 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-medium text-white/45">
              0{index + 1}
            </span>

            <span className="h-px w-5 bg-white/25" />

            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-white/75">
              {label}
            </span>
          </div>

          {/* Icon */}
          <div
            className={`flex h-12 w-12 bg-black items-center justify-center rounded-full backdrop-blur-md transition-all duration-500 group-hover:scale-110`}
          >
            <Icon
              className={`h-5 w-5  drop-shadow-[0_0_8px_currentColor]`}
            />
          </div>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8">
          {/* Small accent */}
          <div
            className={`mb-5 h-[2px] w-10 bg-gradient-to-r from-current to-transparent ${accent} transition-all duration-500 group-hover:w-16`}
          />

          <h3 className="text-3xl font-semibold tracking-tight text-white md:text-[34px]">
            {label}
          </h3>

          <p className="mt-3 max-w-[34ch] text-[14px] leading-[1.7] text-white/65 transition-colors duration-500 group-hover:text-white/85">
            {desc}
          </p>
        </div>

        {/* Very subtle hover border */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            boxShadow: `inset 0 0 0 1px ${glow}`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function TechEmpowerment() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-16 text-white md:py-20">

      {/* Main section glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-[35%] h-[650px] w-[1000px] -translate-x-1/2 rounded-full opacity-30 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,.20), rgba(239,68,68,.12), transparent 65%)",
        }}
      />

      {/* Left glow */}
      <div
        className="pointer-events-none absolute -left-40 top-[20%] h-[400px] w-[400px] rounded-full blur-[130px]"
        style={{
          background: "rgba(124,58,237,0.10)",
        }}
      />

      {/* Right glow */}
      <div
        className="pointer-events-none absolute -right-40 bottom-[10%] h-[450px] w-[450px] rounded-full blur-[140px]"
        style={{
          background: "rgba(239,68,68,0.10)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Heading */}
        <div className="relative mb-14 max-w-3xl md:mb-10">

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 block text-xs font-mono uppercase tracking-[0.25em] text-red-400"
          >
            Why technology
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl"
          >
            Turning ambition into{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-red-400 bg-clip-text text-transparent">
              measurable results.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/50"
          >
            Technology empowers businesses to work smarter, operate faster,
            and connect with wider markets — enabling innovation, automation,
            and scalable solutions that strengthen competitiveness and create
            sustainable growth.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar, i) => (
            <PillarCard
              key={pillar.label}
              index={i}
              {...pillar}
            />
          ))}
        </div>

      </div>
    </section>
  );
}