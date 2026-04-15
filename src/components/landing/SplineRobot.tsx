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

  // Timeout fallback, if Spline hasn't signalled ready within 5s, swap to orb
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

    // Cache the bounding rect instead of measuring on every pointermove.
    // getBoundingClientRect triggers a synchronous layout read, and this
    // handler was firing on every single window mouse event — death for
    // any page with the robot mounted. Re-measure only when layout can
    // actually change (scroll, resize).
    let rect = wrap.getBoundingClientRect();
    const remeasure = () => {
      rect = wrap.getBoundingClientRect();
    };

    // rAF-throttle the motion-value writes so we hit at most one update
    // per frame regardless of how fast the mouse is moving.
    let latestX = 0;
    let latestY = 0;
    let queued = false;
    const flush = () => {
      queued = false;
      mx.set(latestX);
      my.set(latestY);
    };

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      latestX = Math.max(-0.5, Math.min(0.5, nx));
      latestY = Math.max(-0.5, Math.min(0.5, ny));
      if (!queued) {
        queued = true;
        requestAnimationFrame(flush);
      }
    };
    const onLeave = () => {
      latestX = 0;
      latestY = 0;
      if (!queued) {
        queued = true;
        requestAnimationFrame(flush);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", remeasure, { passive: true });
    window.addEventListener("resize", remeasure);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", remeasure);
      window.removeEventListener("resize", remeasure);
    };
  }, [mx, my]);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 pointer-events-none"
      style={{ perspective: "1400px" }}
    >
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
