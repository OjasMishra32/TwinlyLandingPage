import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import KeynoteSlide from "./KeynoteSlide";
import { Arrow, Pin } from "./icons";

/**
 * SlideTrip — "Get me to New York." Three-panel composition that
 * makes the twin's research visible:
 *   Left  → live research log. Timestamped entries of flights scanned,
 *           hotels ranked, reviews read, prices compared.
 *   Center → iPhone mockup with the final itinerary, bookings, map.
 *   Right → "eliminated" stack. Cards of rejected alternatives with
 *           strikethrough + the reason Twinly threw them out.
 * Radar sweeps in the map, ambient connection particles arc from the
 * left log into the phone and from the phone to the right eliminated
 * pile — the viewer sees information flowing in and decisions flowing
 * out.
 */

const bookings = [
  {
    code: "FLT",
    title: "Delta 1412 · SFO → JFK",
    sub: "Fri 7:40am · nonstop · 5h 30m",
    price: "$312",
  },
  {
    code: "HTL",
    title: "Made Hotel · NoMad",
    sub: "2 nights · king · breakfast incl.",
    price: "$486",
  },
  {
    code: "SAT",
    title: "Saturday plan",
    sub: "Brunch · MoMA · Don Angie",
    price: "$140",
  },
];

/**
 * Research-log entries. Each one is stamped with seconds elapsed since
 * kickoff, so the log reads like a real agent trace rather than a
 * static feature list. Keep the wording tight — these are meant to
 * fly past quickly, not be read word-for-word.
 */
const researchLog = [
  { t: "+0.2s", msg: "Kayak · 47 flights scanned · 6 airlines" },
  { t: "+1.1s", msg: "Filtered layovers · dropped 31 options" },
  { t: "+3.4s", msg: "Cross-referenced seat pitch · JetBlue out" },
  { t: "+5.8s", msg: "Booking · Hotels · Airbnb · 122 matches" },
  { t: "+8.1s", msg: "Read 84 reviews · subway distance ≤ 8m" },
  { t: "+11.5s", msg: "Ranked by breakfast + rating · top 9" },
  { t: "+14.3s", msg: "Pulled weather · 47°F rainy Sat · indoor plans" },
  { t: "+17.9s", msg: "OpenTable · MoMA timed entry · Don Angie 8pm" },
  { t: "+23.0s", msg: "Held Delta 1412 · JetSmarter fare rule clean" },
  { t: "+28.6s", msg: "Locked Made Hotel · rate code MADE15" },
  { t: "+33.4s", msg: "Synced calendar · added 6 events" },
  { t: "+38.0s", msg: "Packet ready · awaiting your approve" },
];

/**
 * Alternatives the twin evaluated and rejected. Each shows the option,
 * the price or score, and the one-line reason it lost. This is the
 * hidden work most agents never surface.
 */
const eliminated = [
  { name: "United 1628", meta: "1 stop · 9h 12m", reason: "Layover in ORD", price: "$258" },
  { name: "JetBlue 724", meta: "Nonstop · 5h 18m", reason: "Seat pitch 30\"", price: "$289" },
  { name: "Marriott Edition", meta: "Times Sq · 4.4★", reason: "No breakfast", price: "$612" },
  { name: "Pod 39", meta: "Murray Hill · 4.1★", reason: "14m to subway", price: "$289" },
  { name: "Ace Hotel", meta: "NoMad · 4.3★", reason: "2 reviews flagged noise", price: "$498" },
  { name: "Wolfgang's", meta: "Sat 8pm · Steakhouse", reason: "You had it last trip", price: "—" },
];

/**
 * Live 38-second research timer. Starts on inView, ticks up in
 * tenths, freezes at 38.0s — matches the final log entry.
 */
function useResearchTimer(start: boolean, cap = 38) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!start) return;
    const tickMs = 60;
    const step = (cap / (cap * 1000)) * tickMs;
    const interval = window.setInterval(() => {
      setT((prev) => {
        const next = prev + step;
        if (next >= cap) {
          window.clearInterval(interval);
          return cap;
        }
        return next;
      });
    }, tickMs);
    return () => window.clearInterval(interval);
  }, [start, cap]);
  return t;
}

