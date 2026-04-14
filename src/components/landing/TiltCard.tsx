import { ReactNode, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
  style?: React.CSSProperties;
};

/**
 * 3D perspective tilt with glare highlight. Tracks the cursor over the
 * element and rotates on X/Y to create a spatial, card-as-object feel.
 */
export default function TiltCard({
  children,
  className = "",
  max = 9,
  glare = true,
  style,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    let raf = 0;
    let tRx = 0;
    let tRy = 0;
    let rX = 0;
    let rY = 0;
    let tGx = 50;
    let tGy = 50;
    let gX = 50;
    let gY = 50;
    let tGo = 0;
    let gO = 0;

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      tRy = (px - 0.5) * max * 2;
      tRx = -(py - 0.5) * max * 2;
      tGx = px * 100;
      tGy = py * 100;
      tGo = 1;
    };
    const onLeave = () => {
      tRx = 0;
      tRy = 0;
      tGo = 0;
    };

    const tick = () => {
      rX += (tRx - rX) * 0.15;
      rY += (tRy - rY) * 0.15;
      gX += (tGx - gX) * 0.2;
      gY += (tGy - gY) * 0.2;
      gO += (tGo - gO) * 0.15;
      inner.style.transform = `perspective(900px) rotateX(${rX.toFixed(
        2
      )}deg) rotateY(${rY.toFixed(2)}deg)`;
      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(240px circle at ${gX}% ${gY}%, hsl(var(--accent) / ${(
          gO * 0.14
        ).toFixed(3)}), transparent 70%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [max]);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ ...style, perspective: "900px" }}
    >
      <div
        ref={innerRef}
        className="relative w-full h-full will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
        {glare && (
          <div
            ref={glareRef}
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ mixBlendMode: "screen" }}
          />
        )}
      </div>
    </div>
  );
}
