import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Props = {
  label?: string;
  index?: string;
};

/**
 * SectionRule, animated divider between sections. An SVG hairline
 * draws in left-to-right, then a small ball marker travels along it
 * while a mono meta label fades in underneath. Pure anime.js-style
 * kinetic decoration.
 */
export default function SectionRule({ label, index }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative w-full max-w-[1680px] mx-auto px-6 md:px-14"
    >
      <div className="relative h-8 flex items-center">
        {/* The rule line */}
        <svg
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] w-full overflow-visible"
          preserveAspectRatio="none"
          viewBox="0 0 1000 2"
        >
          <motion.line
            x1="0"
            y1="1"
            x2="1000"
            y2="1"
            stroke="hsl(var(--rule-hi))"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>

        {/* Traveling ball */}
        <motion.span
          initial={{ left: "0%", opacity: 0 }}
          animate={inView ? { left: "100%", opacity: [0, 1, 1, 0] } : {}}
          transition={{
            left: { duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
            opacity: { duration: 1.6, times: [0, 0.1, 0.9, 1], delay: 0.1 },
          }}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
          style={{
            background: "hsl(var(--accent))",
            boxShadow: "0 0 12px hsl(var(--accent) / 0.55)",
          }}
        />

        {/* Center label covering the rule */}
        {(label || index) && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="relative mx-auto px-4 bg-bg f-mono text-[0.56rem] font-medium tracking-[0.24em] uppercase text-fg-3"
          >
            {index && (
              <span className="text-accent mr-2">{index}</span>
            )}
            {label}
          </motion.span>
        )}
      </div>
    </div>
  );
}
