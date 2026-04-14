import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RevealH2 from "./RevealH2";

type StepStatus = "auto" | "gate" | "win";

type Step = {
  t: string;
  tag: string;
  action: string;
  status?: StepStatus;
};

type Playbook = {
  code: string;
  tag: string;
  title: string;
  shortTitle: string;
  mission: string;
  metrics: { label: string; value: string }[];
  steps: Step[];
};

const PLAYBOOKS: Playbook[] = [
  {
    code: "01",
    tag: "TAX",
    title: "File my 2025 return.",
    shortTitle: "File taxes",
    mission:
      "End-to-end, from scattered documents to signed and filed. Two hours. One approval. Zero software fees.",
    metrics: [
      { label: "Wall time", value: "2h 14m" },
      { label: "Your touches", value: "1" },
      { label: "Software fee", value: "$0" },
      { label: "Est. refund", value: "$4,217" },
    ],
    steps: [
      { t: "T+0:00", tag: "MEM", action: "Pulled your 2024 return from iCloud Drive · 8 carry-forwards flagged" },
      { t: "T+0:04", tag: "MAIL", action: "Scraped W-2 PDF from Shopify HR · verified SSN match" },
      { t: "T+0:11", tag: "MAIL", action: "Found 3 × 1099-NEC: Stripe, Coinbase, Upwork · all EINs unique" },
      { t: "T+0:18", tag: "BANK", action: "Pulled 2,841 transactions across Chase, Amex, Capital One" },
      { t: "T+0:31", tag: "REASON", action: "Classified 142 purchases as deductible · SaaS tools, home-office %" },
      { t: "T+0:47", tag: "REASON", action: "Split PA→NY move on Aug 14 · computed dual-state residency" },
      { t: "T+1:02", tag: "IRS", action: "Checked open notices & transcripts against your SSN · clean" },
      { t: "T+1:14", tag: "WEB", action: "Logged into IRS Direct File · skipped the $200 TurboTax upsell" },
      { t: "T+1:28", tag: "FORM", action: "Schedule C drafted · 14 line items · SE tax pre-calculated" },
      { t: "T+1:41", tag: "XREF", action: "Cross-checked K-1 from your LLC · matched partner draws" },
      { t: "T+1:54", tag: "SCORE", action: "Estimated refund $4,217 · confidence 94% · audit-risk flags 0" },
      { t: "T+2:08", tag: "GATE", action: "Waiting on you — review the 1040 and e-sign", status: "gate" },
      { t: "T+2:12", tag: "FILE", action: "Submitted · IRS acknowledged in 47 seconds", status: "win" },
      { t: "T+2:14", tag: "CAL", action: "Scheduled 4 × quarterly estimate reminders for 2026" },
    ],
  },
  {
    code: "02",
    tag: "TRAVEL",
    title: "Tokyo · 8 days · 2 travelers.",
    shortTitle: "Plan the trip",
    mission:
      "From a budget and a vibe to a fully-held bundle. Two hours of research compressed into one approval.",
    metrics: [
      { label: "Research time", value: "38 min" },
      { label: "Bundle total", value: "$3,847" },
      { label: "Tabs opened", value: "0" },
      { label: "Holds secured", value: "9" },
    ],
    steps: [
      { t: "T+0:00", tag: "BRIEF", action: "Parsed: 8 days, mid-March, $4k, Ghibli fan, window seat always" },
      { t: "T+0:07", tag: "WEB", action: "Scraped 47 flights across Google Flights + Skyscanner + ITA Matrix" },
      { t: "T+0:18", tag: "REASON", action: "Ranked by seat pitch × price × layover pain · top 3 put on hold" },
      { t: "T+0:26", tag: "MEM", action: "Matched your prior stays · bed-firmness + walkability pattern locked in" },
      { t: "T+0:41", tag: "HOTEL", action: "Park Hyatt Shinjuku held for 24h · conf TKY-842771" },
      { t: "T+0:52", tag: "RAIL", action: "Built 8-day JR pass route · Kyoto + Hakone day trips included" },
      { t: "T+1:04", tag: "FOOD", action: "Booked 4 dinners · including a Ghibli-adjacent jazz kissaten" },
      { t: "T+1:18", tag: "VISA", action: "Verified Japan eTA · you're pre-cleared through 2027" },
      { t: "T+1:32", tag: "MAP", action: "Day-by-day itinerary · walking distances, cash needs, transit cards" },
      { t: "T+1:45", tag: "SIM", action: "Ordered Ubigi eSIM · 20GB · auto-activates on landing" },
      { t: "T+1:58", tag: "GATE", action: "Waiting — review the $3,847 bundle before anything charges", status: "gate" },
      { t: "T+2:04", tag: "BOOK", action: "9 holds converted · confirmations in your inbox", status: "win" },
      { t: "T+2:11", tag: "CAL", action: "Trip docket built · passport reminder 30 days out" },
    ],
  },
  {
    code: "03",
    tag: "HOUSING",
    title: "SF apartment hunt · 203 → 3.",
    shortTitle: "Find the apartment",
    mission:
      "From raw listing spam to three scheduled viewings at places that actually fit. No burner emails, no scam detours.",
    metrics: [
      { label: "Listings scanned", value: "203" },
      { label: "Filtered out", value: "200" },
      { label: "Viewings booked", value: "3" },
      { label: "Scams caught", value: "4" },
    ],
    steps: [
      { t: "T+0:00", tag: "BRIEF", action: "Zones: SoMa/Mission · $3.2k · pet-ok · ≤10min walk to BART" },
      { t: "T+0:06", tag: "WEB", action: "Scraped Zillow, Apartments.com, Craigslist, Redfin · 203 active" },
      { t: "T+0:19", tag: "FILTER", action: "Excluded 158 on deal-breakers · cross-referenced SFPD crime data" },
      { t: "T+0:27", tag: "FRAUD", action: "Rejected 4 'too good' listings · pattern-matched rental scams" },
      { t: "T+0:38", tag: "REVIEW", action: "Read 1,200 reviews · flagged 7 buildings with recent mgmt changes" },
      { t: "T+0:52", tag: "MEM", action: "Cross-referenced your Strava runs · ranked by morning-loop proximity" },
      { t: "T+1:04", tag: "MAP", action: "Top 12 side-by-side with commute, sun exposure, noise profiles" },
      { t: "T+1:18", tag: "DM", action: "Contacted 12 listers in your voice · asked your standard 3 questions" },
      { t: "T+1:36", tag: "PARSE", action: "9 replies parsed · 3 yeses, 3 nos, 3 red flags · auto-declined politely" },
      { t: "T+1:52", tag: "CAL", action: "Viewings Saturday 2–5pm · Uber pre-staged between stops" },
      { t: "T+2:10", tag: "PREP", action: "Application packet assembled · refs cc'd to your lawyer" },
      { t: "T+2:14", tag: "GATE", action: "Waiting — confirm the shortlist before Saturday", status: "gate" },
    ],
  },
  {
    code: "04",
    tag: "SCHOOL",
    title: "Russian formalism · 12 pages.",
    shortTitle: "Do the homework",
    mission:
      "Syllabus in, argued-and-cited draft out — in your voice, at your grade level. You learn by editing, not by staring at a blank page.",
    metrics: [
      { label: "Reading", value: "46 min" },
      { label: "Draft", value: "14 min" },
      { label: "Sources cited", value: "23" },
      { label: "Originality", value: "94%" },
    ],
    steps: [
      { t: "T+0:00", tag: "BRIEF", action: "ENGL 402 · Prompt: Shklovsky's ostranenie in late-modernist prose" },
      { t: "T+0:05", tag: "READ", action: "Pulled syllabus · extracted 14 assigned readings · 8 PDFs, 6 chapters" },
      { t: "T+0:18", tag: "MEM", action: "Loaded your 3 prior papers · mapped argument-shape, hedges, sign-offs" },
      { t: "T+0:28", tag: "READ", action: "Read 23 academic sources in parallel · 4 primary, 19 secondary" },
      { t: "T+0:41", tag: "THINK", action: "Built argument tree · 3 alternative thesis drafts · picked the strongest" },
      { t: "T+0:54", tag: "CITE", action: "Generated MLA bibliography · all 23 citations verified in JSTOR" },
      { t: "T+1:08", tag: "DRAFT", action: "12-page draft at your grade level · uses your transitions & hedges" },
      { t: "T+1:21", tag: "XREF", action: "Turnitin similarity 1.4% · paraphrase originality 94%" },
      { t: "T+1:34", tag: "VOICE", action: "Final pass · matched vocabulary variance to your last A-paper" },
      { t: "T+1:46", tag: "POLISH", action: "Fixed 6 comma splices · tightened the conclusion · read-aloud smoothed" },
      { t: "T+1:52", tag: "GATE", action: "Waiting — you edit, you learn, you submit", status: "gate" },
    ],
  },
  {
    code: "05",
    tag: "REFUND",
    title: "Delta lost your bag · $1,242.",
    shortTitle: "Chase the refund",
    mission:
      "From a denial email to money back in your checking account. Fourteen days of follow-up compressed to one approval.",
    metrics: [
      { label: "Recovered", value: "$1,242" },
      { label: "Letters drafted", value: "4" },
      { label: "Time to win", value: "14 days" },
      { label: "Your touches", value: "2" },
    ],
    steps: [
      { t: "T+0:00", tag: "INGEST", action: "Read Delta's claim denial from baggage-denial@delta.com" },
      { t: "T+0:04", tag: "LAW", action: "Cross-referenced DOT 14 CFR 254 · liability cap $3,800 · you have leverage" },
      { t: "T+0:09", tag: "DOC", action: "Pulled original receipts from Gmail · 11 items totaling $1,242" },
      { t: "T+0:18", tag: "DRAFT", action: "3-paragraph escalation drafted in your voice · firm, not hostile" },
      { t: "T+0:24", tag: "SEND", action: "Emailed DeltaCare · cc'd DOT consumer complaint portal" },
      { t: "T+0:28", tag: "LOG", action: "Filed formal complaint at aviationconsumer.dot.gov · case #DOT-47218" },
      { t: "T+1:02", tag: "POLL", action: "Watched reply thread every 30m · parsed Delta's $640 counter" },
      { t: "T+1:14", tag: "DRAFT", action: "Wrote counter-counter · cited DOT precedent · insisted on full amount" },
      { t: "T+1:26", tag: "CAL", action: "Set 14-day escalation trigger if no movement" },
      { t: "T+14d", tag: "WIN", action: "Delta settled in full · $1,242 routed to your Chase checking", status: "win" },
      { t: "T+14d", tag: "GATE", action: "Deposit confirmed · twin closed the case", status: "gate" },
    ],
  },
  {
    code: "06",
    tag: "MONEY",
    title: "Kill the subscription bloat.",
    shortTitle: "Kill the bloat",
    mission:
      "Every recurring charge audited. Ghost memberships killed. Live ones negotiated down. Savings start before the end of the day.",
    metrics: [
      { label: "Charges audited", value: "23" },
      { label: "Cancelled", value: "9" },
      { label: "Negotiated", value: "4" },
      { label: "Monthly save", value: "$247" },
    ],
    steps: [
      { t: "T+0:00", tag: "BANK", action: "Scanned 12 months × 4 cards · found 23 recurring charges" },
      { t: "T+0:08", tag: "MEM", action: "Matched against your usage · 9 zero-use subscriptions flagged" },
      { t: "T+0:15", tag: "WEB", action: "Logged into each vendor · verified current plans & auto-renew dates" },
      { t: "T+0:28", tag: "DRAFT", action: "Wrote cancellation requests · retention-team scripts for the 4 keepers" },
      { t: "T+0:41", tag: "CHAT", action: "Opened 4 live-chat retention threads · asked for loyalty discounts" },
      { t: "T+0:58", tag: "REASON", action: "Spotify: 3mo free · Notion: 20% off · Adobe: 40% winback" },
      { t: "T+1:10", tag: "GATE", action: "Waiting — approve 9 cancellations in a single batch", status: "gate" },
      { t: "T+1:14", tag: "CANCEL", action: "Cancellations submitted · 9 confirmation emails received", status: "win" },
      { t: "T+1:20", tag: "DISPUTE", action: "Disputed 2 post-cancellation charges · full refund promised" },
      { t: "T+1:25", tag: "CAL", action: "Watchdog triggers set · ping you if anything quietly resumes" },
    ],
  },
  {
    code: "07",
    tag: "HEALTH",
    title: "Book the right specialist.",
    shortTitle: "Book the doctor",
    mission:
      "From a vague symptom to an in-network specialist with records pulled, questions drafted, and a confirmed slot next week.",
    metrics: [
      { label: "Slot found", value: "Next Tue" },
      { label: "In-network", value: "Verified" },
      { label: "Records prepped", value: "6 docs" },
      { label: "Copay est.", value: "$40" },
    ],
    steps: [
      { t: "T+0:00", tag: "BRIEF", action: "Symptom: recurring migraines post-run · frequency pulled from your journal" },
      { t: "T+0:06", tag: "REASON", action: "Shortlist 3 neurologists · headache-specialized, not stroke-specialty" },
      { t: "T+0:14", tag: "WEB", action: "Cross-checked BCBS provider directory · all 3 in-network confirmed" },
      { t: "T+0:22", tag: "CALL", action: "Called each office · parsed the automated menu · grabbed earliest slots" },
      { t: "T+0:34", tag: "MATCH", action: "Ranked by wait time × patient reviews × drive distance" },
      { t: "T+0:42", tag: "SCHED", action: "Booked Dr. Patel · Tuesday 9:20am · UCSF Mission Bay" },
      { t: "T+0:48", tag: "DOC", action: "Pulled primary-care records · 6 relevant documents auto-forwarded" },
      { t: "T+0:56", tag: "PREP", action: "Drafted 8 questions to ask · symptom timeline attached" },
      { t: "T+1:02", tag: "INS", action: "Pre-verified coverage · est. copay $40 · no prior-auth needed" },
      { t: "T+1:08", tag: "MAP", action: "Saved route, parking validation, clinic check-in code" },
      { t: "T+1:12", tag: "CAL", action: "Added to calendar · 24h reminder · mirror Uber booking prepped" },
    ],
  },
  {
    code: "08",
    tag: "INBOX",
    title: "Run my whole inbox.",
    shortTitle: "Run the inbox",
    mission:
      "Nothing important gets missed. Nothing trivial gets your attention. Mornings start at inbox zero with a one-page briefing.",
    metrics: [
      { label: "Processed", value: "187" },
      { label: "Replied", value: "23" },
      { label: "Meetings", value: "4" },
      { label: "Muted", value: "142" },
    ],
    steps: [
      { t: "T+0:00", tag: "SCAN", action: "Read 187 overnight messages · classified by relationship, urgency, domain" },
      { t: "T+0:04", tag: "MEM", action: "Cross-referenced contacts, prior threads, calendar, open action items" },
      { t: "T+0:11", tag: "REASON", action: "Flagged 6 threads that need your attention · muted 142 newsletters" },
      { t: "T+0:18", tag: "DRAFT", action: "23 replies drafted in your voice · tone-matched per relationship" },
      { t: "T+0:26", tag: "SCHED", action: "4 meeting requests · proposed times that match your focus blocks" },
      { t: "T+0:34", tag: "XREF", action: "Matched 3 asks to ongoing threads · attached context & past decisions" },
      { t: "T+0:42", tag: "FOLLOW", action: "Followed up on 5 threads where people ghosted you · gentle, not pushy" },
      { t: "T+0:48", tag: "BRIEF", action: "Composed your morning briefing · 6 priority items, one line each" },
      { t: "T+0:52", tag: "GATE", action: "Waiting — tap approve to send the 23 replies", status: "gate" },
      { t: "T+0:55", tag: "SEND", action: "23 replies sent · 4 meetings blocked · 142 muted to digest", status: "win" },
      { t: "T+0:58", tag: "CAL", action: "Your 9am block is clear · briefing waits for your coffee" },
    ],
  },
];

