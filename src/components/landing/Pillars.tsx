import { motion } from "framer-motion";
import type { ReactNode } from "react";
import TiltCard from "./TiltCard";
import RevealH2 from "./RevealH2";

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
    label: "Memory",
    title: "Knows you.",
    copy: "Remembers tone, preferences, people, and how you like things handled. Editable, always.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6">
        <rect x="5" y="5" width="22" height="22" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="11" width="10" height="10" stroke="currentColor" strokeWidth="1.5" />
        <line x1="5" y1="11" x2="11" y2="11" stroke="currentColor" strokeWidth="1.5" />
        <line x1="21" y1="11" x2="27" y2="11" stroke="currentColor" strokeWidth="1.5" />
        <line x1="5" y1="21" x2="11" y2="21" stroke="currentColor" strokeWidth="1.5" />
        <line x1="21" y1="21" x2="27" y2="21" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    key: "voice",
    label: "Voice",
    title: "Writes like you.",
    copy: "Drafts replies in your tone. Not a generic AI voice. Edit once, your twin learns.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6">
        <path d="M4 22h4l4 6 5-20 4 12h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
      </svg>
    ),
  },
  {
    key: "action",
    label: "Action",
    title: "Moves things forward.",
    copy: "Plans, gathers context, composes, executes. Across email, calendar, and tasks.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6">
        <path d="M4 16h18M18 8l8 8-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
        <circle cx="4" cy="16" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: "approval",
    label: "Approval",
    title: "Checks with you.",
    copy: "You set what Twinly does auto and what always waits for your sign-off.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6">
        <rect x="5" y="5" width="22" height="22" stroke="currentColor" strokeWidth="1.5" />
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
            The system
            <br />
            <b>Four pillars</b>
          </div>
          <div>
            <RevealH2>
              Four pieces that make a <span className="tw-italic text-accent">twin.</span>
            </RevealH2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="sec-lede"
            >
              Twinly isn't a smarter chatbot or a workflow builder. It's the layer that turns
              raw model intelligence into <b>something that already knows how you'd do it</b>.
            </motion.p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.key}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard className="h-full" max={10}>
                <div className="group relative h-full p-6 md:p-8 bg-bg-2 border border-rule hover:border-rule-hi transition-colors overflow-hidden">
                  {/* corner scanlines that draw in on hover */}
                  <span className="absolute top-0 left-0 w-10 h-[1px] bg-accent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
                  <span className="absolute top-0 left-0 w-[1px] h-10 bg-accent scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-500" />
                  <span className="absolute bottom-0 right-0 w-10 h-[1px] bg-accent scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-500" />
                  <span className="absolute bottom-0 right-0 w-[1px] h-10 bg-accent scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500" />

                  <div className="flex items-start justify-between" style={{ transform: "translateZ(30px)" }}>
                    <div className="h-12 w-12 inline-flex items-center justify-center border border-rule-hi bg-bg-3 text-fg group-hover:text-accent group-hover:border-accent transition-colors">
                      {p.icon}
                    </div>
                    <span
                      className="font-serif italic text-fg-4 group-hover:text-accent transition-colors"
                      style={{ fontSize: "2.6rem", lineHeight: 0.88 }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <div className="mt-16 md:mt-20" style={{ transform: "translateZ(20px)" }}>
                    <div className="f-mono text-[0.62rem] font-medium tracking-[0.18em] uppercase text-accent">
                      {p.label}
                    </div>
                    <h3
                      className="mt-2 font-semibold text-fg"
                      style={{ fontSize: "1.6rem", letterSpacing: "-0.025em", lineHeight: 1 }}
                    >
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-fg-2">{p.copy}</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
