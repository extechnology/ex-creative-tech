import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import Beams from "../Beams";
import Logo from "@/components/shared/Logo";

// Used elsewhere in the app to reserve scroll space above the fixed footer.
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

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    {
      to: "/",
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

  return (
    <footer
      className="fixed inset-x-0 bottom-0 z-0 overflow-hidden bg-black"
      style={{ height: FOOTER_HEIGHT }}
    >
      {/* ============================================================
          BACKGROUND
      ============================================================ */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden bg-black">
        {/* Beams */}
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

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />

        {/* Edge vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,black_100%)]" />
      </div>

      {/* ============================================================
          MAIN FOOTER CONTENT
      ============================================================ */}
      <div className="relative mx-auto flex h-full w-[min(1400px,92vw)] flex-col justify-between py-6 sm:py-8">

        {/* ============================================================
            TOP ROW
        ============================================================ */}
        <div className="flex items-center justify-between gap-4">
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
              imageClassName="
                h-14
                w-auto
                max-w-[240px]
                object-contain
                sm:h-20
                sm:max-w-[300px]
                md:h-28
                md:max-w-[340px]
              "
            />
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            className="
              hidden
              items-center
              gap-8
              text-sm
              text-white/50
              lg:flex
            "
          >
            {links.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="
                  group
                  flex
                  items-center
                  gap-1
                  transition-colors
                  hover:text-white
                "
              >
                {item.label}

                <ArrowUpRight
                  className="
                    h-3.5
                    w-3.5
                    -translate-x-1
                    opacity-0
                    transition-all
                    duration-300
                    group-hover:translate-x-0
                    group-hover:opacity-100
                  "
                />
              </Link>
            ))}
          </motion.nav>
        </div>

        {/* ============================================================
            MAIN HEADING
        ============================================================ */}
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
          <h2
            className="
              text-[clamp(2.25rem,8vw,6.5rem)]
              font-light
              leading-[0.9]
              tracking-[-0.06em]
              text-white
            "
          >
            Let&apos;s Build
            <br />

            <span
              className="
                bg-gradient-to-r
                from-white
                via-neutral-300
                to-white/60
                bg-clip-text
                text-transparent
              "
            >
              Extraordinary
            </span>
          </h2>
        </motion.div>

        {/* ============================================================
            DIVIDER
        ============================================================ */}
        <div
          className="
            h-px
            w-full
            bg-gradient-to-r
            from-transparent
            via-white/15
            to-transparent
          "
        />

        {/* ============================================================
            BOTTOM ROW

            Desktop:
            Let's Connect | Privacy | Terms      Career | Updates      Copyright

            Mobile:
            Let's Connect | Privacy
            Terms

            Career | Updates

            Copyright
        ============================================================ */}
        <div className="pt-5 sm:pt-7">
          <div
            className="
              flex
              flex-col
              gap-6
              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            {/* ========================================================
                LEFT
                Let's Connect + Policies
            ======================================================== */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
              }}
              className="
                flex
                flex-wrap
                items-center
                justify-center
                gap-x-5
                gap-y-3
                md:justify-start
              "
            >
              {/* Let's Connect */}
              <Link
                to="/contact"
                className="
                  group
                  inline-flex
                  items-center
                  gap-1.5
                  text-sm
                  font-medium
                  text-white/80
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                <span>Let&apos;s Connect</span>

                <ArrowUpRight
                  className="
                    h-3.5
                    w-3.5
                    -translate-x-1
                    translate-y-0
                    opacity-0
                    transition-all
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                    group-hover:opacity-100
                  "
                />
              </Link>

              {/* Privacy Policy */}
              <Link
                to="/privacy-policy"
                className="
                  text-xs
                  text-white/40
                  transition-colors
                  duration-300
                  hover:text-white
                  sm:text-sm
                "
              >
                Privacy Policy
              </Link>

              {/* Terms & Conditions */}
              <Link
                to="/terms"
                className="
                  text-xs
                  text-white/40
                  transition-colors
                  duration-300
                  hover:text-white
                  sm:text-sm
                "
              >
                Terms & Conditions
              </Link>
            </motion.div>

            {/* ========================================================
                CENTER
                Career + Updates
            ======================================================== */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.1,
              }}
              className="
                flex
                items-center
                justify-center
                gap-7
              "
            >
              {/* Career */}
              <Link
                to="/careers"
                className="
                  group
                  relative
                  inline-flex
                  items-center
                  gap-1.5
                  text-sm
                  font-medium
                  text-white/60
                  transition-colors
                  duration-300
                  hover:text-white
                  sm:text-base
                "
              >
                <span>Career</span>

                <ArrowUpRight
                  className="
                    h-3.5
                    w-3.5
                    -translate-x-1
                    opacity-0
                    transition-all
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                    group-hover:opacity-100
                  "
                />

                <span
                  className="
                    absolute
                    -bottom-1
                    left-0
                    h-px
                    w-0
                    bg-white
                    transition-all
                    duration-300
                    group-hover:w-full
                  "
                />
              </Link>

              {/* Updates */}
              <Link
                to="/updates"
                className="
                  group
                  relative
                  inline-flex
                  items-center
                  gap-1.5
                  text-sm
                  font-medium
                  text-white/60
                  transition-colors
                  duration-300
                  hover:text-white
                  sm:text-base
                "
              >
                <span>Updates</span>

                <ArrowUpRight
                  className="
                    h-3.5
                    w-3.5
                    -translate-x-1
                    opacity-0
                    transition-all
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                    group-hover:opacity-100
                  "
                />

                <span
                  className="
                    absolute
                    -bottom-1
                    left-0
                    h-px
                    w-0
                    bg-white
                    transition-all
                    duration-300
                    group-hover:w-full
                  "
                />
              </Link>
            </motion.div>

            {/* ========================================================
                RIGHT
                Copyright
            ======================================================== */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.15,
              }}
              className="
                flex
                justify-center
                md:justify-end
              "
            >
              <p
                className="
                  whitespace-nowrap
                  text-center
                  text-xs
                  text-white/40
                  sm:text-sm
                  md:text-right
                "
              >
                © {year} EX-Creative & Technology
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}