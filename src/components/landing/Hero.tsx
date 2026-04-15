import { ReactNode } from "react";
import { motion } from "framer-motion";
import SplineRobot from "./SplineRobot";
import { useMagnetic } from "@/hooks/useMagnetic";

const BASE = 0.1;

function Line({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden" style={{ padding: "0.06em 0" }}>
      <motion.span
        initial={{ y: "108%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, delay: BASE + delay, ease: [0.22, 1, 0.36, 1] }}
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
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.95, delay: BASE + delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const primaryRef = useMagnetic<HTMLAnchorElement>({ radius: 150, strength: 0.32 });
  const secondaryRef = useMagnetic<HTMLAnchorElement>({ radius: 130, strength: 0.22 });

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
      style={{ padding: "140px 0 80px" }}
    >
      {/* Ambient wash */}
      <div className="absolute inset-0 hero-wash" aria-hidden />

      {/* Spline robot, the hero visual */}
      <div className="absolute inset-y-0 right-[-16%] w-full md:w-[78%] z-[1]">
        <div className="relative h-full w-full">
          <SplineRobot />
        </div>
      </div>

      {/* Left wash so the display type stays legible */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-[72%] z-[2] pointer-events-none hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--bg)) 0%, hsl(var(--bg)) 34%, hsl(var(--bg) / 0.88) 58%, hsl(var(--bg) / 0.4) 84%, transparent 100%)",
        }}
      />

      <div className="relative z-[4] w-full max-w-[1680px] mx-auto px-6 md:px-14">
        <Fade delay={0}>
          <div className="inline-flex items-center gap-3 mb-10 f-mono text-[0.56rem] font-medium tracking-[0.28em] uppercase text-fg-3">
            <span className="h-px w-10 bg-accent" />
            A personal operator · private beta
          </div>
        </Fade>

        <h1
          className="text-fg mb-10"
          style={{
            fontFamily: "'Fraunces', serif",
            fontOpticalSizing: "auto",
            fontVariationSettings: "'SOFT' 40, 'WONK' 0",
            fontSize: "clamp(3.4rem, 8.6vw, 10rem)",
            lineHeight: 0.94,
            letterSpacing: "-0.035em",
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

        <Fade delay={0.5}>
          <p
            className="text-fg-2 mb-12"
            style={{
              maxWidth: "50ch",
              fontSize: "clamp(1.1rem, 1.35vw, 1.35rem)",
              lineHeight: 1.56,
              fontWeight: 400,
            }}
          >
            A personal operator that learns how you{" "}
            <b className="text-fg font-medium">write</b>, what you{" "}
            <b className="text-fg font-medium">prefer</b>, and how you handle
            things, then drafts, schedules, negotiates, and moves life-admin
            forward while you{" "}
            <b className="text-fg font-medium">stay in control</b>.
          </p>
        </Fade>

        <Fade delay={0.62}>
          <div className="flex gap-3 flex-wrap">
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
      </div>
    </section>
  );
}
