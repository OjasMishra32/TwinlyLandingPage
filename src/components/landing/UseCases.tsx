import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import KineticHeadline from "./KineticHeadline";

type StepStatus = "auto" | "gate" | "win";
type Phase = "discover" | "execute" | "deliver";

type Step = {
  t: string;
  tag: string;
  action: string;
  phase: Phase;
  status?: StepStatus;
};

type Playbook = {
  code: string;
  tag: string;
  title: string;
  shortTitle: string;
  mission: string;
  /** What a human would have to do without a twin */
  withoutTwin: { time: string; cost: string };
  /** What the twin actually delivers */
  withTwin: { time: string; cost: string };
  metrics: { label: string; value: string }[];
  steps: Step[];
};

const PLAYBOOKS: Playbook[] = [
  {
    code: "01",
    tag: "CODE",
    title: "Ship your landing page.",
    shortTitle: "Ship a website",
    mission:
      "From a one-line brief to a deployed Next.js app on a custom domain — code written, SEO tuned, Lighthouse green, waitlist form live, first signups in minutes.",
    withoutTwin: { time: "~2 weeks", cost: "$3,500 freelancer" },
    withTwin: { time: "1h 42m", cost: "$12 (domain)" },
    metrics: [
      { label: "Lines of code", value: "2,340" },
      { label: "Lighthouse", value: "98" },
      { label: "Your touches", value: "1" },
      { label: "Deploy target", value: "Vercel" },
    ],
    steps: [
      { phase: "discover", t: "T+0:00", tag: "BRIEF",  action: "Parsed: 'SaaS landing for a meal-planning app · lime/dark · waitlist + pricing'" },
      { phase: "discover", t: "T+0:04", tag: "PLAN",   action: "Sketched 6 sections (hero / how / features / pricing / faq / cta) · confirmed with you" },
      { phase: "discover", t: "T+0:11", tag: "MOOD",   action: "Generated a brand moodboard · picked Fraunces + Geist · exported design tokens" },
      { phase: "execute",  t: "T+0:24", tag: "INIT",   action: "Next.js 15 + Tailwind 4 scaffolded · deployed empty preview to Vercel" },
      { phase: "execute",  t: "T+0:38", tag: "CODE",   action: "Wrote 14 shared components · 2,340 LOC · type-safe throughout" },
      { phase: "execute",  t: "T+0:52", tag: "COPY",   action: "Drafted all page copy in your voice · 8 headlines, 6 paragraphs" },
      { phase: "execute",  t: "T+1:04", tag: "MOTION", action: "Added Framer Motion scroll reveals on every section" },
      { phase: "execute",  t: "T+1:13", tag: "FORM",   action: "Built waitlist form · Formspree endpoint · honeypot anti-spam" },
      { phase: "execute",  t: "T+1:21", tag: "TEST",   action: "Ran Lighthouse · fixed 3 accessibility warnings · hit 98/100" },
      { phase: "deliver",  t: "T+1:28", tag: "DEPLOY", action: "Pushed to GitHub · Vercel build green · preview URL ready" },
      { phase: "deliver",  t: "T+1:34", tag: "DNS",    action: "Bought mealmap.app on Porkbun · pointed CNAME at Vercel" },
      { phase: "deliver",  t: "T+1:38", tag: "SSL",    action: "Let's Encrypt cert issued · green lock verified" },
      { phase: "deliver",  t: "T+1:40", tag: "GATE",   action: "Waiting — click the preview URL and approve the launch", status: "gate" },
      { phase: "deliver",  t: "T+1:42", tag: "LIVE",   action: "Live at mealmap.app · first 2 signups in 4 minutes", status: "win" },
    ],
  },
  {
    code: "02",
    tag: "STARTUP",
    title: "Incorporate your company.",
    shortTitle: "Start a startup",
    mission:
      "From an idea to a Delaware C-corp with an EIN, a funded bank account, founder stock, 83(b) filed, cap table live, and bylaws signed — in one afternoon.",
    withoutTwin: { time: "2–3 weeks", cost: "$800 (Stripe Atlas)" },
    withTwin: { time: "2h 38m", cost: "$189 (DE fees)" },
    metrics: [
      { label: "Filings", value: "6" },
      { label: "Your signatures", value: "3" },
      { label: "Cap table", value: "Live" },
      { label: "Bank funded", value: "Yes" },
    ],
    steps: [
      { phase: "discover", t: "T+0:00", tag: "BRIEF",   action: "Parsed: 'Twinly Inc · 10M shares · single founder · Delaware · bootstrapping'" },
      { phase: "discover", t: "T+0:06", tag: "NAME",    action: "Checked DE + 47-state database for 'Twinly Inc' · clear" },
      { phase: "discover", t: "T+0:14", tag: "STRATEGY",action: "Stripe Atlas takes 2 weeks · we're filing directly with DE — faster + cheaper" },
      { phase: "execute",  t: "T+0:28", tag: "FORM",    action: "Drafted Certificate of Incorporation · 10M authorized at $0.00001 par" },
      { phase: "execute",  t: "T+0:41", tag: "DE",      action: "Filed with DE Division of Corporations · $89 state + $50 expedited" },
      { phase: "execute",  t: "T+0:56", tag: "IRS",     action: "Applied for EIN via SS-4 · received instantly · 93-xxxxxxx" },
      { phase: "execute",  t: "T+1:08", tag: "BANK",    action: "Opened Mercury account · uploaded docs · approved in 22 minutes" },
      { phase: "execute",  t: "T+1:24", tag: "STOCK",   action: "Drafted founder stock purchase agreement · 8M shares at $0.0001 / $800" },
      { phase: "execute",  t: "T+1:38", tag: "83B",     action: "Drafted + mailed 83(b) election to IRS via USPS certified" },
      { phase: "execute",  t: "T+1:52", tag: "CAP",     action: "Pulley cap table live · 4yr vest / 1yr cliff on your founder shares" },
      { phase: "execute",  t: "T+2:08", tag: "BYLAWS",  action: "Drafted bylaws + initial board resolutions" },
      { phase: "deliver",  t: "T+2:22", tag: "GATE",    action: "Waiting — sign CoI, stock agreement, and 83(b) election", status: "gate" },
      { phase: "deliver",  t: "T+2:32", tag: "FILE",    action: "All documents filed · DE records updated · Mercury unlocked" },
      { phase: "deliver",  t: "T+2:38", tag: "LIVE",    action: "Twinly Inc. operational · EIN active · ready to invoice", status: "win" },
    ],
  },
  {
    code: "03",
    tag: "APPLY",
    title: "Apply to 40 jobs in a day.",
    shortTitle: "Land a job",
    mission:
      "From your resume to 40 tailored applications across LinkedIn, Lever, Greenhouse, and Ashby — each with a custom resume, a personal cover letter, and a hiring-manager outreach.",
    withoutTwin: { time: "~3 weeks", cost: "Career coach $1,500" },
    withTwin: { time: "2h 46m", cost: "$0" },
    metrics: [
      { label: "Applications", value: "40" },
      { label: "Custom resumes", value: "40" },
      { label: "HM outreach", value: "12" },
      { label: "Callbacks day-1", value: "6" },
    ],
    steps: [
      { phase: "discover", t: "T+0:00", tag: "BRIEF",    action: "Parsed: 'Senior product eng · SF or remote · B2B SaaS · $180–220k'" },
      { phase: "discover", t: "T+0:08", tag: "SCRAPE",   action: "Scraped LinkedIn + Wellfound + Lever · 340 raw matches" },
      { phase: "discover", t: "T+0:22", tag: "RANK",     action: "Ranked by fit score × stage × compensation signal · top 40 picked" },
      { phase: "discover", t: "T+0:36", tag: "MEM",      action: "Loaded your 3 prior resumes · extracted voice, achievements, metrics" },
      { phase: "execute",  t: "T+0:48", tag: "TAILOR",   action: "Generated 40 custom resumes · each re-orders bullets per JD keywords" },
      { phase: "execute",  t: "T+1:04", tag: "COVER",    action: "Wrote 40 cover letters · 3 paragraphs each · in your voice" },
      { phase: "execute",  t: "T+1:22", tag: "SEED",     action: "Seeded 40 company-specific hooks — founders, recent news, hiring context" },
      { phase: "execute",  t: "T+1:38", tag: "APPLY",    action: "Opened 40 application portals · filled every field · uploaded PDFs" },
      { phase: "execute",  t: "T+1:56", tag: "TRACK",    action: "Built a Notion tracker · company, role, status, next-step date" },
      { phase: "execute",  t: "T+2:14", tag: "FOLLOW",   action: "Scheduled 7-day follow-up emails for all 40" },
      { phase: "execute",  t: "T+2:28", tag: "LINKEDIN", action: "DM'd 12 hiring managers directly · templated but personal" },
      { phase: "deliver",  t: "T+2:42", tag: "GATE",     action: "Waiting — review the tracker and approve the batch send", status: "gate" },
      { phase: "deliver",  t: "T+2:46", tag: "SENT",     action: "All 40 live · 6 auto-replies · 1 interview slot already booked", status: "win" },
    ],
  },
  {
    code: "04",
    tag: "LAUNCH",
    title: "Launch on Product Hunt.",
    shortTitle: "Launch on PH",
    mission:
      "From an app you built to a #1 Product of the Day launch — pre-launch hype, assets, coordinated email drop, real-time comment replies, and a shipping post-mortem.",
    withoutTwin: { time: "~4 days solo", cost: "Growth consultant $2k" },
    withTwin: { time: "8h 04m", cost: "$0" },
    metrics: [
      { label: "PH rank", value: "#1" },
      { label: "Upvotes", value: "1,284" },
      { label: "Signups", value: "2,140" },
      { label: "Day-1 revenue", value: "$4,820" },
    ],
    steps: [
      { phase: "discover", t: "T+0:00", tag: "BRIEF",   action: "Parsed: 'Launch mealmap.app on PH next Tuesday · $9/mo SaaS · target #1'" },
      { phase: "execute",  t: "T+0:08", tag: "ASSETS",  action: "Drafted tagline, first-comment, 6 carousel slides, maker comment" },
      { phase: "execute",  t: "T+0:22", tag: "ART",     action: "Generated 6 hero images via Midjourney · iterated 12 times" },
      { phase: "execute",  t: "T+0:41", tag: "VIDEO",   action: "Built 45s demo video with Remotion · screen recording + captions" },
      { phase: "execute",  t: "T+0:58", tag: "TEASE",   action: "Pre-launch scheduled: 12 tweets + 4 LinkedIn posts for Mon-Tue" },
      { phase: "execute",  t: "T+1:14", tag: "EMAIL",   action: "Drafted launch email for 3.2k waitlist · scheduled 6am ET" },
      { phase: "execute",  t: "T+1:28", tag: "HUNT",    action: "Coordinated with a PH hunter for Tuesday 12:01am PT launch" },
      { phase: "execute",  t: "T+1:42", tag: "UPLOAD",  action: "Uploaded PH assets · reviewed thumbnail, screenshots, video, copy" },
      { phase: "execute",  t: "T+1:58", tag: "SCHED",   action: "Launch day: 6am email → 8am Twitter → 9am LinkedIn → all-day monitor" },
      { phase: "execute",  t: "T+2:14", tag: "REPLY",   action: "Drafted 47 comment replies · in your voice · addressing specific questions" },
      { phase: "execute",  t: "T+2:42", tag: "MONITOR", action: "Watched comment velocity · flagged 3 questions that need founder response" },
      { phase: "deliver",  t: "T+8:00", tag: "GATE",    action: "Waiting — approve the final thank-you tweet and the day-2 follow-up plan", status: "gate" },
      { phase: "deliver",  t: "T+8:04", tag: "WIN",     action: "#1 Product of the Day · 1,284 upvotes · $4,820 day-one revenue", status: "win" },
    ],
  },
  {
    code: "05",
    tag: "NEGOTIATE",
    title: "Negotiate your rent down.",
    shortTitle: "Beat the rent hike",
    mission:
      "From a 12% rent-hike letter to a signed renewal $200/mo BELOW your current rent — using market comps, maintenance history, rent-control ordinance, and well-timed follow-ups.",
    withoutTwin: { time: "Never happens", cost: "$4,800/yr extra" },
    withTwin: { time: "7 days + 2 approvals", cost: "$0" },
    metrics: [
      { label: "Monthly saved", value: "$600" },
      { label: "Annual saved", value: "$7,200" },
      { label: "Letters drafted", value: "3" },
      { label: "Your touches", value: "2" },
    ],
    steps: [
      { phase: "discover", t: "T+0:00", tag: "BRIEF",   action: "Landlord proposed 12% hike ($3,400 → $3,800) · lease ends 45 days out" },
      { phase: "discover", t: "T+0:06", tag: "COMPS",   action: "Scraped Zillow + Apartments.com for your block · 18 active listings" },
      { phase: "discover", t: "T+0:18", tag: "ANALYZE", action: "Your unit is $380 above comparable comps — market is softening" },
      { phase: "discover", t: "T+0:28", tag: "LEGAL",   action: "Checked SF rent ordinance · you're in a rent-controlled unit · 6.8% cap" },
      { phase: "discover", t: "T+0:38", tag: "HISTORY", action: "Pulled your maintenance tickets · 6 unresolved issues over 2 years" },
      { phase: "execute",  t: "T+0:52", tag: "DRAFT",   action: "Wrote 3-paragraph counter letter · cited comps, tickets, ordinance" },
      { phase: "execute",  t: "T+1:08", tag: "SEND",    action: "Emailed property manager + cc'd their corporate office" },
      { phase: "execute",  t: "T+1:22", tag: "CAL",     action: "Scheduled follow-up calls for Day 3, 7, and 14" },
      { phase: "execute",  t: "T+3:00", tag: "PARSE",   action: "Landlord countered at $3,500 · 8% below their original ask" },
      { phase: "execute",  t: "T+3:04", tag: "COUNTER", action: "Drafted second letter · held at $3,200 · flagged tenant board option" },
      { phase: "deliver",  t: "T+3:12", tag: "GATE",    action: "Waiting — approve the final counter-offer", status: "gate" },
      { phase: "deliver",  t: "T+7:00", tag: "WIN",     action: "Landlord signed at $3,200 · $7,200/yr saved · new lease executed", status: "win" },
    ],
  },
  {
    code: "06",
    tag: "RESEARCH",
    title: "Write your final paper.",
    shortTitle: "Ship the paper",
    mission:
      "From a blank Canvas prompt to a submitted, cited, formatted 12-page final — 31 sources read, MLA bibliography, 1.2% Turnitin, in your voice at your grade level.",
    withoutTwin: { time: "3 all-nighters", cost: "$0 (your GPA)" },
    withTwin: { time: "1h 34m", cost: "$0" },
    metrics: [
      { label: "Sources read", value: "31" },
      { label: "Turnitin", value: "1.2%" },
      { label: "Pages", value: "12" },
      { label: "Your edits", value: "Optional" },
    ],
    steps: [
      { phase: "discover", t: "T+0:00", tag: "BRIEF",   action: "ENGL 402 · 'Shklovsky's ostranenie in late-modernist prose' · 12 pages, MLA" },
      { phase: "discover", t: "T+0:05", tag: "READ",    action: "Pulled syllabus · extracted 14 assigned readings · 8 PDFs, 6 chapters" },
      { phase: "discover", t: "T+0:18", tag: "MEM",     action: "Loaded your 3 prior papers · mapped argument shape, hedges, sign-offs" },
      { phase: "execute",  t: "T+0:28", tag: "SOURCE",  action: "Read 31 academic sources in parallel · 4 primary, 27 secondary" },
      { phase: "execute",  t: "T+0:41", tag: "THINK",   action: "Built argument tree · 3 alternative thesis drafts · picked the strongest" },
      { phase: "execute",  t: "T+0:54", tag: "CITE",    action: "Generated MLA bibliography · all 31 citations verified in JSTOR" },
      { phase: "execute",  t: "T+1:08", tag: "DRAFT",   action: "12-page draft at your grade level · uses your transitions + hedges" },
      { phase: "execute",  t: "T+1:21", tag: "XREF",    action: "Turnitin similarity 1.2% · paraphrase originality 94%" },
      { phase: "execute",  t: "T+1:28", tag: "VOICE",   action: "Final pass · matched vocabulary variance to your last A-paper" },
      { phase: "deliver",  t: "T+1:32", tag: "CANVAS",  action: "Uploaded to Canvas · checked formatting, filename, submission slot" },
      { phase: "deliver",  t: "T+1:34", tag: "GATE",    action: "Waiting — skim the draft and tap submit", status: "gate" },
    ],
  },
  {
    code: "07",
    tag: "FREELANCE",
    title: "Launch your freelance biz.",
    shortTitle: "Go freelance",
    mission:
      "From 'I want to quit my job' to an LLC, a portfolio site, invoicing software, a signed MSA template, and 3 inbound leads — in a single afternoon.",
    withoutTwin: { time: "1 month", cost: "$2,000 legal + web" },
    withTwin: { time: "3h 14m", cost: "$340" },
    metrics: [
      { label: "Setup cost", value: "$340" },
      { label: "Portfolio", value: "Live" },
      { label: "First leads", value: "3" },
      { label: "Legal", value: "MSA ready" },
    ],
    steps: [
      { phase: "discover", t: "T+0:00", tag: "BRIEF",    action: "'Solo web design freelancer · SF · $150/hr target · book by end of month'" },
      { phase: "discover", t: "T+0:08", tag: "NAME",     action: "'Greenfield Design Co' checked · clear in CA · domain + socials available" },
      { phase: "execute",  t: "T+0:18", tag: "LLC",      action: "Filed CA LLC via Bizee · $70 state fee + $300 annual franchise tax" },
      { phase: "execute",  t: "T+0:32", tag: "EIN",      action: "IRS SS-4 filed · EIN issued in 4 minutes" },
      { phase: "execute",  t: "T+0:42", tag: "BANK",     action: "Mercury business account opened · $0 fee · debit card mailing" },
      { phase: "execute",  t: "T+0:56", tag: "SITE",     action: "Built portfolio site · 6 case studies · deployed to greenfield.co" },
      { phase: "execute",  t: "T+1:14", tag: "INVOICE",  action: "Set up Harvest time tracking + invoicing · wired Stripe Connect" },
      { phase: "execute",  t: "T+1:28", tag: "CONTRACT", action: "Generated master service agreement template · lawyer-reviewed template" },
      { phase: "execute",  t: "T+1:42", tag: "PROPOSAL", action: "3 proposal templates for common gigs (branding, landing, full build)" },
      { phase: "execute",  t: "T+2:00", tag: "PITCH",    action: "Wrote outbound pitches to 40 target companies · scheduled send" },
      { phase: "execute",  t: "T+2:22", tag: "TAX",      action: "Set up quarterly estimated tax payments · calendar reminders" },
      { phase: "execute",  t: "T+2:40", tag: "CRM",      action: "Built a Notion CRM for tracking leads, contracts, payments" },
      { phase: "deliver",  t: "T+2:58", tag: "GATE",     action: "Waiting — review the MSA before it goes out to any client", status: "gate" },
      { phase: "deliver",  t: "T+3:14", tag: "LIVE",     action: "3 inbound leads from your first-day pitches", status: "win" },
    ],
  },
  {
    code: "08",
    tag: "TAX",
    title: "File your 2025 return.",
    shortTitle: "File taxes",
    mission:
      "End-to-end: every W-2, 1099, deduction, state split, and carry-forward pulled, classified, and filed — direct to the IRS with no software fee. Two hours. One signature.",
    withoutTwin: { time: "A weekend + H&R Block", cost: "$200–400" },
    withTwin: { time: "2h 14m", cost: "$0" },
    metrics: [
      { label: "Wall time", value: "2h 14m" },
      { label: "Your touches", value: "1" },
      { label: "Software fee", value: "$0" },
      { label: "Est. refund", value: "$4,217" },
    ],
    steps: [
      { phase: "discover", t: "T+0:00", tag: "MEM",    action: "Pulled your 2024 return from iCloud Drive · 8 carry-forwards flagged" },
      { phase: "discover", t: "T+0:04", tag: "MAIL",   action: "Scraped W-2 PDF from Shopify HR · verified SSN match" },
      { phase: "discover", t: "T+0:11", tag: "MAIL",   action: "Found 3 × 1099-NEC: Stripe, Coinbase, Upwork" },
      { phase: "discover", t: "T+0:18", tag: "BANK",   action: "Pulled 2,841 transactions across Chase, Amex, Capital One" },
      { phase: "execute",  t: "T+0:31", tag: "REASON", action: "Classified 142 purchases as deductible — SaaS tools, home-office %" },
      { phase: "execute",  t: "T+0:47", tag: "STATE",  action: "Split PA → NY move on Aug 14 · dual-state residency computed" },
      { phase: "execute",  t: "T+1:02", tag: "IRS",    action: "Checked open notices + transcripts against your SSN · clean" },
      { phase: "execute",  t: "T+1:14", tag: "FILE",   action: "Logged into IRS Direct File · no $200 TurboTax upsell" },
      { phase: "execute",  t: "T+1:28", tag: "FORM",   action: "Schedule C drafted · 14 line items · SE tax pre-calculated" },
      { phase: "execute",  t: "T+1:41", tag: "XREF",   action: "Cross-checked K-1 from your LLC · matched partner draws" },
      { phase: "execute",  t: "T+1:54", tag: "SCORE",  action: "Estimated refund $4,217 · confidence 94% · audit-risk flags 0" },
      { phase: "deliver",  t: "T+2:08", tag: "GATE",   action: "Waiting — review the 1040 and e-sign", status: "gate" },
      { phase: "deliver",  t: "T+2:12", tag: "SUBMIT", action: "Submitted · IRS acknowledged in 47 seconds", status: "win" },
      { phase: "deliver",  t: "T+2:14", tag: "CAL",    action: "Scheduled 4 × quarterly estimate reminders for 2026" },
    ],
  },
];

