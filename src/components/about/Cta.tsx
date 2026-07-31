import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import Strands from "@/components/Strands";

export default function CTASection() {
    return (
        <section className="relative py-20 sm:py-28 px-5 sm:px-6 lg:px-8 overflow-hidden">
            {/* Strands WebGL background, filling the section */}
            <div style={{ position: "absolute", inset: 0 }} className="pointer-events-none opacity-85">
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

            {/* Vignette for legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/90 via-[#050508]/45 to-[#050508]/90 pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-[#08090e]/85 border border-white/15 backdrop-blur-xl rounded-3xl sm:rounded-[36px] p-7 sm:p-14"
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F97316]/10 border border-[#F97316]/30 text-[#F97316] text-xs font-medium mb-5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Built for teams that hate updating a CRM</span>
                    </div>

                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                        Ready to stop dreading your CRM?
                    </h2>

                    <p className="mt-4 max-w-xl mx-auto text-sm text-white/65 leading-relaxed">
                        See how Closeify handles your pipeline automatically — book a walkthrough with
                        your actual data, not a demo account.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <motion.a
                            href="/contact"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-white font-medium text-sm shadow-[0_0_25px_rgba(249,115,22,0.35)] hover:shadow-[0_0_35px_rgba(249,115,22,0.55)] transition-shadow"
                            style={{
                                background: "linear-gradient(90deg, #F97316, #7C3AED)",
                            }}
                        >
                            <span>Get started free</span>
                            <ArrowRight className="w-4 h-4" />
                        </motion.a>

                        <motion.a
                            href="/contact"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/20 text-white font-medium text-sm backdrop-blur-md transition-colors"
                        >
                            <span>Book a demo</span>
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}