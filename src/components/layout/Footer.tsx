import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Instagram,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";
import Beams from "../Beams";
import Logo from "@/components/shared/Logo";

// Used elsewhere in the app to reserve scroll space above the fixed footer.
// Kept as an export so existing spacer logic doesn't break.
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

  const socials = [
    { Icon: Twitter, href: "#", label: "Twitter" },
    { Icon: Instagram, href: "#", label: "Instagram" },
    { Icon: Linkedin, href: "#", label: "LinkedIn" },
    { Icon: Github, href: "#", label: "GitHub" },
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
        {/* Fade to solid black at the edges so the beams blend into the page and text stays readable */}
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
            <Logo imageClassName="h-14 sm:h-20 md:h-28 w-auto object-contain max-w-[280px] sm:max-w-[340px]" />
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
        <div className="grid grid-cols-1 gap-6 pt-4 text-center sm:gap-8 sm:pt-6 md:grid-cols-3 md:text-left">
          {/* Contact */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <div className="space-y-1.5 text-xs text-white/50 sm:space-y-2 sm:text-sm">
              <p className="text-sm font-medium text-white sm:text-base">
                hello@ex-creative.tech
              </p>
              <p>+91 98000 12345</p>
              <p className="leading-6">
                Level 14, Innovation Tower
                <br />
                Bengaluru • Dubai • Berlin
              </p>
            </div>
          </motion.div>

          {/* Social */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-1 flex items-center justify-center gap-3 md:order-2 md:items-end"
          >
            {socials.map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                whileHover={{ y: -6, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 backdrop-blur-xl transition-colors hover:border-white hover:bg-white hover:text-black sm:h-12 sm:w-12"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
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