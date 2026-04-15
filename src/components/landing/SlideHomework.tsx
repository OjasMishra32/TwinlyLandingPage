import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import KeynoteSlide from "./KeynoteSlide";
import { Check } from "./icons";

/**
 * SlideHomework — "Do my homework." Cinematic 5-phase cycle that runs
 * top to bottom on the same stage. A state machine advances once the
 * slide enters view:
 *   01 READ    → 4 source cards sweep in, a scan line absorbs each one
 *   02 OUTLINE → a tree builds itself node by node, branches draw
 *   03 DRAFT   → title + 3 paragraphs type themselves on a white page
 *   04 REVIEW  → AI-detector gauge ticks from 99% → 0.2% in your voice
 *   05 SUBMIT  → Canvas submit button, cursor taps, grade returned "A"
 *
 * Each phase swaps in via AnimatePresence so you see one event at a
 * time — the user asked to feel the steps happen in sequence, not
 * find them scattered across three static columns.
 */

const phases = [
  { num: "01", label: "Read", detail: "4 sources", duration: 3800 },
  { num: "02", label: "Outline", detail: "12 nodes", duration: 3600 },
  { num: "03", label: "Draft", detail: "2,847 words", duration: 4600 },
  { num: "04", label: "Review", detail: "0.2% AI", duration: 3400 },
  { num: "05", label: "Submit", detail: "Canvas · A", duration: 4400 },
];

const phaseDurations = phases.map((p) => p.duration);

const sources = [
  { tag: "01", title: "Chap 4 · Supply curves", kind: "PDF · 22p", dur: 1.0 },
  { tag: "02", title: "Lecture · Elasticity", kind: "SLIDES · 48", dur: 1.2 },
  { tag: "03", title: "Case · Apple Q3 pricing", kind: "PDF · 14p", dur: 0.9 },
  { tag: "04", title: "Prof. Kim · office hours", kind: "NOTES · 6p", dur: 1.1 },
];

const outlineNodes = [
  { id: "hook", label: "Hook", detail: "The 20% Services hike nobody cancelled" },
  { id: "thesis", label: "Thesis", detail: "Elasticity is masked by switching costs" },
  { id: "evidence", label: "Evidence", detail: "Apple's e-coefficient sits near -0.4" },
  { id: "counter", label: "Counter", detail: "Spotify's same-year 15% moved 4% of users" },
  { id: "close", label: "Close", detail: "Ecosystem lock is the real moat, not price" },
];

const paragraphs = [
  "Price elasticity of demand is almost never the headline number. It's the ratio that hides underneath every pricing decision Apple has made since the App Store opened.",
  "Consider the 2023 Services hike. A 20% bump on Apple Music, Arcade, and News+ looks aggressive on paper, but Apple's historical elasticity coefficient sits near -0.4, meaning quantity demanded barely moved when prices rose.",
  "The reason has nothing to do with the product. It has to do with switching costs, ecosystem lock-in, and the fact that once you have four apps, a rating history, and three family-plan slots, you don't leave over $3.",
];

/**
 * Advances through a sequence of phases, one at a time, once `start`
 * flips true. Returns the current phase index (-1 before kickoff, then
 * 0..n-1, and sticks on the last index so the final phase stays on
 * screen). Cleans up the pending timer on re-runs.
 */
function useSequentialPhase(start: boolean, durations: number[]) {
  const [phase, setPhase] = useState(-1);
  useEffect(() => {
    if (!start) return;
    if (phase === -1) {
      const t = window.setTimeout(() => setPhase(0), 450);
      return () => window.clearTimeout(t);
    }
    if (phase >= durations.length - 1) return;
    const t = window.setTimeout(
      () => setPhase((p) => p + 1),
      durations[phase],
    );
    return () => window.clearTimeout(t);
  }, [start, phase, durations]);
  return phase;
}

