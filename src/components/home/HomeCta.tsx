import { motion } from "motion/react";
import MagicRings from "@/components/MagicRings";
import { MagneticButton } from "@/components/Reveal";
import { ArrowUpRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Animation Constants                                                */
/* ------------------------------------------------------------------ */

const EASE_OUT = [0.2, 0.8, 0.2, 1] as const;
const VIEWPORT = { once: true, amount: 0.1 } as const;

/* ------------------------------------------------------------------ */
/*  Section Label Badge                                               */
/* ------------------------------------------------------------------ */

function EyebrowBadge({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="flex justify-center"
        >
            <div
                className="inline-flex items-center gap-3 rounded-full border border-[#9333EA]/35 bg-[#9333EA]/15 px-4 py-2 text-[11px] font-semibold uppercase text-white/90 backdrop-blur-xl shadow-[0_0_22px_rgba(147,51,234,0.3)]"
                style={{ letterSpacing: "0.14em" }}
            >
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#C084FC] via-[#A855F7] to-[#9333EA]" />
                <span>{children}</span>
            </div>
        </motion.div>
    );
}

/* ------------------------------------------------------------------ */
/*  Home CTA Section (EX EDU Logo Brand Theme)                        */
/* ------------------------------------------------------------------ */

export default function HomeCta() {
    return (
        <section
            data-palette=""
            data-palette-a="#c084fc"
            data-palette-b="#a855f7"
            data-palette-c="#9333ea"
            data-palette-bg="#04070c"
            className="relative min-h-[100svh] overflow-hidden bg-[#04070c] px-4 pb-8 pt-28 text-white sm:min-h-[85svh] sm:px-8 sm:py-20 md:py-24"
        >
            <div className="absolute inset-0 bg-[#04070c]" />

            {/* ── EX EDU Purple Magic Rings Radial Background ──────────── */}
            <div className="pointer-events-none absolute inset-0 scale-[1.18] opacity-85 sm:scale-100 sm:opacity-95">
                <MagicRings
                    color="#9333EA"
                    colorTwo="#C084FC"
                    ringCount={6}
                    speed={1}
                    attenuation={10}
                    lineThickness={1.8}
                    baseRadius={0.35}
                    radiusStep={0.1}
                    scaleRate={0.1}
                    opacity={1}
                    blur={0}
                    noiseAmount={0.1}
                    rotation={0}
                    ringGap={1.5}
                    fadeIn={0.7}
                    fadeOut={0.5}
                    followMouse={false}
                    mouseInfluence={0.2}
                    hoverScale={1.2}
                    parallax={0.05}
                    clickBurst={false}
                />
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(4,7,12,0.1),rgba(4,7,12,0.65)_58%,rgba(4,7,12,0.95)_100%)]" />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#04070c] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#04070c] to-transparent" />

            <div className="relative z-10 mx-auto flex min-h-[calc(100svh-9rem)] w-full max-w-[1200px] flex-col items-center justify-center text-center sm:min-h-[68svh] sm:w-[min(1200px,94vw)]">
                <EyebrowBadge>Next Move</EyebrowBadge>

                <motion.h2
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.85, ease: EASE_OUT, delay: 0.1 }}
                    className="mt-6 max-w-[22rem] font-sans text-4xl font-semibold leading-[1.04] text-white sm:mt-8 sm:max-w-5xl sm:text-6xl sm:leading-[1.02] md:text-7xl"
                >
                    Creative Capabilities.{" "}
                    <span className="block bg-gradient-to-r from-white via-[#C084FC] to-[#9333EA] bg-clip-text text-transparent italic drop-shadow-[0_0_30px_rgba(147,51,234,0.45)]">
                        Stronger Businesses.
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.75, delay: 0.2, ease: EASE_OUT }}
                    className="mt-5 max-w-[22rem] text-[15px] leading-6 text-white/65 sm:mt-7 sm:max-w-2xl sm:text-base sm:leading-7 md:text-lg"
                >
                    Build the skills, ideas, and practical expertise to create stronger brands, solve
                    business challenges, adapt to markets, and grow sustainably.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
                    className="mt-8 flex w-full flex-col items-center gap-3.5 px-1 sm:mt-10 sm:w-auto sm:flex-row sm:justify-center sm:px-0"
                >
                    <MagneticButton
                        href="/companies#ex-edu"
                        variant="ghost"
                        className="w-full max-w-[360px] sm:w-auto sm:max-w-none"
                    >
                        Identify the Platform <ArrowUpRight className="h-4 w-4" />
                    </MagneticButton>
                    <MagneticButton
                        href="https://exedu.in"
                        variant="ghost"
                        className="w-full max-w-[360px] sm:w-auto sm:max-w-none"
                    >
                        Increase Creative Strength <ArrowUpRight className="h-4 w-4" />
                    </MagneticButton>
                </motion.div>
            </div>
        </section>
    );
}
