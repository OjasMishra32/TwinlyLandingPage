import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import KeynoteSlide from "./KeynoteSlide";

/**
 * SlideCode — "Build me a website." Full macOS editor window with
 * a real Next.js file typed into it, a browser window rendering a
 * polished landing page preview (this pass: Halcyon, a deep-focus
 * companion app), and a live build-pipeline strip below.
 *
 * Everything is text-aligned explicitly to override KeynoteSlide's
 * default text-center cascade, so the code, logs, and tabular
 * content sit cleanly against the left edge of each window.
 */

type CodeLine = {
  indent: number;
  tokens: Array<{ text: string; cls?: string }>;
};

const code: CodeLine[] = [
  { indent: 0, tokens: [{ text: "import", cls: "tk-k" }, { text: " { Suspense } " }, { text: "from", cls: "tk-k" }, { text: " " }, { text: '"react"', cls: "tk-s" }, { text: ";" }] },
  { indent: 0, tokens: [{ text: "import", cls: "tk-k" }, { text: " { Hero } " }, { text: "from", cls: "tk-k" }, { text: " " }, { text: '"@/components/Hero"', cls: "tk-s" }, { text: ";" }] },
  { indent: 0, tokens: [{ text: "import", cls: "tk-k" }, { text: " { FocusChart } " }, { text: "from", cls: "tk-k" }, { text: " " }, { text: '"@/components/FocusChart"', cls: "tk-s" }, { text: ";" }] },
  { indent: 0, tokens: [{ text: "import", cls: "tk-k" }, { text: " { Waitlist } " }, { text: "from", cls: "tk-k" }, { text: " " }, { text: '"@/components/Waitlist"', cls: "tk-s" }, { text: ";" }] },
  { indent: 0, tokens: [{ text: "" }] },
  { indent: 0, tokens: [{ text: "export default function ", cls: "tk-k" }, { text: "Page", cls: "tk-f" }, { text: "() {" }] },
  { indent: 1, tokens: [{ text: "return", cls: "tk-k" }, { text: " (" }] },
  { indent: 2, tokens: [{ text: "<", cls: "tk-p" }, { text: "main", cls: "tk-t" }, { text: " className", cls: "tk-a" }, { text: "=" }, { text: '"bg-ink min-h-screen"', cls: "tk-s" }, { text: ">", cls: "tk-p" }] },
  { indent: 3, tokens: [{ text: "<", cls: "tk-p" }, { text: "Hero", cls: "tk-c" }] },
  { indent: 4, tokens: [{ text: "title", cls: "tk-a" }, { text: "=" }, { text: '"Deep work, on demand."', cls: "tk-s" }] },
  { indent: 4, tokens: [{ text: "tagline", cls: "tk-a" }, { text: "=" }, { text: '"Shield your attention."', cls: "tk-s" }] },
  { indent: 3, tokens: [{ text: "/>", cls: "tk-p" }] },
  { indent: 3, tokens: [{ text: "<", cls: "tk-p" }, { text: "FocusChart", cls: "tk-c" }, { text: " " }, { text: "data", cls: "tk-a" }, { text: "={sessions} />", cls: "tk-p" }] },
  { indent: 3, tokens: [{ text: "<", cls: "tk-p" }, { text: "Suspense", cls: "tk-c" }, { text: " " }, { text: "fallback", cls: "tk-a" }, { text: "={<" }, { text: "Skeleton", cls: "tk-c" }, { text: "/>}>" }] },
  { indent: 4, tokens: [{ text: "<", cls: "tk-p" }, { text: "Waitlist", cls: "tk-c" }, { text: " />", cls: "tk-p" }] },
  { indent: 3, tokens: [{ text: "</", cls: "tk-p" }, { text: "Suspense", cls: "tk-c" }, { text: ">", cls: "tk-p" }] },
  { indent: 2, tokens: [{ text: "</", cls: "tk-p" }, { text: "main", cls: "tk-t" }, { text: ">", cls: "tk-p" }] },
  { indent: 1, tokens: [{ text: ");" }] },
  { indent: 0, tokens: [{ text: "}" }] },
];

const weekBars = [
  { label: "M", h: 0.58, hours: "1.9h" },
  { label: "T", h: 0.42, hours: "1.4h" },
  { label: "W", h: 0.74, hours: "2.4h" },
  { label: "T", h: 0.35, hours: "1.1h" },
  { label: "F", h: 0.88, hours: "2.9h" },
  { label: "S", h: 0.22, hours: "0.7h" },
  { label: "S", h: 0.54, hours: "1.8h" },
];

