import { lazy, Suspense, useEffect, useState } from "react";
import TwinOrb from "./TwinOrb";

const Spline = lazy(() => import("@splinetool/react-spline"));

const SCENE_URL = "https://prod.spline.design/ItJYhtZ3LZ50BPer/scene.splinecode";

/**
 * SplineRobot — hero-side 3D figure.
 *
 * Behavior contract:
 *   1. Stationary. No mouse-parallax tilt.
 *   2. Scrolling over it scrolls the page. The old version set
 *      pointer-events-auto on the inner Spline wrapper so it could
 *      track the mouse for the tilt; that same pointer-events-auto
 *      also let Spline's canvas eat wheel events. We drop the inner
 *      pointer-events-auto override and let the outer wrapper's
 *      pointer-events-none cascade down, so wheel events fall through
 *      to the document.
 *
 * Structure is kept intentionally close to the prior working version
 * so the compositor layers + z-stack + perspective wrapper render
 * identically on desktop; only the tilt motion values and the
 * mousemove listener are removed.
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
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ perspective: "1400px" }}
    >
      {enabled && !fallback && (
        <Suspense fallback={null}>
          <div
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Spline
              scene={SCENE_URL}
              style={{ width: "100%", height: "100%" }}
              onLoad={() => setSplineReady(true)}
              onError={() => setFallback(true)}
            />
          </div>
        </Suspense>
      )}
      {(fallback || !enabled) && (
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
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
