import { motion } from "framer-motion";

type Op = {
  tag: string;
  title: string;
  state: "running" | "done" | "waiting";
  meta: string;
  x: string;
  y: string;
  delay: number;
  drift: number;
};

const ops: Op[] = [
  {
    tag: "TAX",
    title: "Filing 2025 return",
    state: "waiting",
    meta: "14 docs · draft ready",
    x: "6%",
    y: "12%",
    delay: 1.1,
    drift: 0,
  },
  {
    tag: "TRAVEL",
    title: "Tokyo · 8 days",
    state: "running",
    meta: "6 holds · 72%",
    x: "-4%",
    y: "38%",
    delay: 1.25,
    drift: 1,
  },
  {
    tag: "REFUND",
    title: "Delta bag · $1,242",
    state: "done",
    meta: "settled in full",
    x: "8%",
    y: "64%",
    delay: 1.4,
    drift: 0,
  },
  {
    tag: "INBOX",
    title: "23 replies drafted",
    state: "running",
    meta: "morning briefing ready",
    x: "-2%",
    y: "88%",
    delay: 1.55,
    drift: 1,
  },
];

const stateColor: Record<Op["state"], string> = {
  running: "hsl(var(--accent))",
  done: "hsl(var(--accent))",
  waiting: "hsl(var(--ember))",
};

const stateLabel: Record<Op["state"], string> = {
  running: "Running",
  done: "Done",
  waiting: "Approve",
};

export default function FloatingOps() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{ perspective: "1200px" }}
    >
      {ops.map((op, i) => (
        <motion.div
          key={op.tag}
          initial={{ opacity: 0, x: 40, rotateY: 8 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{
            duration: 1.1,
            delay: op.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute w-[260px] md:w-[300px]"
          style={{
            right: op.x,
            top: op.y,
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            animate={{
              y: [0, op.drift === 0 ? -6 : 6, 0],
            }}
            transition={{
              duration: 6 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
            className="relative bg-bg-2/90 backdrop-blur-md border border-rule-hi px-4 py-3.5"
            style={{
              boxShadow:
                "0 30px 80px -30px rgba(0,0,0,0.65), 0 0 0 1px hsl(var(--rule-hi) / 0.4)",
            }}
          >
            {/* Accent rail */}
            <span
              className="absolute left-0 top-0 bottom-0 w-[2px]"
              style={{
                background: stateColor[op.state],
                boxShadow:
                  op.state === "running"
                    ? `0 0 12px ${stateColor[op.state]}`
                    : undefined,
              }}
            />

            <div className="flex items-center justify-between mb-1.5 pl-2">
              <span
                className="f-mono text-[0.52rem] font-semibold tracking-[0.18em] uppercase"
                style={{ color: stateColor[op.state] }}
              >
                {op.tag}
              </span>
              <span className="f-mono text-[0.5rem] font-medium tracking-[0.14em] uppercase text-fg-4">
                {stateLabel[op.state]}
              </span>
            </div>
            <div className="pl-2 text-[13px] text-fg font-medium leading-tight">
              {op.title}
            </div>
            <div className="pl-2 mt-1 f-mono text-[0.52rem] tracking-[0.04em] text-fg-3 truncate">
              {op.meta}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
