import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SplineRobot from "./SplineRobot";
import { useMagnetic } from "@/hooks/useMagnetic";

const BASE = 0.1;

function Line({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden" style={{ padding: "0.08em 0" }}>
      <motion.span
        initial={{ y: "108%" }}
        animate={{ y: "0%" }}
        transition={{
          duration: 1.15,
          delay: BASE + delay,
          ease: [0.22, 1, 0.36, 1],
        }}
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        delay: BASE + delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

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

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-10%" });
  const primaryRef = useMagnetic<HTMLAnchorElement>({
    radius: 150,
    strength: 0.32,
  });
  const secondaryRef = useMagnetic<HTMLAnchorElement>({
    radius: 130,
    strength: 0.22,
  });

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: "140px", paddingBottom: "80px" }}
    >
      {/* Warm ambient wash */}
      <div className="absolute inset-0 hero-wash pointer-events-none" aria-hidden />

      {/* Spline robot — the hero visual, right half on desktop, dimmed bg on mobile */}
      <div
        className="absolute inset-y-0 right-0
                   w-full md:w-[72%] md:right-[-12%] z-[1]
                   opacity-50 md:opacity-100"
      >
        <div className="relative h-full w-full">
          <SplineRobot />
        </div>
      </div>

      {/* Legibility wash. Mobile: full radial dimming over the orb. Desktop: left-to-right gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-[2] md:hidden"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 50%, hsl(var(--bg) / 0.82) 0%, hsl(var(--bg) / 0.55) 55%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-[68%] z-[2] pointer-events-none hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--bg)) 0%, hsl(var(--bg)) 32%, hsl(var(--bg) / 0.88) 58%, hsl(var(--bg) / 0.4) 84%, transparent 100%)",
        }}
      />

      <div className="relative z-[4] w-full max-w-[1680px] mx-auto px-5 sm:px-8 md:px-14">
        {/* Eyebrow: training tagline */}
        <Fade delay={0}>
          <div className="inline-flex items-center gap-3 mb-8 md:mb-10 f-mono text-[0.54rem] sm:text-[0.58rem] font-medium tracking-[0.26em] uppercase text-fg-3">
            <span className="h-px w-8 md:w-10 bg-accent" />
            Trained on your writing · speaks in your voice
          </div>
        </Fade>

        {/* Headline */}
        <h1
          className="text-fg mb-8 md:mb-10"
          style={{
            fontFamily: "'Fraunces', serif",
            fontOpticalSizing: "auto",
            fontVariationSettings: "'SOFT' 40, 'WONK' 0",
            fontSize: "clamp(2.6rem, 8.4vw, 9.6rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.03em",
            fontWeight: 400,
            maxWidth: "13ch",
          }}
        >
          <Line delay={0}>
            <span>
              Stop <span className="tw-italic text-accent">managing</span>
            </span>
          </Line>
          <Line delay={0.08}>your life.</Line>
          <Line delay={0.16}>
            <span>
              Meet your <span className="tw-italic text-accent">twin</span>.
            </span>
          </Line>
        </h1>

        {/* Promise line */}
        <Fade delay={0.42}>
          <p
            className="text-fg-2 mb-6 md:mb-8"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontSize: "clamp(1.5rem, 2.4vw, 2.2rem)",
              lineHeight: 1.18,
              letterSpacing: "-0.015em",
              maxWidth: "22ch",
              color: "hsl(var(--fg))",
            }}
          >
            Anything you can do,{" "}
            <span className="text-accent">twinly can.</span>
          </p>
        </Fade>

        {/* Body */}
        <Fade delay={0.54}>
          <p
            className="text-fg-2 mb-10 md:mb-12"
            style={{
              maxWidth: "52ch",
              fontSize: "clamp(1.02rem, 1.25vw, 1.25rem)",
              lineHeight: 1.58,
              fontWeight: 400,
            }}
          >
            Twinly studies every word you've already written. Then it handles
            your <b className="text-fg font-medium">inbox</b>, ships your{" "}
            <b className="text-fg font-medium">code</b>, files your{" "}
            <b className="text-fg font-medium">taxes</b>, and does your{" "}
            <b className="text-fg font-medium">homework</b>, in a voice
            indistinguishable from yours.
          </p>
        </Fade>

        {/* CTAs */}
        <Fade delay={0.62}>
          <div className="flex gap-3 flex-wrap mb-12 md:mb-16">
            <a
              ref={primaryRef}
              href="#waitlist"
              className="btn primary will-change-transform"
            >
              Request access
              <span className="arrow" />
            </a>
            <a
              ref={secondaryRef}
              href="#voice"
              className="btn will-change-transform"
            >
              See the keynote
              <span className="arrow" />
            </a>
          </div>
        </Fade>

        {/* Stats */}
        <Fade delay={0.78}>
          <div
            ref={statsRef}
            className="grid grid-cols-3 gap-5 sm:gap-8 md:gap-12 pt-7 md:pt-8 border-t border-rule max-w-[680px]"
          >
            {[
              { k: "Tasks / day", v: 12, d: 0, em: "avg" },
              { k: "Hours saved / wk", v: 8.5, d: 1, em: "median" },
              { k: "Approved auto", v: 94, d: 0, em: "%" },
            ].map((kv) => (
              <div key={kv.k} className="flex flex-col gap-1.5 md:gap-2">
                <span className="f-mono text-[0.48rem] sm:text-[0.54rem] font-medium tracking-[0.2em] uppercase text-fg-4">
                  {kv.k}
                </span>
                <span
                  className="text-fg flex items-baseline gap-1"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontVariationSettings: "'SOFT' 40, 'WONK' 0",
                    fontSize: "clamp(1.5rem, 2.4vw, 2.3rem)",
                    letterSpacing: "-0.028em",
                    lineHeight: 1,
                    fontWeight: 400,
                  }}
                >
                  <CountUp to={kv.v} decimals={kv.d} start={statsInView} />
                  <em
                    className="not-italic text-accent f-mono font-normal"
                    style={{
                      fontSize: "0.5em",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {kv.em}
                  </em>
                </span>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}
