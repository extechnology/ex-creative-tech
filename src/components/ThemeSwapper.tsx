import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export type Palette = {
  a: string;
  b: string;
  c: string;
  bg?: string;
  progress?: string;
};

/**
 * ThemeSwapper
 * ──────────────────────────────────────────────────────────────────
 * Watches every [data-palette] section on the page with an
 * IntersectionObserver and morphs the root CSS brand tokens as
 * sections scroll into/out-of view. The section with the highest
 * current intersection ratio always wins.
 *
 * Tokens updated:
 *   --brand-a         primary colour
 *   --brand-b         secondary colour
 *   --brand-c         tertiary colour
 *   --background      page background
 *   --scroll-progress scroll progress bar colour / gradient
 */
export function ThemeSwapper() {
  const location = useLocation();
  const ioRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    /** Apply a palette section's data-* tokens to the document root. */
    const apply = (el: HTMLElement) => {
      const a        = el.dataset.paletteA        ?? "#ffffff";
      const b        = el.dataset.paletteB        ?? "#b8b8b8";
      const c        = el.dataset.paletteC        ?? "#666666";
      const bg       = el.dataset.paletteBg       ?? "#050505";
      const progress = el.dataset.paletteProgress ?? a;

      const root = document.documentElement;
      root.style.setProperty("--brand-a",         a);
      root.style.setProperty("--brand-b",         b);
      root.style.setProperty("--brand-c",         c);
      root.style.setProperty("--background",      bg);
      root.style.setProperty("--scroll-progress", progress);
    };

    /**
     * Map from HTMLElement → current intersection ratio.
     * We keep the entire visible set and always pick the winner.
     */
    const ratioMap = new Map<HTMLElement, number>();

    /** Re-evaluate and apply the most-visible section. */
    const applyBest = () => {
      if (ratioMap.size === 0) return;
      let best: HTMLElement | null = null;
      let bestRatio = -1;
      ratioMap.forEach((ratio, el) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = el;
        }
      });
      if (best) apply(best);
    };

    // Disconnect any previous observer from a prior route.
    if (ioRef.current) {
      ioRef.current.disconnect();
      ioRef.current = null;
    }

    // Delay slightly so the DOM (and any lazy-rendered sections) settle.
    const timer = setTimeout(() => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-palette]"),
      );
      if (!sections.length) return;

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const el = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              ratioMap.set(el, entry.intersectionRatio);
            } else {
              ratioMap.delete(el);
            }
          });
          applyBest();
        },
        // Dense thresholds (0 → 1 in steps of 0.05) give smooth
        // colour hand-offs as sections scroll into / out of view.
        { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
      );

      ioRef.current = io;
      sections.forEach((s) => io.observe(s));
    }, 120);

    return () => {
      clearTimeout(timer);
      if (ioRef.current) {
        ioRef.current.disconnect();
        ioRef.current = null;
      }
    };
  }, [location.pathname]);

  return null;
}
