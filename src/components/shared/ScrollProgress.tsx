import { useSpring, useScroll, motion } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "0% 50%",
        background: "var(--scroll-progress, var(--color-brand-a))",
      }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[80]"
    />
  );
}
