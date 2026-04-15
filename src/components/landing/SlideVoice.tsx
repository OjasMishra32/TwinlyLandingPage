import { motion } from "framer-motion";
import KeynoteSlide from "./KeynoteSlide";
import TypewriterText from "./TypewriterText";

/** "Writes like you" — before/after with typewriter on the twin draft */
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
          Twinly learns your tone from the replies you've already sent. Every
          draft reads like you wrote it at 3pm on a Tuesday — not a chatbot in
          a suit.
        </>
      }
      align="center"
      spotlight
      visual={
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-[1120px] mx-auto">
          {/* Generic agent email */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotateY: 8 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.95, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative border border-rule p-6 md:p-7 text-left bg-bg/40"
            style={{
              transformStyle: "preserve-3d",
              boxShadow: "0 30px 80px -40px rgba(0,0,0,0.6)",
            }}
          >
            <div className="flex items-center justify-between mb-4 f-mono text-[0.54rem] font-medium tracking-[0.22em] uppercase text-fg-4">
              <span>Generic agent</span>
              <span className="text-ember">Not you</span>
            </div>
            <div className="text-[14.5px] leading-[1.6] text-fg-3">
              <p className="mb-3">Dear Lena,</p>
              <p className="mb-3">
                I hope this email finds you well. Unfortunately, I am writing
                to inform you that I will be unable to attend our scheduled
                meeting on Thursday at 3:00 PM. I sincerely apologize for any
                inconvenience this may cause.
              </p>
              <p className="mb-3">
                Would you be available for an alternative time slot? I have
                availability on Wednesday or Friday. Please let me know at
                your earliest convenience.
              </p>
              <p>Best regards,</p>
            </div>
          </motion.div>

          {/* Twin draft — with typewriter effect */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: -8 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.95, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative border border-accent/50 p-6 md:p-7 text-left"
            style={{
              background:
                "linear-gradient(180deg, hsl(var(--accent) / 0.04) 0%, hsl(var(--bg) / 0.2) 100%)",
              boxShadow: "0 30px 80px -30px hsl(var(--accent) / 0.2)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="flex items-center justify-between mb-4 f-mono text-[0.54rem] font-medium tracking-[0.22em] uppercase text-accent">
              <span>Your twin</span>
              <span className="text-fg-3">Sounds like you</span>
            </div>
            <div className="text-[15px] leading-[1.7] text-fg min-h-[210px]">
              <TypewriterText
                as="div"
                text="Hey Lena — something came up Thursday. Would Wed 9:30 or Tue 10 work on your side?  Sorry for the shuffle.  — O"
                delay={600}
                speed={40}
              />
            </div>
          </motion.div>
        </div>
      }
    />
  );
}
