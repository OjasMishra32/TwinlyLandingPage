import { motion } from "framer-motion";
import KeynoteSlide from "./KeynoteSlide";
import { Check } from "./icons";

/**
 * SlidePocket — "just text it". The phone is the hero, dead center.
 * A full conversation plays out inside the native Twinly iOS app:
 * user sends a request, twin scans flights, a rich flight card
 * animates in, a cursor taps Approve, twin confirms, then surfaces
 * a surprise insight about the user's passport. Metrics row sits
 * directly below the phone. No floating side columns, no gaps.
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
      initial={{ opacity: 0, y: 16, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{
        duration: 0.5,
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
          background: isMe ? "hsl(var(--accent))" : "hsl(36 10% 14%)",
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
      initial={{ opacity: 0, y: 22, scale: 0.94 }}
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
        className="relative w-[84%] overflow-hidden"
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
              className="w-6 h-6 flex items-center justify-center border border-accent/40 text-accent f-mono"
              style={{
                background: "hsl(var(--accent) / 0.1)",
                borderRadius: "6px",
                fontSize: "7px",
                fontWeight: 600,
                letterSpacing: "0.08em",
              }}
            >
              FLT
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
          <div className="relative flex items-center gap-1.5">
            {/* Approve button (stays visible but gets pulsed / "pressed" by cursor) */}
            <motion.button
              type="button"
              initial={{ scale: 1 }}
              whileInView={{ scale: [1, 0.94, 1] }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{
                duration: 0.4,
                delay: delay + 2.1,
                times: [0, 0.5, 1],
              }}
              className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-accent text-bg f-mono text-[8px] font-semibold tracking-[0.14em] uppercase"
              style={{
                borderRadius: "6px",
                boxShadow: "0 0 0 0 hsl(var(--accent) / 0.6)",
              }}
            >
              <Check size={9} strokeWidth={3} />
              Approve
            </motion.button>
            <button
              type="button"
              className="px-2.5 py-1.5 border border-rule text-fg-3 f-mono text-[8px] font-medium tracking-[0.12em] uppercase"
              style={{ borderRadius: "6px" }}
            >
              Edit
            </button>

            {/* Cursor/finger tap indicator flying in to click Approve */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0, x: 70, y: -40 }}
              whileInView={{
                opacity: [0, 1, 1, 1, 0],
                x: [70, 40, 10, -6, -6],
                y: [-40, -20, -4, 4, 4],
                scale: [1, 1, 1, 0.8, 0.8],
              }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{
                duration: 1.9,
                delay: delay + 0.7,
                times: [0, 0.3, 0.65, 0.9, 1],
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute left-[22%] top-[6px] z-[5]"
            >
              <svg width="14" height="17" viewBox="0 0 18 22" fill="none">
                <path
                  d="M2 2 L2 18 L6 14 L9 20 L11 19 L8 13 L14 13 Z"
                  fill="hsl(var(--fg))"
                  stroke="hsl(var(--bg))"
                  strokeWidth="1"
                  strokeLinejoin="miter"
                />
              </svg>
            </motion.div>
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
          Download the native Twinly app from the App Store. One-tap install,
          ready in 60 seconds. Text a request, watch it work, tap to approve.
          No browser extension, no agent window. Just you texting.
        </>
      }
      align="center"
      spotlight
      visual={
        <div className="w-full flex flex-col items-center">
          {/* Context strip above the phone */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-8 md:mb-10 f-mono text-[0.54rem] tracking-[0.24em] uppercase text-fg-3"
          >
            <span className="h-px w-8 bg-accent/60" />
            Thread · Twinly · just now
            <span className="h-px w-8 bg-accent/60" />
          </motion.div>

          {/* iPhone — centered hero */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotateY: -6 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: "2400px", transformStyle: "preserve-3d" }}
          >
            <div
              className="relative"
              style={{
                width: "min(86vw, 360px)",
                aspectRatio: "9 / 19.5",
                borderRadius: "54px",
                padding: "13px",
                background:
                  "linear-gradient(150deg, #2d2d33 0%, #0e0e10 45%, #1a1a1e 100%)",
                boxShadow:
                  "0 0 0 1px hsl(var(--rule-hi) / 0.6), inset 0 0 0 1px hsl(var(--fg) / 0.05), 0 100px 220px -50px rgba(0,0,0,0.95), 0 0 120px -30px hsl(var(--accent) / 0.22)",
              }}
            >
              <div
                className="relative w-full h-full overflow-hidden"
                style={{
                  borderRadius: "42px",
                  background:
                    "linear-gradient(180deg, hsl(36 10% 5%) 0%, hsl(36 10% 8%) 100%)",
                }}
              >
                {/* Dynamic Island */}
                <div
                  className="absolute top-2 left-1/2 -translate-x-1/2 z-[10]"
                  style={{
                    width: "104px",
                    height: "30px",
                    borderRadius: "999px",
                    background: "#000",
                  }}
                />

                {/* Status bar */}
                <div
                  className="absolute top-[15px] left-7 z-[6] text-[11px] text-fg font-semibold tabular-nums"
                  style={{ fontFamily: "'Hanken Grotesk', system-ui" }}
                >
                  9:41
                </div>
                <div className="absolute top-[16px] right-7 z-[6] flex items-center gap-1.5">
                  <div className="flex items-end gap-[2px]">
                    {[3, 5, 7, 9].map((h) => (
                      <span
                        key={h}
                        className="bg-fg"
                        style={{ width: "3.5px", height: `${h}px`, borderRadius: "0.5px" }}
                      />
                    ))}
                  </div>
                  <span
                    className="text-[9.5px] text-fg font-semibold ml-0.5"
                    style={{ fontFamily: "'Hanken Grotesk', system-ui", letterSpacing: "-0.02em" }}
                  >
                    5G
                  </span>
                  <div className="ml-1.5 relative" style={{ width: "25px", height: "11px" }}>
                    <div className="absolute inset-0 border border-fg/85" style={{ borderRadius: "3px" }} />
                    <div className="absolute left-[1.5px] top-[1.5px] bottom-[1.5px] bg-fg" style={{ width: "18px", borderRadius: "1.5px" }} />
                    <div className="absolute right-[-3px] top-[3px] w-[1.5px] h-[5px] bg-fg/85" />
                  </div>
                </div>

                {/* Conversation header */}
                <div className="relative z-[2] pt-[52px] pb-3 px-5 border-b border-rule/40 flex items-center gap-3">
                  <div
                    className="w-9 h-9 flex items-center justify-center shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(var(--accent) / 0.22) 0%, hsl(var(--accent) / 0.04) 100%)",
                      border: "1px solid hsl(var(--accent) / 0.4)",
                      borderRadius: "10px",
                    }}
                  >
                    <svg viewBox="0 0 34 34" className="w-5 h-5">
                      <rect x="6" y="6" width="16" height="16" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.6" />
                      <rect x="12" y="12" width="16" height="16" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.6" />
                      <rect x="12" y="12" width="10" height="10" fill="hsl(var(--accent))" />
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
                        style={{ boxShadow: "0 0 6px hsl(var(--accent) / 0.7)" }}
                      />
                      <span className="f-mono text-[8px] tracking-[0.1em] uppercase text-fg-3">
                        Online · in your voice
                      </span>
                    </div>
                  </div>
                </div>

                {/* Chat body */}
                <div className="absolute top-[108px] bottom-[68px] left-0 right-0 overflow-hidden">
                  <div className="flex flex-col gap-2 px-4 pt-3">
                    <Bubble side="me" delay={0.35}>
                      Book me a one-way to Tokyo Friday under $800
                    </Bubble>
                    <Bubble side="twin" delay={0.75} tiny>
                      Scanning 47 flights
                    </Bubble>
                    <TypingDots delay={1.05} />
                    <FlightCard delay={1.55} />
                    <Bubble side="twin" delay={4.0}>
                      Booked. Confirmation just landed in your inbox.
                    </Bubble>
                    <Bubble side="twin" delay={4.5}>
                      Heads up, your passport expires in 9 months. Want me to
                      start the renewal now?
                    </Bubble>
                  </div>
                </div>

                {/* Input bar — native Twinly app */}
                <div className="absolute bottom-0 left-0 right-0 pt-2 pb-6 px-4 border-t border-rule/40 bg-bg/50 backdrop-blur-sm">
                  <div
                    className="flex items-center gap-2 px-3 py-2 border border-rule/60"
                    style={{
                      background: "hsl(36 10% 11%)",
                      borderRadius: "999px",
                    }}
                  >
                    <div className="flex-1 text-[10px] text-fg-4">
                      Message Twinly
                    </div>
                    <div
                      className="w-6 h-6 flex items-center justify-center"
                      style={{
                        background: "hsl(var(--accent))",
                        borderRadius: "999px",
                      }}
                    >
                      <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="hsl(var(--bg))" strokeWidth="2.5">
                        <path d="M8 13V3 M3 8l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div
                    className="mx-auto mt-2 rounded-full"
                    style={{ width: "108px", height: "5px", background: "hsl(var(--fg) / 0.35)" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Metrics row directly under the phone */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-3 gap-6 sm:gap-12 md:gap-16 mt-12 md:mt-16 max-w-[780px]"
          >
            {[
              { k: "Average reply", v: "47 sec" },
              { k: "Context retained", v: "Forever" },
              { k: "Runs on", v: "iOS native" },
            ].map((m) => (
              <div key={m.k} className="text-center">
                <div className="f-mono text-[0.5rem] tracking-[0.22em] uppercase text-fg-4 mb-1.5">
                  {m.k}
                </div>
                <div
                  className="text-fg"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontVariationSettings: "'SOFT' 40, 'WONK' 0",
                    fontSize: "clamp(1.45rem, 2.1vw, 1.95rem)",
                    letterSpacing: "-0.028em",
                    lineHeight: 1,
                  }}
                >
                  {m.v}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      }
    />
  );
}
