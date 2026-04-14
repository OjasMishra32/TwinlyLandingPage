import { lazy, Suspense } from "react";
import { motion } from "framer-motion";

const TwinObject = lazy(() => import("./TwinObject"));

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden pt-28 md:pt-36">
      <div className="absolute inset-0 -z-10 grid-noise mask-fade-b opacity-60" />
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-[20%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-twin-cyan/15 blur-[120px]" />
        <div className="absolute right-[10%] top-[10%] h-[320px] w-[320px] rounded-full bg-twin-violet/15 blur-[100px]" />
      </div>

      <Suspense fallback={null}>
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[min(90vh,820px)] w-[min(90vh,820px)] -translate-x-1/2 -translate-y-1/2">
            <TwinObject />
          </div>
        </div>
      </Suspense>

      <div className="mx-auto w-full max-w-[1200px] px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={fadeUp} custom={0} className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.14em] text-white/70">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-twin-cyan opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-twin-cyan" />
            </span>
            Personal AI operator · Private beta 2026
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-balance font-semibold tracking-[-0.035em] text-[clamp(3rem,9.2vw,8rem)] leading-[0.92]"
          >
            Not a chatbot.
            <br />
            A <span className="font-serif-accent text-gradient-twin">twin</span> of you
            <br />
            that gets things done.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-8 max-w-[640px] text-balance text-[17px] md:text-[19px] leading-relaxed text-white/65"
          >
            Twinly learns how you write, decide, and prefer things. Then it drafts, schedules,
            follows up, and handles life-admin — with approvals whenever they matter.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="mt-10 flex flex-col sm:flex-row items-center gap-3">
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
          </motion.div>

          <motion.div variants={fadeUp} custom={4} className="mt-20 flex flex-col items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-white/40">
            <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
              <rect x="0.75" y="0.75" width="10.5" height="16.5" rx="5.25" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="6" cy="5" r="1.2" fill="currentColor" className="animate-pulse-soft" />
            </svg>
            Scroll to meet your twin
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
