import { ReactNode } from "react";
import { motion } from "framer-motion";
import SplineRobot from "./SplineRobot";

const BASE = 0.15;

function Line({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden" style={{ padding: "0.04em 0" }}>
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.05, delay: BASE + delay, ease: [0.22, 1, 0.36, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function Fade({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: BASE + delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
      style={{ padding: "120px 0 48px" }}
    >
      <div className="absolute top-[-40px] right-0 w-[68%] h-[calc(100%+80px)] z-[1] max-[980px]:w-full max-[980px]:opacity-40">
        <SplineRobot />
      </div>

      <div className="relative z-[4] w-full max-w-[1680px] mx-auto px-6 md:px-14">
        <Fade delay={0}>
          <div className="eyebrow mb-7">
            <span className="flex items-center gap-3 text-[0.62rem] font-medium tracking-[0.22em] text-ink-3 whitespace-nowrap">
              <span className="diamond" />
              <span><b className="text-accent font-bold">TWN-001</b></span>
              <span className="text-rule-hi">/</span>
              <span>PERSONAL OPERATOR</span>
              <span className="text-rule-hi">/</span>
              <span className="text-ink-4">REV · 01</span>
            </span>
            <span className="flex items-center gap-3.5 text-[0.82rem] font-bold tracking-[0.14em] text-ink whitespace-nowrap">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.9, ease: [0.7, 0, 0.3, 1] }}
                className="inline-block w-[34px] h-[1.5px] bg-ink origin-left"
              />
              <span>PRIVATE BETA · 2026</span>
              <span className="text-ink-2 font-medium">· NOT A CHATBOT</span>
            </span>
          </div>
        </Fade>

        <h1
          className="tw-display text-ink mb-6"
          style={{
            fontSize: "clamp(2.8rem, 7vw, 8rem)",
            lineHeight: 0.86,
            letterSpacing: "-0.055em",
            maxWidth: "14ch",
          }}
        >
          <Line delay={0}>Not a chatbot.</Line>
          <Line delay={0.08}>
            <span>
              A <span className="tw-accent-word">twin</span> of you
            </span>
          </Line>
          <Line delay={0.16}>
            that gets things <span className="tw-accent-word">done.</span>
          </Line>
        </h1>

        <Fade delay={0.5}>
          <p
            className="text-ink-2 mb-7"
            style={{
              maxWidth: "40ch",
              fontSize: "clamp(1rem, 1.15vw, 1.22rem)",
              lineHeight: 1.4,
              fontWeight: 500,
            }}
          >
            Twinly learns how you <strong className="text-ink font-bold">write</strong>, what you
            <strong className="text-ink font-bold"> prefer</strong>, and how you like things
            handled — then it drafts, schedules, follows up, and moves life-admin forward with
            your <strong className="text-ink font-bold">approval</strong>.
          </p>
        </Fade>

        <Fade delay={0.65}>
          <div className="flex gap-3.5 flex-wrap mb-11">
            <a href="#waitlist" className="btn primary">
              <span className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.42) 50%, transparent 80%)", transform: "translateX(-150%)", transition: "transform 1.1s cubic-bezier(.22,1,.36,1)", mixBlendMode: "overlay" }} />
              Request access
              <span className="arrow" />
            </a>
            <a href="#demo" className="btn">
              See the demo
              <span className="arrow" />
            </a>
          </div>
        </Fade>

        <Fade delay={0.8}>
          <div
            className="grid gap-9 pt-[22px] border-t-[2px] border-ink max-w-[620px]"
            style={{ gridTemplateColumns: "repeat(3, auto)" }}
          >
            {[
              { k: "TASKS / DAY", v: "12", em: "avg" },
              { k: "MINUTES SAVED", v: "148", em: "median" },
              { k: "APPROVED AUTO", v: "94", em: "%" },
            ].map((kv) => (
              <div key={kv.k} className="flex flex-col gap-1">
                <span className="f-mono text-[0.58rem] font-medium tracking-[0.16em] uppercase text-ink-3">
                  {kv.k}
                </span>
                <span
                  className="font-black text-ink"
                  style={{ fontSize: "1.45rem", letterSpacing: "-0.03em", fontStretch: "75%" }}
                >
                  {kv.v}
                  <em className="not-italic text-accent ml-1">{kv.em}</em>
                </span>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}
