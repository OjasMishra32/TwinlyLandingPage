import { motion } from "framer-motion";
import RevealH2 from "./RevealH2";

const columns = [
  {
    era: "Then",
    title: "Chatbots & prompts",
    copy: "Impressive demos. Useful for writing. Still left every decision, handoff, and click to you.",
    muted: true,
  },
  {
    era: "Now",
    title: "Models that can act",
    copy: "Reasoning, tools, memory, structured action. Raw power — but most people don't want a dev kit.",
    muted: true,
  },
  {
    era: "What's missing",
    title: "Someone who knows you",
    copy: "The layer that turns raw capability into something that just works: tone, permissions, approvals, taste.",
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
            Thesis
            <br />
            <b>Why now</b>
          </div>
          <div>
            <RevealH2>
              AI got useful when it stopped being a <span className="tw-italic text-fg-3" style={{ textDecoration: "line-through", textDecorationColor: "hsl(var(--ember))" }}>toy</span>{" "}
              and started <span className="tw-italic text-accent">operating.</span>
            </RevealH2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 border-y border-rule">
          {columns.map((col, i) => (
            <motion.div
              key={col.era}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1 }}
              className={`relative p-8 md:p-10 border-rule ${i < 2 ? "md:border-r" : ""} ${
                col.highlight ? "bg-accent/[0.04]" : "bg-bg"
              } ${i < 2 ? "max-md:border-b" : ""}`}
            >
              <div className="flex items-center gap-2 f-mono text-[0.62rem] font-medium tracking-[0.16em] uppercase">
                <span
                  className="w-[7px] h-[7px] rounded-full"
                  style={{ background: col.highlight ? "hsl(var(--accent))" : "hsl(var(--fg-4))" }}
                />
                <span className={col.highlight ? "text-accent" : "text-fg-3"}>{col.era}</span>
              </div>
              <h3
                className={`mt-6 font-semibold ${col.highlight ? "text-fg" : "text-fg-3"}`}
                style={{ fontSize: "1.6rem", letterSpacing: "-0.025em", lineHeight: 1 }}
              >
                {col.title}
              </h3>
              <p className={`mt-3 text-[14px] leading-relaxed ${col.highlight ? "text-fg-2" : "text-fg-4"}`}>
                {col.copy}
              </p>
              {col.highlight && (
                <div className="absolute top-5 right-5 f-mono text-[0.58rem] font-medium tracking-[0.16em] text-accent">
                  Twinly
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
          className="mt-14 grid md:grid-cols-[auto_1fr] gap-8 items-start max-w-[960px]"
        >
          <div className="f-mono text-[0.58rem] font-medium tracking-[0.16em] uppercase text-fg-3 md:pt-3">
            <span className="text-accent">Pull quote</span>
            <br />
            06 / 01
          </div>
          <p
            className="text-fg font-serif italic"
            style={{
              fontSize: "clamp(1.5rem, 2.6vw, 2.4rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
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
