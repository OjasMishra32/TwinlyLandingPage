import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const FULL_DRAFT =
  "Hey Lena — something came up Thursday. Would Wed 9:30 or Tue 10:00 work on your side? Sorry for the shuffle.";

const statusSteps = [
  { t: "Read thread · Lena", done: true },
  { t: "Matched tone · 14 past replies", done: true },
  { t: "Found Wed 9:30 · Tue 10:00", done: true },
  { t: "Drafting reply", done: false, active: true },
];

export default function HeroComposer() {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setTyped(FULL_DRAFT);
      return;
    }
    let i = 0;
    let raf = 0;
    let last = performance.now();
    const charsPerSec = 32;
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      i += charsPerSec * dt;
      const idx = Math.min(FULL_DRAFT.length, Math.floor(i));
      setTyped(FULL_DRAFT.slice(0, idx));
      if (idx < FULL_DRAFT.length) {
        raf = requestAnimationFrame(tick);
      }
    };
    // Delay start so the card has animated in first
    const t = window.setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, 1400);
    return () => {
      window.clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -8, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.2, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[440px] bg-bg-2/75 backdrop-blur-xl border border-rule-hi will-change-transform"
      style={{
        boxShadow:
          "0 40px 120px -30px hsl(72 100% 58% / 0.2), 0 20px 60px -30px rgba(0,0,0,0.6), 0 0 0 1px hsl(var(--rule-hi) / 0.4)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Chrome */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-rule bg-bg-3/60 f-mono text-[0.58rem] tracking-[0.14em] uppercase text-fg-3">
        <span className="flex items-center gap-2">
          <span className="flex gap-[5px]">
            <i className="w-[7px] h-[7px] rounded-full bg-red-500/60" />
            <i className="w-[7px] h-[7px] rounded-full bg-amber-500/60" />
            <i
              className="w-[7px] h-[7px] rounded-full"
              style={{ background: "hsl(var(--accent) / 0.8)" }}
            />
          </span>
          <b className="text-fg font-medium">twinly</b>
          <span>/ thread · lena</span>
        </span>
        <span className="flex items-center gap-2 text-accent font-medium">
          <span className="live-dot" style={{ width: 5, height: 5 }} />
          Drafting
        </span>
      </div>

      {/* Status timeline */}
      <div className="px-5 pt-5 space-y-1.5">
        {statusSteps.map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 1.2 + i * 0.15 }}
            className="flex items-center gap-2 f-mono text-[0.6rem] tracking-[0.08em] uppercase"
          >
            <span
              className="w-[5px] h-[5px] rounded-full shrink-0"
              style={{
                background: s.done
                  ? "hsl(var(--accent))"
                  : "hsl(var(--ember))",
                boxShadow: s.active
                  ? "0 0 10px hsl(var(--ember))"
                  : undefined,
              }}
            />
            <span className={s.done ? "text-fg-2" : "text-fg"}>{s.t}</span>
            {s.done && (
              <svg
                viewBox="0 0 10 10"
                className="w-2.5 h-2.5 ml-auto text-accent"
              >
                <path
                  d="M1 5l3 3 5-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
            )}
          </motion.div>
        ))}
      </div>

      {/* Draft */}
      <div className="px-5 pt-5 pb-4">
        <div className="f-mono text-[0.56rem] font-medium tracking-[0.14em] uppercase text-fg-3 mb-2">
          Draft · in your tone
        </div>
        <p className="text-[13.5px] leading-relaxed text-fg min-h-[72px]">
          {typed}
          <span className="inline-block w-[6px] h-[1em] bg-accent ml-[1px] align-[-2px] animate-pulse" />
        </p>
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-between gap-2 px-5 py-3 border-t border-rule bg-bg-3/40">
        <span className="f-mono text-[0.54rem] tracking-[0.14em] uppercase text-fg-3">
          Awaiting approval
        </span>
        <div className="flex items-center gap-2">
          <button className="f-mono text-[0.58rem] tracking-[0.12em] uppercase px-3 py-1.5 border border-rule-hi text-fg-2 hover:text-fg transition-colors">
            Edit
          </button>
          <button
            className="f-mono text-[0.58rem] tracking-[0.12em] uppercase px-3 py-1.5 bg-accent text-bg font-semibold inline-flex items-center gap-1.5"
            style={{ boxShadow: "0 10px 30px -10px hsl(var(--accent) / 0.6)" }}
          >
            Approve
            <span>⌘↵</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
