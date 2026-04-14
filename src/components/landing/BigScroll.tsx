import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

const words = ["MEMORY", "VOICE", "ACTION", "APPROVAL"];
const subtitles: Record<string, string> = {
  MEMORY: "Knows how you sound, what you care about, who you work with.",
  VOICE: "Drafts replies in your tone. Not a generic AI voice.",
  ACTION: "Plans, gathers context, composes, executes. End to end.",
  APPROVAL: "You stay in the loop. Nothing moves without your nod.",
};

/**
 * Duplicate the word list a few times so the track is much wider than the
 * viewport. Pair each word with a stable id so React keys are unique across
 * duplicates.
 */
const TRACK = [...words, ...words, ...words].map((w, i) => ({ w, id: i }));

export default function BigScroll() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /**
   * Horizontal pan from fully off-screen right → fully off-screen left.
   * With three duplicated word sets, moving the track by ~66% of its width
   * ensures every word passes through the viewport centre on the way.
   */
  const x = useTransform(scrollYProgress, [0, 1], ["18%", "-78%"]);

  const [active, setActive] = useState<string>("ACTION");

  // Pick the word closest to the viewport centre on every scroll tick
  useMotionValueEvent(scrollYProgress, "change", () => {
    if (!trackRef.current) return;
    const items = Array.from(
      trackRef.current.querySelectorAll<HTMLElement>("[data-word]")
    );
    if (!items.length) return;
    const centre = window.innerWidth / 2;
    let best = items[0];
    let min = Infinity;
    for (const el of items) {
      const r = el.getBoundingClientRect();
      const c = r.left + r.width / 2;
      const d = Math.abs(c - centre);
      if (d < min) {
        min = d;
        best = el;
      }
    }
    const w = best.dataset.wordText;
    if (w && w !== active) setActive(w);
  });

  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 40);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section
      ref={ref}
      className="relative border-t border-rule bg-bg-2/40 overflow-hidden"
      style={{ padding: "clamp(110px, 16vh, 200px) 0" }}
    >
      {/* Soft radial behind */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 38% at 50% 50%, hsl(var(--accent) / 0.06) 0%, transparent 60%)",
        }}
      />

      {/* Centre spotlight guide */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, hsl(var(--accent) / 0.25) 50%, transparent 100%)",
        }}
      />

      {/* Edge fade masks so words gracefully exit left/right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[18%] z-[2]"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--bg)) 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-[18%] z-[2]"
        style={{
          background:
            "linear-gradient(270deg, hsl(var(--bg)) 0%, transparent 100%)",
        }}
      />

      {/* Big horizontal track */}
      <motion.div
        ref={trackRef}
        style={{ x }}
        className="relative flex items-center gap-[0.25em] whitespace-nowrap font-semibold text-fg will-change-transform"
        aria-hidden
      >
        {TRACK.map(({ w, id }) => {
          const isActive = w === active;
          return (
            <span
              key={id}
              data-word
              data-word-text={w}
              className="flex items-center gap-[0.32em]"
            >
              <motion.span
                initial={false}
                animate={{
                  scale: isActive ? 1 : 0.92,
                  opacity: isActive ? 1 : 0.22,
                  filter: isActive ? "blur(0px)" : "blur(2px)",
                  color: isActive ? "hsl(var(--accent))" : "hsl(var(--fg))",
                }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: "clamp(4.5rem,14vw,14rem)",
                  lineHeight: 0.82,
                  letterSpacing: "-0.05em",
                  fontFamily: isActive
                    ? "'Instrument Serif', serif"
                    : undefined,
                  fontStyle: isActive ? "italic" : "normal",
                  fontWeight: isActive ? 400 : 600,
                  textShadow: isActive
                    ? "0 0 60px hsl(var(--accent) / 0.5)"
                    : undefined,
                  display: "inline-block",
                }}
              >
                {ready && isActive ? <SplitLetters text={w} /> : w}
              </motion.span>
              <motion.span
                animate={{
                  opacity: isActive ? 1 : 0.35,
                  scale: isActive ? 1.2 : 1,
                }}
                transition={{ duration: 0.5 }}
                className="inline-block w-[0.18em] h-[0.18em] rounded-full bg-accent"
              />
            </span>
          );
        })}
      </motion.div>

      {/* NOW indicator + copy row */}
      <div className="w-full max-w-[1680px] mx-auto px-6 md:px-14 mt-14 md:mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div className="flex items-start gap-5">
          <div className="f-mono text-[0.58rem] font-medium tracking-[0.22em] uppercase text-accent pt-1 flex items-center gap-2">
            <span className="live-dot" />
            Currently
          </div>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-[46ch]"
          >
            <div className="font-serif italic text-fg text-[1.9rem] leading-none">
              {active.toLowerCase()}
            </div>
            <p className="mt-2 text-[14px] text-fg-2 leading-relaxed">
              {subtitles[active]}
            </p>
          </motion.div>
        </div>
        <div className="f-mono text-[0.6rem] tracking-[0.22em] uppercase text-fg-3">
          The twinly system
        </div>
      </div>
    </section>
  );
}

function SplitLetters({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          initial={{ y: "30%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.55,
            delay: i * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: "inline-block" }}
        >
          {ch}
        </motion.span>
      ))}
    </>
  );
}
