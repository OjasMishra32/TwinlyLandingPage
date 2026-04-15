import { motion } from "framer-motion";
import KeynoteSlide from "./KeynoteSlide";

/**
 * SlideParallel: three big job cards instead of six. Apple-style
 * focal composition: fewer elements, more breathing room, bigger
 * typography per card.
 */

const jobs = [
  {
    tag: "TAX",
    title: "Filing 2025 return",
    state: "Running",
    p: 0.74,
    note: "14 docs · refund $4,217",
  },
  {
    tag: "CODE",
    title: "Shipping mealmap.app",
    state: "Approve",
    p: 0.98,
    note: "deploy held for your nod",
  },
  {
    tag: "TRIP",
    title: "Tokyo · 8 days",
    state: "Done",
    p: 1,
    note: "9 holds, all confirmed",
  },
];

const stateColor: Record<string, string> = {
  Running: "hsl(var(--accent))",
  Approve: "hsl(var(--ember))",
  Done: "hsl(var(--accent))",
};

export default function SlideParallel() {
  return (
    <KeynoteSlide
      id="parallel"
      eyebrow="Capability 02 · Parallel"
      headline={
        <>
          Runs your whole week{" "}
          <span className="tw-italic text-accent">at once.</span>
        </>
      }
      body={
        <>
          Twin doesn't take turns. Right now, three jobs are in flight: one
          running, one waiting on your nod, one already done. A clone of you,
          running in parallel.
        </>
      }
      align="center"
      visual={
        <div className="grid md:grid-cols-3 gap-5 md:gap-7 max-w-[1100px] mx-auto">
          {jobs.map((j, i) => (
            <motion.div
              key={j.tag}
              initial={{ opacity: 0, y: 60, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 1,
                delay: 0.12 + i * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                perspective: "1200px",
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0] }}
                transition={{
                  duration: 6 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
                whileHover={{ scale: 1.03, y: -6 }}
                className="relative border border-rule bg-bg-2/50 backdrop-blur-sm p-6 md:p-7 text-left h-full"
                style={{
                  boxShadow: "0 40px 100px -40px rgba(0,0,0,0.7)",
                }}
              >
                <span
                  className="absolute left-0 top-0 bottom-0 w-[2px]"
                  style={{
                    background: stateColor[j.state],
                    boxShadow:
                      j.state === "Running"
                        ? `0 0 14px ${stateColor[j.state]}`
                        : undefined,
                  }}
                />
                <div className="flex items-center justify-between mb-5 pl-2">
                  <span
                    className="f-mono text-[0.58rem] font-semibold tracking-[0.22em] uppercase"
                    style={{ color: stateColor[j.state] }}
                  >
                    {j.tag}
                  </span>
                  <span
                    className="f-mono text-[0.52rem] font-medium tracking-[0.18em] uppercase"
                    style={{ color: stateColor[j.state] }}
                  >
                    {j.state}
                  </span>
                </div>
                <div
                  className="text-fg mb-4 pl-2"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontVariationSettings: "'SOFT' 40",
                    fontSize: "1.4rem",
                    letterSpacing: "-0.025em",
                    lineHeight: 1.08,
                    minHeight: "2.2em",
                  }}
                >
                  {j.title}
                </div>
                <div className="f-mono text-[0.54rem] tracking-[0.08em] text-fg-3 mb-5 pl-2">
                  {j.note}
                </div>
                <div className="h-[2px] bg-rule overflow-hidden relative">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: j.p }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{
                      duration: 1.4,
                      delay: 0.6 + i * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      transformOrigin: "left",
                      background: stateColor[j.state],
                      height: "100%",
                    }}
                  />
                  {j.state === "Running" && (
                    <motion.div
                      className="absolute inset-y-0 w-[40%]"
                      animate={{ x: ["-40%", "140%"] }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.2 + i * 0.3,
                      }}
                      style={{
                        background: `linear-gradient(90deg, transparent, ${stateColor[j.state]}80, transparent)`,
                      }}
                    />
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      }
    />
  );
}
