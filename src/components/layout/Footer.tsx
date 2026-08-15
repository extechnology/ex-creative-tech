import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";

import Beams from "../Beams";
import Logo from "@/components/layout/Logo";

export const FOOTER_HEIGHT = 620;

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

const navLinkClass =
  "group relative inline-flex items-center gap-1.5 text-xs font-medium text-white/60 transition-colors duration-300 hover:text-white sm:text-sm";

const navArrowClass =
  "h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100";

const navUnderlineClass =
  "absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full";

/**
 * Policies menu
 * Reveals Privacy Policy and Terms & Conditions.
 */
function PoliciesMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return undefined;

    const handleOutsideInteraction = (
      event: MouseEvent | TouchEvent
    ) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideInteraction
    );

    document.addEventListener(
      "touchstart",
      handleOutsideInteraction
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideInteraction
      );

      document.removeEventListener(
        "touchstart",
        handleOutsideInteraction
      );
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
        className={navLinkClass}
      >
        <span>Policies</span>

        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-300 ${open
              ? "-rotate-180 text-white"
              : "text-white/40"
            }`}
        />

        <span
          className={navUnderlineClass}
          style={open ? { width: "100%" } : undefined}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 10,
              scale: 0.95,
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            className="absolute bottom-full left-1/2 z-20 mb-3 w-48 -translate-x-1/2 overflow-hidden rounded-xl border border-white/10 bg-black/80 shadow-xl shadow-black/50 backdrop-blur-md"
          >
            <span
              aria-hidden="true"
              className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-white/10 bg-black/80"
            />

            <Link
              to="/privacy-policy"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-xs text-white/60 transition-colors duration-200 hover:bg-white/5 hover:text-white sm:text-sm"
            >
              Privacy Policy
            </Link>

            <span className="block h-px w-full bg-white/10" />

            <Link
              to="/terms"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-xs text-white/60 transition-colors duration-200 hover:bg-white/5 hover:text-white sm:text-sm"
            >
              Terms & Conditions
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    {
      to: "/creative",
      label: "Creative",
    },
    {
      to: "/technology",
      label: "Technology",
    },
    {
      to: "/companies",
      label: "Companies",
    },
    {
      to: "/shop",
      label: "Shop",
    },
  ];

  const secondaryLinks = [
    {
      to: "/careers",
      label: "Career",
    },
    {
      to: "/updates",
      label: "Updates",
    },
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

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,black_100%)]" />
      </div>

      {/* Main Footer Content */}
      <div className="relative mx-auto flex h-full w-[min(1400px,92vw)] flex-col justify-between pt-6 pb-3 sm:pt-8 sm:pb-3">
        {/* Top Row */}
        <div className="flex items-start justify-between gap-4">
          {/* Logo */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
            }}
          >
            <Logo
              imageClassName="h-14 w-auto max-w-[240px] object-contain sm:h-20 sm:max-w-[300px] md:h-28 md:max-w-[340px]"
            />
          </motion.div>

          {/* Right Navigation */}
          <div className="hidden flex-col items-end gap-6 pt-9 lg:flex">
            {/* Primary Navigation */}
            <motion.nav
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.1,
              }}
              className="flex items-center gap-8 text-sm text-white/50"
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

            {/* Secondary Navigation */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              className="flex items-center gap-x-7 text-sm"
            >
              {/* Let's Connect */}
              <Link
                to="/contact"
                className={navLinkClass}
              >
                <span>Let&apos;s Connect</span>

                <ArrowUpRight
                  className={navArrowClass}
                />
              </Link>

              {/* Policies */}
              <PoliciesMenu />

              {/* Career / Updates */}
              {secondaryLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className={navLinkClass}
                >
                  <span>{item.label}</span>

                  <ArrowUpRight
                    className={navArrowClass}
                  />

                  <span
                    className={navUnderlineClass}
                  />
                </Link>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Main Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.15,
          }}
          className="my-4 sm:my-6"
        >
          <h2 className="text-[clamp(2.25rem,8vw,6.5rem)] font-light leading-[0.9] tracking-[-0.06em] text-white">
            Let&apos;s Build
            <br />

            <span className="bg-gradient-to-r from-white via-neutral-300 to-white/60 bg-clip-text text-transparent">
              Extraordinary
            </span>
          </h2>
        </motion.div>

        {/* Bottom Group */}
        <div className="space-y-1">
          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {/* Copyright */}
          <div className="pt-3">
            <div className="relative flex items-center justify-end">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.15,
                }}
              >
                <p className="whitespace-nowrap text-xs text-white/40 sm:text-sm">
                  © {year} EX CREATIVE &amp; TECHNOLOGY
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}