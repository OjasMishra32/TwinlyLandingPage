import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

type Props = {
  id?: string;
  eyebrow?: string;
  headline: ReactNode;
  body?: ReactNode;
  visual?: ReactNode;
  align?: "center" | "left";
  /** When present, visual renders above the headline (for hero-style slides) */
  visualAbove?: boolean;
  /** Fill the viewport height */
  fullHeight?: boolean;
  className?: string;
};

/**
 * KeynoteSlide — an Apple-style presentation slide. One viewport, one
 * idea: eyebrow label, oversized display headline, a single body line,
 * and a visual. Everything cascades in from below when you scroll to
 * it. No chrome, no grids, no meta labels competing for attention.
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
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

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
      <div
        className={`relative w-full max-w-[1280px] mx-auto px-6 md:px-14 flex flex-col ${itemsAlign} ${textAlign}`}
      >
        {visualAbove && visual && (
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.98 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
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
            <span className="h-px w-8 bg-accent" />
            {eyebrow}
          </motion.div>
        )}

        <motion.h2
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={
            inView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : {}
          }
          transition={{ duration: 1.1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="text-fg"
          style={{
            fontFamily: "'Fraunces', serif",
            fontOpticalSizing: "auto",
            fontVariationSettings: "'SOFT' 40, 'WONK' 0",
            fontWeight: 400,
            fontSize: "clamp(3.2rem, 9.2vw, 10.5rem)",
            lineHeight: 0.94,
            letterSpacing: "-0.035em",
            maxWidth: align === "center" ? "18ch" : "16ch",
          }}
        >
          {headline}
        </motion.h2>

        {body && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.95,
              delay: 0.32,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-8 md:mt-10 text-fg-2"
            style={{
              fontSize: "clamp(1.1rem, 1.4vw, 1.4rem)",
              lineHeight: 1.52,
              maxWidth: "52ch",
              fontWeight: 400,
            }}
          >
            {body}
          </motion.p>
        )}

        {!visualAbove && visual && (
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              duration: 1.1,
              delay: 0.45,
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
