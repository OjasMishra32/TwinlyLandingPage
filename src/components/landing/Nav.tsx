import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const centerLinks = [
  { label: "Product", href: "#product" },
  { label: "Demo", href: "#demo" },
  { label: "Trust", href: "#trust" },
  { label: "Thesis", href: "#thesis" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[90] grid items-center gap-10 py-5 md:py-6 px-6 md:px-14 transition-colors",
        "grid-cols-[1fr_auto_1fr]",
        "before:content-[''] before:absolute before:inset-0 before:bg-paper before:border-b before:border-rule before:-z-10 before:transition-opacity",
        scrolled ? "before:opacity-100" : "before:opacity-0",
      )}
      style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
    >
      <div className="flex items-center">
        <a href="#top" className="inline-flex items-center gap-3.5 group">
          <BrandMark />
          <div className="flex flex-col gap-[3px] leading-none">
            <span
              className="text-[1.1rem] font-black tracking-[-0.015em] text-ink flex items-baseline"
              style={{ fontStretch: "75%" }}
            >
              twinly
              <span className="text-accent font-medium mx-[0.08em]">/</span>
              <span className="text-ink-2 font-medium text-[0.86rem]">ai</span>
            </span>
            <span className="flex items-center gap-[7px] text-[0.56rem] font-medium tracking-[0.18em] text-ink-3 uppercase">
              <span className="live-dot" />
              <b className="text-accent font-semibold">OPERATOR</b>
              <span>· v0.1</span>
            </span>
          </div>
        </a>
      </div>

      <nav className="hidden lg:flex items-center gap-1 p-1 bg-ink/[0.04] border border-rule text-[0.72rem] font-semibold tracking-[0.14em] uppercase">
        {centerLinks.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="relative px-4 py-2.5 text-ink-2 hover:text-paper transition-colors
              before:content-[''] before:absolute before:inset-0 before:bg-ink before:scale-y-0 before:origin-bottom before:transition-transform before:duration-300 before:-z-10 hover:before:scale-y-100"
          >
            {l.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center justify-end gap-5 text-[0.72rem] font-semibold tracking-[0.14em] uppercase">
        <a href="#waitlist" className="hidden md:inline-flex text-ink-2 hover:text-ink relative
          after:content-[''] after:absolute after:inset-x-0 after:-bottom-1 after:h-[1.5px] after:bg-accent after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100">
          Sign in
        </a>
        <a
          href="#waitlist"
          className="inline-flex items-center gap-3 px-4 md:px-5 py-3 md:py-3.5 bg-accent text-white border-[1.5px] border-accent relative overflow-hidden font-bold
            before:content-[''] before:absolute before:inset-0 before:bg-ink before:translate-y-full before:transition-transform before:duration-500 before:-z-10 hover:before:translate-y-0 hover:border-ink"
          style={{ boxShadow: "0 0 0 1px hsl(var(--accent)), 0 10px 30px -10px hsl(var(--accent) / 0.4)" }}
        >
          Request access
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="shrink-0">
            <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </a>
        <button
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden h-9 w-9 inline-flex flex-col items-center justify-center gap-[5px] border border-ink"
        >
          <span className={cn("block w-4 h-px bg-ink transition-transform", open && "translate-y-[3px] rotate-45")} />
          <span className={cn("block w-4 h-px bg-ink transition-transform", open && "-translate-y-[3px] -rotate-45")} />
        </button>
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-paper border-b border-ink lg:hidden">
          <ul className="flex flex-col p-6 gap-1">
            {centerLinks.map((l) => (
              <li key={l.href}>
                <a
                  onClick={() => setOpen(false)}
                  href={l.href}
                  className="block px-4 py-3 text-[0.72rem] tracking-[0.14em] uppercase text-ink-2 hover:text-ink hover:bg-ink/5"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

function BrandMark() {
  return (
    <div className="relative h-[42px] w-[42px] shrink-0">
      <svg viewBox="0 0 42 42" className="h-full w-full text-ink overflow-visible">
        <circle cx="21" cy="21" r="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <g className="origin-[21px_21px]" style={{ animation: "brand-spin 24s linear infinite reverse" }}>
          <circle cx="21" cy="21" r="14" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" opacity="0.55" />
        </g>
        <g className="origin-[21px_21px]" style={{ animation: "brand-spin 14s linear infinite" }}>
          <rect x="11" y="11" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        </g>
        <g className="origin-[21px_21px]" style={{ animation: "brand-spin 3.6s linear infinite" }}>
          <line x1="21" y1="21" x2="38" y2="21" stroke="hsl(var(--accent))" strokeWidth="1.5" />
        </g>
        <circle cx="21" cy="21" r="3" fill="hsl(var(--accent))" />
      </svg>
      <style>{`@keyframes brand-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
