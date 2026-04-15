import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import KeynoteSlide from "./KeynoteSlide";
import { Check, Arrow } from "./icons";

/**
 * SlideApproval — cinematic approval-interface mockup with a 3D mouse
 * tilt. Real product-window chrome, avatar + metadata, styled draft,
 * rich stat grid, primary button with lime glow + keyboard shortcut.
 */
export default function SlideApproval() {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 130, damping: 18 });
  const smy = useSpring(my, { stiffness: 130, damping: 18 });
  const rotateX = useTransform(smy, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smx, [-0.5, 0.5], [-9, 9]);

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
          ships, nothing spends, nothing sends, until you've set the policy
          or tapped approve.
        </>
      }
      align="center"
      spotlight
      visual={
        <div
          ref={cardRef}
          className="max-w-[880px] mx-auto"
          style={{ perspective: "1800px" }}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative"
          >
            {/* Soft outer halo */}
            <div
              aria-hidden
              className="absolute -inset-16 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 55% at 50% 50%, hsl(var(--accent) / 0.14) 0%, transparent 65%)",
                filter: "blur(40px)",
                zIndex: -1,
              }}
            />

            {/* Window card */}
            <div
              className="relative overflow-hidden border border-rule-hi/80"
              style={{
                background:
                  "linear-gradient(180deg, hsl(var(--bg-2) / 0.95) 0%, hsl(var(--bg) / 0.85) 100%)",
                boxShadow:
                  "0 80px 200px -40px rgba(0,0,0,0.85), 0 0 0 1px hsl(var(--accent) / 0.12), inset 0 1px 0 hsl(var(--fg) / 0.04)",
                backdropFilter: "blur(14px)",
              }}
            >
              {/* macOS-style chrome */}
              <div
                className="flex items-center gap-3 px-5 py-3.5 border-b border-rule/80"
                style={{ background: "hsl(var(--bg-3) / 0.7)" }}
              >
                <div className="flex gap-1.5">
                  <span className="w-[11px] h-[11px] rounded-full bg-ember/70" />
                  <span className="w-[11px] h-[11px] rounded-full bg-fg-4" />
                  <span className="w-[11px] h-[11px] rounded-full bg-accent/70" />
                </div>
                <div className="flex-1 text-center f-mono text-[0.56rem] tracking-[0.22em] uppercase text-fg-3">
                  twinly · approval
                </div>
                <div className="f-mono text-[0.52rem] tracking-[0.16em] uppercase text-fg-4 tabular-nums">
                  14:02:11
                </div>
              </div>

              {/* Body */}
              <div
                className="p-7 md:p-9"
                style={{ transform: "translateZ(40px)" }}
              >
                {/* Status row */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex items-center gap-2 px-2.5 py-1 border border-ember/50 bg-ember/[0.06]">
                    <span
                      className="w-[6px] h-[6px] rounded-full bg-ember"
                      style={{
                        animation: "approval-blink 1.6s ease-in-out infinite",
                        boxShadow: "0 0 10px hsl(var(--ember) / 0.7)",
                      }}
                    />
                    <span className="f-mono text-[0.52rem] font-semibold tracking-[0.22em] uppercase text-ember">
                      Awaiting approval
                    </span>
                  </span>
                  <span className="f-mono text-[0.5rem] tracking-[0.2em] uppercase text-fg-4">
                    Rent counter · lease renewal
                  </span>
                </div>

                {/* Avatar + metadata */}
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="w-11 h-11 flex items-center justify-center shrink-0 border border-accent/50"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(var(--accent) / 0.14) 0%, hsl(var(--accent) / 0.04) 100%)",
                    }}
                  >
                    <span className="f-mono text-[0.64rem] font-semibold tracking-[0.1em] text-accent">
                      TW
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <span className="text-[13.5px] text-fg font-medium">
                        Your twin
                      </span>
                      <span className="f-mono text-[0.5rem] tracking-[0.14em] uppercase text-fg-4">
                        drafted · 2 min ago
                      </span>
                    </div>
                    <div className="text-[11.5px] text-fg-3 f-mono tracking-[0.04em]">
                      to: greenwood-property-mgmt@...
                    </div>
                  </div>
                </div>

                {/* The draft */}
                <div
                  className="mb-7 p-5 border-l-2 border-accent/50"
                  style={{ background: "hsl(var(--bg) / 0.5)" }}
                >
                  <div className="f-mono text-[0.48rem] tracking-[0.22em] uppercase text-fg-4 mb-3">
                    Draft · in your voice
                  </div>
                  <p
                    className="text-fg-2"
                    style={{
                      fontSize: "14.5px",
                      lineHeight: 1.6,
                    }}
                  >
                    "Based on 18 comparable units on your block running at{" "}
                    <b className="text-fg font-medium">$3,020 avg</b>, plus
                    the 6 unresolved maintenance tickets since 2024, we're
                    countering your 12% hike at{" "}
                    <b className="text-accent font-medium">$3,200 / mo</b>,
                    $200 below our current rate."
                  </p>
                </div>

                {/* Stats strip */}
                <div className="grid grid-cols-3 gap-4 mb-8 py-5 border-y border-rule">
                  {[
                    { k: "Comps pulled", v: "18", sub: "on your block" },
                    { k: "Tickets cited", v: "6", sub: "unresolved" },
                    { k: "Annual save", v: "$7,200", sub: "if landlord signs" },
                  ].map((s, i) => (
                    <motion.div
                      key={s.k}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-8%" }}
                      transition={{
                        duration: 0.7,
                        delay: 0.5 + i * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <div className="f-mono text-[0.48rem] tracking-[0.2em] uppercase text-fg-4 mb-1.5">
                        {s.k}
                      </div>
                      <div
                        className="text-fg mb-1"
                        style={{
                          fontFamily: "'Fraunces', serif",
                          fontVariationSettings: "'SOFT' 40",
                          fontSize: "1.7rem",
                          letterSpacing: "-0.028em",
                          lineHeight: 1,
                        }}
                      >
                        {s.v}
                      </div>
                      <div className="f-mono text-[0.48rem] tracking-[0.1em] text-fg-4">
                        {s.sub}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Action row */}
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <button
                    type="button"
                    className="group relative flex items-center gap-2.5 px-5 py-3 bg-accent text-bg f-mono text-[0.58rem] font-semibold tracking-[0.18em] uppercase"
                    style={{
                      boxShadow:
                        "0 0 0 1px hsl(var(--accent) / 0.2), 0 20px 60px -20px hsl(var(--accent) / 0.65)",
                    }}
                  >
                    <Check size={14} strokeWidth={2.5} />
                    Approve &amp; send
                    <span className="ml-2 f-mono opacity-70 tabular-nums" style={{ fontSize: "0.62rem" }}>
                      ⌘↵
                    </span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-3 border border-rule-hi text-fg-2 f-mono text-[0.56rem] font-medium tracking-[0.16em] uppercase hover:text-fg hover:border-fg-3 transition-colors"
                  >
                    Edit draft
                  </button>
                  <span className="ml-auto flex items-center gap-1.5 f-mono text-[0.5rem] tracking-[0.16em] uppercase text-fg-4">
                    Hold
                    <Arrow size={9} strokeWidth={2} />
                    Discard
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      }
    />
  );
}
