import { useEffect, useRef } from "react";

export default function Reticle() {
  const ref = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = ref.current;
    const canvas = trailRef.current;
    if (!el || !canvas) return;

    if (window.matchMedia("(max-width: 900px)").matches || window.matchMedia("(hover: none)").matches) {
      return;
    }

    document.body.classList.add("cursor-on");
    el.classList.add("ready");

    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx?.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    let rx = -999;
    let ry = -999;
    let tx = -999;
    let ty = -999;
    const points: { x: number; y: number; life: number }[] = [];

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      points.push({ x: tx, y: ty, life: 1 });
      if (points.length > 40) points.shift();

      const target = e.target as Element | null;
      const isInteractive = !!target?.closest("a, button, input, label, [role='button']");
      el.classList.toggle("hover", isInteractive);
    };

    const onDown = () => el.classList.add("click");
    const onUp = () => el.classList.remove("click");
    const onLeave = () => {
      tx = -999;
      ty = -999;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const tick = () => {
      rx += (tx - rx) * 0.32;
      ry += (ty - ry) * 0.32;
      el.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;

      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineCap = "round";
        for (let i = 1; i < points.length; i++) {
          const p = points[i];
          const prev = points[i - 1];
          p.life *= 0.9;
          if (p.life < 0.02) continue;
          ctx.strokeStyle = `rgba(0, 71, 255, ${p.life * 0.55})`;
          ctx.lineWidth = p.life * 1.6;
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointerleave", onLeave);
      document.body.classList.remove("cursor-on");
    };
  }, []);

  return (
    <>
      <canvas ref={trailRef} className="trail-canvas" aria-hidden />
      <div ref={ref} className="reticle" aria-hidden>
        <span className="br tl" />
        <span className="br tr" />
        <span className="br bl" />
        <span className="br br2" />
        <span className="cross h" />
        <span className="cross v" />
        <span className="center-dot" />
      </div>
      <style>{`
        .trail-canvas {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 9998;
          mix-blend-mode: multiply;
        }
        @media (max-width: 900px), (hover: none) { .trail-canvas { display: none !important; } }

        .reticle {
          position: fixed;
          top: 0; left: 0;
          width: 34px; height: 34px;
          pointer-events: none;
          z-index: 10000;
          transform: translate3d(-999px, -999px, 0) translate(-50%, -50%);
          opacity: 0;
          will-change: transform;
          transition: opacity 0.4s ease,
                      width 0.42s cubic-bezier(.22,1,.36,1),
                      height 0.42s cubic-bezier(.22,1,.36,1);
        }
        .reticle.ready { opacity: 1; }

        .reticle .br {
          position: absolute;
          width: 11px; height: 11px;
          border: 1.5px solid hsl(var(--accent));
          transition: transform 0.42s cubic-bezier(.22,1,.36,1), border-color 0.3s ease;
          box-shadow: 0 0 12px hsl(var(--accent) / 0.25);
        }
        .reticle .br.tl { top: 0; left: 0; border-right: 0; border-bottom: 0; }
        .reticle .br.tr { top: 0; right: 0; border-left: 0; border-bottom: 0; }
        .reticle .br.bl { bottom: 0; left: 0; border-right: 0; border-top: 0; }
        .reticle .br.br2 { bottom: 0; right: 0; border-left: 0; border-top: 0; }

        .reticle.hover { width: 62px; height: 62px; }
        .reticle.hover .br.tl { transform: translate(-4px, -4px); }
        .reticle.hover .br.tr { transform: translate(4px, -4px); }
        .reticle.hover .br.bl { transform: translate(-4px, 4px); }
        .reticle.hover .br.br2 { transform: translate(4px, 4px); }

        .reticle.click { width: 22px; height: 22px; }
        .reticle.click .br { border-color: hsl(var(--ink)); }

        .reticle .center-dot {
          position: absolute;
          top: 50%; left: 50%;
          width: 4px; height: 4px;
          background: hsl(var(--accent));
          border-radius: 999px;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 10px hsl(var(--accent) / 0.7);
        }

        .reticle .cross {
          position: absolute;
          top: 50%; left: 50%;
          background: hsl(var(--accent));
          opacity: 0;
          transition: opacity 0.35s cubic-bezier(.22,1,.36,1);
        }
        .reticle .cross.h { width: 14px; height: 1px; transform: translate(-50%, -50%); }
        .reticle .cross.v { width: 1px; height: 14px; transform: translate(-50%, -50%); }
        .reticle.hover .cross { opacity: 0.7; }

        body.cursor-on,
        body.cursor-on a,
        body.cursor-on button,
        body.cursor-on input { cursor: none; }
        @media (max-width: 900px), (hover: none) {
          body.cursor-on, body.cursor-on * { cursor: auto !important; }
        }
      `}</style>
    </>
  );
}
