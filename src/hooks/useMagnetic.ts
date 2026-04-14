import { useEffect, useRef } from "react";

/**
 * Gently pulls an element toward the cursor when the pointer enters its
 * activation radius. Resets smoothly when the cursor leaves. Respects
 * prefers-reduced-motion and touch devices.
 */
export function useMagnetic<T extends HTMLElement>({
  radius = 120,
  strength = 0.35,
}: { radius?: number; strength?: number } = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let cx = 0;
    let cy = 0;
    let tx = 0;
    let ty = 0;
    let inside = false;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        inside = true;
        const pull = 1 - dist / radius;
        tx = dx * strength * pull;
        ty = dy * strength * pull;
      } else if (inside) {
        inside = false;
        tx = 0;
        ty = 0;
      }
    };
    const onLeave = () => {
      inside = false;
      tx = 0;
      ty = 0;
    };

    const tick = () => {
      cx += (tx - cx) * 0.2;
      cy += (ty - cy) * 0.2;
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(
        2
      )}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      if (el) el.style.transform = "";
    };
  }, [radius, strength]);

  return ref;
}
