import { useEffect, useRef, useState } from "react";

const cycle = [
  "drafting",
  "scheduling",
  "following up",
  "remembering",
  "handling it",
  "twinly",
];

const TOTAL_MS = 2200;

export default function Loader() {
  const [mounted, setMounted] = useState(false);
  const [gone, setGone] = useState(false);
  const [idx, setIdx] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    setMounted(true);
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")
      .matches;
    const already = sessionStorage.getItem("twinly-loader") === "1";
    if (reduced || already) {
      setGone(true);
      return;
    }
    sessionStorage.setItem("twinly-loader", "1");

    const stepDur = Math.floor((TOTAL_MS - 500) / cycle.length);
    const timers: number[] = [];
    for (let i = 0; i < cycle.length; i++) {
      timers.push(
        window.setTimeout(() => setIdx(i), stepDur * i)
      );
    }
    timers.push(window.setTimeout(() => setGone(true), TOTAL_MS));
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  // Canvas particle swirl that converges into the brand point
  useEffect(() => {
    if (!mounted || gone) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = () => window.innerWidth;
    const h = () => window.innerHeight;
    const cx = () => w() / 2;
    const cy = () => h() / 2;

    type P = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      angle: number;
      r: number;
      size: number;
    };
    const count = 160;
    const particles: P[] = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const r = 260 + Math.random() * 340;
      return {
        x: cx() + Math.cos(angle) * r,
        y: cy() + Math.sin(angle) * r,
        vx: 0,
        vy: 0,
        life: 1,
        angle,
        r,
        size: 1 + Math.random() * 1.6,
      };
    });

    const start = performance.now();
    const draw = (t: number) => {
      const elapsed = t - start;
      const prog = Math.min(1, elapsed / TOTAL_MS);
      ctx.clearRect(0, 0, w(), h());

      // Core aura
      const g = ctx.createRadialGradient(cx(), cy(), 0, cx(), cy(), 260);
      g.addColorStop(0, `hsla(72, 100%, 60%, ${0.12 * (1 - prog)})`);
      g.addColorStop(1, "hsla(72, 100%, 60%, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx(), cy(), 260, 0, Math.PI * 2);
      ctx.fill();

      for (const p of particles) {
        // Target: converge toward centre as prog increases
        const tgtR = p.r * (1 - prog * 0.92);
        const ang = p.angle + prog * 3.4;
        const tx = cx() + Math.cos(ang) * tgtR;
        const ty = cy() + Math.sin(ang) * tgtR;
        p.vx += (tx - p.x) * 0.18;
        p.vy += (ty - p.y) * 0.18;
        p.vx *= 0.72;
        p.vy *= 0.72;
        p.x += p.vx;
        p.y += p.vy;

        const alpha = (1 - prog * 0.6) * 0.85;
        ctx.fillStyle = `hsla(72, 100%, 65%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (prog < 1) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [mounted, gone]);

  if (!mounted) return null;

  const current = cycle[idx];
  const isFinal = idx === cycle.length - 1;

  return (
    <div
      aria-hidden={gone || undefined}
      className="fixed inset-0 z-[2000] flex items-center justify-center overflow-hidden bg-bg"
      style={{
        opacity: gone ? 0 : 1,
        visibility: gone ? "hidden" : "visible",
        pointerEvents: gone ? "none" : "auto",
        transition:
          "opacity 0.65s cubic-bezier(.7,0,.3,1), visibility 0.65s step-end",
      }}
    >
      {/* Grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 grid-overlay"
        style={{
          opacity: 0,
          animation: "lo-grid 0.9s cubic-bezier(.7,0,.3,1) 0.05s forwards",
        }}
      />

      {/* Canvas particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Corner registration marks */}
      {(
        [
          ["top-[24px] left-[24px] border-r-0 border-b-0", "tl"],
          ["top-[24px] right-[24px] border-l-0 border-b-0", "tr"],
          ["bottom-[24px] left-[24px] border-r-0 border-t-0", "bl"],
          ["bottom-[24px] right-[24px] border-l-0 border-t-0", "br"],
        ] as const
      ).map(([cls, k]) => (
        <span
          key={k}
          className={`absolute w-[24px] h-[24px] border border-accent ${cls}`}
          style={{
            opacity: 0,
            animation: "lo-corner 0.55s cubic-bezier(.7,0,.3,1) 0.3s forwards",
          }}
        />
      ))}

      {/* Top + bottom meta lines */}
      <div
        className="absolute top-[30px] left-[60px] right-[60px] flex items-center justify-between f-mono text-[0.6rem] tracking-[0.22em] uppercase text-fg-3"
        style={{
          opacity: 0,
          animation: "lo-fade 0.7s ease 0.45s forwards",
        }}
      >
        <span className="flex items-center gap-2">
          <span className="w-[6px] h-[6px] bg-accent rounded-full" />
          Booting your twin
        </span>
        <span className="text-fg-4">, </span>
        <span>TWN · 2026</span>
      </div>

      {/* Center word cycle */}
      <div className="relative z-[3] flex flex-col items-center">
        <div
          className="relative h-[1.2em] overflow-hidden"
          style={{ width: "min(88vw, 1100px)" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {cycle.map((word, i) => (
              <span
                key={word}
                className={`absolute inset-0 flex items-center justify-center ${
                  i === cycle.length - 1
                    ? "font-serif italic text-fg"
                    : "font-serif italic text-fg-2"
                }`}
                style={{
                  fontSize: "clamp(3rem, 10vw, 9rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.025em",
                  transform:
                    idx === i
                      ? "translateY(0) scale(1)"
                      : idx > i
                      ? "translateY(-120%) scale(0.94)"
                      : "translateY(120%) scale(0.94)",
                  opacity: idx === i ? 1 : 0,
                  filter: idx === i ? "blur(0px)" : "blur(12px)",
                  transition:
                    "transform 0.55s cubic-bezier(.22,1,.36,1), opacity 0.45s ease, filter 0.5s ease",
                  textShadow:
                    i === cycle.length - 1 && idx === i
                      ? "0 0 60px hsl(var(--accent) / 0.55)"
                      : undefined,
                }}
              >
                {word}
                {i === cycle.length - 1 && (
                  <span
                    className="text-accent"
                    style={{ marginLeft: "-0.18em" }}
                  >
                    .
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Sweep bar */}
        <div
          className="mt-8 h-[1px] bg-rule overflow-hidden relative"
          style={{
            width: "min(72vw, 620px)",
            opacity: 0,
            animation: "lo-fade 0.6s ease 0.4s forwards",
          }}
        >
          <div
            className="absolute inset-y-0 left-0 bg-accent"
            style={{
              width: "100%",
              transformOrigin: "left",
              transform: "scaleX(0)",
              animation: `lo-bar ${(TOTAL_MS - 300) / 1000}s cubic-bezier(.65,0,.35,1) 0.3s forwards`,
            }}
          />
          <div
            className="absolute inset-y-[-2px] w-[60px] pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(var(--accent) / 0.9) 50%, transparent)",
              filter: "blur(6px)",
              animation: `lo-sweep ${(TOTAL_MS - 300) / 1000}s cubic-bezier(.65,0,.35,1) 0.3s forwards`,
            }}
          />
        </div>

        {/* Sub-status */}
        <div
          className="mt-4 f-mono text-[0.6rem] tracking-[0.22em] uppercase text-fg-3"
          style={{
            opacity: 0,
            animation: "lo-fade 0.6s ease 0.6s forwards",
          }}
        >
          {isFinal ? (
            <span className="text-accent">Ready</span>
          ) : (
            <>
              Learning how you <span className="text-fg">{current}</span>
            </>
          )}
        </div>
      </div>

      <div
        className="absolute bottom-[30px] left-[60px] right-[60px] flex items-center justify-between f-mono text-[0.58rem] tracking-[0.22em] uppercase text-fg-4"
        style={{
          opacity: 0,
          animation: "lo-fade 0.6s ease 0.55s forwards",
        }}
      >
        <span>Private beta</span>
        <span>Invite only</span>
      </div>

      <style>{`
        @keyframes lo-grid { to { opacity: 0.5; } }
        @keyframes lo-corner {
          0% { opacity: 0; transform: scale(0.6); }
          100% { opacity: 0.8; transform: scale(1); }
        }
        @keyframes lo-fade { to { opacity: 1; } }
        @keyframes lo-bar { to { transform: scaleX(1); } }
        @keyframes lo-sweep {
          0%   { left: 0%; opacity: 1; }
          90%  { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
