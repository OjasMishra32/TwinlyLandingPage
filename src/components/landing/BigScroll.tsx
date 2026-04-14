import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

const words = ["MEMORY", "VOICE", "ACTION", "APPROVAL"];
const subtitles = [
  "Knows how you sound, what you care about, who you work with.",
  "Drafts replies in your tone. Not a generic AI voice.",
  "Plans, gathers context, composes, executes. End to end.",
  "You stay in the loop. Nothing moves without your nod.",
];

export default function BigScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Horizontal pan — tuned so the track drifts from slightly right to slightly left
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-34%"]);

  const [active, setActive] = useState(2); // ACTION as default highlight
  const [ready, setReady] = useState(false);

  // On each animation frame via scroll change, find the word closest to viewport centre
  useMotionValueEvent(scrollYProgress, "change", () => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const items = Array.from(
      track.querySelectorAll<HTMLElement>("[data-word]")
    );
    if (!items.length) return;
    const centre = window.innerWidth / 2;
    let best = 0;
    let min = Infinity;
    for (let i = 0; i < items.length; i++) {
      const r = items[i].getBoundingClientRect();
      const c = r.left + r.width / 2;
      const d = Math.abs(c - centre);
      if (d < min) {
        min = d;
        best = i;
      }
    }
    const idx = best % words.length;
    if (idx !== active) setActive(idx);
  });

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 40);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section
      ref={ref}
      className="relative border-t border-rule bg-bg-2/40 overflow-hidden"
      style={{ padding: "clamp(96px, 14vh, 180px) 0" }}
    >
      {/* Soft radial behind */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 50%, hsl(var(--accent) / 0.06) 0%, transparent 60%)",
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

      {/* Big horizontal track */}
      <motion.div
        ref={trackRef}
        style={{ x }}
        className="relative flex items-center gap-[0.22em] whitespace-nowrap font-semibold text-fg"
        aria-hidden
      >
        {[...words, ...words].map((w, i) => {
          const isActive = i % words.length === active;
          return (
            <span
              key={`${w}-${i}`}
              data-word
              className="flex items-center gap-[0.3em] will-change-transform"
            >
              <motion.span
                initial={false}
                animate={{
                  scale: isActive ? 1 : 0.94,
                  opacity: isActive ? 1 : 0.28,
                  filter: isActive ? "blur(0px)" : "blur(1.5px)",
                  color: isActive
                    ? "hsl(var(--accent))"
                    : "hsl(var(--fg))",
                }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: "clamp(5rem,16vw,16rem)",
                  lineHeight: 0.82,
                  letterSpacing: "-0.055em",
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
                {ready ? (
                  <SplitLetters text={w} active={isActive} />
                ) : (
                  w
                )}
              </motion.span>
              <motion.span
                animate={{
                  opacity: isActive ? 1 : 0.35,
                  scale: isActive ? 1.2 : 1,
                }}
                transition={{ duration: 0.5 }}
                className="inline-block w-[0.2em] h-[0.2em] rounded-full bg-accent"
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
            <div className="font-serif italic text-fg text-[1.8rem] leading-none">
              {words[active].toLowerCase()}
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

/**
 * Splits a word into individual letters so the active word gets a
 * subtle staggered wave. Non-active words render the plain word.
 */
function SplitLetters({ text, active }: { text: string; active: boolean }) {
  if (!active) return <>{text}</>;
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
