import { useEffect, useRef } from "react";

/**
 * 3D particle sphere with constellation connections, cursor-driven camera
 * tilt, depth-based shading and a breathing inner core. Pure canvas, no
 * three.js required, so the runtime cost is minimal.
 */
export default function TwinOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    let R = 0;
    let focal = 520;

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
      R = Math.min(w, h) * 0.32;
      focal = Math.max(480, R * 1.8);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Fibonacci sphere distribution, even coverage, organic feel
    const COUNT = 420;
    type P = {
      // Base unit-sphere coordinates
      bx: number;
      by: number;
      bz: number;
      // World position after rotation
      wx: number;
      wy: number;
      wz: number;
      // Projected screen position
      sx: number;
      sy: number;
      sz: number;
      // Per-particle offset to add organic motion
      phase: number;
      size: number;
    };

    const particles: P[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      particles.push({
        bx: x,
        by: y,
        bz: z,
        wx: 0,
        wy: 0,
        wz: 0,
        sx: 0,
        sy: 0,
        sz: 0,
        phase: Math.random() * Math.PI * 2,
        size: 0.85 + Math.random() * 0.8,
      });
    }

    // Pre-compute constellation links between nearest neighbours (unit sphere)
    type Link = { a: number; b: number };
    const links: Link[] = [];
    const LINK_DIST = 0.32;
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.bx - b.bx;
        const dy = a.by - b.by;
        const dz = a.bz - b.bz;
        if (dx * dx + dy * dy + dz * dz < LINK_DIST * LINK_DIST) {
          links.push({ a: i, b: j });
        }
      }
    }

    // Camera tilt driven by cursor (lerped)
    let tiltX = 0;
    let tiltY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;

    let mouseInside = false;
    let mouseX = 0;
    let mouseY = 0;

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      mouseInside =
        mouseX >= 0 && mouseX <= w && mouseY >= 0 && mouseY <= h;
      // Normalized to [-1, 1] relative to canvas centre
      const nx = (mouseX - cx) / (w / 2);
      const ny = (mouseY - cy) / (h / 2);
      targetTiltY = nx * 0.55;
      targetTiltX = -ny * 0.45;
    };
    const onLeave = () => {
      mouseInside = false;
      targetTiltX = 0;
      targetTiltY = 0;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    let raf = 0;
    let t = 0;
    const draw = () => {
      t += 0.006;
      ctx.clearRect(0, 0, w, h);

      // Soft glow halo behind
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 2.4);
      halo.addColorStop(0, "hsla(72, 100%, 60%, 0.10)");
      halo.addColorStop(0.35, "hsla(72, 100%, 60%, 0.045)");
      halo.addColorStop(1, "hsla(72, 100%, 60%, 0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 2.4, 0, Math.PI * 2);
      ctx.fill();

      // Lerp camera tilt
      tiltX += (targetTiltX - tiltX) * 0.08;
      tiltY += (targetTiltY - tiltY) * 0.08;
      const autoY = t * 0.35;
      const rotY = tiltY + autoY;
      const rotX = tiltX + Math.sin(t * 0.6) * 0.05;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Transform + project every particle
      for (const p of particles) {
        // Breathing scale
        const breathe = 1 + 0.035 * Math.sin(t * 1.2 + p.phase);
        const sx = p.bx * breathe;
        const sy = p.by * breathe;
        const sz = p.bz * breathe;

        // Rotate around Y then X
        const xy = sx * cosY - sz * sinY;
        const zy = sx * sinY + sz * cosY;
        const yx = sy * cosX - zy * sinX;
        const zx = sy * sinX + zy * cosX;

        // Scale to sphere radius
        p.wx = xy * R;
        p.wy = yx * R;
        p.wz = zx * R;

        // Perspective projection
        const persp = focal / (focal + p.wz);
        p.sx = cx + p.wx * persp;
        p.sy = cy + p.wy * persp;
        p.sz = persp;

        // Cursor repulsion in screen space
        if (mouseInside) {
          const ddx = p.sx - mouseX;
          const ddy = p.sy - mouseY;
          const d2 = ddx * ddx + ddy * ddy;
          const rad = 110;
          if (d2 < rad * rad && d2 > 1) {
            const d = Math.sqrt(d2);
            const pull = (1 - d / rad) * 16;
            p.sx += (ddx / d) * pull;
            p.sy += (ddy / d) * pull;
          }
        }
      }

      // Draw constellation links, alpha scales with combined depth
      ctx.lineWidth = 0.8;
      for (const L of links) {
        const a = particles[L.a];
        const b = particles[L.b];
        const depth = (a.sz + b.sz) * 0.5;
        if (depth < 0.5) continue;
        const alpha = Math.max(0, Math.min(0.28, (depth - 0.55) * 0.8));
        if (alpha <= 0) continue;
        ctx.strokeStyle = `hsla(72, 100%, 62%, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();
      }

      // Sort particles front-to-back so near particles pop
      const sorted = particles.slice().sort((a, b) => a.sz - b.sz);
      for (const p of sorted) {
        const d = p.sz; // 0.5..1.5 roughly
        const r = p.size * d * 1.6;
        const alpha = Math.max(0.15, Math.min(1, (d - 0.55) * 1.6));
        if (d > 1.05) {
          // front particles glow subtly
          ctx.shadowBlur = 8 * d;
          ctx.shadowColor = `hsla(72, 100%, 60%, ${alpha * 0.7})`;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fillStyle = `hsla(72, 100%, ${55 + d * 12}%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Inner core
      const coreR = R * 0.08 * (1 + 0.12 * Math.sin(t * 1.8));
      const coreG = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 3.5);
      coreG.addColorStop(0, "hsla(72, 100%, 85%, 0.55)");
      coreG.addColorStop(0.4, "hsla(72, 100%, 65%, 0.25)");
      coreG.addColorStop(1, "hsla(72, 100%, 60%, 0)");
      ctx.fillStyle = coreG;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "hsla(72, 100%, 88%, 0.95)";
      ctx.beginPath();
      ctx.arc(cx, cy, 2.8, 0, Math.PI * 2);
      ctx.fill();

      // Faint reference rings
      ctx.strokeStyle = "hsla(72, 100%, 62%, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.18, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "hsla(72, 100%, 62%, 0.04)";
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.5, 0, Math.PI * 2);
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
