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
 * KeynoteSlide — a full-viewport Apple-style slide with scroll-linked
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

  // Scroll-linked parallax — different elements move at different rates
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // As the slide passes through the viewport, the headline rises, the
  // body follows faster, the visual scales slightly
  const headlineY = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -80]);
  const headlineOpacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [0, 1, 1, 0]
  );
  const bodyY = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60]);
  const visualScale = useTransform(
    scrollYProgress,
    [0.1, 0.5, 0.9],
    [0.94, 1, 0.96]
  );
  const visualY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);
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
        fullHeight ? "min-h-[100svh]" : ""
      } ${className}`}
      style={{ padding: "clamp(120px, 14vh, 180px) 0" }}
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
        className={`relative w-full max-w-[1280px] mx-auto px-6 md:px-14 flex flex-col ${itemsAlign} ${textAlign}`}
      >
        {visualAbove && visual && (
          <motion.div
            style={{ y: visualY, scale: visualScale }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 md:mb-16 w-full"
          >
            {visual}
          </motion.div>
        )}

        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 md:mb-10 flex items-center gap-3 f-mono text-[0.56rem] font-medium tracking-[0.28em] uppercase text-fg-3"
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
            fontFamily: "'Fraunces', serif",
            fontOpticalSizing: "auto",
            fontVariationSettings: "'SOFT' 40, 'WONK' 0",
            fontWeight: 400,
            fontSize: "clamp(3.2rem, 9.2vw, 10.5rem)",
            lineHeight: 0.94,
            letterSpacing: "-0.035em",
            maxWidth: align === "center" ? "18ch" : "16ch",
            margin: align === "center" ? "0 auto" : undefined,
          }}
          initial={{ filter: "blur(10px)", scale: 0.96 }}
          animate={inView ? { filter: "blur(0px)", scale: 1 } : {}}
          transition={{
            filter: { duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] },
            scale: {
              duration: 1.4,
              delay: 0.1,
              type: "spring",
              damping: 18,
              stiffness: 110,
              mass: 1,
            },
          }}
          className="text-fg"
        >
          {headline}
        </motion.h2>

        {body && (
          <motion.p
            style={{
              y: bodyY,
              fontSize: "clamp(1.1rem, 1.4vw, 1.4rem)",
              lineHeight: 1.52,
              maxWidth: "52ch",
              fontWeight: 400,
              margin: align === "center" ? "0 auto" : undefined,
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{
              duration: 0.95,
              delay: 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-8 md:mt-10 text-fg-2"
          >
            {body}
          </motion.p>
        )}

        {!visualAbove && visual && (
          <motion.div
            style={{ y: visualY, scale: visualScale }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{
              duration: 1.1,
              delay: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-14 md:mt-20 w-full"
          >
            {visual}
          </motion.div>
        )}
      </div>
    </section>
  );
}
