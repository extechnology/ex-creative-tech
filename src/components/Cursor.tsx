import { useEffect, useRef } from "react";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const hover = t?.closest("a, button, [data-cursor='hover']");
      if (ring.current) {
        ring.current.style.width = hover ? "72px" : "38px";
        ring.current.style.height = hover ? "72px" : "38px";
      }
    };

    let raf = 0;
    const loop = () => {
      rx += (x - rx) * 0.15;
      ry += (y - ry) * 0.15;
      if (ring.current)
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" />
      <div ref={dot} className="cursor-dot" />
    </>
  );
}
