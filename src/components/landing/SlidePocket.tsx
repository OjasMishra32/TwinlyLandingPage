import { motion } from "framer-motion";
import { Plane, Check } from "lucide-react";
import KeynoteSlide from "./KeynoteSlide";

/**
 * SlidePocket — "just text it". A big iPhone mockup with a full
 * iMessage-style Twinly thread. Messages stagger in, a live working
 * indicator pulses, a rich action card appears mid-conversation,
 * the approval lands, and Twinly replies with a surprise insight.
 * Full device chrome: titanium bezel, Dynamic Island, status bar.
 */

type BubbleProps = {
  side: "me" | "twin";
  delay: number;
  children: React.ReactNode;
  tiny?: boolean;
};

function Bubble({ side, delay, children, tiny }: BubbleProps) {
  const isMe = side === "me";
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{
        duration: 0.55,
        delay,
        type: "spring",
        damping: 22,
        stiffness: 220,
        mass: 0.7,
      }}
      className={`flex ${isMe ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[78%] px-3 py-2 ${tiny ? "text-[10px]" : "text-[11.5px]"} leading-[1.4] ${
          isMe ? "text-bg" : "text-fg"
        }`}
        style={{
          background: isMe
            ? "hsl(var(--accent))"
            : "hsl(36 10% 14%)",
          borderRadius: isMe
            ? "16px 16px 4px 16px"
            : "16px 16px 16px 4px",
          boxShadow: isMe
            ? "0 10px 24px -14px hsl(var(--accent) / 0.6)"
            : "0 10px 24px -16px rgba(0,0,0,0.6)",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

function TypingDots({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.4, delay }}
      className="flex justify-start"
    >
      <div
        className="flex items-center gap-1 px-3 py-2.5"
        style={{
          background: "hsl(36 10% 14%)",
          borderRadius: "16px 16px 16px 4px",
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block w-[4px] h-[4px] rounded-full bg-fg-3"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function FlightCard({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{
        duration: 0.7,
        delay,
        type: "spring",
        damping: 18,
        stiffness: 180,
      }}
      className="flex justify-start"
    >
      <div
        className="relative w-[82%] overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(36 10% 15%) 0%, hsl(36 10% 10%) 100%)",
          borderRadius: "16px 16px 16px 4px",
          border: "1px solid hsl(var(--accent) / 0.4)",
          boxShadow: "0 20px 40px -20px hsl(var(--accent) / 0.35)",
        }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent" />
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-6 h-6 flex items-center justify-center border border-accent/40"
              style={{
                background: "hsl(var(--accent) / 0.1)",
                borderRadius: "6px",
              }}
            >
              <Plane size={11} strokeWidth={2} className="text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10.5px] text-fg font-semibold leading-tight">
                SFO → NRT
              </div>
              <div className="f-mono text-[7.5px] tracking-[0.08em] text-fg-4 uppercase">
                JAL 002 · window · 11h 40m
              </div>
            </div>
            <div
              className="tabular-nums text-accent"
              style={{
                fontFamily: "'Fraunces', serif",
                fontVariationSettings: "'SOFT' 40",
                fontSize: "15px",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              $712
            </div>
          </div>
          <div className="f-mono text-[7.5px] tracking-[0.08em] text-fg-3 uppercase mb-2.5">
            Fri · dep 11:30pm · held 20m
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-accent text-bg f-mono text-[8px] font-semibold tracking-[0.14em] uppercase"
              style={{ borderRadius: "6px" }}
            >
              <Check size={9} strokeWidth={3} />
              Approve
            </button>
            <button
              type="button"
              className="px-2.5 py-1.5 border border-rule text-fg-3 f-mono text-[8px] font-medium tracking-[0.12em] uppercase"
              style={{ borderRadius: "6px" }}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SlidePocket() {
  return (
    <KeynoteSlide
      id="pocket"
      eyebrow="Capability 04 · In your pocket"
      headline={
        <>
          Just{" "}
          <span className="tw-italic text-accent">text it.</span>
        </>
      }
      body={
        <>
          Twinly lives in iMessage. Text a request, watch it work, tap to
          approve. It remembers every exchange, every preference, every
          detail you've ever shared.
        </>
      }
      align="center"
      spotlight
      visual={
        <div className="max-w-[1180px] mx-auto">
          <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-center">
            {/* Left: prompt context */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.95, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start text-left order-2 md:order-1"
            >
              <div className="f-mono text-[0.54rem] tracking-[0.24em] uppercase text-fg-4 mb-5">
                Thread · Twinly
              </div>
              <h4
                className="text-fg mb-7"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontVariationSettings: "'SOFT' 40, 'WONK' 0",
                  fontSize: "clamp(1.65rem, 2.6vw, 2.4rem)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.08,
                }}
              >
                "Book me a one-way
                <br />
                to Tokyo for Friday
                <br />
                under $800."
              </h4>
              <div className="h-px w-14 bg-accent/60 my-4" />
              <div className="space-y-5 w-full max-w-[380px]">
                {[
                  { k: "Average reply", v: "47 seconds" },
                  { k: "Context retained", v: "Forever" },
                  { k: "Works over", v: "iMessage · SMS · Web" },
                ].map((m, i) => (
                  <motion.div
                    key={m.k}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{ duration: 0.7, delay: 0.3 + i * 0.08 }}
                    className="flex items-baseline justify-between gap-6 py-3 border-b border-rule/60"
                  >
                    <div className="f-mono text-[0.54rem] tracking-[0.22em] uppercase text-fg-4">
                      {m.k}
                    </div>
                    <div
                      className="text-fg"
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontVariationSettings: "'SOFT' 40",
                        fontSize: "1.1rem",
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                      }}
                    >
                      {m.v}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: iPhone mockup with chat */}
            <motion.div
              initial={{ opacity: 0, y: 60, rotateY: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 md:order-2 mx-auto"
              style={{ perspective: "2000px", transformStyle: "preserve-3d" }}
            >
              <div
                className="relative"
                style={{
                  width: "min(86vw, 340px)",
                  aspectRatio: "9 / 19.5",
                  borderRadius: "48px",
                  padding: "12px",
                  background:
                    "linear-gradient(145deg, #2a2a2f 0%, #0c0c0e 50%, #1a1a1e 100%)",
                  boxShadow:
                    "0 0 0 1.5px hsl(var(--rule-hi) / 0.5), 0 90px 200px -40px rgba(0,0,0,0.95), 0 0 100px -30px hsl(var(--accent) / 0.22)",
                }}
              >
                <div
                  className="relative w-full h-full overflow-hidden"
                  style={{
                    borderRadius: "36px",
                    background:
                      "linear-gradient(180deg, hsl(36 10% 5%) 0%, hsl(36 10% 8%) 100%)",
                  }}
                >
                  {/* Dynamic Island */}
                  <div
                    className="absolute top-2 left-1/2 -translate-x-1/2 z-[10]"
                    style={{
                      width: "96px",
                      height: "28px",
                      borderRadius: "999px",
                      background: "#000",
                    }}
                  />

                  {/* Status bar */}
                  <div className="absolute top-[14px] left-6 z-[6] text-[10px] text-fg f-sans font-semibold tabular-nums">
                    9:41
                  </div>
                  <div className="absolute top-[14px] right-6 z-[6] flex items-center gap-1">
                    <div className="flex items-end gap-[1px]">
                      {[2, 3, 4, 5].map((h) => (
                        <span
                          key={h}
                          className="bg-fg"
                          style={{ width: "3px", height: `${h}px` }}
                        />
                      ))}
                    </div>
                    <span
                      className="text-[9px] text-fg f-sans font-semibold ml-0.5"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      5G
                    </span>
                    <div
                      className="ml-1 border border-fg/80 relative"
                      style={{
                        width: "22px",
                        height: "10px",
                        borderRadius: "3px",
                      }}
                    >
                      <div
                        className="absolute left-[1px] top-[1px] bottom-[1px] bg-fg"
                        style={{ width: "16px", borderRadius: "2px" }}
                      />
                      <div
                        className="absolute right-[-3px] top-[3px] w-[1.5px] h-[4px] bg-fg/80"
                      />
                    </div>
                  </div>

                  {/* Conversation header */}
                  <div className="relative z-[2] pt-[50px] pb-3 px-5 border-b border-rule/40 flex items-center gap-3">
                    <div
                      className="w-9 h-9 flex items-center justify-center shrink-0"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(var(--accent) / 0.2) 0%, hsl(var(--accent) / 0.04) 100%)",
                        border: "1px solid hsl(var(--accent) / 0.4)",
                        borderRadius: "10px",
                      }}
                    >
                      <svg viewBox="0 0 34 34" className="w-5 h-5">
                        <rect
                          x="6"
                          y="6"
                          width="16"
                          height="16"
                          fill="none"
                          stroke="hsl(var(--accent))"
                          strokeWidth="1.6"
                        />
                        <rect
                          x="12"
                          y="12"
                          width="16"
                          height="16"
                          fill="none"
                          stroke="hsl(var(--accent))"
                          strokeWidth="1.6"
                        />
                        <rect
                          x="12"
                          y="12"
                          width="10"
                          height="10"
                          fill="hsl(var(--accent))"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-fg font-semibold"
                        style={{
                          fontFamily: "'Fraunces', serif",
                          fontSize: "14px",
                          letterSpacing: "-0.015em",
                          lineHeight: 1,
                        }}
                      >
                        Twinly
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className="w-[5px] h-[5px] rounded-full bg-accent"
                          style={{
                            boxShadow: "0 0 6px hsl(var(--accent) / 0.7)",
                          }}
                        />
                        <span className="f-mono text-[8px] tracking-[0.1em] uppercase text-fg-3">
                          Online · in your voice
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Chat body */}
                  <div
                    className="absolute top-[104px] bottom-[68px] left-0 right-0 overflow-hidden"
                  >
                    <div className="flex flex-col gap-2 px-4 pt-3">
                      <Bubble side="me" delay={0.15}>
                        Book me a one-way to Tokyo Friday under $800
                      </Bubble>
                      <Bubble side="twin" delay={0.55} tiny>
                        Scanning 47 flights
                      </Bubble>
                      <TypingDots delay={0.9} />
                      <FlightCard delay={1.4} />
                      <Bubble side="me" delay={2.2}>
                        Book it
                      </Bubble>
                      <Bubble side="twin" delay={2.6}>
                        Booked. Confirmation just landed in your inbox.
                      </Bubble>
                      <Bubble side="twin" delay={3.0}>
                        Heads up — your passport expires in 9 months. Want me
                        to start the renewal now?
                      </Bubble>
                    </div>
                  </div>

                  {/* iMessage input bar */}
                  <div className="absolute bottom-0 left-0 right-0 pt-2 pb-6 px-4 border-t border-rule/40 bg-bg/50 backdrop-blur-sm">
                    <div
                      className="flex items-center gap-2 px-3 py-2 border border-rule/60"
                      style={{
                        background: "hsl(36 10% 11%)",
                        borderRadius: "999px",
                      }}
                    >
                      <div className="flex-1 text-[10px] text-fg-4">
                        iMessage
                      </div>
                      <div
                        className="w-6 h-6 flex items-center justify-center"
                        style={{
                          background: "hsl(var(--accent))",
                          borderRadius: "999px",
                        }}
                      >
                        <svg
                          viewBox="0 0 16 16"
                          className="w-3 h-3"
                          fill="none"
                          stroke="hsl(var(--bg))"
                          strokeWidth="2.5"
                        >
                          <path d="M8 13V3 M3 8l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                    <div
                      className="mx-auto mt-2 w-[96px] h-[4px] rounded-full"
                      style={{ background: "hsl(var(--fg) / 0.3)" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      }
    />
  );
}
