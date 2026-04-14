import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

type Step = {
  key: string;
  label: string;
  title: string;
  body: string;
};

const steps: Step[] = [
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.35,
  });
  const indexFloat = useTransform(progress, [0, 1], [0, steps.length - 0.001]);
  const barScale = useTransform(progress, [0, 1], [0, 1]);

  const [active, setActive] = useState(0);
  useMotionValueEvent(indexFloat, "change", (v) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.round(v)));
    if (next !== active) setActive(next);
  });

  return (
    <section
      id="demo"
      ref={ref}
      className="relative border-t border-rule"
      style={{ height: `${steps.length * 90 + 40}vh` }}
    >
      <div className="sticky top-0 h-[100svh] w-full flex items-center overflow-hidden bg-bg">
        <div className="absolute inset-0 grid-overlay opacity-60" aria-hidden />
        <div className="relative z-[2] w-full max-w-[1680px] mx-auto px-6 md:px-14">
          <div className="sec-head !mb-10">
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
                Watch a task move from{" "}
                <span className="tw-italic text-accent">request</span> to{" "}
                <span className="tw-italic text-accent">done.</span>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-10 items-start">
            <Stepper active={active} />
            <Stage active={active} barScale={barScale} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stepper({ active }: { active: number }) {
  return (
    <ol className="relative flex md:flex-col gap-2 md:gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
      {steps.map((step, i) => {
        const state =
          i < active ? "done" : i === active ? "active" : "pending";
        return (
          <motion.li
            key={step.key}
            animate={{
              backgroundColor:
                state === "active"
                  ? "hsl(72 100% 58% / 0.10)"
                  : "hsl(232 13% 9%)",
              borderColor:
                state === "active"
                  ? "hsl(72 100% 58%)"
                  : "hsl(232 10% 20%)",
              opacity: state === "pending" ? 0.4 : 1,
            }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0 md:shrink border px-4 py-3 min-w-[170px]"
          >
            <div className="flex items-center gap-3 f-mono">
              <span
                className={
                  state === "active"
                    ? "text-[0.6rem] font-semibold text-accent tracking-[0.16em]"
                    : "text-[0.6rem] font-semibold text-fg-3 tracking-[0.16em]"
                }
              >
                0{i + 1}
              </span>
              <span className="text-[0.72rem] font-medium tracking-[0.14em] uppercase text-fg">
                {step.label}
              </span>
              {state === "done" && (
                <svg
                  viewBox="0 0 16 16"
                  className="ml-auto h-3 w-3 text-accent"
                >
                  <path
                    d="M2 8l4 4 8-9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              )}
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}

function Stage({
  active,
  barScale,
}: {
  active: number;
  barScale: ReturnType<typeof useTransform<number, number>>;
}) {
  return (
    <div className="relative panel overflow-hidden h-[480px] md:h-[540px]">
      {/* Chrome */}
      <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-rule bg-bg-3 f-mono text-[0.64rem] font-medium tracking-[0.14em] uppercase text-fg-3">
        <span className="flex items-center gap-3">
          <span className="flex gap-[6px]">
            <i className="w-[9px] h-[9px] rounded-full bg-red-500/70" />
            <i className="w-[9px] h-[9px] rounded-full bg-amber-500/70" />
            <i
              className="w-[9px] h-[9px] rounded-full"
              style={{ background: "hsl(var(--accent) / 0.7)" }}
            />
          </span>
          <b className="text-fg font-medium">twinly.app</b>
          <span className="hidden sm:inline">/ thread · reschedule-lena</span>
        </span>
        <span className="flex items-center gap-[8px] text-accent font-medium">
          <span className="live-dot" />
          Live
        </span>
      </div>

      {/* Slide stack — every step is absolutely positioned, only the
          active one is visible. No keys, no mounts/unmounts, so there's
          zero chance of overlap or empty states during scroll. */}
      <div className="relative h-[calc(100%-56px)] md:h-[calc(100%-58px)]">
        {steps.map((step, i) => {
          const isActive = i === active;
          return (
            <div
              key={step.key}
              aria-hidden={!isActive}
              className="absolute inset-0 px-5 md:px-10 py-10 md:py-14 flex flex-col justify-center will-change-transform"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive
                  ? "translateY(0) scale(1)"
                  : i < active
                  ? "translateY(-20px) scale(0.98)"
                  : "translateY(20px) scale(0.98)",
                filter: isActive ? "blur(0px)" : "blur(6px)",
                pointerEvents: isActive ? "auto" : "none",
                transition:
                  "opacity 0.5s cubic-bezier(.22,1,.36,1), transform 0.6s cubic-bezier(.22,1,.36,1), filter 0.5s ease",
              }}
            >
              <div className="f-mono text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-accent">
                {step.label}
              </div>
              <h3
                className="mt-2 font-semibold text-fg"
                style={{
                  fontSize: "clamp(1.6rem,3.2vw,2.8rem)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.02,
                }}
              >
                {step.title}
              </h3>
              <p className="mt-5 max-w-[640px] text-[15.5px] md:text-[16px] leading-relaxed text-fg-2">
                {step.body}
              </p>
              {step.key === "draft" && (
                <div className="mt-6 f-mono text-[0.62rem] tracking-[0.14em] uppercase text-fg-3">
                  <span className="text-accent">Drafted</span> · matched 14 past replies
                </div>
              )}
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
                <div className="mt-6 inline-flex items-center gap-2 border border-rule bg-bg-2 px-3 py-2 f-mono text-[0.66rem] font-medium text-fg w-fit">
                  <span className="w-[6px] h-[6px] rounded-full bg-accent" />
                  Sent · just now
                </div>
              )}
            </div>
          );
        })}
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
