import { motion } from "framer-motion";

const cases = [
  {
    code: "01",
    title: "Reply in your voice.",
    summary: "Drafts responses that sound like you — across email, DMs, and work threads.",
    input: "You forward the thread.",
    approval: "Approve before sending.",
  },
  {
    code: "02",
    title: "Schedule & reschedule.",
    summary: "Finds conflict-free windows, holds slots, and negotiates the shuffle for you.",
    input: "You say who and when-ish.",
    approval: "Final confirm before it lands.",
  },
  {
    code: "03",
    title: "Compare & buy.",
    summary: "Researches options to your taste, shortlists, and lines up checkout with the best pick.",
    input: "You describe what you need.",
    approval: "Never charges without you.",
  },
  {
    code: "04",
    title: "Follow up for me.",
    summary: "Tracks who owes you what, and nudges politely — on your schedule.",
    input: "You point at the thread.",
    approval: "Preview the nudge before it goes.",
  },
  {
    code: "05",
    title: "Returns & support.",
    summary: "Handles returns, claims, and support loops without the copy-paste runaround.",
    input: "You share the order.",
    approval: "You approve each step.",
  },
  {
    code: "06",
    title: "Organize my day.",
    summary: "Clears the noise, surfaces what matters, and sets you up for a clean morning.",
    input: "Twinly runs overnight.",
    approval: "Morning digest, not decisions.",
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="sec border-t border-rule">
      <div className="w-full max-w-[1680px] mx-auto px-6 md:px-14">
        <div className="sec-head">
          <div className="sec-ident">
            <span className="num">
              04<span className="sl">/</span>
            </span>
            Hand-over
            <br />
            <b>Six things to let go of</b>
          </div>
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9 }}
              className="sec-h2"
            >
              Six things you'll <span className="tw-italic text-accent">never</span> do again.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="sec-lede"
            >
              Start with the small stuff. <b>Twinly earns trust by handling the annoying,
              repetitive, low-stakes work first</b> — so you can stop thinking about it.
            </motion.p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-y border-rule">
          {cases.map((c, i) => (
            <motion.article
              key={c.code}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: 0.06 * i }}
              className={`group relative p-6 md:p-8 bg-bg hover:bg-bg-2 transition-colors border-rule
                lg:[&:nth-child(3n+1)]:border-r lg:[&:nth-child(3n+2)]:border-r
                lg:[&:nth-child(-n+3)]:border-b
                sm:max-lg:[&:nth-child(odd)]:border-r
                sm:max-lg:[&:nth-child(-n+4)]:border-b
                max-sm:[&:not(:last-child)]:border-b`}
            >
              <div className="flex items-center justify-between">
                <span className="f-mono text-[0.62rem] font-semibold tracking-[0.18em] text-accent">
                  {c.code}
                </span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-fg-3 group-hover:text-accent group-hover:translate-x-1 transition-all">
                  <path d="M2 8h12M10 2l4 6-4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                </svg>
              </div>
              <h3
                className="mt-14 font-semibold text-fg"
                style={{ fontSize: "1.7rem", letterSpacing: "-0.025em", lineHeight: 0.98 }}
              >
                {c.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-fg-2">{c.summary}</p>
              <div className="mt-6 grid grid-cols-2 gap-3 pt-4 border-t border-rule">
                <div>
                  <div className="f-mono text-[0.58rem] font-medium tracking-[0.16em] uppercase text-fg-3">Input</div>
                  <div className="mt-1 text-[12.5px] text-fg">{c.input}</div>
                </div>
                <div>
                  <div className="f-mono text-[0.58rem] font-medium tracking-[0.16em] uppercase text-fg-3">Approval</div>
                  <div className="mt-1 text-[12.5px] text-fg">{c.approval}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
