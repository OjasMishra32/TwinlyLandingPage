import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Pillar = {
  key: string;
  label: string;
  title: string;
  copy: string;
  icon: ReactNode;
};

const pillars: Pillar[] = [
  {
    key: "memory",
    label: "MEMORY",
    title: "Knows you.",
    copy: "Remembers tone, preferences, people, and how you like things handled. Editable, always.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6">
        <rect x="5" y="5" width="22" height="22" stroke="currentColor" strokeWidth="1.6" />
        <rect x="11" y="11" width="10" height="10" stroke="currentColor" strokeWidth="1.6" />
        <line x1="5" y1="11" x2="11" y2="11" stroke="currentColor" strokeWidth="1.6" />
        <line x1="21" y1="11" x2="27" y2="11" stroke="currentColor" strokeWidth="1.6" />
        <line x1="5" y1="21" x2="11" y2="21" stroke="currentColor" strokeWidth="1.6" />
        <line x1="21" y1="21" x2="27" y2="21" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    key: "voice",
    label: "VOICE",
    title: "Writes like you.",
    copy: "Drafts replies in your tone. Not a generic AI voice. Edit once, your twin learns.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6">
        <path d="M4 22h4l4 6 5-20 4 12h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" />
      </svg>
    ),
  },
  {
    key: "action",
    label: "ACTION",
    title: "Moves things forward.",
    copy: "Plans, gathers context, composes, executes. Across email, calendar, and tasks.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6">
        <path d="M4 16h18M18 8l8 8-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" strokeLinejoin="miter" />
        <circle cx="4" cy="16" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: "approval",
    label: "APPROVAL",
    title: "Checks with you.",
    copy: "You set what Twinly does auto and what always waits for your sign-off.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6">
        <rect x="5" y="5" width="22" height="22" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 16l4 4 9-10" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="square" />
      </svg>
    ),
  },
];

export default function Pillars() {
  return (
    <section id="product" className="sec border-t border-rule">
      <div className="w-full max-w-[1680px] mx-auto px-6 md:px-14">
        <div className="sec-head">
          <div className="sec-ident">
            <span className="num">
              02<span className="sl">/</span>
            </span>
            THE SYSTEM
            <br />
            <b>FOUR PARTS</b>
          </div>
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="sec-h2"
            >
              Four parts of a <em className="tw-accent-word">twin.</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="sec-lede"
            >
              Twinly isn't a bigger chatbot or a smarter workflow builder. It's the first
              layer that turns raw model intelligence into an <b>operator that already knows
              how you'd do it.</b>
            </motion.p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border-y-[2px] border-ink">
          {pillars.map((p, i) => (
            <motion.div
              key={p.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-6 md:p-8 bg-paper hover:bg-paper-2 transition-colors border-ink
                lg:[&:not(:last-child)]:border-r
                sm:max-lg:[&:nth-child(odd)]:border-r
                sm:max-lg:[&:nth-child(-n+2)]:border-b
                max-sm:[&:not(:last-child)]:border-b"
            >
              <div className="flex items-start justify-between">
                <div className="h-12 w-12 inline-flex items-center justify-center border border-ink bg-surface text-ink">
                  {p.icon}
                </div>
                <span
                  className="font-black text-ink-3/50"
                  style={{ fontSize: "2.2rem", letterSpacing: "-0.045em", lineHeight: 0.88, fontStretch: "75%" }}
                >
                  0{i + 1}
                </span>
              </div>
              <div className="mt-20">
                <div className="f-mono text-[0.6rem] font-bold tracking-[0.18em] text-accent">
                  {p.label}
                </div>
                <h3
                  className="mt-2 font-black text-ink"
                  style={{ fontSize: "1.55rem", letterSpacing: "-0.03em", lineHeight: 1, fontStretch: "75%" }}
                >
                  {p.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-2">{p.copy}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
