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

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
      style={{ padding: "140px 0 80px" }}
    >
      {/* Ambient washes */}
      <div className="absolute inset-0 hero-wash" aria-hidden />
      <div className="absolute inset-0 grid-overlay opacity-70" aria-hidden />

      {/* Spline robot — pushed further right so it doesn't compete with text */}
      <div className="absolute inset-y-0 right-[-18%] w-full md:w-[80%] z-[1]">
        <div className="relative h-full w-full">
          <SplineRobot />
        </div>
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
          <div className="flex gap-3 flex-wrap">
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
