import { Children, ReactNode, ReactElement, cloneElement, isValidElement, useRef } from "react";
import { motion, useInView } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * KineticHeadline, per-letter stagger reveal with independent spring
 * physics on each character. Recurses into nested React elements so
 * nested italic accent spans still get split, but skips void elements
 * (br, img, hr) which cannot have children.
 */

const VOID_TAGS = new Set([
  "br",
  "hr",
  "img",
  "input",
  "area",
  "base",
  "col",
  "embed",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

let keyCounter = 0;
const nextKey = () => `k${++keyCounter}`;

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

function splitNode(node: ReactNode): ReactNode {
  if (node == null || typeof node === "boolean") return node;

  if (typeof node === "string") {
    return Array.from(node).map((char) => (
      <LetterSpan key={nextKey()} char={char} />
    ));
  }

  if (typeof node === "number") {
    return Array.from(String(node)).map((char) => (
      <LetterSpan key={nextKey()} char={char} />
    ));
  }

  if (Array.isArray(node)) {
    return Children.map(node, (child) => splitNode(child));
  }

  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    const tag = typeof el.type === "string" ? el.type : "";
    // Void elements (br, hr, img...) cannot have children, return as-is
    if (VOID_TAGS.has(tag)) return el;
    // Preserve the wrapper element + its props, recurse into its children
    return cloneElement(el, {
      children: splitNode(el.props.children ?? null),
    });
  }

  return node;
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
    >
      {splitNode(children)}
    </motion.h2>
  );
}