const stats = [
  { code: "01", big: "2.4h", label: "Avg daily deep focus" },
  { code: "02", big: "87%", label: "Session completion" },
  { code: "03", big: "+12d", label: "Longest focus streak" },
];

/**
 * A count-up that animates a number from 0 to `to` once, when the
 * parent slide's content has mounted. Used for the stat tiles — a
 * tiny detail, but it makes the preview feel alive.
 */
function CountUp({ to, suffix = "", delay = 0 }: { to: number; suffix?: string; delay?: number }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => v.toFixed(suffix === "h" || suffix === "%" ? (suffix === "h" ? 1 : 0) : 0));
  useEffect(() => {
    const controls = animate(mv, to, {
      duration: 1.4,
      delay,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [mv, to, delay]);
  return (
    <span>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

/**
 * Rotating ASCII spinner used in the terminal chrome. Four frames,
 * classic braille-ish look, 90ms per frame.
 */
function Spinner() {
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % frames.length), 90);
    return () => clearInterval(t);
  }, [frames.length]);
  return <span className="text-accent inline-block w-[1ch]">{frames[i]}</span>;
}

export default function SlideCode() {
  const codeBodyRef = useRef<HTMLDivElement>(null);

  return (
    <KeynoteSlide
      id="demo-code"
      eyebrow="Live demo · 01"
      headline={
        <>
          "Build me a{" "}
          <span className="tw-italic text-accent">website.</span>"
        </>
      }
      body={
        <>
          You say one sentence. Twinly designs the brand, writes the Next.js,
          ships it to Vercel, points a domain, files the SSL, and sends you
          the URL. 1h 42m. You never touch a terminal.
        </>
      }
      align="center"
      spotlight
      visual={
        <div className="max-w-[1280px] mx-auto text-left">
          <div className="grid md:grid-cols-[1.05fr_1fr] gap-5 md:gap-6 items-stretch">
            {/* Editor window */}
            <motion.div
              initial={{ opacity: 0, x: -40, rotateY: 6 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{
                duration: 1,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative overflow-hidden border border-rule-hi/70"
              style={{
                background:
                  "linear-gradient(180deg, hsl(36 10% 9%) 0%, hsl(36 10% 6%) 100%)",
                boxShadow: "0 50px 120px -40px rgba(0,0,0,0.85)",
                transformStyle: "preserve-3d",
                borderRadius: "8px",
              }}
            >
              {/* Ambient scanning sheen — continuous, subtle */}
              <motion.div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 40%, hsl(var(--accent) / 0.055) 50%, transparent 60%)",
                  mixBlendMode: "screen",
                }}
                animate={{ x: ["-120%", "120%"] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "linear", delay: 1.8 }}
              />

              {/* Chrome bar */}
              <div className="relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 border-b border-rule/70 bg-bg-3/50">
                <div className="flex gap-1.5 shrink-0">
                  <span className="w-[9px] h-[9px] sm:w-[10px] sm:h-[10px] rounded-full bg-ember/60" />
                  <span className="w-[9px] h-[9px] sm:w-[10px] sm:h-[10px] rounded-full bg-fg-4" />
                  <span className="w-[9px] h-[9px] sm:w-[10px] sm:h-[10px] rounded-full bg-accent/60" />
                </div>
                <div className="flex items-center gap-3 sm:gap-4 ml-1 sm:ml-2 f-mono text-[0.48rem] sm:text-[0.52rem] tracking-[0.14em] uppercase min-w-0">
                  <span className="text-accent">page.tsx</span>
                  <span className="hidden sm:inline text-fg-4">hero.tsx</span>
                  <span className="hidden md:inline text-fg-4">focus-chart.tsx</span>
                </div>
                <div className="ml-auto flex items-center gap-2 f-mono text-[0.46rem] sm:text-[0.5rem] tracking-[0.18em] uppercase text-accent shrink-0">
                  <span
                    className="w-[6px] h-[6px] rounded-full bg-accent"
                    style={{
                      animation: "approval-blink 1.6s ease-in-out infinite",
                      boxShadow: "0 0 8px hsl(var(--accent) / 0.7)",
                    }}
                  />
                  Writing
                </div>
              </div>

              {/* "Writing" progress strip under the chrome */}
              <div className="relative h-[2px] bg-rule/40 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-accent"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 2.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ boxShadow: "0 0 10px hsl(var(--accent) / 0.8)" }}
                />
              </div>

              {/* Code area with line numbers */}
              <div
                ref={codeBodyRef}
                className="relative flex text-[10.5px] sm:text-[11.5px] leading-[1.85] text-left overflow-hidden"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {/* Line number gutter */}
                <div className="flex-shrink-0 pt-4 pb-6 pl-3 sm:pl-4 pr-2 sm:pr-3 text-right text-fg-4 select-none border-r border-rule/40">
                  {code.map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                {/* Code lines */}
                <div className="flex-1 min-w-0 pt-4 pb-6 pl-3 sm:pl-4 pr-3 sm:pr-5 overflow-x-auto">
                  {code.map((line, i) => {
                    const isLast = i === code.length - 1;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-8%" }}
                        transition={{
                          duration: 0.35,
                          delay: 0.4 + i * 0.045,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{ paddingLeft: `${line.indent * 18}px` }}
                        className="whitespace-pre relative"
                      >
                        {line.tokens.map((t, j) => (
                          <span key={j} className={t.cls || "text-fg-2"}>
                            {t.text}
                          </span>
                        ))}
                        {isLast && (
                          <motion.span
                            className="inline-block w-[7px] h-[13px] bg-accent align-[-2px] ml-[2px]"
                            animate={{ opacity: [1, 1, 0, 0] }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              times: [0, 0.5, 0.5, 1],
                            }}
                          />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Browser preview window */}
            <motion.div
              initial={{ opacity: 0, x: 40, rotateY: -6 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{
                duration: 1,
                delay: 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative overflow-hidden border border-rule-hi/70"
              style={{
                background:
                  "linear-gradient(180deg, hsl(220 25% 7%) 0%, hsl(220 30% 4%) 100%)",
                boxShadow:
                  "0 50px 120px -40px hsl(var(--accent) / 0.22), 0 40px 100px -50px rgba(0,0,0,0.7)",
                transformStyle: "preserve-3d",
                borderRadius: "8px",
              }}
            >
              {/* Ambient edge breathing glow */}
              <motion.div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 40% at 50% 100%, hsl(var(--accent) / 0.10) 0%, transparent 70%)",
                }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Browser chrome */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-rule/70 bg-bg-3/50">
                <div className="flex gap-1.5">
                  <span className="w-[10px] h-[10px] rounded-full bg-fg-4" />
                  <span className="w-[10px] h-[10px] rounded-full bg-fg-4" />
                  <span className="w-[10px] h-[10px] rounded-full bg-fg-4" />
                </div>
                <div
                  className="flex-1 mx-3 px-3 py-1 text-center f-mono text-[0.5rem] tracking-[0.1em] text-fg-3 truncate"
                  style={{
                    background: "hsl(220 25% 12%)",
                    borderRadius: "6px",
                  }}
                >
                  halcyon.app
                </div>
                <span className="f-mono text-[0.5rem] tracking-[0.18em] uppercase text-accent flex items-center gap-1.5">
                  <span
                    className="w-[5px] h-[5px] rounded-full bg-accent"
                    style={{ boxShadow: "0 0 8px hsl(var(--accent) / 0.7)" }}
                  />
                  Live
                </span>
              </div>

              {/* Rendered page */}
              <div
                className="relative overflow-hidden"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(var(--accent) / 0.07) 0%, transparent 55%), linear-gradient(180deg, hsl(220 25% 5%) 0%, hsl(220 30% 3%) 100%)",
                  minHeight: "440px",
                }}
              >
                {/* Fake nav */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="flex items-center justify-between px-5 py-4 border-b border-rule/30"
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-4 h-4 bg-accent"
                      style={{ borderRadius: "999px" }}
                      animate={{
                        boxShadow: [
                          "0 0 0 0 hsl(var(--accent) / 0.6)",
                          "0 0 0 6px hsl(var(--accent) / 0)",
                        ],
                      }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                    />
                    <span
                      className="text-fg"
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontStyle: "italic",
                        fontSize: "10px",
                      }}
                    >
                      halcyon
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center gap-4 f-mono text-[7px] tracking-[0.14em] uppercase text-fg-3">
                    <span>How</span>
                    <span>Pricing</span>
                    <span>Manifesto</span>
                  </div>
                  <div
                    className="px-3 py-1 bg-accent text-bg f-mono text-[7px] font-semibold tracking-[0.14em] uppercase"
                    style={{ borderRadius: "3px" }}
                  >
                    Start free
                  </div>
                </motion.div>

                {/* Hero */}
                <div className="px-6 py-6 md:py-7 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                    className="f-mono text-[0.48rem] tracking-[0.22em] uppercase text-accent mb-2"
                  >
                    Think deeply
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{ duration: 0.9, delay: 1.2 }}
                    className="text-fg mb-3"
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontVariationSettings: "'SOFT' 40, 'WONK' 0",
                      fontSize: "clamp(1.3rem, 2.4vw, 2rem)",
                      letterSpacing: "-0.028em",
                      lineHeight: 0.98,
                    }}
                  >
                    Deep work,
                    <br />
                    on demand.
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{ duration: 0.7, delay: 1.4 }}
                    className="text-fg-3 mb-4 mx-auto"
                    style={{
                      fontSize: "10px",
                      lineHeight: 1.5,
                      maxWidth: "30ch",
                    }}
                  >
                    An AI companion that shields your attention, shapes your
                    rituals, and measures what actually matters.
                  </motion.p>
                </div>

                {/* Focus chart — weekly bars, animated */}
                <div className="px-5 pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="f-mono text-fg-4"
                      style={{ fontSize: "7px", letterSpacing: "0.16em", textTransform: "uppercase" }}
                    >
                      This week · focus hours
                    </div>
                    <div
                      className="f-mono text-accent flex items-center gap-1"
                      style={{ fontSize: "7px", letterSpacing: "0.12em", textTransform: "uppercase" }}
                    >
                      <motion.span
                        className="inline-block w-[4px] h-[4px] rounded-full bg-accent"
                        animate={{ opacity: [1, 0.35, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity }}
                      />
                      Live
                    </div>
                  </div>
                  <div className="flex items-end justify-between gap-1.5 h-[58px] px-1 border-b border-rule/40">
                    {weekBars.map((b, i) => {
                      const isPeak = i === 4;
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-1">
                          <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: `${b.h * 100}%` }}
                            viewport={{ once: true, margin: "-8%" }}
                            transition={{
                              duration: 0.95,
                              delay: 1.7 + i * 0.08,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="w-full relative"
                            style={{
                              background: isPeak
                                ? "linear-gradient(180deg, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.4) 100%)"
                                : "linear-gradient(180deg, hsl(var(--accent) / 0.55) 0%, hsl(var(--accent) / 0.18) 100%)",
                              borderRadius: "1px",
                              boxShadow: isPeak ? "0 0 10px hsl(var(--accent) / 0.5)" : "none",
                            }}
                          >
                            {isPeak && (
                              <motion.span
                                className="absolute -top-[2px] left-1/2 -translate-x-1/2 w-[4px] h-[4px] rounded-full bg-accent"
                                animate={{
                                  boxShadow: [
                                    "0 0 0 0 hsl(var(--accent) / 0.8)",
                                    "0 0 0 5px hsl(var(--accent) / 0)",
                                  ],
                                }}
                                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                              />
                            )}
                          </motion.div>
                          <div
                            className="f-mono text-fg-4"
                            style={{ fontSize: "6px", letterSpacing: "0.08em" }}
                          >
                            {b.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Stat pills grid */}
                <div className="grid grid-cols-3 gap-2 px-5 pb-5 pt-2">
                  {stats.map((s, i) => (
                    <motion.div
                      key={s.big}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-8%" }}
                      transition={{
                        duration: 0.7,
                        delay: 2.35 + i * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative p-2.5 border border-rule/50 overflow-hidden"
                      style={{
                        background: "hsl(220 25% 6% / 0.85)",
                        borderRadius: "4px",
                      }}
                    >
                      <motion.div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(ellipse 60% 100% at 50% 100%, hsl(var(--accent) / 0.08) 0%, transparent 70%)",
                        }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{
                          duration: 3.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.4,
                        }}
                      />
                      <div
                        className="f-mono text-accent mb-1.5 relative"
                        style={{
                          fontSize: "6.5px",
                          letterSpacing: "0.22em",
                          fontWeight: 600,
                        }}
                      >
                        {s.code}
                      </div>
                      <div
                        className="text-fg font-medium mb-1 relative tabular-nums"
                        style={{
                          fontFamily: "'Fraunces', serif",
                          fontStyle: "italic",
                          fontSize: "14px",
                          lineHeight: 1.0,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {s.big}
                      </div>
                      <div
                        className="text-fg-4 relative"
                        style={{
                          fontSize: "7px",
                          lineHeight: 1.35,
                        }}
                      >
                        {s.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Terminal pane — streams the actual ship log */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.95, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 md:mt-7 relative overflow-hidden border border-rule-hi/70"
            style={{
              background:
                "linear-gradient(180deg, hsl(36 10% 6%) 0%, hsl(36 10% 3%) 100%)",
              boxShadow: "0 40px 100px -40px rgba(0,0,0,0.8)",
              borderRadius: "8px",
            }}
          >
            {/* Ambient sheen across the terminal */}
            <motion.div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(105deg, transparent 45%, hsl(var(--accent) / 0.04) 50%, transparent 55%)",
                mixBlendMode: "screen",
              }}
              animate={{ x: ["-120%", "120%"] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "linear", delay: 3 }}
            />

            {/* Terminal chrome */}
            <div
              className="relative flex items-center gap-3 px-4 py-2.5 border-b border-rule/70"
              style={{ background: "hsl(36 10% 9%)" }}
            >
              <div className="flex gap-1.5">
                <span className="w-[10px] h-[10px] rounded-full bg-ember/60" />
                <span className="w-[10px] h-[10px] rounded-full bg-fg-4" />
                <span className="w-[10px] h-[10px] rounded-full bg-accent/60" />
              </div>
              <div className="flex-1 text-center f-mono text-[0.5rem] tracking-[0.14em] uppercase text-fg-4">
                zsh · twinly ship halcyon
              </div>
              <div className="flex items-center gap-1.5">
                <Spinner />
                <span className="f-mono text-[0.44rem] tracking-[0.14em] uppercase text-accent">
                  Live
                </span>
              </div>
            </div>

            {/* Log body */}
            <div
              className="relative px-3 sm:px-4 md:px-6 py-4 md:py-5 text-[9.5px] sm:text-[11.5px] leading-[1.85] sm:leading-[1.95] text-left overflow-x-auto"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.35, delay: 2.7 }}
                className="text-accent"
              >
                <span className="text-fg-4">$</span> twinly ship halcyon --prod
              </motion.div>

              {[
                { t: "00:01", msg: "Design tokens · palette · type scale generated" },
                { t: "00:03", msg: "Copywriting pass · hero, manifesto, FAQ" },
                { t: "00:06", msg: "Created 47 files · 2,104 lines of TSX" },
                { t: "00:12", msg: "npm install · 412 packages · 0 vulns" },
                { t: "00:18", msg: "vite build · 12.8s · 218KB gzipped" },
                { t: "00:21", msg: "Lighthouse · perf 99 · a11y 100 · bp 98 · seo 100" },
                { t: "00:23", msg: "Domain registered · halcyon.app · Namecheap" },
                { t: "00:25", msg: "SSL provisioned · Let's Encrypt · auto-renew" },
                { t: "00:27", msg: "Deployed to edge · 214 regions · cold start 28ms" },
              ].map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{
                    duration: 0.35,
                    delay: 2.95 + i * 0.16,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center gap-3"
                >
                  <span className="text-fg-4 tabular-nums">[{line.t}]</span>
                  <span className="text-accent">✓</span>
                  <span className="text-fg-2">{line.msg}</span>
                </motion.div>
              ))}

              {/* Final URL with cursor */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.45, delay: 4.5 }}
                className="flex items-center gap-3 mt-2 pt-2 border-t border-rule/40"
              >
                <span className="text-fg-4 tabular-nums">[00:28]</span>
                <span className="text-accent">→</span>
                <a
                  className="text-accent font-semibold underline decoration-accent/50"
                  style={{ textDecorationThickness: "1px", textUnderlineOffset: "3px" }}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  https://halcyon.app
                </a>
                <span className="text-fg-3 f-mono text-[0.56rem] tracking-[0.12em] uppercase">
                  · Live · 1h 42m total
                </span>
                <motion.span
                  className="inline-block w-[7px] h-[13px] bg-accent ml-1"
                  animate={{ opacity: [1, 1, 0, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    times: [0, 0.5, 0.5, 1],
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      }
    />
  );
}
