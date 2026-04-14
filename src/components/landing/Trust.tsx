import { motion } from "framer-motion";

export default function Trust() {
  return (
    <section id="trust" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-twin-violet/5 blur-[140px]" />
      </div>
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-white/60">
              05 · Trust & controls
            </div>
            <h2 className="mt-6 text-balance font-semibold tracking-[-0.03em] text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.96]">
              You decide what{" "}
              <span className="font-serif-accent text-twin-cyan">moves</span>.
              <br />
              Everything else stays{" "}
              <span className="font-serif-accent text-twin-violet">visible.</span>
            </h2>
            <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-white/60">
              Twinly is approvals-first by default. Every action is visible, every memory is
              editable, and every permission is yours to grant or pull back in one tap.
            </p>

            <ul className="mt-10 space-y-4">
              {[
                { title: "Editable memory", copy: "See what Twinly knows. Change, pin, or forget anything." },
                { title: "Approval thresholds", copy: "Set the bar: auto, preview, or always ask." },
                { title: "Visible action state", copy: "Live audit trail of what Twinly did, is doing, or waiting on." },
                { title: "Data you control", copy: "End-to-end encrypted. Yours. Export or delete anytime." },
              ].map((item, i) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                  className="flex gap-4"
                >
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-twin-cyan/15 text-twin-cyan">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <div className="text-[15px] font-medium text-white/90">{item.title}</div>
                    <div className="text-[13.5px] text-white/55 mt-0.5">{item.copy}</div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative"
          >
            <div className="glass-strong border-glow rounded-3xl p-6 md:p-8 relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 grid-noise opacity-30" />
              <div className="relative flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-twin-cyan animate-pulse-soft" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/60">
                    Approval required
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/30">a few seconds ago</span>
              </div>

              <div className="relative rounded-xl border border-white/[0.06] bg-black/40 p-5">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-twin-cyan to-twin-violet shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-white/50">
                      <span>Twinly</span>
                      <span>·</span>
                      <span>Draft · Reply to Lena</span>
                    </div>
                    <p className="mt-2 text-[13.5px] text-white/90 leading-relaxed">
                      <span className="text-white/60">Subject:</span> Re: Thursday sync — let's shuffle
                    </p>
                    <p className="mt-2 text-[13px] text-white/70 leading-relaxed">
                      Hey Lena — something came up Thursday. Would Wed 9:30 or Tue 10:00 work on your side? Sorry for the shuffle.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2 pt-4 border-t border-white/5">
                  <button className="rounded-full bg-twin-cyan text-black px-3.5 py-1.5 text-[11px] font-semibold">
                    Approve & send
                  </button>
                  <button className="rounded-full border border-white/10 px-3.5 py-1.5 text-[11px] text-white/70">
                    Edit
                  </button>
                  <button className="rounded-full border border-white/10 px-3.5 py-1.5 text-[11px] text-white/50">
                    Reject
                  </button>
                  <span className="ml-auto text-[10px] font-mono text-white/30">⌘↵ to approve</span>
                </div>
              </div>

              <div className="relative mt-4 space-y-2">
                {[
                  { label: "Checked calendar", t: "0.2s" },
                  { label: "Found 2 conflict-free windows", t: "0.4s" },
                  { label: "Matched your tone (last 14 replies)", t: "0.7s" },
                  { label: "Waiting for your approval", t: "now", active: true },
                ].map((row) => (
                  <div
                    key={row.label}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-[12px] ${row.active ? "bg-twin-cyan/10 text-twin-cyan" : "text-white/50"}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full ${row.active ? "bg-twin-cyan animate-pulse-soft" : "bg-white/30"}`} />
                      {row.label}
                    </div>
                    <span className="font-mono text-[10px] opacity-60">{row.t}</span>
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
