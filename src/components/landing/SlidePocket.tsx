import { motion } from "framer-motion";
import KeynoteSlide from "./KeynoteSlide";
import { Check } from "./icons";

/**
 * SlidePocket — "just text it". Split view, fundamentally different
 * from SlideTrip. On the left: a small iPhone running the native
 * Twinly app, showing the user's requests and the twin's replies.
 * On the right: a full macOS browser window where you can actually
 * watch Twinly jump between real tabs (Kayak → AA.com → Gmail) to
 * get the work done, with a live action log streaming every step
 * along the bottom. You're watching a human use a computer, just
 * faster than a human could.
 */

type PhoneMsg = {
  side: "me" | "twin";
  text: React.ReactNode;
  delay: number;
};

const phoneMsgs: PhoneMsg[] = [
  { side: "me", delay: 0.25, text: "Book a one-way to Tokyo Friday under $800" },
  { side: "twin", delay: 2.9, text: "JAL 002 · $712 · 11:30pm. Book it?" },
  { side: "me", delay: 3.7, text: "Yes" },
  { side: "twin", delay: 7.6, text: "Booked. Confirmation in your inbox." },
  {
    side: "twin",
    delay: 8.3,
    text: "Heads up, your passport expires in 9 months. Want me to start the renewal now?",
  },
];

const browserTabs = [
  { label: "Kayak · SFO→NRT", url: "kayak.com/flights/SFO-NRT", activeAt: 0.6, endAt: 3.9 },
  { label: "AA.com · booking", url: "aa.com/booking/passenger", activeAt: 3.9, endAt: 6.4 },
  { label: "Gmail · inbox", url: "mail.google.com/inbox", activeAt: 6.4, endAt: 10 },
];

const log = [
  { t: "00:02", text: "Opened kayak.com", done: 0.8 },
  { t: "00:05", text: "Searched SFO → NRT · Friday · 1 way", done: 1.3 },
  { t: "00:11", text: "Compared 47 results · sorted by price", done: 1.9 },
  { t: "00:18", text: "Selected JAL 002 · 11:30pm · $712", done: 2.5 },
  { t: "00:22", text: "Waiting on approval from user", done: 3.3 },
  { t: "00:29", text: "Switched to aa.com · pulled passenger record", done: 4.3 },
  { t: "00:34", text: "Filled passenger form · passport · seat 34K", done: 5.2 },
  { t: "00:41", text: "Submitted booking · paid w/ Chase ****8234", done: 5.9 },
  { t: "00:47", text: "Opened gmail · confirmation email received", done: 6.8 },
  { t: "00:52", text: "Replied to user · task complete", done: 7.5 },
];

