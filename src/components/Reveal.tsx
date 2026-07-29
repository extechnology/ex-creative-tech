import { motion, type HTMLMotionProps } from "motion/react";
import { type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  once = true,
  ...rest
}: { children: ReactNode; delay?: number; y?: number; once?: boolean } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function SplitWords({
  text,
  className = "",
  delay = 0,
  stagger = 0.06,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.9,
              delay: delay + i * stagger,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function MagneticButton({
  children,
  onClick,
  variant = "primary",
  href,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  href?: string;
}) {
  const base =
    "relative inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors overflow-hidden group";
  const styles =
    variant === "primary"
      ? "bg-[color:var(--color-brand-a)] text-black hover:opacity-90"
      : "border border-white/15 text-white hover:bg-white/5";
  const inner = (
    <motion.span
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${styles}`}
      data-cursor="hover"
    >
      {children}
    </motion.span>
  );
  if (href)
    return (
      <a href={href} onClick={onClick}>
        {inner}
      </a>
    );
  return <button onClick={onClick}>{inner}</button>;
}
