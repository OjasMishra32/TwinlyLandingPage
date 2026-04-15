import { motion } from "framer-motion";
import KeynoteSlide from "./KeynoteSlide";
import TypewriterText from "./TypewriterText";

/**
 * SlideVoice: high-stakes cold outreach example. Twinly needs to show
 * it can handle the hard stuff, so the before/after here is an actual
 * VC pitch email where voice + brevity matter. Left: stiff corporate
 * AI. Right: real founder voice with numbers, personality, and a call.
 */
export default function SlideVoice() {
  return (
    <KeynoteSlide
      id="voice"
      eyebrow="Capability 01 · Voice"
      headline={
        <>
          Writes exactly{" "}
          <span className="tw-italic text-accent">like you.</span>
        </>
      }
      body={
        <>
          Trained on every word you've already written. Same cadence, same
          hedges, same sign-offs. It sends cold-pitches to investors, replies
          to your boss, and lands job offers, all in a voice nobody reading
          it questions.
        </>
      }
      align="center"
      spotlight
      visual={
        <div className="w-full max-w-[1240px] mx-auto">
          {/* Prompt line above both cards */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-3 mb-7 md:mb-9 f-mono text-[0.56rem] md:text-[0.6rem] font-medium tracking-[0.24em] uppercase text-fg-3"
          >
            <span className="h-px w-8 bg-accent/60" />
            Prompt · "Cold-email Marc Andreessen about our seed round"
            <span className="h-px w-8 bg-accent/60" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 md:gap-7">
            {/* Left: generic agent pitch, stiff + corporate */}
            <motion.div
              initial={{ opacity: 0, x: -40, rotateY: 10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.95,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative border border-rule p-6 md:p-7 text-left bg-bg/45"
              style={{
                transformStyle: "preserve-3d",
                boxShadow: "0 30px 80px -40px rgba(0,0,0,0.6)",
              }}
            >
              <div className="flex items-center justify-between mb-5 f-mono text-[0.52rem] font-medium tracking-[0.22em] uppercase">
                <span className="text-fg-4">Generic agent</span>
                <span className="text-ember">Not you</span>
              </div>
              <div className="text-[13.5px] md:text-[14px] leading-[1.7] text-fg-3">
                <p className="mb-3">Dear Mr. Andreessen,</p>
                <p className="mb-3">
                  I hope this email finds you well. My name is Ojas Mishra,
                  and I am the founder of Twinly, an innovative AI platform
                  that leverages cutting-edge machine learning to deliver
                  best-in-class personal productivity solutions.
                </p>
                <p className="mb-3">
                  I am reaching out to explore potential partnership
                  opportunities and would be honored to have the chance to
                  schedule a 30-minute introductory call at your earliest
                  convenience to discuss our vision.
                </p>
                <p>Respectfully yours,</p>
              </div>
            </motion.div>

            {/* Right: the twin draft, typed live */}
            <motion.div
              initial={{ opacity: 0, x: 40, rotateY: -10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.95,
                delay: 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative border border-accent/50 p-6 md:p-7 text-left"
              style={{
                background:
                  "linear-gradient(180deg, hsl(var(--accent) / 0.05) 0%, hsl(var(--bg) / 0.25) 100%)",
                boxShadow: "0 40px 100px -30px hsl(var(--accent) / 0.22)",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="flex items-center justify-between mb-5 f-mono text-[0.52rem] font-medium tracking-[0.22em] uppercase">
                <span className="text-accent">Your twin</span>
                <span className="text-fg-3">Sounds like you</span>
              </div>
              <div className="text-[14px] md:text-[15px] leading-[1.72] text-fg min-h-[260px]">
                <TypewriterText
                  as="div"
                  text="Marc,"
                  delay={600}
                  speed={70}
                />
                <div className="mt-2" />
                <TypewriterText
                  as="div"
                  text="Twinly. A personal operator trained on your own writing. 200 beta users, 94% auto-approval rate. Raising $3M seed."
                  delay={900}
                  speed={45}
                />
                <div className="mt-3" />
                <TypewriterText
                  as="div"
                  text="I know you get 8,000 cold inbounds a month. This one is different: go to twinly.tech, and it will reply to this email in my exact voice by the time you finish reading."
                  delay={3900}
                  speed={45}
                />
                <div className="mt-3" />
                <TypewriterText
                  as="div"
                  text="2-minute Loom if you want one. Or pass. No hard feelings."
                  delay={8800}
                  speed={50}
                />
                <div className="mt-3" />
                <TypewriterText
                  as="div"
                  text="· Ojas"
                  delay={10600}
                  speed={70}
                />
              </div>
            </motion.div>
          </div>

          {/* Note under the cards */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 md:mt-10 flex items-center justify-center gap-3 f-mono text-[0.54rem] md:text-[0.58rem] tracking-[0.22em] uppercase text-fg-4"
          >
            <span className="live-dot" />
            Same prompt · 2 drafts · 1 of them actually lands
          </motion.div>
        </div>
      }
    />
  );
}
