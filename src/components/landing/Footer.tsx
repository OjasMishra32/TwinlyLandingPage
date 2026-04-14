export default function Footer() {
  return (
    <footer className="relative border-t border-rule bg-bg-2/40 pt-20 pb-8 overflow-hidden">
      <div className="w-full max-w-[1680px] mx-auto px-6 md:px-14">
        <div className="grid md:grid-cols-[1.1fr_1fr_1fr_1fr] gap-10 md:gap-16 pb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <svg viewBox="0 0 38 38" className="h-10 w-10">
                <circle cx="19" cy="19" r="17.5" fill="none" stroke="hsl(var(--rule-hi))" strokeWidth="1" />
                <circle cx="19" cy="19" r="12" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" opacity="0.5" strokeDasharray="2 3" />
                <circle cx="19" cy="19" r="5" fill="hsl(var(--accent))" />
                <circle cx="19" cy="19" r="2" fill="hsl(var(--bg))" />
              </svg>
              <div className="flex flex-col gap-1 leading-none">
                <span className="text-[1.3rem] font-serif italic text-fg" style={{ lineHeight: 1 }}>
                  twinly
                </span>
                <span className="f-mono text-[0.56rem] tracking-[0.2em] uppercase text-fg-3">
                  A personal AI operator
                </span>
              </div>
            </div>
            <p className="max-w-[42ch] text-[14px] text-fg-2 leading-relaxed">
              Twinly learns how you work, writes in your voice, and moves life-admin forward
              with your approval.
            </p>
          </div>

          {[
            { h: "Site", items: [["Product", "#product"], ["Demo", "#demo"], ["Trust", "#trust"], ["Access", "#waitlist"]] },
            { h: "Company", items: [["hello@twinly.tech", "mailto:hello@twinly.tech"], ["Careers", "#"], ["Press kit", "#"]] },
            { h: "Legal", items: [["Privacy", "#"], ["Terms", "#"], ["Security", "#"]] },
          ].map((col) => (
            <div key={col.h}>
              <div className="f-mono text-[0.6rem] font-semibold tracking-[0.18em] uppercase text-accent mb-4 pb-2 border-b border-rule">
                {col.h}
              </div>
              <ul className="space-y-3 text-[13.5px] text-fg-2">
                {col.items.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="hover:text-fg transition-colors inline-flex items-center gap-2 group">
                      <span className="w-2 h-px bg-fg-4 group-hover:w-4 group-hover:bg-accent transition-all" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Giant serif wordmark */}
        <div
          className="font-serif italic leading-[0.82] text-fg/[0.06] select-none pointer-events-none whitespace-nowrap overflow-hidden"
          style={{
            fontSize: "clamp(5rem, 18vw, 18rem)",
            letterSpacing: "-0.03em",
          }}
          aria-hidden
        >
          twinly
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-rule f-mono text-[0.6rem] font-medium tracking-[0.14em] uppercase text-fg-3">
          <span>© 2026 Twinly Inc.</span>
          <span className="flex items-center gap-2">
            <span className="live-dot" />
            Built for humans
          </span>
        </div>
      </div>
    </footer>
  );
}
