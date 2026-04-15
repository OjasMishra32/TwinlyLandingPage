import { Fragment } from "react";
import { motion } from "framer-motion";
import KeynoteSlide from "./KeynoteSlide";
import { Check } from "./icons";

/**
 * SlideHomework — "Do my homework." A top workflow stepper lights
 * up 5 phases (READ → OUTLINE → DRAFT → REVIEW → SUBMIT) as Twinly
 * runs. Below: sources absorbed on the left, the paper types itself
 * in the center, integrity check + Canvas submit on the right with
 * a cursor-tap on the Submit button. Passes GPTZero because it was
 * trained on exactly how this student writes.
 */

const sources = [
  { tag: "01", title: "Chap 4 · Supply curves", kind: "PDF · 22p" },
  { tag: "02", title: "Lecture · Elasticity", kind: "SLIDES · 48" },
  { tag: "03", title: "Case · Apple Q3 pricing", kind: "PDF · 14p" },
  { tag: "04", title: "Prof. Kim · office hours", kind: "NOTES · 6p" },
];

const phases = [
  { num: "01", label: "Read", detail: "4 sources", activeAt: 0.3 },
  { num: "02", label: "Outline", detail: "12 bullets", activeAt: 1.0 },
  { num: "03", label: "Draft", detail: "2,847 words", activeAt: 1.7 },
  { num: "04", label: "Review", detail: "0.2% AI", activeAt: 5.3 },
  { num: "05", label: "Submit", detail: "Canvas", activeAt: 6.7 },
];

const paragraphs = [
  "Price elasticity of demand is almost never the headline number. It's the ratio that hides underneath every pricing decision Apple has made since the App Store opened.",
  "Consider the 2023 Services hike. A 20% bump on Apple Music, Arcade, and News+ looks aggressive on paper, but Apple's historical elasticity coefficient sits near -0.4, meaning quantity demanded barely moved when prices rose.",
  "The reason has nothing to do with the product. It has to do with switching costs, ecosystem lock-in, and the fact that once you have four apps, a rating history, and three family-plan slots, you don't leave over $3.",
];

