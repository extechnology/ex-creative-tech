import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

export function SmoothScroll() {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Reset scroll and re-measure on route change
  useEffect(() => {
    if (!location.hash && lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      lenisRef.current.resize();

      const timer = window.setTimeout(() => {
        lenisRef.current?.resize();
        window.dispatchEvent(new Event("scroll"));
        window.dispatchEvent(new Event("resize"));
      }, 100);

      return () => window.clearTimeout(timer);
    }
  }, [location.pathname, location.hash]);

  return null;
}