function PhoneBubble({
  side,
  delay,
  children,
}: {
  side: "me" | "twin";
  delay: number;
  children: React.ReactNode;
}) {
  const isMe = side === "me";
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{
        duration: 0.5,
        delay,
        type: "spring",
        damping: 22,
        stiffness: 220,
      }}
      className={`flex ${isMe ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] px-2.5 py-1.5 text-[10.5px] leading-[1.38] ${
          isMe ? "text-bg" : "text-fg"
        }`}
        style={{
          background: isMe ? "hsl(var(--accent))" : "hsl(36 10% 14%)",
          borderRadius: isMe
            ? "14px 14px 4px 14px"
            : "14px 14px 14px 4px",
          boxShadow: isMe
            ? "0 8px 20px -14px hsl(var(--accent) / 0.6)"
            : "0 8px 20px -16px rgba(0,0,0,0.6)",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

export default function SlidePocket() {
  return (
    <KeynoteSlide
      id="pocket"
      eyebrow="Capability 04 · In your pocket"
      headline={
        <>
          Just{" "}
          <span className="tw-italic text-accent">text it.</span>
        </>
      }
      body={
        <>
          Download the native Twinly app from the App Store. Text one sentence,
          then actually watch your twin jump between real apps on a real
          computer and close the task out. No browser extension, no prompts.
          Just you texting.
        </>
      }
      align="center"
      spotlight
      visual={
        <div className="w-full max-w-[1240px] mx-auto">
          <div className="grid md:grid-cols-[240px_1fr] gap-6 md:gap-8 items-start">
            {/* LEFT: small phone with the text thread */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto md:mx-0 order-2 md:order-1"
            >
              <div
                className="relative"
                style={{
                  width: "240px",
                  aspectRatio: "9 / 19.5",
                  borderRadius: "40px",
                  padding: "10px",
                  background:
                    "linear-gradient(150deg, #2d2d33 0%, #0e0e10 45%, #1a1a1e 100%)",
                  boxShadow:
                    "0 0 0 1px hsl(var(--rule-hi) / 0.6), 0 70px 160px -40px rgba(0,0,0,0.95), 0 0 80px -30px hsl(var(--accent) / 0.2)",
                }}
              >
                <div
                  className="relative w-full h-full overflow-hidden"
                  style={{
                    borderRadius: "32px",
                    background:
                      "linear-gradient(180deg, hsl(36 10% 5%) 0%, hsl(36 10% 8%) 100%)",
                  }}
                >
                  {/* Dynamic island */}
                  <div
                    className="absolute top-[6px] left-1/2 -translate-x-1/2 z-[10]"
                    style={{
                      width: "72px",
                      height: "22px",
                      borderRadius: "999px",
                      background: "#000",
                    }}
                  />

                  {/* Status bar */}
                  <div
                    className="absolute top-[10px] left-4 z-[6] text-[9px] text-fg font-semibold tabular-nums"
                    style={{ fontFamily: "'Hanken Grotesk', system-ui" }}
                  >
                    9:41
                  </div>
                  <div className="absolute top-[11px] right-4 z-[6] flex items-center gap-1">
                    <div className="flex items-end gap-[1px]">
                      {[2, 3, 4, 5].map((h) => (
                        <span key={h} className="bg-fg" style={{ width: "2.5px", height: `${h}px` }} />
                      ))}
                    </div>
                    <span
                      className="text-[7.5px] text-fg font-semibold ml-0.5"
                      style={{ fontFamily: "'Hanken Grotesk', system-ui" }}
                    >
                      5G
                    </span>
                    <div className="ml-1 relative" style={{ width: "17px", height: "8px" }}>
                      <div className="absolute inset-0 border border-fg/85" style={{ borderRadius: "2px" }} />
                      <div
                        className="absolute left-[1px] top-[1px] bottom-[1px] bg-fg"
                        style={{ width: "12px", borderRadius: "1px" }}
                      />
                    </div>
                  </div>

                  {/* Conversation header */}
                  <div className="relative z-[2] pt-[38px] pb-2 px-3 border-b border-rule/40 flex items-center gap-2">
                    <div
                      className="w-6 h-6 flex items-center justify-center shrink-0"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(var(--accent) / 0.22) 0%, hsl(var(--accent) / 0.04) 100%)",
                        border: "1px solid hsl(var(--accent) / 0.4)",
                        borderRadius: "7px",
                      }}
                    >
                      <svg viewBox="0 0 34 34" className="w-[14px] h-[14px]">
                        <rect x="6" y="6" width="16" height="16" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.8" />
                        <rect x="12" y="12" width="16" height="16" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.8" />
                        <rect x="12" y="12" width="10" height="10" fill="hsl(var(--accent))" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-fg font-semibold"
                        style={{
                          fontFamily: "'Fraunces', serif",
                          fontSize: "11px",
                          lineHeight: 1,
                        }}
                      >
                        Twinly
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span
                          className="w-[4px] h-[4px] rounded-full bg-accent"
                          style={{ boxShadow: "0 0 5px hsl(var(--accent) / 0.7)" }}
                        />
                        <span className="f-mono text-[6.5px] tracking-[0.1em] uppercase text-fg-3">
                          working
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="absolute top-[78px] bottom-[54px] left-0 right-0 overflow-hidden">
                    <div className="flex flex-col gap-1.5 px-3 pt-2">
                      {phoneMsgs.map((m, i) => (
                        <PhoneBubble key={i} side={m.side} delay={m.delay}>
                          {m.text}
                        </PhoneBubble>
                      ))}
                    </div>
                  </div>

                  {/* Input bar */}
                  <div className="absolute bottom-0 left-0 right-0 pt-2 pb-4 px-3 border-t border-rule/40 bg-bg/50 backdrop-blur-sm">
                    <div
                      className="flex items-center gap-2 px-2.5 py-1.5 border border-rule/60"
                      style={{ background: "hsl(36 10% 11%)", borderRadius: "999px" }}
                    >
                      <div className="flex-1 text-[8px] text-fg-4">Message Twinly</div>
                      <div
                        className="w-4 h-4 flex items-center justify-center"
                        style={{ background: "hsl(var(--accent))", borderRadius: "999px" }}
                      >
                        <svg viewBox="0 0 16 16" className="w-2 h-2" fill="none" stroke="hsl(var(--bg))" strokeWidth="3">
                          <path d="M8 13V3 M3 8l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                    <div
                      className="mx-auto mt-1.5 rounded-full"
                      style={{ width: "80px", height: "3.5px", background: "hsl(var(--fg) / 0.35)" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Mac browser showing Twinly actually working */}
            <motion.div
              initial={{ opacity: 0, y: 44, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative order-1 md:order-2"
            >
              <div
                className="relative overflow-hidden border border-rule-hi/70"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(36 10% 9%) 0%, hsl(36 10% 5%) 100%)",
                  boxShadow:
                    "0 80px 200px -60px rgba(0,0,0,0.92), 0 0 160px -60px hsl(var(--accent) / 0.22)",
                  borderRadius: "10px",
                }}
              >
                {/* Title bar */}
                <div
                  className="flex items-center gap-3 px-4 py-2.5 border-b border-rule/70"
                  style={{ background: "hsl(36 10% 11%)" }}
                >
                  <div className="flex gap-1.5">
                    <span className="w-[11px] h-[11px] rounded-full bg-ember/70" />
                    <span className="w-[11px] h-[11px] rounded-full bg-fg-4" />
                    <span className="w-[11px] h-[11px] rounded-full bg-accent/60" />
                  </div>
                  <div className="flex-1 text-center f-mono text-[0.5rem] tracking-[0.14em] uppercase text-fg-4">
                    Twinly Operator · macOS
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-[5px] h-[5px] rounded-full bg-accent"
                      style={{
                        animation: "approval-blink 1.4s ease-in-out infinite",
                        boxShadow: "0 0 6px hsl(var(--accent) / 0.7)",
                      }}
                    />
                    <span className="f-mono text-[0.46rem] tracking-[0.14em] uppercase text-accent">
                      Working
                    </span>
                  </div>
                </div>

                {/* Tab strip */}
                <div className="flex items-end gap-1 px-2 pt-2" style={{ background: "hsl(36 10% 9.5%)" }}>
                  {browserTabs.map((tab, i) => (
                    <motion.div
                      key={tab.label}
                      className="relative flex-1 max-w-[180px] px-3 py-2 flex items-center gap-2 overflow-hidden"
                      initial={{
                        background: "hsl(36 10% 8%)",
                        opacity: 0.5,
                      }}
                      whileInView={{
                        background: [
                          "hsl(36 10% 8%)",
                          "hsl(36 10% 13%)",
                          "hsl(36 10% 13%)",
                          "hsl(36 10% 8%)",
                        ],
                        opacity: [0.5, 1, 1, 0.5],
                      }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{
                        duration: tab.endAt - tab.activeAt + 0.6,
                        delay: tab.activeAt,
                        times: [0, 0.05, 0.9, 1],
                      }}
                      style={{
                        borderTopLeftRadius: "7px",
                        borderTopRightRadius: "7px",
                        borderTop: "1px solid hsl(var(--rule) / 0.6)",
                        borderLeft: "1px solid hsl(var(--rule) / 0.6)",
                        borderRight: "1px solid hsl(var(--rule) / 0.6)",
                      }}
                    >
                      <div
                        className="w-[7px] h-[7px] rounded-full shrink-0"
                        style={{ background: "hsl(var(--accent) / 0.7)" }}
                      />
                      <span className="flex-1 f-mono text-[0.46rem] tracking-[0.08em] text-fg-2 truncate">
                        {tab.label}
                      </span>
                      <span className="text-fg-4 text-[10px] shrink-0">×</span>
                    </motion.div>
                  ))}
                  <div className="flex-none px-2 py-2 text-fg-4 text-[12px]">+</div>
                </div>

                {/* URL bar */}
                <div
                  className="flex items-center gap-3 px-3 py-2 border-b border-rule/60"
                  style={{ background: "hsl(36 10% 10%)" }}
                >
                  <div className="flex items-center gap-1.5 text-fg-4">
                    <span style={{ fontSize: "13px" }}>‹</span>
                    <span style={{ fontSize: "13px" }}>›</span>
                    <span style={{ fontSize: "12px" }}>↻</span>
                  </div>
                  <div
                    className="flex-1 flex items-center gap-2 px-3 py-1 border border-rule/60"
                    style={{ background: "hsl(36 10% 7%)", borderRadius: "999px" }}
                  >
                    <span className="text-accent text-[8px]">🔒</span>
                    <div className="relative h-[12px] flex-1 overflow-hidden">
                      {browserTabs.map((tab) => (
                        <motion.div
                          key={tab.url}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: [0, 0, 1, 1, 0] }}
                          viewport={{ once: true, margin: "-10%" }}
                          transition={{
                            duration: tab.endAt - tab.activeAt + 0.6,
                            delay: tab.activeAt - 0.1,
                            times: [0, 0.15, 0.25, 0.9, 1],
                          }}
                          className="absolute inset-0 f-mono text-[0.5rem] tracking-[0.04em] text-fg-3 leading-[12px]"
                        >
                          {tab.url}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content area — crossfades between the 3 tab states */}
                <div
                  className="relative"
                  style={{
                    minHeight: "360px",
                    background:
                      "linear-gradient(180deg, hsl(36 10% 4%) 0%, hsl(36 10% 3%) 100%)",
                  }}
                >
                  {/* STATE A — Kayak flight results */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: [0, 1, 1, 0] }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                      duration: 4.3,
                      delay: 0.55,
                      times: [0, 0.12, 0.82, 1],
                    }}
                    className="absolute inset-0 p-5"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-6 h-6 flex items-center justify-center"
                          style={{
                            background: "hsl(195 80% 55%)",
                            borderRadius: "6px",
                          }}
                        >
                          <span
                            className="text-white"
                            style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "-0.05em" }}
                          >
                            K
                          </span>
                        </div>
                        <div
                          className="text-fg font-semibold"
                          style={{ fontSize: "13px", letterSpacing: "-0.015em" }}
                        >
                          SFO → NRT
                        </div>
                        <div className="f-mono text-[0.5rem] tracking-[0.12em] uppercase text-fg-4">
                          Fri · 1 adult · 1 way
                        </div>
                      </div>
                      <div className="f-mono text-[0.5rem] tracking-[0.12em] uppercase text-fg-4">
                        47 results
                      </div>
                    </div>

                    <div className="space-y-2">
                      {[
                        { air: "UA 837", time: "06:15 · stop", price: "$1,034" },
                        { air: "ANA 7", time: "14:10 · direct", price: "$926" },
                        { air: "JAL 002", time: "23:30 · direct", price: "$712", hit: true },
                        { air: "DL 639", time: "12:45 · stop", price: "$789" },
                      ].map((r, i) => (
                        <motion.div
                          key={r.air}
                          initial={{ opacity: 0, x: -18 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-10%" }}
                          transition={{
                            duration: 0.45,
                            delay: 0.95 + i * 0.18,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className={`relative flex items-center gap-4 px-3 py-2.5 border ${
                            r.hit ? "border-accent/70" : "border-rule/50"
                          }`}
                          style={{
                            background: r.hit
                              ? "linear-gradient(90deg, hsl(var(--accent) / 0.12) 0%, hsl(var(--bg) / 0.3) 100%)"
                              : "hsl(36 10% 6%)",
                            borderRadius: "4px",
                            boxShadow: r.hit
                              ? "0 0 40px -12px hsl(var(--accent) / 0.55)"
                              : undefined,
                          }}
                        >
                          <div
                            className="w-10 text-center f-mono text-[0.52rem] tracking-[0.12em] uppercase"
                            style={{ color: r.hit ? "hsl(var(--accent))" : "hsl(var(--fg-3))" }}
                          >
                            {r.air}
                          </div>
                          <div className="flex-1 text-[11px] text-fg-2">{r.time}</div>
                          <div
                            className={`tabular-nums ${r.hit ? "text-accent" : "text-fg"}`}
                            style={{
                              fontFamily: "'Fraunces', serif",
                              fontVariationSettings: "'SOFT' 40",
                              fontSize: "14px",
                              letterSpacing: "-0.02em",
                            }}
                          >
                            {r.price}
                          </div>
                          {r.hit && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true, margin: "-10%" }}
                              transition={{
                                duration: 0.4,
                                delay: 2.1,
                                type: "spring",
                                damping: 14,
                                stiffness: 300,
                              }}
                              className="absolute right-[-8px] top-[-8px] w-5 h-5 flex items-center justify-center bg-accent text-bg"
                              style={{ borderRadius: "999px" }}
                            >
                              <Check size={10} strokeWidth={3.5} />
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* Cursor on the JAL result */}
                    <motion.div
                      aria-hidden
                      initial={{ opacity: 0, x: 120, y: -50 }}
                      whileInView={{
                        opacity: [0, 1, 1, 1, 0],
                        x: [120, 70, 30, 0, 0],
                        y: [-50, -10, 20, 40, 40],
                        scale: [1, 1, 1, 0.82, 0.82],
                      }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{
                        duration: 1.6,
                        delay: 0.9,
                        times: [0, 0.3, 0.65, 0.88, 1],
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute left-[240px] top-[130px] z-[4]"
                    >
                      <svg width="16" height="20" viewBox="0 0 18 22" fill="none">
                        <path
                          d="M2 2 L2 18 L6 14 L9 20 L11 19 L8 13 L14 13 Z"
                          fill="hsl(var(--fg))"
                          stroke="hsl(var(--bg))"
                          strokeWidth="1"
                          strokeLinejoin="miter"
                        />
                      </svg>
                    </motion.div>
                  </motion.div>

                  {/* STATE B — AA.com passenger form */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: [0, 1, 1, 0] }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                      duration: 2.9,
                      delay: 3.85,
                      times: [0, 0.15, 0.8, 1],
                    }}
                    className="absolute inset-0 p-5"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-6 h-6 flex items-center justify-center"
                        style={{ background: "hsl(2 70% 55%)", borderRadius: "6px" }}
                      >
                        <span
                          className="text-white"
                          style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "-0.05em" }}
                        >
                          A
                        </span>
                      </div>
                      <div
                        className="text-fg font-semibold"
                        style={{ fontSize: "13px", letterSpacing: "-0.015em" }}
                      >
                        Passenger information
                      </div>
                      <div className="f-mono text-[0.5rem] tracking-[0.12em] uppercase text-fg-4">
                        JAL 002 · Fri 11:30pm
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 mb-4">
                      {[
                        { k: "First name", v: "Ojasva" },
                        { k: "Last name", v: "Mishra" },
                        { k: "Date of birth", v: "03 / 12 / 2004" },
                        { k: "Passport #", v: "P1234567" },
                        { k: "Email", v: "ojas@twinly.tech" },
                        { k: "Phone", v: "+1 (415) 555-0182" },
                      ].map((f, i) => (
                        <motion.div
                          key={f.k}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-10%" }}
                          transition={{
                            duration: 0.4,
                            delay: 4.1 + i * 0.13,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="px-2.5 py-1.5 border border-rule/50"
                          style={{
                            background: "hsl(36 10% 6%)",
                            borderRadius: "3px",
                          }}
                        >
                          <div className="f-mono text-[0.4rem] tracking-[0.14em] uppercase text-fg-4 mb-0.5">
                            {f.k}
                          </div>
                          <div className="text-[11px] text-fg font-medium">{f.v}</div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 0.5, delay: 5.2 }}
                      className="flex items-center justify-between px-3 py-2.5 border border-accent/60"
                      style={{
                        background: "linear-gradient(90deg, hsl(var(--accent) / 0.08) 0%, hsl(var(--bg) / 0.3) 100%)",
                        borderRadius: "3px",
                      }}
                    >
                      <div className="text-[11px] text-fg-2">Total · round trip tax included</div>
                      <div
                        className="text-accent tabular-nums"
                        style={{
                          fontFamily: "'Fraunces', serif",
                          fontVariationSettings: "'SOFT' 40",
                          fontSize: "18px",
                          letterSpacing: "-0.025em",
                        }}
                      >
                        $712
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* STATE C — Gmail inbox with confirmation email */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: [0, 1, 1] }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                      duration: 2.5,
                      delay: 6.35,
                      times: [0, 0.15, 1],
                    }}
                    className="absolute inset-0 p-5"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-1">
                        <span style={{ fontSize: "13px", color: "#ea4335" }}>M</span>
                      </div>
                      <div
                        className="text-fg font-semibold"
                        style={{ fontSize: "13px", letterSpacing: "-0.015em" }}
                      >
                        Inbox · 1 new
                      </div>
                      <div className="f-mono text-[0.5rem] tracking-[0.12em] uppercase text-fg-4">
                        ojas@twinly.tech
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      {[
                        { from: "Japan Airlines", subj: "Booking confirmation · JAL 002 · SFO→NRT", time: "now", hit: true },
                        { from: "Stripe", subj: "Your weekly payout summary", time: "2h" },
                        { from: "Prof. Kim", subj: "Re: ECON 201 case brief draft", time: "6h" },
                        { from: "Comcast Xfinity", subj: "Dispute resolved · $80 credit applied", time: "1d" },
                      ].map((e, i) => (
                        <motion.div
                          key={e.subj}
                          initial={{ opacity: 0, x: -14 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-10%" }}
                          transition={{
                            duration: 0.4,
                            delay: 6.55 + i * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className={`flex items-center gap-3 px-3 py-2 border ${
                            e.hit ? "border-accent/70" : "border-rule/40"
                          }`}
                          style={{
                            background: e.hit
                              ? "linear-gradient(90deg, hsl(var(--accent) / 0.12) 0%, hsl(var(--bg) / 0.3) 100%)"
                              : "hsl(36 10% 6%)",
                            borderRadius: "3px",
                            boxShadow: e.hit ? "0 0 30px -10px hsl(var(--accent) / 0.4)" : undefined,
                          }}
                        >
                          <div
                            className={`w-[6px] h-[6px] rounded-full shrink-0 ${
                              e.hit ? "bg-accent" : "bg-transparent"
                            }`}
                            style={e.hit ? { boxShadow: "0 0 8px hsl(var(--accent) / 0.7)" } : {}}
                          />
                          <div
                            className={`w-[80px] text-[10.5px] truncate ${
                              e.hit ? "text-fg font-semibold" : "text-fg-3"
                            }`}
                          >
                            {e.from}
                          </div>
                          <div
                            className={`flex-1 text-[10.5px] truncate ${
                              e.hit ? "text-fg font-medium" : "text-fg-3"
                            }`}
                          >
                            {e.subj}
                          </div>
                          <div className="f-mono text-[0.44rem] tracking-[0.1em] uppercase text-fg-4 shrink-0">
                            {e.time}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Action log — streams under the tab content */}
                <div
                  className="relative border-t border-rule/60 px-4 py-3"
                  style={{ background: "hsl(36 10% 7%)" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-[5px] h-[5px] rounded-full bg-accent"
                      style={{
                        animation: "approval-blink 1.4s ease-in-out infinite",
                        boxShadow: "0 0 6px hsl(var(--accent) / 0.7)",
                      }}
                    />
                    <span className="f-mono text-[0.46rem] tracking-[0.2em] uppercase text-accent">
                      Action log
                    </span>
                  </div>
                  <div
                    className="grid gap-x-3 gap-y-0.5"
                    style={{
                      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    }}
                  >
                    {log.map((entry, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{
                          duration: 0.4,
                          delay: entry.done,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex items-center gap-2 py-0.5"
                      >
                        <span className="f-mono text-[0.44rem] tracking-[0.06em] text-fg-4 tabular-nums shrink-0">
                          {entry.t}
                        </span>
                        <span className="text-accent shrink-0 flex items-center">
                          <Check size={8} strokeWidth={3.5} />
                        </span>
                        <span className="text-[10px] text-fg-2 truncate">{entry.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Metrics strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mt-10 md:mt-14 max-w-[820px] mx-auto"
          >
            {[
              { k: "Your reply", v: "1 sentence" },
              { k: "Apps touched", v: "3" },
              { k: "Wall time", v: "52 sec" },
              { k: "Runs on", v: "iOS native" },
            ].map((m) => (
              <div key={m.k} className="text-center">
                <div className="f-mono text-[0.48rem] tracking-[0.22em] uppercase text-fg-4 mb-1.5">
                  {m.k}
                </div>
                <div
                  className="text-fg"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontVariationSettings: "'SOFT' 40, 'WONK' 0",
                    fontSize: "clamp(1.35rem, 2vw, 1.85rem)",
                    letterSpacing: "-0.028em",
                    lineHeight: 1,
                  }}
                >
                  {m.v}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      }
    />
  );
}
