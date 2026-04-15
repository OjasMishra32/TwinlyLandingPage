export default function Footer() {
  return (
    <footer className="relative border-t border-rule bg-bg-2/40 pt-14 md:pt-20 pb-8 overflow-hidden">
      <div className="w-full max-w-[1680px] mx-auto px-5 sm:px-6 md:px-14">
        <div className="grid md:grid-cols-[1.2fr_1fr_1fr_1fr] gap-8 sm:gap-10 md:gap-16 pb-12 md:pb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <svg viewBox="0 0 34 34" className="h-10 w-10">
                <rect x="4" y="4" width="18" height="18" fill="none" stroke="hsl(var(--fg))" strokeWidth="1.4" />
                <rect x="12" y="12" width="18" height="18" fill="none" stroke="hsl(var(--fg))" strokeWidth="1.4" />
                <rect x="12" y="12" width="10" height="10" fill="hsl(var(--accent))" />
              </svg>
              <div className="flex flex-col gap-1 leading-none">
                <span
                  className="text-[1.4rem] font-serif italic text-fg flex items-baseline"
                  style={{ lineHeight: 1 }}
                >
                  twinly
                  <span className="text-accent ml-[2px] text-[1.65rem] relative -top-[2px]">.</span>
                </span>
                <span className="f-mono text-[0.56rem] tracking-[0.2em] uppercase text-fg-3">
                  A personal AI operator
                </span>
              </div>
            </div>
            <p className="max-w-[42ch] text-[14px] text-fg-2 leading-relaxed mb-5">
              Twinly learns how you work, writes in your voice, and moves life-admin forward
              with your approval.
            </p>
            <a
              href="mailto:founders@twinly.tech"
              className="inline-flex items-center gap-2 f-mono text-[0.58rem] font-medium tracking-[0.18em] uppercase text-fg-2 hover:text-accent transition-colors group"
            >
              <span className="w-3 h-px bg-accent group-hover:w-5 transition-all" />
              founders@twinly.tech
            </a>
          </div>

          <div>
            <div className="f-mono text-[0.6rem] font-semibold tracking-[0.18em] uppercase text-accent mb-4 pb-2 border-b border-rule">
              Site
            </div>
            <ul className="space-y-3 text-[13.5px] text-fg-2">
              {[
                ["Product", "#product"],
                ["Playbooks", "#use-cases"],
                ["Edge", "#edge"],
                ["Access", "#waitlist"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="hover:text-fg transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-2 h-px bg-fg-4 group-hover:w-4 group-hover:bg-accent transition-all" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="f-mono text-[0.6rem] font-semibold tracking-[0.18em] uppercase text-accent mb-4 pb-2 border-b border-rule">
              Company
            </div>
            <ul className="space-y-3 text-[13.5px] text-fg-2">
              <li>
                <a
                  href="mailto:founders@twinly.tech"
                  className="hover:text-fg transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-2 h-px bg-fg-4 group-hover:w-4 group-hover:bg-accent transition-all" />
                  Talk to a founder
                </a>
              </li>
              <li className="text-fg-2">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-px bg-fg-4" />
                  <span>Founded by <b className="text-fg font-medium">Ojasva Mishra</b></span>
                </div>
              </li>
              <li className="text-fg-3">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-px bg-fg-4" />
                  <span>Incorporated in Delaware · 2026</span>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <div className="f-mono text-[0.6rem] font-semibold tracking-[0.18em] uppercase text-accent mb-4 pb-2 border-b border-rule">
              Legal
            </div>
            <ul className="space-y-3 text-[13.5px] text-fg-2">
              {[
                ["Privacy", "#"],
                ["Terms", "#"],
                ["Security", "#"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="hover:text-fg transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-2 h-px bg-fg-4 group-hover:w-4 group-hover:bg-accent transition-all" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
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
          <span>
            © 2026 <b className="text-fg font-medium">Twinly, Inc.</b>
            <span className="text-fg-4 mx-2">/</span>
            Founded by Ojasva Mishra
          </span>
          <span className="flex items-center gap-2">
            <span className="live-dot" />
            Built for humans
          </span>
        </div>
      </div>
    </footer>
  );
}
