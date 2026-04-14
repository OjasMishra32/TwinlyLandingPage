import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { label: "Product", href: "#product" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Trust", href: "#trust" },
  { label: "Thesis", href: "#thesis" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6"
    >
      <nav
        className={cn(
          "flex items-center justify-between gap-6 rounded-full transition-all duration-500",
          scrolled
            ? "glass-strong w-full max-w-[780px] px-5 py-2.5 md:px-6 md:py-3"
            : "w-full max-w-[980px] px-6 py-4 md:px-8 md:py-4 bg-transparent border border-white/[0.04]"
        )}
      >
        <a href="#top" className="flex items-center gap-2 group">
          <TwinlyMark />
          <span className="text-[15px] font-semibold tracking-tight">Twinly</span>
        </a>

        <ul className="hidden md:flex items-center gap-1 text-[13px] text-white/70">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#waitlist"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white text-black px-4 py-2 text-[13px] font-semibold hover:bg-twin-cyan transition-colors"
          >
            Join waitlist
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/80"
          >
            <span className={cn("block w-4 h-px bg-current transition-transform", open && "translate-y-[3px] rotate-45")} />
            <span className={cn("block w-4 h-px bg-current transition-transform -mt-1", open && "-translate-y-[3px] -rotate-45")} />
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-4 right-4 glass-strong rounded-2xl p-6 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-xl text-[15px] hover:bg-white/5 text-white/80 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#waitlist"
                onClick={() => setOpen(false)}
                className="mt-3 block text-center px-4 py-3 rounded-xl bg-white text-black font-semibold"
              >
                Join waitlist
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}

function TwinlyMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="transition-transform group-hover:rotate-45 duration-500">
      <defs>
        <linearGradient id="twinly-mark" x1="0" y1="0" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="hsl(170 90% 70%)" />
          <stop offset="1" stopColor="hsl(260 90% 78%)" />
        </linearGradient>
      </defs>
      <circle cx="11" cy="11" r="9" stroke="url(#twinly-mark)" strokeWidth="1.5" />
      <circle cx="11" cy="7" r="2.5" fill="url(#twinly-mark)" />
      <circle cx="11" cy="15" r="2.5" stroke="url(#twinly-mark)" strokeWidth="1.5" />
    </svg>
  );
}
