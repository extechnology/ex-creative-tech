import { motion, type HTMLMotionProps } from "motion/react";
import { Link } from "react-router-dom";
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
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.22em]">
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

/**
 * MagneticButton supports:
 *  - href="/..." → React Router <Link> (internal navigation)
 *  - href="http..." / "mailto:..." → plain <a> (external)
 *  - no href → <button>
 */
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
    "relative inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 overflow-hidden group";
  const styles =
    variant === "primary"
      ? "bg-white text-black hover:opacity-85"
      : "border border-white/15 text-white hover:bg-white/[0.06]";

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

  if (!href) return <button onClick={onClick}>{inner}</button>;

  const isExternal = href.startsWith("http") || href.startsWith("mailto") || href.startsWith("#");
  if (isExternal) return <a href={href} onClick={onClick}>{inner}</a>;
  return <Link to={href} onClick={onClick}>{inner}</Link>;
}
