import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

/**
 * TwinReveal — full-bleed canvas image-sequence scrubber.
 *
 * Preloads 192 high-res JPEG frames and draws the active one straight
 * into a canvas. No <video>, no seek stutter — true 1:1 frame-per-
 * scroll. Canvas is sized to cover the full viewport (letterboxing
 * cropped by JS-measured cover fit).
 */

const FRAME_COUNT = 192;
const NATIVE_W = 3840;
const NATIVE_H = 2160;
const CONTENT_RATIO = NATIVE_W / NATIVE_H;

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

  const captionOpacity = useTransform(
    scrollYProgress,
    [0.32, 0.52, 0.82, 0.94],
    [0, 1, 1, 0]
  );
  const metaOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.92, 1],
    [0, 1, 1, 0]
  );

  // Preload all frames — priority wave: frame 0, then the 70-140
  // reveal band, then the rest
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
          if (idx === 0 && ctxRef.current) {
            ctxRef.current.drawImage(img, 0, 0, NATIVE_W, NATIVE_H);
          }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = framePath(idx);
      });

    (async () => {
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

  // Canvas context + cover-fit sizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;
    ctxRef.current = ctx;
    ctx.fillStyle = "#05060a";
    ctx.fillRect(0, 0, NATIVE_W, NATIVE_H);

    const fit = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const viewportRatio = vw / vh;
      let w: number;
      let h: number;
      if (viewportRatio > CONTENT_RATIO) {
        w = vw;
        h = vw / CONTENT_RATIO;
      } else {
        h = vh;
        w = vh * CONTENT_RATIO;
      }
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  // Scroll → frame mapping, direct 1:1
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
      style={{ height: "260vh" }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-center">
        {/* Full-bleed canvas, JS-sized for cover-fit */}
        <canvas
          ref={canvasRef}
          width={NATIVE_W}
          height={NATIVE_H}
          className="block absolute"
          style={{
            opacity: ready ? 1 : 0.35,
            transition: "opacity 0.6s ease",
          }}
        />

        {/* Subtle top vignette so meta line reads over any frame */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[20%] pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, hsl(var(--bg) / 0.7) 0%, transparent 100%)",
          }}
        />

        {/* Subtle bottom vignette for caption */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[35%] pointer-events-none"
          style={{
            background:
              "linear-gradient(0deg, hsl(var(--bg) / 0.85) 0%, transparent 100%)",
          }}
        />

        {/* Top-left meta (mono label) */}
        <motion.div
          style={{ opacity: metaOpacity }}
          className="absolute top-8 left-6 md:top-12 md:left-14 z-[2] flex items-center gap-3"
        >
          <span className="live-dot" />
          <span className="f-mono text-[0.58rem] font-medium tracking-[0.24em] uppercase text-fg-2">
            Origin · scene 01
          </span>
        </motion.div>

        {/* Top-right loading / ready meta */}
        <motion.div
          style={{ opacity: metaOpacity }}
          className="absolute top-8 right-6 md:top-12 md:right-14 z-[2] f-mono text-[0.54rem] tracking-[0.2em] uppercase text-accent"
        >
          {ready ? "Ready" : `Loading ${loadPct}%`}
        </motion.div>

        {/* Loading progress bar (only while preloading) */}
        {!ready && (
          <div className="absolute bottom-8 left-6 right-6 md:bottom-14 md:left-14 md:right-14 z-[3]">
            <div className="flex items-center justify-between mb-2 f-mono text-[0.56rem] tracking-[0.22em] uppercase text-fg-3">
              <span>Assembling the reveal</span>
              <span className="text-accent">{loadPct}%</span>
            </div>
            <div className="h-[2px] bg-rule overflow-hidden">
              <div
                className="h-full bg-accent transition-[width] duration-150"
                style={{ width: `${loadPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Bottom caption — appears during the reveal band */}
        {ready && (
          <motion.div
            style={{ opacity: captionOpacity }}
            className="absolute bottom-14 md:bottom-20 left-1/2 -translate-x-1/2 z-[3] text-center px-6 max-w-[860px]"
          >
            <p
              className="text-fg font-serif italic mx-auto"
              style={{
                fontSize: "clamp(1.2rem, 2vw, 1.9rem)",
                lineHeight: 1.22,
                letterSpacing: "-0.01em",
                maxWidth: "32ch",
              }}
            >
              One self. Split in two. One of them stays here. The other runs
              your week.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
