import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * TwinReveal — scroll-scrubbed Remotion video inside a framed cinema
 * container. Not full-bleed (the source video is low-res so we keep
 * it at a comfortable display size and let the site bg show around
 * every edge). Frame-by-frame keyframes in the source mean seeking is
 * smooth.
 */
export default function TwinReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 220,
    mass: 0.2,
  });

  const headerOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.88, 1],
    [0, 1, 1, 0]
  );
  const captionOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.85, 0.95],
    [0, 1, 1, 0]
  );
  const frameGlow = useTransform(
    scrollYProgress,
    [0.25, 0.55, 0.9],
    [0, 1, 0.4]
  );

  useMotionValueEvent(smooth, "change", (p) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const target = Math.max(0, Math.min(v.duration - 0.04, p * v.duration));
    if (Math.abs(v.currentTime - target) > 0.02) {
      v.currentTime = target;
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
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Ambient aura behind the frame */}
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: frameGlow,
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, hsl(72 100% 58% / 0.12) 0%, transparent 65%)",
          }}
        />

        {/* Top framing strip */}
        <motion.div
          style={{ opacity: headerOpacity }}
          className="relative z-[2] w-full max-w-[1100px] px-4 flex items-center justify-between mb-5"
        >
          <div className="flex items-center gap-3">
            <span className="live-dot" />
            <span className="f-mono text-[0.6rem] font-medium tracking-[0.22em] uppercase text-fg-2">
              Origin · scene 01
            </span>
          </div>
          <div className="flex items-center gap-3 f-mono text-[0.56rem] tracking-[0.18em] uppercase text-fg-3">
            <span>8.0s</span>
            <span className="text-fg-4">/</span>
            <span>24 fps</span>
            <span className="text-fg-4">/</span>
            <span className="text-accent">1920 × 1080</span>
          </div>
        </motion.div>

        {/* Framed video container */}
        <div
          className="relative w-[min(92vw,1100px)] border border-rule-hi bg-bg-2 overflow-hidden"
          style={{
            aspectRatio: "16 / 9",
            boxShadow:
              "0 60px 140px -40px hsl(72 100% 58% / 0.18), 0 30px 80px -40px rgba(0,0,0,0.8)",
          }}
        >
          <video
            ref={videoRef}
            src="/hero-reveal.mp4"
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: ready ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          />

          {/* Subtle inner vignette so edges blend into the frame */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 55%, hsl(var(--bg) / 0.5) 100%)",
            }}
          />

          {/* Registration corners (inside the frame) */}
          {(["tl", "tr", "bl", "br"] as const).map((pos) => (
            <div
              key={pos}
              aria-hidden
              className={`absolute w-4 h-4 z-[2] ${
                pos === "tl" ? "top-2.5 left-2.5 border-t border-l" : ""
              } ${pos === "tr" ? "top-2.5 right-2.5 border-t border-r" : ""} ${
                pos === "bl"
                  ? "bottom-2.5 left-2.5 border-b border-l"
                  : ""
              } ${
                pos === "br"
                  ? "bottom-2.5 right-2.5 border-b border-r"
                  : ""
              }`}
              style={{ borderColor: "hsl(var(--accent) / 0.5)" }}
            />
          ))}
        </div>

        {/* Bottom caption */}
        <motion.div
          style={{ opacity: captionOpacity }}
          className="relative z-[2] w-full max-w-[900px] px-6 mt-10 text-center"
        >
          <div className="f-mono text-[0.58rem] font-medium tracking-[0.22em] uppercase text-accent mb-3">
            — The moment a twin is born —
          </div>
          <p
            className="text-fg font-serif italic mx-auto"
            style={{
              fontSize: "clamp(1.2rem, 2vw, 1.9rem)",
              lineHeight: 1.22,
              letterSpacing: "-0.015em",
              maxWidth: "30ch",
            }}
          >
            One self. Split in two. One of them stays here. The other runs your
            week.
          </p>
        </motion.div>

        {/* Bottom scroll hint */}
        <motion.div
          style={{ opacity: headerOpacity }}
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
