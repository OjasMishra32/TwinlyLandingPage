import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 90, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 90, damping: 20, mass: 0.4 });

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    };
    const onLeave = () => {
      x.set(-400);
      y.set(-400);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="pointer-events-none absolute top-0 left-0 h-[520px] w-[520px] rounded-full"
    >
      <div className="h-full w-full rounded-full bg-gradient-radial from-twin-cyan/25 via-twin-cyan/5 to-transparent blur-3xl" style={{ background: "radial-gradient(circle, hsla(170,90%,70%,0.22) 0%, hsla(170,90%,70%,0.06) 30%, transparent 60%)" }} />
    </motion.div>
  );
}
