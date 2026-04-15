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

/** "Runs in parallel" slide — grid of 6 live jobs */
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
          doesn't take turns — it runs the parallel life you'd have if you
          cloned yourself.
        </>
      }
      align="center"
      visual={
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-[1120px] mx-auto">
          {jobs.map((j, i) => (
            <motion.div
              key={j.tag}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{
                duration: 0.75,
                delay: 0.05 + i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative border border-rule p-5 text-left bg-bg/40"
            >
              <div className="flex items-center justify-between mb-3">
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
              <div className="text-[15px] text-fg font-medium leading-[1.35] mb-5 min-h-[2.5em]">
                {j.title}
              </div>
              <div className="h-[2px] bg-rule overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: j.p }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{
                    duration: 1.1,
                    delay: 0.3 + i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    transformOrigin: "left",
                    background: stateColor[j.state],
                    height: "100%",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      }
    />
  );
}
