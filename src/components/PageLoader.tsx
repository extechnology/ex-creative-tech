import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function PageLoader({ onDone }: { onDone?: () => void }) {
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let v = 0;
    let finishTimer: number | undefined;
    let doneTimer: number | undefined;

    const id = window.setInterval(() => {
      v += Math.random() * 9 + 4;

      if (onDone && v >= 100) {
        v = 100;
        window.clearInterval(id);
        finishTimer = window.setTimeout(() => {
          setGone(true);
          doneTimer = window.setTimeout(onDone, 700);
        }, 350);
      }

      setPct(Math.floor(onDone ? Math.min(v, 100) : Math.min(v, 94)));
    }, 90);

    return () => {
      window.clearInterval(id);
      if (finishTimer) window.clearTimeout(finishTimer);
      if (doneTimer) window.clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: gone ? 0 : 1, y: gone ? "-100%" : 0 }}
      transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050505] noise"
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <motion.div
        className="font-display text-white text-6xl md:text-8xl tracking-tight"
        initial={{ letterSpacing: "0.4em", opacity: 0 }}
        animate={{ letterSpacing: "0em", opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        EX Creative Technology<span className="text-white/30">/</span>
      </motion.div>
      <div className="mt-10 h-[2px] w-56 md:w-80 bg-white/10 overflow-hidden rounded-full">
        <motion.div className="h-full bg-white rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-4 font-mono text-[11px] text-white/40 tabular-nums">
        {String(pct).padStart(3, "0")} / 100 - booting creative engine
      </div>
    </motion.div>
  );
}
