import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const steps = [
  {
    key: "request",
    label: "Request",
    title: "You tell Twinly.",
    body: '"Reschedule Thursday\'s sync with Lena — push it to next week, keep it in my mornings."',
  },
  {
    key: "plan",
    label: "Plan",
    title: "Twinly makes a plan.",
    body: "Check calendar · find conflict-free windows · draft in your tone · confirm before sending.",
  },
  {
    key: "context",
    label: "Context",
    title: "Gathers what it needs.",
    body: "Finds the thread, your past tone with Lena, your preference for Tue/Wed mornings, and your real availability.",
  },
  {
    key: "draft",
    label: "Draft",
    title: "Writes it like you.",
    body: '"Hey Lena — something came up Thursday. Would Wed 9:30 or Tue 10:00 work on your side? Sorry for the shuffle."',
  },
  {
    key: "approve",
    label: "Approval",
    title: "Waits for your nod.",
    body: "Nothing leaves your account without you. Approve, edit, or reject — one tap.",
  },
  {
    key: "done",
    label: "Done",
    title: "Handled.",
    body: "Sent. Calendar hold placed. Thread muted until she replies. You can get back to real work.",
  },
];

export default function Demo() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 0.3 });
  const indexFloat = useTransform(progress, [0, 1], [0, steps.length - 0.001]);

  return (
    <section id="demo" ref={ref} className="relative" style={{ height: `${steps.length * 90 + 40}vh` }}>
      <div className="sticky top-0 h-[100svh] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-twin-cyan/10 blur-[120px]" />
          <div className="absolute right-[10%] bottom-[15%] h-[400px] w-[400px] rounded-full bg-twin-violet/10 blur-[120px]" />
        </div>

        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="mb-10 flex items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-white/60">
                03 · One task, end to end
              </div>
              <h2 className="mt-5 max-w-[680px] text-balance font-semibold tracking-[-0.03em] text-[clamp(2rem,4.4vw,3.8rem)] leading-[0.98]">
                Watch a task move{" "}
                <span className="font-serif-accent text-twin-cyan">from request</span>{" "}
                to{" "}
                <span className="font-serif-accent text-twin-violet">done.</span>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-[260px_1fr] gap-8 md:gap-12 items-start">
            <Stepper indexFloat={indexFloat} />
            <Stage indexFloat={indexFloat} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stepper({ indexFloat }: { indexFloat: ReturnType<typeof useTransform<number, number>> }) {
  return (
    <ol className="relative flex md:flex-col gap-4 md:gap-5 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
      {steps.map((step, i) => (
        <StepItem key={step.key} step={step} i={i} indexFloat={indexFloat} />
      ))}
    </ol>
  );
}

function StepItem({
  step,
  i,
  indexFloat,
}: {
  step: (typeof steps)[number];
  i: number;
  indexFloat: ReturnType<typeof useTransform<number, number>>;
}) {
  const active = useTransform(indexFloat, (v) => {
    if (v >= i && v < i + 1) return 1;
    if (v >= i + 1) return 0.4;
    return 0.25;
  });
  const scale = useTransform(active, [0.25, 1], [1, 1.02]);

  return (
    <motion.li
      style={{ opacity: active, scale }}
      className="shrink-0 md:shrink glass rounded-xl px-4 py-3 border-white/[0.08] min-w-[170px]"
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] text-twin-cyan">0{i + 1}</span>
        <span className="text-[13px] font-medium tracking-tight">{step.label}</span>
      </div>
    </motion.li>
  );
}

function Stage({
  indexFloat,
}: {
  indexFloat: ReturnType<typeof useTransform<number, number>>;
}) {
  return (
    <div className="relative glass-strong border-glow rounded-3xl p-6 md:p-10 min-h-[380px] md:min-h-[460px] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-noise opacity-30" />
      <div className="relative flex items-center justify-between mb-6 text-[10px] font-mono uppercase tracking-wider text-white/40">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-twin-cyan animate-pulse-soft" />
          </div>
          <span>twinly.app / thread · reschedule-lena</span>
        </div>
        <span>status · live</span>
      </div>

      <div className="relative">
        {steps.map((step, i) => (
          <StageSlide key={step.key} step={step} i={i} indexFloat={indexFloat} />
        ))}
      </div>

      <div className="absolute bottom-6 left-6 right-6 h-[2px] bg-white/5 overflow-hidden rounded-full">
        <motion.div
          style={{
            scaleX: useTransform(indexFloat, [0, steps.length - 1], [0, 1]),
            transformOrigin: "left",
          }}
          className="h-full bg-gradient-to-r from-twin-cyan to-twin-violet"
        />
      </div>
    </div>
  );
}

function StageSlide({
  step,
  i,
  indexFloat,
}: {
  step: (typeof steps)[number];
  i: number;
  indexFloat: ReturnType<typeof useTransform<number, number>>;
}) {
  const opacity = useTransform(indexFloat, (v) => {
    const d = Math.abs(v - i);
    return d < 0.5 ? 1 : d < 1 ? 1 - (d - 0.5) * 2 : 0;
  });
  const y = useTransform(indexFloat, (v) => (v - i) * -20);

  return (
    <motion.div
      style={{ opacity, y }}
      aria-hidden={i > 0 ? undefined : false}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-twin-cyan">
        {step.label}
      </div>
      <h3 className="mt-3 text-[clamp(1.6rem,3.2vw,2.6rem)] font-semibold tracking-[-0.02em] leading-[1.05]">
        {step.title}
      </h3>
      <p className="mt-5 max-w-[560px] text-[15.5px] leading-relaxed text-white/70">
        {step.body}
      </p>
      {step.key === "approve" && (
        <div className="mt-6 inline-flex items-center gap-2">
          <button className="rounded-full bg-twin-cyan text-black px-4 py-2 text-[12px] font-semibold">
            Approve & send
          </button>
          <button className="rounded-full border border-white/15 px-4 py-2 text-[12px] text-white/80">
            Edit
          </button>
        </div>
      )}
      {step.key === "done" && (
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-twin-cyan/30 bg-twin-cyan/10 px-3 py-1.5 text-[12px] text-twin-cyan font-mono">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Sent · 0.3s ago
        </div>
      )}
    </motion.div>
  );
}
