import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

/**
 * TwinReveal — canvas image-sequence scrubber.
 *
 * Instead of an HTMLVideoElement (which has to decode + seek per
 * scroll event), we preload 192 JPEG frames into Image objects and
 * draw the active frame straight into a canvas. That gives true 1:1
 * frame-per-scroll smoothness with no keyframe-dependent stutter —
 * the kind Apple uses on their product pages.
 */

const FRAME_COUNT = 192;
const NATIVE_W = 1920;
const NATIVE_H = 1080;

function framePath(i: number) {
  return `/reveal/f${String(i + 1).padStart(3, "0")}.jpg`;
}

export default function TwinReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const headerOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.9, 1],
    [0, 1, 1, 0]
  );
  const captionOpacity = useTransform(
    scrollYProgress,
    [0.32, 0.52, 0.85, 0.95],
    [0, 1, 1, 0]
  );

  // Preload all frames. Priority: first frame, then the wordmark
  // reveal band (frames 70-140), then the rest. The user sees a
  // rendered first frame immediately and the critical reveal band
  // is warm by the time they get there.
  useEffect(() => {
    let cancelled = false;
    const imgs: HTMLImageElement[] = new Array(FRAME_COUNT);
    let count = 0;

    const priority: number[] = [];
    priority.push(0);
    for (let i = 70; i <= 140; i++) priority.push(i);
    for (let i = 0; i < FRAME_COUNT; i++) {
      if (i !== 0 && !(i >= 70 && i <= 140)) priority.push(i);
    }

    const loadOne = (idx: number): Promise<void> =>
      new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (cancelled) return resolve();
          imgs[idx] = img;
          count++;
          setLoaded(count);
          // Draw the first frame as soon as it lands
          if (idx === 0 && ctxRef.current) {
            ctxRef.current.drawImage(img, 0, 0, NATIVE_W, NATIVE_H);
          }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = framePath(idx);
      });

    (async () => {
      // Fire in small concurrent waves so we don't starve the main thread
      const CONCURRENCY = 12;
      for (let i = 0; i < priority.length; i += CONCURRENCY) {
        if (cancelled) break;
        const slice = priority.slice(i, i + CONCURRENCY);
        await Promise.all(slice.map(loadOne));
      }
      if (!cancelled) {
        imagesRef.current = imgs;
        setReady(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Canvas context setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;
    ctxRef.current = ctx;
    // Paint black while loading
    ctx.fillStyle = "#05060a";
    ctx.fillRect(0, 0, NATIVE_W, NATIVE_H);
  }, []);

  // Scroll → frame mapping. Direct, no spring smoothing — the user
  // asked for 1:1 frame-per-scroll, so we give them exactly that.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const ctx = ctxRef.current;
    const imgs = imagesRef.current;
    if (!ctx || !imgs.length) return;

    const target = Math.max(
      0,
      Math.min(FRAME_COUNT - 1, Math.round(p * (FRAME_COUNT - 1)))
    );
    if (target === currentFrameRef.current) return;
    const img = imgs[target];
    if (!img || !img.complete) {
      // Fall back to the nearest loaded frame
      let nearest = target;
      for (let d = 1; d < FRAME_COUNT; d++) {
        const lo = target - d;
        const hi = target + d;
        if (lo >= 0 && imgs[lo] && imgs[lo].complete) {
          nearest = lo;
          break;
        }
        if (hi < FRAME_COUNT && imgs[hi] && imgs[hi].complete) {
          nearest = hi;
          break;
        }
      }
      const fallback = imgs[nearest];
      if (!fallback || !fallback.complete) return;
      ctx.drawImage(fallback, 0, 0, NATIVE_W, NATIVE_H);
      currentFrameRef.current = nearest;
      return;
    }
    ctx.drawImage(img, 0, 0, NATIVE_W, NATIVE_H);
    currentFrameRef.current = target;
  });

  const loadPct = Math.round((loaded / FRAME_COUNT) * 100);

  return (
    <section
      ref={sectionRef}
      id="reveal"
      className="relative border-t border-rule bg-bg"
      style={{ height: "240vh" }}
    >
      <div className="sticky top-0 h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Top frame strip */}
        <motion.div
          style={{ opacity: headerOpacity }}
          className="relative z-[2] w-[min(92vw,1200px)] flex items-center justify-between mb-5"
        >
          <div className="flex items-center gap-3">
            <span className="live-dot" />
            <span className="f-mono text-[0.58rem] font-medium tracking-[0.24em] uppercase text-fg-2">
              Origin · scene 01
            </span>
          </div>
          <div className="f-mono text-[0.54rem] tracking-[0.18em] uppercase text-fg-3">
            <span className="text-accent">{ready ? "Ready" : `Loading ${loadPct}%`}</span>
          </div>
        </motion.div>

        {/* Framed canvas */}
        <div
          className="relative w-[min(92vw,1200px)] bg-bg-2"
          style={{ aspectRatio: "16 / 9" }}
        >
          <canvas
            ref={canvasRef}
            width={NATIVE_W}
            height={NATIVE_H}
            className="block w-full h-full"
            style={{ imageRendering: "auto" }}
          />

          {/* Loading veil */}
          {!ready && (
            <div className="absolute inset-0 flex items-end p-6 pointer-events-none">
              <div className="w-full">
                <div className="flex items-center justify-between mb-2 f-mono text-[0.56rem] tracking-[0.22em] uppercase text-fg-3">
                  <span>Assembling the reveal</span>
                  <span className="text-accent">{loadPct}%</span>
                </div>
                <div className="h-[2px] bg-rule overflow-hidden">
                  <div
                    className="h-full bg-accent transition-[width] duration-150"
                    style={{ width: `${loadPct}%`, boxShadow: "0 0 10px hsl(var(--accent) / 0.6)" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom caption */}
        <motion.div
          style={{ opacity: captionOpacity }}
          className="relative z-[2] w-full max-w-[860px] px-6 mt-9 text-center"
        >
          <p
            className="text-fg font-serif italic mx-auto"
            style={{
              fontSize: "clamp(1.1rem, 1.8vw, 1.65rem)",
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
              maxWidth: "32ch",
            }}
          >
            One self. Split in two. One of them stays here. The other runs your
            week.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
