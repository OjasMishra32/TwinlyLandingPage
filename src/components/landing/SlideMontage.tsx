import { motion } from "framer-motion";
import KeynoteSlide from "./KeynoteSlide";

/**
 * SlideMontage — "and infinite more". After the focused demos, this
 * slide shows a bento-grid montage of dozens of things Twinly can do,
 * cascading in with stagger, ending with a "+ infinite more use
 * cases" tile. Demonstrates breadth without dedicating a full slide
 * to each one.
 */

type State = "done" | "running" | "approve";

type Task = {
  code: string;
  title: string;
  meta: string;
  state: State;
  w?: string; // col-span
};

const tasks: Task[] = [
  { code: "01", title: "Took the car to the shop", meta: "Saved $240 on labor", state: "done" },
  { code: "02", title: "Cancelled Adobe + 8 others", meta: "$247 / mo back", state: "done" },
  { code: "03", title: "Ghostwrote your wedding speech", meta: "1,200 words, in your voice", state: "running" },
  { code: "04", title: "Argued your Blue Shield claim", meta: "Recovered $3,820", state: "done", w: "md:col-span-2" },
  { code: "05", title: "Rotated every password", meta: "43 accounts secured", state: "done" },
  { code: "06", title: "Reviewed your SF lease", meta: "Flagged 4 illegal clauses", state: "approve" },
  { code: "07", title: "Scheduled your physical", meta: "Dr. Kim · Tue 10am", state: "done" },
  { code: "08", title: "Cold-DM'd 80 PMs at Stripe", meta: "12 replies · 3 coffees", state: "done" },
  { code: "09", title: "Debugged staging deploy", meta: "Fixed race in auth/session", state: "done", w: "md:col-span-2" },
  { code: "10", title: "Drafted 12 thank-you notes", meta: "Handwriting font matched", state: "approve" },
  { code: "11", title: "Filed an LLC for your side gig", meta: "EIN in 4 minutes", state: "done" },
  { code: "12", title: "Negotiated your Comcast bill", meta: "$40 / mo lower", state: "done" },
  { code: "13", title: "Read all 47 PRs on the backend", meta: "Summary in your inbox", state: "running" },
  { code: "14", title: "Planned mom's 60th", meta: "Venue held · RSVPs going", state: "approve" },
];

const stateColor: Record<State, string> = {
  running: "hsl(var(--accent))",
  approve: "hsl(var(--ember))",
  done: "hsl(var(--fg-3))",
};

const stateLabel: Record<State, string> = {
  running: "Running",
  approve: "Approve",
  done: "Done",
};

export default function SlideMontage() {
  return (
    <KeynoteSlide
      id="montage"
      eyebrow="And infinite more"
      headline={
        <>
          You know how you{" "}
          <span className="tw-italic text-accent">normally</span>
          <br />
          do all this stuff?
        </>
      }
      body={
        <>
          Twinly did all of this in the last 48 hours for 200 beta users.
          Every tile below is a real job that landed. The only limit is
          what you can describe in one sentence.
        </>
      }
      align="center"
      visual={
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
          {tasks.map((t, i) => {
            const color = stateColor[t.state];
            return (
              <motion.div
                key={t.code}
                initial={{ opacity: 0, y: 40, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-6%" }}
                transition={{
                  duration: 0.7,
                  delay: 0.04 * i,
                  type: "spring",
                  damping: 22,
                  stiffness: 180,
                }}
                className={`relative text-left border border-rule-hi/60 p-5 ${t.w || ""}`}
                style={{
                  background:
                    "linear-gradient(180deg, hsl(var(--bg-2) / 0.7) 0%, hsl(var(--bg) / 0.7) 100%)",
                  boxShadow: "0 30px 70px -40px rgba(0,0,0,0.7)",
                }}
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-0 bottom-0 w-[2px]"
                  style={{
                    background: color,
                    boxShadow:
                      t.state === "running"
                        ? `0 0 10px ${color}`
                        : undefined,
                  }}
                />
                <div className="flex items-start justify-between gap-3 mb-3 pl-1.5">
                  <span
                    className="f-mono text-[0.52rem] font-semibold tracking-[0.22em] uppercase text-fg-4"
                  >
                    {t.code}
                  </span>
                  <span
                    className="f-mono text-[0.5rem] font-medium tracking-[0.2em] uppercase"
                    style={{ color }}
                  >
                    {stateLabel[t.state]}
                  </span>
                </div>
                <div
                  className="text-fg mb-1.5 pl-1.5"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontVariationSettings: "'SOFT' 40",
                    fontSize: "1.15rem",
                    lineHeight: 1.1,
                    letterSpacing: "-0.025em",
                  }}
                >
                  {t.title}
                </div>
                <div className="f-mono text-[0.54rem] tracking-[0.04em] text-fg-3 pl-1.5">
                  {t.meta}
                </div>
              </motion.div>
            );
          })}

          {/* Terminator tile */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-6%" }}
            transition={{
              duration: 0.9,
              delay: 0.04 * tasks.length + 0.15,
              type: "spring",
              damping: 20,
              stiffness: 160,
            }}
            className="relative text-left p-5 md:col-span-2 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--accent) / 0.12) 0%, hsl(var(--accent) / 0.02) 100%)",
              border: "1px solid hsl(var(--accent) / 0.5)",
              boxShadow: "0 40px 100px -40px hsl(var(--accent) / 0.3)",
            }}
          >
            <div className="f-mono text-[0.52rem] font-semibold tracking-[0.22em] uppercase text-accent mb-3">
              ∞ · unlimited
            </div>
            <div
              className="text-fg mb-2"
              style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: "italic",
                fontVariationSettings: "'SOFT' 40",
                fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
              }}
            >
              And infinite more.
            </div>
            <div className="text-[12.5px] text-fg-3 leading-[1.55] max-w-[42ch]">
              If you can describe it in one sentence, and a human with a
              computer could do it, Twinly can. That's the whole deal.
            </div>
          </motion.div>
        </div>
      }
    />
  );
}