/** Ambient scan line that sweeps vertically across a phase panel. */
function ScanSweep({ color = "var(--accent)" }: { color?: string }) {
  return (
    <motion.div
      aria-hidden
      className="absolute inset-x-0 h-[2px] pointer-events-none"
      style={{
        background: `linear-gradient(90deg, transparent, hsl(${color}) 50%, transparent)`,
        boxShadow: `0 0 14px hsl(${color} / 0.6)`,
      }}
      initial={{ top: "0%" }}
      animate={{ top: ["0%", "100%", "0%"] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function PhaseRead() {
  return (
    <div className="relative h-full p-6 md:p-9">
      <ScanSweep />
      <div className="relative mb-5 flex items-center justify-between">
        <div className="f-mono text-[0.5rem] tracking-[0.24em] uppercase text-accent">
          Absorbing 4 sources
        </div>
        <div className="f-mono text-[0.44rem] tracking-[0.14em] uppercase text-fg-4">
          Apple · elasticity · switching costs
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
        {sources.map((s, i) => (
          <motion.div
            key={s.tag}
            initial={{ opacity: 0, x: -30, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.55,
              delay: i * 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative border border-rule bg-bg-2/60 px-3.5 py-3 text-left overflow-hidden"
          >
            <motion.div
              aria-hidden
              className="absolute inset-y-0 w-[40%] pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(var(--accent) / 0.22), transparent)",
              }}
              initial={{ left: "-40%" }}
              animate={{ left: "110%" }}
              transition={{
                duration: s.dur,
                delay: 0.3 + i * 0.25,
                ease: "linear",
              }}
            />
            <div className="flex items-center gap-2 mb-1.5">
              <span className="f-mono text-[0.5rem] font-semibold tracking-[0.2em] text-accent">
                {s.tag}
              </span>
              <span className="f-mono text-[0.44rem] tracking-[0.12em] uppercase text-fg-4">
                {s.kind}
              </span>
            </div>
            <div className="text-[12px] text-fg leading-tight font-medium">
              {s.title}
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: s.dur,
                delay: 0.3 + i * 0.25,
                ease: "linear",
              }}
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent origin-left"
              style={{ boxShadow: "0 0 10px hsl(var(--accent) / 0.7)" }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1] }}
              transition={{
                duration: 0.8,
                delay: 0.3 + i * 0.25 + s.dur,
                times: [0, 0.6, 1],
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 f-mono text-[0.42rem] tracking-[0.14em] uppercase text-accent"
            >
              <Check size={8} strokeWidth={3} />
              read
            </motion.div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.5 }}
        className="mt-6 flex items-center gap-2 f-mono text-[0.5rem] tracking-[0.2em] uppercase text-accent"
      >
        <span className="w-[5px] h-[5px] rounded-full bg-accent" />
        All absorbed · 1,418 pages · 42s
      </motion.div>
    </div>
  );
}

function PhaseOutline() {
  return (
    <div className="relative h-full p-6 md:p-9">
      <ScanSweep />
      <div className="relative mb-6 flex items-center justify-between">
        <div className="f-mono text-[0.5rem] tracking-[0.24em] uppercase text-accent">
          Building argument · 12 nodes
        </div>
        <div className="f-mono text-[0.44rem] tracking-[0.14em] uppercase text-fg-4">
          12-page brief · 5 sections
        </div>
      </div>
      <div className="relative">
        {/* Vertical spine */}
        <motion.div
          aria-hidden
          className="absolute left-[11px] top-2 bottom-2 w-[1.5px] bg-accent origin-top"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2.2, ease: "linear", delay: 0.1 }}
          style={{ boxShadow: "0 0 8px hsl(var(--accent) / 0.6)" }}
        />
        <div className="space-y-3">
          {outlineNodes.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.3 + i * 0.42,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative pl-8 flex items-start gap-3"
            >
              <motion.span
                aria-hidden
                className="absolute left-[4px] top-[7px] w-[16px] h-[16px] rounded-full border border-accent bg-bg flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.4, 1] }}
                transition={{
                  duration: 0.55,
                  delay: 0.3 + i * 0.42,
                  times: [0, 0.5, 1],
                }}
                style={{ boxShadow: "0 0 10px hsl(var(--accent) / 0.5)" }}
              >
                <span className="f-mono text-[0.38rem] font-bold text-accent tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.span>
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="f-mono text-[0.52rem] tracking-[0.2em] uppercase text-fg mb-0.5">
                  {n.label}
                </div>
                <div className="text-[12px] text-fg-3 leading-snug italic">
                  {n.detail}
                </div>
              </div>
              <motion.div
                aria-hidden
                className="absolute left-[20px] top-[15px] h-[1px] bg-accent/60 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.5 + i * 0.42,
                }}
                style={{ width: "14px" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PhaseDraft() {
  return (
    <div className="relative h-full p-5 md:p-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 24, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[560px] overflow-hidden"
        style={{
          background: "hsl(var(--fg) / 0.97)",
          boxShadow:
            "0 60px 140px -40px rgba(0,0,0,0.85), 0 0 0 1px hsl(var(--fg) / 0.1)",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="px-5 py-2.5 border-b border-black/10 flex items-center justify-between bg-black/5">
          <div className="flex items-center gap-3">
            <div className="f-mono text-[0.44rem] tracking-[0.14em] uppercase text-black/50">
              ECON 201 · Case brief
            </div>
            <div className="flex items-center gap-1.5 f-mono text-[0.42rem] tracking-[0.1em] uppercase text-black/45">
              <motion.span
                className="w-[5px] h-[5px] rounded-full bg-black/40"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.1, repeat: Infinity }}
              />
              Drafting · in your voice
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="f-mono text-[0.42rem] tracking-[0.14em] uppercase text-black/50">
              2,847 words
            </div>
            <div className="f-mono text-[0.42rem] tracking-[0.14em] uppercase text-black/50">
              Page 1 of 12
            </div>
          </div>
        </div>
        <div className="px-7 md:px-10 py-6 md:py-7 min-h-[320px] text-black/85">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-center mb-2"
            style={{
              fontFamily: "'Times New Roman', serif",
              fontSize: "9.5px",
              color: "rgba(0,0,0,0.55)",
            }}
          >
            Ojasva Mishra · ECON 201 · Prof. Kim · April 18, 2026
          </motion.div>
          <motion.h4
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45 }}
            className="text-center mb-5"
            style={{
              fontFamily: "'Times New Roman', serif",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "-0.005em",
              lineHeight: 1.3,
            }}
          >
            Why Price Elasticity Doesn't Explain Apple:
            <br />
            Switching Costs and the Illusion of Choice
          </motion.h4>
          <div
            className="text-[10.5px] leading-[1.8]"
            style={{ fontFamily: "'Times New Roman', serif" }}
          >
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.7,
                  delay: 0.7 + i * 0.85,
                }}
                className="mb-2.5 text-black/80"
                style={{ textIndent: "1.3em" }}
              >
                {p}
              </motion.p>
            ))}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1] }}
              transition={{ duration: 0.6, delay: 3.4 }}
              className="inline-block w-[1px] h-[10px] bg-black/60 align-middle"
              style={{ animation: "homework-caret 1s step-end infinite" }}
            />
          </div>
        </div>
        <motion.div
          aria-hidden
          className="absolute inset-x-0 h-[60px] pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent, hsl(var(--accent) / 0.18), transparent)",
          }}
          initial={{ top: "-10%" }}
          animate={{ top: "110%" }}
          transition={{
            duration: 3.2,
            ease: "linear",
            repeat: Infinity,
            delay: 0.3,
          }}
        />
      </motion.div>
    </div>
  );
}

