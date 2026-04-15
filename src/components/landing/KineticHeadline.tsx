import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * KineticHeadline — per-letter stagger reveal with independent spring
 * physics on each character. Matches anime.js-style decoded-letter
 * motion: each glyph rises from below, clears a blur, and settles on
 * its own spring.
 *
 * Accepts strings OR React nodes. Strings get split into chars for
 * per-letter animation. Nodes (like nested italic accent spans) get
 * fallback block-level animation so nested formatting still works.
 */

function splitIntoLetters(node: ReactNode, keyPrefix = "k"): ReactNode[] {
  if (typeof node === "string") {
    return node.split("").map((char, i) => ({
      char,
      key: `${keyPrefix}-${i}`,
    })).map(({ char, key }) => (
      <LetterSpan key={key} char={char} />
    ));
  }

  if (Array.isArray(node)) {
    return node.flatMap((child, i) =>
      splitIntoLetters(child, `${keyPrefix}-${i}`)
    );
  }

  // React element — recurse into children while preserving the wrapper
  // element so its classes / styles still apply
  if (
    node &&
    typeof node === "object" &&
    "props" in (node as Record<string, unknown>)
  ) {
    const el = node as React.ReactElement<{ children?: ReactNode; className?: string; style?: React.CSSProperties }>;
    const inner = splitIntoLetters(el.props.children, `${keyPrefix}-c`);
    const Type = el.type as React.ElementType;
    return [
      <Type
        key={`${keyPrefix}-wrap`}
        className={el.props.className}
        style={el.props.style}
      >
        {inner}
      </Type>,
    ];
  }

  return [node];
}

function LetterSpan({ char }: { char: string }) {
  return (
    <motion.span
      variants={{
        hidden: {
          opacity: 0,
          y: "85%",
          filter: "blur(6px)",
        },
        shown: {
          opacity: 1,
          y: "0%",
          filter: "blur(0px)",
          transition: {
            type: "spring",
            damping: 18,
            stiffness: 180,
            mass: 0.9,
          },
        },
      }}
      style={{
        display: "inline-block",
        whiteSpace: char === " " ? "pre" : "normal",
        willChange: "transform, opacity, filter",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

export default function KineticHeadline({
  children,
  className = "sec-h2",
  delay = 0,
}: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <motion.h2
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "shown" : "hidden"}
      transition={{
        delayChildren: delay,
        staggerChildren: 0.028,
      }}
      style={{ display: "block" }}
    >
      {splitIntoLetters(children)}
    </motion.h2>
  );
}
