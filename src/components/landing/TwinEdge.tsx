import { motion } from "framer-motion";
import RevealH2 from "./RevealH2";

type Claim = {
  code: string;
  headline: string;
  headlineAccent: string;
  proof: string;
};

const claims: Claim[] = [
  {
    code: "01",
    headline: "Memory that",
    headlineAccent: "compounds.",
    proof:
      "The longer you use it, the more it writes things you'd have written yourself. A generic agent forgets you the second the tab closes.",
  },
  {
    code: "02",
    headline: "Parallel, like your",
    headlineAccent: "life is parallel.",
    proof:
      "Five jobs in flight. Three waiting on your nod. One nearly done. A twin runs a whole week's worth of you simultaneously.",
  },
  {
    code: "03",
    headline: "Sounds exactly",
    headlineAccent: "like you.",
    proof:
      "Learns your voice from your own writing — cadence, hedges, sign-offs. Nobody who reads a reply asks 'wait, is this AI?'.",
  },
  {
    code: "04",
    headline: "Across the",
    headlineAccent: "whole stack.",
    proof:
      "Inbox, banks, forms, browser, files, calendar, phone calls. Your twin lives where your life actually happens, not in a chat window.",
  },
  {
    code: "05",
    headline: "Approval,",
    headlineAccent: "not anarchy.",
    proof:
      "You decide what runs free and what waits at the gate. Nothing ships, spends, or sends until you've set the policy or tapped approve.",
  },
];

function ClaimRow({ c }: { c: Claim }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid md:grid-cols-[72px_1fr_400px] gap-6 md:gap-14 items-start py-14 md:py-20 border-t border-rule"
    >
      {/* Index number — small, restrained */}
      <div className="md:pt-5">
        <span className="f-mono text-[0.58rem] font-medium tracking-[0.2em] uppercase text-fg-3">
          {c.code}
        </span>
      </div>

      {/* Big headline */}
      <h3
        className="text-fg font-semibold"
        style={{
          fontSize: "clamp(2.1rem, 4.6vw, 4.6rem)",
          lineHeight: 0.96,
          letterSpacing: "-0.035em",
        }}
      >
        {c.headline}{" "}
        <span className="tw-italic text-accent">{c.headlineAccent}</span>
      </h3>

      {/* Proof column — just the paragraph, nothing else */}
      <p className="text-[14.5px] leading-relaxed text-fg-2 md:pt-6 max-w-[44ch]">
        {c.proof}
      </p>
    </motion.article>
  );
}

export default function TwinEdge() {
  return (
    <section id="edge" className="sec border-t border-rule">
      <div className="w-full max-w-[1680px] mx-auto px-6 md:px-14">
        <div className="sec-head">
          <div className="sec-ident">
            <span className="num">
              05<span className="sl">/</span>
            </span>
            Positioning
          </div>
          <div>
            <RevealH2>
              A new <span className="tw-italic text-accent">category.</span>
              <br />
              Not a smarter tab.
            </RevealH2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="sec-lede"
            >
              Computer-use agents demo well and forget everything the second
              they finish. A twin is the <b>layer that remembers</b> — the
              reason the next task runs twice as fast, and the tenth one runs
              in your voice.
            </motion.p>
          </div>
        </div>

        <div className="relative max-w-[1280px]">
          {claims.map((c) => (
            <ClaimRow key={c.code} c={c} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-20 md:mt-28 max-w-[980px] text-fg font-serif italic"
          style={{
            fontSize: "clamp(1.4rem, 2.4vw, 2.2rem)",
            lineHeight: 1.22,
            letterSpacing: "-0.015em",
          }}
        >
          Anyone can wrap a model. Almost nobody can build the{" "}
          <span className="text-accent">memory</span>, the{" "}
          <span className="text-accent">voice</span>, and the{" "}
          <span className="text-accent">trust</span> that make it feel like
          you. That's the company.
        </motion.p>
      </div>
    </section>
  );
}
