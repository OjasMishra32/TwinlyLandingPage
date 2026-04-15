import { motion } from "framer-motion";
import KineticHeadline from "./KineticHeadline";

const items = [
  {
    title: "Editable memory",
    copy: "See what Twinly knows. Change, pin, or forget anything.",
  },
  {
    title: "Approval thresholds",
    copy: "Set the bar per domain: auto, preview, or always ask.",
  },
  {
    title: "Visible action state",
    copy: "A live audit trail of what Twinly did, is doing, or is waiting on.",
  },
  {
    title: "Data you control",
    copy: "Encrypted end-to-end. Yours. Export or delete anytime.",
  },
];

export default function Trust() {
  return (
    <section id="trust" className="sec border-t border-rule">
      <div className="w-full max-w-[1680px] mx-auto px-6 md:px-14">
        <div className="sec-head">
          <div className="sec-ident">
            <span className="num">
              06<span className="sl">/</span>
            </span>
            Trust
          </div>
          <div>
            <KineticHeadline>
              You decide what <span className="tw-italic text-accent">moves.</span>
              <br />
              Everything stays <span className="tw-italic text-accent">visible.</span>
            </KineticHeadline>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="sec-lede"
            >
              Twinly is approvals-first by default. Every action is visible,
              every memory is editable, and every permission is yours to grant
              or pull back in one tap.
            </motion.p>
          </div>
        </div>

        <ul className="grid md:grid-cols-2 gap-x-12 max-w-[1080px]">
          {items.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.08 * i }}
              className="flex gap-5 py-8 border-t border-rule"
            >
              <span className="f-mono text-[0.58rem] font-medium tracking-[0.18em] text-fg-4 pt-1 w-8 shrink-0">
                0{i + 1}
              </span>
              <div className="flex-1">
                <div
                  className="font-semibold text-fg mb-2"
                  style={{
                    fontSize: "1.35rem",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                  }}
                >
                  {item.title}
                </div>
                <div className="text-[14px] text-fg-2 leading-relaxed max-w-[44ch]">
                  {item.copy}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
