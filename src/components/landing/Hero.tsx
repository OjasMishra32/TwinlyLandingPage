import { ReactNode } from "react";
import { motion } from "framer-motion";
import TwinOrb from "./TwinOrb";

const BASE = 0.12;

function Line({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden" style={{ padding: "0.05em 0" }}>
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
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
      style={{ padding: "130px 0 64px" }}
    >
      {/* Ambient washes */}
      <div className="absolute inset-0 hero-wash" aria-hidden />
      <div className="absolute inset-0 grid-overlay opacity-80" aria-hidden />

      {/* Orb — positioned right on desktop, centred behind on mobile */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[62%] z-[1] pointer-events-none">
        <div className="relative h-full w-full">
          <TwinOrb />
        </div>
      </div>

      {/* Left-edge gradient so text stays crisp over orb */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-[70%] z-[2] pointer-events-none hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--bg)) 0%, hsl(var(--bg)) 30%, hsl(var(--bg) / 0.85) 55%, hsl(var(--bg) / 0.4) 80%, transparent 100%)",
        }}
      />

      <div className="relative z-[4] w-full max-w-[1680px] mx-auto px-6 md:px-14">
        <Fade delay={0}>
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="live-dot" />
            <span className="f-mono text-[0.66rem] font-medium tracking-[0.22em] text-fg-2 uppercase">
              In private beta
            </span>
            <span className="text-fg-4 f-mono text-[0.66rem]">·</span>
            <span className="f-mono text-[0.66rem] font-medium tracking-[0.22em] text-fg-3 uppercase">
              Invite only
            </span>
          </div>
        </Fade>

        <h1
          className="tw-display text-fg mb-8"
          style={{
            fontSize: "clamp(2.8rem, 7.6vw, 8.4rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.045em",
            maxWidth: "14ch",
          }}
        >
          <Line delay={0}>
            <span>
              Stop <span className="tw-italic text-accent">managing</span>
            </span>
          </Line>
          <Line delay={0.08}>
            your life.
          </Line>
          <Line delay={0.16}>
            <span>
              Meet your <span className="tw-italic text-accent">twin</span>.
            </span>
          </Line>
        </h1>

        <Fade delay={0.5}>
          <p
            className="text-fg-2 mb-9"
            style={{
              maxWidth: "46ch",
              fontSize: "clamp(1.02rem, 1.2vw, 1.22rem)",
              lineHeight: 1.5,
              fontWeight: 400,
            }}
          >
            Twinly learns how you <b className="text-fg font-semibold">write</b>, what you
            <b className="text-fg font-semibold"> prefer</b>, and how you handle things —
            then it drafts, schedules, follows up, and moves life-admin forward while you
            <b className="text-fg font-semibold"> stay in control</b>.
          </p>
        </Fade>

        <Fade delay={0.62}>
          <div className="flex gap-3 flex-wrap mb-14">
            <a href="#waitlist" className="btn primary">
              Request access
              <span className="arrow" />
            </a>
            <a href="#demo" className="btn">
              Watch it work
              <span className="arrow" />
            </a>
          </div>
        </Fade>

        <Fade delay={0.78}>
          <div
            className="grid gap-10 pt-6 border-t border-rule max-w-[640px]"
            style={{ gridTemplateColumns: "repeat(3, auto)" }}
          >
            {[
              { k: "Tasks / day", v: "12", em: "avg" },
              { k: "Hours saved / wk", v: "8.5", em: "median" },
              { k: "Approved auto", v: "94", em: "%" },
            ].map((kv) => (
              <div key={kv.k} className="flex flex-col gap-1.5">
                <span className="f-mono text-[0.6rem] font-medium tracking-[0.18em] uppercase text-fg-3">
                  {kv.k}
                </span>
                <span
                  className="font-semibold text-fg flex items-baseline gap-1"
                  style={{ fontSize: "1.75rem", letterSpacing: "-0.025em" }}
                >
                  {kv.v}
                  <em className="not-italic text-accent f-mono text-[0.72rem] font-normal">
                    {kv.em}
                  </em>
                </span>
              </div>
            ))}
          </div>
        </Fade>
      </div>

      {/* Scroll indicator */}
      <Fade delay={1}>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-2">
          <span className="f-mono text-[0.58rem] tracking-[0.22em] uppercase text-fg-3">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-fg-3 to-transparent" />
        </div>
      </Fade>
    </section>
  );
}
