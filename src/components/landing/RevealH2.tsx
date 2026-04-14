import { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Dramatic section heading reveal. The heading enters with a Y translate,
 * 3D X-axis flip, blur clear and opacity ramp. Works with nested children
 * (including italic-accent spans) because it animates the whole element
 * rather than splitting text.
 */
export default function RevealH2({
  children,
  className = "sec-h2",
  delay = 0,
}: Props) {
  return (
    <motion.h2
      className={className}
      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 28, filter: "blur(4px)" }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.h2>
  );
}
