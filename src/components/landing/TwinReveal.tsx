import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

/**
 * TwinReveal — scroll-scrubbed reveal video, sized so the whole
 * video plays inside the visible sticky window and fades out
 * cleanly before the section unpins.
 *
 * Fix for earlier bugs:
 *  - 320vh section left 100vh of "below-sticky" dead scroll that
 *    read as black space after the video. Shortened to 220vh so
 *    the visible and scrubbable ranges are tight
 *  - Video duration was scrubbed 0→1 across the full progress
 *    which meant the last ~15% of the visible range played the
 *    fade-out-to-black frames. Now the full video plays across
 *    progress 0→0.85, and 0.85→1 fades the element opacity to 0
 *    as a graceful exit
 *  - Ready-gate buffers the target time and applies it the moment
 *    the video is decodable, so first-scroll still renders
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

  // The video scrubs across 0 → 0.85 of the visible progress.
  // The remaining 0.85 → 1 is the fade-out window.
  const captionOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.48, 0.78, 0.9],
    [0, 1, 1, 0]
  );
  const metaOpacity = useTransform(
    scrollYProgress,
    [0, 0.06, 0.88, 0.98],
    [0, 1, 1, 0]
  );
  const videoFade = useTransform(
    scrollYProgress,
    [0, 0.05, 0.85, 1],
    [0, 1, 1, 0]
  );
  // Combine the fade opacity with the ready state
  const videoOpacity = useMotionTemplate`${videoFade}`;

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
        const t = Math.max(0, Math.min(v.duration - 0.04, targetRef.current));
        try {
          v.currentTime = t;
          appliedRef.current = t;
        } catch {
          /* noop */
        }
      }
    };

    v.addEventListener("loadedmetadata", markReady);
    v.addEventListener("loadeddata", markReady);
    v.addEventListener("canplay", markReady);
    v.addEventListener("canplaythrough", markReady);
    if (v.readyState >= 2) markReady();

    let raf = 0;
    const tick = () => {
      const p = scrollYProgress.get();
      if (v.duration) {
        // Full video plays across 0 → 0.85 progress. After that,
        // the element fades out (see videoFade transform above).
        const scrubP = Math.max(0, Math.min(1, p / 0.85));
        const target = Math.max(
          0,
          Math.min(v.duration - 0.04, scrubP * v.duration)
        );
        targetRef.current = target;
        if (
          readyRef.current &&
          Math.abs(target - appliedRef.current) > 0.033
        ) {
          try {
            v.currentTime = target;
            appliedRef.current = target;
          } catch {
            /* noop */
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("loadedmetadata", markReady);
      v.removeEventListener("loadeddata", markReady);
      v.removeEventListener("canplay", markReady);
      v.removeEventListener("canplaythrough", markReady);
    };
  }, [scrollYProgress]);

  return (
    <section
      ref={sectionRef}
      id="reveal"
      className="relative bg-bg overflow-hidden border-t border-rule/60"
      style={{ height: "220vh" }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <motion.video
          ref={videoRef}
          src="/hero-reveal.mp4"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: ready ? videoOpacity : 0.3,
            transition: ready
              ? undefined
              : "opacity 0.6s ease",
          }}
        />

        {/* Edge fades into site bg */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[26%] pointer-events-none z-[1]"
          style={{
            background:
              "linear-gradient(180deg, hsl(var(--bg)) 0%, hsl(var(--bg) / 0.6) 50%, transparent 100%)",
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

        {/* Top-left meta */}
        <motion.div
          style={{ opacity: metaOpacity }}
          className="absolute top-10 left-6 md:top-16 md:left-14 z-[3] flex items-center gap-3"
        >
          <span className="live-dot" />
          <span className="f-mono text-[0.58rem] font-medium tracking-[0.26em] uppercase text-fg-2">
            Origin · scene 01
          </span>
        </motion.div>

        {/* Top-right spec */}
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

        {/* Bottom caption, serif italic */}
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
