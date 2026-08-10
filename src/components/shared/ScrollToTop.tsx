import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp } from "lucide-react";

const SCROLL_BUTTON_THRESHOLD = 520;
const HASH_RETRY_COUNT = 8;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function ScrollToTop() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_BUTTON_THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ left: 0, top: 0, behavior: "auto" });
      return;
    }

    const targetId = decodeURIComponent(location.hash.slice(1));
    const timers: number[] = [];
    let cancelled = false;

    const scrollToHash = (attempt = 0) => {
      if (cancelled) return;

      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "start",
        });
        return;
      }

      if (attempt < HASH_RETRY_COUNT) {
        timers.push(window.setTimeout(() => scrollToHash(attempt + 1), 80));
      }
    };

    timers.push(window.setTimeout(() => scrollToHash(), 80));

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [location.pathname, location.hash]);

  const handleClick = () => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Scroll to top"
          onClick={handleClick}
          initial={{ opacity: 0, y: 18, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.92 }}
          transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
          data-cursor="hover"
          className="fixed bottom-5 right-5 z-[70] flex h-12 w-12 touch-manipulation items-center justify-center rounded-full  bg-[color:var(--color-brand-a)] text-black shadow-[0_18px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_70px_rgba(255,255,255,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-brand-a)] focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:bottom-7 sm:right-7 sm:h-14 sm:w-14"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
