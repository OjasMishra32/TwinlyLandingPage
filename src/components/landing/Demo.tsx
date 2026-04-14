import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const steps = [
  {
    key: "request",
    label: "REQUEST",
    title: "You tell Twinly.",
    body: '"Reschedule Thursday\'s sync with Lena — push it to next week, keep it in my mornings."',
    tone: "ink" as const,
  },
  {
    key: "plan",
    label: "PLAN",
    title: "It makes a plan.",
    body: "Check calendar · find conflict-free windows · draft in your tone · confirm before sending.",
    tone: "ink" as const,
  },
  {
    key: "context",
    label: "CONTEXT",
    title: "Gathers what it needs.",
    body: "Finds the thread, your past tone with Lena, your preference for Tue/Wed mornings, and your real availability.",
    tone: "ink" as const,
  },
  {
    key: "draft",
    label: "DRAFT",
    title: "Writes it like you.",
    body: '"Hey Lena — something came up Thursday. Would Wed 9:30 or Tue 10:00 work on your side? Sorry for the shuffle."',
    tone: "accent" as const,
  },
  {
    key: "approve",
    label: "APPROVAL",
    title: "Waits for your nod.",
    body: "Nothing leaves your account without you. Approve, edit, or reject — one tap.",
    tone: "accent" as const,
  },
  {
    key: "done",
    label: "DONE",
    title: "Handled.",
    body: "Sent. Calendar hold placed. Thread muted until she replies. You can get back to real work.",
    tone: "green" as const,
  },
];

export default function Demo() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 0.3 });
  const indexFloat = useTransform(progress, [0, 1], [0, steps.length - 0.001]);
  const barScale = useTransform(indexFloat, [0, steps.length - 1], [0, 1]);

  return (
    <section id="demo" ref={ref} className="relative border-t border-rule" style={{ height: `${steps.length * 90 + 40}vh` }}>
      <div className="sticky top-0 h-[100svh] w-full flex items-center overflow-hidden bg-paper">
        <div className="w-full max-w-[1680px] mx-auto px-6 md:px-14">
          <div className="sec-head !mb-12">
            <div className="sec-ident">
              <span className="num">
                03<span className="sl">/</span>
              </span>
              LIVE RUN
              <br />
              <b>ONE TASK</b>
            </div>
            <div>
              <h2
                className="font-black text-ink max-w-[14ch]"
                style={{
                  fontSize: "clamp(2.2rem,6vw,5.2rem)",
                  lineHeight: 0.88,
                  letterSpacing: "-0.05em",
                  fontStretch: "75%",
                }}
              >
                Watch a task move from <em className="tw-accent-word">request</em> to <em className="tw-accent-word">done.</em>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-10 items-start">
            <Stepper indexFloat={indexFloat} />
            <Stage indexFloat={indexFloat} barScale={barScale} />
          </div>
        </div>
      </div>
    </section>
  );
}

type IndexFloat = ReturnType<typeof useTransform<number, number>>;

function Stepper({ indexFloat }: { indexFloat: IndexFloat }) {
  return (
    <ol className="relative flex md:flex-col gap-2 md:gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
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
  indexFloat: IndexFloat;
}) {
  const active = useTransform(indexFloat, (v) => {
    if (v >= i && v < i + 1) return 1;
    if (v >= i + 1) return 0.5;
    return 0.3;
  });
  const borderColor = useTransform(indexFloat, (v) =>
    v >= i && v < i + 1 ? "hsl(var(--accent))" : "hsl(var(--rule))"
  );
  const bg = useTransform(indexFloat, (v) =>
    v >= i && v < i + 1 ? "hsl(var(--accent) / 0.06)" : "transparent"
  );
  return (
    <motion.li
      style={{ opacity: active, borderColor, background: bg }}
      className="shrink-0 md:shrink bg-paper border-[1.5px] px-4 py-3 min-w-[170px]"
    >
      <div className="flex items-center gap-3 f-mono">
        <span className="text-[0.6rem] font-bold text-accent tracking-[0.16em]">0{i + 1}</span>
        <span className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-ink">
          {step.label}
        </span>
      </div>
    </motion.li>
  );
}

function Stage({ indexFloat, barScale }: { indexFloat: IndexFloat; barScale: IndexFloat }) {
  return (
    <div className="relative hard-panel bg-surface overflow-hidden min-h-[380px] md:min-h-[480px]">
      {/* Chrome */}
      <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b-[1.5px] border-ink bg-paper-2 f-mono text-[0.62rem] font-medium tracking-[0.16em] uppercase text-ink-3">
        <span className="flex items-center gap-3">
          <span className="flex gap-[6px]">
            <i className="w-[10px] h-[10px] rounded-full" style={{ background: "hsl(var(--red))" }} />
            <i className="w-[10px] h-[10px] rounded-full" style={{ background: "hsl(var(--amber))" }} />
            <i className="w-[10px] h-[10px] rounded-full" style={{ background: "hsl(var(--green))" }} />
          </span>
          <b className="text-ink">twinly.app</b> <span>/ thread · reschedule-lena</span>
        </span>
        <span className="flex items-center gap-[8px] text-accent font-bold">
          <span className="live-dot" />
          LIVE RUN
        </span>
      </div>

      {/* Slides */}
      <div className="relative px-5 md:px-8 pt-8 pb-14 min-h-[320px] md:min-h-[400px]">
        {steps.map((step, i) => (
          <StageSlide key={step.key} step={step} i={i} indexFloat={indexFloat} />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-ink/10">
        <motion.div
          style={{ scaleX: barScale, transformOrigin: "left" }}
          className="h-full bg-accent"
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
  indexFloat: IndexFloat;
}) {
  const opacity = useTransform(indexFloat, (v) => {
    const d = Math.abs(v - i);
    return d < 0.5 ? 1 : d < 1 ? 1 - (d - 0.5) * 2 : 0;
  });
  const y = useTransform(indexFloat, (v) => (v - i) * -16);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 px-5 md:px-8 pt-8 flex flex-col justify-center">
      <div className="f-mono text-[0.62rem] font-bold tracking-[0.18em] text-accent">
        {step.label}
      </div>
      <h3
        className="mt-2 font-black text-ink"
        style={{
          fontSize: "clamp(1.6rem,3.2vw,2.8rem)",
          letterSpacing: "-0.03em",
          lineHeight: 1,
          fontStretch: "75%",
        }}
      >
        {step.title}
      </h3>
      <p className="mt-5 max-w-[620px] text-[15.5px] leading-relaxed text-ink-2 font-medium">
        {step.body}
      </p>
      {step.key === "approve" && (
        <div className="mt-6 flex items-center gap-2">
          <button className="btn primary !py-3 !px-4 !text-[0.66rem]">
            APPROVE &amp; SEND
            <span className="arrow" />
          </button>
          <button className="btn !py-3 !px-4 !text-[0.66rem]">
            EDIT
            <span className="arrow" />
          </button>
        </div>
      )}
      {step.key === "done" && (
        <div className="mt-6 inline-flex items-center gap-2 border-[1.5px] border-ink bg-paper-2 px-3 py-2 f-mono text-[0.66rem] font-bold text-ink">
          <span className="w-[6px] h-[6px] rounded-full" style={{ background: "hsl(var(--green))" }} />
          SENT · 0.3s ago
        </div>
      )}
    </motion.div>
  );
}
