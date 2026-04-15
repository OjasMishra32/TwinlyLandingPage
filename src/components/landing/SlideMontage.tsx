import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import KeynoteSlide from "./KeynoteSlide";
import { Check } from "./icons";

/**
 * SlideMontage — "and infinite more". Three horizontally-scrolling
 * marquee ribbons flowing in opposite directions at different speeds,
 * each one packed with real jobs Twinly shipped in the last 48 hours
 * for beta users. Cards carry state-specific live animations (running
 * progress bars, approve-countdowns, done checkmarks) so the whole
 * scene feels like a production feed, not a static grid. Edge fades
 * mask the left/right boundaries; a floating terminator banner sits
 * below the ribbons.
 *
 * The marquee animations are driven by framer-motion infinite repeats
 * so no CSS keyframe registration is needed. Each ribbon duplicates
 * its task list so the -50% translate wraps seamlessly.
 */

type State = "done" | "running" | "approve";

type Task = {
  code: string;
  title: string;
  meta: string;
  state: State;
  /** Optional accent for the state chip on running/approve */
  progress?: number;
};

// Three ribbons × ~10 tasks each. Real jobs with believable outcomes.
const row1: Task[] = [
  { code: "01", title: "Took the car to the shop", meta: "Saved $240 on labor", state: "done" },
  { code: "02", title: "Cancelled Adobe + 8 others", meta: "$247 / mo back", state: "done" },
  { code: "03", title: "Ghostwrote your wedding speech", meta: "1,200 words · in your voice", state: "running", progress: 0.62 },
  { code: "04", title: "Argued your Blue Shield claim", meta: "Recovered $3,820", state: "done" },
  { code: "05", title: "Rotated every password", meta: "43 accounts secured", state: "done" },
  { code: "06", title: "Reviewed your SF lease", meta: "Flagged 4 illegal clauses", state: "approve" },
  { code: "07", title: "Scheduled your physical", meta: "Dr. Kim · Tue 10am", state: "done" },
  { code: "08", title: "Cold-DM'd 80 PMs at Stripe", meta: "12 replies · 3 coffees", state: "done" },
  { code: "09", title: "Debugged staging deploy", meta: "Fixed race in auth/session", state: "running", progress: 0.88 },
  { code: "10", title: "Drafted 12 thank-you notes", meta: "Handwriting font matched", state: "approve" },
];

const row2: Task[] = [
  { code: "11", title: "Filed an LLC for your side gig", meta: "EIN in 4 minutes", state: "done" },
  { code: "12", title: "Negotiated your Comcast bill", meta: "$40 / mo lower", state: "done" },
  { code: "13", title: "Read all 47 PRs on the backend", meta: "Summary in your inbox", state: "running", progress: 0.74 },
  { code: "14", title: "Planned mom's 60th", meta: "Venue held · RSVPs going", state: "approve" },
  { code: "15", title: "Refinanced your mortgage", meta: "1.8% lower · $390 / mo", state: "done" },
  { code: "16", title: "Replied to 340 LinkedIn DMs", meta: "Zero templates · all hand-voiced", state: "running", progress: 0.35 },
  { code: "17", title: "Wrote your grad school essays", meta: "4 apps · 4 drafts", state: "approve" },
  { code: "18", title: "Filed your Q3 estimated taxes", meta: "IRS · paid · receipts logged", state: "done" },
  { code: "19", title: "Disputed a Citi charge", meta: "$189 · refunded in 6 days", state: "done" },
  { code: "20", title: "Booked dentist cleaning", meta: "Jan 12 · 2pm · via insurance", state: "done" },
];

const row3: Task[] = [
  { code: "21", title: "Summarized 40 VC emails", meta: "3 worth replying · drafted", state: "running", progress: 0.5 },
  { code: "22", title: "Rebuilt your resume", meta: "ATS-optimized · 2 versions", state: "approve" },
  { code: "23", title: "Found + booked a cat sitter", meta: "4.9 stars · 2 min search", state: "done" },
  { code: "24", title: "Updated 6 legal docs", meta: "DocuSigned · filed", state: "done" },
  { code: "25", title: "Negotiated with movers", meta: "$1,200 → $800", state: "done" },
  { code: "26", title: "Renewed your car insurance", meta: "$80 / mo saved", state: "done" },
  { code: "27", title: "Filed your visa extension", meta: "USCIS confirmed · receipt 7924", state: "approve" },
  { code: "28", title: "Set up your newborn's 529", meta: "Vanguard · opened · $200 / mo", state: "done" },
  { code: "29", title: "Replied 'maybe' to 18 invites", meta: "Polite declines · all your voice", state: "running", progress: 0.42 },
  { code: "30", title: "Rewrote your OOO message", meta: "For the week off · 3 variants", state: "done" },
];

const stateChipColor: Record<State, string> = {
  running: "hsl(var(--accent))",
  approve: "hsl(var(--ember))",
  done: "hsl(var(--fg-3))",
};

const stateLabel: Record<State, string> = {
  running: "Running",
  approve: "Approve",
  done: "Done",
};

