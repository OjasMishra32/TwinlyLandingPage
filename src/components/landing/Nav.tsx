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
        "before:content-[''] before:absolute before:inset-0 before:bg-bg/80 before:backdrop-blur-md before:border-b before:border-rule before:-z-10 before:transition-opacity",
        scrolled ? "before:opacity-100" : "before:opacity-0",
      )}
      style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
    >
      <div className="flex items-center">
        <a href="#top" className="inline-flex items-center gap-3 group">
          <BrandMark />
          <div className="flex flex-col gap-[3px] leading-none">
            <span
              className="text-[1.2rem] font-serif italic text-fg"
              style={{ lineHeight: 1 }}
            >
              twinly
            </span>
            <span className="flex items-center gap-[7px] text-[0.54rem] font-medium tracking-[0.22em] text-fg-3 uppercase">
              <span className="live-dot" style={{ width: 5, height: 5 }} />
              In private beta
            </span>
          </div>
        </a>
      </div>

      <nav className="hidden lg:flex items-center gap-1 p-1 bg-bg-2 border border-rule text-[0.68rem] font-medium tracking-[0.14em] uppercase">
        {centerLinks.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="relative px-4 py-2.5 text-fg-2 hover:text-bg transition-colors
              before:content-[''] before:absolute before:inset-0 before:bg-accent before:scale-y-0 before:origin-bottom before:transition-transform before:duration-300 before:-z-10 hover:before:scale-y-100"
          >
            {l.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center justify-end gap-5 text-[0.68rem] font-medium tracking-[0.14em] uppercase">
        <a
          href="#waitlist"
          className="hidden md:inline-flex text-fg-2 hover:text-fg relative
            after:content-[''] after:absolute after:inset-x-0 after:-bottom-1 after:h-[1px] after:bg-accent after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100"
        >
          Sign in
        </a>
        <a
          href="#waitlist"
          className="inline-flex items-center gap-3 px-4 md:px-5 py-3 md:py-3.5 bg-accent text-bg border border-accent relative overflow-hidden font-semibold
            before:content-[''] before:absolute before:inset-0 before:bg-fg before:translate-y-full before:transition-transform before:duration-500 before:-z-10 hover:before:translate-y-0"
          style={{ boxShadow: "0 0 0 1px hsl(var(--accent) / 0.3), 0 10px 40px -12px hsl(var(--accent) / 0.5)" }}
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
          className="lg:hidden h-9 w-9 inline-flex flex-col items-center justify-center gap-[5px] border border-rule-hi"
        >
          <span className={cn("block w-4 h-px bg-fg transition-transform", open && "translate-y-[3px] rotate-45")} />
          <span className={cn("block w-4 h-px bg-fg transition-transform", open && "-translate-y-[3px] -rotate-45")} />
        </button>
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-bg border-b border-rule lg:hidden">
          <ul className="flex flex-col p-6 gap-1">
            {centerLinks.map((l) => (
              <li key={l.href}>
                <a
                  onClick={() => setOpen(false)}
                  href={l.href}
                  className="block px-4 py-3 text-[0.72rem] tracking-[0.14em] uppercase text-fg-2 hover:text-fg hover:bg-bg-2"
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
    <div className="relative h-[38px] w-[38px] shrink-0">
      <svg viewBox="0 0 38 38" className="h-full w-full overflow-visible">
        <circle cx="19" cy="19" r="17.5" fill="none" stroke="hsl(var(--rule-hi))" strokeWidth="1" />
        <circle cx="19" cy="19" r="12" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" opacity="0.5" strokeDasharray="2 3" />
        <circle cx="19" cy="19" r="5" fill="hsl(var(--accent))" />
        <circle cx="19" cy="19" r="2" fill="hsl(var(--bg))" />
        <style>{`@keyframes brand-spin { to { transform: rotate(360deg); } }`}</style>
      </svg>
    </div>
  );
}
