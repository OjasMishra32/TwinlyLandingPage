import { useEffect, useRef, useState } from "react";

export default function Reticle() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

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

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let rx = tx;
    let ry = ty;
    let dx = tx;
    let dy = ty;
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
      if (!(target instanceof Element)) {
        ring.classList.remove("hover", "text-hover");
        setLabel(null);
        return;
      }
      const interactive = target.closest(
        "a, button, input, textarea, select, label, [role='button'], [data-magnetic]"
      );
      const textish = target.closest("p, h1, h2, h3, h4, [data-text]");
      if (interactive) {
        ring.classList.add("hover");
        ring.classList.remove("text-hover");
        dot.classList.add("hover");
        const lbl =
          interactive.getAttribute("data-cursor") ||
          (interactive.tagName === "A" ? "Open" : interactive.tagName === "BUTTON" ? "Click" : null);
        setLabel(lbl);
      } else if (textish) {
        ring.classList.add("text-hover");
        ring.classList.remove("hover");
        dot.classList.remove("hover");
        setLabel(null);
      } else {
        ring.classList.remove("hover", "text-hover");
        dot.classList.remove("hover");
        setLabel(null);
      }
    };

    const onDown = () => {
      ring.classList.add("click");
      dot.classList.add("click");
    };
    const onUp = () => {
      ring.classList.remove("click");
      dot.classList.remove("click");
    };
    const onEnter = () => hasMoved && setReady(true);
    const onLeave = () => setReady(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerenter", onEnter);
    document.documentElement.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const tick = () => {
      // Dot tracks near-instant
      dx += (tx - dx) * 0.5;
      dy += (ty - dy) * 0.5;
      // Ring lerps smoothly behind
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
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
      {/* Ring with crosshair ticks + label */}
      <div
        ref={ringRef}
        className={`reticle-ring${ready ? " ready" : ""}`}
        aria-hidden
      >
        <svg
          viewBox="0 0 80 80"
          className="reticle-svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          {/* Outer ring */}
          <circle cx="40" cy="40" r="36" strokeOpacity="0.9" />
          {/* Inner accent ring */}
          <circle cx="40" cy="40" r="28" strokeOpacity="0.25" strokeDasharray="2 4" />
          {/* Crosshair ticks */}
          <line x1="40" y1="2" x2="40" y2="10" strokeOpacity="0.9" />
          <line x1="40" y1="70" x2="40" y2="78" strokeOpacity="0.9" />
          <line x1="2" y1="40" x2="10" y2="40" strokeOpacity="0.9" />
          <line x1="70" y1="40" x2="78" y2="40" strokeOpacity="0.9" />
        </svg>
        {label && <span className="reticle-label">{label}</span>}
      </div>

      {/* Inner dot */}
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
          transition: opacity 0.35s ease;
        }

        .reticle-ring {
          width: 54px;
          height: 54px;
          color: hsl(var(--accent));
          filter: drop-shadow(0 0 18px hsl(var(--accent) / 0.5));
          transition: width 0.42s cubic-bezier(.22,1,.36,1),
                      height 0.42s cubic-bezier(.22,1,.36,1),
                      opacity 0.35s ease,
                      color 0.3s ease;
        }

        .reticle-svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .reticle-label {
          position: absolute;
          top: 50%;
          left: 100%;
          transform: translate(12px, -50%);
          padding: 4px 8px;
          background: hsl(var(--accent));
          color: hsl(var(--bg));
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.54rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          white-space: nowrap;
          border-radius: 1px;
          opacity: 0;
          animation: reticle-label-in 0.35s cubic-bezier(.22,1,.36,1) forwards;
        }
        @keyframes reticle-label-in {
          to { opacity: 1; }
        }

        .reticle-dot {
          width: 5px;
          height: 5px;
          background: hsl(var(--accent));
          border-radius: 999px;
          box-shadow: 0 0 14px 2px hsl(var(--accent) / 0.7);
          transition: width 0.3s cubic-bezier(.22,1,.36,1),
                      height 0.3s cubic-bezier(.22,1,.36,1),
                      opacity 0.3s ease;
        }

        .reticle-ring.ready,
        .reticle-dot.ready { opacity: 1; }

        .reticle-ring.hover {
          width: 78px;
          height: 78px;
        }
        .reticle-ring.text-hover {
          width: 4px;
          height: 22px;
          color: hsl(var(--accent));
        }
        .reticle-ring.text-hover .reticle-svg { display: none; }
        .reticle-ring.text-hover::before {
          content: '';
          position: absolute;
          inset: 0;
          background: hsl(var(--accent));
        }
        .reticle-ring.text-hover ~ .reticle-dot { opacity: 0; }

        .reticle-dot.hover {
          width: 3px;
          height: 3px;
          opacity: 0.5;
        }

        .reticle-ring.click {
          width: 30px;
          height: 30px;
        }
        .reticle-dot.click {
          width: 10px;
          height: 10px;
        }

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
