import { lazy, Suspense, useEffect, useState } from "react";
import TwinOrb from "./TwinOrb";

const Spline = lazy(() => import("@splinetool/react-spline"));

const SCENE_URL = "https://prod.spline.design/ItJYhtZ3LZ50BPer/scene.splinecode";

/**
 * SplineRobot — the hero-side 3D robot.
 *
 * Two hard requirements from the user:
 *   1. The robot must be stationary — no mouse-parallax tilt, no drift.
 *      A previous pass attached the whole canvas to a spring-tracked
 *      mouse position; it felt floaty and the robot wandered away
 *      from its baseline pose.
 *   2. Scroll events over the robot must scroll the page. Spline's
 *      canvas captures wheel/pointer input by default, which meant
 *      scrolling over the robot moved the robot inside its own 3D
 *      viewport (panning the camera) while the page stayed locked.
 *      Solved here with `pointer-events: none` on the Spline layer so
 *      wheel/pointer events pass straight through to the document.
 *      The robot is now a pure visual — no interaction, but also no
 *      scroll hijack.
 */
export default function SplineRobot() {
  const [enabled, setEnabled] = useState(false);
  const [splineReady, setSplineReady] = useState(false);
  const [fallback, setFallback] = useState(false);

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

  // Fallback: if Spline hasn't signalled ready within 5s, swap to orb.
  useEffect(() => {
    if (!enabled) return;
    const t = window.setTimeout(() => {
      if (!splineReady) setFallback(true);
    }, 5000);
    return () => window.clearTimeout(t);
  }, [enabled, splineReady]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {enabled && !fallback && (
        <Suspense fallback={null}>
          {/* pointer-events: none on the Spline layer is the fix for
              scroll hijack. The canvas renders, but does not steal
              wheel/pointer events from the page. */}
          <div className="absolute inset-0 pointer-events-none">
            <Spline
              scene={SCENE_URL}
              style={{
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
              onLoad={() => setSplineReady(true)}
              onError={() => setFallback(true)}
            />
          </div>
        </Suspense>
      )}
      {(fallback || !enabled) && (
        <div className="absolute inset-0 pointer-events-none">
          <TwinOrb />
        </div>
      )}

      {/* Watermark cover — hides Spline's corner logo. */}
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
