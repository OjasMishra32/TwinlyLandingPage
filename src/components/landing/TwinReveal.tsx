import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * TwinReveal — scroll-scrubbed reveal video. Dead simple version:
 *
 *  - Section is 200vh. Sticky child is 100vh. Progress 0→1 spans
 *    exactly the 100vh of scroll where the child is pinned.
 *  - Video is encoded with every-frame keyframes and trimmed to
 *    7.5s (no fade-out tail), so there's no "black frame" at the end.
 *  - currentTime seeks are driven by useMotionValueEvent on
 *    scrollYProgress, which fires synchronously on every scroll
 *    tick. No rAF polling, no useMotionTemplate string wrappers.
 *  - Ready-gate: listens to canplay / loadeddata. If scroll happens
 *    before the video is decodable, the latest target time is
 *    buffered and applied the moment it becomes ready.
 *  - Element opacity is a straight transform from progress, so the
 *    video fades in/out gracefully at the section boundaries.
 */

export default function TwinReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetRef = useRef(0);
  const appliedRef = useRef(-1);
  const readyRef = useRef(false);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // No video opacity transform — the video stays at full opacity for the
  // entire scrub. The sticky pins it while the user scrolls, the video plays
  // through, and when the section bottom catches the viewport bottom the
  // sticky releases naturally and the section scrolls past.
  const captionOpacity = useTransform(
    scrollYProgress,
    [0.42, 0.55, 0.85, 0.95],
    [0, 1, 1, 0]
  );
  const metaOpacity = useTransform(
    scrollYProgress,
    [0, 0.06, 0.92, 1],
    [0, 1, 1, 0]
  );

  // Apply target time directly on scroll. No rAF polling, no spring,
  // no throttling. currentTime seeks on an all-keyframe MP4 are cheap.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const v = videoRef.current;
    if (!v || !v.duration) {
      targetRef.current = p;
      return;
    }
    const target = Math.max(0, Math.min(v.duration - 0.02, p * v.duration));
    targetRef.current = target;
    if (!readyRef.current) return;
    if (Math.abs(target - appliedRef.current) < 0.025) return;
    try {
      v.currentTime = target;
      appliedRef.current = target;
    } catch {
      /* silently skip — will retry on next scroll event */
    }
  });

  // Preload + ready gate
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    try {
      v.load();
    } catch {
      /* noop */
    }
    const markReady = () => {
      if (v.readyState >= 2 && !readyRef.current) {
        readyRef.current = true;
        setReady(true);
        // Apply the last buffered target (if any), otherwise start at 0
        const bufferedProgress = targetRef.current;
        const target =
          bufferedProgress <= 1
            ? Math.max(
                0,
                Math.min(v.duration - 0.02, bufferedProgress * v.duration)
              )
            : bufferedProgress;
        try {
          v.currentTime = target;
          appliedRef.current = target;
        } catch {
          /* noop */
        }
      }
    };
    v.addEventListener("loadedmetadata", markReady);
    v.addEventListener("loadeddata", markReady);
    v.addEventListener("canplay", markReady);
    if (v.readyState >= 2) markReady();
    return () => {
      v.removeEventListener("loadedmetadata", markReady);
      v.removeEventListener("loadeddata", markReady);
      v.removeEventListener("canplay", markReady);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reveal"
      className="relative bg-bg border-t border-rule/60"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src="/hero-reveal.mp4"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: ready ? 1 : 0.3, transition: "opacity 0.5s ease" }}
        />

        {/* Edge fades into site bg */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[24%] pointer-events-none z-[1]"
          style={{
            background:
              "linear-gradient(180deg, hsl(var(--bg)) 0%, hsl(var(--bg) / 0.6) 50%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[34%] pointer-events-none z-[1]"
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
          <span>scroll to reveal</span>
          <span className="text-fg-4">·</span>
          <span className="text-accent">1920 × 1080</span>
        </motion.div>

        {!ready && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-[4] f-mono text-[0.52rem] tracking-[0.22em] uppercase text-fg-4">
            buffering
          </div>
        )}

        {/* Scroll progress rail on the right edge — visual proof the
            scrub is working. As the user scrolls through the pinned
            section, the lime fill rises from bottom to top. */}
        <motion.div
          style={{ opacity: metaOpacity }}
          className="absolute top-24 bottom-24 right-6 md:right-12 z-[3] w-[2px]"
        >
          <div className="absolute inset-0 bg-rule/60" />
          <motion.div
            className="absolute inset-x-0 bottom-0 origin-bottom bg-accent"
            style={{
              scaleY: scrollYProgress,
              boxShadow: "0 0 10px hsl(var(--accent) / 0.6)",
            }}
          />
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
