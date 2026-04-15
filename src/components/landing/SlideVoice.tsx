import { motion } from "framer-motion";
import KeynoteSlide from "./KeynoteSlide";

/** "Writes like you" slide — before/after email side-by-side */
export default function SlideVoice() {
  return (
    <KeynoteSlide
      id="voice"
      eyebrow="Capability 01 · Voice"
      headline={
        <>
          Writes exactly <span className="tw-italic text-accent">like you.</span>
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
      visual={
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-[1120px] mx-auto">
          {/* Generic GPT draft */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative border border-rule p-6 md:p-7 text-left bg-bg/40"
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

          {/* Twin draft in your voice */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative border border-accent/50 p-6 md:p-7 text-left"
            style={{
              background:
                "linear-gradient(180deg, hsl(var(--accent) / 0.03) 0%, hsl(var(--bg) / 0.2) 100%)",
              boxShadow: "0 20px 60px -30px hsl(var(--accent) / 0.15)",
            }}
          >
            <div className="flex items-center justify-between mb-4 f-mono text-[0.54rem] font-medium tracking-[0.22em] uppercase text-accent">
              <span>Your twin</span>
              <span className="text-fg-3">Sounds like you</span>
            </div>
            <div className="text-[15px] leading-[1.6] text-fg">
              <p className="mb-3">Hey Lena —</p>
              <p className="mb-3">
                Something came up Thursday. Would Wed 9:30 or Tue 10 work on
                your side?
              </p>
              <p className="mb-3">Sorry for the shuffle.</p>
              <p>— O</p>
            </div>
          </motion.div>
        </div>
      }
    />
  );
}
