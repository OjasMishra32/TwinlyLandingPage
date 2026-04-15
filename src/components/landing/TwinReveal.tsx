import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import TwinOrb from "./TwinOrb";

/**
 * TwinReveal — a typography-forward moment of silence between the hero
 * and the pitch. No scroll-scrubbed video, no frame preload, no decoder
 * lag. Just a massive italic wordmark that builds letter-by-letter when
 * scrolled into view, a faint twin-orb canvas breathing behind it, and
 * one line of prose underneath.
 *
 * This replaces the earlier 192-JPEG canvas scrubber. Same concept
 * (the birth of the twin), radically lighter execution.
 */

const WORD = "twinly";

export default function TwinReveal() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section
      ref={ref}
      id="reveal"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden border-t border-rule bg-bg"
    >
      {/* Breathing twin-orb canvas, low opacity, low positioned */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.42 }}
      >
        <TwinOrb />
      </div>

      {/* Radial wash that focuses attention on the wordmark */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 50%, hsl(var(--accent) / 0.08) 0%, transparent 65%), radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, hsl(var(--bg) / 0.55) 90%)",
        }}
      />

      {/* Top fade in from prior section */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[22%] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--bg)) 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[22%] pointer-events-none"
        style={{
          background:
            "linear-gradient(0deg, hsl(var(--bg)) 0%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-[2] w-full flex flex-col items-center text-center px-6">
        {/* Kicker label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-14 md:mb-20"
        >
          <span className="h-px w-10 bg-accent" />
          <span className="f-mono text-[0.58rem] font-medium tracking-[0.28em] uppercase text-fg-2">
            The moment a twin is born
          </span>
          <span className="h-px w-10 bg-accent" />
        </motion.div>

        {/* Massive italic wordmark with letter-by-letter rise */}
        <h2
          className="tw-italic"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(6rem, 20vw, 22rem)",
            lineHeight: 0.84,
            letterSpacing: "-0.035em",
            color: "hsl(var(--accent))",
            margin: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "baseline",
            filter: "drop-shadow(0 20px 60px hsl(var(--accent) / 0.18))",
          }}
          aria-label={WORD}
        >
          {Array.from(WORD).map((char, i) => (
            <motion.span
              key={i}
              aria-hidden
              initial={{
                opacity: 0,
                y: 120,
                filter: "blur(18px)",
                rotateX: reduced ? 0 : -25,
              }}
              animate={
                inView
                  ? { opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0 }
                  : {}
              }
              transition={{
                duration: 1.3,
                delay: 0.25 + i * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
              style={{ transformOrigin: "50% 80%" }}
            >
              {char}
            </motion.span>
          ))}
        </h2>

        {/* Caption underneath */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 md:mt-24 text-fg-2 font-serif italic mx-auto"
          style={{
            fontSize: "clamp(1.15rem, 2vw, 1.85rem)",
            lineHeight: 1.32,
            letterSpacing: "-0.01em",
            maxWidth: "34ch",
            fontStyle: "italic",
            fontFamily: "'Instrument Serif', serif",
          }}
        >
          One self. Split in two.
          <br />
          One of them stays here.
          <br />
          The other runs your week.
        </motion.p>
      </div>
    </section>
  );
}
