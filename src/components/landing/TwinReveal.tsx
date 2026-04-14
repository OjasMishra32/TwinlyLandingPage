import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export default function TwinReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    damping: 40,
    stiffness: 140,
    mass: 0.35,
  });

  // Pre-roll / post-roll framing opacity
  const framingOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.85, 1],
    [0, 1, 1, 0]
  );
  const captionOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.55, 0.85, 0.95],
    [0, 1, 1, 0]
  );
  const captionY = useTransform(scrollYProgress, [0.35, 0.55], [24, 0]);

  // Scrub the video as the user scrolls
  useMotionValueEvent(smooth, "change", (p) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const clamped = Math.max(0, Math.min(v.duration - 0.05, p * v.duration));
    // Only seek when the delta is meaningful to avoid stuttering
    if (Math.abs(v.currentTime - clamped) > 0.03) {
      v.currentTime = clamped;
    }
  });

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onReady = () => setReady(true);
    if (v.readyState >= 2) onReady();
    v.addEventListener("loadeddata", onReady);
    return () => v.removeEventListener("loadeddata", onReady);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reveal"
      className="relative border-t border-rule bg-bg"
      style={{ height: "260vh" }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* The rendered Remotion video (scroll-scrubbed) */}
        <video
          ref={videoRef}
          src="/hero-reveal.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        />

        {/* Vignette wash to ground the text */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 10%, hsl(var(--bg) / 0.55) 70%, hsl(var(--bg) / 0.95) 100%)",
          }}
        />

        {/* Top-left framing label */}
        <motion.div
          style={{ opacity: framingOpacity }}
          className="absolute top-8 left-6 md:top-14 md:left-14 z-[2] flex items-center gap-3"
        >
          <span className="live-dot" />
          <span className="f-mono text-[0.6rem] font-medium tracking-[0.22em] uppercase text-fg-2">
            Origin · scene 01
          </span>
        </motion.div>

        {/* Top-right frame counter */}
        <motion.div
          style={{ opacity: framingOpacity }}
          className="absolute top-8 right-6 md:top-14 md:right-14 z-[2] flex items-center gap-3 f-mono text-[0.58rem] tracking-[0.18em] uppercase text-fg-3"
        >
          <span>24 fps</span>
          <span className="text-fg-4">/</span>
          <span>8s</span>
          <span className="text-fg-4">/</span>
          <span className="text-accent">1280 × 720</span>
        </motion.div>

        {/* Registration marks */}
        <div aria-hidden className="absolute inset-6 md:inset-10 pointer-events-none z-[1]">
          {(["tl", "tr", "bl", "br"] as const).map((pos) => (
            <div
              key={pos}
              className={`absolute w-5 h-5 ${
                pos === "tl" ? "top-0 left-0 border-t border-l" : ""
              } ${pos === "tr" ? "top-0 right-0 border-t border-r" : ""} ${
                pos === "bl" ? "bottom-0 left-0 border-b border-l" : ""
              } ${pos === "br" ? "bottom-0 right-0 border-b border-r" : ""}`}
              style={{ borderColor: "hsl(var(--accent) / 0.45)" }}
            />
          ))}
        </div>

        {/* Caption — appears as the twin forms */}
        <motion.div
          style={{ opacity: captionOpacity, y: captionY }}
          className="absolute left-1/2 -translate-x-1/2 bottom-[14%] z-[3] text-center px-6"
        >
          <div className="f-mono text-[0.6rem] font-medium tracking-[0.22em] uppercase text-accent mb-4">
            — The moment a twin is born —
          </div>
          <p
            className="text-fg font-serif italic mx-auto"
            style={{
              fontSize: "clamp(1.4rem, 2.6vw, 2.2rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
              maxWidth: "28ch",
            }}
          >
            One self. Split in two. <br />
            One of them stays here. <br />
            The other runs your week.
          </p>
        </motion.div>

        {/* Bottom scroll hint (fades out as reveal progresses) */}
        <motion.div
          style={{ opacity: framingOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2"
        >
          <span className="f-mono text-[0.56rem] tracking-[0.22em] uppercase text-fg-3">
            Scroll to reveal
          </span>
          <div className="h-7 w-px bg-gradient-to-b from-fg-3 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