function PhaseReview() {
  return (
    <div className="relative h-full p-6 md:p-9 flex flex-col items-center justify-center">
      <ScanSweep />
      <div className="f-mono text-[0.5rem] tracking-[0.24em] uppercase text-accent mb-2">
        AI detection · sweep
      </div>
      <div className="f-mono text-[0.42rem] tracking-[0.14em] uppercase text-fg-4 mb-7">
        GPTZero · Turnitin · Copyleaks · in parallel
      </div>

      {/* Gauge */}
      <div className="relative w-full max-w-[440px]">
        <div className="relative h-[10px] bg-rule/50 overflow-hidden">
          <motion.div
            aria-hidden
            className="absolute inset-y-0 left-0 origin-left bg-ember"
            initial={{ scaleX: 0.995 }}
            animate={{ scaleX: 0.002 }}
            transition={{ duration: 2.3, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            style={{
              boxShadow: "0 0 12px hsl(var(--ember) / 0.7)",
              width: "100%",
            }}
          />
          <motion.div
            aria-hidden
            className="absolute inset-y-0 left-0 origin-left bg-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 0.002 }}
            transition={{ duration: 2.3, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            style={{
              boxShadow: "0 0 12px hsl(var(--accent) / 0.8)",
              width: "100%",
            }}
          />
        </div>
        <div className="flex justify-between mt-2 f-mono text-[0.42rem] tracking-[0.18em] uppercase text-fg-4">
          <span>0% AI</span>
          <span>100% AI</span>
        </div>

        <div className="flex items-end justify-center gap-5 mt-9">
          <AiPercent from={99} to={0.2} delay={0.3} duration={2.3} />
        </div>

        <div className="grid grid-cols-3 gap-3 mt-10">
          {[
            { k: "GPTZero", v: "0.2%" },
            { k: "Turnitin", v: "0.1%" },
            { k: "Copyleaks", v: "0.3%" },
          ].map((d, i) => (
            <motion.div
              key={d.k}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.4 + i * 0.15 }}
              className="relative border border-accent/40 bg-accent/[0.06] p-3 text-left"
            >
              <div className="f-mono text-[0.42rem] tracking-[0.2em] uppercase text-fg-4 mb-1">
                {d.k}
              </div>
              <div
                className="text-accent tabular-nums"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontVariationSettings: "'SOFT' 40",
                  fontSize: "1.2rem",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {d.v}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent/70" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 3.0 }}
          className="mt-6 text-center f-mono text-[0.46rem] tracking-[0.18em] uppercase text-accent"
        >
          Indistinguishable from your last 14 essays
        </motion.div>
      </div>
    </div>
  );
}

function AiPercent({
  from,
  to,
  delay,
  duration,
}: {
  from: number;
  to: number;
  delay: number;
  duration: number;
}) {
  const [v, setV] = useState(from);
  useEffect(() => {
    const start = performance.now() + delay * 1000;
    let raf = 0;
    const tick = (now: number) => {
      if (now < start) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setV(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [from, to, delay, duration]);
  return (
    <div className="flex items-baseline gap-2">
      <span
        className="text-accent tabular-nums"
        style={{
          fontFamily: "'Fraunces', serif",
          fontVariationSettings: "'SOFT' 40",
          fontSize: "clamp(3rem, 7vw, 5rem)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          textShadow: "0 0 32px hsl(var(--accent) / 0.5)",
        }}
      >
        {v.toFixed(1)}
      </span>
      <span className="f-mono text-[0.58rem] tracking-[0.18em] uppercase text-accent">
        % AI
      </span>
    </div>
  );
}

function PhaseSubmit() {
  return (
    <div className="relative h-full p-6 md:p-9 flex flex-col items-center justify-center">
      <ScanSweep />
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[460px] border border-rule-hi bg-bg-2/70 p-6 overflow-hidden"
        style={{
          boxShadow:
            "0 60px 120px -40px rgba(0,0,0,0.8), 0 0 0 1px hsl(var(--accent) / 0.12)",
        }}
      >
        <div className="flex items-center gap-2.5 mb-4">
          <div
            className="w-5 h-5 shrink-0"
            style={{ background: "hsl(2 70% 55%)", borderRadius: "4px" }}
          />
          <div className="text-[11px] text-fg-3 font-medium leading-none">
            Canvas · ECON 201 · Prof. Kim
          </div>
          <div className="ml-auto f-mono text-[0.44rem] tracking-[0.14em] uppercase text-fg-4">
            due · 11:59pm
          </div>
        </div>
        <div
          className="text-fg mb-1"
          style={{
            fontFamily: "'Fraunces', serif",
            fontVariationSettings: "'SOFT' 40",
            fontSize: "1.25rem",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Case Brief · Apple Pricing
        </div>
        <div className="f-mono text-[0.46rem] tracking-[0.14em] uppercase text-fg-4 mb-5">
          12 pages · 2,847 words · MLA · uploaded
        </div>

        {/* Submit button with cursor tap + success flip */}
        <div className="relative h-[42px]">
          <motion.button
            type="button"
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              opacity: [1, 1, 0],
              scale: [1, 0.94, 0.94],
            }}
            transition={{
              duration: 0.5,
              delay: 1.3,
              times: [0, 0.7, 1],
            }}
            className="absolute inset-0 w-full f-mono text-[0.6rem] font-semibold tracking-[0.18em] uppercase bg-accent text-bg flex items-center justify-center gap-2"
            style={{
              boxShadow:
                "0 0 0 1px hsl(var(--accent) / 0.3), 0 20px 40px -10px hsl(var(--accent) / 0.6)",
            }}
          >
            Submit assignment
          </motion.button>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.55,
              delay: 1.75,
              type: "spring",
              damping: 16,
              stiffness: 240,
            }}
            className="absolute inset-0 w-full flex items-center justify-center gap-2 border border-accent/60 bg-accent/10"
          >
            <Check size={13} strokeWidth={2.5} className="text-accent" />
            <span className="f-mono text-[0.6rem] font-semibold tracking-[0.18em] uppercase text-accent">
              Submitted · 11:47pm
            </span>
          </motion.div>

          {/* Cursor tap */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, x: 90, y: -40 }}
            animate={{
              opacity: [0, 1, 1, 1, 0],
              x: [90, 60, 26, 0, 0],
              y: [-40, -22, -6, 6, 6],
              scale: [1, 1, 1, 0.82, 0.82],
            }}
            transition={{
              duration: 1.5,
              delay: 0.3,
              times: [0, 0.3, 0.65, 0.88, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute right-[14%] top-[-10px] z-[4]"
          >
            <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
              <path
                d="M2 2 L2 18 L6 14 L9 20 L11 19 L8 13 L14 13 Z"
                fill="hsl(var(--fg))"
                stroke="hsl(var(--bg))"
                strokeWidth="1"
                strokeLinejoin="miter"
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Grade receipt — glides in 3 "days later" */}
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.7,
          delay: 2.6,
          type: "spring",
          damping: 14,
          stiffness: 200,
        }}
        className="relative mt-6 border border-accent/60 bg-accent/10 px-5 py-3 flex items-center gap-4"
        style={{
          boxShadow: "0 20px 60px -20px hsl(var(--accent) / 0.55)",
        }}
      >
        <div className="f-mono text-[0.42rem] tracking-[0.18em] uppercase text-fg-4">
          Returned · 3 days later
        </div>
        <div
          className="text-accent"
          style={{
            fontFamily: "'Fraunces', serif",
            fontVariationSettings: "'SOFT' 40",
            fontSize: "2.2rem",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          A
        </div>
        <div className="f-mono text-[0.42rem] tracking-[0.14em] uppercase text-accent">
          "Exceptional voice"
        </div>
      </motion.div>
    </div>
  );
}

const phaseRenderers = [
  PhaseRead,
  PhaseOutline,
  PhaseDraft,
  PhaseReview,
  PhaseSubmit,
];

export default function SlideHomework() {
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { once: true, margin: "-12%" });
  const phase = useSequentialPhase(inView, phaseDurations);
  const activeIndex = Math.max(0, phase);
  const Active = phaseRenderers[activeIndex];

  return (
    <KeynoteSlide
      id="demo-homework"
      eyebrow="Live demo · 02"
      headline={
        <>
          "Do my{" "}
          <span className="tw-italic text-accent">homework.</span>"
        </>
      }
      body={
        <>
          Watch it happen. Four sources absorbed, an outline branches out, a
          12-page draft types itself in your exact voice, three detectors
          sweep it clean, Canvas accepts the upload, an A comes back.
        </>
      }
      align="center"
      spotlight
      visual={
        <div className="max-w-[1100px] mx-auto">
          {/* Workflow stepper — lights up phase-by-phase with the active
              stage below */}
          <div className="mb-8 md:mb-10 px-2">
            <div className="flex items-start justify-between max-w-[940px] mx-auto gap-1">
              {phases.map((p, i) => {
                const isActive = i === activeIndex && phase >= 0;
                const isDone = i < activeIndex;
                return (
                  <Fragment key={p.num}>
                    <div className="flex flex-col items-center text-center shrink-0 relative w-[58px] sm:w-[92px]">
                      <motion.div
                        className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border"
                        style={{ borderRadius: "999px" }}
                        animate={{
                          backgroundColor: isActive || isDone
                            ? "hsl(var(--accent) / 0.18)"
                            : "hsl(36 10% 11%)",
                          borderColor: isActive || isDone
                            ? "hsl(var(--accent))"
                            : "hsl(var(--rule))",
                          scale: isActive ? [1, 1.18, 1.08] : 1,
                          boxShadow: isActive
                            ? "0 0 24px hsl(var(--accent) / 0.7)"
                            : isDone
                              ? "0 0 10px hsl(var(--accent) / 0.3)"
                              : "0 0 0 hsl(var(--accent) / 0)",
                        }}
                        transition={{
                          duration: 0.8,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        {isDone ? (
                          <Check
                            size={12}
                            strokeWidth={3}
                            className="text-accent"
                          />
                        ) : (
                          <span
                            className="f-mono text-[0.5rem] sm:text-[0.58rem] font-bold tabular-nums"
                            style={{ color: "hsl(var(--accent))" }}
                          >
                            {p.num}
                          </span>
                        )}
                        {isActive && (
                          <motion.span
                            aria-hidden
                            className="absolute inset-[-6px] rounded-full border border-accent/60"
                            animate={{ scale: [1, 1.6], opacity: [0.9, 0] }}
                            transition={{
                              duration: 1.8,
                              repeat: Infinity,
                              ease: "easeOut",
                            }}
                          />
                        )}
                      </motion.div>
                      <div
                        className={`f-mono text-[0.42rem] sm:text-[0.5rem] tracking-[0.14em] sm:tracking-[0.18em] uppercase font-semibold mt-2 sm:mt-2.5 leading-tight transition-colors ${
                          isActive || isDone ? "text-fg" : "text-fg-4"
                        }`}
                      >
                        {p.label}
                      </div>
                      <div
                        className={`hidden sm:block f-mono text-[0.44rem] tracking-[0.1em] uppercase mt-1 leading-tight transition-colors ${
                          isActive ? "text-accent" : "text-fg-4"
                        }`}
                      >
                        {p.detail}
                      </div>
                    </div>
                    {i < phases.length - 1 && (
                      <div className="flex-1 mt-4 sm:mt-5 mx-1 md:mx-2 relative h-[2px]">
                        <div className="absolute inset-0 bg-rule/60" />
                        <motion.div
                          className="absolute inset-0 bg-accent origin-left"
                          animate={{
                            scaleX: i < activeIndex ? 1 : 0,
                          }}
                          transition={{
                            duration: 0.7,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          style={{
                            boxShadow: "0 0 10px hsl(var(--accent) / 0.5)",
                          }}
                        />
                      </div>
                    )}
                  </Fragment>
                );
              })}
            </div>
          </div>

          {/* Active-phase stage — swaps content as phase advances */}
          <div
            ref={stageRef}
            className="relative border border-rule-hi/70 overflow-hidden"
            style={{
              minHeight: "clamp(440px, 54vh, 560px)",
              background:
                "linear-gradient(180deg, hsl(var(--bg-2) / 0.7) 0%, hsl(var(--bg) / 0.6) 100%)",
              boxShadow:
                "0 80px 180px -50px rgba(0,0,0,0.85), 0 0 0 1px hsl(var(--accent) / 0.1), inset 0 1px 0 hsl(var(--fg) / 0.04)",
              backdropFilter: "blur(14px)",
            }}
          >
            {/* Outer spotlight that breathes */}
            <motion.div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 55% 48% at 50% 55%, hsl(var(--accent) / 0.08) 0%, transparent 70%)",
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Top meta rail */}
            <div className="relative flex items-center gap-3 px-5 py-3 border-b border-rule/60 bg-bg-3/50">
              <div className="flex gap-1.5">
                <span className="w-[9px] h-[9px] rounded-full bg-ember/60" />
                <span className="w-[9px] h-[9px] rounded-full bg-fg-4" />
                <span className="w-[9px] h-[9px] rounded-full bg-accent/60" />
              </div>
              <div className="f-mono text-[0.48rem] sm:text-[0.52rem] tracking-[0.2em] uppercase text-accent">
                twinly · homework-runner
              </div>
              <div className="hidden sm:block f-mono text-[0.46rem] tracking-[0.14em] uppercase text-fg-4 ml-auto">
                phase {String(activeIndex + 1).padStart(2, "0")} of 05 · {phases[activeIndex].label}
              </div>
              <motion.span
                className="sm:hidden ml-auto w-[6px] h-[6px] rounded-full bg-accent"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
            </div>

            {/* Phase swap */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <Active />
              </motion.div>
            </AnimatePresence>

            {/* Bottom meta rail */}
            <div className="relative flex items-center justify-between px-5 py-2.5 border-t border-rule/60 bg-bg-3/40">
              <div className="f-mono text-[0.42rem] tracking-[0.18em] uppercase text-fg-4">
                Econ 201 · case brief · apple pricing
              </div>
              <div className="flex items-center gap-3">
                <span className="f-mono text-[0.42rem] tracking-[0.14em] uppercase text-accent">
                  coffee still hot
                </span>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}
