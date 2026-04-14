import { useState } from "react";
import { motion } from "framer-motion";

type Status = "idle" | "submitting" | "success" | "error";

const intents = [
  "File my taxes",
  "Plan the whole trip",
  "Do my homework",
  "Chase the refund",
  "Find me a place",
  "Run my inbox",
];

const FOUNDER_EMAIL = "founders@twinly.tech";

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

    const subject = encodeURIComponent(`Waitlist · ${email}`);
    const body = encodeURIComponent(
      [
        `Email: ${email}`,
        `Would hand over first: ${intent || "(not specified)"}`,
        "",
        "— Sent from twinly.tech waitlist",
      ].join("\n")
    );
    const mailto = `mailto:${FOUNDER_EMAIL}?subject=${subject}&body=${body}`;

    window.setTimeout(() => {
      window.location.href = mailto;
      setStatus("success");
    }, 400);
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
          <div className="sec-ident mb-7">
            <span className="num">
              07<span className="sl">/</span>
            </span>
            Request access
          </div>
          <h2
            className="tw-display text-fg"
            style={{
              fontSize: "clamp(3rem, 9vw, 10rem)",
              lineHeight: 0.96,
              letterSpacing: "-0.025em",
              maxWidth: "14ch",
              fontWeight: 400,
            }}
          >
            Meet your <span className="tw-italic text-accent">twin.</span>
          </h2>
          <p className="mt-8 max-w-[58ch] text-[17px] leading-relaxed text-fg-2 font-normal">
            We're letting people in a few at a time. Tell us what you'd hand
            over first — we'll bring you in when your twin is ready. Founders
            read every reply.
          </p>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-14 border-t border-rule pt-10"
        >
          <div className="flex flex-col md:flex-row gap-3 md:gap-0 max-w-[640px]">
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
              className="flex-1 h-14 bg-transparent border-b border-rule-hi md:border-b md:border-r-0 px-0 md:pr-5 text-[16px] text-fg placeholder:text-fg-3 focus:outline-none focus:border-accent f-sans transition-colors"
            />
            <button
              type="submit"
              disabled={status === "submitting" || status === "success"}
              className="btn primary h-14 min-w-[200px] justify-center !py-0 !px-6 disabled:opacity-80"
            >
              {status === "submitting" && "Opening mail…"}
              {status === "success" && (
                <>
                  Hit send
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
          {status === "success" && (
            <p className="mt-3 f-mono text-[0.62rem] tracking-[0.14em] uppercase text-accent">
              Your mail client opened — hit send and you're on the list.
            </p>
          )}

          <div className="mt-12">
            <div className="f-mono text-[0.58rem] font-medium tracking-[0.22em] uppercase text-fg-4 mb-4">
              What would you hand over first?
            </div>
            <div className="flex flex-wrap gap-2">
              {intents.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIntent((cur) => (cur === i ? "" : i))}
                  className={`f-mono text-[0.62rem] font-medium tracking-[0.1em] px-3 py-2 border transition-colors uppercase ${
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

          <div className="mt-12 pt-6 border-t border-rule flex flex-col md:flex-row md:items-center md:justify-between gap-3 f-mono text-[0.58rem] font-medium tracking-[0.18em] uppercase text-fg-4">
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
