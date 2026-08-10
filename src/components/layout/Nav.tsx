import { useState, useEffect, type CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, ChevronDown, ArrowRight } from "lucide-react";
import Logo from "@/components/shared/Logo";


// Nav items
const NAV_LINKS = [
  { href: "/", label: "Creative" },
  { href: "/technology", label: "Technology" },
  { href: "/companies", label: "Companies" },
  { href: "/shop", label: "Shop" },
];

const COMPANY_LINKS = [
  {
    href: "/companies#ex-media",
    label: "Ex-Media",
    description: "Brand systems, campaigns, motion, and content studio work.",
    logo: "/ex-media-logo.png",
    accent: "#D81B60",
  },
  {
    href: "/companies#ex-technology",
    label: "Ex-Technology",
    description: "Production software, cloud infrastructure, and AI systems.",
    logo: "/ex-tech-logo.png",
    accent: "#00E5FF",
  },
  {
    href: "/companies#ex-edu",
    label: "Ex-Edu",
    description: "AI learning paths, mentorship, and career-ready cohorts.",
    logo: "/ex-edu-logo.png",
    accent: "#A855F7",
  },
  {
    href: "/companies#ex-bot",
    label: "Ex-Bot",
    description: "WhatsApp-first AI agents and business automation.",
    logo: "/ex-bot-logo.png",
    accent: "#25D366",
  },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setCompanyOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className={`fixed z-50 w-[min(1300px,94vw)] left-1/2 -translate-x-1/2 transition-all duration-500 ${scrolled ? "top-2" : "top-4"
          }`}
      >
        <div className={`glass shadow-2xl rounded-full flex items-center justify-between px-6 py-3.5 transition-all duration-500 ${scrolled ? "shadow-[0_8px_32px_rgba(0,0,0,0.6)]" : ""
          }`}>


          {/* Logo */}
          <Logo imageClassName="h-8 sm:h-8 md:h-10 w-auto object-contain max-h-12 sm:max-h-14 min-w-[140px] sm:min-w-[170px]" />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7 text-sm text-white/60">
            {NAV_LINKS.map((l) => {
              const isActive = l.href === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(l.href);
              if (l.href === "/companies") {
                return (
                  <div
                    key={l.href}
                    className="relative"
                    onMouseEnter={() => setCompanyOpen(true)}
                    onMouseLeave={() => setCompanyOpen(false)}
                    onFocus={() => setCompanyOpen(true)}
                    onBlur={(event) => {
                      const nextTarget = event.relatedTarget;
                      if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
                        setCompanyOpen(false);
                      }
                    }}
                  >
                    <Link
                      to={l.href}
                      className={`group relative flex items-center gap-1.5 py-1 transition-colors hover:text-white ${isActive ? "text-white" : ""
                        }`}
                      aria-haspopup="menu"
                      aria-expanded={companyOpen}
                      data-cursor="hover"
                    >
                      {l.label}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${companyOpen ? "rotate-180 text-white" : ""
                          }`}
                      />
                      <span
                        className={`absolute left-0 -bottom-0.5 h-px bg-white transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                      />
                    </Link>

                    <AnimatePresence>
                      {companyOpen && (
                        <motion.div
                          key="company-dropdown"
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
                          className="absolute left-1/2 top-full w-[455px] -translate-x-1/2 pt-4"
                        >
                          {/* connector arrow */}
                          <div className="absolute left-1/2 top-2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-white/15 bg-black" />

                          {/* solid opaque panel — no bleed-through */}
                          <div className="relative overflow-hidden rounded-[1.35rem]  bg-black shadow-[0_28px_90px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.04)]">
                            {/* subtle top hairline, monochrome */}
                            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                            {/* faint noise/gradient, no color wash */}
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(255,255,255,0.06),transparent_45%)]" />

                            <div className="relative p-5">
                              <div className="mb-4">
                                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">
                                  Our Companies
                                </p>
                                <div className="mt-2 flex items-center gap-4">
                                  <p className="text-xl font-medium leading-none text-white">
                                    Four Brands. One Vision.
                                  </p>
                                  <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                                </div>
                              </div>

                              <div className="grid gap-2.5" role="menu" aria-label="Company sections">
                                {COMPANY_LINKS.map((company) => (
                                  <Link
                                    key={company.href}
                                    to={company.href}
                                    role="menuitem"
                                    data-cursor="hover"
                                    style={{ "--company-accent": company.accent } as CSSProperties}
                                    className="group/item relative flex items-center gap-4 overflow-hidden rounded-2xl  bg-white/[0.03] p-3.5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.07]"
                                    onClick={() => setCompanyOpen(false)}
                                  >
                                    {/* thin accent bar on hover only — kept small so B&W stays dominant */}
                                    <span
                                      className="absolute inset-y-4 left-0 w-px opacity-0 transition-opacity duration-300 group-hover/item:opacity-100"
                                      style={{ backgroundColor: "var(--company-accent)" }}
                                    />
                                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl  bg-white/[0.04] p-2.5">
                                      <img
                                        src={company.logo}
                                        alt=""
                                        className="h-full w-full object-contain"
                                        loading="eager"
                                      />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                      <span className="flex items-center gap-2 text-[15px] font-medium leading-tight text-white">
                                        {company.label}
                                        <span
                                          className="h-1.5 w-1.5 rounded-full"
                                          style={{ backgroundColor: "var(--company-accent)" }}
                                        />
                                      </span>
                                      <span className="mt-1.5 block text-xs leading-relaxed text-white/60">
                                        {company.description}
                                      </span>
                                    </span>
                                    <ArrowRight
                                      className="h-4 w-4 shrink-0 text-white/40 transition-all duration-300 group-hover/item:translate-x-1 group-hover/item:text-white"
                                      aria-hidden="true"
                                    />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link
                  key={l.href}
                  to={l.href}
                  className={`group relative py-1 transition-colors hover:text-white ${isActive ? "text-white" : ""
                    }`}
                  data-cursor="hover"
                >
                  {l.label}
                  <span
                    className={`absolute left-0 -bottom-0.5 h-px bg-white transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-5 py-2.5 bg-white text-black hover:opacity-85 transition"
              data-cursor="hover"
            >
              Submit Your Ideas <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden glass w-9 h-9 rounded-full flex items-center justify-center text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#050505]/96 backdrop-blur-2xl flex flex-col items-center justify-center gap-2 px-8"
          >
            <div className="absolute inset-0 grid-bg opacity-20" />
            <div className="relative flex flex-col items-center gap-6 w-full">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <Link
                    to={l.href}
                    className={`font-display text-5xl sm:text-6xl transition-colors ${location.pathname === l.href ? "text-white" : "text-white/40 hover:text-white"
                      }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ delay: NAV_LINKS.length * 0.07, duration: 0.4 }}
                className="mt-6"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold rounded-full px-7 py-3.5 bg-white text-black hover:opacity-90 transition"
                >
                  Start a Project <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
