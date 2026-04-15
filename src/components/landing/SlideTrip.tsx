import { motion } from "framer-motion";
import KeynoteSlide from "./KeynoteSlide";

const pins = [
  { x: 40, y: 40, label: "TYO" },
  { x: 52, y: 52, label: "KYO" },
  { x: 46, y: 46, label: "HKN" },
];

const bookings = [
  { tag: "FLIGHT", title: "SFO → NRT", meta: "JAL 002 · window · $1,240", p: 1 },
  { tag: "HOTEL", title: "Park Hyatt Shinjuku", meta: "8 nights · $1,820", p: 1 },
  { tag: "RAIL", title: "JR Pass · 8 days", meta: "Kyoto + Hakone", p: 1 },
  { tag: "DINNER", title: "Kissaten · Ghibli-adjacent", meta: "4 reservations", p: 1 },
];

/** SlideTrip, "Plan my trip." Map with dropping pins + booking cards */
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
          Eight days, two travelers, a budget, and one Ghibli fan. Forty
          minutes later: flights, hotel, rail pass, dinners. One approval
          away from booked.
        </>
      }
      align="center"
      spotlight
      visual={
        <div className="max-w-[1180px] mx-auto">
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-6 md:gap-8 items-stretch">
            {/* Map panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative border border-rule-hi bg-bg-2/60 backdrop-blur-sm overflow-hidden"
              style={{
                aspectRatio: "4/3",
                boxShadow: "0 40px 100px -40px rgba(0,0,0,0.7)",
              }}
            >
              {/* Stylized Japan shape */}
              <svg
                viewBox="0 0 400 300"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid slice"
              >
                {/* Topographic feel, concentric soft strokes */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <motion.path
                    key={i}
                    d="M140,80 Q180,60 210,80 T240,120 Q250,160 220,190 T160,240 Q130,220 120,190 T140,80 Z"
                    fill="none"
                    stroke="hsl(var(--accent))"
                    strokeWidth="0.6"
                    strokeOpacity={0.12 + i * 0.04}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{
                      duration: 2.2,
                      delay: 0.4 + i * 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      transform: `scale(${1 - i * 0.08})`,
                      transformOrigin: "180px 160px",
                    }}
                  />
                ))}
                {/* Latitude lines */}
                {[60, 110, 160, 210, 260].map((y, i) => (
                  <motion.line
                    key={y}
                    x1="20"
                    x2="380"
                    y1={y}
                    y2={y}
                    stroke="hsl(var(--fg))"
                    strokeOpacity="0.04"
                    strokeWidth="0.5"
                    strokeDasharray="2 4"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{ duration: 1.5, delay: 0.2 + i * 0.08 }}
                  />
                ))}
              </svg>

              {/* Pins */}
              {pins.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: -40, scale: 0.5 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{
                    duration: 0.8,
                    delay: 1.2 + i * 0.25,
                    type: "spring",
                    damping: 14,
                    stiffness: 140,
                  }}
                  className="absolute"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  <div
                    className="w-[14px] h-[14px] rounded-full border-2 border-bg"
                    style={{
                      background: "hsl(var(--accent))",
                      boxShadow: "0 0 14px hsl(var(--accent) / 0.7)",
                    }}
                  />
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-[-26px] f-mono text-[0.5rem] font-semibold tracking-[0.14em] uppercase text-accent whitespace-nowrap px-2 py-0.5 border border-accent/40 bg-bg-2/90"
                  >
                    {p.label}
                  </div>
                  <motion.div
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 2.6, opacity: 0 }}
                    transition={{
                      duration: 2,
                      delay: 1.4 + i * 0.25,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    className="absolute inset-0 rounded-full"
                    style={{ background: "hsl(var(--accent) / 0.35)" }}
                  />
                </motion.div>
              ))}

              {/* Bottom meta strip */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between f-mono text-[0.48rem] tracking-[0.18em] uppercase text-fg-3">
                <span>8 days · 3 cities</span>
                <span className="text-accent">$3,847</span>
              </div>
            </motion.div>

            {/* Bookings column */}
            <div className="flex flex-col gap-3 justify-center">
              <div className="f-mono text-[0.5rem] tracking-[0.22em] uppercase text-fg-4 mb-1">
                Held · awaiting your nod
              </div>
              {bookings.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{
                    duration: 0.75,
                    delay: 1.9 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative border border-rule bg-bg-2/50 backdrop-blur-sm px-4 py-3 text-left"
                >
                  <span
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent"
                    style={{ boxShadow: "0 0 8px hsl(var(--accent) / 0.5)" }}
                  />
                  <div className="flex items-center justify-between mb-1 pl-2">
                    <span className="f-mono text-[0.5rem] font-semibold tracking-[0.18em] uppercase text-accent">
                      {b.tag}
                    </span>
                    <span className="f-mono text-[0.48rem] font-medium tracking-[0.14em] uppercase text-fg-3">
                      Held
                    </span>
                  </div>
                  <div className="text-[13px] text-fg font-medium leading-tight pl-2">
                    {b.title}
                  </div>
                  <div className="f-mono text-[0.5rem] tracking-[0.04em] text-fg-3 mt-1 pl-2">
                    {b.meta}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      }
    />
  );
}
