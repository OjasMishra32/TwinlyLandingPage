import { motion } from "framer-motion";
import { FileText, Rocket, MapPin } from "lucide-react";
import KeynoteSlide from "./KeynoteSlide";

/**
 * SlideParallel: three rich product-card tiles with real depth.
 * Each card has a gradient backing, an icon, big title, metric row,
 * state chip, and an accent rail that glows on running / approve.
 */

type State = "running" | "approve" | "done";

type Job = {
  tag: string;
  Icon: typeof FileText;
  title: string;
  state: State;
  progress: number;
  metricLabel: string;
  metricValue: string;
  subLabel: string;
};

const jobs: Job[] = [
  {
    tag: "TAX",
    Icon: FileText,
    title: "Filing 2025 return",
    state: "running",
    progress: 0.74,
    metricLabel: "Est. refund",
    metricValue: "$4,217",
    subLabel: "14 docs classified · schedule C drafted",
  },
  {
    tag: "CODE",
    Icon: Rocket,
    title: "Shipping mealmap.app",
    state: "approve",
    progress: 0.96,
    metricLabel: "Deploy",
    metricValue: "Held",
    subLabel: "Next.js built · Lighthouse 98 · ready",
  },
  {
    tag: "TRIP",
    Icon: MapPin,
    title: "Tokyo · 8 days",
    state: "done",
    progress: 1,
    metricLabel: "Bundle",
    metricValue: "$3,847",
    subLabel: "9 holds confirmed · itinerary live",
  },
];

const stateColor: Record<State, string> = {
  running: "hsl(var(--accent))",
  approve: "hsl(var(--ember))",
  done: "hsl(var(--accent))",
};

const stateLabel: Record<State, string> = {
  running: "Running",
  approve: "Awaiting you",
  done: "Delivered",
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
          Twin doesn't take turns. Three jobs in flight right now: one
          running, one waiting on your nod, one already delivered. A clone of
          you, running in parallel.
        </>
      }
      align="center"
      visual={
        <div className="grid md:grid-cols-3 gap-6 md:gap-7 max-w-[1180px] mx-auto">
          {jobs.map((j, i) => {
            const color = stateColor[j.state];
            const isApprove = j.state === "approve";
            return (
              <motion.div
                key={j.tag}
                initial={{ opacity: 0, y: 70, rotateX: -12 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 1,
                  delay: 0.12 + i * 0.14,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  perspective: "1400px",
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  animate={{ y: [0, i % 2 === 0 ? -6 : 6, 0] }}
                  transition={{
                    duration: 6.5 + i * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                  whileHover={{ y: -10, transition: { duration: 0.35 } }}
                  className="relative h-full border border-rule-hi/70 overflow-hidden group"
                  style={{
                    background:
                      "linear-gradient(180deg, hsl(var(--bg-2) / 0.8) 0%, hsl(var(--bg) / 0.7) 100%)",
                    boxShadow: `0 50px 120px -50px rgba(0,0,0,0.8), 0 0 0 1px hsl(var(--rule-hi) / 0.3)`,
                    backdropFilter: "blur(6px)",
                  }}
                >
                  {/* Accent rail on the left edge */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 bottom-0 w-[2px]"
                    style={{
                      background: color,
                      boxShadow:
                        j.state !== "done"
                          ? `0 0 18px ${color}, 0 0 4px ${color}`
                          : undefined,
                    }}
                  />
                  {/* Diagonal accent gradient in the background */}
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none opacity-50"
                    style={{
                      background: `radial-gradient(ellipse 60% 55% at 85% 15%, ${color
                        .replace("hsl(", "hsla(")
                        .replace(")", ", 0.09)")} 0%, transparent 60%)`,
                    }}
                  />
                  {/* Content */}
                  <div className="relative p-7 md:p-8 flex flex-col h-full">
                    {/* Top row: icon + state */}
                    <div className="flex items-start justify-between mb-7 md:mb-9">
                      <div
                        className="flex items-center justify-center w-11 h-11 border"
                        style={{
                          borderColor: color,
                          background: `${color
                            .replace("hsl(", "hsla(")
                            .replace(")", ", 0.06)")}`,
                        }}
                      >
                        <j.Icon
                          size={18}
                          strokeWidth={1.5}
                          style={{ color }}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="w-[7px] h-[7px] rounded-full"
                          style={{
                            background: color,
                            boxShadow:
                              j.state === "running"
                                ? `0 0 10px ${color}`
                                : undefined,
                            animation: isApprove
                              ? "approve-pulse 1.6s ease-in-out infinite"
                              : undefined,
                          }}
                        />
                        <span
                          className="f-mono text-[0.54rem] font-semibold tracking-[0.2em] uppercase"
                          style={{ color }}
                        >
                          {stateLabel[j.state]}
                        </span>
                      </div>
                    </div>

                    {/* Tag */}
                    <div
                      className="f-mono text-[0.56rem] font-semibold tracking-[0.24em] uppercase mb-3"
                      style={{ color }}
                    >
                      {j.tag}
                    </div>

                    {/* Title */}
                    <h4
                      className="text-fg mb-3"
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontVariationSettings: "'SOFT' 40, 'WONK' 0",
                        fontSize: "1.55rem",
                        letterSpacing: "-0.028em",
                        lineHeight: 1.05,
                        fontWeight: 400,
                      }}
                    >
                      {j.title}
                    </h4>

                    {/* Sub label */}
                    <div className="text-[12.5px] leading-[1.5] text-fg-3 mb-7 min-h-[2.6em]">
                      {j.subLabel}
                    </div>

                    {/* Metric + progress row */}
                    <div className="mt-auto">
                      <div className="flex items-baseline justify-between mb-3">
                        <div className="f-mono text-[0.5rem] tracking-[0.2em] uppercase text-fg-4">
                          {j.metricLabel}
                        </div>
                        <div
                          className="text-fg tabular-nums"
                          style={{
                            fontFamily: "'Fraunces', serif",
                            fontVariationSettings: "'SOFT' 40, 'WONK' 0",
                            fontSize: "1.4rem",
                            letterSpacing: "-0.025em",
                            lineHeight: 1,
                            color: j.state === "approve" ? color : undefined,
                          }}
                        >
                          {j.metricValue}
                        </div>
                      </div>
                      {/* Progress rail */}
                      <div className="h-[3px] bg-rule overflow-hidden relative">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: j.progress }}
                          viewport={{ once: true, margin: "-8%" }}
                          transition={{
                            duration: 1.4,
                            delay: 0.6 + i * 0.15,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          style={{
                            transformOrigin: "left",
                            background: color,
                            height: "100%",
                            boxShadow:
                              j.state !== "done"
                                ? `0 0 10px ${color}`
                                : undefined,
                          }}
                        />
                        {j.state === "running" && (
                          <motion.div
                            aria-hidden
                            className="absolute inset-y-0 w-[40%]"
                            animate={{ x: ["-40%", "260%"] }}
                            transition={{
                              duration: 2.6,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: 1.4 + i * 0.3,
                            }}
                            style={{
                              background: `linear-gradient(90deg, transparent, ${color.replace(
                                "hsl(",
                                "hsla("
                              ).replace(")", ", 0.65)")}, transparent)`,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      }
    />
  );
}
