import { motion } from "framer-motion";

const columns = [
  {
    era: "THEN",
    title: "Chatbots & prompts",
    copy: "Impressive demos. Useful for writing. Still left every decision, handoff, and click to you.",
    muted: true,
  },
  {
    era: "NOW",
    title: "Models that can act",
    copy: "Reasoning, tools, memory, structured action. Raw power — but most people don't want a dev kit.",
    muted: true,
  },
  {
    era: "WHAT'S MISSING",
    title: "An operator who knows you",
    copy: "The layer that turns that power into something consumer-safe: tone, permissions, approvals, taste.",
    highlight: true,
  },
];

export default function Thesis() {
  return (
    <section id="thesis" className="sec border-t border-rule">
      <div className="w-full max-w-[1680px] mx-auto px-6 md:px-14">
        <div className="sec-head">
          <div className="sec-ident">
            <span className="num">
              06<span className="sl">/</span>
            </span>
            THESIS
            <br />
            <b>WHY NOW</b>
          </div>
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9 }}
              className="sec-h2"
            >
              AI got useful when it stopped being a{" "}
              <em className="tw-accent-word" style={{ textDecoration: "line-through", textDecorationColor: "hsl(var(--amber))" }}>
                toy
              </em>{" "}
              and started <em className="tw-accent-word">operating.</em>
            </motion.h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-0 border-y-[2px] border-ink">
          {columns.map((col, i) => (
            <motion.div
              key={col.era}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1 }}
              className={`relative p-8 md:p-10 border-ink ${i < 2 ? "md:border-r" : ""} ${
                col.highlight ? "bg-accent/[0.04]" : "bg-paper"
              } ${i < 2 ? "max-md:border-b" : ""}`}
            >
              <div className="flex items-center gap-2 f-mono text-[0.6rem] font-bold tracking-[0.18em] uppercase">
                <span
                  className="w-[7px] h-[7px] rotate-45"
                  style={{ background: col.highlight ? "hsl(var(--accent))" : "hsl(var(--ink-3))" }}
                />
                <span className={col.highlight ? "text-accent" : "text-ink-3"}>{col.era}</span>
              </div>
              <h3
                className={`mt-6 font-black ${col.highlight ? "text-ink" : "text-ink-2"}`}
                style={{ fontSize: "1.55rem", letterSpacing: "-0.03em", lineHeight: 1, fontStretch: "75%" }}
              >
                {col.title}
              </h3>
              <p className={`mt-3 text-[13.5px] leading-relaxed ${col.highlight ? "text-ink-2" : "text-ink-3"}`}>
                {col.copy}
              </p>
              {col.highlight && (
                <div className="absolute top-5 right-5 f-mono text-[0.58rem] font-bold tracking-[0.16em] text-accent">
                  TWINLY
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-14 grid md:grid-cols-[auto_1fr] gap-8 items-start max-w-[900px]"
        >
          <div className="f-mono text-[0.58rem] font-bold tracking-[0.18em] uppercase text-ink-3 md:pt-2">
            <span className="text-accent">PULL QUOTE</span>
            <br />
            06 / 01
          </div>
          <p
            className="text-ink"
            style={{
              fontSize: "clamp(1.3rem, 2.2vw, 1.85rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              fontStyle: "italic",
              fontWeight: 500,
            }}
          >
            "The killer app for agentic AI isn't a smarter chatbot. It's a twin that already
            knows how you'd do it."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
