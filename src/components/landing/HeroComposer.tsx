import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Accent = "lime" | "ember" | "mute";

type Task = {
  tag: string;
  title: string;
  meta: string;
  progress: number;
  accent: Accent;
};

const TASKS: Task[] = [
  {
    tag: "TAX",
    title: "Filing your 2025 return",
    meta: "14 docs · draft ready · awaiting nod",
    progress: 1,
    accent: "ember",
  },
  {
    tag: "TRAVEL",
    title: "Tokyo · 8 days",
    meta: "flights · hotel · JR pass · 6 holds",
    progress: 0.72,
    accent: "lime",
  },
  {
    tag: "WRITE",
    title: "Research paper · ch. 3",
    meta: "38 sources · 4,200 words drafted",
    progress: 0.58,
    accent: "lime",
  },
];

const accentColor: Record<Accent, string> = {
  lime: "hsl(var(--accent))",
  ember: "hsl(var(--ember))",
  mute: "hsl(var(--fg-3))",
};

export default function HeroComposer() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setTick((t) => t + 1), 1100);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="live-dot" />
          <span className="f-mono text-[0.58rem] font-medium tracking-[0.22em] uppercase text-fg-2">
            Twin · live
          </span>
        </div>
        <span className="f-mono text-[0.54rem] tracking-[0.18em] uppercase text-fg-4">
          3 of 5 in flight
        </span>
      </div>

      <ul className="flex flex-col border border-rule bg-bg-2/60 backdrop-blur-sm">
        {TASKS.map((task, i) => {
          const live =
            task.progress < 1
              ? Math.min(
                  0.98,
                  task.progress + 0.015 * Math.sin((tick + i * 2) * 0.9)
                )
              : task.progress;
          return (
            <motion.li
              key={task.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.1 + i * 0.09 }}
              className={`relative flex items-center gap-4 px-4 py-3 ${
                i > 0 ? "border-t border-rule" : ""
              }`}
            >
              <span
                className="f-mono text-[0.54rem] font-semibold tracking-[0.16em] uppercase w-[56px] shrink-0"
                style={{ color: accentColor[task.accent] }}
              >
                {task.tag}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-fg text-[13px] font-medium leading-tight truncate">
                  {task.title}
                </div>
                <div className="mt-0.5 f-mono text-[0.54rem] tracking-[0.02em] text-fg-3 truncate">
                  {task.meta}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="h-[2px] w-[64px] bg-rule overflow-hidden">
                  <motion.div
                    animate={{ scaleX: live }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      transformOrigin: "left",
                      background: accentColor[task.accent],
                      boxShadow:
                        task.progress < 1 && task.accent === "lime"
                          ? "0 0 8px hsl(var(--accent) / 0.55)"
                          : undefined,
                    }}
                    className="h-full"
                  />
                </div>
                <span
                  className="f-mono text-[0.54rem] tracking-[0.04em] tabular-nums w-[30px] text-right"
                  style={{ color: accentColor[task.accent] }}
                >
                  {task.progress === 1 ? "●" : `${Math.round(live * 100)}%`}
                </span>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}
