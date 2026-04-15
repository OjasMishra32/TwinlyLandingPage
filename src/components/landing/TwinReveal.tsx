import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/**
 * TwinReveal — full-bleed autoplay video. The Remotion-rendered reveal
 * (Veo source + warm color grade + masked watermark) plays on its own
 * when the section enters the viewport. Loops quietly so slow scrollers
 * catch the moment more than once. No scroll-scrub, no frame preload —
 * just a single 4MB H.264 MP4 that the browser handles natively.
 */

export default function TwinReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(sectionRef, { once: false, margin: "-15%" });
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) {
      v.currentTime = 0;
      v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      v.pause();
    }
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      id="reveal"
      className="relative min-h-[100svh] overflow-hidden border-t border-rule bg-bg"
    >
      {/* Full-bleed video */}
      <video
        ref={videoRef}
        src="/hero-reveal.mp4"
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          opacity: playing ? 1 : 0.35,
          transition: "opacity 0.7s ease",
        }}
      />

      {/* Top fade into site bg */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[24%] pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--bg)) 0%, hsl(var(--bg) / 0.6) 50%, transparent 100%)",
        }}
      />
      {/* Bottom fade into site bg */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[34%] pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(0deg, hsl(var(--bg)) 0%, hsl(var(--bg) / 0.7) 45%, transparent 100%)",
        }}
      />
      {/* Left + right edge fades */}
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
        initial={{ opacity: 0, y: -10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-10 left-6 md:top-16 md:left-14 z-[3] flex items-center gap-3"
      >
        <span className="live-dot" />
        <span className="f-mono text-[0.58rem] font-medium tracking-[0.26em] uppercase text-fg-2">
          Origin · scene 01
        </span>
      </motion.div>

      {/* Top-right spec */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-10 right-6 md:top-16 md:right-14 z-[3] flex items-center gap-3 f-mono text-[0.54rem] tracking-[0.2em] uppercase text-fg-3"
      >
        <span>1920 × 1080</span>
        <span className="text-fg-4">·</span>
        <span className="text-accent">8s loop</span>
      </motion.div>

      {/* Bottom caption */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-14 md:bottom-20 left-0 right-0 z-[3] text-center px-6"
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-accent" />
          <span className="f-mono text-[0.56rem] font-medium tracking-[0.28em] uppercase text-fg-2">
            The moment a twin is born
          </span>
          <span className="h-px w-8 bg-accent" />
        </div>
        <p
          className="text-fg font-serif italic mx-auto"
          style={{
            fontSize: "clamp(1.3rem, 2.4vw, 2.3rem)",
            lineHeight: 1.22,
            letterSpacing: "-0.01em",
            maxWidth: "34ch",
            fontFamily: "'Instrument Serif', serif",
          }}
        >
          One self. Split in two. One of them stays here. The other runs your
          week.
        </p>
      </motion.div>
    </section>
  );
}
