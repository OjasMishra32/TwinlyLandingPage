import { useEffect, useRef, useState } from "react";

export default function Reticle() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLCanvasElement>(null);
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

    const dot = dotRef.current;
    const ring = ringRef.current;
    const canvas = trailRef.current;
    if (!dot || !ring || !canvas) return;

    document.body.classList.add("cursor-on");

    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    // Start cursor off-screen but have ring lerp toward real position once mouse moves
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let dx = tx;
    let dy = ty;
    let rx = tx;
    let ry = ty;
    let hasMoved = false;

    const points: { x: number; y: number; life: number }[] = [];
    const MAX_POINTS = 22;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!hasMoved) {
        dx = tx;
        dy = ty;
        rx = tx;
        ry = ty;
        hasMoved = true;
        setReady(true);
      }
      points.push({ x: tx, y: ty, life: 1 });
      if (points.length > MAX_POINTS) points.shift();

      const target = e.target as Element | null;
      const interactive = !!target?.closest(
        "a, button, input, textarea, select, label, [role='button'], [data-magnetic]"
      );
      ring.classList.toggle("hover", interactive);
      dot.classList.toggle("hover", interactive);
    };

    const onDown = () => {
      ring.classList.add("click");
      dot.classList.add("click");
    };
    const onUp = () => {
      ring.classList.remove("click");
      dot.classList.remove("click");
    };
    const onEnter = () => {
      if (hasMoved) setReady(true);
    };
    const onLeave = () => {
      setReady(false);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerenter", onEnter);
    document.documentElement.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const tick = () => {
      // Dot tracks fast (near instant)
      dx += (tx - dx) * 0.55;
      dy += (ty - dy) * 0.55;
      // Ring lags behind with soft lerp
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;

      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;

      if (ctx) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (let i = 1; i < points.length; i++) {
          const p = points[i];
          const prev = points[i - 1];
          p.life *= 0.88;
          if (p.life < 0.03) continue;
          ctx.strokeStyle = `hsla(72, 100%, 62%, ${p.life * 0.55})`;
          ctx.lineWidth = p.life * 2.2;
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
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
      <canvas ref={trailRef} className="trail-canvas" aria-hidden />
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
        .trail-canvas {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 9998;
          mix-blend-mode: screen;
        }
        @media (max-width: 900px), (hover: none) {
          .trail-canvas { display: none !important; }
        }

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
          transition: opacity 0.35s ease,
                      width 0.4s cubic-bezier(.22,1,.36,1),
                      height 0.4s cubic-bezier(.22,1,.36,1),
                      background 0.3s ease,
                      border-color 0.3s ease,
                      box-shadow 0.3s ease;
        }

        .reticle-ring {
          width: 36px;
          height: 36px;
          border: 1.5px solid hsl(var(--accent) / 0.85);
          border-radius: 999px;
          box-shadow: 0 0 0 0 hsl(var(--accent) / 0), 0 0 24px 0 hsl(var(--accent) / 0.25);
        }
        .reticle-dot {
          width: 6px;
          height: 6px;
          background: hsl(var(--accent));
          border-radius: 999px;
          box-shadow: 0 0 18px 4px hsl(var(--accent) / 0.55);
        }

        .reticle-ring.ready,
        .reticle-dot.ready { opacity: 1; }

        .reticle-ring.hover {
          width: 64px;
          height: 64px;
          border-color: hsl(var(--accent));
          background: hsl(var(--accent) / 0.08);
          box-shadow: 0 0 0 1px hsl(var(--accent) / 0.5), 0 0 50px 0 hsl(var(--accent) / 0.35);
        }
        .reticle-dot.hover {
          width: 4px;
          height: 4px;
          opacity: 0.9;
        }

        .reticle-ring.click {
          width: 22px;
          height: 22px;
          background: hsl(var(--accent) / 0.2);
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