export default function SlideHomework() {
  return (
    <KeynoteSlide
      id="demo-homework"
      eyebrow="Live demo · 02"
      headline={
        <>
          "Do my{" "}
          <span className="tw-italic text-accent">homework.</span>"
        </>
      }
      body={
        <>
          Econ 201 case study. Four sources read, a 12-page argued draft
          written in your exact voice, 0.2% AI-detection score, one-tap
          submission to Canvas. Before your coffee gets cold.
        </>
      }
      align="center"
      spotlight
      visual={
        <div className="max-w-[1280px] mx-auto">
          {/* Workflow stepper — lights up phase-by-phase as Twinly runs */}
          <div className="mb-10 md:mb-14 px-2">
            <div className="flex items-start justify-between max-w-[940px] mx-auto">
              {phases.map((p, i) => (
                <Fragment key={p.num}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{
                      duration: 0.55,
                      delay: 0.1 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex flex-col items-center text-center shrink-0 relative"
                    style={{ width: "92px" }}
                  >
                    <motion.div
                      initial={{
                        backgroundColor: "hsl(36 10% 11%)",
                        borderColor: "hsl(var(--rule))",
                      }}
                      whileInView={{
                        backgroundColor: [
                          "hsl(36 10% 11%)",
                          "hsl(var(--accent) / 0.2)",
                          "hsl(var(--accent) / 0.15)",
                        ],
                        borderColor: [
                          "hsl(var(--rule))",
                          "hsl(var(--accent))",
                          "hsl(var(--accent))",
                        ],
                        scale: [1, 1.18, 1],
                      }}
                      viewport={{ once: true, margin: "-8%" }}
                      transition={{
                        duration: 0.9,
                        delay: p.activeAt,
                        times: [0, 0.3, 1],
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative w-10 h-10 flex items-center justify-center border"
                      style={{ borderRadius: "999px" }}
                    >
                      <span
                        className="f-mono text-[0.58rem] font-bold tabular-nums"
                        style={{ color: "hsl(var(--accent))" }}
                      >
                        {p.num}
                      </span>
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: [0, 1, 0.6] }}
                        viewport={{ once: true, margin: "-8%" }}
                        transition={{
                          duration: 1.2,
                          delay: p.activeAt,
                          times: [0, 0.4, 1],
                        }}
                        className="absolute inset-0 rounded-full"
                        style={{
                          boxShadow: "0 0 20px hsl(var(--accent) / 0.6)",
                        }}
                      />
                    </motion.div>
                    <div className="f-mono text-[0.5rem] tracking-[0.18em] uppercase text-fg font-semibold mt-2.5">
                      {p.label}
                    </div>
                    <div className="f-mono text-[0.44rem] tracking-[0.1em] uppercase text-fg-4 mt-1 leading-tight">
                      {p.detail}
                    </div>
                  </motion.div>
                  {i < phases.length - 1 && (
                    <div className="flex-1 mt-5 mx-1 md:mx-2 relative h-[2px]">
                      <div className="absolute inset-0 bg-rule/60" />
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "-8%" }}
                        transition={{
                          duration: 0.7,
                          delay: phases[i + 1].activeAt - 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute inset-0 bg-accent origin-left"
                        style={{
                          boxShadow: "0 0 10px hsl(var(--accent) / 0.5)",
                        }}
                      />
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-[0.8fr_1.35fr_0.85fr] gap-5 md:gap-6 items-start">
            {/* LEFT: sources being read */}
            <div className="flex flex-col gap-3">
              <div className="f-mono text-[0.5rem] tracking-[0.24em] uppercase text-fg-4 mb-1 pl-1">
                Reading 4 sources
              </div>
              {sources.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, x: -28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{
                    duration: 0.65,
                    delay: 0.18 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative border border-rule bg-bg-2/55 px-3 py-2.5 text-left"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="f-mono text-[0.48rem] font-semibold tracking-[0.2em] text-accent">
                      {s.tag}
                    </span>
                    <span className="f-mono text-[0.44rem] tracking-[0.12em] uppercase text-fg-4">
                      {s.kind}
                    </span>
                  </div>
                  <div className="text-[11.5px] text-fg leading-tight font-medium">
                    {s.title}
                  </div>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{
                      duration: 1.2,
                      delay: 0.8 + i * 0.15,
                      ease: "linear",
                    }}
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-accent origin-left"
                  />
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="pl-1 mt-1 flex items-center gap-2 f-mono text-[0.48rem] tracking-[0.18em] uppercase text-accent"
              >
                <span className="w-[5px] h-[5px] rounded-full bg-accent" />
                all absorbed
              </motion.div>
            </div>

            {/* CENTER: the paper drafting itself */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative border border-rule-hi overflow-hidden text-left"
              style={{
                background: "hsl(var(--fg) / 0.97)",
                boxShadow:
                  "0 60px 140px -40px rgba(0,0,0,0.85), 0 0 0 1px hsl(var(--fg) / 0.1)",
              }}
            >
              <div className="px-5 py-3 border-b border-black/10 flex items-center justify-between bg-black/5">
                <div className="flex items-center gap-3">
                  <div className="f-mono text-[0.48rem] tracking-[0.14em] uppercase text-black/50">
                    ECON 201 · Case brief
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{ duration: 0.5, delay: 1.6 }}
                    className="flex items-center gap-1.5 f-mono text-[0.44rem] tracking-[0.1em] uppercase text-black/45"
                  >
                    <motion.span
                      className="w-[5px] h-[5px] rounded-full bg-black/40"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    Drafting
                  </motion.div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="f-mono text-[0.48rem] tracking-[0.14em] uppercase text-black/50">
                    2,847 words
                  </div>
                  <div className="f-mono text-[0.48rem] tracking-[0.14em] uppercase text-black/50">
                    Page 1 of 12
                  </div>
                </div>
              </div>
              <div className="px-6 md:px-8 py-7 md:py-8 min-h-[360px] text-black/85">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="text-center mb-3"
                  style={{
                    fontFamily: "'Times New Roman', serif",
                    fontSize: "9.5px",
                    color: "rgba(0,0,0,0.55)",
                  }}
                >
                  Ojasva Mishra · ECON 201 · Prof. Kim · April 18, 2026
                </motion.div>
                <motion.h4
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.7, delay: 1.25 }}
                  className="text-center mb-6"
                  style={{
                    fontFamily: "'Times New Roman', serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    letterSpacing: "-0.005em",
                    lineHeight: 1.3,
                  }}
                >
                  Why Price Elasticity Doesn't Explain Apple:
                  <br />
                  Switching Costs and the Illusion of Choice
                </motion.h4>
                <div
                  className="text-[10.5px] leading-[1.85]"
                  style={{ fontFamily: "'Times New Roman', serif" }}
                >
                  {paragraphs.map((p, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: "-8%" }}
                      transition={{
                        duration: 0.8,
                        delay: 1.6 + i * 1.1,
                      }}
                      className="mb-3 text-black/80"
                      style={{ textIndent: "1.5em" }}
                    >
                      {p}
                    </motion.p>
                  ))}
                  {/* Typing cursor */}
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{ duration: 0.3, delay: 4.8 }}
                    className="inline-block w-[1px] h-[11px] bg-black/60 align-middle"
                    style={{
                      animation: "homework-caret 1s step-end infinite",
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* RIGHT: AI-detector + Canvas submit */}
            <div className="flex flex-col gap-4">
              <div className="f-mono text-[0.5rem] tracking-[0.24em] uppercase text-fg-4 mb-1 pl-1">
                Integrity check
              </div>

              {/* GPTZero-style detector card */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.75, delay: 5.2 }}
                className="relative border border-accent/50 p-4 text-left overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(var(--accent) / 0.06) 0%, hsl(var(--bg-2) / 0.6) 100%)",
                  boxShadow: "0 20px 40px -20px hsl(var(--accent) / 0.3)",
                }}
              >
                <div className="f-mono text-[0.44rem] tracking-[0.2em] uppercase text-fg-4 mb-2">
                  AI detection · 99% human
                </div>
                <div
                  className="text-fg mb-2"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontVariationSettings: "'SOFT' 40",
                    fontSize: "1.85rem",
                    letterSpacing: "-0.028em",
                    lineHeight: 1,
                  }}
                >
                  0.2%
                </div>
                <div className="h-[3px] bg-rule/60 overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 1 }}
                    whileInView={{ scaleX: 0.02 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{
                      duration: 1.4,
                      delay: 5.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-full bg-accent origin-left"
                    style={{
                      boxShadow: "0 0 8px hsl(var(--accent) / 0.7)",
                    }}
                  />
                </div>
                <div className="mt-2 f-mono text-[0.44rem] tracking-[0.04em] text-fg-3">
                  trained on your last 14 essays
                </div>
              </motion.div>

              {/* Canvas submit card with the animated click */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.75, delay: 5.6 }}
                className="relative border border-rule-hi bg-bg-2/55 p-4 overflow-hidden"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-4 h-4 shrink-0"
                    style={{
                      background: "hsl(2 70% 55%)",
                      borderRadius: "3px",
                    }}
                  />
                  <div className="text-[10.5px] text-fg-3 font-medium leading-none">
                    Canvas · ECON 201
                  </div>
                </div>
                <div className="text-[12.5px] text-fg font-medium leading-tight mb-4">
                  Case Brief · Apple Pricing
                </div>

                {/* Submit button. Glows, then fires an animated click, then
                    flips to "Submitted ✓" state */}
                <div className="relative h-[34px]">
                  <motion.button
                    type="button"
                    initial={{ opacity: 1, scale: 1 }}
                    whileInView={{
                      opacity: [1, 1, 0],
                      scale: [1, 0.95, 0.95],
                    }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{
                      duration: 0.5,
                      delay: 6.6,
                      times: [0, 0.5, 1],
                    }}
                    className="absolute inset-0 w-full f-mono text-[0.58rem] font-semibold tracking-[0.18em] uppercase bg-accent text-bg flex items-center justify-center"
                    style={{
                      boxShadow:
                        "0 0 0 1px hsl(var(--accent) / 0.3), 0 14px 30px -10px hsl(var(--accent) / 0.6)",
                      animation: "homework-pulse 1.8s ease-in-out 5.4s 1",
                    }}
                  >
                    Submit assignment
                  </motion.button>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{
                      duration: 0.6,
                      delay: 7.1,
                      type: "spring",
                      damping: 16,
                      stiffness: 200,
                    }}
                    className="absolute inset-0 w-full flex items-center justify-center gap-2 border border-accent/50 bg-accent/10 f-mono text-[0.58rem] font-semibold tracking-[0.18em] uppercase text-accent"
                  >
                    <Check size={12} strokeWidth={2.5} />
                    Submitted · 11:47pm
                  </motion.div>
                </div>

                {/* Animated cursor dot that clicks the button */}
                <motion.div
                  aria-hidden
                  initial={{ opacity: 0, x: 60, y: -30 }}
                  whileInView={{
                    opacity: [0, 1, 1, 1, 0],
                    x: [60, 40, 20, 0, 0],
                    y: [-30, -20, -10, -2, -2],
                    scale: [1, 1, 1, 0.82, 0.82],
                  }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{
                    duration: 2,
                    delay: 5.0,
                    times: [0, 0.3, 0.6, 0.85, 1],
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute right-[22%] bottom-[22px] z-[4]"
                >
                  <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                    <path
                      d="M2 2 L2 18 L6 14 L9 20 L11 19 L8 13 L14 13 Z"
                      fill="hsl(var(--fg))"
                      stroke="hsl(var(--bg))"
                      strokeWidth="1"
                      strokeLinejoin="miter"
                    />
                  </svg>
                </motion.div>
              </motion.div>

              {/* Grade receipt */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.7, delay: 7.8 }}
                className="relative border border-rule bg-bg-2/40 p-3 text-center"
              >
                <div className="f-mono text-[0.44rem] tracking-[0.2em] uppercase text-fg-4 mb-1">
                  Returned · 3 days later
                </div>
                <div
                  className="text-accent"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "1.8rem",
                    letterSpacing: "-0.025em",
                    lineHeight: 1,
                  }}
                >
                  A
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      }
    />
  );
}
