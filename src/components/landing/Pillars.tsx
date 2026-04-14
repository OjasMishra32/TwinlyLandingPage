import { motion } from "framer-motion";

const pillars = [
  {
    label: "Memory",
    title: "Knows you.",
    copy: "Remembers your tone, preferences, people, and how you like things handled — editable, always.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M12 2a5 5 0 0 0-5 5v1a5 5 0 0 0-3 4.5A5 5 0 0 0 7 17v1a4 4 0 0 0 8 0v-1a5 5 0 0 0 3-4.5A5 5 0 0 0 17 8V7a5 5 0 0 0-5-5Z" stroke="currentColor" strokeWidth="1.4" />
        <path d="M12 8v11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Voice",
    title: "Writes like you.",
    copy: "Drafts replies in your tone — not a generic AI voice. Edit once, your twin learns.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M4 14h4l3 6 4-14 3 8h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Action",
    title: "Moves things forward.",
    copy: "Plans, gathers context, composes, and executes — across email, calendar, and tasks.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M5 12h10M13 7l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Approval",
    title: "Checks with you.",
    copy: "You set what Twinly does automatically and what always waits for your sign-off.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Pillars() {
  return (
    <section id="product" className="relative py-32 md:py-40">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[820px]"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-white/60">
            02 · What Twinly is
          </div>
          <h2 className="mt-6 text-balance font-semibold tracking-[-0.03em] text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.98]">
            Four parts of a{" "}
            <span className="font-serif-accent text-gradient-twin">twin</span>.
          </h2>
          <p className="mt-6 max-w-[600px] text-[17px] leading-relaxed text-white/60">
            Twinly isn't a bigger chatbot or a smarter workflow builder. It's the first layer
            that makes model intelligence feel like an operator who knows you.
          </p>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.015] p-6 overflow-hidden hover:bg-white/[0.035] transition-colors"
            >
              <div
                className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-twin-cyan/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                aria-hidden
              />
              <div className="flex items-center justify-between">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/30 text-twin-cyan">
                  {p.icon}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                  0{i + 1}
                </span>
              </div>
              <div className="mt-16">
                <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/50">
                  {p.label}
                </div>
                <h3 className="mt-2 text-[22px] font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-white/60">{p.copy}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
