import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * SlideTransition: the empty breath between keynote slides. A short
 * 40vh section with nothing but a single lime orb that grows from a
 * point as you enter, peaks in the middle, and shrinks back to a
 * point as you exit. Gives the page the Apple "one thing at a time"
 * rhythm, nothing else visible during the transition.
 */
export default function SlideTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Orb scale: small → full → small as you scroll through
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.2, 1, 0.2]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0, 0.6, 1, 0.6, 0]
  );
  // A hairline on either side of the orb that draws out as it peaks
  const lineScale = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative w-full flex items-center justify-center bg-bg"
      style={{ height: "42vh" }}
    >
      <div className="relative flex items-center w-full max-w-[900px] px-6 md:px-14 justify-center gap-6">
        <motion.div
          style={{ scaleX: lineScale, transformOrigin: "right" }}
          className="h-px flex-1 bg-accent/60 max-w-[220px]"
        />
        <motion.div
          style={{ scale, opacity }}
          className="relative"
        >
          <div
            className="w-[14px] h-[14px] rounded-full"
            style={{
              background: "hsl(var(--accent))",
              boxShadow: "0 0 28px hsl(var(--accent) / 0.7), 0 0 64px hsl(var(--accent) / 0.3)",
            }}
          />
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              border: "1px solid hsl(var(--accent) / 0.4)",
            }}
            animate={{ scale: [1, 2.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
          />
        </motion.div>
        <motion.div
          style={{ scaleX: lineScale, transformOrigin: "left" }}
          className="h-px flex-1 bg-accent/60 max-w-[220px]"
        />
      </div>
    </div>
  );
}
