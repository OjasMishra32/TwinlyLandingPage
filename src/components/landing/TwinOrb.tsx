import { useEffect, useRef } from "react";

/**
 * Generative "twin" orb: a ring of particles tethered to a moving attractor,
 * forming a living silhouette that reacts to the cursor. Pure canvas, no deps.
 */
export default function TwinOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let radius = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      cx = w / 2;
      cy = h / 2;
      radius = Math.min(w, h) * 0.34;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const PARTICLE_COUNT = 180;
    type P = {
      angle: number;
      baseR: number;
      r: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      hue: number;
      size: number;
    };
    const particles: P[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
      const baseR = 1 + Math.random() * 0.06;
      return {
        angle,
        baseR,
        r: baseR,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        hue: 72 + Math.random() * 8,
        size: 1 + Math.random() * 1.6,
      };
    });

    let raf = 0;
    let t = 0;
    let mouseVX = 0;
    let mouseVY = 0;
    let prevMX = 0;
    let prevMY = 0;

    const rect = () => canvas.getBoundingClientRect();
    const onMove = (e: PointerEvent) => {
      const r = rect();
      const nx = e.clientX - r.left;
      const ny = e.clientY - r.top;
      mouseVX = nx - prevMX;
      mouseVY = ny - prevMY;
      prevMX = nx;
      prevMY = ny;
      mouseRef.current.x = nx;
      mouseRef.current.y = ny;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    const draw = () => {
      t += 0.014;
      ctx.clearRect(0, 0, w, h);

      // Core glow
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 2.2);
      grad.addColorStop(0, "hsla(72, 100%, 60%, 0.10)");
      grad.addColorStop(0.35, "hsla(72, 100%, 60%, 0.04)");
      grad.addColorStop(1, "hsla(72, 100%, 60%, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // Connect nearby particles with thin lines for "silhouette" feel
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = "hsla(72, 100%, 62%, 0.25)";

      // Mouse influence
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mActive = mouseRef.current.active;

      // Update + draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const wave =
          0.04 * Math.sin(t * 1.6 + p.angle * 3) +
          0.025 * Math.sin(t * 0.7 + p.angle * 5);
        const target = p.baseR + wave;
        p.r += (target - p.r) * 0.1;

        const tx = cx + Math.cos(p.angle + t * 0.25) * radius * p.r;
        const ty = cy + Math.sin(p.angle + t * 0.25) * radius * p.r;

        // Spring toward target
        p.vx += (tx - p.x) * 0.14;
        p.vy += (ty - p.y) * 0.14;

        // Mouse repulsion + swirl
        if (mActive) {
          const ddx = p.x - mx;
          const ddy = p.y - my;
          const dist2 = ddx * ddx + ddy * ddy;
          const R = 140;
          if (dist2 < R * R && dist2 > 1) {
            const dist = Math.sqrt(dist2);
            const force = (1 - dist / R) * 3.2;
            p.vx += (ddx / dist) * force;
            p.vy += (ddy / dist) * force;
            // tangential swirl
            p.vx += -(ddy / dist) * force * 0.45;
            p.vy += (ddx / dist) * force * 0.45;
          }
        }

        p.vx *= 0.78;
        p.vy *= 0.78;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x === 0 && p.y === 0) {
          p.x = tx;
          p.y = ty;
        }

        // Lines to next few neighbours
        if (i % 2 === 0) {
          const next = particles[(i + 1) % particles.length];
          if (next.x) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(next.x, next.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles on top
      for (const p of particles) {
        ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, 0.9)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Inner core
      ctx.fillStyle = "hsla(72, 100%, 68%, 0.9)";
      ctx.beginPath();
      ctx.arc(cx, cy, 3.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "hsla(72, 100%, 90%, 0.4)";
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fill();

      // Orbit rings (static)
      ctx.strokeStyle = "hsla(72, 100%, 62%, 0.10)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.15, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "hsla(72, 100%, 62%, 0.06)";
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.45, 0, Math.PI * 2);
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
}
