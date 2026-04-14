import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const words = [
  { label: "memory", tone: "text-twin-cyan" },
  { label: "voice", tone: "text-white" },
  { label: "action", tone: "text-twin-violet" },
  { label: "approval", tone: "text-twin-warm" },
];

export default function BigScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-32%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.2]);

  return (
    <section ref={ref} className="relative py-28 md:py-40 overflow-hidden">
      <motion.div
        style={{ x, opacity }}
        className="flex items-center gap-[0.12em] whitespace-nowrap font-serif-accent text-[clamp(6rem,18vw,18rem)] leading-[0.82] tracking-[-0.04em]"
      >
        {words.map((w, i) => (
          <span key={w.label} className="flex items-center gap-[0.2em]">
            <span className={w.tone}>{w.label}</span>
            {i < words.length - 1 && (
              <svg className="h-[0.22em] w-[0.22em] text-white/30" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="4" fill="currentColor" />
              </svg>
            )}
          </span>
        ))}
      </motion.div>

      <div className="mx-auto w-full max-w-[1200px] px-6 mt-12 md:mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <p className="max-w-[420px] text-[15.5px] text-white/55 leading-relaxed">
          Four words. One system. A twin that doesn't just talk — it remembers, writes,
          acts, and asks at exactly the right moments.
        </p>
        <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/35">
          system · v0.1 · preview
        </div>
      </div>
    </section>
  );
}
