import { motion } from "framer-motion";
import KeynoteSlide from "./KeynoteSlide";

/**
 * SlideCode — "Build me a website." Full macOS editor window with
 * a real Next.js file typed into it, a browser window rendering a
 * polished landing page preview, and a build-pipeline strip below.
 * This is what ships — not 8 lines of placeholder JSX.
 */

type CodeLine = {
  indent: number;
  tokens: Array<{ text: string; cls?: string }>;
};

const code: CodeLine[] = [
  { indent: 0, tokens: [{ text: "import", cls: "tk-k" }, { text: " { Suspense } " }, { text: "from", cls: "tk-k" }, { text: " " }, { text: '"react"', cls: "tk-s" }, { text: ";" }] },
  { indent: 0, tokens: [{ text: "import", cls: "tk-k" }, { text: " { Hero } " }, { text: "from", cls: "tk-k" }, { text: " " }, { text: '"@/components/Hero"', cls: "tk-s" }, { text: ";" }] },
  { indent: 0, tokens: [{ text: "import", cls: "tk-k" }, { text: " { FeatureGrid } " }, { text: "from", cls: "tk-k" }, { text: " " }, { text: '"@/components/FeatureGrid"', cls: "tk-s" }, { text: ";" }] },
  { indent: 0, tokens: [{ text: "import", cls: "tk-k" }, { text: " { Waitlist } " }, { text: "from", cls: "tk-k" }, { text: " " }, { text: '"@/components/Waitlist"', cls: "tk-s" }, { text: ";" }] },
  { indent: 0, tokens: [{ text: "" }] },
  { indent: 0, tokens: [{ text: "export default function ", cls: "tk-k" }, { text: "Page", cls: "tk-f" }, { text: "() {" }] },
  { indent: 1, tokens: [{ text: "return", cls: "tk-k" }, { text: " (" }] },
  { indent: 2, tokens: [{ text: "<", cls: "tk-p" }, { text: "main", cls: "tk-t" }, { text: " className", cls: "tk-a" }, { text: "=" }, { text: '"bg-ink min-h-screen"', cls: "tk-s" }, { text: ">", cls: "tk-p" }] },
  { indent: 3, tokens: [{ text: "<", cls: "tk-p" }, { text: "Hero", cls: "tk-c" }] },
  { indent: 4, tokens: [{ text: "title", cls: "tk-a" }, { text: "=" }, { text: '"Meal planning, done."', cls: "tk-s" }] },
  { indent: 4, tokens: [{ text: "tagline", cls: "tk-a" }, { text: "=" }, { text: '"One photo. Every meal."', cls: "tk-s" }] },
  { indent: 3, tokens: [{ text: "/>", cls: "tk-p" }] },
  { indent: 3, tokens: [{ text: "<", cls: "tk-p" }, { text: "FeatureGrid", cls: "tk-c" }, { text: " ", }, { text: "items", cls: "tk-a" }, { text: "={features} />", cls: "tk-p" }] },
  { indent: 3, tokens: [{ text: "<", cls: "tk-p" }, { text: "Suspense", cls: "tk-c" }, { text: " " }, { text: "fallback", cls: "tk-a" }, { text: "={<" }, { text: "Skeleton", cls: "tk-c" }, { text: "/>}>" }] },
  { indent: 4, tokens: [{ text: "<", cls: "tk-p" }, { text: "Waitlist", cls: "tk-c" }, { text: " />", cls: "tk-p" }] },
  { indent: 3, tokens: [{ text: "</", cls: "tk-p" }, { text: "Suspense", cls: "tk-c" }, { text: ">", cls: "tk-p" }] },
  { indent: 2, tokens: [{ text: "</", cls: "tk-p" }, { text: "main", cls: "tk-t" }, { text: ">", cls: "tk-p" }] },
  { indent: 1, tokens: [{ text: ");" }] },
  { indent: 0, tokens: [{ text: "}" }] },
];

const features = [
  {
    code: "01",
    title: "Snap your fridge",
    body: "One photo. We identify every ingredient.",
  },
  {
    code: "02",
    title: "AI picks recipes",
    body: "Dietary, budget, and taste, all accounted for.",
  },
  {
    code: "03",
    title: "Delivered tonight",
    body: "Missing ingredients arrive in 90 minutes.",
  },
];

