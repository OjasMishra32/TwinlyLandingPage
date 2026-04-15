import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import KeynoteSlide from "./KeynoteSlide";
import { Check, Arrow } from "./icons";

/**
 * SlideApproval — a two-column approval dashboard inside a macOS
 * window. Left column is a live queue of things the twin has drafted
 * and is waiting on you for (mom's text, cover letter, rent counter,
 * cancel an unused subscription, RSVP). Right column is the active
 * item expanded: the rent counter draft with comps, annual savings,
 * and the big "Approve & send" button.
 *
 * A live wall clock ticks in the chrome. A countdown timer on the
 * active item counts down in real time. The active queue row pulses
 * a subtle lime glow. All text inside the window is text-left to
 * override KeynoteSlide's default center cascade.
 */

type QueueItem = {
  tag: "REPLY" | "SEND" | "SPEND" | "CANCEL" | "RSVP";
  who: string;
  summary: string;
  meta: string;
  active?: boolean;
};

const queue: QueueItem[] = [
  {
    tag: "REPLY",
    who: "Mom",
    summary: "Sunday brunch at 11?",
    meta: "drafted · 2m ago",
  },
  {
    tag: "SEND",
    who: "Stripe · PM role",
    summary: "Cover letter + resume",
    meta: "drafted · 8m ago",
  },
  {
    tag: "REPLY",
    who: "Greenwood Property Mgmt",
    summary: "Counter the 12% rent hike",
    meta: "drafted · now",
    active: true,
  },
  {
    tag: "SPEND",
    who: "JAL 002 · SFO → NRT",
    summary: "Flight hold · 11:30pm Fri",
    meta: "$712 · expires 11pm",
  },
  {
    tag: "CANCEL",
    who: "Netflix",
    summary: "Unused 47 days",
    meta: "saves $23 / mo",
  },
  {
    tag: "RSVP",
    who: "Sarah & Diego",
    summary: "Wedding · Oct 14",
    meta: "decline · conflict",
  },
];

function tagColor(t: QueueItem["tag"]) {
  switch (t) {
    case "REPLY":
      return "text-accent";
    case "SEND":
      return "text-accent";
    case "SPEND":
      return "text-ember";
    case "CANCEL":
      return "text-fg-3";
    case "RSVP":
      return "text-accent";
  }
}

/** Live wall clock, ticks every second. Used in the window chrome. */
function LiveClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  return (
    <span className="tabular-nums">
      {hh}:{mm}:{ss}
    </span>
  );
}

/** Countdown timer that ticks down from a fixed target, real seconds. */
function Countdown() {
  // 4h 13m 42s starting window, ticks down in real time
  const [s, setS] = useState(4 * 3600 + 13 * 60 + 42);
  useEffect(() => {
    const t = setInterval(() => setS((v) => (v > 0 ? v - 1 : v)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return (
    <span className="tabular-nums">
      {h}h {String(m).padStart(2, "0")}m {String(sec).padStart(2, "0")}s
    </span>
  );
}

/**
 * Animated number count-up that fires once when the element scrolls
 * into view. Used on the $7,200 annual save tile so the savings feel
 * earned, not just printed.
 */
function AnimatedCounter({
  to,
  prefix = "",
  suffix = "",
  duration = 1.8,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    });
    return controls.stop;
  }, [inView, to, duration]);
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {Math.round(val).toLocaleString()}
      {suffix}
    </span>
  );
}

/**
 * The 18 comparable rental units the twin pulled from your block.
 * Deterministic so the dots land at the same positions every render.
 * Range is $2,800 – $3,700 so all three reference markers
 * (block average, your counter, your current, landlord ask) fit
 * cleanly on the y-axis.
 */
const comparableRentals = [
  2820, 2950, 3020, 2880, 3150, 3080, 2950, 3220, 2880, 3020, 3100, 2900, 3050,
  3180, 2970, 3090, 3010, 2940,
];

const RENT_MIN = 2800;
const RENT_MAX = 3700;
const BLOCK_AVG = 3020;
const TWIN_COUNTER = 3200;
const YOUR_CURRENT = 3400;
const LANDLORD_ASK = 3586;

/**
 * Mini scatter chart of 18 comparable rentals on your block with
 * four reference lines (block avg, your counter, your current,
 * landlord ask) so the user can SEE the argument the draft is
 * making, not just read about it. Dots fall into place on scroll
 * and the reference lines draw left-to-right in sequence.
 */
