import { useEffect, useRef } from "react";

/**
 * Reticle, a tight targeting aperture that tracks the cursor.
 * Single element, single transform per frame, rAF idle-stops when
 * the cursor is still.
 */
export default function Reticle() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (
      window.matchMedia("(max-width: 900px)").matches ||
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const el = ref.current;
    if (!el) return;

    document.body.classList.add("cursor-on");

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let scale = 1;
    let targetScale = 1;
    let rot = 0;
    let targetRot = 0;
    let hover = false;
    let running = false;
    let raf = 0;
    let hasMoved = false;

    const tick = () => {
      const dx = tx - x;
      const dy = ty - y;
      const ds = targetScale - scale;
      const dr = targetRot - rot;
      x += dx * 0.5;
      y += dy * 0.5;
      scale += ds * 0.22;
      rot += dr * 0.18;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale}) rotate(${rot}deg)`;
      if (
        Math.abs(dx) < 0.1 &&
        Math.abs(dy) < 0.1 &&
        Math.abs(ds) < 0.001 &&
        Math.abs(dr) < 0.05
      ) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!hasMoved) {
        x = tx;
        y = ty;
        hasMoved = true;
        el.style.opacity = "1";
      }

      const target = e.target;
      const h =
        target instanceof Element &&
        !!target.closest(
          "a, button, input, textarea, select, label, [role='button'], [data-magnetic]"
        );
      if (h !== hover) {
        hover = h;
        targetScale = hover ? 1.55 : 1;
        targetRot = hover ? 45 : 0;
      }
      kick();
    };

    const onDown = () => {
      targetScale = hover ? 1.15 : 0.78;
      kick();
    };
    const onUp = () => {
      targetScale = hover ? 1.55 : 1;
      kick();
    };
    const onEnter = () => {
      if (hasMoved) el.style.opacity = "1";
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerenter", onEnter);
    document.documentElement.addEventListener("pointerleave", onLeave);

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
      <div ref={ref} className="reticle" aria-hidden>
        <span className="bracket tl" />
        <span className="bracket tr" />
        <span className="bracket bl" />
        <span className="bracket br" />
        <span className="dot" />
      </div>
      <style>{`
        .reticle {
          position: fixed;
          top: 0;
          left: 0;
          width: 30px;
          height: 30px;
          pointer-events: none;
          z-index: 10000;
          opacity: 0;
          transform: translate3d(-200px, -200px, 0) translate(-50%, -50%);
          transition: opacity 0.25s ease;
          will-change: transform;
        }
        .reticle .bracket {
          position: absolute;
          width: 8px;
          height: 8px;
          box-sizing: border-box;
        }
        .reticle .bracket.tl { top: 0; left: 0; border-top: 1.2px solid hsl(var(--accent)); border-left: 1.2px solid hsl(var(--accent)); }
        .reticle .bracket.tr { top: 0; right: 0; border-top: 1.2px solid hsl(var(--accent)); border-right: 1.2px solid hsl(var(--accent)); }
        .reticle .bracket.bl { bottom: 0; left: 0; border-bottom: 1.2px solid hsl(var(--accent)); border-left: 1.2px solid hsl(var(--accent)); }
        .reticle .bracket.br { bottom: 0; right: 0; border-bottom: 1.2px solid hsl(var(--accent)); border-right: 1.2px solid hsl(var(--accent)); }
        .reticle .dot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 3px;
          height: 3px;
          background: hsl(var(--accent));
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }

        body.cursor-on,
        body.cursor-on a,
        body.cursor-on button,
        body.cursor-on input,
        body.cursor-on textarea,
        body.cursor-on label { cursor: none; }

        @media (max-width: 900px), (hover: none) {
          body.cursor-on, body.cursor-on * { cursor: auto !important; }
          .reticle { display: none; }
        }
      `}</style>
    </>
  );
}
