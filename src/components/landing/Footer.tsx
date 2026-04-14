export default function Footer() {
  return (
    <footer className="relative border-t-[2px] border-ink bg-paper-2/60 pt-20 pb-8 overflow-hidden">
      <div className="w-full max-w-[1680px] mx-auto px-6 md:px-14">
        <div className="grid md:grid-cols-[1.1fr_1fr_1fr_1fr] gap-10 md:gap-16 pb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <svg viewBox="0 0 42 42" className="h-10 w-10 text-ink">
                <circle cx="21" cy="21" r="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="21" cy="21" r="14" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" opacity="0.55" />
                <rect x="11" y="11" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
                <line x1="21" y1="21" x2="38" y2="21" stroke="hsl(var(--accent))" strokeWidth="1.5" />
                <circle cx="21" cy="21" r="3" fill="hsl(var(--accent))" />
              </svg>
              <div className="flex flex-col gap-1 leading-none">
                <span
                  className="text-[1.2rem] font-black tracking-[-0.015em] text-ink flex items-baseline"
                  style={{ fontStretch: "75%" }}
                >
                  twinly
                  <span className="text-accent font-medium mx-[0.08em]">/</span>
                  <span className="text-ink-2 font-medium text-[0.9rem]">ai</span>
                </span>
                <span className="f-mono text-[0.56rem] tracking-[0.18em] uppercase text-ink-3">
                  PERSONAL OPERATOR · REV 01
                </span>
              </div>
            </div>
            <p className="max-w-[40ch] text-[14px] text-ink-2 leading-relaxed font-medium">
              A personal AI operator that learns how you work, writes in your voice, and
              moves life-admin forward with your approval.
            </p>
          </div>

          {[
            { h: "SITE", items: [["Product", "#product"], ["Demo", "#demo"], ["Trust", "#trust"], ["Access", "#waitlist"]] },
            { h: "COMPANY", items: [["hello@twinly.tech", "mailto:hello@twinly.tech"], ["Careers", "#"], ["Press kit", "#"]] },
            { h: "LEGAL", items: [["Privacy", "#"], ["Terms", "#"], ["Security", "#"]] },
          ].map((col) => (
            <div key={col.h}>
              <div className="f-mono text-[0.58rem] font-bold tracking-[0.18em] uppercase text-accent mb-4 pb-2 border-b border-ink">
                {col.h}
              </div>
              <ul className="space-y-3 text-[13px] text-ink-2">
                {col.items.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="hover:text-ink transition-colors inline-flex items-center gap-2">
                      <span className="w-3 h-px bg-ink-3" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Giant wordmark */}
        <div
          className="font-black leading-[0.82] text-ink/[0.06] select-none pointer-events-none whitespace-nowrap overflow-hidden"
          style={{
            fontSize: "clamp(5rem, 20vw, 20rem)",
            letterSpacing: "-0.06em",
            fontStretch: "75%",
          }}
          aria-hidden
        >
          TWINLY<span className="text-accent/20 font-medium">/</span>AI
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-ink f-mono text-[0.58rem] font-medium tracking-[0.16em] uppercase text-ink-3">
          <span>
            © 2026 TWINLY INC.
            <span className="text-rule-hi mx-2">/</span>
            ALL RIGHTS RESERVED
          </span>
          <span className="flex items-center gap-2">
            <span className="live-dot" />
            CRAFTED WITH INTENT · NOT A CHATBOT
          </span>
        </div>
      </div>
    </footer>
  );
}
