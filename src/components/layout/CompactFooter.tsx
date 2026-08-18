import { motion } from "motion/react";

export default function CompactFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-white/40 border-none select-none z-20 mt-auto">
      <div className="mx-auto w-full max-w-[min(1400px,92vw)] px-4 sm:px-6 lg:px-8 py-2 sm:py-4 flex items-center justify-center sm:justify-end pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <motion.p
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="whitespace-nowrap text-[11px] sm:text-xs text-white/35 hover:text-white/70 transition-colors tracking-wide leading-none"
        >
          &copy; {year} EX CREATIVE &amp; TECHNOLOGY
        </motion.p>
      </div>
    </footer>
  );
}
