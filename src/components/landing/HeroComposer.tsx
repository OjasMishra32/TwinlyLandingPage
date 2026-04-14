import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type TaskState = "running" | "waiting" | "done";

type Task = {
  domain: string;
  title: string;
  meta: string;
  state: TaskState;
  progress: number;
};

const TASKS: Task[] = [
  {
    domain: "TAX",
    title: "Filing your 2025 return",
    meta: "14 docs ingested · draft ready",
    state: "waiting",
    progress: 1,
  },
  {
    domain: "TRAVEL",
    title: "Tokyo trip · 8 days",
    meta: "flights · hotel · JR pass · 6 bookings",
    state: "running",
    progress: 0.72,
  },
  {
    domain: "WRITE",
    title: "Research paper · Ch. 3",
    meta: "38 sources · 4,200 words drafted",
    state: "running",
    progress: 0.58,
  },
  {
    domain: "MONEY",
    title: "Subscription audit",
    meta: "saved $148/mo · 6 negotiations",
    state: "done",
    progress: 1,
  },
  {
    domain: "INBOX",
    title: "Clearing the queue",
    meta: "replied 23 · scheduled 4 · muted 11",
    state: "running",
    progress: 0.84,
  },
];

const stateColor: Record<TaskState, string> = {
  running: "hsl(var(--accent))",
  waiting: "hsl(var(--ember))",
  done: "hsl(var(--fg-3))",
};

const stateLabel: Record<TaskState, string> = {
  running: "Running",
  waiting: "Needs approval",
  done: "Done",
};

export default function HeroComposer() {
  // Animate live progress for running rows to feel alive
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const loop = () => {
      setTick((t) => (t + 1) % 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -6, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full bg-bg-2/80 backdrop-blur-xl border border-rule-hi will-change-transform"
      style={{
        boxShadow:
          "0 50px 140px -30px hsl(72 100% 58% / 0.22), 0 30px 80px -30px rgba(0,0,0,0.75), 0 0 0 1px hsl(var(--rule-hi) / 0.4)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Chrome bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-rule bg-bg-3/60">
        <div className="flex items-center gap-3 f-mono text-[0.6rem] tracking-[0.14em] uppercase text-fg-3">
          <span className="flex gap-[5px]">
            <i className="w-[7px] h-[7px] rounded-full bg-red-500/60" />
            <i className="w-[7px] h-[7px] rounded-full bg-amber-500/60" />
            <i
              className="w-[7px] h-[7px] rounded-full"
              style={{ background: "hsl(var(--accent) / 0.8)" }}
            />
          </span>
          <span className="text-fg font-medium">twinly</span>
          <span>/ console</span>
        </div>
        <div className="flex items-center gap-2 f-mono text-[0.56rem] tracking-[0.18em] uppercase text-accent">
          <span className="live-dot" style={{ width: 5, height: 5 }} />
          Live · 5 in flight
        </div>
      </div>

      {/* Header stats strip */}
      <div className="grid grid-cols-3 border-b border-rule bg-bg/40">
        {[
          { k: "Active", v: "5" },
          { k: "Saved today", v: "3.2h" },
          { k: "Pending you", v: "1" },
        ].map((s, i) => (
          <div
            key={s.k}
            className={`px-4 py-3 ${i < 2 ? "border-r border-rule" : ""}`}
          >
            <div className="f-mono text-[0.52rem] tracking-[0.18em] uppercase text-fg-4">
              {s.k}
            </div>
            <div
              className="mt-0.5 font-semibold text-fg"
              style={{ fontSize: "1.05rem", letterSpacing: "-0.02em" }}
            >
              {s.v}
            </div>
          </div>
        ))}
      </div>

      {/* Task rows */}
      <div className="divide-y divide-rule">
        {TASKS.map((task, i) => {
          const live =
            task.state === "running"
              ? Math.min(
                  0.98,
                  task.progress + 0.02 * Math.sin((tick + i * 30) * 0.05)
                )
              : task.progress;
          return (
            <motion.div
              key={task.title}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.15 + i * 0.1 }}
              className="relative px-5 py-3.5 group"
            >
              <div className="flex items-center gap-4">
                {/* Domain tag */}
                <div
                  className="w-[62px] shrink-0 f-mono text-[0.56rem] font-semibold tracking-[0.16em] uppercase"
                  style={{
                    color:
                      task.state === "waiting"
                        ? "hsl(var(--ember))"
                        : "hsl(var(--accent))",
                  }}
                >
                  {task.domain}
                </div>

                {/* Title + meta */}
                <div className="flex-1 min-w-0">
                  <div className="text-fg text-[13.5px] font-medium leading-tight truncate">
                    {task.title}
                  </div>
                  <div className="mt-0.5 f-mono text-[0.56rem] tracking-[0.04em] text-fg-3 truncate">
                    {task.meta}
                  </div>
                </div>

                {/* State pill */}
                <div
                  className="shrink-0 flex items-center gap-1.5 f-mono text-[0.52rem] tracking-[0.14em] uppercase"
                  style={{ color: stateColor[task.state] }}
                >
                  <span
                    className="w-[5px] h-[5px] rounded-full"
                    style={{
                      background: stateColor[task.state],
                      boxShadow:
                        task.state !== "done"
                          ? `0 0 8px ${stateColor[task.state]}`
                          : undefined,
                      animation:
                        task.state === "running"
                          ? "console-blink 1.4s ease-in-out infinite"
                          : undefined,
                    }}
                  />
                  {stateLabel[task.state]}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-2.5 h-[2px] bg-rule overflow-hidden">
                <motion.div
                  animate={{ scaleX: live }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    transformOrigin: "left",
                    background:
                      task.state === "waiting"
                        ? "hsl(var(--ember))"
                        : task.state === "done"
                        ? "hsl(var(--fg-3))"
                        : "hsl(var(--accent))",
                    boxShadow:
                      task.state === "running"
                        ? "0 0 10px hsl(var(--accent) / 0.6)"
                        : undefined,
                  }}
                  className="h-full"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer action bar */}
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-t border-rule bg-bg-3/40">
        <span className="f-mono text-[0.55rem] tracking-[0.14em] uppercase text-fg-3">
          1 item waits for your nod
        </span>
        <div className="flex items-center gap-2">
          <button className="f-mono text-[0.58rem] tracking-[0.12em] uppercase px-3 py-1.5 border border-rule-hi text-fg-2 hover:text-fg transition-colors">
            Review
          </button>
          <button
            className="f-mono text-[0.58rem] tracking-[0.12em] uppercase px-3 py-1.5 bg-accent text-bg font-semibold inline-flex items-center gap-1.5"
            style={{ boxShadow: "0 12px 30px -10px hsl(var(--accent) / 0.6)" }}
          >
            Approve all
            <span>⌘↵</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes console-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
      `}</style>
    </motion.div>
  );
}
