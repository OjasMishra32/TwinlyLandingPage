import { motion } from "framer-motion";
import { Plane, Hotel, Train, Utensils, MapPin } from "lucide-react";
import KeynoteSlide from "./KeynoteSlide";

/**
 * SlideTrip — iPhone-style mockup with flying trip cards. A vertical
 * device frame with a stylized Tokyo map and 4 booking cards that
 * stagger-fly up from the bottom like a real iOS app animation.
 */

const bookings = [
  {
    Icon: Plane,
    title: "SFO → NRT",
    meta: "JAL 002 · window seat",
    price: "$1,240",
  },
  {
    Icon: Hotel,
    title: "Park Hyatt Shinjuku",
    meta: "8 nights · suite upgrade",
    price: "$1,820",
  },
  {
    Icon: Train,
    title: "JR Pass · 8 days",
    meta: "Kyoto + Hakone",
    price: "$412",
  },
  {
    Icon: Utensils,
    title: "Ghibli jazz kissaten",
    meta: "4 reservations",
    price: "$375",
  },
];

export default function SlideTrip() {
  return (
    <KeynoteSlide
      id="demo-trip"
      eyebrow="Live demo · 04"
      headline={
        <>
          "Plan{" "}
          <span className="tw-italic text-accent">Tokyo.</span>"
        </>
      }
      body={
        <>
          Eight days, two travelers, a budget, and a Ghibli fan. Forty minutes
          later: flights, hotel, rail pass, dinners. One tap from booked.
        </>
      }
      align="center"
      spotlight
      visual={
        <div className="max-w-[1180px] mx-auto">
          <div className="grid md:grid-cols-[1.15fr_auto] gap-10 md:gap-16 items-center">
            {/* Left: brief + metrics */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.95, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start text-left order-2 md:order-1"
            >
              <div className="f-mono text-[0.54rem] tracking-[0.22em] uppercase text-fg-4 mb-5">
                Brief · 38 min ago
              </div>
              <h4
                className="text-fg mb-6"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontVariationSettings: "'SOFT' 30, 'WONK' 0",
                  fontSize: "clamp(1.65rem, 2.6vw, 2.4rem)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.08,
                }}
              >
                "8 days in Tokyo,
                <br />
                mid-March, window seats,
                <br />
                a Ghibli fan, $4k."
              </h4>
              <div className="h-px w-14 bg-accent/60 my-5" />
              <div className="grid grid-cols-2 gap-x-10 gap-y-6 w-full max-w-[380px]">
                {[
                  { k: "Research", v: "38 min" },
                  { k: "Tabs opened", v: "0" },
                  { k: "Holds secured", v: "9" },
                  { k: "Bundle total", v: "$3,847" },
                ].map((m, i) => (
                  <motion.div
                    key={m.k}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{ duration: 0.7, delay: 0.3 + i * 0.08 }}
                  >
                    <div className="f-mono text-[0.5rem] tracking-[0.22em] uppercase text-fg-4 mb-1.5">
                      {m.k}
                    </div>
                    <div
                      className="text-fg"
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontVariationSettings: "'SOFT' 40, 'WONK' 0",
                        fontSize: "1.5rem",
                        letterSpacing: "-0.028em",
                        lineHeight: 1,
                      }}
                    >
                      {m.v}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: iPhone mockup */}
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
                  width: "min(86vw, 320px)",
                  aspectRatio: "9 / 19.5",
                  borderRadius: "44px",
                  padding: "11px",
                  background:
                    "linear-gradient(145deg, #1d1d22 0%, #0b0b0d 100%)",
                  boxShadow:
                    "0 0 0 1.5px hsl(var(--rule-hi) / 0.4), 0 70px 180px -30px rgba(0,0,0,0.9), 0 0 80px -20px hsl(var(--accent) / 0.2)",
                }}
              >
                <div
                  className="relative w-full h-full overflow-hidden"
                  style={{
                    borderRadius: "34px",
                    background:
                      "linear-gradient(180deg, hsl(36 10% 4%) 0%, hsl(36 10% 7%) 100%)",
                  }}
                >
                  {/* Dynamic Island */}
                  <div
                    className="absolute top-2 left-1/2 -translate-x-1/2 z-[5]"
                    style={{
                      width: "92px",
                      height: "27px",
                      borderRadius: "999px",
                      background: "#000",
                    }}
                  />

                  {/* Status bar time */}
                  <div className="absolute top-[14px] left-6 z-[6] text-[9.5px] text-fg f-sans font-semibold tabular-nums">
                    9:41
                  </div>

                  {/* App header */}
                  <div className="relative z-[2] pt-[52px] px-5">
                    <div className="f-mono text-[0.44rem] tracking-[0.26em] uppercase text-fg-4 mb-1">
                      Trip · held
                    </div>
                    <div className="flex items-baseline justify-between">
                      <div
                        className="text-fg"
                        style={{
                          fontFamily: "'Fraunces', serif",
                          fontVariationSettings: "'SOFT' 40, 'WONK' 0",
                          fontSize: "1.35rem",
                          letterSpacing: "-0.028em",
                          lineHeight: 1,
                        }}
                      >
                        Tokyo
                      </div>
                      <div className="f-mono text-[0.5rem] tracking-[0.08em] text-accent">
                        $3,847
                      </div>
                    </div>
                  </div>

                  {/* Map area */}
                  <div
                    className="relative mx-5 mt-4 overflow-hidden"
                    style={{
                      height: "128px",
                      background:
                        "radial-gradient(ellipse at 50% 50%, hsl(36 10% 11%) 0%, hsl(36 10% 5%) 100%)",
                      borderRadius: "14px",
                      border: "1px solid hsl(var(--rule) / 0.5)",
                    }}
                  >
                    <svg
                      viewBox="0 0 300 200"
                      className="absolute inset-0 w-full h-full"
                      preserveAspectRatio="xMidYMid slice"
                    >
                      {[0, 1, 2, 3, 4].map((i) => (
                        <motion.path
                          key={i}
                          d="M140,50 Q180,30 210,55 T240,110 Q250,150 220,170 T140,180 Q100,160 100,110 T140,50 Z"
                          fill="none"
                          stroke="hsl(var(--accent))"
                          strokeWidth="0.8"
                          strokeOpacity={0.08 + i * 0.04}
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true, margin: "-10%" }}
                          transition={{
                            duration: 2,
                            delay: 0.4 + i * 0.12,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          style={{
                            transform: `scale(${1 - i * 0.08})`,
                            transformOrigin: "170px 110px",
                          }}
                        />
                      ))}
                    </svg>

                    {/* Pin with echo */}
                    <motion.div
                      initial={{ opacity: 0, y: -24, scale: 0.5 }}
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
                      style={{
                        left: "50%",
                        top: "54%",
                        transform: "translate(-50%, -100%)",
                      }}
                    >
                      <MapPin
                        size={18}
                        strokeWidth={2.2}
                        className="text-accent relative z-[2]"
                        style={{
                          filter:
                            "drop-shadow(0 0 8px hsl(var(--accent) / 0.75))",
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
                        style={{ background: "hsl(var(--accent) / 0.45)" }}
                      />
                    </motion.div>
                  </div>

                  {/* Flying booking cards */}
                  <div className="mt-4 mx-5 space-y-2.5">
                    {bookings.map((b, i) => (
                      <motion.div
                        key={b.title}
                        initial={{ opacity: 0, y: 60, scale: 0.94 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{
                          duration: 0.75,
                          delay: 1.4 + i * 0.18,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex items-center gap-3 px-3 py-2.5 border border-rule/60"
                        style={{
                          background:
                            "linear-gradient(180deg, hsl(var(--bg-2) / 0.72) 0%, hsl(var(--bg) / 0.72) 100%)",
                          backdropFilter: "blur(8px)",
                          borderRadius: "10px",
                        }}
                      >
                        <div
                          className="w-7 h-7 flex items-center justify-center shrink-0 border border-accent/40"
                          style={{
                            background: "hsl(var(--accent) / 0.08)",
                            borderRadius: "7px",
                          }}
                        >
                          <b.Icon
                            size={13}
                            strokeWidth={1.8}
                            className="text-accent"
                          />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <div className="flex items-baseline justify-between gap-2">
                            <div className="text-[11px] text-fg font-medium truncate">
                              {b.title}
                            </div>
                            <div className="f-mono text-[0.52rem] tracking-[0.04em] text-accent tabular-nums shrink-0">
                              {b.price}
                            </div>
                          </div>
                          <div className="text-[9px] text-fg-4 truncate">
                            {b.meta}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA pinned to bottom */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, delay: 2.6 }}
                    className="absolute bottom-6 left-5 right-5"
                  >
                    <button
                      type="button"
                      className="w-full py-3 bg-accent text-bg f-mono text-[0.54rem] font-semibold tracking-[0.2em] uppercase"
                      style={{
                        borderRadius: "12px",
                        boxShadow:
                          "0 0 0 1px hsl(var(--accent) / 0.3), 0 14px 30px -10px hsl(var(--accent) / 0.6)",
                      }}
                    >
                      Approve &amp; book
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      }
    />
  );
}
