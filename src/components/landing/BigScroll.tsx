import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const words = ["MEMORY", "VOICE", "ACTION", "APPROVAL"];

export default function BigScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-32%"]);

  return (
    <section ref={ref} className="relative py-20 md:py-32 overflow-hidden border-t border-rule bg-bg-2/40">
      <motion.div
        style={{ x }}
        className="flex items-center gap-[0.22em] whitespace-nowrap font-semibold text-fg"
        aria-hidden
      >
        {words.map((w, i) => (
          <span key={w} className="flex items-center gap-[0.3em]">
            <span
              style={{
                fontSize: "clamp(5rem,16vw,16rem)",
                lineHeight: 0.82,
                letterSpacing: "-0.055em",
              }}
              className={i === 2 ? "font-serif italic text-accent font-normal glow-accent" : ""}
            >
              {w}
            </span>
            {i < words.length - 1 && (
              <span className="inline-block w-[0.2em] h-[0.2em] rounded-full bg-accent" />
            )}
          </span>
        ))}
      </motion.div>
      <div className="w-full max-w-[1680px] mx-auto px-6 md:px-14 mt-12 md:mt-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <p className="max-w-[48ch] text-[16px] text-fg-2 leading-relaxed font-medium">
          Four pieces. One system. A twin that doesn't just talk — it remembers, writes,
          acts, and asks at exactly the right moments.
        </p>
        <div className="f-mono text-[0.62rem] tracking-[0.22em] uppercase text-fg-3">
          The twinly system
        </div>
      </div>
    </section>
  );
}
