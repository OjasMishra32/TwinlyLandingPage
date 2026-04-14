import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import TwinOrb from "./TwinOrb";

const Spline = lazy(() => import("@splinetool/react-spline"));

const SCENE_URL = "https://prod.spline.design/ItJYhtZ3LZ50BPer/scene.splinecode";

export default function SplineRobot() {
  const [enabled, setEnabled] = useState(false);
  const [splineReady, setSplineReady] = useState(false);
  const [fallback, setFallback] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Parallax tilt tied to mouse position over the wrapper
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 70, damping: 20 });
  const smy = useSpring(my, { stiffness: 70, damping: 20 });
  const tiltX = useTransform(smy, [-0.5, 0.5], [5, -5]);
  const tiltY = useTransform(smx, [-0.5, 0.5], [-7, 7]);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 900px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (mobile || reduced) return;
    const idle =
      (window as unknown as { requestIdleCallback?: (cb: () => void) => void })
        .requestIdleCallback;
    const run = () => setEnabled(true);
    if (idle) idle(run);
    else window.setTimeout(run, 80);
  }, []);

  // Timeout fallback — if Spline hasn't signalled ready within 5s, swap to orb
  useEffect(() => {
    if (!enabled) return;
    const t = window.setTimeout(() => {
      if (!splineReady) setFallback(true);
    }, 5000);
    return () => window.clearTimeout(t);
  }, [enabled, splineReady]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      mx.set(Math.max(-0.5, Math.min(0.5, nx)));
      my.set(Math.max(-0.5, Math.min(0.5, ny)));
    };
    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [mx, my]);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 pointer-events-none"
      style={{ perspective: "1400px" }}
    >
      {/* Subtle floor glow — barely-there warmth under the robot, no hard oval */}
      <div
        aria-hidden
        className="absolute left-0 right-0 bottom-0 h-[38%] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 80% at 50% 100%, hsl(var(--accent) / 0.07) 0%, hsl(var(--accent) / 0.02) 40%, transparent 75%)",
        }}
      />

      {/* Orbital rings — subtle, tilt with parallax, drawn low under the robot */}
      <motion.svg
        viewBox="0 0 600 600"
        className="absolute inset-0 w-full h-full"
        style={{
          rotateX: tiltX,
          rotateY: tiltY,
          transformStyle: "preserve-3d",
        }}
        aria-hidden
      >
        <defs>
          <linearGradient id="ring-grad" x1="0" x2="1">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.01" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.22" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.01" />
          </linearGradient>
        </defs>
        <ellipse
          cx="300"
          cy="480"
          rx="240"
          ry="44"
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth="0.9"
        />
        <ellipse
          cx="300"
          cy="480"
          rx="200"
          ry="34"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeOpacity="0.08"
          strokeWidth="0.6"
          strokeDasharray="2 6"
        />
      </motion.svg>

      {/* The Spline bot (or orb fallback) */}
      {enabled && !fallback && (
        <Suspense fallback={null}>
          <motion.div
            className="absolute inset-0 pointer-events-auto"
            style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
          >
            <Spline
              scene={SCENE_URL}
              style={{ width: "100%", height: "100%" }}
              onLoad={() => setSplineReady(true)}
              onError={() => setFallback(true)}
            />
          </motion.div>
        </Suspense>
      )}
      {(fallback || !enabled) && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
        >
          <TwinOrb />
        </motion.div>
      )}

      {/* Corner registration marks */}
      {(
        [
          ["top-[8%] left-[6%] border-r-0 border-b-0", "tl"],
          ["top-[8%] right-[6%] border-l-0 border-b-0", "tr"],
          ["bottom-[8%] left-[6%] border-r-0 border-t-0", "bl"],
          ["bottom-[8%] right-[6%] border-l-0 border-t-0", "br"],
        ] as const
      ).map(([cls, k], i) => (
        <motion.span
          key={k}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute w-[22px] h-[22px] border border-accent ${cls}`}
        />
      ))}

      {/* Bottom HUD meta line */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="absolute bottom-[3%] left-[12%] right-[12%] flex items-center justify-between gap-4 f-mono text-[0.52rem] tracking-[0.22em] uppercase text-fg-4"
      >
        <span className="flex items-center gap-2">
          <span
            className="w-[5px] h-[5px] rounded-full bg-accent"
            style={{ boxShadow: "0 0 8px hsl(var(--accent))" }}
          />
          TWN · online
        </span>
        <span className="hidden md:inline">Tracking: cursor · scroll</span>
        <span>uptime · 99.8%</span>
      </motion.div>

      {/* Watermark cover */}
      <div
        aria-hidden
        className="absolute right-0 bottom-0 w-[240px] h-[80px]"
        style={{
          background:
            "linear-gradient(315deg, hsl(var(--bg)) 0%, hsl(var(--bg)) 55%, hsl(var(--bg) / 0.6) 80%, transparent 100%)",
        }}
      />
    </div>
  );
}
