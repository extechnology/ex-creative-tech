import { useId } from "react";
import { motion } from "motion/react";
import { Globe, Layers, Code2, Zap } from "lucide-react";

const PROCESS = [
  {
    num: "01",
    title: "Discover",
    desc: "We start with deep research — understanding your audience, market and goals before a single pixel is drawn.",
    icon: Globe,
    variant: "circles" as const,
    from: "#fb923c",
    to: "#dc2626",
  },
  {
    num: "02",
    title: "Architect",
    desc: "We map out the full system — design language, tech stack, information architecture and interaction patterns.",
    icon: Layers,
    variant: "triangleLayers" as const,
    from: "#6ee7b7",
    to: "#059669",
  },
  {
    num: "03",
    title: "Build",
    desc: "Design and engineering happen in parallel. We ship fast, iterate constantly and keep you in the loop daily.",
    icon: Code2,
    variant: "blobLayers" as const,
    from: "#7dd3fc",
    to: "#2563eb",
  },
  {
    num: "04",
    title: "Accelerate",
    desc: "We embed, train and automate — so every product keeps getting smarter, faster and more delightful over time.",
    icon: Zap,
    variant: "triangleSolid" as const,
    from: "#c4b5fd",
    to: "#7c3aed",
  },
];

function ProcessVisual({
  variant,
  from,
  to,
}: {
  variant: "circles" | "triangleLayers" | "blobLayers" | "triangleSolid";
  from: string;
  to: string;
}) {
  const id = useId();
  const gradId = `pv-grad-${id}`;
  const blurId = `pv-blur-${id}`;

  return (
    <svg viewBox="0 0 200 180" className="h-full w-full" preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <filter id={blurId}>
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>

      {variant === "circles" && (
        <g>
          <circle cx="100" cy="78" r="52" fill={`url(#${gradId})`} opacity="0.55" />
          <circle cx="68" cy="122" r="52" fill={`url(#${gradId})`} opacity="0.75" />
          <circle cx="132" cy="122" r="52" fill={`url(#${gradId})`} opacity="0.9" />
        </g>
      )}

      {variant === "triangleLayers" && (
        <g>
          <polygon points="100,20 182,172 18,172" fill={to} opacity="0.18" />
          <polygon points="100,52 160,172 40,172" fill={to} opacity="0.4" />
          <polygon points="100,90 132,172 68,172" fill={to} opacity="0.68" />
          <polygon points="100,128 116,172 84,172" fill={`url(#${gradId})`} opacity="1" />
        </g>
      )}

      {variant === "blobLayers" && (
        <g filter={`url(#${blurId})`}>
          <circle cx="100" cy="145" r="60" fill={to} opacity="0.25" />
          <circle cx="100" cy="118" r="46" fill={to} opacity="0.45" />
          <circle cx="100" cy="90" r="34" fill={to} opacity="0.7" />
          <circle cx="100" cy="66" r="22" fill={`url(#${gradId})`} opacity="1" />
        </g>
      )}

      {variant === "triangleSolid" && (
        <polygon points="100,18 184,172 16,172" fill={`url(#${gradId})`} />
      )}
    </svg>
  );
}

export default function Process() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 md:py-20">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.12]" />

      <div className="relative w-[min(1300px,94vw)] mx-auto">
        <div className="mb-12 flex flex-col gap-6 sm:mb-16 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display font-extrabold uppercase leading-[0.95] tracking-tight text-white text-[clamp(2.25rem,7.5vw,4rem)]"
          >
            How We Work
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-[280px] text-sm leading-relaxed text-white/50 sm:mt-2"
          >
            Work with a team that only makes data-driven decisions. Launch
            delightful user experiences that result in an engaged user base.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
              className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-3xl bg-white/[0.02] sm:min-h-[420px] md:min-h-[520px]"
            >
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 opacity-25 transition-opacity duration-500 group-hover:opacity-40"
                style={{
                  background: `linear-gradient(to top, ${step.to}, transparent)`,
                }}
              />

              <div className="relative z-10 p-6 sm:p-7">
                <div className="mb-3 flex items-center gap-2 text-white/25">
                  <step.icon className="h-4 w-4" />
                  <span className="font-mono text-[11px]">{step.num}</span>
                </div>
                <h3 className="font-display text-lg text-white sm:text-xl">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[220px] text-xs leading-relaxed text-white/45 sm:text-[13px]">
                  {step.desc}
                </p>
              </div>

              <div className="relative z-0 mt-auto h-[180px] w-full sm:h-[210px] md:h-[230px]">
                <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105">
                  <ProcessVisual variant={step.variant} from={step.from} to={step.to} />
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/0 transition-all duration-500 group-hover:ring-white/10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
