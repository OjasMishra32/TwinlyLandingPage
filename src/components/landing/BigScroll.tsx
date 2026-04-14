import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const words = ["MEMORY", "VOICE", "ACTION", "APPROVAL"];

export default function BigScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-30%"]);

  return (
    <section ref={ref} className="relative py-20 md:py-32 overflow-hidden border-t border-rule bg-paper-2/40">
      <motion.div
        style={{ x }}
        className="flex items-center gap-[0.2em] whitespace-nowrap font-black text-ink"
        aria-hidden
      >
        {words.map((w, i) => (
          <span key={w} className="flex items-center gap-[0.28em]">
            <span
              style={{
                fontSize: "clamp(5rem,16vw,16rem)",
                lineHeight: 0.82,
                letterSpacing: "-0.06em",
                fontStretch: "75%",
              }}
              className={i === 2 ? "text-accent italic font-black" : ""}
            >
              {w}
            </span>
            {i < words.length - 1 && (
              <span className="inline-block w-[0.22em] h-[0.22em] bg-accent rotate-45" />
            )}
          </span>
        ))}
      </motion.div>
      <div className="w-full max-w-[1680px] mx-auto px-6 md:px-14 mt-12 md:mt-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <p className="max-w-[44ch] text-[15.5px] text-ink-2 leading-relaxed font-medium">
          Four words. One system. A twin that doesn't just talk — it remembers, writes,
          acts, and asks at exactly the right moments.
        </p>
        <div className="f-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-3">
          SYSTEM · V0.1 · PREVIEW
        </div>
      </div>
    </section>
  );
}
