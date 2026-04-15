import { motion } from "framer-motion";
import KeynoteSlide from "./KeynoteSlide";

/**
 * SlideHomework, "Do my homework." Source PDFs float in from the left,
 * a document writes itself in the middle, Canvas submit button on the
 * right pulses then flashes "SUBMITTED". An 8-year-old could trigger
 * this.
 */
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
          14 readings, an argued thesis, MLA bibliography, 1.2% Turnitin,
          in your voice at your grade level. Uploaded to Canvas before
          you finish your coffee.
        </>
      }
      align="center"
      spotlight
      visual={
        <div className="max-w-[1180px] mx-auto">
          <div className="grid md:grid-cols-[0.8fr_1.3fr_0.9fr] gap-5 md:gap-6 items-stretch">
            {/* Left: source PDFs */}
            <div className="flex flex-col gap-3">
              <div className="f-mono text-[0.5rem] tracking-[0.22em] uppercase text-fg-4 mb-1 pl-1">
                Reading 14 sources
              </div>
              {[
                { t: "Shklovsky · Art as Technique", p: "PDF · 18p" },
                { t: "Jakobson · Linguistics & Poetics", p: "PDF · 32p" },
                { t: "Eikhenbaum · Formal Method", p: "PDF · 24p" },
                { t: "Bakhtin · Discourse in the Novel", p: "PDF · 47p" },
              ].map((s, i) => (
                <motion.div
                  key={s.t}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative border border-rule bg-bg-2/60 px-3 py-2.5 text-left group"
                >
                  <div className="text-[11px] text-fg leading-tight mb-1 font-medium">
                    {s.t}
                  </div>
                  <div className="f-mono text-[0.48rem] tracking-[0.1em] uppercase text-fg-4">
                    {s.p}
                  </div>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{
                      duration: 1.4,
                      delay: 0.8 + i * 0.15,
                      ease: "linear",
                    }}
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-accent origin-left"
                  />
                </motion.div>
              ))}
              <div className="pl-1 f-mono text-[0.48rem] tracking-[0.18em] uppercase text-fg-3 mt-1">
                + 10 more · 31 total cited
              </div>
            </div>

            {/* Center: the paper writing itself */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative border border-rule-hi overflow-hidden text-left"
              style={{
                background: "hsl(var(--fg) / 0.96)",
                boxShadow: "0 50px 120px -40px rgba(0,0,0,0.8)",
              }}
            >
              <div className="px-5 py-3 border-b border-black/10 flex items-center justify-between bg-black/5">
                <div className="f-mono text-[0.5rem] tracking-[0.14em] uppercase text-black/50">
                  ENGL 402 · Final
                </div>
                <div className="f-mono text-[0.5rem] tracking-[0.14em] uppercase text-black/50">
                  Page 1 of 12
                </div>
              </div>
              <div className="px-6 md:px-8 py-6 md:py-8 min-h-[340px] text-black/85">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.7, delay: 1.1 }}
                  className="text-[10px] text-black/50 mb-2 text-center"
                  style={{ fontFamily: "'Times New Roman', serif" }}
                >
                  Ojasva Mishra · April 15, 2026
                </motion.div>
                <motion.h4
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.8, delay: 1.3 }}
                  className="text-center mb-6"
                  style={{
                    fontFamily: "'Times New Roman', serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    letterSpacing: "-0.005em",
                  }}
                >
                  Ostranenie and the Ordinary:
                  <br />
                  Shklovsky in Late-Modernist Prose
                </motion.h4>
                <div
                  className="text-[11px] leading-[1.75]"
                  style={{ fontFamily: "'Times New Roman', serif" }}
                >
                  <TypeBlock
                    delay={1700}
                    text="Viktor Shklovsky's concept of ostranenie, the defamiliarization of the everyday, anchors a surprising amount of late-modernist prose."
                  />
                  <TypeBlock
                    delay={3200}
                    text="In what follows I argue that writers like Woolf and Faulkner inherit this device not as a formal trick but as a moral imperative: to return us to things."
                  />
                  <TypeBlock
                    delay={4800}
                    text="Consider Mrs. Dalloway's opening walk through London. The clock strikes, the flowers are gathered, and the ordinary becomes strange."
                  />
                </div>
              </div>
            </motion.div>

            {/* Right: Canvas submit */}
            <div className="flex flex-col justify-between">
              <div className="f-mono text-[0.5rem] tracking-[0.22em] uppercase text-fg-4 mb-3 pl-1">
                Canvas · awaiting
              </div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.9, delay: 0.5 }}
                className="relative border border-rule-hi bg-bg-2/60 p-4 mb-4"
              >
                <div className="text-[11px] text-fg-3 mb-1">ENGL 402</div>
                <div className="text-[13px] text-fg font-medium leading-tight mb-4">
                  Final Paper · Formalism
                </div>
                <div className="f-mono text-[0.48rem] tracking-[0.16em] uppercase text-fg-4 mb-1">
                  Due
                </div>
                <div className="text-[12px] text-fg mb-4">
                  April 18 · 11:59pm
                </div>
                <motion.button
                  type="button"
                  initial={{ scale: 1 }}
                  whileInView={{
                    boxShadow: [
                      "0 0 0 0 hsl(var(--accent) / 0)",
                      "0 0 0 12px hsl(var(--accent) / 0)",
                      "0 0 0 0 hsl(var(--accent) / 0)",
                    ],
                  }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{
                    boxShadow: {
                      duration: 2,
                      delay: 5.5,
                      repeat: Infinity,
                    },
                  }}
                  className="w-full f-mono text-[0.58rem] font-semibold tracking-[0.18em] uppercase bg-accent text-bg py-2.5"
                >
                  Submit assignment
                </motion.button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.7, delay: 6.2, type: "spring" }}
                className="border border-accent bg-accent/[0.06] px-3 py-2 text-center"
              >
                <div className="f-mono text-[0.5rem] tracking-[0.18em] uppercase text-accent mb-1">
                  Turnitin
                </div>
                <div
                  className="text-fg"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "1.3rem",
                    letterSpacing: "-0.025em",
                    lineHeight: 1,
                  }}
                >
                  1.2%
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      }
    />
  );
}

function TypeBlock({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className="mb-3 text-black/80"
    >
      {text}
    </motion.p>
  );
}
