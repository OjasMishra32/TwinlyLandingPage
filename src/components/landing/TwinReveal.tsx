import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * TwinReveal — scroll-scrubbed video. The source is encoded with
 * every-frame keyframes (-g 1) so video.currentTime seeks are
 * near-instant. Scroll drives the frame position directly via a
 * spring-smoothed progress value. No image sequence, no frame
 * preload, just a 12MB MP4 that seeks as fast as you scroll.
 */

export default function TwinReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Spring smooths the scroll-to-frame mapping so the scrub feels
  // weighted instead of jittery
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 38,
    stiffness: 180,
    mass: 0.35,
  });

  const captionOpacity = useTransform(
    scrollYProgress,
    [0.36, 0.48, 0.84, 0.94],
    [0, 1, 1, 0]
  );
  const metaOpacity = useTransform(
    scrollYProgress,
    [0, 0.06, 0.94, 1],
    [0, 1, 1, 0]
  );

  useMotionValueEvent(smoothProgress, "change", (p) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const target = Math.max(0, Math.min(v.duration - 0.04, p * v.duration));
    if (Math.abs(v.currentTime - target) > 0.015) {
      v.currentTime = target;
    }
  });

  // Make sure the video is loaded enough to seek before first scroll
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    const onReady = () => {
      if (v.readyState >= 2) {
        // Paint the first frame
        v.currentTime = 0;
      }
    };
    v.addEventListener("loadedmetadata", onReady);
    if (v.readyState >= 2) onReady();
    return () => v.removeEventListener("loadedmetadata", onReady);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reveal"
      className="relative border-t border-rule bg-bg"
      style={{ height: "320vh" }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <video
          ref={videoRef}
          src="/hero-reveal.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Edge fades so the video blends into site bg */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[28%] pointer-events-none z-[1]"
          style={{
            background:
              "linear-gradient(180deg, hsl(var(--bg)) 0%, hsl(var(--bg) / 0.65) 50%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[36%] pointer-events-none z-[1]"
          style={{
            background:
              "linear-gradient(0deg, hsl(var(--bg)) 0%, hsl(var(--bg) / 0.7) 45%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-[10%] pointer-events-none z-[1]"
          style={{
            background:
              "linear-gradient(90deg, hsl(var(--bg)) 0%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 w-[10%] pointer-events-none z-[1]"
          style={{
            background:
              "linear-gradient(270deg, hsl(var(--bg)) 0%, transparent 100%)",
          }}
        />

        <motion.div
          style={{ opacity: metaOpacity }}
          className="absolute top-10 left-6 md:top-16 md:left-14 z-[3] flex items-center gap-3"
        >
          <span className="live-dot" />
          <span className="f-mono text-[0.58rem] font-medium tracking-[0.26em] uppercase text-fg-2">
            Origin · scene 01
          </span>
        </motion.div>

        <motion.div
          style={{ opacity: metaOpacity }}
          className="absolute top-10 right-6 md:top-16 md:right-14 z-[3] flex items-center gap-3 f-mono text-[0.54rem] tracking-[0.2em] uppercase text-fg-3"
        >
          <span>scroll-scrubbed</span>
          <span className="text-fg-4">·</span>
          <span className="text-accent">1920 × 1080</span>
        </motion.div>

        <motion.div
          style={{ opacity: captionOpacity }}
          className="absolute bottom-16 md:bottom-24 left-0 right-0 z-[3] text-center px-6"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-accent" />
            <span className="f-mono text-[0.56rem] font-medium tracking-[0.28em] uppercase text-fg-2">
              The moment a twin is born
            </span>
            <span className="h-px w-10 bg-accent" />
          </div>
          <p
            className="text-fg mx-auto"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontSize: "clamp(1.4rem, 2.6vw, 2.4rem)",
              lineHeight: 1.24,
              letterSpacing: "-0.01em",
              maxWidth: "34ch",
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
