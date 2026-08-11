import { motion } from "motion/react";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import GradientBlinds from "../GradientBlinds";



export default function ShopCTASection() {


    return (


        <section className="relative isolate flex min-h-[560px] items-center justify-center overflow-hidden bg-[#050308] px-4 py-14 sm:min-h-[620px] sm:px-8 sm:py-20 lg:min-h-[580px]">

            {/* animated blinds backdrop */}
            <div className="absolute inset-0">
                <GradientBlinds
                    gradientColors={["#A855F7", "#5227FF"]}
                    noise={0.5}
                    blindCount={20}
                    blindMinWidth={60}
                    spotlightRadius={0.5}
                    spotlightSoftness={1}
                    spotlightOpacity={1}
                    mouseDampening={0.15}
                    distortAmount={0}
                    shineDirection="left"
                    mixBlendMode="lighten"
                />
            </div>

            {/* vignette so the blinds frame the copy instead of fighting it */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050308_78%)]" />

            {/* content */}
            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-2 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 backdrop-blur-xl sm:mb-8"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-400" />
                    </span>
                    <ShoppingBag className="h-3.5 w-3.5 text-purple-300" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 sm:text-xs">
                        New Collection
                    </span>
                </motion.div>

                <h2 className="text-[clamp(2.1rem,8vw,4.4rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-white">
                    <motion.span
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="block"
                    >
                        Straight From
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, delay: 0.24 }}
                        className="block text-white bg-clip-text italic text-transparent"
                    >
                        Our Studio Floor.
                    </motion.span>
                </h2>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: 0.36 }}
                    className="mt-5 max-w-xl text-sm leading-relaxed text-white/50 sm:mt-6 sm:text-base sm:leading-relaxed md:text-lg"
                >
                    Prints, kits, and limited drops made by the same studios building
                    everything else here — for the people who already believe in it.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: 0.48 }}
                    className="mt-8 flex w-full flex-col items-center gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4"
                >
                    <a
                        href="#products"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 via-violet-400 to-sky-400 px-7 py-3.5 text-sm font-bold text-black transition-transform duration-300 active:scale-95 sm:w-auto sm:text-base"
                    >
                        Browse The Shop
                        <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <a
                        href="#new-arrivals"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-bold text-white backdrop-blur-xl transition-colors duration-300 hover:bg-white/[0.09] active:scale-95 sm:w-auto sm:text-base"
                    >
                        View New Arrivals
                        <ArrowUpRight className="h-4 w-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}