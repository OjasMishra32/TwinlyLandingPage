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
    title: "It makes a plan.",
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
  const barScale = useTransform(indexFloat, [0, steps.length - 1], [0, 1]);

  return (
    <section id="demo" ref={ref} className="relative border-t border-rule" style={{ height: `${steps.length * 90 + 40}vh` }}>
      <div className="sticky top-0 h-[100svh] w-full flex items-center overflow-hidden bg-bg">
        <div className="w-full max-w-[1680px] mx-auto px-6 md:px-14">
          <div className="sec-head !mb-12">
            <div className="sec-ident">
              <span className="num">
                03<span className="sl">/</span>
              </span>
              How it flows
              <br />
              <b>One task, end to end</b>
            </div>
            <div>
              <h2
                className="font-semibold text-fg max-w-[15ch]"
                style={{
                  fontSize: "clamp(2.2rem,6vw,5.4rem)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.04em",
                }}
              >
                Watch a task move from <span className="tw-italic text-accent">request</span> to <span className="tw-italic text-accent">done.</span>
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
    if (v >= i + 1) return 0.55;
    return 0.3;
  });
  const borderColor = useTransform(indexFloat, (v) =>
    v >= i && v < i + 1 ? "hsl(var(--accent))" : "hsl(var(--rule))"
  );
  const bg = useTransform(indexFloat, (v) =>
    v >= i && v < i + 1 ? "hsl(var(--accent) / 0.08)" : "hsl(var(--bg-2))"
  );
  return (
    <motion.li
      style={{ opacity: active, borderColor, background: bg }}
      className="shrink-0 md:shrink border px-4 py-3 min-w-[170px]"
    >
      <div className="flex items-center gap-3 f-mono">
        <span className="text-[0.6rem] font-semibold text-accent tracking-[0.16em]">0{i + 1}</span>
        <span className="text-[0.72rem] font-medium tracking-[0.14em] uppercase text-fg">
          {step.label}
        </span>
      </div>
    </motion.li>
  );
}

function Stage({ indexFloat, barScale }: { indexFloat: IndexFloat; barScale: IndexFloat }) {
  return (
    <div className="relative panel overflow-hidden min-h-[380px] md:min-h-[480px]">
      {/* Chrome */}
      <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-rule bg-bg-3 f-mono text-[0.64rem] font-medium tracking-[0.14em] uppercase text-fg-3">
        <span className="flex items-center gap-3">
          <span className="flex gap-[6px]">
            <i className="w-[9px] h-[9px] rounded-full bg-red-500/70" />
            <i className="w-[9px] h-[9px] rounded-full bg-amber-500/70" />
            <i className="w-[9px] h-[9px] rounded-full" style={{ background: "hsl(var(--accent) / 0.7)" }} />
          </span>
          <b className="text-fg font-medium">twinly.app</b>
          <span>/ thread · reschedule-lena</span>
        </span>
        <span className="flex items-center gap-[8px] text-accent font-medium">
          <span className="live-dot" />
          Live
        </span>
      </div>

      {/* Slides */}
      <div className="relative px-5 md:px-8 pt-8 pb-14 min-h-[320px] md:min-h-[400px]">
        {steps.map((step, i) => (
          <StageSlide key={step.key} step={step} i={i} indexFloat={indexFloat} />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-rule">
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
      <div className="f-mono text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-accent">
        {step.label}
      </div>
      <h3
        className="mt-2 font-semibold text-fg"
        style={{
          fontSize: "clamp(1.6rem,3.2vw,2.8rem)",
          letterSpacing: "-0.025em",
          lineHeight: 1,
        }}
      >
        {step.title}
      </h3>
      <p className="mt-5 max-w-[620px] text-[15.5px] leading-relaxed text-fg-2">
        {step.body}
      </p>
      {step.key === "approve" && (
        <div className="mt-6 flex items-center gap-2">
          <button className="btn primary !py-3 !px-4 !text-[0.64rem]">
            Approve &amp; send
            <span className="arrow" />
          </button>
          <button className="btn !py-3 !px-4 !text-[0.64rem]">
            Edit
            <span className="arrow" />
          </button>
        </div>
      )}
      {step.key === "done" && (
        <div className="mt-6 inline-flex items-center gap-2 border border-rule bg-bg-2 px-3 py-2 f-mono text-[0.66rem] font-medium text-fg">
          <span className="w-[6px] h-[6px] rounded-full bg-accent" />
          Sent · just now
        </div>
      )}
    </motion.div>
  );
}
