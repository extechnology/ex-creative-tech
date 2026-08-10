import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export type Palette = {
  a: string;
  b: string;
  c: string;
  bg?: string;
  progress?: string;
};

/**
 * ThemeSwapper — Watches [data-palette] sections and morphs the root brand CSS tokens
 * (--brand-a, --brand-b, --brand-c, --background) as they scroll into view.
 */
export function ThemeSwapper() {
  const location = useLocation();

  useEffect(() => {
    // Re-query after DOM updates
    const timer = setTimeout(() => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-palette]"),
      );
      if (!sections.length) return;

      const apply = (el: HTMLElement) => {
        const a = el.dataset.paletteA ?? "#ffffff";
        const b = el.dataset.paletteB ?? "#b8b8b8";
        const c = el.dataset.paletteC ?? "#666666";
        const bg = el.dataset.paletteBg ?? "#050505";
        const progress = el.dataset.paletteProgress ?? a;
        const root = document.documentElement;
        root.style.setProperty("--brand-a", a);
        root.style.setProperty("--brand-b", b);
        root.style.setProperty("--brand-c", c);
        root.style.setProperty("--background", bg);
        root.style.setProperty("--scroll-progress", progress);
      };

      const io = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((x, y) => y.intersectionRatio - x.intersectionRatio)[0];
          if (visible) apply(visible.target as HTMLElement);
        },
        { threshold: [0.15, 0.4, 0.7] },
      );
      sections.forEach((s) => io.observe(s));
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
}
