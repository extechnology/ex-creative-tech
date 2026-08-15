import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import Nav from "@/components/layout/Nav";
import Footer, { FOOTER_HEIGHT } from "@/components/layout/Footer";
import { Cursor } from "@/components/Cursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ThemeSwapper } from "@/components/ThemeSwapper";
import ScrollProgress from "@/components/layout/ScrollProgress";

export default function RootLayout() {
  const location = useLocation();

  return (
    <div className="relative bg-[color:var(--color-background)] text-white overflow-x-hidden transition-colors duration-700">
      {/* Global utilities */}
      <SmoothScroll />
      <Cursor />
      <ThemeSwapper />
      <ScrollProgress />
      <Nav />

      <main
        className="relative z-10 bg-[color:var(--color-background)] min-h-screen transition-colors duration-700"
        style={{ marginBottom: FOOTER_HEIGHT }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Fixed footer — rendered below main, appears as parallax reveal */}
      <Footer />
    </div>
  );
}
