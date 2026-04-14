import { motion } from "framer-motion";
import RevealH2 from "./RevealH2";

export default function Problem() {
  return (
    <section id="problem" className="sec">
      <div className="w-full max-w-[1680px] mx-auto px-6 md:px-14">
        <div className="sec-head">
          <div className="sec-ident">
            <span className="num">
              01<span className="sl">/</span>
            </span>
            The problem
          </div>
          <div>
            <RevealH2>
              You don't want to manage <span className="tw-italic text-accent">tools.</span>
              <br />
              You want things <span className="tw-italic text-accent">handled.</span>
            </RevealH2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="sec-lede"
            >
              Life runs across <b>inboxes, calendars, open tabs, group chats, and
              half-finished forms</b>. Each one is a small tax on attention. Together, it's a
              full-time job no one signed up for.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-rule max-w-[1080px]">
          {[
            { n: "2.5", u: "h", l: "Lost per day" },
            { n: "74", u: "%", l: "Purely repetitive" },
            { n: "11+", u: "", l: "Apps every day" },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`py-10 md:py-14 px-2 md:px-6 ${
                i < 2 ? "md:border-r border-rule" : ""
              } ${i > 0 ? "max-md:border-t border-rule" : ""}`}
            >
              <div
                className="font-semibold text-fg flex items-baseline gap-1"
                style={{
                  fontSize: "clamp(2.8rem,5.5vw,4.6rem)",
                  letterSpacing: "-0.035em",
                  lineHeight: 0.88,
                }}
              >
                {s.n}
                <span
                  className="text-accent font-serif italic font-normal"
                  style={{ fontSize: "0.52em" }}
                >
                  {s.u}
                </span>
              </div>
              <div className="mt-3 f-mono text-[0.58rem] font-medium tracking-[0.18em] uppercase text-fg-3">
                {s.l}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
