import { useState } from "react";
import { motion } from "framer-motion";

type Status = "idle" | "submitting" | "success" | "error";

const intents = [
  "Ship my landing page",
  "Apply to 40 jobs",
  "Negotiate my rent",
  "Debug my prod",
  "Run my outreach",
  "File my taxes",
];

const FOUNDER_EMAIL = "founders@twinly.tech";

/**
 * Waitlist backend endpoint. Set VITE_WAITLIST_ENDPOINT in your
 * hosting env (Vercel/Netlify project settings → environment
 * variables) to a Formspree form URL (https://formspree.io/f/XXXXX)
 * or any JSON-POST-accepting endpoint.
 *
 * Formspree setup (≈ 2 minutes, 50 free submissions / month):
 *   1. sign up at https://formspree.io
 *   2. create a new form, copy the endpoint URL
 *   3. set VITE_WAITLIST_ENDPOINT=https://formspree.io/f/XXXXX in Vercel
 *   4. redeploy — submissions appear in your Formspree dashboard
 *
 * Until the env var is set the form falls back to the mailto: flow
 * so nothing breaks in preview.
 */
const ENDPOINT = (import.meta.env.VITE_WAITLIST_ENDPOINT as string | undefined) || "https://formspree.io/f/mdayazgv";
const LOCAL_BACKUP_KEY = "twinly.waitlist.submissions";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [intent, setIntent] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/.+@.+\..+/.test(email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");

    const payload = {
      email,
      intent: intent || "(not specified)",
      source: "twinly.tech waitlist",
      submittedAt: new Date().toISOString(),
    };

    // Local backup — always store in localStorage so submissions
    // aren't lost if the backend is down or the env var is missing.
    try {
      const existing = JSON.parse(
        localStorage.getItem(LOCAL_BACKUP_KEY) || "[]"
      ) as unknown[];
      existing.push(payload);
      localStorage.setItem(LOCAL_BACKUP_KEY, JSON.stringify(existing));
    } catch {
      /* ignore storage failures (private mode, quota) */
    }

    if (!ENDPOINT) {
      // Simulate a network request
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.warn(
        "⚠️ No VITE_WAITLIST_ENDPOINT found. Submission was saved locally but not sent anywhere. Set up Formspree (or similar) to collect emails in production."
      );
      setStatus("success");
      return;
    }

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? `Submission failed (${err.message}). Try again or email us directly.`
          : "Submission failed. Try again or email us directly."
      );
    }
  }

  return (
    <section
      id="waitlist"
      className="relative w-full border-t border-rule/60 overflow-hidden min-h-[100svh] flex flex-col justify-center"
      style={{ padding: "clamp(96px, 13vh, 170px) 0" }}
    >
      <div className="relative w-full max-w-[1280px] mx-auto px-5 sm:px-8 md:px-14 flex flex-col items-center text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 md:mb-10 flex items-center gap-3 f-mono text-[0.56rem] font-medium tracking-[0.28em] uppercase text-fg-3"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="h-px w-8 bg-accent origin-left"
          />
          07 · Join the waitlist
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.2, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="text-fg"
          style={{
            fontFamily: "'Fraunces', serif",
            fontOpticalSizing: "auto",
            fontVariationSettings: "'SOFT' 40, 'WONK' 0",
            fontWeight: 400,
            fontSize: "clamp(2.3rem, 7.6vw, 9rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.028em",
            maxWidth: "14ch",
            paddingBottom: "0.08em",
          }}
        >
          Meet your <span className="tw-italic text-accent">twin.</span>
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.95, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 md:mt-9 text-fg-2 mx-auto"
          style={{
            fontSize: "clamp(1.1rem, 1.4vw, 1.4rem)",
            lineHeight: 1.52,
            maxWidth: "52ch",
            fontWeight: 400,
          }}
        >
          We're letting people in a few at a time. Tell us what you'd hand
          over first, and founders will read your reply.
        </motion.p>

        {/* Form */}
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.95, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 md:mt-20 w-full max-w-[680px] mx-auto"
        >
          {/* Email + submit */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 border-b border-rule-hi pb-1">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="you@domain.com"
              required
              className="flex-1 h-14 bg-transparent px-1 text-[16px] text-fg placeholder:text-fg-4 focus:outline-none f-sans text-left"
            />
            <button
              type="submit"
              disabled={status === "submitting" || status === "success"}
              className="btn primary h-14 w-full sm:w-auto sm:min-w-[200px] justify-center !py-0 !px-6 disabled:opacity-80"
            >
              {status === "submitting" && "Submitting…"}
              {status === "success" && (
                <>
                  You're on the list
                  <span className="arrow" />
                </>
              )}
              {(status === "idle" || status === "error") && (
                <>
                  Join the waitlist
                  <span className="arrow" />
                </>
              )}
            </button>
          </div>

          {status === "error" && errorMsg && (
            <p className="mt-3 f-mono text-[0.6rem] tracking-[0.18em] uppercase text-ember text-left">
              {errorMsg}
            </p>
          )}
          {status === "success" && (
            <p className="mt-3 f-mono text-[0.6rem] tracking-[0.18em] uppercase text-accent text-left">
              {ENDPOINT
                ? "We got it. Founders will reach out when your slot opens."
                : "You're on the local waitlist. (Set up Formspree for production)"}
            </p>
          )}

          {/* Intent chips */}
          <div className="mt-10 md:mt-12">
            <div className="f-mono text-[0.54rem] font-medium tracking-[0.24em] uppercase text-fg-4 mb-4">
              What would you hand over first?
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {intents.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIntent((cur) => (cur === i ? "" : i))}
                  className={`f-mono text-[0.6rem] font-medium tracking-[0.12em] px-3 py-2 border transition-colors uppercase ${
                    intent === i
                      ? "border-accent text-accent"
                      : "border-rule text-fg-3 hover:border-fg-3 hover:text-fg-2"
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          {/* Footnote */}
          <div className="mt-12 md:mt-16 pt-6 border-t border-rule flex flex-col md:flex-row md:items-center md:justify-between gap-3 f-mono text-[0.56rem] font-medium tracking-[0.2em] uppercase text-fg-4">
            <span>
              <b className="text-fg-2 font-medium">No spam, ever.</b>
              <span className="text-fg-4 mx-2">/</span>
              Privacy-first
            </span>
            <a
              href={`mailto:${FOUNDER_EMAIL}`}
              className="text-fg-3 hover:text-accent transition-colors"
            >
              or email us · {FOUNDER_EMAIL}
            </a>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
