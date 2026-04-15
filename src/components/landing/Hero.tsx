import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SplineRobot from "./SplineRobot";
import FloatingOps from "./FloatingOps";
import CharGrid from "./CharGrid";
import ScrambleText from "./ScrambleText";
import { useMagnetic } from "@/hooks/useMagnetic";

const BASE = 0.1;

function CountUp({
  to,
  decimals = 0,
  duration = 1600,
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

function Line({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden" style={{ padding: "0.06em 0" }}>
      <motion.span
        initial={{ y: "108%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, delay: BASE + delay, ease: [0.22, 1, 0.36, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function Fade({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay: BASE + delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const primaryRef = useMagnetic<HTMLAnchorElement>({ radius: 150, strength: 0.32 });
  const secondaryRef = useMagnetic<HTMLAnchorElement>({ radius: 130, strength: 0.22 });
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-10%" });

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
      style={{ padding: "140px 0 80px" }}
    >
      {/* Ambient washes + kinetic dot grid */}
      <div className="absolute inset-0 hero-wash" aria-hidden />
      <CharGrid />

      {/* Spline robot — pushed further right so it doesn't compete with text */}
      <div className="absolute inset-y-0 right-[-18%] w-full md:w-[80%] z-[1]">
        <div className="relative h-full w-full">
          <SplineRobot />
        </div>
      </div>

      {/* Floating ops tiles drifting on the right side */}
      <div className="hidden xl:block absolute inset-y-0 right-0 w-[32%] z-[3] pointer-events-none">
        <FloatingOps />
      </div>

      {/* Left-edge gradient so text stays readable */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-[68%] z-[2] pointer-events-none hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--bg)) 0%, hsl(var(--bg)) 32%, hsl(var(--bg) / 0.88) 58%, hsl(var(--bg) / 0.4) 84%, transparent 100%)",
        }}
      />

      <div className="relative z-[4] w-full max-w-[1680px] mx-auto px-6 md:px-14">
        <h1
          className="tw-display text-fg mb-10"
          style={{
            fontSize: "clamp(3rem, 7.6vw, 8.6rem)",
            lineHeight: 0.96,
            letterSpacing: "-0.025em",
            maxWidth: "13ch",
            fontWeight: 400,
          }}
        >
          <Line delay={0}>
            <span>
              Stop{" "}
              <span className="tw-italic text-accent">
                <ScrambleText text="managing" delay={300} duration={900} />
              </span>
            </span>
          </Line>
          <Line delay={0.08}>your life.</Line>
          <Line delay={0.16}>
            <span>
              Meet your{" "}
              <span className="tw-italic text-accent">
                <ScrambleText text="twin" delay={600} duration={700} />
              </span>
              .
            </span>
          </Line>
        </h1>

        <Fade delay={0.5}>
          <p
            className="text-fg-2 mb-11 f-sans"
            style={{
              maxWidth: "48ch",
              fontSize: "clamp(1.05rem, 1.22vw, 1.24rem)",
              lineHeight: 1.62,
              fontWeight: 400,
            }}
          >
            A personal operator that learns how you{" "}
            <b className="text-fg font-medium">write</b>, what you{" "}
            <b className="text-fg font-medium">prefer</b>, and how you handle
            things — then drafts, schedules, negotiates, and moves life-admin
            forward while you <b className="text-fg font-medium">stay in control</b>.
          </p>
        </Fade>

        <Fade delay={0.62}>
          <div className="flex gap-3 flex-wrap mb-16">
            <a ref={primaryRef} href="#waitlist" className="btn primary will-change-transform">
              Request access
              <span className="arrow" />
            </a>
            <a ref={secondaryRef} href="#use-cases" className="btn will-change-transform">
              See a playbook
              <span className="arrow" />
            </a>
          </div>
        </Fade>

        {/* Real numbers from early beta — adds weight */}
        <Fade delay={0.78}>
          <div
            ref={statsRef}
            className="grid gap-12 pt-8 border-t border-rule max-w-[680px]"
            style={{ gridTemplateColumns: "repeat(3, auto)" }}
          >
            {[
              { k: "Tasks / day", v: 12, d: 0, em: "avg" },
              { k: "Hours saved / wk", v: 8.5, d: 1, em: "median" },
              { k: "Approved auto", v: 94, d: 0, em: "%" },
            ].map((kv) => (
              <div key={kv.k} className="flex flex-col gap-2">
                <span className="f-mono text-[0.56rem] font-medium tracking-[0.22em] uppercase text-fg-4">
                  {kv.k}
                </span>
                <span
                  className="text-fg flex items-baseline gap-1.5"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontVariationSettings: "'SOFT' 40, 'WONK' 0",
                    fontSize: "2.2rem",
                    letterSpacing: "-0.028em",
                    lineHeight: 1,
                    fontWeight: 400,
                  }}
                >
                  <CountUp to={kv.v} decimals={kv.d} start={statsInView} />
                  <em
                    className="not-italic text-accent f-mono font-normal"
                    style={{ fontSize: "0.68rem", letterSpacing: "0.08em" }}
                  >
                    {kv.em}
                  </em>
                </span>
              </div>
            ))}
          </div>
        </Fade>
      </div>

      {/* Scroll indicator — tiny, unobtrusive */}
      <Fade delay={1}>
        <div className="absolute bottom-10 left-6 md:left-14 z-[4] flex items-center gap-3">
          <div className="h-px w-8 bg-fg-4" />
          <span className="f-mono text-[0.55rem] tracking-[0.26em] uppercase text-fg-3">
            Scroll to begin
          </span>
        </div>
      </Fade>
    </section>
  );
}
