import { ReactNode, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import FloatingParticles from "./FloatingParticles";

type Props = {
  id?: string;
  eyebrow?: string;
  headline: ReactNode;
  body?: ReactNode;
  visual?: ReactNode;
  align?: "center" | "left";
  visualAbove?: boolean;
  fullHeight?: boolean;
  className?: string;
  /** Show the drifting particle field behind the slide */
  particles?: boolean;
  /** Radial spotlight behind the visual */
  spotlight?: boolean;
};

/**
 * KeynoteSlide, a full-viewport Apple-style slide with scroll-linked
 * parallax depth. Eyebrow, headline, body, and visual each transform
 * at slightly different rates as you scroll through the slide,
 * creating a subtle 3D depth reveal. Adds optional floating particles
 * and a radial spotlight behind the visual for atmosphere.
 */
export default function KeynoteSlide({
  id,
  eyebrow,
  headline,
  body,
  visual,
  align = "center",
  visualAbove = false,
  fullHeight = true,
  className = "",
  particles = true,
  spotlight = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  // Scroll-linked parallax, different elements move at different rates
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Apple-style focal parallax: content grows from a point, peaks dead
  // center, and shrinks back to a point as the slide exits
  const headlineY = useTransform(scrollYProgress, [0, 0.5, 1], [120, 0, -120]);
  const headlineOpacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [0, 1, 1, 0]
  );
  const headlineScale = useTransform(
    scrollYProgress,
    [0.05, 0.5, 0.95],
    [0.88, 1, 0.92]
  );
  const bodyY = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -80]);
  const bodyOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.28, 0.78, 0.95],
    [0, 1, 1, 0]
  );
  const visualScale = useTransform(
    scrollYProgress,
    [0.1, 0.5, 0.9],
    [0.84, 1, 0.88]
  );
  const visualY = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -80]);
  const visualOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.28, 0.78, 0.96],
    [0, 1, 1, 0]
  );
  const spotlightOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.5, 0.85],
    [0, 0.9, 0]
  );

  const textAlign = align === "center" ? "text-center" : "text-left";
  const itemsAlign = align === "center" ? "items-center" : "items-start";

  return (
    <section
      ref={ref}
      id={id}
      className={`relative w-full flex flex-col justify-center overflow-hidden border-t border-rule/60 ${
        fullHeight ? "min-h-[82svh]" : ""
      } ${className}`}
      style={{
        padding: "clamp(64px, 8vh, 120px) 0",
        // Off-screen slides skip layout + paint entirely. Huge win on a
        // long keynote page with 10+ animated sections — the browser
        // short-circuits everything below the fold until it scrolls
        // close. contentIntrinsicSize is the placeholder footprint so
        // scroll anchoring / section offsets still compute correctly.
        contentVisibility: "auto",
        containIntrinsicSize: "auto 100svh",
      }}
    >
      {particles && <FloatingParticles count={24} />}

      {spotlight && (
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: spotlightOpacity,
            background:
              "radial-gradient(ellipse 52% 42% at 50% 58%, hsl(var(--accent) / 0.09) 0%, transparent 65%)",
          }}
        />
      )}

      <div
        className={`relative w-full max-w-[1280px] mx-auto px-5 sm:px-8 md:px-14 flex flex-col ${itemsAlign} ${textAlign}`}
      >
        {visualAbove && visual && (
          <motion.div
            style={{ y: visualY, scale: visualScale, opacity: visualOpacity }}
            className="mb-9 md:mb-12 w-full"
          >
            {visual}
          </motion.div>
        )}

        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 md:mb-7 flex items-center gap-3 f-mono text-[0.56rem] font-medium tracking-[0.28em] uppercase text-fg-3"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="h-px w-8 bg-accent origin-left"
            />
            {eyebrow}
          </motion.div>
        )}

        <motion.h2
          style={{
            y: headlineY,
            opacity: headlineOpacity,
            scale: headlineScale,
            fontFamily: "'Fraunces', serif",
            fontOpticalSizing: "auto",
            fontVariationSettings: "'SOFT' 40, 'WONK' 0",
            fontWeight: 400,
            fontSize: "clamp(2.25rem, 7.6vw, 9rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.028em",
            maxWidth: align === "center" ? "18ch" : "16ch",
            margin: align === "center" ? "0 auto" : undefined,
            paddingBottom: "0.08em",
            overflowWrap: "break-word",
            hyphens: "none",
          }}
          initial={{ filter: "blur(14px)" }}
          animate={inView ? { filter: "blur(0px)" } : {}}
          transition={{
            filter: { duration: 1.3, delay: 0.12, ease: [0.22, 1, 0.36, 1] },
          }}
          className="text-fg"
        >
          {headline}
        </motion.h2>

        {body && (
          <motion.p
            style={{
              y: bodyY,
              opacity: bodyOpacity,
              fontSize: "clamp(1rem, 1.4vw, 1.4rem)",
              lineHeight: 1.52,
              maxWidth: "52ch",
              fontWeight: 400,
              margin: align === "center" ? "0 auto" : undefined,
            }}
            className="mt-5 md:mt-7 text-fg-2"
          >
            {body}
          </motion.p>
        )}

        {!visualAbove && visual && (
          <motion.div
            style={{ y: visualY, scale: visualScale, opacity: visualOpacity }}
            className="mt-10 md:mt-14 w-full"
          >
            {visual}
          </motion.div>
        )}
      </div>
    </section>
  );
}