const THINK_TAGS = new Set([
  "MEM", "REASON", "THINK", "BRIEF", "SCORE", "MATCH",
  "ANALYZE", "PLAN", "STRATEGY", "MOOD", "RANK",
]);

function tagColor(tag: string, status?: StepStatus): string {
  if (status === "gate") return "hsl(var(--ember))";
  if (status === "win") return "hsl(var(--accent))";
  if (THINK_TAGS.has(tag)) return "hsl(var(--accent))";
  return "hsl(var(--fg-3))";
}

const PHASE_LABEL: Record<Phase, string> = {
  discover: "Phase 01 · Discover",
  execute: "Phase 02 · Execute",
  deliver: "Phase 03 · Deliver",
};

function StepCard({ step, i }: { step: Step; i: number }) {
  const color = tagColor(step.tag, step.status);
  const isGate = step.status === "gate";
  const isWin = step.status === "win";

  return (
    <motion.li
      initial={{ opacity: 0, x: 70, filter: "blur(6px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: -40, filter: "blur(6px)" }}
      transition={{
        duration: 0.68,
        delay: 0.05 * i,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative pl-9 pr-3 py-5"
    >
      <span
        className="absolute left-0 top-[26px] w-[10px] h-[10px] rounded-full"
        style={{
          background: color,
          boxShadow:
            isWin || isGate
              ? `0 0 14px ${color}`
              : "0 0 0 1px hsl(var(--rule-hi))",
          animation: isGate ? "pb-pulse 1.6s ease-in-out infinite" : undefined,
        }}
      />
      <span
        aria-hidden
        className="absolute left-[4.5px] top-[36px] bottom-[-4px] w-[1px]"
        style={{ background: "hsl(var(--rule))" }}
      />

      <div className="flex items-center gap-4 mb-2">
        <span className="f-mono text-[0.54rem] font-medium tracking-[0.16em] uppercase text-fg-4 tabular-nums">
          {step.t}
        </span>
        <span
          className="f-mono text-[0.54rem] font-semibold tracking-[0.2em] uppercase px-2 py-[2px] border"
          style={{
            color,
            borderColor: color,
            background:
              isGate || isWin
                ? `${color.replace(")", " / 0.08)")}`
                : "transparent",
          }}
        >
          {step.tag}
        </span>
        {isGate && (
          <span className="f-mono text-[0.5rem] font-semibold tracking-[0.22em] uppercase text-ember ml-auto">
            Awaiting you
          </span>
        )}
        {isWin && (
          <span className="f-mono text-[0.5rem] font-semibold tracking-[0.22em] uppercase text-accent ml-auto">
            Delivered
          </span>
        )}
      </div>

      <p
        className={`text-[15.5px] md:text-[16.5px] leading-[1.5] font-normal ${
          isGate || isWin ? "text-fg" : "text-fg-2"
        }`}
      >
        {step.action}
      </p>
    </motion.li>
  );
}

function PhaseHeader({ phase, stepCount }: { phase: Phase; stepCount: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-4 pt-8 pb-4 pl-9"
    >
      <span className="f-mono text-[0.56rem] font-semibold tracking-[0.24em] uppercase text-accent">
        {PHASE_LABEL[phase]}
      </span>
      <span className="h-px flex-1 bg-rule-hi" />
      <span className="f-mono text-[0.52rem] tracking-[0.18em] uppercase text-fg-4">
        {stepCount} steps
      </span>
    </motion.div>
  );
}

export default function UseCases() {
  const [activeIdx, setActiveIdx] = useState(0);
  const pb = PLAYBOOKS[activeIdx];

  // Group steps by phase for rendering
  const phases: Phase[] = ["discover", "execute", "deliver"];
  const grouped = phases
    .map((p) => ({ phase: p, steps: pb.steps.filter((s) => s.phase === p) }))
    .filter((g) => g.steps.length > 0);

  return (
    <section
      id="use-cases"
      className="sec border-t border-rule relative overflow-hidden"
    >
      <span
        aria-hidden
        className="ghost-wordmark"
        style={{
          fontSize: "clamp(14rem, 32vw, 32rem)",
          top: "20%",
          right: "-8%",
        }}
      >
        trace.
      </span>

      <div className="relative w-full max-w-[1680px] mx-auto px-6 md:px-14">
        <div className="sec-head">
          <div className="sec-ident">
            <span className="num">
              04<span className="sl">/</span>
            </span>
            Playbooks
          </div>
          <KineticHeadline>
            Not a demo. An <span className="tw-italic text-accent">execution trace.</span>
          </KineticHeadline>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="sec-lede"
          >
            Anything a human at a computer can do, Twinly can do — coding, incorporation,
            job hunts, product launches, negotiation, filing taxes. Pick a case below and
            read the step-by-step log of how it actually gets delivered.
          </motion.p>
        </div>

        {/* Split: sticky nav + main content */}
        <div className="grid lg:grid-cols-[260px_1fr] gap-12 lg:gap-20">
          {/* Sticky case selector */}
          <nav className="lg:sticky lg:top-28 lg:self-start">
            <div className="f-mono text-[0.52rem] font-medium tracking-[0.22em] uppercase text-fg-4 mb-5 pb-3 border-b border-rule">
              Select a case
            </div>
            <ul className="flex flex-col">
              {PLAYBOOKS.map((p, i) => {
                const active = i === activeIdx;
                return (
                  <li key={p.code}>
                    <button
                      onClick={() => setActiveIdx(i)}
                      data-magnetic
                      className="group relative w-full flex items-baseline gap-4 py-3.5 text-left transition-colors"
                    >
                      <span
                        className={`f-mono text-[0.56rem] font-medium tracking-[0.18em] transition-colors ${
                          active ? "text-accent" : "text-fg-4"
                        }`}
                      >
                        {p.code}
                      </span>
                      <span
                        className={`text-[15px] transition-colors ${
                          active
                            ? "text-fg font-medium"
                            : "text-fg-3 group-hover:text-fg-2"
                        }`}
                      >
                        {p.shortTitle}
                      </span>
                      {active && (
                        <motion.span
                          layoutId="pb-active-rail"
                          className="absolute left-[-24px] top-1/2 -translate-y-1/2 w-[2px] h-7 bg-accent"
                          style={{
                            boxShadow: "0 0 10px hsl(var(--accent) / 0.6)",
                          }}
                          transition={{
                            type: "spring",
                            damping: 26,
                            stiffness: 240,
                          }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Main content */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={pb.code}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Case header */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center gap-3 mb-5"
                >
                  <span className="f-mono text-[0.58rem] font-semibold tracking-[0.22em] text-accent">
                    {pb.code}
                  </span>
                  <span className="h-px w-10 bg-rule-hi" />
                  <span className="f-mono text-[0.54rem] font-medium tracking-[0.22em] uppercase text-fg-3">
                    {pb.tag}
                  </span>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, x: 60, filter: "blur(6px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -40, filter: "blur(6px)" }}
                  transition={{
                    duration: 0.9,
                    delay: 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-fg mb-5"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontVariationSettings: "'SOFT' 30, 'WONK' 0",
                    fontSize: "clamp(2.4rem, 4.4vw, 4.4rem)",
                    lineHeight: 0.96,
                    letterSpacing: "-0.03em",
                    fontWeight: 400,
                    maxWidth: "22ch",
                  }}
                >
                  {pb.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.22,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-fg-2 max-w-[62ch] mb-12"
                  style={{
                    fontSize: "clamp(1.05rem, 1.25vw, 1.22rem)",
                    lineHeight: 1.62,
                  }}
                >
                  {pb.mission}
                </motion.p>

                {/* Without vs With comparison */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="grid grid-cols-2 gap-8 mb-12 max-w-[780px]"
                >
                  <div>
                    <div className="f-mono text-[0.52rem] font-medium tracking-[0.22em] uppercase text-fg-4 mb-3">
                      Without twin
                    </div>
                    <div
                      className="text-fg-3 line-through decoration-ember/50 decoration-[1.5px]"
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontVariationSettings: "'SOFT' 40, 'WONK' 0",
                        fontSize: "clamp(1.3rem, 1.9vw, 1.85rem)",
                        letterSpacing: "-0.022em",
                        lineHeight: 1.08,
                      }}
                    >
                      {pb.withoutTwin.time}
                    </div>
                    <div className="mt-2 f-mono text-[0.58rem] tracking-[0.16em] uppercase text-fg-4">
                      {pb.withoutTwin.cost}
                    </div>
                  </div>
                  <div>
                    <div className="f-mono text-[0.52rem] font-medium tracking-[0.22em] uppercase text-accent mb-3">
                      With twin
                    </div>
                    <div
                      className="text-fg"
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontVariationSettings: "'SOFT' 40, 'WONK' 0",
                        fontSize: "clamp(1.3rem, 1.9vw, 1.85rem)",
                        letterSpacing: "-0.022em",
                        lineHeight: 1.08,
                      }}
                    >
                      {pb.withTwin.time}
                    </div>
                    <div className="mt-2 f-mono text-[0.58rem] tracking-[0.16em] uppercase text-fg-3">
                      {pb.withTwin.cost}
                    </div>
                  </div>
                </motion.div>

                {/* Metrics row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-14 pt-8 border-t border-rule">
                  {pb.metrics.map((m, i) => (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.38 + i * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex flex-col gap-2"
                    >
                      <div className="f-mono text-[0.5rem] font-medium tracking-[0.22em] uppercase text-fg-4">
                        {m.label}
                      </div>
                      <div
                        className="text-fg"
                        style={{
                          fontFamily: "'Fraunces', serif",
                          fontVariationSettings: "'SOFT' 40, 'WONK' 0",
                          fontSize: "clamp(1.7rem, 2.4vw, 2.4rem)",
                          letterSpacing: "-0.028em",
                          lineHeight: 1,
                          fontWeight: 400,
                        }}
                      >
                        {m.value}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Phased steps */}
                <div className="relative">
                  <div className="f-mono text-[0.52rem] font-medium tracking-[0.22em] uppercase text-fg-4 mb-3 flex items-center gap-3">
                    <span className="h-px w-8 bg-accent" />
                    Execution trace · {pb.steps.length} events across {grouped.length} phases
                  </div>
                  <ol className="flex flex-col">
                    {grouped.map((g, gi) => {
                      // Flatten running index across phases for consistent stagger
                      const priorSteps = grouped
                        .slice(0, gi)
                        .reduce((n, x) => n + x.steps.length, 0);
                      return (
                        <div key={g.phase}>
                          <PhaseHeader phase={g.phase} stepCount={g.steps.length} />
                          {g.steps.map((step, i) => (
                            <StepCard
                              key={`${pb.code}-${g.phase}-${i}`}
                              step={step}
                              i={priorSteps + i}
                            />
                          ))}
                        </div>
                      );
                    })}
                  </ol>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pb-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.82); }
        }
      `}</style>
    </section>
  );
}
