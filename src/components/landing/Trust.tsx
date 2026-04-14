import { motion } from "framer-motion";
import RevealH2 from "./RevealH2";

const items = [
  { title: "Editable memory", copy: "See what Twinly knows. Change, pin, or forget anything." },
  { title: "Approval thresholds", copy: "Set the bar: auto, preview, or always ask." },
  { title: "Visible action state", copy: "Live audit trail of what Twinly did, is doing, or waiting on." },
  { title: "Data you control", copy: "Encrypted end-to-end. Yours. Export or delete anytime." },
];

const timeline = [
  { label: "Checked calendar", t: "0.2s", done: true },
  { label: "Found 2 conflict-free windows", t: "0.4s", done: true },
  { label: "Matched your tone (last 14 replies)", t: "0.7s", done: true },
  { label: "Waiting for your approval", t: "now", done: false, active: true },
];

export default function Trust() {
  return (
    <section id="trust" className="sec border-t border-rule">
      <div className="w-full max-w-[1680px] mx-auto px-6 md:px-14">
        <div className="sec-head">
          <div className="sec-ident">
            <span className="num">
              05<span className="sl">/</span>
            </span>
            Trust
            <br />
            <b>Approval-first, by default</b>
          </div>
          <div>
            <RevealH2>
              You decide what <span className="tw-italic text-accent">moves.</span>
              <br />
              Everything stays <span className="tw-italic text-accent">visible.</span>
            </RevealH2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="sec-lede"
            >
              Twinly is approvals-first by default. <b>Every action is visible, every memory
              is editable, and every permission is yours</b> to grant or pull back in one tap.
            </motion.p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-12 items-start">
          <ul className="border-y border-rule">
            {items.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                className={`flex gap-5 py-6 px-2 items-start ${i < items.length - 1 ? "border-b border-rule" : ""}`}
              >
                <span className="f-mono text-[0.62rem] font-semibold tracking-[0.18em] text-accent pt-1">0{i + 1}</span>
                <div className="flex-1">
                  <div
                    className="font-semibold text-fg"
                    style={{ fontSize: "1.3rem", letterSpacing: "-0.025em", lineHeight: 1 }}
                  >
                    {item.title}
                  </div>
                  <div className="mt-1.5 text-[14px] text-fg-2 leading-relaxed">{item.copy}</div>
                </div>
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 shrink-0 text-accent">
                  <path d="M4 12l5 5 11-12" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                </svg>
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="panel relative overflow-hidden"
          >
            {/* Chrome */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-rule bg-bg-3 f-mono text-[0.62rem] font-medium tracking-[0.14em] uppercase text-fg-3">
              <span className="flex items-center gap-[10px] text-accent font-medium">
                <span className="live-dot" /> Approval required
              </span>
              <span className="text-fg-4">14:02:11</span>
            </div>

            <div className="p-5 md:p-6">
              <div className="border border-rule bg-bg p-5">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 border border-accent bg-accent/10 shrink-0 flex items-center justify-center text-accent text-[0.68rem] font-semibold">TW</div>
                  <div className="flex-1 min-w-0">
                    <div className="f-mono text-[0.58rem] font-medium tracking-[0.14em] uppercase text-fg-3">
                      Twinly <span className="text-fg-4">·</span> Draft <span className="text-fg-4">·</span> Reply to Lena
                    </div>
                    <div className="mt-2 text-[14px] text-fg">
                      <span className="text-fg-3">Subject:</span>{" "}
                      <b className="font-medium">Re: Thursday sync — let's shuffle</b>
                    </div>
                    <p className="mt-2 text-[13.5px] text-fg-2 leading-relaxed">
                      Hey Lena — something came up Thursday. Would Wed 9:30 or Tue 10:00 work
                      on your side? Sorry for the shuffle.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2 pt-4 border-t border-rule">
                  <button className="btn primary !py-2 !px-3 !text-[0.6rem]">
                    Approve &amp; send <span className="arrow" />
                  </button>
                  <button className="btn !py-2 !px-3 !text-[0.6rem]">
                    Edit
                  </button>
                  <button className="btn !py-2 !px-3 !text-[0.6rem] opacity-70">
                    Reject
                  </button>
                  <span className="ml-auto f-mono text-[0.58rem] tracking-[0.14em] uppercase text-fg-3">⌘↵ Approve</span>
                </div>
              </div>

              <div className="mt-5 space-y-1">
                {timeline.map((row) => (
                  <div
                    key={row.label}
                    className={`flex items-center justify-between px-3 py-2 text-[12.5px] border ${row.active ? "bg-accent/[0.08] border-accent/40 text-fg" : "border-rule text-fg-2"}`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-[6px] h-[6px] rounded-full"
                        style={{ background: row.active ? "hsl(var(--accent))" : row.done ? "hsl(var(--accent))" : "hsl(var(--rule-hi))" }}
                      />
                      {row.label}
                    </div>
                    <span className="f-mono text-[0.58rem] tracking-[0.14em] uppercase text-fg-3">{row.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
