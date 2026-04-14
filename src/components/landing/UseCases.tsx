import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import RevealH2 from "./RevealH2";

type Case = {
  code: string;
  tag: string;
  title: string;
  summary: string;
  input: string;
  approval: string;
  metric: string;
};

const cases: Case[] = [
  {
    code: "01",
    tag: "TAX",
    title: "File my taxes.",
    summary:
      "Pulls every W-2, 1099, receipt and deduction from your accounts. Drafts the return end-to-end. You review the summary and sign.",
    input: "Connect your accounts.",
    approval: "You sign the final return.",
    metric: "~14h saved / year",
  },
  {
    code: "02",
    tag: "TRAVEL",
    title: "Plan the whole trip.",
    summary:
      "Flights, hotels, rail passes, rental cars, restaurant reservations, day-by-day itinerary — researched, held, priced, ready to book in one pass.",
    input: "Tell it where and when.",
    approval: "Approve the bundle before any card moves.",
    metric: "8 tabs → 1 approval",
  },
  {
    code: "03",
    tag: "WRITE",
    title: "Write the hard thing.",
    summary:
      "Research papers, essays, proposals, personal statements. Reads every source, drafts in your voice, cites properly. You edit, approve, submit.",
    input: "Point at the prompt.",
    approval: "Nothing submits without you.",
    metric: "First draft in 12m",
  },
  {
    code: "04",
    tag: "MONEY",
    title: "Kill the subscription bloat.",
    summary:
      "Audits every recurring charge on every card. Cancels ghost memberships. Negotiates the live ones. Disputes bogus line items.",
    input: "Give it a week.",
    approval: "Approve each cancellation.",
    metric: "$120–$300 / mo back",
  },
  {
    code: "05",
    tag: "FORMS",
    title: "Fill every form.",
    summary:
      "Insurance claims, medical records, visa packets, FAFSA, leasing docs, HR onboarding. Pulls your files, fills every field, drafts the narrative answers.",
    input: "Upload once. Forever.",
    approval: "Review before submit.",
    metric: "Zero blank fields",
  },
  {
    code: "06",
    tag: "INBOX",
    title: "Run my inbox.",
    summary:
      "Replies in your tone, schedules the meetings, follows up on threads you care about, mutes the noise, digests the rest into a morning briefing.",
    input: "Grant inbox access.",
    approval: "Previews every send.",
    metric: "Inbox zero by 9am",
  },
  {
    code: "07",
    tag: "REFUND",
    title: "Chase the refund.",
    summary:
      "Writes the chargeback letter, calls the bank, opens the dispute, follows up weekly, escalates to arbitration. Gets your money back instead of you sighing.",
    input: "Drop the receipt.",
    approval: "You OK the escalation.",
    metric: "~73% win rate",
  },
  {
    code: "08",
    tag: "HOUSING",
    title: "Find me a place.",
    summary:
      "Scrapes every listing in your zone, filters by the things you actually care about, books the viewings, ranks the shortlist side-by-side with pros and cons.",
    input: "Budget, zone, must-haves.",
    approval: "You pick, it applies.",
    metric: "40 listings → 5 viewings",
  },
  {
    code: "09",
    tag: "HEALTH",
    title: "Book the doctor.",
    summary:
      "Finds an in-network specialist with the right availability, verifies your insurance coverage, books the slot, preps the questions you should ask, gets your records pulled.",
    input: "What's bothering you.",
    approval: "Confirms the time before booking.",
    metric: "Next week, not next quarter",
  },
  {
    code: "10",
    tag: "MOVE",
    title: "Handle the move.",
    summary:
      "Utilities transferred, address changed everywhere it matters, mail forwarded, new renter's insurance, old accounts cancelled. The 50-step checklist nobody has time for.",
    input: "New address, move date.",
    approval: "Single end-of-week review.",
    metric: "50 tasks, 0 threads",
  },
  {
    code: "11",
    tag: "NEGOTIATE",
    title: "Negotiate the bill.",
    summary:
      "Surprise medical bill, cable price hike, apartment renewal, salary bump. Writes the ask with the leverage, follows up, locks in the discount or the raise.",
    input: "Drop the bill or the offer.",
    approval: "Confirms the counter.",
    metric: "Avg. 22% off",
  },
  {
    code: "12",
    tag: "SCHOOL",
    title: "Do my homework.",
    summary:
      "Reads the syllabus, the slides, the assigned readings. Drafts the paper at your level with real citations. You learn by editing, not by staring at a blank page at 2am.",
    input: "Upload the course.",
    approval: "Submits only when you click.",
    metric: "Never a blank page",
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
            <b>Twelve things to let go of</b>
          </div>
          <div>
            <RevealH2>
              Twelve things you'll <span className="tw-italic text-accent">never</span> do again.
            </RevealH2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="sec-lede"
            >
              Not toy tasks. The stuff that actually eats your week —{" "}
              <b>the phone calls you dread, the forms you put off, the threads that die in your drafts folder</b>.
              Your twin handles it, end-to-end, with approvals at every critical gate.
            </motion.p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {cases.map((c, idx) => (
            <motion.div
              key={c.code}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.7, delay: 0.04 * idx }}
            >
              <TiltCard className="h-full" max={8}>
                <article className="group relative h-full p-6 md:p-7 bg-bg-2 border border-rule hover:border-rule-hi transition-colors overflow-hidden">
                  {/* corner scanlines */}
                  <span className="absolute top-0 left-0 w-10 h-[1px] bg-accent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
                  <span className="absolute top-0 left-0 w-[1px] h-10 bg-accent scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-500" />
                  <span className="absolute bottom-0 right-0 w-10 h-[1px] bg-accent scale-x-0 origin-right group-hover:scale-x-100 transition-transform duration-500" />
                  <span className="absolute bottom-0 right-0 w-[1px] h-10 bg-accent scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500" />

                  <div
                    className="flex items-center justify-between"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="f-mono text-[0.58rem] font-semibold tracking-[0.18em] text-accent">
                        {c.code}
                      </span>
                      <span className="f-mono text-[0.52rem] font-medium tracking-[0.2em] text-fg-4 uppercase">
                        {c.tag}
                      </span>
                    </div>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-fg-3 group-hover:text-accent group-hover:translate-x-1 transition-all"
                    >
                      <path
                        d="M2 8h12M10 2l4 6-4 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="square"
                      />
                    </svg>
                  </div>
                  <h3
                    className="mt-12 font-semibold text-fg"
                    style={{
                      fontSize: "1.55rem",
                      letterSpacing: "-0.025em",
                      lineHeight: 0.98,
                      transform: "translateZ(25px)",
                    }}
                  >
                    {c.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-fg-2">{c.summary}</p>

                  <div
                    className="mt-5 pt-4 border-t border-rule flex items-center justify-between gap-3"
                    style={{ transform: "translateZ(15px)" }}
                  >
                    <div className="flex flex-col">
                      <div className="f-mono text-[0.52rem] font-medium tracking-[0.16em] uppercase text-fg-4">
                        Approval
                      </div>
                      <div className="mt-0.5 text-[12px] text-fg-2">{c.approval}</div>
                    </div>
                    <div
                      className="shrink-0 f-mono text-[0.58rem] font-semibold tracking-[0.08em] uppercase px-2 py-1 border border-accent/40"
                      style={{
                        color: "hsl(var(--accent))",
                        background: "hsl(var(--accent) / 0.05)",
                      }}
                    >
                      {c.metric}
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
