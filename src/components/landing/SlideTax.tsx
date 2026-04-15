import { motion } from "framer-motion";
import KeynoteSlide from "./KeynoteSlide";
import { Check } from "./icons";

/**
 * SlideTax — "File my taxes." Top row: five source forms get
 * detected one by one. Middle: a real Form 1040 fills itself in
 * line by line (income → calculations → refund). Bottom: a cursor
 * flies in and clicks E-FILE, the button flips to IRS ACCEPTED with
 * a submission ID. Every value is plausible; the refund pops with
 * a real accent glow the moment the math lands.
 */

const sources = [
  { tag: "W-2", issuer: "Shopify HR", amount: "$142,000" },
  { tag: "1099-INT", issuer: "Chase Savings", amount: "$183" },
  { tag: "1099-NEC", issuer: "Stripe", amount: "$8,420" },
  { tag: "1099-NEC", issuer: "Coinbase", amount: "$2,115" },
  { tag: "1099-NEC", issuer: "Upwork", amount: "$4,800" },
];

const incomeLines = [
  { line: "1a", desc: "Wages, salaries, tips (W-2 · Shopify)", amount: "142,000" },
  { line: "2b", desc: "Taxable interest (Chase Savings)", amount: "183" },
  { line: "8", desc: "Other income · Stripe 1099-NEC", amount: "8,420" },
  { line: "8", desc: "Other income · Coinbase 1099-NEC", amount: "2,115" },
  { line: "8", desc: "Other income · Upwork 1099-NEC", amount: "4,800" },
];

const calcLines = [
  { line: "9", desc: "Total income", amount: "157,518", emphasis: true },
  { line: "12", desc: "Standard deduction (single)", amount: "14,600", neg: true },
  { line: "15", desc: "Taxable income", amount: "142,918", emphasis: true },
  { line: "16", desc: "Tax owed", amount: "26,391" },
  { line: "25a", desc: "Federal tax withheld", amount: "30,608", neg: true },
];

