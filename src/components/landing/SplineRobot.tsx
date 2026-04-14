import { lazy, Suspense, useEffect, useState } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

const SCENE_URL = "https://prod.spline.design/M42JF84w4-TsUmDa/scene.splinecode";

export default function SplineRobot() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 900px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (mobile || reduced) return;
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => void }).requestIdleCallback;
    const run = () => setEnabled(true);
    if (idle) idle(run);
    else window.setTimeout(run, 80);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {enabled && (
        <Suspense fallback={null}>
          <div className="absolute inset-0">
            <Spline scene={SCENE_URL} style={{ width: "100%", height: "100%" }} />
          </div>
        </Suspense>
      )}
      {/* Gradient mask: pulls paper color over the left edge so text stays readable */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-[68%] z-[2]"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--bg)) 0%, hsl(var(--bg)) 34%, hsla(46, 19%, 91%, 0.88) 58%, hsla(46, 19%, 91%, 0.35) 82%, transparent 100%)",
        }}
      />
      {/* Cover the Spline watermark in the bottom-right */}
      <div
        aria-hidden
        className="fixed right-0 bottom-0 w-[260px] h-[90px] z-[45] pointer-events-none"
        style={{
          background:
            "linear-gradient(315deg, hsl(var(--bg)) 0%, hsl(var(--bg)) 55%, hsla(46, 19%, 91%, 0.5) 80%, transparent 100%)",
        }}
      />
    </div>
  );
}
