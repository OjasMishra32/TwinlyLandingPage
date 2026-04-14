import { motion } from "framer-motion";

const cases = [
  {
    title: "Reply in your voice.",
    summary: "Drafts responses that sound like you — across email, DMs, and work threads.",
    input: "You forward the thread.",
    approval: "Approve before sending.",
    accent: "from-twin-cyan/40 to-transparent",
  },
  {
    title: "Schedule & reschedule.",
    summary: "Finds conflict-free windows, holds slots, and negotiates the shuffle for you.",
    input: "You say who and when-ish.",
    approval: "Final confirm before it lands.",
    accent: "from-twin-violet/40 to-transparent",
  },
  {
    title: "Compare & buy.",
    summary: "Researches options to your taste, shortlists, and lines up checkout with the best pick.",
    input: "You describe what you need.",
    approval: "Never charges without you.",
    accent: "from-twin-warm/30 to-transparent",
  },
  {
    title: "Follow up for me.",
    summary: "Keeps track of who owes you what, and nudges — politely — on your schedule.",
    input: "You point at the thread.",
    approval: "Preview the nudge before it goes.",
    accent: "from-twin-cyan/40 to-transparent",
  },
  {
    title: "Returns & support.",
    summary: "Handles returns, claims, and support loops without the copy-paste runaround.",
    input: "You share the order.",
    approval: "You approve each step.",
    accent: "from-twin-violet/40 to-transparent",
  },
  {
    title: "Organize my day.",
    summary: "Clears the noise, surfaces what actually matters, and sets you up for a clean morning.",
    input: "Twinly does it while you sleep.",
    approval: "Morning digest, not decisions.",
    accent: "from-twin-warm/30 to-transparent",
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="relative py-32 md:py-40">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div className="max-w-[620px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-white/60">
              04 · What you'll hand over
            </div>
            <h2 className="mt-6 text-balance font-semibold tracking-[-0.03em] text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.98]">
              Six things you'll{" "}
              <span className="font-serif-accent text-twin-cyan">never</span>{" "}
              do again.
            </h2>
          </div>
          <p className="max-w-[360px] text-[15.5px] text-white/55 leading-relaxed">
            Start with the small stuff. Twinly earns trust by handling the annoying,
            repetitive, low-stakes work first — so you can stop thinking about it.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 hover:bg-white/[0.035] transition-colors"
            >
              <div className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${c.accent} blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700`} />
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                  Case / 0{i + 1}
                </span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-white/30 group-hover:text-twin-cyan group-hover:translate-x-0.5 transition-all">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="mt-16 text-[22px] font-semibold tracking-tight leading-tight">{c.title}</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/60">{c.summary}</p>
              <div className="mt-6 grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                <div>
                  <div className="text-[9px] font-mono uppercase tracking-wider text-white/35">
                    Your input
                  </div>
                  <div className="mt-1 text-[12px] text-white/70">{c.input}</div>
                </div>
                <div>
                  <div className="text-[9px] font-mono uppercase tracking-wider text-white/35">
                    Approval
                  </div>
                  <div className="mt-1 text-[12px] text-white/70">{c.approval}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
