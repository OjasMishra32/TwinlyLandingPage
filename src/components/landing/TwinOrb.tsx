import { useEffect, useRef } from "react";

/**
 * TwinOrb — the canvas-2D fallback that renders when Spline can't
 * (school-locked Windows machines with WebGL disabled, slow load,
 * or reduced-motion). This file matters: for a meaningful chunk of
 * visitors, it's what they see *instead* of the 3D robot, so it has
 * to stand on its own.
 *
 * Rendered layers, back to front:
 *   1. Twinkling star field (ambient depth)
 *   2. Soft halo glow
 *   3. Three orbital rings on different axes, rotating independently
 *   4. Particle sphere (Fibonacci, 520 pts) with constellation links
 *   5. Cursor-reactive particle repulsion
 *   6. Outward-drifting spark emitters from the sphere surface
 *   7. Cross-shaped lens flare + bright nucleus
 *   8. Two faint reference rings
 *
 * Everything is pure Canvas 2D — no WebGL, no three.js — because
 * locked-down enterprise/school browsers often have WebGL disabled.
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
    let rect = canvas.getBoundingClientRect();

    const resize = () => {
      rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      cx = w / 2;
      cy = h / 2;
      R = Math.min(w, h) * 0.28;
      focal = Math.max(480, R * 1.8);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Background stars (2D, static positions, twinkling alpha)
    type Star = { x: number; y: number; r: number; phase: number; speed: number };
    const stars: Star[] = [];
    const STAR_COUNT = 160;
    const seedStars = () => {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random(),
          y: Math.random(),
          r: 0.3 + Math.random() * 1.2,
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 1.4,
        });
      }
    };
    seedStars();

    // Fibonacci sphere distribution, 520 pts for density
    const COUNT = 520;
    type P = {
      bx: number;
      by: number;
      bz: number;
      wx: number;
      wy: number;
      wz: number;
      sx: number;
      sy: number;
      sz: number;
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
        size: 0.75 + Math.random() * 0.9,
      });
    }

    // Pre-compute constellation links between near neighbours
    type Link = { a: number; b: number };
    const links: Link[] = [];
    const LINK_DIST = 0.28;
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

    // Emitted sparks — drift outward from the sphere surface, fade
    type Spark = {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      life: number;
      maxLife: number;
    };
    const sparks: Spark[] = [];
    const MAX_SPARKS = 60;

    const spawnSpark = () => {
      if (sparks.length >= MAX_SPARKS) return;
      // Random direction on unit sphere
      const u = Math.random() * 2 - 1;
      const th = Math.random() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      const dx = s * Math.cos(th);
      const dy = u;
      const dz = s * Math.sin(th);
      const speed = 0.004 + Math.random() * 0.006;
      sparks.push({
        x: dx,
        y: dy,
        z: dz,
        vx: dx * speed,
        vy: dy * speed,
        vz: dz * speed,
        life: 0,
        maxLife: 1.2 + Math.random() * 1.4,
      });
    };

    // Orbital rings — each is a flat circle on the unit sphere that we
    // rotate into 3D space using two axis angles, then project. They
    // spin independently at different rates.
    type Ring = {
      axisX: number;
      axisY: number;
      axisZ: number;
      radius: number;
      phase: number;
      speed: number;
      thickness: number;
      opacity: number;
    };
    const rings: Ring[] = [
      { axisX: 0.2, axisY: 0, axisZ: 1, radius: 1.25, phase: 0, speed: 0.25, thickness: 1.6, opacity: 0.35 },
      { axisX: 0.9, axisY: 0.3, axisZ: 0, radius: 1.5, phase: 1.2, speed: -0.18, thickness: 1.2, opacity: 0.22 },
      { axisX: 0.4, axisY: 0.8, axisZ: 0.3, radius: 1.75, phase: 2.4, speed: 0.12, thickness: 1.0, opacity: 0.16 },
    ];

    // Camera tilt driven by cursor (lerped). Rect is cached and only
    // re-measured on scroll/resize — not on every pointermove.
    let tiltX = 0;
    let tiltY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;

    let mouseInside = false;
    let mouseX = 0;
    let mouseY = 0;

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      mouseInside = mouseX >= 0 && mouseX <= w && mouseY >= 0 && mouseY <= h;
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
    const remeasure = () => {
      rect = canvas.getBoundingClientRect();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", remeasure, { passive: true });
    window.addEventListener("resize", remeasure);

    // Helper: rotate 3D point around camera by rotX then rotY
    const rotatePoint = (
      x: number,
      y: number,
      z: number,
      cosX: number,
      sinX: number,
      cosY: number,
      sinY: number
    ) => {
      const xy = x * cosY - z * sinY;
      const zy = x * sinY + z * cosY;
      const yx = y * cosX - zy * sinX;
      const zx = y * sinX + zy * cosX;
      return { x: xy, y: yx, z: zx };
    };

    let raf = 0;
    let t = 0;
    let sparkAccum = 0;
    let lastTs = performance.now();

    const draw = (ts: number) => {
      const dt = Math.min(0.05, (ts - lastTs) / 1000);
      lastTs = ts;
      t += dt;

      ctx.clearRect(0, 0, w, h);

      // 1. Background twinkling star field
      for (const s of stars) {
        const a = 0.25 + 0.45 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        ctx.fillStyle = `hsla(0, 0%, 100%, ${a * 0.5})`;
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Soft outer halo
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 3);
      halo.addColorStop(0, "hsla(72, 100%, 60%, 0.14)");
      halo.addColorStop(0.3, "hsla(72, 100%, 60%, 0.06)");
      halo.addColorStop(0.7, "hsla(280, 60%, 40%, 0.03)");
      halo.addColorStop(1, "hsla(72, 100%, 60%, 0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 3, 0, Math.PI * 2);
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

      // 3. Orbital rings — sample each ring as a polyline of 72 points
      for (const ring of rings) {
        // Build two perpendicular basis vectors for this ring's plane
        // from the axis vector. Use a stable reference (world up or
        // world right) to cross with.
        const ax = ring.axisX;
        const ay = ring.axisY;
        const az = ring.axisZ;
        // Normalize axis
        const alen = Math.hypot(ax, ay, az) || 1;
        const nx = ax / alen;
        const ny = ay / alen;
        const nz = az / alen;
        // Reference vector not parallel to axis
        const refx = Math.abs(ny) < 0.9 ? 0 : 1;
        const refy = Math.abs(ny) < 0.9 ? 1 : 0;
        const refz = 0;
        // u = axis × ref, normalized
        let ux = ny * refz - nz * refy;
        let uy = nz * refx - nx * refz;
        let uz = nx * refy - ny * refx;
        const ulen = Math.hypot(ux, uy, uz) || 1;
        ux /= ulen;
        uy /= ulen;
        uz /= ulen;
        // v = axis × u
        const vx = ny * uz - nz * uy;
        const vy = nz * ux - nx * uz;
        const vz = nx * uy - ny * ux;

        ring.phase += ring.speed * dt;

        const steps = 72;
        ctx.lineWidth = ring.thickness;
        ctx.strokeStyle = `hsla(72, 100%, 62%, ${ring.opacity})`;
        ctx.beginPath();
        for (let k = 0; k <= steps; k++) {
          const ang = ring.phase + (k / steps) * Math.PI * 2;
          const cu = Math.cos(ang) * ring.radius;
          const cv = Math.sin(ang) * ring.radius;
          const px = ux * cu + vx * cv;
          const py = uy * cu + vy * cv;
          const pz = uz * cu + vz * cv;
          const rotated = rotatePoint(px, py, pz, cosX, sinX, cosY, sinY);
          const persp = focal / (focal + rotated.z * R);
          const sx = cx + rotated.x * R * persp;
          const sy = cy + rotated.y * R * persp;
          if (k === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      }

      // 4. Transform + project every particle
      for (const p of particles) {
        const breathe = 1 + 0.035 * Math.sin(t * 1.2 + p.phase);
        const sx = p.bx * breathe;
        const sy = p.by * breathe;
        const sz = p.bz * breathe;

        const rotated = rotatePoint(sx, sy, sz, cosX, sinX, cosY, sinY);
        p.wx = rotated.x * R;
        p.wy = rotated.y * R;
        p.wz = rotated.z * R;

        const persp = focal / (focal + p.wz);
        p.sx = cx + p.wx * persp;
        p.sy = cy + p.wy * persp;
        p.sz = persp;

        // 5. Cursor repulsion
        if (mouseInside) {
          const ddx = p.sx - mouseX;
          const ddy = p.sy - mouseY;
          const d2 = ddx * ddx + ddy * ddy;
          const rad = 120;
          if (d2 < rad * rad && d2 > 1) {
            const d = Math.sqrt(d2);
            const pull = (1 - d / rad) * 20;
            p.sx += (ddx / d) * pull;
            p.sy += (ddy / d) * pull;
          }
        }
      }

      // Draw constellation links
      ctx.lineWidth = 0.8;
      for (const L of links) {
        const a = particles[L.a];
        const b = particles[L.b];
        const depth = (a.sz + b.sz) * 0.5;
        if (depth < 0.55) continue;
        const alpha = Math.max(0, Math.min(0.32, (depth - 0.55) * 0.9));
        if (alpha <= 0) continue;
        ctx.strokeStyle = `hsla(72, 100%, 62%, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();
      }

      // Sort particles front-to-back
      const sorted = particles.slice().sort((a, b) => a.sz - b.sz);
      for (const p of sorted) {
        const d = p.sz;
        const r = p.size * d * 1.7;
        const alpha = Math.max(0.15, Math.min(1, (d - 0.55) * 1.6));
        if (d > 1.05) {
          ctx.shadowBlur = 10 * d;
          ctx.shadowColor = `hsla(72, 100%, 60%, ${alpha * 0.75})`;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fillStyle = `hsla(72, 100%, ${55 + d * 14}%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // 6. Emitted sparks — drift outward and fade
      sparkAccum += dt;
      while (sparkAccum > 0.04) {
        sparkAccum -= 0.04;
        spawnSpark();
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life += dt;
        if (s.life > s.maxLife) {
          sparks.splice(i, 1);
          continue;
        }
        s.x += s.vx;
        s.y += s.vy;
        s.z += s.vz;
        const rotated = rotatePoint(s.x, s.y, s.z, cosX, sinX, cosY, sinY);
        const persp = focal / (focal + rotated.z * R);
        const sx = cx + rotated.x * R * persp;
        const sy = cy + rotated.y * R * persp;
        const lifeT = s.life / s.maxLife;
        const alpha = (1 - lifeT) * 0.9;
        ctx.fillStyle = `hsla(72, 100%, 72%, ${alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `hsla(72, 100%, 60%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // 7. Nucleus + cross lens flare
      const coreR = R * 0.09 * (1 + 0.14 * Math.sin(t * 1.8));
      const coreG = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 4.5);
      coreG.addColorStop(0, "hsla(72, 100%, 92%, 0.75)");
      coreG.addColorStop(0.25, "hsla(72, 100%, 70%, 0.4)");
      coreG.addColorStop(0.6, "hsla(72, 100%, 60%, 0.12)");
      coreG.addColorStop(1, "hsla(72, 100%, 60%, 0)");
      ctx.fillStyle = coreG;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Lens flare: horizontal + vertical streaks
      const flareLen = R * 1.6;
      const flareAlpha = 0.38 + 0.12 * Math.sin(t * 1.8);
      const hgrad = ctx.createLinearGradient(
        cx - flareLen,
        cy,
        cx + flareLen,
        cy
      );
      hgrad.addColorStop(0, "hsla(72, 100%, 70%, 0)");
      hgrad.addColorStop(0.5, `hsla(72, 100%, 85%, ${flareAlpha})`);
      hgrad.addColorStop(1, "hsla(72, 100%, 70%, 0)");
      ctx.fillStyle = hgrad;
      ctx.fillRect(cx - flareLen, cy - 0.8, flareLen * 2, 1.6);

      const vgrad = ctx.createLinearGradient(
        cx,
        cy - flareLen * 0.7,
        cx,
        cy + flareLen * 0.7
      );
      vgrad.addColorStop(0, "hsla(72, 100%, 70%, 0)");
      vgrad.addColorStop(0.5, `hsla(72, 100%, 85%, ${flareAlpha * 0.6})`);
      vgrad.addColorStop(1, "hsla(72, 100%, 70%, 0)");
      ctx.fillStyle = vgrad;
      ctx.fillRect(cx - 0.6, cy - flareLen * 0.7, 1.2, flareLen * 1.4);

      ctx.fillStyle = "hsla(72, 100%, 95%, 0.98)";
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();

      // 8. Faint reference rings
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
      window.removeEventListener("scroll", remeasure);
      window.removeEventListener("resize", remeasure);
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
