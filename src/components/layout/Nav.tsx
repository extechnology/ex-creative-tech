import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className={`fixed z-50 w-[min(1300px,94vw)] left-1/2 -translate-x-1/2 transition-all duration-500 ${
          scrolled ? "top-2" : "top-4"
        }`}
      >
        <div className={`glass shadow-2xl   rounded-full flex items-center justify-between px-5 py-4 transition-all duration-500 ${
          scrolled ? "shadow-[0_8px_32px_rgba(0,0,0,0.6)]" : ""
        }`}>
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 font-display text-white text-lg group"
            data-cursor="hover"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--color-brand-a)] opacity-60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[color:var(--color-brand-a)]" />
            </span>
            EX<span className="text-white/30">·</span>Creative
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7 text-sm text-white/60">
            {NAV_LINKS.map((l) => {
              const isActive = l.href === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  to={l.href}
                  className={`relative py-1 transition-colors hover:text-white ${
                    isActive ? "text-white" : ""
                  }`}
                  data-cursor="hover"
                >
                  {l.label}
                  <span
                    className={`absolute left-0 -bottom-0.5 h-px bg-[color:var(--color-brand-a)] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
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
              Start a Project <ArrowUpRight className="w-3.5 h-3.5" />
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
                    className={`font-display text-5xl sm:text-6xl transition-colors ${
                      location.pathname === l.href ? "text-white" : "text-white/40 hover:text-white"
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