const THINK_TAGS = new Set(["MEM", "REASON", "THINK", "BRIEF", "SCORE", "MATCH"]);

function tagColor(tag: string, status?: StepStatus): string {
  if (status === "gate") return "hsl(var(--ember))";
  if (status === "win") return "hsl(var(--accent))";
  if (THINK_TAGS.has(tag)) return "hsl(var(--accent))";
  return "hsl(var(--fg-3))";
}

function StepRow({ step, i }: { step: Step; i: number }) {
  const color = tagColor(step.tag, step.status);
  const isGate = step.status === "gate";
  const isWin = step.status === "win";

  return (
    <motion.li
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, delay: 0.03 * i, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid grid-cols-[72px_80px_1fr_20px] gap-3 md:gap-5 items-start py-3 md:py-3.5 border-b border-rule/70 last:border-b-0"
    >
      {/* Left accent bar */}
      <span
        className="absolute left-0 top-0 bottom-0 w-[2px]"
        style={{
          background: isGate
            ? "hsl(var(--ember))"
            : isWin
            ? "hsl(var(--accent))"
            : "transparent",
        }}
      />

      {/* Timestamp */}
      <span className="f-mono text-[0.56rem] font-medium tracking-[0.08em] uppercase text-fg-4 pl-3">
        {step.t}
      </span>

      {/* Tag chip */}
      <span
        className="f-mono text-[0.54rem] font-semibold tracking-[0.14em] uppercase px-1.5 py-0.5 border inline-flex items-center justify-center"
        style={{
          color,
          borderColor:
            isGate || isWin
              ? color
              : "hsl(var(--rule-hi))",
          background:
            isGate || isWin ? `${color.replace(")", " / 0.08)")}` : "transparent",
        }}
      >
        {step.tag}
      </span>

      {/* Action text */}
      <span
        className={`text-[12.5px] leading-snug ${
          isWin ? "text-fg font-medium" : isGate ? "text-fg" : "text-fg-2"
        }`}
      >
        {step.action}
      </span>

      {/* Right status icon */}
      <span className="flex items-center justify-end pt-0.5">
        {isGate && (
          <span
            className="inline-block w-[5px] h-[5px] rounded-full"
            style={{
              background: "hsl(var(--ember))",
              animation: "pb-pulse 1.6s ease-in-out infinite",
            }}
          />
        )}
        {isWin && (
          <span
            className="inline-block w-[5px] h-[5px] rounded-full"
            style={{ background: "hsl(var(--accent))" }}
          />
        )}
        {!isGate && !isWin && (
          <span
            className="inline-block w-[3px] h-[3px] rounded-full"
            style={{ background: "hsl(var(--fg-4))" }}
          />
        )}
      </span>
    </motion.li>
  );
}

