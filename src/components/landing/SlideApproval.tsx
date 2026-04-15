import { motion } from "framer-motion";
import KeynoteSlide from "./KeynoteSlide";

/** "Approval-first" slide — single approval card with gate + action */
export default function SlideApproval() {
  return (
    <KeynoteSlide
      id="approval"
      eyebrow="Capability 03 · Control"
      headline={
        <>
          Waits for your{" "}
          <span className="tw-italic text-accent">nod.</span>
        </>
      }
      body={
        <>
          You decide what runs free and what always waits at a gate. Nothing
          ships, nothing spends, nothing sends — until you've set the policy or
          tapped approve.
        </>
      }
      align="center"
      visual={
        <div className="max-w-[760px] mx-auto text-left">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative border border-accent/40 bg-bg/50"
            style={{
              boxShadow: "0 40px 100px -40px hsl(var(--accent) / 0.2)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-rule f-mono text-[0.58rem] font-medium tracking-[0.18em] uppercase text-fg-3">
              <span className="flex items-center gap-2.5 text-accent">
                <span className="live-dot" />
                Approval gate · Rent counter
              </span>
              <span className="text-fg-4">14:02:11</span>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8">
              <div className="f-mono text-[0.54rem] font-medium tracking-[0.18em] uppercase text-fg-4 mb-3">
                Draft · outbound letter
              </div>
              <p
                className="text-fg-2 mb-6"
                style={{
                  fontSize: "15.5px",
                  lineHeight: 1.6,
                }}
              >
                "Based on 18 comparable units on your block running at $3,020
                avg, and the 6 unresolved maintenance tickets since 2024, we're
                countering at <b className="text-fg font-medium">$3,200/mo</b> —
                $200 below your current rate."
              </p>

              <div className="grid grid-cols-3 gap-3 py-4 border-y border-rule mb-6">
                {[
                  { k: "Comps pulled", v: "18" },
                  { k: "Tickets cited", v: "6" },
                  { k: "Est. annual save", v: "$7,200" },
                ].map((s) => (
                  <div key={s.k}>
                    <div className="f-mono text-[0.48rem] tracking-[0.2em] uppercase text-fg-4 mb-1">
                      {s.k}
                    </div>
                    <div
                      className="text-fg"
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontVariationSettings: "'SOFT' 40",
                        fontSize: "1.55rem",
                        letterSpacing: "-0.025em",
                        lineHeight: 1,
                      }}
                    >
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="btn primary !py-3 !px-5 !text-[0.62rem]"
                  type="button"
                >
                  Approve &amp; send
                  <span className="arrow" />
                </button>
                <button className="btn !py-3 !px-4 !text-[0.62rem]" type="button">
                  Edit
                </button>
                <span className="ml-auto f-mono text-[0.56rem] tracking-[0.16em] uppercase text-fg-4">
                  ⌘↵
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      }
    />
  );
}
