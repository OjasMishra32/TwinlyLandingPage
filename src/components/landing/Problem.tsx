import { motion, useReducedMotion } from "framer-motion";

const fragments = [
  { tag: "Inbox", body: "Re: Can we move Thursday? The 3pm slot no longer works for me…", tilt: -6, x: -6, y: 2 },
  { tag: "Calendar", body: "Thu 3:00 PM — Sync with Lena (no link)", tilt: 4, x: 14, y: -8 },
  { tag: "Tab", body: "amazon.com/returns/order-8234 — start return", tilt: -3, x: -14, y: 10 },
  { tag: "Slack", body: "bump — still waiting on the vendor quote 👀", tilt: 5, x: 8, y: 14 },
  { tag: "Notes", body: "don't forget: dentist, renew passport, birthday gift for M", tilt: -2, x: -18, y: -14 },
  { tag: "Form", body: "Expense report · awaiting your approval · 3 items", tilt: 7, x: 18, y: 6 },
];

export default function Problem() {
  const reduced = useReducedMotion();

  return (
    <section id="problem" className="relative py-32 md:py-48 overflow-hidden">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-white/60">
              01 · The problem
            </div>
            <h2 className="mt-6 text-balance font-semibold tracking-[-0.03em] text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.98]">
              You don't want to{" "}
              <span className="font-serif-accent text-twin-cyan">manage tools.</span>
              <br />
              You want things{" "}
              <span className="font-serif-accent text-twin-violet">handled.</span>
            </h2>
            <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-white/60">
              Life runs across inboxes, calendars, open tabs, group chats, and half-finished
              forms. Each one is a small tax on attention. Put together, it's a full-time job
              no one signed up for.
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-6 max-w-[480px]">
              {[
                { n: "2.5h", l: "per day lost to admin" },
                { n: "74%", l: "of tasks are repetitive" },
                { n: "11+", l: "apps to coordinate" },
              ].map((s) => (
                <div key={s.l} className="border-l border-white/10 pl-4">
                  <dt className="font-serif-accent text-twin-cyan text-[28px] leading-none">{s.n}</dt>
                  <dd className="mt-2 text-[11px] font-mono uppercase tracking-wider text-white/50">{s.l}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <div className="relative h-[520px] w-full">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-twin-cyan/10 via-transparent to-twin-violet/10 blur-3xl opacity-60" />
            {fragments.map((f, i) => (
              <motion.div
                key={f.tag}
                initial={{ opacity: 0, y: 30, rotate: f.tilt }}
                whileInView={{ opacity: 1, y: 0, rotate: f.tilt }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.8,
                  delay: 0.05 + i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                animate={
                  reduced
                    ? undefined
                    : {
                        y: [0, -4, 0],
                        transition: {
                          duration: 4 + i * 0.3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.2,
                        },
                      }
                }
                className="absolute glass rounded-2xl px-5 py-4 w-[min(86%,320px)] shadow-2xl shadow-black/60"
                style={{
                  left: `calc(50% + ${f.x}%)`,
                  top: `calc(50% + ${f.y}%)`,
                  transform: `translate(-50%, -50%) rotate(${f.tilt}deg)`,
                }}
              >
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-white/50">
                  <span>{f.tag}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-twin-warm" />
                </div>
                <p className="mt-2 text-[13.5px] leading-snug text-white/85 line-clamp-2">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