export default function UseCases() {
  const [activeIdx, setActiveIdx] = useState(0);
  const pb = PLAYBOOKS[activeIdx];

  return (
    <section id="use-cases" className="sec border-t border-rule">
      <div className="w-full max-w-[1680px] mx-auto px-6 md:px-14">
        <div className="sec-head">
          <div className="sec-ident">
            <span className="num">
              04<span className="sl">/</span>
            </span>
            Playbooks
          </div>
          <div>
            <RevealH2>
              Not a demo. An <span className="tw-italic text-accent">execution trace.</span>
            </RevealH2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="sec-lede"
            >
              Pick any case below and read the <b>step-by-step log</b> of how a twin
              actually delivers it — every sub-system it touches, every document it
              pulls, every gate that waits for your nod. This is what "end-to-end" means
              when nobody's lying.
            </motion.p>
          </div>
        </div>

        {/* Playbook selector */}
        <div className="mb-10 md:mb-12 -mx-6 md:mx-0 px-6 md:px-0 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 min-w-max">
            {PLAYBOOKS.map((p, i) => {
              const active = i === activeIdx;
              return (
                <button
                  key={p.code}
                  onClick={() => setActiveIdx(i)}
                  data-magnetic
                  className={`group relative px-4 py-3 border transition-colors whitespace-nowrap ${
                    active
                      ? "border-accent bg-accent/[0.06]"
                      : "border-rule hover:border-rule-hi bg-bg-2/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`f-mono text-[0.56rem] font-semibold tracking-[0.16em] ${
                        active ? "text-accent" : "text-fg-4"
                      }`}
                    >
                      {p.code}
                    </span>
                    <span
                      className={`f-mono text-[0.5rem] font-medium tracking-[0.18em] uppercase px-1.5 py-0.5 border ${
                        active
                          ? "border-accent text-accent"
                          : "border-rule-hi text-fg-3"
                      }`}
                    >
                      {p.tag}
                    </span>
                    <span
                      className={`text-[13px] font-medium ${
                        active ? "text-fg" : "text-fg-2 group-hover:text-fg"
                      }`}
                    >
                      {p.shortTitle}
                    </span>
                  </div>
                  {active && (
                    <motion.span
                      layoutId="pb-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Split: summary (left) + timeline (right) */}
        <div className="grid lg:grid-cols-[380px_1fr] gap-8 md:gap-12">
          {/* LEFT — case summary */}
          <AnimatePresence mode="wait">
            <motion.div
              key={pb.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:sticky lg:top-24 lg:self-start"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="f-mono text-[0.6rem] font-semibold tracking-[0.18em] text-accent">
                  {pb.code}
                </span>
                <span className="f-mono text-[0.54rem] font-medium tracking-[0.2em] uppercase text-fg-4 px-1.5 py-0.5 border border-rule-hi">
                  {pb.tag}
                </span>
              </div>
              <h3
                className="text-fg font-semibold mb-5"
                style={{
                  fontSize: "clamp(2rem, 3.4vw, 3.2rem)",
                  lineHeight: 0.94,
                  letterSpacing: "-0.03em",
                }}
              >
                {pb.title}
              </h3>
              <p className="text-[14.5px] leading-relaxed text-fg-2 mb-7 max-w-[38ch]">
                {pb.mission}
              </p>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 border border-rule bg-bg-2/40">
                {pb.metrics.map((m, i) => (
                  <div
                    key={m.label}
                    className={`px-4 py-3 ${i % 2 === 0 ? "border-r border-rule" : ""} ${
                      i < 2 ? "border-b border-rule" : ""
                    }`}
                  >
                    <div className="f-mono text-[0.52rem] font-medium tracking-[0.16em] uppercase text-fg-4 mb-1">
                      {m.label}
                    </div>
                    <div
                      className="font-semibold text-fg"
                      style={{
                        fontSize: "1.25rem",
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                      }}
                    >
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 f-mono text-[0.54rem] font-medium tracking-[0.16em] uppercase text-fg-3">
                <span className="live-dot" />
                {pb.steps.length} steps · {pb.steps.filter((s) => s.status === "gate").length} approval{" "}
                {pb.steps.filter((s) => s.status === "gate").length === 1 ? "gate" : "gates"}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* RIGHT — timeline */}
          <div className="relative border-t border-rule">
            <div className="px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5 f-mono text-[0.56rem] font-medium tracking-[0.18em] uppercase text-fg-3">
                trace · {pb.code}
              </div>
              <div className="f-mono text-[0.52rem] tracking-[0.14em] uppercase text-fg-4">
                {pb.steps.length} events
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.ol key={pb.code} className="divide-y divide-rule/60">
                {pb.steps.map((step, i) => (
                  <StepRow key={`${pb.code}-${i}`} step={step} i={i} />
                ))}
              </motion.ol>
            </AnimatePresence>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes pb-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.85); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; }
      `}</style>
    </section>
  );
}