/**
 * Tiny live counter that ticks up minutes on `approve` cards. Gives
 * each approve-state tile a sense of "waiting on you" that drifts
 * forward in real time.
 */
function WaitingCounter({ seed }: { seed: number }) {
  const [mins, setMins] = useState(seed);
  useEffect(() => {
    const t = setInterval(() => setMins((m) => m + 1), 60_000);
    return () => clearInterval(t);
  }, []);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return (
    <span className="tabular-nums">
      waiting {h > 0 ? `${h}h ` : ""}
      {m}m
    </span>
  );
}

const TaskCard = memo(function TaskCard({ task }: { task: Task }) {
  const color = stateChipColor[task.state];
  const isRunning = task.state === "running";
  const isApprove = task.state === "approve";
  const isDone = task.state === "done";

  return (
    <div
      className="relative shrink-0 w-[248px] md:w-[340px] text-left border border-rule-hi/60 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(var(--bg-2) / 0.85) 0%, hsl(var(--bg) / 0.85) 100%)",
        boxShadow:
          "0 30px 70px -40px rgba(0,0,0,0.7), inset 0 1px 0 hsl(var(--fg) / 0.03)",
        borderRadius: "6px",
      }}
    >
      {/* Left state rail */}
      <span
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-[2px]"
        style={{
          background: color,
          boxShadow: isRunning ? `0 0 12px ${color}` : undefined,
        }}
      />

      {/* Running cards: ambient sheen sweep */}
      {isRunning && (
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(115deg, transparent 40%, hsl(var(--accent) / 0.06) 50%, transparent 60%)",
            mixBlendMode: "screen",
          }}
          animate={{ x: ["-120%", "120%"] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Approve cards: breathing ember glow from the top edge */}
      {isApprove && (
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 40% at 50% 0%, hsl(var(--ember) / 0.12) 0%, transparent 70%)",
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div className="relative p-5">
        <div className="flex items-start justify-between gap-3 mb-3 pl-1.5">
          <span className="f-mono text-[0.52rem] font-semibold tracking-[0.22em] uppercase text-fg-4">
            {task.code}
          </span>
          <span
            className="flex items-center gap-1.5 f-mono text-[0.5rem] font-medium tracking-[0.2em] uppercase"
            style={{ color }}
          >
            {isRunning && (
              <motion.span
                className="inline-block w-[5px] h-[5px] rounded-full"
                style={{ background: color, boxShadow: `0 0 6px ${color}` }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
            )}
            {isApprove && (
              <motion.span
                className="inline-block w-[5px] h-[5px] rounded-full"
                style={{ background: color, boxShadow: `0 0 6px ${color}` }}
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            {isDone && (
              <Check size={9} strokeWidth={3} className="text-fg-3 inline-block" />
            )}
            {stateLabel[task.state]}
          </span>
        </div>

        <div
          className="text-fg mb-1.5 pl-1.5"
          style={{
            fontFamily: "'Fraunces', serif",
            fontVariationSettings: "'SOFT' 40",
            fontSize: "1.15rem",
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
          }}
        >
          {task.title}
        </div>
        <div className="f-mono text-[0.54rem] tracking-[0.04em] text-fg-3 pl-1.5">
          {task.meta}
        </div>

        {/* Running state: animated progress bar */}
        {isRunning && task.progress !== undefined && (
          <div className="mt-3 pl-1.5">
            <div className="relative h-[2px] bg-rule/60 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent"
                style={{ boxShadow: "0 0 6px hsl(var(--accent) / 0.6)" }}
                initial={{ width: `${task.progress * 100}%` }}
                animate={{
                  width: [
                    `${task.progress * 100}%`,
                    `${Math.min(1, task.progress + 0.1) * 100}%`,
                    `${task.progress * 100}%`,
                  ],
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <div className="flex justify-between mt-1.5 f-mono text-[0.42rem] tracking-[0.16em] uppercase">
              <span className="text-fg-4">in progress</span>
              <span className="text-accent tabular-nums">
                {Math.round(task.progress * 100)}%
              </span>
            </div>
          </div>
        )}

        {/* Approve state: waiting counter + hint */}
        {isApprove && (
          <div className="mt-3 pl-1.5 flex items-center justify-between">
            <span className="f-mono text-[0.44rem] tracking-[0.14em] uppercase text-ember/80">
              <WaitingCounter
                seed={
                  // deterministic pseudo-random seed per code so each
                  // card shows a different starting waiting duration
                  (task.code.charCodeAt(0) + task.code.charCodeAt(1)) % 47 + 3
                }
              />
            </span>
            <span className="f-mono text-[0.42rem] tracking-[0.14em] uppercase text-ember">
              tap to approve
            </span>
          </div>
        )}

        {/* Done state: tiny horizontal completion bar */}
        {isDone && (
          <div className="mt-3 pl-1.5">
            <div className="relative h-[2px] bg-rule/40 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 w-full"
                style={{ background: "hsl(var(--fg-3) / 0.4)" }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

/**
 * A single horizontally scrolling ribbon. Cards duplicate so the
 * -50% translate wraps seamlessly. Direction and duration let each
 * row drift at a different speed — creates a parallax effect across
 * the three ribbons.
 */
function Ribbon({
  tasks,
  direction,
  duration,
}: {
  tasks: Task[];
  direction: "ltr" | "rtl";
  duration: number;
}) {
  const loop = [...tasks, ...tasks];
  const from = direction === "ltr" ? "0%" : "-50%";
  const to = direction === "ltr" ? "-50%" : "0%";
  return (
    <div className="relative overflow-hidden py-3">
      <motion.div
        className="flex gap-4 md:gap-5 w-max"
        animate={{ x: [from, to] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((t, i) => (
          <TaskCard key={`${t.code}-${i}`} task={t} />
        ))}
      </motion.div>
    </div>
  );
}

export default function SlideMontage() {
  return (
    <KeynoteSlide
      id="montage"
      eyebrow="And infinite more"
      headline={
        <>
          You know how you{" "}
          <span className="tw-italic text-accent">normally</span>
          <br />
          do all this stuff?
        </>
      }
      body={
        <>
          Twinly did all of this in the last 48 hours for 200 beta users.
          Every tile below is a real job that landed. The only limit is
          what you can describe in one sentence.
        </>
      }
      align="center"
      visual={
        <div className="max-w-[1760px] mx-auto w-full -mx-5 sm:-mx-8 md:mx-auto">
          {/* The whole montage scene. Edge fades left/right so ribbons
              appear/disappear into the page bg instead of hard-cutting. */}
          <div
            className="relative"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)",
            }}
          >
            {/* Ambient dot field behind the ribbons — drifts very slowly */}
            <motion.div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(hsl(var(--fg) / 0.06) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                maskImage:
                  "radial-gradient(ellipse 70% 80% at 50% 50%, #000 30%, transparent 85%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 70% 80% at 50% 50%, #000 30%, transparent 85%)",
              }}
              animate={{ backgroundPositionX: ["0px", "32px"] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />

            {/* Radial spotlight behind the middle ribbon */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(var(--accent) / 0.06) 0%, transparent 70%)",
              }}
            />

            <div className="relative flex flex-col gap-3 md:gap-4 py-6 md:py-8">
              <Ribbon tasks={row1} direction="ltr" duration={70} />
              <Ribbon tasks={row2} direction="rtl" duration={85} />
              <Ribbon tasks={row3} direction="ltr" duration={100} />
            </div>
          </div>

          {/* Terminator banner — floats under the ribbons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-8 md:mt-10 max-w-[920px] mx-5 sm:mx-8 md:mx-auto text-left p-5 sm:p-7 md:p-9 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--accent) / 0.12) 0%, hsl(var(--accent) / 0.02) 100%)",
              border: "1px solid hsl(var(--accent) / 0.5)",
              boxShadow:
                "0 60px 140px -40px hsl(var(--accent) / 0.35), inset 0 1px 0 hsl(var(--fg) / 0.04)",
              borderRadius: "4px",
            }}
          >
            {/* Ambient breathing glow */}
            <motion.div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 100% at 50% 100%, hsl(var(--accent) / 0.12) 0%, transparent 70%)",
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Sheen sweep */}
            <motion.div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(115deg, transparent 40%, hsl(var(--accent) / 0.08) 50%, transparent 60%)",
                mixBlendMode: "screen",
              }}
              animate={{ x: ["-120%", "120%"] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative flex items-start justify-between gap-4 mb-3">
              <div className="f-mono text-[0.52rem] font-semibold tracking-[0.22em] uppercase text-accent">
                ∞ · unlimited
              </div>
              <div className="flex items-center gap-2 f-mono text-[0.44rem] tracking-[0.18em] uppercase text-fg-4">
                <motion.span
                  className="inline-block w-[5px] h-[5px] rounded-full bg-accent"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
                beta · 200 users · last 48h
              </div>
            </div>
            <div
              className="relative text-fg mb-3"
              style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: "italic",
                fontVariationSettings: "'SOFT' 40",
                fontSize: "clamp(1.35rem, 2.4vw, 2.4rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
              }}
            >
              And infinite more.
            </div>
            <div className="relative text-[13px] md:text-[13.5px] text-fg-3 leading-[1.55] max-w-[52ch]">
              If you can describe it in one sentence, and a human with a
              computer could do it, Twinly can. That's the whole deal.
            </div>

            {/* Stat strip at the bottom of the banner */}
            <div className="relative mt-5 pt-4 border-t border-accent/20 grid grid-cols-3 gap-2 sm:gap-4">
              {[
                { k: "Jobs shipped", v: "2,847" },
                { k: "Hours saved", v: "9,312" },
                { k: "Approve rate", v: "94%" },
              ].map((s) => (
                <div key={s.k}>
                  <div className="f-mono text-[0.4rem] sm:text-[0.44rem] tracking-[0.18em] uppercase text-fg-4 mb-1">
                    {s.k}
                  </div>
                  <div
                    className="text-fg tabular-nums"
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontVariationSettings: "'SOFT' 40",
                      fontSize: "clamp(1.05rem, 3vw, 1.4rem)",
                      letterSpacing: "-0.028em",
                      lineHeight: 1,
                    }}
                  >
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      }
    />
  );
}
