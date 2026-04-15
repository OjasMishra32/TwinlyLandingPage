import { useEffect, useRef } from "react";

/**
 * CharGrid — a background grid of subtle dots that light up where the
 * cursor approaches. Anime.js-style kinetic backdrop for the hero.
 * Pure CSS + a single rAF loop that updates --mx / --my CSS vars.
 */
export default function CharGrid() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let tx = -9999;
    let ty = -9999;
    let x = tx;
    let y = ty;
    let raf = 0;
    let running = false;

    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      wrap.style.setProperty("--mx", `${x}px`);
      wrap.style.setProperty("--my", `${y}px`);
      if (Math.abs(tx - x) < 0.3 && Math.abs(ty - y) < 0.3) {
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
      const rect = wrap.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
      kick();
    };
    const onLeave = () => {
      tx = -9999;
      ty = -9999;
      kick();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={wrapRef}
        aria-hidden
        className="char-grid"
        style={
          {
            "--mx": "-9999px",
            "--my": "-9999px",
          } as React.CSSProperties
        }
      />
      <style>{`
        .char-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: radial-gradient(circle, hsl(var(--fg) / 0.12) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, #000 30%, transparent 95%);
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, #000 30%, transparent 95%);
        }
        .char-grid::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, hsl(var(--accent) / 0.9) 1.2px, transparent 1.6px);
          background-size: 28px 28px;
          -webkit-mask-image: radial-gradient(200px circle at var(--mx) var(--my), #000 0%, rgba(0,0,0,0.6) 40%, transparent 75%);
                  mask-image: radial-gradient(200px circle at var(--mx) var(--my), #000 0%, rgba(0,0,0,0.6) 40%, transparent 75%);
        }
        @media (max-width: 900px), (hover: none) {
          .char-grid::after { display: none; }
        }
      `}</style>
    </>
  );
}
