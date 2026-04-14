import { motion } from "framer-motion";

const items = [
  { title: "Editable memory", copy: "See what Twinly knows. Change, pin, or forget anything." },
  { title: "Approval thresholds", copy: "Set the bar: auto, preview, or always ask." },
  { title: "Visible action state", copy: "Live audit trail of what Twinly did, is doing, or waiting on." },
  { title: "Data you control", copy: "End-to-end encrypted. Yours. Export or delete anytime." },
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
            TRUST
            <br />
            <b>APPROVAL-FIRST</b>
          </div>
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9 }}
              className="sec-h2"
            >
              You decide what <em className="tw-accent-word">moves.</em>
              <br />
              Everything stays <em className="tw-accent-word">visible.</em>
            </motion.h2>
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
          <ul className="border-y-[2px] border-ink divide-y divide-rule">
            {items.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                className="flex gap-5 py-6 px-2 items-start"
              >
                <span className="f-mono text-[0.6rem] font-bold tracking-[0.18em] text-accent pt-1">0{i + 1}</span>
                <div className="flex-1">
                  <div
                    className="font-black text-ink"
                    style={{ fontSize: "1.3rem", letterSpacing: "-0.03em", lineHeight: 1, fontStretch: "75%" }}
                  >
                    {item.title}
                  </div>
                  <div className="mt-1.5 text-[13.5px] text-ink-2 leading-relaxed">{item.copy}</div>
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
            className="hard-panel bg-surface relative overflow-hidden"
          >
            {/* Chrome */}
            <div className="flex items-center justify-between px-5 py-4 border-b-[1.5px] border-ink bg-paper-2 f-mono text-[0.62rem] font-medium tracking-[0.16em] uppercase text-ink-3">
              <span className="flex items-center gap-[10px] text-accent font-bold">
                <span className="live-dot" /> APPROVAL REQUIRED
              </span>
              <span className="text-ink-4">TS · 14:02:11</span>
            </div>

            <div className="p-5 md:p-6">
              <div className="border-[1.5px] border-ink bg-paper p-5">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 border border-ink bg-accent shrink-0 flex items-center justify-center text-white text-[0.66rem] font-bold">TW</div>
                  <div className="flex-1 min-w-0">
                    <div className="f-mono text-[0.58rem] font-bold tracking-[0.16em] uppercase text-ink-3">
                      TWINLY <span className="text-ink-4">·</span> DRAFT <span className="text-ink-4">·</span> REPLY TO LENA
                    </div>
                    <div className="mt-2 text-[13.5px] text-ink">
                      <span className="text-ink-3">Subject:</span>{" "}
                      <b className="font-semibold">Re: Thursday sync — let's shuffle</b>
                    </div>
                    <p className="mt-2 text-[13px] text-ink-2 leading-relaxed">
                      Hey Lena — something came up Thursday. Would Wed 9:30 or Tue 10:00 work
                      on your side? Sorry for the shuffle.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2 pt-4 border-t border-rule">
                  <button className="btn primary !py-2 !px-3 !text-[0.6rem]">
                    APPROVE &amp; SEND <span className="arrow" />
                  </button>
                  <button className="btn !py-2 !px-3 !text-[0.6rem]">
                    EDIT
                  </button>
                  <button className="btn !py-2 !px-3 !text-[0.6rem] opacity-70">
                    REJECT
                  </button>
                  <span className="ml-auto f-mono text-[0.58rem] tracking-[0.16em] uppercase text-ink-3">⌘↵ APPROVE</span>
                </div>
              </div>

              <div className="mt-5 space-y-1">
                {timeline.map((row) => (
                  <div
                    key={row.label}
                    className={`flex items-center justify-between px-3 py-2 text-[12.5px] border border-ink/10 ${row.active ? "bg-accent/[0.07] border-accent/40 text-ink" : "text-ink-2"}`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-[6px] h-[6px] rounded-full"
                        style={{ background: row.active ? "hsl(var(--accent))" : row.done ? "hsl(var(--green))" : "hsl(var(--rule-hi))" }}
                      />
                      {row.label}
                    </div>
                    <span className="f-mono text-[0.58rem] tracking-[0.16em] uppercase text-ink-3">{row.t}</span>
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
