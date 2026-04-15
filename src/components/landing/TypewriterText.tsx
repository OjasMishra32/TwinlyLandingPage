import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  /** Characters per second */
  speed?: number;
  as?: "p" | "span" | "div";
};

/**
 * TypewriterText — reveals a string character-by-character when
 * scrolled into view. Adds a blinking caret at the end until the
 * reveal completes.
 */
export default function TypewriterText({
  text,
  className,
  delay = 0,
  speed = 55,
  as = "p",
}: Props) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const Component = as as React.ElementType;

  useEffect(() => {
    if (!inView) return;
    const start = performance.now() + delay;
    let raf = 0;
    const tick = (now: number) => {
      if (now < start) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const chars = Math.floor(((now - start) / 1000) * speed);
      const next = text.slice(0, Math.min(text.length, chars));
      setOut(next);
      if (next.length < text.length) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, text, delay, speed]);

  return (
    <Component ref={ref as unknown as React.RefObject<HTMLElement>} className={className}>
      {out}
      {!done && <span className="inline-block w-[0.5em] h-[1em] bg-accent/80 ml-[1px] animate-pulse align-[-2px]" />}
    </Component>
  );
}
