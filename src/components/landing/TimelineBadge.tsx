import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";

const STATIONS = [
  { id: "top", label: "Hero", at: 0 },
  { id: "reveal", label: "Reveal", at: 0.12 },
  { id: "problem", label: "Problem", at: 0.26 },
  { id: "use-cases", label: "Playbooks", at: 0.42 },
  { id: "edge", label: "Edge", at: 0.6 },
  { id: "trust", label: "Trust", at: 0.76 },
  { id: "waitlist", label: "Access", at: 0.9 },
];

/**
 * TimelineBadge — fixed-position vertical scroll progress rail on the
 * right edge of the viewport. A ball ticks down as you scroll, mono
 * station labels light up in sequence. Plays the anime.js "playback
 * control" visual language: you're watching a timeline, you know
 * exactly where you are.
 */
export default function TimelineBadge() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 120,
    mass: 0.5,
  });
  const ballY = useTransform(smooth, [0, 1], ["0%", "100%"]);
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(smooth, "change", (p) => {
    let next = 0;
    for (let i = 0; i < STATIONS.length; i++) {
      if (p >= STATIONS[i].at) next = i;
    }
    setActive(next);
  });

  if (!mounted) return null;

  return (
    <div
      aria-hidden
      className="hidden xl:flex fixed right-7 top-1/2 -translate-y-1/2 z-[80] flex-col items-end gap-0 pointer-events-none"
      style={{ height: "420px" }}
    >
      {/* Meta label */}
      <div className="mb-4 f-mono text-[0.5rem] font-medium tracking-[0.26em] uppercase text-fg-4">
        Scroll · 00:00
      </div>

      {/* Rail */}
      <div className="relative flex items-start gap-4">
        {/* Stations on the left */}
        <div className="flex flex-col justify-between h-[360px] items-end text-right">
          {STATIONS.map((s, i) => (
            <motion.span
              key={s.id}
              animate={{
                color:
                  i === active
                    ? "hsl(var(--accent))"
                    : i < active
                    ? "hsl(var(--fg-3))"
                    : "hsl(var(--fg-4))",
              }}
              transition={{ duration: 0.4 }}
              className="f-mono text-[0.52rem] font-medium tracking-[0.2em] uppercase leading-none"
            >
              {s.label}
            </motion.span>
          ))}
        </div>

        {/* Vertical rail line + moving ball */}
        <div className="relative w-[2px] h-[360px] bg-rule">
          <motion.div
            className="absolute left-0 right-0 top-0 origin-top bg-accent"
            style={{ height: "100%", scaleY: smooth }}
          />
          <motion.span
            className="absolute left-1/2 -translate-x-1/2 w-[9px] h-[9px] rounded-full"
            style={{
              top: ballY,
              translateY: "-50%",
              background: "hsl(var(--accent))",
              boxShadow: "0 0 14px hsl(var(--accent) / 0.8)",
            }}
          />
          {/* Station dots */}
          {STATIONS.map((s) => (
            <span
              key={s.id}
              className="absolute left-1/2 -translate-x-1/2 w-[4px] h-[4px] rounded-full"
              style={{
                top: `${s.at * 100}%`,
                background: "hsl(var(--fg-4))",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
