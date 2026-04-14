import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import RevealH2 from "./RevealH2";

const cases = [
  {
    code: "01",
    title: "File my taxes.",
    summary:
      "Pulls every W-2, 1099, receipt, and deduction from your accounts. Drafts the return end-to-end. You review the summary and sign.",
    input: "Connect your accounts.",
    approval: "You sign the final return.",
  },
  {
    code: "02",
    title: "Plan the whole trip.",
    summary:
      "Flights, hotel, rental car, rail passes, restaurant reservations, day-by-day itinerary — researched, held, and ready to book in one pass.",
    input: "Tell it where and when.",
    approval: "Approve the bundle before cards move.",
  },
  {
    code: "03",
    title: "Write the hard thing.",
    summary:
      "Research papers, essays, proposals, personal statements. Reads the sources, drafts in your voice, cites properly. You edit, approve, submit.",
    input: "Point at the prompt.",
    approval: "Nothing submits without you.",
  },
  {
    code: "04",
    title: "Kill the bloat.",
    summary:
      "Audits every subscription, negotiates bills, cancels the dead ones, disputes bogus charges. Typical save: $120–$300 a month.",
    input: "Give it a week.",
    approval: "Approve each cancellation.",
  },
  {
    code: "05",
    title: "Fill every form.",
    summary:
      "Insurance claims, medical records, job applications, visa paperwork, FAFSA. Pulls your docs, fills the fields, drafts the answers. You sign.",
    input: "Upload once. Forever.",
    approval: "Review before submit.",
  },
  {
    code: "06",
    title: "Run my inbox.",
    summary:
      "Replies in your voice, schedules meetings, follows up on threads you care about, mutes the noise, digests the rest into a morning briefing.",
    input: "Grant inbox access.",
    approval: "Previews every send.",
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="sec border-t border-rule">
      <div className="w-full max-w-[1680px] mx-auto px-6 md:px-14">
        <div className="sec-head">
          <div className="sec-ident">
            <span className="num">
              04<span className="sl">/</span>
            </span>
            Hand-over
            <br />
            <b>Six things to let go of</b>
          </div>
          <div>
            <RevealH2>
              Six things you'll <span className="tw-italic text-accent">never</span> do again.
            </RevealH2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="sec-lede"
            >
              Start with the small stuff. <b>Twinly earns trust by handling the annoying,
              repetitive, low-stakes work first</b> — so you can stop thinking about it.
            </motion.p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {cases.map((c, i) => (
            <motion.div
              key={c.code}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: 0.06 * i }}
            >
              <TiltCard className="h-full" max={8}>
                <article className="group relative h-full p-6 md:p-8 bg-bg-2 border border-rule hover:border-rule-hi transition-colors overflow-hidden">
                  <span className="absolute top-0 left-0 w-10 h-[1px] bg-accent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
                  <span className="absolute top-0 left-0 w-[1px] h-10 bg-accent scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-500" />
                  <span className="absolute bottom-0 right-0 w-10 h-[1px] bg-accent scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-500" />
                  <span className="absolute bottom-0 right-0 w-[1px] h-10 bg-accent scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500" />

                  <div className="flex items-center justify-between" style={{ transform: "translateZ(30px)" }}>
                    <span className="f-mono text-[0.62rem] font-semibold tracking-[0.18em] text-accent">
                      {c.code}
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-fg-3 group-hover:text-accent group-hover:translate-x-1 transition-all">
                      <path d="M2 8h12M10 2l4 6-4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                    </svg>
                  </div>
                  <h3
                    className="mt-14 font-semibold text-fg"
                    style={{ fontSize: "1.7rem", letterSpacing: "-0.025em", lineHeight: 0.98, transform: "translateZ(25px)" }}
                  >
                    {c.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-fg-2">{c.summary}</p>
                  <div className="mt-6 grid grid-cols-2 gap-3 pt-4 border-t border-rule" style={{ transform: "translateZ(15px)" }}>
                    <div>
                      <div className="f-mono text-[0.58rem] font-medium tracking-[0.16em] uppercase text-fg-3">Input</div>
                      <div className="mt-1 text-[12.5px] text-fg">{c.input}</div>
                    </div>
                    <div>
                      <div className="f-mono text-[0.58rem] font-medium tracking-[0.16em] uppercase text-fg-3">Approval</div>
                      <div className="mt-1 text-[12.5px] text-fg">{c.approval}</div>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
