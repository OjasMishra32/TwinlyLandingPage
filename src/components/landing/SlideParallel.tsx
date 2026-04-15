import { motion } from "framer-motion";
import KeynoteSlide from "./KeynoteSlide";

const jobs = [
  { tag: "TAX", title: "Filing your 2025 return", state: "Running", p: 0.74 },
  { tag: "TRAVEL", title: "Tokyo · 8 days", state: "Approve", p: 0.98 },
  { tag: "CODE", title: "Shipping mealmap.app", state: "Running", p: 0.52 },
  { tag: "INBOX", title: "23 replies in your voice", state: "Running", p: 0.88 },
  { tag: "REFUND", title: "Delta lost bag · $1,242", state: "Done", p: 1 },
  { tag: "NEGOT", title: "Rent renewal counter", state: "Running", p: 0.41 },
];

const stateColor: Record<string, string> = {
  Running: "hsl(var(--accent))",
  Approve: "hsl(var(--ember))",
  Done: "hsl(var(--accent))",
};

/** "Runs in parallel", grid of 6 jobs with independent orbit drift */
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
          Six jobs in flight. One waiting on your nod. One nearly done. A twin
          doesn't take turns, it runs the parallel life you'd have if you
          cloned yourself.
        </>
      }
      align="center"
      visual={
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-[1120px] mx-auto">
          {jobs.map((j, i) => (
            <motion.div
              key={j.tag}
              initial={{ opacity: 0, y: 40, rotateX: -8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{
                duration: 0.85,
                delay: 0.08 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative text-left"
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                animate={{
                  y: [0, i % 2 === 0 ? -6 : 6, 0],
                }}
                transition={{
                  duration: 5.2 + i * 0.35,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="relative border border-rule bg-bg-2/40 backdrop-blur-sm p-5"
                style={{
                  boxShadow: "0 20px 50px -28px rgba(0,0,0,0.6)",
                }}
              >
                {/* Accent rail */}
                <span
                  className="absolute left-0 top-0 bottom-0 w-[2px]"
                  style={{
                    background: stateColor[j.state],
                    boxShadow:
                      j.state === "Running"
                        ? `0 0 10px ${stateColor[j.state]}`
                        : undefined,
                  }}
                />
                <div className="flex items-center justify-between mb-3 pl-2">
                  <span
                    className="f-mono text-[0.52rem] font-semibold tracking-[0.2em] uppercase"
                    style={{ color: stateColor[j.state] }}
                  >
                    {j.tag}
                  </span>
                  <span
                    className="f-mono text-[0.5rem] font-medium tracking-[0.18em] uppercase"
                    style={{ color: stateColor[j.state] }}
                  >
                    {j.state}
                  </span>
                </div>
                <div className="text-[15px] text-fg font-medium leading-[1.35] mb-5 min-h-[2.5em] pl-2">
                  {j.title}
                </div>
                <div className="h-[2px] bg-rule overflow-hidden relative">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: j.p }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{
                      duration: 1.2,
                      delay: 0.5 + i * 0.08,
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
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1 + i * 0.2,
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
