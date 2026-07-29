import { useEffect } from "react";

export type Palette = {
  a: string;
  b: string;
  c: string;
  bg?: string;
};

// Watches [data-palette] sections and morphs the root brand tokens
// as they scroll into view. Cinematic per-brand color transitions.
export function ThemeSwapper() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-palette]"),
    );
    if (!sections.length) return;

    const apply = (el: HTMLElement) => {
      const a = el.dataset.paletteA ?? "#ffffff";
      const b = el.dataset.paletteB ?? "#b8b8b8";
      const c = el.dataset.paletteC ?? "#666666";
      const bg = el.dataset.paletteBg;
      const root = document.documentElement;
      root.style.setProperty("--brand-a", a);
      root.style.setProperty("--brand-b", b);
      root.style.setProperty("--brand-c", c);
      if (bg) root.style.setProperty("--background", bg);
    };

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the most-visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((x, y) => y.intersectionRatio - x.intersectionRatio)[0];
        if (visible) apply(visible.target as HTMLElement);
      },
      { threshold: [0.25, 0.5, 0.75] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return null;
}
