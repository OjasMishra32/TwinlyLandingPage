import { motion } from "framer-motion";
import KeynoteSlide from "./KeynoteSlide";
import TypewriterText from "./TypewriterText";

/**
 * SlideCode, "I need a website." Twinly opens a code editor and a
 * live preview side by side. Code types into the editor, the preview
 * updates in sync, a Vercel deploy toast pops at the end.
 */
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
          You say one sentence. Twinly opens a code editor, writes the
          Next.js, previews it live, points a domain at it, and ships it
          to Vercel. You never touch a terminal.
        </>
      }
      align="center"
      spotlight
      visual={
        <div className="max-w-[1180px] mx-auto">
          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {/* Code editor mock */}
            <motion.div
              initial={{ opacity: 0, x: -30, rotateY: 6 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.95, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative border border-rule-hi bg-bg-2/75 backdrop-blur-sm overflow-hidden text-left"
              style={{
                boxShadow: "0 40px 100px -40px rgba(0,0,0,0.7)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Editor chrome */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-rule bg-bg-3/60">
                <span className="w-[10px] h-[10px] rounded-full bg-ember/60" />
                <span className="w-[10px] h-[10px] rounded-full bg-fg-4" />
                <span className="w-[10px] h-[10px] rounded-full bg-accent/60" />
                <span className="ml-3 f-mono text-[0.56rem] tracking-[0.14em] uppercase text-fg-3">
                  src/app/page.tsx
                </span>
                <span className="ml-auto f-mono text-[0.5rem] tracking-[0.14em] uppercase text-accent">
                  Writing…
                </span>
              </div>
              {/* Code body */}
              <div
                className="px-5 py-5 text-[12px] leading-[1.65] min-h-[320px]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <CodeLine line="1" delay={600} color="fg-3">
                  {`export default function Page() {`}
                </CodeLine>
                <CodeLine line="2" delay={900} color="fg" indent={2}>
                  {`return (`}
                </CodeLine>
                <CodeLine line="3" delay={1200} color="fg" indent={4}>
                  {`<main className="hero">`}
                </CodeLine>
                <CodeLine line="4" delay={1550} color="accent" indent={6}>
                  {`<h1>Meal planning, done.</h1>`}
                </CodeLine>
                <CodeLine line="5" delay={1900} color="fg" indent={6}>
                  {`<WaitlistForm />`}
                </CodeLine>
                <CodeLine line="6" delay={2200} color="fg" indent={4}>
                  {`</main>`}
                </CodeLine>
                <CodeLine line="7" delay={2400} color="fg" indent={2}>
                  {`)`}
                </CodeLine>
                <CodeLine line="8" delay={2600} color="fg-3">
                  {`}`}
                </CodeLine>
              </div>
            </motion.div>

            {/* Live preview mock */}
            <motion.div
              initial={{ opacity: 0, x: 30, rotateY: -6 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.95, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative border border-rule-hi bg-bg-2/50 backdrop-blur-sm overflow-hidden"
              style={{
                boxShadow: "0 40px 100px -40px hsl(var(--accent) / 0.25)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-3 px-4 py-2.5 border-b border-rule bg-bg-3/60">
                <div className="flex gap-1.5">
                  <span className="w-[10px] h-[10px] rounded-full bg-fg-4" />
                  <span className="w-[10px] h-[10px] rounded-full bg-fg-4" />
                  <span className="w-[10px] h-[10px] rounded-full bg-fg-4" />
                </div>
                <div className="flex-1 text-center f-mono text-[0.52rem] tracking-[0.14em] text-fg-3 truncate">
                  mealmap.app
                </div>
                <span className="f-mono text-[0.5rem] tracking-[0.14em] uppercase text-accent">
                  Live
                </span>
              </div>
              {/* Preview body */}
              <div className="px-6 md:px-8 py-10 md:py-14 min-h-[320px] flex flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.7, delay: 2.2 }}
                  className="f-mono text-[0.52rem] tracking-[0.2em] uppercase text-fg-4 mb-4"
                >
                  Eat without thinking
                </motion.div>
                <motion.h4
                  initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 1, delay: 2.35 }}
                  className="text-fg mb-5"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontVariationSettings: "'SOFT' 40",
                    fontSize: "clamp(1.5rem, 2.8vw, 2.6rem)",
                    letterSpacing: "-0.025em",
                    lineHeight: 0.96,
                  }}
                >
                  Meal planning,
                  <br />
                  done.
                </motion.h4>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.7, delay: 2.7 }}
                  className="w-full max-w-[280px] flex gap-0 border border-rule"
                >
                  <div className="flex-1 px-3 py-2 text-[10px] text-fg-3 text-left f-sans">
                    you@domain.com
                  </div>
                  <div className="px-3 py-2 bg-accent text-bg f-mono text-[0.52rem] tracking-[0.14em] uppercase font-semibold">
                    Join
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Deploy toast */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.7, delay: 3.1 }}
            className="mt-6 md:mt-8 flex items-center justify-center gap-3 f-mono text-[0.58rem] tracking-[0.22em] uppercase text-fg-2"
          >
            <span className="live-dot" />
            Deployed to Vercel · <span className="text-accent">mealmap.app live in 1h 42m</span>
          </motion.div>
        </div>
      }
    />
  );
}

function CodeLine({
  line,
  delay,
  indent = 0,
  color = "fg",
  children,
}: {
  line: string;
  delay: number;
  indent?: number;
  color?: "fg" | "fg-3" | "accent";
  children: string;
}) {
  const cls = color === "accent" ? "text-accent" : color === "fg-3" ? "text-fg-3" : "text-fg-2";
  return (
    <div className="flex">
      <span className="w-6 text-right mr-4 text-fg-4 select-none">{line}</span>
      <span style={{ paddingLeft: `${indent * 6}px` }} className={cls}>
        <TypewriterText as="span" text={children} delay={delay} speed={90} />
      </span>
    </div>
  );
}