function ScatterChart() {
  const height = 130;
  const padTop = 14;
  const padBottom = 26;
  const plotHeight = height - padTop - padBottom;

  const yFor = (rent: number) =>
    padTop + plotHeight * (1 - (rent - RENT_MIN) / (RENT_MAX - RENT_MIN));

  const markers = [
    { label: "Block avg", value: BLOCK_AVG, color: "hsl(var(--fg-4))", delay: 0.4, dashed: true },
    { label: "Counter", value: TWIN_COUNTER, color: "hsl(var(--accent))", delay: 0.6, dashed: false },
    { label: "Current", value: YOUR_CURRENT, color: "hsl(var(--fg-2))", delay: 0.8, dashed: true },
    { label: "Landlord ask", value: LANDLORD_ASK, color: "hsl(var(--ember))", delay: 1.0, dashed: false },
  ];

  return (
    <div className="relative w-full">
      <div className="flex items-baseline justify-between mb-2">
        <div className="f-mono text-[0.48rem] tracking-[0.22em] uppercase text-fg-4">
          18 comps · rent / mo
        </div>
        <div className="f-mono text-[0.44rem] tracking-[0.14em] uppercase text-fg-4">
          pulled 2m ago · rentcast api
        </div>
      </div>

      <svg
        viewBox={`0 0 600 ${height}`}
        preserveAspectRatio="none"
        className="w-full"
        style={{ height: `${height}px`, overflow: "visible" }}
      >
        {/* Faint horizontal gridlines at $200 intervals */}
        {[3000, 3200, 3400, 3600].map((v) => (
          <line
            key={v}
            x1="0"
            x2="600"
            y1={yFor(v)}
            y2={yFor(v)}
            stroke="hsl(var(--rule))"
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />
        ))}

        {/* Reference lines draw-in */}
        {markers.map((m) => (
          <g key={m.label}>
            <motion.line
              x1="0"
              x2="600"
              y1={yFor(m.value)}
              y2={yFor(m.value)}
              stroke={m.color}
              strokeWidth="1.4"
              strokeDasharray={m.dashed ? "3 3" : undefined}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.95 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.95, delay: m.delay, ease: [0.22, 1, 0.36, 1] }}
              style={{
                filter: !m.dashed ? `drop-shadow(0 0 4px ${m.color})` : undefined,
              }}
            />
            <motion.text
              x="596"
              y={yFor(m.value) - 4}
              fill={m.color}
              fontSize="8"
              textAnchor="end"
              fontFamily="'JetBrains Mono', monospace"
              style={{ letterSpacing: "0.12em", textTransform: "uppercase" }}
              initial={{ opacity: 0, x: 8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.5, delay: m.delay + 0.6 }}
            >
              {m.label} · ${m.value.toLocaleString()}
            </motion.text>
          </g>
        ))}

        {/* 18 comp dots, evenly spaced horizontally */}
        {comparableRentals.map((rent, i) => {
          const cx = 14 + (i / (comparableRentals.length - 1)) * (600 - 28);
          const cy = yFor(rent);
          return (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r="3"
              fill="hsl(var(--fg-3))"
              initial={{ opacity: 0, cy: height - padBottom }}
              whileInView={{ opacity: 1, cy }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.035,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                filter: "drop-shadow(0 0 2px hsl(var(--fg-3) / 0.5))",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

/**
 * The 4 analysis steps the twin took before drafting. Shown as a
 * horizontal breadcrumb above the draft so the reader sees the
 * actual work, not just the output.
 */
const activitySteps = [
  { num: "01", label: "Scanned listings", detail: "127 on Zillow + RentCast" },
  { num: "02", label: "Matched block", detail: "18 units within 2 blocks" },
  { num: "03", label: "Pulled tickets", detail: "6 unresolved since 2024" },
  { num: "04", label: "Drafted counter", detail: "94% confidence · your voice" },
];

export default function SlideApproval() {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 130, damping: 18 });
  const smy = useSpring(my, { stiffness: 130, damping: 18 });
  const rotateX = useTransform(smy, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smx, [-0.5, 0.5], [-7, 7]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <KeynoteSlide
      id="approval"
      eyebrow="Capability 03 · Control"
      headline={
        <>
          Waits for your{" "}
          <span className="tw-italic text-accent">nod.</span>
        </>
      }
      body={
        <>
          You decide what runs free and what always waits at a gate. Nothing
          ships, nothing spends, nothing sends, until you've set the policy
          or tapped approve.
        </>
      }
      align="center"
      spotlight
      visual={
        <div
          ref={cardRef}
          className="max-w-[1200px] mx-auto text-left"
          style={{ perspective: "1800px" }}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative"
          >
            {/* Soft outer halo */}
            <div
              aria-hidden
              className="absolute -inset-16 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 55% at 50% 50%, hsl(var(--accent) / 0.14) 0%, transparent 65%)",
                filter: "blur(40px)",
                zIndex: -1,
              }}
            />

            {/* Ambient breathing glow, pulses indefinitely */}
            <motion.div
              aria-hidden
              className="absolute -inset-10 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 55% 45% at 50% 60%, hsl(var(--accent) / 0.08) 0%, transparent 70%)",
                filter: "blur(30px)",
                zIndex: -1,
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Window card */}
            <div
              className="relative overflow-hidden border border-rule-hi/80"
              style={{
                background:
                  "linear-gradient(180deg, hsl(var(--bg-2) / 0.95) 0%, hsl(var(--bg) / 0.85) 100%)",
                boxShadow:
                  "0 80px 200px -40px rgba(0,0,0,0.85), 0 0 0 1px hsl(var(--accent) / 0.12), inset 0 1px 0 hsl(var(--fg) / 0.04)",
                backdropFilter: "blur(14px)",
              }}
            >
              {/* macOS-style chrome */}
              <div
                className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-3 sm:py-3.5 border-b border-rule/80"
                style={{ background: "hsl(var(--bg-3) / 0.7)" }}
              >
                <div className="flex gap-1.5 shrink-0">
                  <span className="w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] rounded-full bg-ember/70" />
                  <span className="w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] rounded-full bg-fg-4" />
                  <span className="w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] rounded-full bg-accent/70" />
                </div>
                <div className="flex items-center gap-2 sm:gap-3 ml-1 sm:ml-2 min-w-0">
                  <span className="f-mono text-[0.48rem] sm:text-[0.52rem] tracking-[0.2em] sm:tracking-[0.22em] uppercase text-accent whitespace-nowrap">
                    twinly · approval
                  </span>
                  <span className="hidden sm:inline f-mono text-[0.5rem] tracking-[0.16em] uppercase text-fg-4">
                    · 6 pending · 2 live
                  </span>
                </div>
                <div className="ml-auto flex items-center gap-2 sm:gap-3 shrink-0">
                  <span className="hidden sm:flex items-center gap-1.5 f-mono text-[0.48rem] tracking-[0.18em] uppercase text-fg-4">
                    <motion.span
                      className="w-[5px] h-[5px] rounded-full bg-accent"
                      animate={{ opacity: [1, 0.35, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                    />
                    sync'd
                  </span>
                  <span className="f-mono text-[0.48rem] sm:text-[0.52rem] tracking-[0.16em] uppercase text-fg-3 tabular-nums">
                    <LiveClock />
                  </span>
                </div>
              </div>

              {/* Two-column body */}
              <div
                className="grid grid-cols-1 md:grid-cols-[268px_1fr]"
                style={{ transform: "translateZ(40px)" }}
              >
                {/* LEFT — queue */}
                <div className="border-b md:border-b-0 md:border-r border-rule/70 p-4 sm:p-5 relative overflow-hidden">
                  {/* Subtle vertical sheen, ambient */}
                  <motion.div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse 120% 40% at 50% 100%, hsl(var(--accent) / 0.06) 0%, transparent 70%)",
                    }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
                  />

                  <div className="relative flex items-center justify-between mb-4">
                    <div className="f-mono text-[0.48rem] tracking-[0.22em] uppercase text-fg-4">
                      Queue · today
                    </div>
                    <div className="flex items-center gap-1.5 px-1.5 py-0.5 border border-accent/40 bg-accent/[0.08]">
                      <span
                        className="w-[4px] h-[4px] rounded-full bg-accent"
                        style={{
                          animation: "approval-blink 1.6s ease-in-out infinite",
                          boxShadow: "0 0 6px hsl(var(--accent) / 0.7)",
                        }}
                      />
                      <span className="f-mono text-[0.44rem] font-semibold tracking-[0.2em] uppercase text-accent">
                        6
                      </span>
                    </div>
                  </div>

                  <div className="relative space-y-1.5">
                    {queue.map((item, i) => (
                      <motion.div
                        key={item.summary}
                        initial={{ opacity: 0, x: -14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-8%" }}
                        transition={{
                          duration: 0.55,
                          delay: 0.35 + i * 0.09,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="relative px-3 py-2.5 border border-rule/40"
                        style={{
                          background: item.active
                            ? "linear-gradient(90deg, hsl(var(--accent) / 0.12) 0%, hsl(var(--accent) / 0.03) 100%)"
                            : "hsl(var(--bg) / 0.4)",
                          borderRadius: "2px",
                          borderColor: item.active
                            ? "hsl(var(--accent) / 0.55)"
                            : undefined,
                        }}
                      >
                        {item.active && (
                          <>
                            <motion.span
                              aria-hidden
                              className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent"
                              animate={{ opacity: [0.6, 1, 0.6] }}
                              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                              style={{ boxShadow: "0 0 10px hsl(var(--accent) / 0.8)" }}
                            />
                            <motion.span
                              aria-hidden
                              className="absolute inset-0 pointer-events-none"
                              style={{
                                boxShadow:
                                  "inset 0 0 0 1px hsl(var(--accent) / 0.25)",
                              }}
                              animate={{ opacity: [0.6, 1, 0.6] }}
                              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                            />
                          </>
                        )}
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`f-mono text-[0.44rem] font-semibold tracking-[0.2em] uppercase ${tagColor(
                              item.tag
                            )}`}
                          >
                            {item.tag}
                          </span>
                          <span className="f-mono text-[0.42rem] tracking-[0.1em] uppercase text-fg-4 truncate">
                            {item.who}
                          </span>
                        </div>
                        <div className="text-[11.5px] text-fg-2 truncate leading-tight">
                          {item.summary}
                        </div>
                        <div className="f-mono text-[0.42rem] tracking-[0.1em] text-fg-4 mt-1">
                          {item.meta}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="relative mt-5 pt-3 border-t border-rule/40 flex items-center justify-between">
                    <div className="f-mono text-[0.42rem] tracking-[0.16em] uppercase text-fg-4">
                      Cleared today
                    </div>
                    <div className="f-mono text-[0.5rem] tracking-[0.1em] text-fg-2 tabular-nums">
                      47
                    </div>
                  </div>
                </div>

                {/* RIGHT — active detail */}
                <div className="p-4 sm:p-6 md:p-8">
                  {/* Landlord email snippet — grounds the stakes.
                      This is the incoming message that triggered the
                      twin's draft. Red-highlighted dollar amounts
                      make the demand visceral. */}
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mb-5 border border-ember/30 overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(180deg, hsl(var(--ember) / 0.05) 0%, hsl(var(--bg) / 0.4) 100%)",
                      borderRadius: "3px",
                    }}
                  >
                    <div
                      className="flex items-center gap-2 px-4 py-2 border-b border-ember/20"
                      style={{ background: "hsl(var(--ember) / 0.06)" }}
                    >
                      <div
                        className="w-4 h-4 flex items-center justify-center shrink-0 border border-ember/50"
                        style={{
                          background: "hsl(var(--ember) / 0.12)",
                          borderRadius: "2px",
                        }}
                      >
                        <span className="f-mono text-[0.42rem] font-bold text-ember">
                          G
                        </span>
                      </div>
                      <span className="f-mono text-[0.46rem] tracking-[0.18em] uppercase text-ember/90 truncate">
                        Greenwood Property Mgmt · legal@greenwood-pm.com
                      </span>
                      <span className="ml-auto f-mono text-[0.44rem] tracking-[0.12em] uppercase text-fg-4">
                        Tue 9:41am
                      </span>
                    </div>
                    <div className="px-4 py-3">
                      <div className="f-mono text-[0.46rem] tracking-[0.14em] uppercase text-fg-4 mb-1.5">
                        Subject · Lease renewal — rate adjustment
                      </div>
                      <p
                        className="text-fg-2 italic"
                        style={{
                          fontSize: "12.5px",
                          lineHeight: 1.55,
                          fontFamily: "'Fraunces', serif",
                        }}
                      >
                        "Per your lease, we're renewing at a{" "}
                        <b className="not-italic text-ember font-semibold">
                          12% increase
                        </b>{" "}
                        effective next month. New rate:{" "}
                        <b className="not-italic text-ember font-semibold tabular-nums">
                          $3,586 / mo
                        </b>
                        . Please confirm by Friday or we'll be forced to list
                        the unit."
                      </p>
                    </div>
                  </motion.div>

                  {/* Activity breadcrumb — the 4 steps the twin took
                      before drafting. Each step fills in sequence to
                      show actual work happened. */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="relative mb-5 grid grid-cols-2 sm:grid-cols-4 gap-0 overflow-hidden"
                  >
                    {activitySteps.map((step, i) => (
                      <motion.div
                        key={step.num}
                        initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, margin: "-8%" }}
                        transition={{
                          duration: 0.55,
                          delay: 1.0 + i * 0.18,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="relative flex items-center gap-2 px-2.5 sm:px-3 py-2 border-t border-b border-rule/50"
                        style={{
                          background:
                            i === activitySteps.length - 1
                              ? "linear-gradient(90deg, hsl(var(--accent) / 0.1) 0%, hsl(var(--bg) / 0.4) 100%)"
                              : "hsl(var(--bg) / 0.35)",
                          borderLeft: i === 0 ? "1px solid hsl(var(--rule) / 0.5)" : undefined,
                          borderRight: "1px solid hsl(var(--rule) / 0.5)",
                        }}
                      >
                        <span className="flex items-center justify-center w-4 h-4 border border-accent/60 text-accent shrink-0">
                          <Check size={8} strokeWidth={3} />
                        </span>
                        <div className="min-w-0">
                          <div className="f-mono text-[0.4rem] tracking-[0.18em] uppercase text-accent">
                            {step.num} · {step.label}
                          </div>
                          <div className="f-mono text-[0.4rem] tracking-[0.08em] text-fg-4 truncate">
                            {step.detail}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Status row */}
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="flex items-center gap-2 px-2.5 py-1 border border-ember/50 bg-ember/[0.06]">
                      <span
                        className="w-[6px] h-[6px] rounded-full bg-ember"
                        style={{
                          animation: "approval-blink 1.6s ease-in-out infinite",
                          boxShadow: "0 0 10px hsl(var(--ember) / 0.7)",
                        }}
                      />
                      <span className="f-mono text-[0.52rem] font-semibold tracking-[0.22em] uppercase text-ember">
                        Awaiting approval
                      </span>
                    </span>
                    <span className="f-mono text-[0.5rem] tracking-[0.18em] uppercase text-fg-4">
                      Rent counter · lease renewal
                    </span>
                    <span className="ml-auto flex items-center gap-1.5 f-mono text-[0.48rem] tracking-[0.14em] uppercase text-fg-3">
                      Auto-sends in
                      <span className="text-accent"><Countdown /></span>
                    </span>
                  </div>

                  {/* Avatar + metadata */}
                  <div className="flex items-start gap-4 mb-5">
                    <motion.div
                      className="w-11 h-11 flex items-center justify-center shrink-0 border border-accent/50 relative"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(var(--accent) / 0.14) 0%, hsl(var(--accent) / 0.04) 100%)",
                      }}
                      animate={{
                        boxShadow: [
                          "0 0 0 0 hsl(var(--accent) / 0.35)",
                          "0 0 0 6px hsl(var(--accent) / 0)",
                        ],
                      }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                    >
                      <span className="f-mono text-[0.64rem] font-semibold tracking-[0.1em] text-accent">
                        TW
                      </span>
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-0.5 flex-wrap">
                        <span className="text-[13.5px] text-fg font-medium">
                          Your twin
                        </span>
                        <span className="f-mono text-[0.5rem] tracking-[0.14em] uppercase text-fg-4">
                          drafted · 2 min ago
                        </span>
                        <span className="f-mono text-[0.5rem] tracking-[0.14em] uppercase text-fg-4">
                          · confidence 94%
                        </span>
                      </div>
                      <div className="text-[11.5px] text-fg-3 f-mono tracking-[0.04em]">
                        to: greenwood-property-mgmt@...
                      </div>
                    </div>
                  </div>

                  {/* The draft */}
                  <div
                    className="relative mb-6 p-5 border-l-2 border-accent/50 overflow-hidden"
                    style={{ background: "hsl(var(--bg) / 0.5)" }}
                  >
                    {/* Shimmer line across the draft — "freshly written" vibe */}
                    <motion.div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(115deg, transparent 40%, hsl(var(--accent) / 0.05) 50%, transparent 60%)",
                        mixBlendMode: "screen",
                      }}
                      animate={{ x: ["-120%", "120%"] }}
                      transition={{
                        duration: 6.5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 1.4,
                      }}
                    />
                    <div className="relative f-mono text-[0.48rem] tracking-[0.22em] uppercase text-fg-4 mb-3">
                      Draft · in your voice
                    </div>
                    <p
                      className="relative text-fg-2"
                      style={{
                        fontSize: "14.5px",
                        lineHeight: 1.6,
                      }}
                    >
                      "Based on 18 comparable units on your block running at{" "}
                      <b className="text-fg font-medium">$3,020 avg</b>, plus
                      the 6 unresolved maintenance tickets since 2024, we're
                      countering your 12% hike at{" "}
                      <b className="text-accent font-medium">$3,200 / mo</b>,
                      $200 below our current rate."
                    </p>
                  </div>

                  {/* Scatter chart — 18 comps visualised with 4
                      reference lines. Shows the argument at a glance:
                      the counter sits above the block average but
                      well below the current and landlord ask. */}
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mb-6 p-4 border border-rule/50"
                    style={{
                      background:
                        "linear-gradient(180deg, hsl(var(--bg) / 0.5) 0%, hsl(var(--bg-3) / 0.3) 100%)",
                      borderRadius: "3px",
                    }}
                  >
                    <ScatterChart />
                  </motion.div>

                  {/* Stats strip — with live count-up on the annual
                      save so the savings actually earn themselves on
                      screen. */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 py-5 border-y border-rule">
                    {[
                      { k: "Comps pulled", v: 18, prefix: "", suffix: "", sub: "on your block" },
                      { k: "Tickets cited", v: 6, prefix: "", suffix: "", sub: "unresolved" },
                      { k: "Annual save", v: 7200, prefix: "$", suffix: "", sub: "if landlord signs", highlight: true },
                    ].map((s, i) => (
                      <motion.div
                        key={s.k}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-8%" }}
                        transition={{
                          duration: 0.7,
                          delay: 0.5 + i * 0.1,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="relative"
                      >
                        <div className="f-mono text-[0.42rem] sm:text-[0.48rem] tracking-[0.16em] sm:tracking-[0.2em] uppercase text-fg-4 mb-1.5">
                          {s.k}
                        </div>
                        <div
                          className={s.highlight ? "text-accent mb-1" : "text-fg mb-1"}
                          style={{
                            fontFamily: "'Fraunces', serif",
                            fontVariationSettings: "'SOFT' 40",
                            fontSize: "clamp(1.15rem, 3.6vw, 1.8rem)",
                            letterSpacing: "-0.028em",
                            lineHeight: 1,
                            textShadow: s.highlight
                              ? "0 0 24px hsl(var(--accent) / 0.35)"
                              : undefined,
                          }}
                        >
                          <AnimatedCounter
                            to={s.v}
                            prefix={s.prefix}
                            suffix={s.suffix}
                            duration={s.highlight ? 2.2 : 1.4}
                          />
                        </div>
                        <div className="f-mono text-[0.48rem] tracking-[0.1em] text-fg-4">
                          {s.sub}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action row */}
                  <motion.div
                    className="relative flex flex-wrap items-center gap-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    <div className="relative h-[44px] w-full max-w-[218px] sm:w-[218px]">
                      {/* Orbital particle sparks around the approve
                          button. Eight tiny lime dots ride invisible
                          ellipses at different radii and speeds so
                          the button feels charged. Hidden on mobile
                          since the orbits sit well beyond the card's
                          visible area. */}
                      <div className="hidden sm:block absolute inset-0">
                      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                        const rX = 150 + (i % 3) * 16;
                        const rY = 32 + (i % 2) * 8;
                        const dur = 5.5 + (i % 4) * 1.1;
                        const phase = (i / 8) * Math.PI * 2;
                        return (
                          <motion.span
                            key={i}
                            aria-hidden
                            className="absolute left-1/2 top-1/2 w-[3px] h-[3px] rounded-full bg-accent pointer-events-none"
                            style={{
                              boxShadow: "0 0 6px hsl(var(--accent) / 0.9)",
                              originX: 0,
                              originY: 0,
                            }}
                            animate={{
                              x: Array.from({ length: 9 }, (_, k) => {
                                const th = phase + (k / 8) * Math.PI * 2;
                                return Math.cos(th) * rX;
                              }),
                              y: Array.from({ length: 9 }, (_, k) => {
                                const th = phase + (k / 8) * Math.PI * 2;
                                return Math.sin(th) * rY;
                              }),
                              opacity: [0.3, 0.85, 0.3, 0.85, 0.3, 0.85, 0.3, 0.85, 0.3],
                            }}
                            transition={{
                              duration: dur,
                              repeat: Infinity,
                              ease: "linear",
                              times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
                            }}
                          />
                        );
                      })}
                      </div>
                      <motion.button
                        type="button"
                        initial={{ opacity: 1 }}
                        whileInView={{ opacity: [1, 1, 0] }}
                        viewport={{ once: true, margin: "-8%" }}
                        transition={{
                          duration: 0.5,
                          delay: 2.3,
                          times: [0, 0.6, 1],
                        }}
                        className="absolute inset-0 w-full flex items-center justify-center gap-2.5 bg-accent text-bg f-mono text-[0.58rem] font-semibold tracking-[0.18em] uppercase"
                        style={{
                          boxShadow:
                            "0 0 0 1px hsl(var(--accent) / 0.2), 0 20px 60px -20px hsl(var(--accent) / 0.65)",
                        }}
                      >
                        <Check size={14} strokeWidth={2.5} />
                        Approve &amp; send
                        <span
                          className="ml-1 f-mono opacity-70 tabular-nums"
                          style={{ fontSize: "0.62rem" }}
                        >
                          ⌘↵
                        </span>
                      </motion.button>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-8%" }}
                        transition={{
                          duration: 0.55,
                          delay: 2.75,
                          type: "spring",
                          damping: 16,
                          stiffness: 240,
                        }}
                        className="absolute inset-0 w-full flex items-center justify-center gap-2.5 border border-accent/60 bg-accent/10"
                      >
                        <Check size={14} strokeWidth={3} className="text-accent" />
                        <span className="f-mono text-[0.58rem] font-semibold tracking-[0.18em] uppercase text-accent">
                          Sent · 0s
                        </span>
                      </motion.div>

                      {/* Cursor flying in */}
                      <motion.div
                        aria-hidden
                        initial={{ opacity: 0, x: 130, y: -46 }}
                        whileInView={{
                          opacity: [0, 1, 1, 1, 0],
                          x: [130, 80, 34, 6, 6],
                          y: [-46, -22, -2, 10, 10],
                          scale: [1, 1, 1, 0.82, 0.82],
                        }}
                        viewport={{ once: true, margin: "-8%" }}
                        transition={{
                          duration: 1.7,
                          delay: 1.3,
                          times: [0, 0.3, 0.65, 0.88, 1],
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute right-[12px] top-[-8px] z-[4]"
                      >
                        <svg width="17" height="21" viewBox="0 0 18 22" fill="none">
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
                    <button
                      type="button"
                      className="flex items-center gap-2 px-4 py-3 border border-rule-hi text-fg-2 f-mono text-[0.56rem] font-medium tracking-[0.16em] uppercase hover:text-fg hover:border-fg-3 transition-colors"
                    >
                      Edit draft
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-2 px-4 py-3 border border-rule/60 text-fg-3 f-mono text-[0.56rem] font-medium tracking-[0.16em] uppercase hover:text-fg-2 transition-colors"
                    >
                      Hold 24h
                    </button>
                    <span className="ml-auto flex items-center gap-1.5 f-mono text-[0.5rem] tracking-[0.16em] uppercase text-fg-4">
                      Reject
                      <Arrow size={9} strokeWidth={2} />
                      Discard
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Policy footer */}
              <div
                className="relative flex flex-wrap items-center gap-x-6 gap-y-2 px-5 md:px-6 py-3 border-t border-rule/70"
                style={{ background: "hsl(var(--bg-3) / 0.5)" }}
              >
                <div className="f-mono text-[0.44rem] tracking-[0.22em] uppercase text-fg-4">
                  Standing policy
                </div>
                {[
                  "Auto-approve · under $50",
                  "Never spend · over $2,000",
                  "Family · always draft, never send",
                  "After 11pm · hold till morning",
                ].map((p, i) => (
                  <motion.div
                    key={p}
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{
                      duration: 0.5,
                      delay: 1.5 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex items-center gap-1.5 f-mono text-[0.44rem] tracking-[0.14em] uppercase text-fg-3"
                  >
                    <span className="w-[3px] h-[3px] rounded-full bg-accent/70" />
                    {p}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      }
    />
  );
}
