import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import KeynoteSlide from "./KeynoteSlide";

function CountUp({
  to,
  duration = 1700,
  start,
  prefix = "",
}: {
  to: number;
  duration?: number;
  start: boolean;
  prefix?: string;
}) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const from = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - from) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(eased * to);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to, duration]);
  return (
    <>
      {prefix}
      {Math.round(v).toLocaleString()}
    </>
  );
}

const forms = [
  { tag: "W-2", issuer: "Shopify HR", amount: "$142,000" },
  { tag: "1099-NEC", issuer: "Stripe", amount: "$8,420" },
  { tag: "1099-NEC", issuer: "Coinbase", amount: "$2,115" },
  { tag: "1099-NEC", issuer: "Upwork", amount: "$4,800" },
  { tag: "1099-INT", issuer: "Chase Savings", amount: "$183" },
];

/** SlideTax, "File my taxes." Forms fly in → refund counter pops */
export default function SlideTax() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <KeynoteSlide
      id="demo-tax"
      eyebrow="Live demo · 03"
      headline={
        <>
          "File my{" "}
          <span className="tw-italic text-accent">taxes.</span>"
        </>
      }
      body={
        <>
          Every W-2, every 1099, every deductible purchase, pulled from
          your inboxes and banks, classified, filed direct to the IRS.
          No $200 software fee.
        </>
      }
      align="center"
      spotlight
      visual={
        <div ref={ref} className="max-w-[1180px] mx-auto">
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 items-center">
            {/* Forms floating in */}
            <div className="flex flex-col gap-3">
              {forms.map((f, i) => (
                <motion.div
                  key={`${f.tag}-${f.issuer}`}
                  initial={{ opacity: 0, x: -60, rotate: -2 + i * 0.6 }}
                  animate={
                    inView
                      ? { opacity: 1, x: 0, rotate: -1.5 + i * 0.6 }
                      : {}
                  }
                  transition={{
                    duration: 0.85,
                    delay: 0.2 + i * 0.14,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative border border-rule-hi bg-bg-2/70 backdrop-blur-sm px-4 py-3 flex items-center justify-between text-left"
                  style={{
                    boxShadow: "0 24px 60px -30px rgba(0,0,0,0.6)",
                  }}
                >
                  <div>
                    <div className="f-mono text-[0.52rem] font-semibold tracking-[0.18em] uppercase text-accent">
                      {f.tag}
                    </div>
                    <div className="text-[12.5px] text-fg font-medium leading-tight mt-0.5">
                      {f.issuer}
                    </div>
                  </div>
                  <div
                    className="text-fg tabular-nums"
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontVariationSettings: "'SOFT' 40",
                      fontSize: "1.15rem",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {f.amount}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Arrow flow */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={inView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.9, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center origin-left"
            >
              <svg width="60" height="16" viewBox="0 0 60 16" fill="none">
                <path
                  d="M2 8 H54 M46 2 L54 8 L46 14"
                  stroke="hsl(var(--accent))"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="square"
                />
              </svg>
              <div className="mt-1 f-mono text-[0.48rem] tracking-[0.2em] uppercase text-accent">
                1040
              </div>
            </motion.div>

            {/* Refund card */}
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.94 }}
              animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{
                duration: 1,
                delay: 1.8,
                ease: [0.22, 1, 0.36, 1],
                type: "spring",
                damping: 16,
                stiffness: 100,
              }}
              className="relative border border-accent/50 p-6 md:p-8 text-left"
              style={{
                background:
                  "linear-gradient(180deg, hsl(var(--accent) / 0.06) 0%, hsl(var(--bg) / 0.3) 100%)",
                boxShadow: "0 50px 120px -30px hsl(var(--accent) / 0.28)",
              }}
            >
              <div className="f-mono text-[0.52rem] font-medium tracking-[0.22em] uppercase text-accent mb-3">
                Estimated refund
              </div>
              <div
                className="text-fg tabular-nums mb-5"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontVariationSettings: "'SOFT' 30, 'WONK' 0",
                  fontSize: "clamp(3.4rem, 6.5vw, 5.2rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.92,
                }}
              >
                $<CountUp to={4217} start={inView} duration={1800} />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="live-dot" />
                <span className="f-mono text-[0.5rem] tracking-[0.18em] uppercase text-fg-2">
                  IRS accepted · 47s
                </span>
              </div>
              <div className="h-px bg-rule my-4" />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="f-mono text-[0.48rem] tracking-[0.18em] uppercase text-fg-4 mb-1">
                    Wall time
                  </div>
                  <div
                    className="text-fg"
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: "1.1rem",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    2h 14m
                  </div>
                </div>
                <div>
                  <div className="f-mono text-[0.48rem] tracking-[0.18em] uppercase text-fg-4 mb-1">
                    Software fee
                  </div>
                  <div
                    className="text-fg"
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: "1.1rem",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    $0
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