export default function SlideCode() {
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
        <div className="max-w-[1280px] mx-auto">
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
              {/* Chrome bar */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-rule/70 bg-bg-3/50">
                <div className="flex gap-1.5">
                  <span className="w-[10px] h-[10px] rounded-full bg-ember/60" />
                  <span className="w-[10px] h-[10px] rounded-full bg-fg-4" />
                  <span className="w-[10px] h-[10px] rounded-full bg-accent/60" />
                </div>
                <div className="flex items-center gap-4 ml-2 f-mono text-[0.52rem] tracking-[0.14em] uppercase">
                  <span className="text-accent">page.tsx</span>
                  <span className="text-fg-4">hero.tsx</span>
                  <span className="text-fg-4">layout.tsx</span>
                </div>
                <div className="ml-auto flex items-center gap-2 f-mono text-[0.5rem] tracking-[0.18em] uppercase text-accent">
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

              {/* Code area with line numbers */}
              <div
                className="flex text-[11.5px] leading-[1.85]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {/* Line number gutter */}
                <div className="flex-shrink-0 pt-4 pb-6 pl-4 pr-3 text-right text-fg-4 select-none border-r border-rule/40">
                  {code.map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                {/* Code lines */}
                <div className="flex-1 pt-4 pb-6 pl-4 pr-5 overflow-hidden">
                  {code.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-8%" }}
                      transition={{
                        duration: 0.35,
                        delay: 0.4 + i * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{ paddingLeft: `${line.indent * 18}px` }}
                      className="whitespace-pre"
                    >
                      {line.tokens.map((t, j) => (
                        <span key={j} className={t.cls || "text-fg-2"}>
                          {t.text}
                        </span>
                      ))}
                    </motion.div>
                  ))}
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
                  "linear-gradient(180deg, hsl(36 10% 7%) 0%, hsl(36 10% 4%) 100%)",
                boxShadow:
                  "0 50px 120px -40px hsl(var(--accent) / 0.22), 0 40px 100px -50px rgba(0,0,0,0.7)",
                transformStyle: "preserve-3d",
                borderRadius: "8px",
              }}
            >
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
                    background: "hsl(36 10% 12%)",
                    borderRadius: "6px",
                  }}
                >
                  mealmap.app
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
                    "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(var(--accent) / 0.05) 0%, transparent 55%), linear-gradient(180deg, hsl(36 10% 5%) 0%, hsl(36 10% 3%) 100%)",
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
                    <div className="w-4 h-4 bg-accent" />
                    <span
                      className="text-fg"
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontStyle: "italic",
                        fontSize: "10px",
                      }}
                    >
                      mealmap
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center gap-4 f-mono text-[7px] tracking-[0.14em] uppercase text-fg-3">
                    <span>How</span>
                    <span>Pricing</span>
                    <span>Faq</span>
                  </div>
                  <div
                    className="px-3 py-1 bg-accent text-bg f-mono text-[7px] font-semibold tracking-[0.14em] uppercase"
                    style={{ borderRadius: "3px" }}
                  >
                    Join
                  </div>
                </motion.div>

                {/* Hero */}
                <div className="px-6 py-7 md:py-9 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                    className="f-mono text-[0.48rem] tracking-[0.22em] uppercase text-accent mb-2"
                  >
                    Eat without thinking
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
                    Meal planning,
                    <br />
                    done.
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
                      maxWidth: "28ch",
                    }}
                  >
                    One photo of your fridge. Every meal, planned. Missing
                    ingredients at the door by dinner.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{ duration: 0.6, delay: 1.6 }}
                    className="inline-flex items-stretch w-full max-w-[240px] mx-auto border border-rule/60"
                    style={{ borderRadius: "3px" }}
                  >
                    <div
                      className="flex-1 px-3 py-2 text-left text-fg-4"
                      style={{ fontSize: "9px" }}
                    >
                      you@domain.com
                    </div>
                    <div
                      className="px-3 py-2 bg-accent text-bg f-mono font-semibold tracking-[0.14em] uppercase"
                      style={{ fontSize: "8px" }}
                    >
                      Join
                    </div>
                  </motion.div>
                </div>

                {/* Feature grid */}
                <div className="grid grid-cols-3 gap-2 px-5 pb-5">
                  {features.map((f, i) => (
                    <motion.div
                      key={f.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-8%" }}
                      transition={{
                        duration: 0.7,
                        delay: 1.75 + i * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="p-2.5 border border-rule/50"
                      style={{
                        background: "hsl(36 10% 6% / 0.8)",
                        borderRadius: "4px",
                      }}
                    >
                      <div
                        className="f-mono text-accent mb-2"
                        style={{
                          fontSize: "7px",
                          letterSpacing: "0.2em",
                          fontWeight: 600,
                        }}
                      >
                        {f.code}
                      </div>
                      <div
                        className="text-fg font-medium mb-1"
                        style={{
                          fontSize: "9px",
                          lineHeight: 1.15,
                        }}
                      >
                        {f.title}
                      </div>
                      <div
                        className="text-fg-4"
                        style={{
                          fontSize: "7.5px",
                          lineHeight: 1.35,
                        }}
                      >
                        {f.body}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Build pipeline strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.9, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 md:mt-7 border border-rule-hi/70 flex items-center gap-0 overflow-hidden"
            style={{
              background:
                "linear-gradient(180deg, hsl(36 10% 8%) 0%, hsl(36 10% 5%) 100%)",
              borderRadius: "6px",
            }}
          >
            {[
              { k: "Repo", v: "mealmap/web" },
              { k: "Build", v: "14.3s" },
              { k: "Lighthouse", v: "98" },
              { k: "Deploy", v: "mealmap.app" },
            ].map((s, i) => (
              <div
                key={s.k}
                className={`flex-1 flex items-center gap-3 px-4 py-3 ${i < 3 ? "border-r border-rule/60" : ""}`}
              >
                <div
                  className="flex items-center justify-center w-7 h-7 border border-accent/50 shrink-0 f-mono text-accent tabular-nums"
                  style={{
                    background: "hsl(var(--accent) / 0.08)",
                    fontSize: "0.55rem",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                  }}
                >
                  0{i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="f-mono text-[0.48rem] tracking-[0.2em] uppercase text-fg-4">
                    {s.k}
                  </div>
                  <div className="f-mono text-[0.64rem] font-medium text-fg truncate tabular-nums">
                    {s.v}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      }
    />
  );
}
