import { useState } from "react";
import { motion } from "framer-motion";

type Status = "idle" | "submitting" | "success" | "error";

const intents = [
  "REPLY IN MY VOICE",
  "SCHEDULE / RESCHEDULE",
  "COMPARE & BUY",
  "FOLLOW UP FOR ME",
  "RETURNS & SUPPORT",
  "ORGANIZE MY DAY",
];

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [intent, setIntent] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/.+@.+\..+/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 900);
  }

  return (
    <section id="waitlist" className="sec border-t border-rule">
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9 }}
          className="max-w-[880px]"
        >
          <div className="eyebrow mb-6">
            <span className="flex items-center gap-3 text-[0.62rem] font-medium tracking-[0.22em] text-ink-3 uppercase">
              <span className="diamond" />
              <b className="text-accent font-bold">REQUEST ACCESS</b>
              <span className="text-rule-hi">/</span>
              PRIVATE BETA · 2026
            </span>
          </div>
          <h2
            className="font-black text-ink"
            style={{
              fontSize: "clamp(3rem, 9vw, 10rem)",
              lineHeight: 0.84,
              letterSpacing: "-0.055em",
              maxWidth: "13ch",
              fontStretch: "75%",
            }}
          >
            Meet your <em className="tw-accent-word">twin.</em>
          </h2>
          <p className="mt-6 max-w-[56ch] text-[17px] leading-relaxed text-ink-2 font-medium">
            Early access rolls out quietly. Tell us what you'd hand over first and we'll bring
            you in when your twin is ready.
          </p>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-12 hard-panel bg-surface p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row gap-3 md:gap-0">
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
              placeholder="you@domain.com"
              required
              className="flex-1 h-14 bg-paper border-[1.5px] border-ink px-5 text-[15px] placeholder:text-ink-3 focus:outline-none focus:bg-surface f-sans transition-colors"
            />
            <button
              type="submit"
              disabled={status === "submitting" || status === "success"}
              className="btn primary h-14 min-w-[200px] justify-center !py-0 !px-6 md:-ml-[1.5px] md:border-l-0 disabled:opacity-80"
            >
              {status === "submitting" && "ADDING YOU…"}
              {status === "success" && (
                <>
                  YOU'RE IN
                  <span className="arrow" />
                </>
              )}
              {(status === "idle" || status === "error") && (
                <>
                  REQUEST ACCESS
                  <span className="arrow" />
                </>
              )}
            </button>
          </div>

          {status === "error" && (
            <p className="mt-3 f-mono text-[0.6rem] tracking-[0.16em] uppercase text-red-600">
              ERROR · VALID EMAIL REQUIRED
            </p>
          )}

          <div className="mt-8">
            <div className="f-mono text-[0.6rem] font-bold tracking-[0.18em] uppercase text-ink-3 mb-3">
              WHAT WOULD YOU HAND OVER FIRST?
            </div>
            <div className="flex flex-wrap gap-2">
              {intents.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIntent((cur) => (cur === i ? "" : i))}
                  className={`f-mono text-[0.6rem] font-semibold tracking-[0.14em] px-3 py-2 border-[1.5px] transition-colors ${
                    intent === i
                      ? "border-accent bg-accent text-white"
                      : "border-ink text-ink hover:bg-ink hover:text-paper"
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-rule flex items-center justify-between f-mono text-[0.58rem] font-medium tracking-[0.16em] uppercase text-ink-3">
            <span>
              <b className="text-ink">NO SPAM · EVER</b>
              <span className="text-rule-hi mx-2">/</span>
              PRIVACY-FIRST
            </span>
            <span className="flex items-center gap-2">
              <span className="live-dot" />
              QUIET ROLLOUT · 2026
            </span>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
