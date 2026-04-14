import { motion } from "framer-motion";
import RevealH2 from "./RevealH2";

type Claim = {
  code: string;
  headline: string;
  headlineAccent: string;
  proof: string;
  weak: string;
  strong: string;
};

const claims: Claim[] = [
  {
    code: "01",
    headline: "Memory that",
    headlineAccent: "compounds.",
    proof:
      "The longer you use it, the more it writes things you'd have written yourself. An agent forgets you the second the tab closes.",
    weak: "Stateless per task",
    strong: "Six-month personal memory",
  },
  {
    code: "02",
    headline: "Parallel, like your",
    headlineAccent: "life is parallel.",
    proof:
      "Five jobs in flight. Three waiting on your nod. One nearly done. A twin doesn't take turns — it runs a whole week's worth of you, simultaneously.",
    weak: "One thread at a time",
    strong: "N long-horizon jobs",
  },
  {
    code: "03",
    headline: "Sounds exactly",
    headlineAccent: "like you.",
    proof:
      "Learns your voice from your own writing — cadence, hedges, sign-offs. Nobody who reads a reply asks 'wait, is this AI?'.",
    weak: "Generic chatbot voice",
    strong: "Your literal tone",
  },
  {
    code: "04",
    headline: "Across the",
    headlineAccent: "whole stack.",
    proof:
      "Inbox, banks, forms, browser, files, calendar, phone calls. Your twin doesn't live in a chat window — it lives where your life actually happens.",
    weak: "One tab, one API",
    strong: "Every surface you touch",
  },
  {
    code: "05",
    headline: "Approval,",
    headlineAccent: "not anarchy.",
    proof:
      "You decide what runs free and what always waits at the gate. Nothing ships, nothing spends, nothing sends — until you've set the policy or tapped approve.",
    weak: "On/off switch",
    strong: "Per-domain policy",
  },
];

function ClaimRow({ c }: { c: Claim }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid md:grid-cols-[90px_1fr_360px] gap-6 md:gap-10 items-start py-12 md:py-16 border-b border-rule last:border-b-0"
    >
      {/* scan line reveal */}
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 h-[1px] bg-accent origin-left"
        style={{ boxShadow: "0 0 14px hsl(var(--accent) / 0.5)" }}
      />

      {/* Index number */}
      <div className="flex flex-col gap-2 md:pt-4">
        <span
          className="font-serif italic text-fg-4"
          style={{ fontSize: "3.6rem", lineHeight: 0.9, letterSpacing: "-0.03em" }}
        >
          {c.code}
        </span>
        <span className="f-mono text-[0.56rem] font-medium tracking-[0.2em] uppercase text-accent">
          Claim {c.code}
        </span>
      </div>

      {/* Massive headline */}
      <h3
        className="text-fg font-semibold"
        style={{
          fontSize: "clamp(2.2rem, 5.2vw, 5.4rem)",
          lineHeight: 0.92,
          letterSpacing: "-0.035em",
        }}
      >
        {c.headline}{" "}
        <span className="tw-italic text-accent">{c.headlineAccent}</span>
      </h3>

      {/* Proof column: paragraph + contrast pair */}
      <div className="flex flex-col gap-5 md:pt-6">
        <p className="text-[14.5px] leading-relaxed text-fg-2">{c.proof}</p>

        <div className="grid grid-cols-2 gap-px bg-rule border border-rule">
          <div className="px-3 py-2.5 bg-bg-2">
            <div className="f-mono text-[0.5rem] tracking-[0.18em] uppercase text-fg-4 mb-1">
              Agent
            </div>
            <div
              className="text-[12px] text-fg-3"
              style={{
                textDecoration: "line-through",
                textDecorationColor: "hsl(var(--ember) / 0.6)",
                textDecorationThickness: "1px",
              }}
            >
              {c.weak}
            </div>
          </div>
          <div className="px-3 py-2.5 bg-bg-2">
            <div className="f-mono text-[0.5rem] tracking-[0.18em] uppercase text-accent mb-1">
              Your twin
            </div>
            <div className="text-[12px] text-fg font-medium">{c.strong}</div>
          </div>
        </div>
      </div>
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
            <br />
            <b>Not a better chatbot</b>
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
              transition={{ duration: 0.9, delay: 0.1 }}
              className="sec-lede"
            >
              Computer-use agents demo well and forget everything the second they
              finish. A twin is the <b>layer that remembers</b> — the reason the next
              task runs twice as fast, and the tenth one runs in your voice.
            </motion.p>
          </div>
        </div>

        <div className="relative">
          {claims.map((c) => (
            <ClaimRow key={c.code} c={c} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-16 md:mt-20 grid md:grid-cols-[auto_1fr] gap-8 items-start max-w-[1100px]"
        >
          <div className="f-mono text-[0.58rem] font-medium tracking-[0.18em] uppercase text-fg-3 md:pt-3">
            <span className="text-accent">The moat</span>
            <br />
            05 / 06
          </div>
          <p
            className="text-fg font-serif italic"
            style={{
              fontSize: "clamp(1.5rem, 2.8vw, 2.6rem)",
              lineHeight: 1.18,
              letterSpacing: "-0.015em",
            }}
          >
            Anyone can wrap a model. Almost nobody can build the <span className="text-accent">memory</span>,
            the <span className="text-accent">voice</span>, and the <span className="text-accent">trust</span>{" "}
            that makes it feel like <u className="decoration-accent decoration-2 underline-offset-4">you</u>.
            That's the company.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
