import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import KeynoteSlide from "./KeynoteSlide";

/**
 * SlideApproval, single approval-card mock with a 3D mouse-follow
 * tilt on the card itself. Pivots on pointer position like a Keynote
 * product reveal.
 */
export default function SlideApproval() {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 120, damping: 18 });
  const smy = useSpring(my, { stiffness: 120, damping: 18 });
  const rotateX = useTransform(smy, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smx, [-0.5, 0.5], [-12, 12]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

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
          ships, nothing spends, nothing sends, until you've set the policy or
          tapped approve.
        </>
      }
      align="center"
      spotlight
      visual={
        <div
          ref={cardRef}
          className="max-w-[820px] mx-auto text-left"
          style={{ perspective: "1600px" }}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative border border-accent/40 bg-bg/65 backdrop-blur-xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Spotlight behind the card */}
            <div
              aria-hidden
              className="absolute -inset-[30%] pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 55% at 50% 50%, hsl(var(--accent) / 0.14) 0%, transparent 60%)",
                filter: "blur(30px)",
                zIndex: -1,
              }}
            />

            {/* Chrome header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-rule f-mono text-[0.58rem] font-medium tracking-[0.18em] uppercase text-fg-3">
              <span className="flex items-center gap-2.5 text-accent">
                <span className="live-dot" />
                Approval gate · Rent counter
              </span>
              <span className="text-fg-4 tabular-nums">14:02:11</span>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8" style={{ transform: "translateZ(40px)" }}>
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
                countering at{" "}
                <b className="text-fg font-medium">$3,200/mo</b>, $200 below
                your current rate."
              </p>

              <div className="grid grid-cols-3 gap-3 py-4 border-y border-rule mb-6">
                {[
                  { k: "Comps pulled", v: "18" },
                  { k: "Tickets cited", v: "6" },
                  { k: "Est. annual save", v: "$7,200" },
                ].map((s, i) => (
                  <motion.div
                    key={s.k}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{
                      duration: 0.7,
                      delay: 0.4 + i * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
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
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
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
              </motion.div>
            </div>
          </motion.div>
        </div>
      }
    />
  );
}
