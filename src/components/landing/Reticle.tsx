import { useEffect, useRef, useState } from "react";

/**
 * Pure-transform cursor. No width/height transitions (which cause layout
 * thrashing), no text I-beam mode (which glitches on DOM churn), no label
 * overlay. Just: a ring that tracks the cursor with smooth lerp, a dot
 * that tracks near-instant, and a scale up on interactive hover.
 */
export default function Reticle() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (
      window.matchMedia("(max-width: 900px)").matches ||
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    document.body.classList.add("cursor-on");

    // Cache last hover state so we don't thrash classList every pointermove
    let lastHover = false;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let rx = tx;
    let ry = ty;
    let dx = tx;
    let dy = ty;
    let ringScale = 1;
    let dotScale = 1;
    let targetRingScale = 1;
    let targetDotScale = 1;
    let hasMoved = false;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!hasMoved) {
        rx = tx;
        ry = ty;
        dx = tx;
        dy = ty;
        hasMoved = true;
        setReady(true);
      }

      const target = e.target;
      const hover =
        target instanceof Element &&
        !!target.closest(
          "a, button, input, textarea, select, label, [role='button'], [data-magnetic]"
        );
      if (hover !== lastHover) {
        lastHover = hover;
        targetRingScale = hover ? 1.7 : 1;
        targetDotScale = hover ? 0.5 : 1;
      }
    };

    const onDown = () => {
      targetRingScale = lastHover ? 1.2 : 0.7;
      targetDotScale = 1.6;
    };
    const onUp = () => {
      targetRingScale = lastHover ? 1.7 : 1;
      targetDotScale = lastHover ? 0.5 : 1;
    };
    const onEnter = () => {
      if (hasMoved) setReady(true);
    };
    const onLeave = () => setReady(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerenter", onEnter);
    document.documentElement.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const tick = () => {
      // Dot tracks snappy
      dx += (tx - dx) * 0.55;
      dy += (ty - dy) * 0.55;
      // Ring lerps smoothly behind with a noticeable trail
      rx += (tx - rx) * 0.22;
      ry += (ty - ry) * 0.22;
      ringScale += (targetRingScale - ringScale) * 0.22;
      dotScale += (targetDotScale - dotScale) * 0.3;

      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%) scale(${dotScale})`;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerenter", onEnter);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.body.classList.remove("cursor-on");
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className={`reticle-ring${ready ? " ready" : ""}`}
        aria-hidden
      />
      <div
        ref={dotRef}
        className={`reticle-dot${ready ? " ready" : ""}`}
        aria-hidden
      />
      <style>{`
        .reticle-ring,
        .reticle-dot {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 10000;
          opacity: 0;
          will-change: transform;
          transform: translate3d(-200px, -200px, 0) translate(-50%, -50%);
          transition: opacity 0.3s ease;
        }

        .reticle-ring {
          width: 38px;
          height: 38px;
          border: 1.5px solid hsl(var(--accent));
          border-radius: 999px;
          box-shadow:
            0 0 18px 0 hsl(var(--accent) / 0.45),
            inset 0 0 8px 0 hsl(var(--accent) / 0.18);
        }

        .reticle-dot {
          width: 5px;
          height: 5px;
          background: hsl(var(--accent));
          border-radius: 999px;
          box-shadow: 0 0 14px 2px hsl(var(--accent) / 0.7);
        }

        .reticle-ring.ready,
        .reticle-dot.ready { opacity: 1; }

        body.cursor-on,
        body.cursor-on a,
        body.cursor-on button,
        body.cursor-on input,
        body.cursor-on textarea,
        body.cursor-on label { cursor: none; }
        @media (max-width: 900px), (hover: none) {
          body.cursor-on, body.cursor-on * { cursor: auto !important; }
        }
      `}</style>
    </>
  );
}
