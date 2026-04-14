import { useState } from "react";
import { motion } from "framer-motion";

type Status = "idle" | "submitting" | "success" | "error";

const intents = [
  "Reply in my voice",
  "Schedule / reschedule",
  "Compare & buy",
  "Follow up for me",
  "Returns & support",
  "Organize my day",
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
          <div className="inline-flex items-center gap-3 mb-7">
            <span className="live-dot" />
            <span className="f-mono text-[0.64rem] font-medium tracking-[0.22em] text-fg-2 uppercase">
              Request access
            </span>
          </div>
          <h2
            className="font-semibold text-fg"
            style={{
              fontSize: "clamp(3rem, 9vw, 10rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.045em",
              maxWidth: "14ch",
            }}
          >
            Meet your <span className="tw-italic text-accent">twin.</span>
          </h2>
          <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-fg-2 font-normal">
            We're letting people in a few at a time. Tell us what you'd hand over first —
            we'll bring you in when your twin is ready.
          </p>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-12 panel p-6 md:p-8"
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
              className="flex-1 h-14 bg-bg border border-rule-hi px-5 text-[15px] text-fg placeholder:text-fg-3 focus:outline-none focus:border-accent focus:bg-bg-2 f-sans transition-colors"
            />
            <button
              type="submit"
              disabled={status === "submitting" || status === "success"}
              className="btn primary h-14 min-w-[200px] justify-center !py-0 !px-6 md:-ml-[1px] disabled:opacity-80"
            >
              {status === "submitting" && "Adding you…"}
              {status === "success" && (
                <>
                  You're in
                  <span className="arrow" />
                </>
              )}
              {(status === "idle" || status === "error") && (
                <>
                  Request access
                  <span className="arrow" />
                </>
              )}
            </button>
          </div>

          {status === "error" && (
            <p className="mt-3 f-mono text-[0.62rem] tracking-[0.14em] uppercase text-ember">
              Please enter a valid email
            </p>
          )}

          <div className="mt-8">
            <div className="f-mono text-[0.62rem] font-medium tracking-[0.18em] uppercase text-fg-3 mb-3">
              What would you hand over first?
            </div>
            <div className="flex flex-wrap gap-2">
              {intents.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIntent((cur) => (cur === i ? "" : i))}
                  className={`f-mono text-[0.64rem] font-medium tracking-[0.08em] px-3 py-2 border transition-colors uppercase ${
                    intent === i
                      ? "border-accent bg-accent text-bg"
                      : "border-rule-hi text-fg-2 hover:border-accent hover:text-accent"
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-rule flex items-center justify-between f-mono text-[0.6rem] font-medium tracking-[0.14em] uppercase text-fg-3">
            <span>
              <b className="text-fg font-medium">No spam, ever.</b>
              <span className="text-fg-4 mx-2">/</span>
              Privacy-first
            </span>
            <span className="flex items-center gap-2">
              <span className="live-dot" />
              Rolling access
            </span>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
