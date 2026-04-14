import { motion } from "framer-motion";

export default function Thesis() {
  return (
    <section id="thesis" className="relative py-32 md:py-40 overflow-hidden">
      <div className="mx-auto w-full max-w-[1100px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[820px]"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-white/60">
            06 · Why now
          </div>
          <h2 className="mt-6 text-balance font-semibold tracking-[-0.03em] text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.98]">
            AI became useful when it stopped being a{" "}
            <span className="font-serif-accent text-white/40 line-through decoration-twin-warm/50 decoration-2">toy</span>{" "}
            and started{" "}
            <span className="font-serif-accent text-gradient-twin">operating</span>.
          </h2>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {[
            {
              era: "Then",
              title: "Chatbots & prompts",
              copy: "Impressive demos. Useful for writing. Still left every actual decision, handoff, and click to you.",
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
              title: "An operator who knows you",
              copy: "The layer that turns that power into something consumer-safe: tone, permissions, approvals, taste.",
              highlight: true,
            },
          ].map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1 }}
              className={`relative rounded-2xl p-6 border ${col.highlight ? "border-twin-cyan/30 bg-twin-cyan/[0.03]" : "border-white/[0.06] bg-white/[0.015]"}`}
            >
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-white/40">
                <span className={`h-1.5 w-1.5 rounded-full ${col.highlight ? "bg-twin-cyan" : "bg-white/20"}`} />
                {col.era}
              </div>
              <h3 className={`mt-5 text-[19px] font-semibold tracking-tight ${col.highlight ? "text-white" : "text-white/70"}`}>
                {col.title}
              </h3>
              <p className={`mt-3 text-[13.5px] leading-relaxed ${col.highlight ? "text-white/75" : "text-white/45"}`}>
                {col.copy}
              </p>
              {col.highlight && (
                <div className="absolute top-5 right-5 font-mono text-[10px] text-twin-cyan">twinly</div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-14 max-w-[720px] font-serif-accent text-[clamp(1.4rem,2.4vw,2rem)] leading-snug text-white/70"
        >
          "The killer app for agentic AI isn't a smarter chatbot. It's a twin that already
          knows how you'd do it."
        </motion.p>
      </div>
    </section>
  );
}
