import { useMemo } from "react";
import { motion } from "framer-motion";

type Props = {
  count?: number;
  /** Accent color for half the particles; the rest are fg-3 */
  showAccent?: boolean;
};

/**
 * FloatingParticles, a drifting field of small dots behind slide
 * content. Each dot has its own independent float animation with a
 * randomized duration + phase, so the whole field is always subtly
 * moving without ever feeling choreographed.
 */
export default function FloatingParticles({
  count = 32,
  showAccent = true,
}: Props) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = i * 137.5;
        return {
          id: i,
          x: (Math.sin(seed) * 0.5 + 0.5) * 100,
          y: ((Math.cos(seed * 0.7) * 0.5 + 0.5) * 100),
          size: 1.2 + ((seed * 0.17) % 2),
          delay: (seed * 0.03) % 6,
          duration: 7 + ((seed * 0.11) % 6),
          drift: 20 + ((seed * 0.23) % 30),
          accent: showAccent && i % 3 === 0,
        };
      }),
    [count, showAccent]
  );

  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            background: d.accent
              ? "hsl(var(--accent) / 0.8)"
              : "hsl(var(--fg) / 0.22)",
            boxShadow: d.accent
              ? "0 0 6px hsl(var(--accent) / 0.45)"
              : undefined,
          }}
          animate={{
            y: [0, -d.drift, 0],
            opacity: [0.3, 0.9, 0.3],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
