import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const GLYPHS = "!<>-_\\/[]{}=+*^?#________ABCDEFGHIJKLMNOPQRSTUVWXYZ";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  trigger?: "mount" | "inView";
};

/**
 * ScrambleText, the signature anime.js-style kinetic text reveal.
 * Each character cycles through random glyphs before resolving to the
 * final letter. Resolves left-to-right with a slight stagger so the
 * whole word feels like it's being "decoded".
 */
export default function ScrambleText({
  text,
  className = "",
  delay = 0,
  duration = 1000,
  trigger = "inView",
}: Props) {
  const [display, setDisplay] = useState(text);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "-10%" });
  const running = useRef(false);

  useEffect(() => {
    const shouldStart = trigger === "mount" ? true : inView;
    if (!shouldStart || running.current) return;
    running.current = true;

    const target = text;
    const len = target.length;
    const start = performance.now() + delay;

    // Each char has its own "resolve time", progressively later so the
    // effect reads left-to-right like a decode sweep
    const resolveTimes = target.split("").map((_, i) => {
      return start + (i / len) * duration * 0.65 + Math.random() * 90;
    });

    let raf = 0;
    const tick = (now: number) => {
      if (now < start) {
        raf = requestAnimationFrame(tick);
        return;
      }
      let out = "";
      let done = 0;
      for (let i = 0; i < len; i++) {
        const c = target[i];
        if (c === " ") {
          out += " ";
          done++;
          continue;
        }
        if (now >= resolveTimes[i]) {
          out += c;
          done++;
        } else {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      setDisplay(out);
      if (done < len) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, text, delay, duration, trigger]);

  return (
    <span ref={wrapRef} className={className}>
      {display}
    </span>
  );
}
