import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import KeynoteSlide from "./KeynoteSlide";

function CountUp({
  to,
  decimals = 0,
  duration = 1800,
  start,
}: {
  to: number;
  decimals?: number;
  duration?: number;
  start: boolean;
}) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const from = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - from) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(eased * to);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to, duration]);
  return <>{v.toFixed(decimals)}</>;
}

const stats = [
  { k: "Tasks / day", v: 12, d: 0, em: "avg" },
  { k: "Hours saved / week", v: 8.5, d: 1, em: "median" },
  { k: "Approved automatically", v: 94, d: 0, em: "%" },
  { k: "Apps it touches", v: 47, d: 0, em: "live" },
];

export default function SlideNumbers() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <KeynoteSlide
      id="numbers"
      eyebrow="Early signal · Beta cohort"
      headline={
        <>
          The <span className="tw-italic text-accent">numbers</span> from the
          first 200 operators.
        </>
      }
      align="center"
      visual={
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-14 max-w-[1120px] mx-auto text-left"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.1 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col gap-3"
            >
              <div className="f-mono text-[0.52rem] font-medium tracking-[0.22em] uppercase text-fg-4">
                {s.k}
              </div>
              <div
                className="text-fg flex items-baseline gap-2"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontVariationSettings: "'SOFT' 30, 'WONK' 0",
                  fontSize: "clamp(3.4rem, 6.5vw, 7rem)",
                  letterSpacing: "-0.035em",
                  lineHeight: 0.92,
                  fontWeight: 400,
                }}
              >
                <CountUp
                  to={s.v}
                  decimals={s.d}
                  start={inView}
                />
                <em
                  className="not-italic text-accent f-mono"
                  style={{
                    fontSize: "0.22em",
                    letterSpacing: "0.06em",
                  }}
                >
                  {s.em}
                </em>
              </div>
            </motion.div>
          ))}
        </div>
      }
    />
  );
}
