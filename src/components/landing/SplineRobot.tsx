import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const Spline = lazy(() => import("@splinetool/react-spline"));

const SCENE_URL = "https://prod.spline.design/ItJYhtZ3LZ50BPer/scene.splinecode";

const chips = [
  { label: "Reading thread · Lena", status: "ok", pos: "top-[12%] right-[4%]", delay: 0.3 },
  { label: "Drafting reply", status: "ok", pos: "top-[28%] right-[38%]", delay: 0.55 },
  { label: "Holding Wed 9:30", status: "run", pos: "top-[50%] right-[2%]", delay: 0.8 },
  { label: "Tone matched · 14 msgs", status: "ok", pos: "bottom-[32%] right-[42%]", delay: 1.05 },
  { label: "Awaiting approval", status: "wait", pos: "bottom-[14%] right-[6%]", delay: 1.3 },
];

const statusColor: Record<string, string> = {
  ok: "hsl(var(--accent))",
  run: "hsl(var(--accent))",
  wait: "hsl(var(--ember))",
};

export default function SplineRobot() {
  const [enabled, setEnabled] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Parallax tilt tied to mouse position over the wrapper
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 70, damping: 20 });
  const smy = useSpring(my, { stiffness: 70, damping: 20 });
  const tiltX = useTransform(smy, [-0.5, 0.5], [6, -6]);
  const tiltY = useTransform(smx, [-0.5, 0.5], [-8, 8]);

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
      {/* Aura halo */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(42% 40% at 58% 52%, hsl(var(--accent) / 0.16) 0%, hsl(var(--accent) / 0.04) 40%, transparent 70%)",
        }}
      />

      {/* Orbital rings — SVG so they render crisp and tilt with the scene */}
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
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.05" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.45" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <ellipse
          cx="300"
          cy="320"
          rx="240"
          ry="70"
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth="1"
        />
        <ellipse
          cx="300"
          cy="320"
          rx="200"
          ry="55"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeOpacity="0.14"
          strokeWidth="0.8"
          strokeDasharray="2 6"
        />
        <ellipse
          cx="300"
          cy="320"
          rx="280"
          ry="90"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeOpacity="0.08"
          strokeWidth="0.6"
          strokeDasharray="1 3"
        />
      </motion.svg>

      {/* The Spline bot */}
      {enabled && (
        <Suspense fallback={null}>
          <motion.div
            className="absolute inset-0 pointer-events-auto"
            style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
          >
            <Spline scene={SCENE_URL} style={{ width: "100%", height: "100%" }} />
          </motion.div>
        </Suspense>
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
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute w-[22px] h-[22px] border border-accent ${cls}`}
        />
      ))}

      {/* Floating action chips */}
      {chips.map((c) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: c.delay, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute ${c.pos} will-change-transform`}
        >
          <Chip label={c.label} status={c.status} />
        </motion.div>
      ))}

      {/* Bottom HUD readout: tiny data line with pseudo-metrics */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="absolute bottom-[4%] left-[14%] right-[14%] flex items-center justify-between gap-4 f-mono text-[0.52rem] tracking-[0.22em] uppercase text-fg-4"
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

      {/* Left-edge gradient so the hero text stays crisp */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-[60%] hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--bg)) 0%, hsl(var(--bg)) 28%, hsl(var(--bg) / 0.85) 55%, hsl(var(--bg) / 0.3) 82%, transparent 100%)",
        }}
      />

      {/* Cover the Spline watermark in the bottom-right */}
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

function Chip({ label, status }: { label: string; status: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-bg-2/85 border border-rule-hi backdrop-blur-sm f-mono text-[0.58rem] tracking-[0.12em] uppercase text-fg-2">
      <span
        className="w-[6px] h-[6px] rounded-full shrink-0"
        style={{
          background: statusColor[status],
          boxShadow: `0 0 8px ${statusColor[status]}`,
          animation: "chip-blink 1.6s ease-in-out infinite",
        }}
      />
      <span className="text-fg font-medium">{label}</span>
      <style>{`
        @keyframes chip-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
      `}</style>
    </div>
  );
}
