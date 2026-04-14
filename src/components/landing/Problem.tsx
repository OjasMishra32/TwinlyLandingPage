import { motion, useReducedMotion } from "framer-motion";

const fragments = [
  { tag: "INBOX", body: "Re: Can we move Thursday? 3pm no longer works…", tilt: -5, x: -8, y: -10 },
  { tag: "CAL", body: "Thu 3:00 PM — Sync w/ Lena (no link)", tilt: 4, x: 16, y: -4 },
  { tag: "TAB", body: "amazon.com/returns/order-8234 — start return", tilt: -3, x: -16, y: 8 },
  { tag: "SLACK", body: "bump — still waiting on the vendor quote", tilt: 6, x: 10, y: 14 },
  { tag: "NOTE", body: "dentist · passport · birthday gift for M", tilt: -2, x: -18, y: -18 },
  { tag: "FORM", body: "Expense report · awaiting approval · 3 items", tilt: 5, x: 18, y: 2 },
];

export default function Problem() {
  const reduced = useReducedMotion();

  return (
    <section id="problem" className="sec">
      <div className="w-full max-w-[1680px] mx-auto px-6 md:px-14">
        <div className="sec-head">
          <div className="sec-ident">
            <span className="num">
              01<span className="sl">/</span>
            </span>
            THE PROBLEM
            <br />
            <b>FRAGMENTATION</b>
          </div>
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="sec-h2"
            >
              You don't want to manage <em className="tw-accent-word">tools.</em>
              <br />
              You want things <em className="tw-accent-word">handled.</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="sec-lede"
            >
              Life runs across <b>inboxes, calendars, open tabs, group chats, and
              half-finished forms</b>. Each one is a small tax on attention. Together, it's a
              full-time job no one signed up for.
            </motion.p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
          {/* Stat strip */}
          <div className="grid grid-cols-3 gap-0 border-y-[2px] border-ink">
            {[
              { n: "2.5", u: "H", l: "LOST / DAY" },
              { n: "74", u: "%", l: "REPETITIVE" },
              { n: "11+", u: "", l: "APPS / DAY" },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className={`py-8 px-5 ${i < 2 ? "border-r border-ink" : ""}`}
              >
                <div
                  className="font-black text-ink flex items-baseline gap-1"
                  style={{ fontSize: "clamp(3rem,6vw,5rem)", letterSpacing: "-0.04em", lineHeight: 0.88, fontStretch: "75%" }}
                >
                  {s.n}
                  <span className="text-accent font-medium" style={{ fontSize: "0.52em" }}>{s.u}</span>
                </div>
                <div className="mt-3 f-mono text-[0.6rem] font-medium tracking-[0.16em] uppercase text-ink-3">
                  {s.l}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Drifting fragments */}
          <div className="relative h-[500px] w-full">
            {fragments.map((f, i) => (
              <motion.div
                key={f.tag}
                initial={{ opacity: 0, y: 20, rotate: f.tilt }}
                whileInView={{ opacity: 1, y: 0, rotate: f.tilt }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                animate={
                  reduced
                    ? undefined
                    : {
                        y: [0, -5, 0],
                        transition: {
                          duration: 4 + i * 0.3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.2,
                        },
                      }
                }
                className="absolute bg-surface border-[1.5px] border-ink p-4 w-[min(86%,310px)]"
                style={{
                  left: `calc(50% + ${f.x}%)`,
                  top: `calc(50% + ${f.y}%)`,
                  transform: `translate(-50%, -50%) rotate(${f.tilt}deg)`,
                  boxShadow: "6px 6px 0 0 hsl(var(--ink))",
                }}
              >
                <div className="flex items-center justify-between f-mono text-[0.58rem] font-bold tracking-[0.18em] uppercase text-ink-3">
                  <span className="text-ink">{f.tag}</span>
                  <span className="diamond" style={{ background: "hsl(var(--amber))" }} />
                </div>
                <p className="mt-2 text-[13px] leading-snug text-ink font-medium">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
