import { useState } from "react";
import { motion } from "framer-motion";

type Status = "idle" | "submitting" | "success" | "error";

const intents = [
  "Reply in my voice",
  "Schedule & reschedule",
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
    <section id="waitlist" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-twin-cyan/10 via-twin-violet/5 to-transparent blur-[140px]" />
      </div>

      <div className="mx-auto w-full max-w-[880px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-twin-cyan/30 bg-twin-cyan/[0.05] px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-twin-cyan">
            Request access
          </div>
          <h2 className="mt-6 text-balance font-semibold tracking-[-0.035em] text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.94]">
            Meet your{" "}
            <span className="font-serif-accent text-gradient-twin">twin</span>.
          </h2>
          <p className="mt-6 max-w-[560px] mx-auto text-[17px] leading-relaxed text-white/60">
            Early access rolls out quietly. Tell us what you'd hand over first and we'll bring
            you in when your twin is ready.
          </p>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 glass-strong border-glow rounded-3xl p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                placeholder="you@domain.com"
                required
                className="w-full h-14 rounded-2xl bg-black/40 border border-white/10 px-5 text-[15px] placeholder:text-white/30 focus:outline-none focus:border-twin-cyan/60 focus:ring-2 focus:ring-twin-cyan/20 transition"
              />
            </div>
            <button
              type="submit"
              disabled={status === "submitting" || status === "success"}
              className="h-14 rounded-2xl bg-white text-black px-7 text-[14px] font-semibold hover:bg-twin-cyan transition-colors disabled:opacity-70 disabled:cursor-default inline-flex items-center justify-center gap-2 min-w-[180px]"
            >
              {status === "submitting" && "Adding you…"}
              {status === "success" && (
                <>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3 3 7-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  You're in
                </>
              )}
              {(status === "idle" || status === "error") && (
                <>
                  Request access
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </>
              )}
            </button>
          </div>

          {status === "error" && (
            <p className="mt-3 text-[12px] text-red-300/80 font-mono">Please enter a valid email.</p>
          )}

          <div className="mt-6">
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/40 mb-3">
              What would you hand over first?
            </div>
            <div className="flex flex-wrap gap-2">
              {intents.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIntent((cur) => (cur === i ? "" : i))}
                  className={`rounded-full px-3.5 py-1.5 text-[12px] border transition-colors ${
                    intent === i
                      ? "border-twin-cyan/60 bg-twin-cyan/10 text-twin-cyan"
                      : "border-white/10 bg-white/[0.02] text-white/60 hover:text-white/80"
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-white/30">
            <span>No spam. Ever.</span>
            <span>Quiet rollout · 2026</span>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