/**
 * Price ticker cell that smoothly scrolls digits from a "scanning"
 * state to the final value. Used on the cheapest fare badge in the
 * research header so the number feels live.
 */
function PriceTicker({ start, to }: { start: boolean; to: number }) {
  const [v, setV] = useState(to + 180);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const from = performance.now();
    const duration = 2400;
    const startVal = to + 180;
    const tick = (now: number) => {
      const t = Math.min(1, (now - from) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(Math.round(startVal - (startVal - to) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to]);
  return <span className="tabular-nums">${v}</span>;
}

export default function SlideTrip() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sceneRef, { once: true, margin: "-12%" });
  const elapsed = useResearchTimer(inView);
  const logCutoff = researchLog.findIndex(
    (l) => parseFloat(l.t.replace(/[^\d.]/g, "")) > elapsed,
  );
  const visibleLog =
    logCutoff === -1 ? researchLog : researchLog.slice(0, logCutoff);

  return (
    <KeynoteSlide
      id="demo-trip"
      eyebrow="Live demo · 04"
      headline={
        <>
          "Get me to{" "}
          <span className="tw-italic text-accent">New York.</span>"
        </>
      }
      body={
        <>
          One sentence in, 38 seconds of work, one packet out. Watch the
          twin scan 47 flights, read 84 reviews, eliminate the six
          near-misses, and hand you a trip you'd have booked yourself.
        </>
      }
      align="center"
      spotlight
      visual={
        <div ref={sceneRef} className="w-full">
          {/* Brief quote — unchanged */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.85, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10 md:mb-14"
          >
            <div className="f-mono text-[0.54rem] tracking-[0.24em] uppercase text-fg-4 mb-3">
              Brief · {elapsed.toFixed(1)}s ago
            </div>
            <p
              className="text-fg-2 mx-auto"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontSize: "clamp(1.3rem, 2.4vw, 2.1rem)",
                lineHeight: 1.18,
                letterSpacing: "-0.015em",
                maxWidth: "26ch",
              }}
            >
              "Cheapest flight to NYC,
              <br />
              Friday to Sunday. Hotel near a subway."
            </p>
          </motion.div>

          {/* Three-panel scene */}
          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-8 items-start max-w-[1320px] mx-auto">
            {/* LEFT — research log */}
            <ResearchLog
              elapsed={elapsed}
              visibleLog={visibleLog}
              inView={inView}
            />

            {/* CENTER — iPhone */}
            <Phone inView={inView} />

            {/* RIGHT — eliminated stack */}
            <EliminatedStack inView={inView} />
          </div>

          {/* Metrics row — unchanged except responsiveness */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 mt-12 md:mt-16 max-w-[760px] mx-auto"
          >
            {[
              { k: "Research", v: "38.0s" },
              { k: "Options eval", v: "169" },
              { k: "Held now", v: "3" },
              { k: "Total", v: "$938" },
            ].map((m) => (
              <div key={m.k} className="text-center">
                <div className="f-mono text-[0.5rem] tracking-[0.22em] uppercase text-fg-4 mb-1.5">
                  {m.k}
                </div>
                <div
                  className="text-fg"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontVariationSettings: "'SOFT' 40, 'WONK' 0",
                    fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
                    letterSpacing: "-0.028em",
                    lineHeight: 1,
                  }}
                >
                  {m.v}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      }
    />
  );
}

function ResearchLog({
  elapsed,
  visibleLog,
  inView,
}: {
  elapsed: number;
  visibleLog: typeof researchLog;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative border border-rule-hi/70 overflow-hidden self-stretch min-h-[420px] lg:min-h-[560px]"
      style={{
        background:
          "linear-gradient(180deg, hsl(var(--bg-2) / 0.75) 0%, hsl(var(--bg) / 0.6) 100%)",
        boxShadow:
          "0 60px 140px -40px rgba(0,0,0,0.8), inset 0 1px 0 hsl(var(--fg) / 0.04)",
      }}
    >
      {/* Ambient scan */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 h-[1.5px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(var(--accent) / 0.6), transparent)",
        }}
        initial={{ top: "0%" }}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
      />

      {/* Header */}
      <div className="relative px-5 py-3.5 border-b border-rule/60 bg-bg-3/40">
        <div className="flex items-center gap-2 mb-1">
          <motion.span
            className="w-[6px] h-[6px] rounded-full bg-accent"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            style={{ boxShadow: "0 0 8px hsl(var(--accent) / 0.7)" }}
          />
          <div className="f-mono text-[0.52rem] tracking-[0.22em] uppercase text-accent">
            Research · live
          </div>
          <div className="ml-auto f-mono text-[0.48rem] tracking-[0.14em] uppercase text-fg-4 tabular-nums">
            T+{elapsed.toFixed(1)}s
          </div>
        </div>
        <div className="flex items-baseline gap-3">
          <div className="f-mono text-[0.44rem] tracking-[0.14em] uppercase text-fg-4">
            cheapest found
          </div>
          <div
            className="text-accent"
            style={{
              fontFamily: "'Fraunces', serif",
              fontVariationSettings: "'SOFT' 40",
              fontSize: "1.3rem",
              letterSpacing: "-0.025em",
              lineHeight: 1,
              textShadow: "0 0 18px hsl(var(--accent) / 0.4)",
            }}
          >
            <PriceTicker start={inView} to={312} />
          </div>
          <div className="f-mono text-[0.4rem] tracking-[0.14em] uppercase text-fg-4">
            / nonstop
          </div>
        </div>
      </div>

      {/* Log body */}
      <div className="relative px-5 py-4 space-y-1.5 text-left">
        {visibleLog.map((l, i) => (
          <motion.div
            key={l.t}
            initial={{ opacity: 0, x: -16, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.45,
              delay: 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-center gap-3"
          >
            <span className="f-mono text-[0.42rem] tracking-[0.1em] text-fg-4 tabular-nums shrink-0 w-[42px]">
              {l.t}
            </span>
            <span className="text-accent shrink-0">✓</span>
            <span className="text-[11.5px] text-fg-2 leading-tight">
              {l.msg}
            </span>
            {i === visibleLog.length - 1 && (
              <motion.span
                className="inline-block w-[1px] h-[11px] bg-accent"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Footer — lit once log finishes */}
      {visibleLog.length >= researchLog.length && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-0 left-0 right-0 px-5 py-2.5 border-t border-accent/50 bg-accent/[0.06] flex items-center gap-2"
        >
          <span
            className="w-[6px] h-[6px] rounded-full bg-accent"
            style={{ boxShadow: "0 0 10px hsl(var(--accent) / 0.9)" }}
          />
          <span className="f-mono text-[0.46rem] tracking-[0.2em] uppercase text-accent">
            ready · awaiting your approve
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

function Phone({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateY: -6 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.2, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "2400px", transformStyle: "preserve-3d" }}
      className="mx-auto"
    >
      <div
        className="relative"
        style={{
          width: "min(82vw, 320px)",
          aspectRatio: "9 / 19.5",
          borderRadius: "50px",
          padding: "12px",
          background:
            "linear-gradient(150deg, #2d2d33 0%, #0e0e10 45%, #1a1a1e 100%)",
          boxShadow:
            "0 0 0 1px hsl(var(--rule-hi) / 0.6), inset 0 0 0 1px hsl(var(--fg) / 0.05), 0 100px 220px -50px rgba(0,0,0,0.95), 0 0 140px -30px hsl(var(--accent) / 0.28)",
        }}
      >
        <div
          className="relative w-full h-full overflow-hidden"
          style={{
            borderRadius: "40px",
            background:
              "linear-gradient(180deg, hsl(36 10% 6%) 0%, hsl(36 10% 4%) 100%)",
          }}
        >
          {/* Dynamic Island */}
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 z-[10]"
            style={{
              width: "96px",
              height: "28px",
              borderRadius: "999px",
              background: "#000",
            }}
          />

          {/* Status bar */}
          <div
            className="absolute top-[14px] left-6 z-[6] text-[10.5px] text-fg font-semibold tabular-nums"
            style={{ fontFamily: "'Hanken Grotesk', system-ui" }}
          >
            9:41
          </div>
          <div className="absolute top-[15px] right-6 z-[6] flex items-center gap-1.5">
            <div className="flex items-end gap-[2px]">
              {[3, 5, 7, 9].map((h) => (
                <span
                  key={h}
                  className="bg-fg"
                  style={{
                    width: "3.2px",
                    height: `${h}px`,
                    borderRadius: "0.5px",
                  }}
                />
              ))}
            </div>
            <span
              className="text-[9px] text-fg font-semibold ml-0.5"
              style={{
                fontFamily: "'Hanken Grotesk', system-ui",
                letterSpacing: "-0.02em",
              }}
            >
              5G
            </span>
            <div
              className="ml-1 relative"
              style={{ width: "23px", height: "10px" }}
            >
              <div
                className="absolute inset-0 border border-fg/85"
                style={{ borderRadius: "2.5px" }}
              />
              <div
                className="absolute left-[1.5px] top-[1.5px] bottom-[1.5px] bg-fg"
                style={{ width: "16px", borderRadius: "1px" }}
              />
              <div className="absolute right-[-3px] top-[3px] w-[1.5px] h-[4px] bg-fg/85" />
            </div>
          </div>

          {/* App content */}
          <div className="relative pt-[54px] px-4 pb-[82px] h-full overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mb-3"
              style={{ fontFamily: "'Hanken Grotesk', system-ui" }}
            >
              <div className="flex items-baseline justify-between mb-1">
                <div
                  className="text-fg font-bold"
                  style={{
                    fontSize: "clamp(22px, 6vw, 26px)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  New York
                </div>
                <div className="text-[10.5px] text-fg-3 font-semibold tracking-[-0.01em]">
                  Fri · Sun
                </div>
              </div>
              <div className="text-[11.5px] text-fg-3 font-medium tracking-[-0.01em]">
                Twinly held everything · 938 total
              </div>
            </motion.div>

            {/* Map card with radar sweep */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.85, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden mb-3"
              style={{
                height: "104px",
                borderRadius: "14px",
                background:
                  "radial-gradient(ellipse at 60% 50%, hsl(36 10% 13%) 0%, hsl(36 10% 6%) 100%)",
              }}
            >
              {/* Radar concentric rings */}
              <svg
                viewBox="0 0 300 200"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid slice"
              >
                {[30, 55, 80, 105].map((r, i) => (
                  <motion.circle
                    key={r}
                    cx="165"
                    cy="100"
                    r={r}
                    fill="none"
                    stroke="hsl(var(--accent))"
                    strokeWidth="0.6"
                    strokeOpacity={0.14 + i * 0.04}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                      duration: 1.4,
                      delay: 0.9 + i * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                ))}
                {/* Sweep line */}
                <motion.line
                  x1="165"
                  y1="100"
                  x2="270"
                  y2="100"
                  stroke="url(#sweep-grad)"
                  strokeWidth="1.2"
                  style={{ transformOrigin: "165px 100px" }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                />
                <defs>
                  <linearGradient id="sweep-grad" x1="0%" x2="100%">
                    <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Pin */}
              <motion.div
                initial={{ opacity: 0, y: -22, scale: 0.5 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.8,
                  delay: 1.2,
                  type: "spring",
                  damping: 12,
                  stiffness: 140,
                }}
                className="absolute"
                style={{
                  left: "55%",
                  top: "50%",
                  transform: "translate(-50%, -100%)",
                }}
              >
                <div
                  className="text-accent relative z-[2]"
                  style={{
                    filter: "drop-shadow(0 0 10px hsl(var(--accent) / 0.85))",
                  }}
                >
                  <Pin size={20} strokeWidth={2} />
                </div>
                <motion.div
                  initial={{ scale: 0.6, opacity: 0.6 }}
                  animate={{ scale: 2.6, opacity: 0 }}
                  transition={{
                    duration: 2,
                    delay: 1.4,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 rounded-full"
                  style={{ background: "hsl(var(--accent) / 0.55)" }}
                />
              </motion.div>
              <div
                className="absolute bottom-2 left-3 text-[9px] text-fg-3 font-semibold"
                style={{ fontFamily: "'Hanken Grotesk', system-ui" }}
              >
                Manhattan · 6 holds
              </div>
            </motion.div>

            {/* Booking list rows */}
            <div className="space-y-2">
              {bookings.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{
                    duration: 0.7,
                    delay: 1.4 + i * 0.16,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center gap-3 px-3 py-2.5"
                  style={{
                    background:
                      "linear-gradient(180deg, hsl(36 10% 11%) 0%, hsl(36 10% 8%) 100%)",
                    borderRadius: "12px",
                    border: "0.5px solid hsl(var(--rule-hi) / 0.6)",
                  }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(var(--accent) / 0.18) 0%, hsl(var(--accent) / 0.04) 100%)",
                      borderRadius: "9px",
                    }}
                  >
                    <span
                      className="text-accent"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "8px",
                        fontWeight: 600,
                        letterSpacing: "0.12em",
                      }}
                    >
                      {b.code}
                    </span>
                  </div>
                  <div
                    className="flex-1 min-w-0"
                    style={{ fontFamily: "'Hanken Grotesk', system-ui" }}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="text-[11.5px] text-fg font-semibold tracking-[-0.01em] truncate">
                        {b.title}
                      </div>
                      <div className="text-[11px] text-fg font-bold tabular-nums tracking-[-0.01em] shrink-0">
                        {b.price}
                      </div>
                    </div>
                    <div className="text-[9.5px] text-fg-3 font-medium tracking-[-0.005em] truncate">
                      {b.sub}
                    </div>
                  </div>
                  <div className="text-fg-4 shrink-0">
                    <Arrow size={10} strokeWidth={2} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom safe area + CTA with cursor tap */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.85, delay: 2.1 }}
            className="absolute bottom-0 left-0 right-0 px-4 pt-3 pb-6"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, hsl(36 10% 4%) 35%)",
            }}
          >
            <div className="relative h-[42px]">
              <motion.button
                type="button"
                initial={{ opacity: 1 }}
                whileInView={{ opacity: [1, 1, 0] }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.45,
                  delay: 3.55,
                  times: [0, 0.6, 1],
                }}
                className="absolute inset-0 w-full bg-accent text-bg font-bold tracking-[-0.01em]"
                style={{
                  fontFamily: "'Hanken Grotesk', system-ui",
                  fontSize: "13px",
                  borderRadius: "12px",
                  boxShadow:
                    "0 0 0 0.5px hsl(var(--accent) / 0.4), 0 18px 36px -12px hsl(var(--accent) / 0.65)",
                }}
              >
                Approve · book all 3
              </motion.button>
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.55,
                  delay: 4.0,
                  type: "spring",
                  damping: 16,
                  stiffness: 240,
                }}
                className="absolute inset-0 w-full flex items-center justify-center gap-2 border border-accent/60 bg-accent/10"
                style={{ borderRadius: "12px" }}
              >
                <Pin size={10} strokeWidth={2.5} />
                <span
                  className="text-accent font-bold tabular-nums tracking-[-0.01em]"
                  style={{
                    fontFamily: "'Hanken Grotesk', system-ui",
                    fontSize: "12px",
                  }}
                >
                  Booked all 3 · $938
                </span>
              </motion.div>

              {/* Cursor tap */}
              <motion.div
                aria-hidden
                initial={{ opacity: 0, x: 80, y: -54 }}
                whileInView={{
                  opacity: [0, 1, 1, 1, 0],
                  x: [80, 40, 10, -8, -8],
                  y: [-54, -28, -10, 6, 6],
                  scale: [1, 1, 1, 0.82, 0.82],
                }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 1.8,
                  delay: 2.7,
                  times: [0, 0.3, 0.65, 0.88, 1],
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute left-[68%] top-[-10px] z-[5]"
              >
                <svg width="16" height="20" viewBox="0 0 18 22" fill="none">
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
            {/* Home indicator */}
            <div
              className="mx-auto mt-4 rounded-full"
              style={{
                width: "100px",
                height: "4px",
                background: "hsl(var(--fg) / 0.4)",
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Incoming particles — from left log edge into phone top */}
      {inView && (
        <div aria-hidden className="hidden lg:block absolute top-1/3 -left-16 pointer-events-none">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              className="absolute w-[3px] h-[3px] rounded-full bg-accent"
              style={{ boxShadow: "0 0 8px hsl(var(--accent) / 0.9)" }}
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                x: [0, 20, 40, 64],
                y: [0, -8, 4, 0],
              }}
              transition={{
                duration: 2.2,
                delay: 1 + i * 0.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function EliminatedStack({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="relative border border-rule-hi/70 overflow-hidden self-stretch min-h-[420px] lg:min-h-[560px]"
      style={{
        background:
          "linear-gradient(180deg, hsl(var(--bg-2) / 0.75) 0%, hsl(var(--bg) / 0.6) 100%)",
        boxShadow:
          "0 60px 140px -40px rgba(0,0,0,0.8), inset 0 1px 0 hsl(var(--fg) / 0.04)",
      }}
    >
      {/* Header */}
      <div className="relative px-5 py-3.5 border-b border-rule/60 bg-bg-3/40">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-[6px] h-[6px] rounded-full bg-ember/80" />
          <div className="f-mono text-[0.52rem] tracking-[0.22em] uppercase text-ember">
            Eliminated · 6 of 169
          </div>
        </div>
        <div className="f-mono text-[0.44rem] tracking-[0.12em] uppercase text-fg-4">
          why the near-misses didn't make it
        </div>
      </div>

      {/* Eliminated cards */}
      <div className="relative px-4 py-4 space-y-2">
        {eliminated.map((e, i) => (
          <motion.div
            key={e.name}
            initial={{ opacity: 0, x: 24, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{
              duration: 0.55,
              delay: 0.4 + i * 0.14,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative border border-rule/60 px-3 py-2.5 overflow-hidden"
            style={{
              background: "hsl(var(--bg) / 0.5)",
            }}
          >
            {/* Ember strike line */}
            <motion.div
              aria-hidden
              className="absolute left-2 right-2 top-1/2 h-[1px] bg-ember/70 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{
                duration: 0.55,
                delay: 0.85 + i * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ boxShadow: "0 0 6px hsl(var(--ember) / 0.5)" }}
            />
            <div className="flex items-baseline justify-between gap-2 mb-0.5 relative">
              <div className="text-[11.5px] text-fg-2 font-medium leading-tight truncate">
                {e.name}
              </div>
              <div className="f-mono text-[0.5rem] tracking-[0.08em] text-fg-3 tabular-nums shrink-0">
                {e.price}
              </div>
            </div>
            <div className="f-mono text-[0.42rem] tracking-[0.08em] text-fg-4 truncate relative">
              {e.meta}
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 relative">
              <span className="w-[3px] h-[3px] rounded-full bg-ember/80" />
              <span className="f-mono text-[0.42rem] tracking-[0.12em] uppercase text-ember/90">
                {e.reason}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 2.2 }}
        className="absolute bottom-0 left-0 right-0 px-5 py-2.5 border-t border-rule/60 bg-bg-3/40 flex items-center gap-2"
      >
        <span className="f-mono text-[0.44rem] tracking-[0.18em] uppercase text-fg-4">
          163 more cut · shown on request
        </span>
      </motion.div>
    </motion.div>
  );
}
