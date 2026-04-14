import { lazy, ReactNode, Suspense } from "react";
import { motion } from "framer-motion";
import CursorSpotlight from "./CursorSpotlight";

const TwinObject = lazy(() => import("./TwinObject"));

function useIntroBaseDelay() {
  if (typeof window === "undefined") return 0;
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const already = sessionStorage.getItem("twinly-intro-shown") === "1";
  return reduced || already ? 0 : 1.55;
}

function MaskLine({ children, delay = 0, base = 0 }: { children: ReactNode; delay?: number; base?: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, delay: base + delay, ease: [0.16, 1, 0.3, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

function SoftFade({ children, delay = 0, base = 0 }: { children: ReactNode; delay?: number; base?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: base + delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const base = useIntroBaseDelay();
  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden pt-28 md:pt-36"
    >
      <CursorSpotlight />

      <div className="absolute inset-0 -z-10 grid-noise mask-fade-b opacity-60" />
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-[20%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-twin-cyan/15 blur-[120px]" />
        <div className="absolute right-[10%] top-[10%] h-[320px] w-[320px] rounded-full bg-twin-violet/15 blur-[100px]" />
      </div>

      <Suspense fallback={null}>
        <motion.div
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, delay: base + 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute left-1/2 top-1/2 h-[min(90vh,820px)] w-[min(90vh,820px)] -translate-x-1/2 -translate-y-1/2">
            <TwinObject />
          </div>
        </motion.div>
      </Suspense>

      <div className="mx-auto w-full max-w-[1200px] px-6 relative">
        <div className="flex flex-col items-center text-center">
          <SoftFade base={base} delay={-0.1}>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.14em] text-white/70">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-twin-cyan opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-twin-cyan" />
              </span>
              Personal AI operator · Private beta 2026
            </div>
          </SoftFade>

          <h1 className="text-balance font-semibold tracking-[-0.035em] text-[clamp(3rem,9.2vw,8rem)] leading-[0.92]">
            <MaskLine base={base} delay={0}>Not a chatbot.</MaskLine>
            <MaskLine base={base} delay={0.08}>
              <span>
                A <span className="font-serif-accent text-gradient-twin">twin</span> of you
              </span>
            </MaskLine>
            <MaskLine base={base} delay={0.16}>that gets things done.</MaskLine>
          </h1>

          <SoftFade base={base} delay={0.4}>
            <p className="mt-8 max-w-[640px] text-balance text-[17px] md:text-[19px] leading-relaxed text-white/65">
              Twinly learns how you write, decide, and prefer things. Then it drafts, schedules,
              follows up, and handles life-admin — with approvals whenever they matter.
            </p>
          </SoftFade>

          <SoftFade base={base} delay={0.55}>
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
              <a
                href="#waitlist"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14px] font-semibold text-black hover:bg-twin-cyan transition-colors"
              >
                Join the waitlist
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#product"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-[14px] font-medium text-white/90 hover:bg-white/[0.06] transition-colors"
              >
                See how it works
              </a>
            </div>
          </SoftFade>

          <SoftFade base={base} delay={0.75}>
            <div className="mt-20 flex flex-col items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-white/40">
              <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
                <rect x="0.75" y="0.75" width="10.5" height="16.5" rx="5.25" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="6" cy="5" r="1.2" fill="currentColor" className="animate-pulse-soft" />
              </svg>
              Scroll to meet your twin
            </div>
          </SoftFade>
        </div>
      </div>
    </section>
  );
}