export default function SlideTax() {
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
          You watch the form fill itself in. No $200 software fee.
        </>
      }
      align="center"
      spotlight
      visual={
        <div className="w-full max-w-[1080px] mx-auto">
          {/* Source forms row — detected and checked one by one */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-2 mb-3 f-mono text-[0.5rem] tracking-[0.22em] uppercase text-fg-4"
          >
            <span className="h-px w-8 bg-accent/60" />
            Sources detected in your inboxes
            <span className="h-px w-8 bg-accent/60" />
          </motion.div>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-2.5 mb-9 md:mb-11">
            {sources.map((s, i) => (
              <motion.div
                key={s.issuer}
                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.55,
                  delay: 0.2 + i * 0.14,
                  type: "spring",
                  damping: 18,
                  stiffness: 240,
                }}
                className="flex items-center gap-2.5 px-3 py-2 border border-rule-hi"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(36 10% 10%) 0%, hsl(36 10% 6%) 100%)",
                  borderRadius: "2px",
                  boxShadow: "0 12px 30px -18px rgba(0,0,0,0.6)",
                }}
              >
                <span className="f-mono text-[0.44rem] font-semibold tracking-[0.18em] uppercase text-accent">
                  {s.tag}
                </span>
                <span className="text-[11px] text-fg font-medium leading-none">
                  {s.issuer}
                </span>
                <span
                  className="text-fg-3 tabular-nums"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontVariationSettings: "'SOFT' 40",
                    fontSize: "0.72rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {s.amount}
                </span>
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{
                    duration: 0.35,
                    delay: 0.45 + i * 0.14,
                    type: "spring",
                    damping: 14,
                    stiffness: 320,
                  }}
                  className="ml-0.5 text-accent flex items-center"
                >
                  <Check size={10} strokeWidth={3.5} />
                </motion.span>
              </motion.div>
            ))}
          </div>

          {/* FORM 1040 — the hero */}
          <motion.div
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative border border-rule-hi mx-auto overflow-hidden"
            style={{
              maxWidth: "820px",
              background:
                "linear-gradient(180deg, hsl(36 10% 8%) 0%, hsl(36 10% 4%) 100%)",
              boxShadow:
                "0 90px 200px -60px rgba(0,0,0,0.92), 0 0 140px -60px hsl(var(--accent) / 0.22)",
              borderRadius: "2px",
            }}
          >
            {/* Form header */}
            <div
              className="flex items-center justify-between px-5 md:px-7 py-4 border-b border-rule"
              style={{ background: "hsl(36 10% 9.5%)" }}
            >
              <div className="flex items-baseline gap-4">
                <div
                  className="f-mono text-accent font-bold"
                  style={{
                    fontSize: "0.85rem",
                    letterSpacing: "0.16em",
                    lineHeight: 1,
                  }}
                >
                  FORM 1040
                </div>
                <div className="f-mono text-[0.5rem] tracking-[0.16em] uppercase text-fg-3 hidden sm:block">
                  U.S. Individual Income Tax Return · 2025
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="w-[6px] h-[6px] rounded-full bg-accent"
                  style={{
                    animation: "approval-blink 1.6s ease-in-out infinite",
                    boxShadow: "0 0 8px hsl(var(--accent) / 0.7)",
                  }}
                />
                <span className="f-mono text-[0.48rem] tracking-[0.18em] uppercase text-fg-3">
                  Draft · unsaved
                </span>
              </div>
            </div>

            {/* Taxpayer info strip */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 px-4 sm:px-5 md:px-7 py-3.5 border-b border-rule/60">
              <div className="min-w-0">
                <div className="f-mono text-[0.38rem] sm:text-[0.42rem] tracking-[0.14em] sm:tracking-[0.18em] uppercase text-fg-4 mb-1">
                  Taxpayer
                </div>
                <div className="text-[10.5px] sm:text-[12px] text-fg font-medium leading-none truncate">
                  Ojasva Mishra
                </div>
              </div>
              <div className="min-w-0">
                <div className="f-mono text-[0.38rem] sm:text-[0.42rem] tracking-[0.14em] sm:tracking-[0.18em] uppercase text-fg-4 mb-1">
                  SSN
                </div>
                <div className="text-[10.5px] sm:text-[12px] text-fg font-medium tabular-nums leading-none truncate">
                  ***-**-8234
                </div>
              </div>
              <div className="text-right min-w-0">
                <div className="f-mono text-[0.38rem] sm:text-[0.42rem] tracking-[0.14em] sm:tracking-[0.18em] uppercase text-fg-4 mb-1">
                  Filing
                </div>
                <div className="text-[10.5px] sm:text-[12px] text-fg font-medium leading-none truncate">
                  Single
                </div>
              </div>
            </div>

            {/* INCOME SECTION */}
            <div className="px-5 md:px-7 pt-5 pb-3">
              <div className="flex items-center justify-between mb-3">
                <div className="f-mono text-[0.5rem] tracking-[0.24em] uppercase text-accent">
                  Income
                </div>
                <div className="f-mono text-[0.44rem] tracking-[0.16em] uppercase text-fg-4">
                  Pulled from 5 sources
                </div>
              </div>
              <div className="space-y-0">
                {incomeLines.map((l, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -18, backgroundColor: "hsl(var(--accent) / 0.22)" }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      backgroundColor: "hsl(var(--accent) / 0)",
                    }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                      opacity: {
                        duration: 0.45,
                        delay: 0.75 + i * 0.22,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      x: {
                        duration: 0.45,
                        delay: 0.75 + i * 0.22,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      backgroundColor: {
                        duration: 1.2,
                        delay: 0.75 + i * 0.22,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }}
                    className="grid items-baseline gap-3 py-2 border-b border-rule/25"
                    style={{ gridTemplateColumns: "44px 1fr auto" }}
                  >
                    <div className="f-mono text-[0.58rem] font-semibold text-fg-4 tabular-nums">
                      {l.line}
                    </div>
                    <div className="text-[11.5px] text-fg-2 leading-tight">
                      {l.desc}
                    </div>
                    <div
                      className="text-fg tabular-nums"
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontVariationSettings: "'SOFT' 40",
                        fontSize: "1.1rem",
                        letterSpacing: "-0.018em",
                        lineHeight: 1,
                      }}
                    >
                      {l.amount}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CALCULATIONS SECTION */}
            <div className="px-5 md:px-7 pt-4 pb-3 border-t border-rule/40">
              <div className="flex items-center justify-between mb-3">
                <div className="f-mono text-[0.5rem] tracking-[0.24em] uppercase text-accent">
                  Calculations
                </div>
                <div className="f-mono text-[0.44rem] tracking-[0.16em] uppercase text-fg-4">
                  IRS tax tables · 2025
                </div>
              </div>
              <div className="space-y-0">
                {calcLines.map((l, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                      duration: 0.5,
                      delay: 2.0 + i * 0.22,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`grid items-baseline gap-3 py-2 border-b border-rule/25 ${
                      l.emphasis ? "px-2 -mx-2" : ""
                    }`}
                    style={{
                      gridTemplateColumns: "44px 1fr auto",
                      background: l.emphasis
                        ? "linear-gradient(90deg, hsl(var(--accent) / 0.08) 0%, transparent 100%)"
                        : undefined,
                    }}
                  >
                    <div
                      className={`f-mono text-[0.58rem] font-semibold tabular-nums ${
                        l.emphasis ? "text-accent" : "text-fg-4"
                      }`}
                    >
                      {l.line}
                    </div>
                    <div
                      className={`text-[11.5px] leading-tight ${
                        l.emphasis ? "text-fg font-medium" : "text-fg-2"
                      }`}
                    >
                      {l.desc}
                    </div>
                    <div
                      className={`tabular-nums ${
                        l.neg ? "text-ember" : l.emphasis ? "text-fg" : "text-fg"
                      }`}
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontVariationSettings: "'SOFT' 40",
                        fontSize: l.emphasis ? "1.2rem" : "1.1rem",
                        letterSpacing: "-0.018em",
                        lineHeight: 1,
                      }}
                    >
                      {l.neg ? `(${l.amount})` : l.amount}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* REFUND LINE — the payoff */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.9,
                delay: 3.4,
                type: "spring",
                damping: 16,
                stiffness: 180,
              }}
              className="relative mx-5 md:mx-7 my-4 border border-accent/70 px-5 py-4"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--accent) / 0.18) 0%, hsl(var(--accent) / 0.04) 100%)",
                boxShadow: "0 0 80px -10px hsl(var(--accent) / 0.45)",
                borderRadius: "2px",
              }}
            >
              <motion.div
                aria-hidden
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 1, 0] }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.6, delay: 3.4 }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, hsl(var(--accent) / 0.2) 0%, transparent 70%)",
                }}
              />
              <div className="relative flex items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-4">
                  <div className="f-mono text-[0.62rem] font-bold text-accent tabular-nums">
                    34
                  </div>
                  <div>
                    <div className="text-[12.5px] text-fg font-semibold leading-tight">
                      Amount overpaid · REFUND
                    </div>
                    <div className="f-mono text-[0.44rem] tracking-[0.18em] uppercase text-fg-3 mt-1">
                      Direct deposit · Chase ****8234
                    </div>
                  </div>
                </div>
                <div
                  className="text-accent tabular-nums"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontVariationSettings: "'SOFT' 40, 'WONK' 0",
                    fontSize: "clamp(2.3rem, 4.2vw, 3.4rem)",
                    letterSpacing: "-0.035em",
                    lineHeight: 1,
                    textShadow: "0 0 40px hsl(var(--accent) / 0.55)",
                  }}
                >
                  $4,217
                </div>
              </div>
            </motion.div>

            {/* Signature + E-FILE action */}
            <div className="relative border-t border-rule/60 px-5 md:px-7 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="f-mono text-[0.42rem] tracking-[0.18em] uppercase text-fg-4 mb-1">
                  Signature
                </div>
                <div
                  className="text-fg"
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: "italic",
                    fontSize: "18px",
                    lineHeight: 1,
                    letterSpacing: "-0.005em",
                  }}
                >
                  Ojasva Mishra
                </div>
              </div>

              <div className="relative h-[40px] w-[220px]">
                {/* E-FILE button (disappears after click) */}
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, 0] }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{
                    duration: 1.4,
                    delay: 3.7,
                    times: [0, 0.2, 0.85, 1],
                  }}
                  className="absolute inset-0 w-full f-mono text-[0.56rem] font-semibold tracking-[0.18em] uppercase bg-accent text-bg flex items-center justify-center gap-2"
                  style={{
                    boxShadow:
                      "0 0 0 1px hsl(var(--accent) / 0.3), 0 16px 32px -10px hsl(var(--accent) / 0.65)",
                    animation: "homework-pulse 1.6s ease-in-out 3.5s 2",
                  }}
                >
                  E-File to IRS
                  <span
                    style={{
                      display: "inline-block",
                      width: "16px",
                      height: "1.5px",
                      background: "currentColor",
                      position: "relative",
                      marginLeft: "2px",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "-3px",
                        width: "6px",
                        height: "6px",
                        borderTop: "1.5px solid currentColor",
                        borderRight: "1.5px solid currentColor",
                        transform: "rotate(45deg)",
                      }}
                    />
                  </span>
                </motion.button>

                {/* IRS accepted confirmation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{
                    duration: 0.55,
                    delay: 5.1,
                    type: "spring",
                    damping: 16,
                    stiffness: 240,
                  }}
                  className="absolute inset-0 w-full flex items-center justify-center gap-2 border border-accent/60 bg-accent/10"
                >
                  <Check size={12} strokeWidth={3} className="text-accent" />
                  <span className="f-mono text-[0.56rem] font-semibold tracking-[0.18em] uppercase text-accent">
                    IRS accepted · 47s
                  </span>
                </motion.div>

                {/* Cursor flying in to click E-FILE */}
                <motion.div
                  aria-hidden
                  initial={{ opacity: 0, x: 110, y: -50 }}
                  whileInView={{
                    opacity: [0, 1, 1, 1, 0],
                    x: [110, 70, 30, 6, 6],
                    y: [-50, -28, -8, 6, 6],
                    scale: [1, 1, 1, 0.8, 0.8],
                  }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{
                    duration: 1.8,
                    delay: 3.6,
                    times: [0, 0.3, 0.6, 0.86, 1],
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute right-[40px] top-[-10px] z-[4]"
                >
                  <svg width="16" height="20" viewBox="0 0 18 22" fill="none">
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
          </motion.div>

          {/* Submission ID footnote */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 5.6 }}
            className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 f-mono text-[0.5rem] tracking-[0.22em] uppercase text-fg-4"
          >
            <span className="flex items-center gap-2">
              <span className="live-dot" />
              Submission ID 2025-FED-8234192
            </span>
            <span className="text-fg-4/60">·</span>
            <span>Wall time 2h 14m</span>
            <span className="text-fg-4/60">·</span>
            <span className="text-accent">Software fee $0</span>
          </motion.div>
        </div>
      }
    />
  );
}
