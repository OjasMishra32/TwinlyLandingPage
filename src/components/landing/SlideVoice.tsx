import { motion } from "framer-motion";
import KeynoteSlide from "./KeynoteSlide";
import TypewriterText from "./TypewriterText";
import { Check } from "./icons";

/**
 * SlideVoice — universal voice-matching demo. Same prompt, two drafts.
 * Left: what a generic AI writes to Comcast billing (stiff, corporate,
 * dead on arrival). Right: a real Gmail compose window with the twin
 * typing a human, specific, funny-but-direct dispute in the user's
 * actual voice. Cursor flies in, clicks Send, the compose window flips
 * to a "Sent · Primary inbox" confirmation.
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
          jokes, same sign-offs. It replies to your boss, disputes your bills,
          apologizes to your mom, and lands job offers, all in a voice nobody
          reading it questions.
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
            className="flex items-center justify-center gap-3 mb-6 md:mb-8 f-mono text-[0.56rem] md:text-[0.6rem] font-medium tracking-[0.22em] uppercase text-fg-3"
          >
            <span className="h-px w-8 bg-accent/60" />
            Prompt · "Get the $80 late fee off my Comcast bill"
            <span className="h-px w-8 bg-accent/60" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {/* Left: generic agent attempt — stiff, corporate, dead */}
            <motion.div
              initial={{ opacity: 0, x: -36, rotateY: 8 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.95,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative border border-rule p-4 sm:p-6 md:p-8 text-left bg-bg/45"
              style={{
                transformStyle: "preserve-3d",
                boxShadow: "0 30px 80px -40px rgba(0,0,0,0.6)",
              }}
            >
              <div className="flex items-center justify-between mb-4 sm:mb-5 f-mono text-[0.52rem] sm:text-[0.62rem] font-medium tracking-[0.18em] sm:tracking-[0.22em] uppercase">
                <span className="text-fg-4">Generic agent</span>
                <span className="text-ember">Not you</span>
              </div>
              <div className="text-[12px] sm:text-[15px] md:text-[16px] leading-[1.55] sm:leading-[1.7] text-fg-3">
                <p className="mb-3">
                  Dear Comcast Customer Service Representative,
                </p>
                <p className="mb-3">
                  I hope this message finds you well. I am writing to formally
                  dispute a late payment fee in the amount of $80.00 that has
                  been applied to my account during the most recent billing cycle.
                </p>
                <p className="mb-3">
                  I would greatly appreciate it if you could kindly review the
                  circumstances surrounding this charge and consider waiving
                  the aforementioned fee at your earliest convenience.
                </p>
                <p className="mb-3">
                  Please let me know if you require any additional documentation
                  to support my request. I look forward to your favorable response.
                </p>
                <p className="text-fg-4">Respectfully yours,</p>
              </div>
              <div
                className="absolute right-3 sm:right-4 top-3 sm:top-4 f-mono text-[0.46rem] sm:text-[0.54rem] tracking-[0.12em] sm:tracking-[0.14em] uppercase text-ember/70"
                style={{
                  padding: "2px 6px",
                  border: "1px solid hsl(var(--ember) / 0.4)",
                }}
              >
                Ignored
              </div>
            </motion.div>

            {/* Right: Gmail compose window — twin typing live */}
            <motion.div
              initial={{ opacity: 0, x: 36, rotateY: -8 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.95,
                delay: 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative border border-accent/50 text-left overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, hsl(var(--bg-2)) 0%, hsl(var(--bg)) 100%)",
                boxShadow: "0 40px 100px -30px hsl(var(--accent) / 0.22)",
                transformStyle: "preserve-3d",
                borderRadius: "4px",
              }}
            >
              {/* Gmail compose header */}
              <div
                className="flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3"
                style={{ background: "hsl(36 10% 11%)" }}
              >
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <span
                    className="w-[18px] h-[18px] sm:w-5 sm:h-5 flex items-center justify-center shrink-0"
                    style={{
                      background: "#ea4335",
                      borderRadius: "3px",
                      fontSize: "10px",
                      fontWeight: 800,
                      color: "#fff",
                    }}
                  >
                    M
                  </span>
                  <span className="text-[11px] sm:text-[13px] text-fg font-medium truncate">New message</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-2.5 text-fg-4 shrink-0">
                  <span style={{ fontSize: "12px" }}>–</span>
                  <span style={{ fontSize: "12px" }}>□</span>
                  <span style={{ fontSize: "12px" }}>×</span>
                </div>
              </div>

              {/* To / Subject */}
              <div className="px-4 sm:px-6 py-2.5 sm:py-3 border-b border-rule/40">
                <div className="flex items-center gap-2 sm:gap-3 py-1 sm:py-1.5">
                  <span className="f-mono text-[0.48rem] sm:text-[0.58rem] tracking-[0.12em] sm:tracking-[0.14em] uppercase text-fg-4 w-[52px] sm:w-[72px] shrink-0">
                    To
                  </span>
                  <span className="text-[11.5px] sm:text-[14px] text-fg-2 truncate min-w-0">
                    billing@comcast.com
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 py-1 sm:py-1.5">
                  <span className="f-mono text-[0.48rem] sm:text-[0.58rem] tracking-[0.12em] sm:tracking-[0.14em] uppercase text-fg-4 w-[52px] sm:w-[72px] shrink-0">
                    Subject
                  </span>
                  <span className="text-[11.5px] sm:text-[14px] text-fg font-medium truncate min-w-0">
                    $80 late fee · acct 8234192
                  </span>
                </div>
              </div>

              {/* Compose body — typewriter drafts the real voice */}
              <div className="px-4 sm:px-6 py-4 sm:py-5 min-h-[240px] sm:min-h-[280px] text-[12.5px] sm:text-[15.5px] md:text-[16px] leading-[1.55] sm:leading-[1.65] text-fg">
                <TypewriterText
                  as="div"
                  text="Hey,"
                  delay={500}
                  speed={70}
                />
                <div className="mt-2.5" />
                <TypewriterText
                  as="div"
                  text="Got hit with an $80 late fee last Tuesday. First one in 3 years. Auto-pay bounced because Chase replaced my card for fraud and I was in Tokyo for work, totally missed it."
                  delay={900}
                  speed={32}
                />
                <div className="mt-2.5" />
                <TypewriterText
                  as="div"
                  text="Any chance you can knock the $80 off? Been a customer since 2021, always on time, happy to stay. Would save me an annoying Reddit rant."
                  delay={6200}
                  speed={32}
                />
                <div className="mt-2.5" />
                <TypewriterText
                  as="div"
                  text="Thanks,"
                  delay={10800}
                  speed={60}
                />
                <TypewriterText
                  as="div"
                  text="Ojas"
                  delay={11400}
                  speed={80}
                />
              </div>

              {/* Gmail footer with Send button + cursor click */}
              <div
                className="relative flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-t border-rule/40"
                style={{ background: "hsl(36 10% 9%)" }}
              >
                <div className="relative h-[38px] sm:h-[40px] w-[118px] sm:w-[140px]">
                  <motion.button
                    type="button"
                    initial={{ opacity: 0 }}
                    whileInView={{
                      opacity: [0, 1, 1, 0],
                      scale: [1, 1, 0.94, 0.94],
                    }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                      duration: 0.6,
                      delay: 12.2,
                      times: [0, 0.15, 0.7, 1],
                    }}
                    className="absolute inset-0 w-full bg-accent text-bg flex items-center justify-center gap-2 f-mono text-[0.68rem] font-semibold tracking-[0.16em] uppercase"
                    style={{
                      borderRadius: "3px",
                      boxShadow:
                        "0 10px 22px -8px hsl(var(--accent) / 0.55)",
                    }}
                  >
                    Send
                    <span
                      style={{
                        display: "inline-block",
                        width: "12px",
                        height: "1.5px",
                        background: "currentColor",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          right: 0,
                          top: "-3px",
                          width: "5px",
                          height: "5px",
                          borderTop: "1.5px solid currentColor",
                          borderRight: "1.5px solid currentColor",
                          transform: "rotate(45deg)",
                        }}
                      />
                    </span>
                  </motion.button>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                      duration: 0.55,
                      delay: 12.9,
                      type: "spring",
                      damping: 16,
                      stiffness: 260,
                    }}
                    className="absolute inset-0 w-full flex items-center justify-center gap-2 border border-accent/60 bg-accent/10"
                    style={{ borderRadius: "3px" }}
                  >
                    <Check size={14} strokeWidth={3} className="text-accent" />
                    <span className="f-mono text-[0.66rem] font-semibold tracking-[0.16em] uppercase text-accent">
                      Sent · 0s
                    </span>
                  </motion.div>

                  {/* Cursor flying in to click Send */}
                  <motion.div
                    aria-hidden
                    initial={{ opacity: 0, x: 140, y: -50 }}
                    whileInView={{
                      opacity: [0, 1, 1, 1, 0],
                      x: [140, 90, 40, 14, 14],
                      y: [-50, -25, -6, 4, 4],
                      scale: [1, 1, 1, 0.82, 0.82],
                    }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                      duration: 1.7,
                      delay: 11.8,
                      times: [0, 0.3, 0.65, 0.88, 1],
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute left-[22px] top-[-10px] z-[4]"
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
                <div className="flex items-center gap-4 text-fg-4">
                  <span style={{ fontSize: "15px" }}>A̲</span>
                  <span style={{ fontSize: "15px" }}>📎</span>
                  <span style={{ fontSize: "15px" }}>🔗</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Outcome line */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 13.6 }}
            className="mt-7 md:mt-9 flex items-center justify-center gap-3 f-mono text-[0.54rem] md:text-[0.58rem] tracking-[0.22em] uppercase text-fg-4"
          >
            <span className="live-dot" />
            Reply in 4h · $80 credit applied · zero phone calls
          </motion.div>
        </div>
      }
    />
  );
}
