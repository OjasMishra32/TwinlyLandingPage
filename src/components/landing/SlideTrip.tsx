import { motion } from "framer-motion";
import { Plane, Hotel, Star, MapPin, ArrowRight } from "lucide-react";
import KeynoteSlide from "./KeynoteSlide";

/**
 * SlideTrip — the phone is the hero of the slide, dead center. iOS
 * 17 / 18 visual language: SF-style bold sans, generous 16/20 spacing,
 * tinted accent buttons, rounded list rows. The flow: header, map
 * card, three list rows, total summary, pinned CTA.
 */

const bookings = [
  {
    Icon: Plane,
    title: "SFO → JFK",
    sub: "Delta · Fri 7:40am · 5h 30m",
    price: "$312",
  },
  {
    Icon: Hotel,
    title: "Made Hotel · NoMad",
    sub: "2 nights · king · breakfast",
    price: "$486",
  },
  {
    Icon: Star,
    title: "Saturday plan",
    sub: "Brunch · MoMA · dinner reso",
    price: "$140",
  },
];

export default function SlideTrip() {
  return (
    <KeynoteSlide
      id="demo-trip"
      eyebrow="Live demo · 04"
      headline={
        <>
          "Get me to{" "}
          <span className="tw-italic text-accent">New York.</span>"
        </>
      }
      body={
        <>
          One sentence in. Forty seconds later: flight, hotel, weekend plan,
          all held. Twinly already knows you don't like layovers, want
          breakfast included, and prefer hotels under 30 minutes from a
          subway stop.
        </>
      }
      align="center"
      spotlight
      visual={
        <div className="flex flex-col items-center w-full">
          {/* Brief quote above */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.85, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10 md:mb-14"
          >
            <div className="f-mono text-[0.54rem] tracking-[0.24em] uppercase text-fg-4 mb-3">
              Brief · 38 seconds ago
            </div>
            <p
              className="text-fg-2 mx-auto"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontSize: "clamp(1.4rem, 2.4vw, 2.1rem)",
                lineHeight: 1.18,
                letterSpacing: "-0.015em",
                maxWidth: "26ch",
              }}
            >
              "Cheapest flight to NYC,
              <br />
              Friday to Sunday. Hotel near a subway."
            </p>
          </motion.div>

          {/* iPhone — centered hero */}
          <motion.div
            initial={{ opacity: 0, y: 80, rotateY: -6 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
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
              {/* Inner screen */}
              <div
                className="relative w-full h-full overflow-hidden"
                style={{
                  borderRadius: "42px",
                  background:
                    "linear-gradient(180deg, hsl(36 10% 6%) 0%, hsl(36 10% 4%) 100%)",
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
                <div className="absolute top-[15px] left-7 z-[6] text-[11px] text-fg font-semibold tabular-nums" style={{ fontFamily: "'Hanken Grotesk', system-ui" }}>
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
                  <span className="text-[9.5px] text-fg font-semibold ml-0.5" style={{ fontFamily: "'Hanken Grotesk', system-ui", letterSpacing: "-0.02em" }}>
                    5G
                  </span>
                  <div className="ml-1.5 relative" style={{ width: "25px", height: "11px" }}>
                    <div className="absolute inset-0 border border-fg/85" style={{ borderRadius: "3px" }} />
                    <div className="absolute left-[1.5px] top-[1.5px] bottom-[1.5px] bg-fg" style={{ width: "18px", borderRadius: "1.5px" }} />
                    <div className="absolute right-[-3px] top-[3px] w-[1.5px] h-[5px] bg-fg/85" />
                  </div>
                </div>

                {/* App content */}
                <div className="relative pt-[58px] px-5 pb-[88px] h-full overflow-hidden">
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="mb-4"
                    style={{ fontFamily: "'Hanken Grotesk', system-ui" }}
                  >
                    <div className="flex items-baseline justify-between mb-1">
                      <div
                        className="text-fg font-bold"
                        style={{ fontSize: "26px", letterSpacing: "-0.03em", lineHeight: 1 }}
                      >
                        New York
                      </div>
                      <div className="text-[11px] text-fg-3 font-semibold tracking-[-0.01em]">
                        Fri · Sun
                      </div>
                    </div>
                    <div className="text-[12.5px] text-fg-3 font-medium tracking-[-0.01em]">
                      Twinly held everything · 938 total
                    </div>
                  </motion.div>

                  {/* Map card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{ duration: 0.85, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden mb-4"
                    style={{
                      height: "112px",
                      borderRadius: "16px",
                      background:
                        "radial-gradient(ellipse at 60% 50%, hsl(36 10% 13%) 0%, hsl(36 10% 6%) 100%)",
                    }}
                  >
                    {/* Topographic accent */}
                    <svg
                      viewBox="0 0 300 200"
                      className="absolute inset-0 w-full h-full"
                      preserveAspectRatio="xMidYMid slice"
                    >
                      {[0, 1, 2, 3].map((i) => (
                        <motion.path
                          key={i}
                          d="M40,80 Q80,40 140,60 T220,90 Q260,130 240,170 T140,180 Q60,160 50,120 T40,80 Z"
                          fill="none"
                          stroke="hsl(var(--accent))"
                          strokeWidth="0.8"
                          strokeOpacity={0.1 + i * 0.05}
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true, margin: "-10%" }}
                          transition={{
                            duration: 1.8,
                            delay: 0.8 + i * 0.12,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          style={{
                            transform: `scale(${1 - i * 0.08})`,
                            transformOrigin: "150px 110px",
                          }}
                        />
                      ))}
                    </svg>
                    {/* Pin */}
                    <motion.div
                      initial={{ opacity: 0, y: -22, scale: 0.5 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{
                        duration: 0.8,
                        delay: 1.2,
                        type: "spring",
                        damping: 12,
                        stiffness: 140,
                      }}
                      className="absolute"
                      style={{ left: "55%", top: "50%", transform: "translate(-50%, -100%)" }}
                    >
                      <MapPin
                        size={20}
                        strokeWidth={2.4}
                        className="text-accent relative z-[2]"
                        style={{
                          filter: "drop-shadow(0 0 10px hsl(var(--accent) / 0.85))",
                          fill: "hsl(var(--accent))",
                        }}
                      />
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0.6 }}
                        animate={{ scale: 2.6, opacity: 0 }}
                        transition={{
                          duration: 2,
                          delay: 1.4,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                        className="absolute inset-0 rounded-full"
                        style={{ background: "hsl(var(--accent) / 0.55)" }}
                      />
                    </motion.div>
                    <div className="absolute bottom-2 left-3 text-[9px] text-fg-3 font-semibold" style={{ fontFamily: "'Hanken Grotesk', system-ui" }}>
                      Manhattan
                    </div>
                  </motion.div>

                  {/* Booking list rows */}
                  <div className="space-y-2.5">
                    {bookings.map((b, i) => (
                      <motion.div
                        key={b.title}
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-8%" }}
                        transition={{
                          duration: 0.7,
                          delay: 1.4 + i * 0.16,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex items-center gap-3 px-3.5 py-3"
                        style={{
                          background:
                            "linear-gradient(180deg, hsl(36 10% 11%) 0%, hsl(36 10% 8%) 100%)",
                          borderRadius: "14px",
                          border: "0.5px solid hsl(var(--rule-hi) / 0.6)",
                        }}
                      >
                        <div
                          className="w-9 h-9 flex items-center justify-center shrink-0"
                          style={{
                            background:
                              "linear-gradient(135deg, hsl(var(--accent) / 0.18) 0%, hsl(var(--accent) / 0.04) 100%)",
                            borderRadius: "10px",
                          }}
                        >
                          <b.Icon size={15} strokeWidth={2.2} className="text-accent" />
                        </div>
                        <div className="flex-1 min-w-0" style={{ fontFamily: "'Hanken Grotesk', system-ui" }}>
                          <div className="flex items-baseline justify-between gap-2">
                            <div className="text-[12.5px] text-fg font-semibold tracking-[-0.01em] truncate">
                              {b.title}
                            </div>
                            <div className="text-[12px] text-fg font-bold tabular-nums tracking-[-0.01em] shrink-0">
                              {b.price}
                            </div>
                          </div>
                          <div className="text-[10.5px] text-fg-3 font-medium tracking-[-0.005em] truncate">
                            {b.sub}
                          </div>
                        </div>
                        <ArrowRight size={11} strokeWidth={2.5} className="text-fg-4 shrink-0" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bottom safe area + CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.85, delay: 2.1 }}
                  className="absolute bottom-0 left-0 right-0 px-5 pt-3 pb-7"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 0%, hsl(36 10% 4%) 35%)",
                  }}
                >
                  <button
                    type="button"
                    className="w-full py-3.5 bg-accent text-bg font-bold tracking-[-0.01em]"
                    style={{
                      fontFamily: "'Hanken Grotesk', system-ui",
                      fontSize: "14px",
                      borderRadius: "14px",
                      boxShadow:
                        "0 0 0 0.5px hsl(var(--accent) / 0.4), 0 18px 36px -12px hsl(var(--accent) / 0.65)",
                    }}
                  >
                    Approve · book all 3
                  </button>
                  {/* Home indicator */}
                  <div
                    className="mx-auto mt-4 rounded-full"
                    style={{ width: "108px", height: "5px", background: "hsl(var(--fg) / 0.4)" }}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Metrics row underneath */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 mt-12 md:mt-16 max-w-[760px]"
          >
            {[
              { k: "Research", v: "38 sec" },
              { k: "Tabs opened", v: "0" },
              { k: "Held now", v: "3" },
              { k: "Total", v: "$938" },
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
                    fontSize: "clamp(1.5rem, 2.2vw, 2rem)",
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
