import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import Beams from "../Beams";
import Logo from "@/components/shared/Logo";

// Used elsewhere in the app to reserve scroll space above the fixed footer.
export const FOOTER_HEIGHT = 620;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { to: "/", label: "Creative" },
    { to: "/technology", label: "Technology" },
    { to: "/companies", label: "Companies" },
    { to: "/shop", label: "Shop" },
  ];

  return (
    <footer
      className="fixed inset-x-0 bottom-0 z-0 overflow-hidden bg-black"
      style={{ height: FOOTER_HEIGHT }}
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Beams
            beamWidth={3}
            beamHeight={30}
            beamNumber={20}
            lightColor="#ffffff"
            speed={2}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={30}
          />
        </div>

        {/* Fade to solid black at the edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,black_100%)]" />
      </div>

      <div className="relative mx-auto flex h-full w-[min(1400px,92vw)] flex-col justify-between py-6 sm:py-8">

        {/* Top row */}
        <div className="flex items-center justify-between gap-4">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Logo
              imageClassName="h-14 sm:h-20 md:h-28 w-auto object-contain max-w-[280px] sm:max-w-[340px]"
            />
          </motion.div>

          <motion.nav
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden items-center gap-8 text-sm text-white/50 lg:flex"
          >
            {links.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="group flex items-center gap-1 transition-colors hover:text-white"
              >
                {item.label}

                <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            ))}
          </motion.nav>
        </div>

        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="my-4 sm:my-6"
        >
          <h2 className="font-light leading-[0.9] tracking-[-0.06em] text-white text-[clamp(2.25rem,8vw,6.5rem)]">
            Let&apos;s Build
            <br />

            <span className="bg-gradient-to-r from-white via-neutral-300 to-white/60 bg-clip-text text-transparent">
              Extraordinary
            </span>
          </h2>
        </motion.div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        {/* Bottom row */}
        <div className="grid grid-cols-1 gap-8 pt-5 text-center sm:gap-10 md:grid-cols-3 md:pt-7 md:text-left">

          {/* LEFT — Let's Connect + Policies */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 flex flex-col items-center md:items-start"
          >

            {/* Let's Connect Button */}
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.12)]"
            >
              <span>Let&apos;s Connect</span>

              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover:bg-black/10">
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Link>

            {/* Policies */}
            <div className="mt-6">

              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/30">
                Policies
              </p>

              <div className="flex flex-row items-center gap-1 md:items-start">

                <Link
                  to="/privacy-policy"
                  className="group flex items-center gap-1.5 text-xs text-white/45 transition-colors duration-300 hover:text-white"
                >
                  Privacy Policy

                  <ChevronRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>

                <Link
                  to="/terms"
                  className="group flex items-center gap-1.5 text-xs text-white/45 transition-colors duration-300 hover:text-white"
                >
                  Terms & Conditions

                  <ChevronRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>

              </div>
            </div>
          </motion.div>

          {/* CENTER — Career + Updates */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-2 flex items-center justify-center mt-8"
          >
            <div className="flex flex-row items-center gap-8">

              <Link
                to="/careers"
                className="group relative flex items-center gap-2 text-base font-medium text-white/70 transition-colors duration-300 hover:text-white"
              >
                Career

                <ArrowUpRight
                  className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                />

                <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>

              <Link
                to="/updates"
                className="group relative flex items-center gap-2 text-base font-medium text-white/70 transition-colors duration-300 hover:text-white"
              >
                Updates

                <ArrowUpRight
                  className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                />

                <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>

            </div>
          </motion.div>

          {/* RIGHT — Copyright */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="order-3 flex items-center justify-center md:items-end md:justify-end"
          >
            <div className="space-y-1 text-center md:text-right">

              <p className="text-xs text-white/40 sm:text-sm">
                © {year} EX-Creative Technology
              </p>

              <p className="text-[11px] text-white/20 sm:text-xs">
                Crafted with passion.
              </p>

            </div>
          </motion.div>

        </div>
      </div>
    </footer>
  );
}