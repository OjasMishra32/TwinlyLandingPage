import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: string;
}

const ScrollFloat = ({ children }: ScrollFloatProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll(".scroll-char");

    gsap.fromTo(
      chars,
      { opacity: 1, y: 0, scale: 1 },
      {
        opacity: 0,
        y: 80,
        scale: 0.8,
        stagger: 0.02,
        ease: "power2.in",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "30% top",
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const lines = children.split("\n");

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none"
    >
      <h1
        className="font-dirtyline text-center leading-[0.9] tracking-tight"
        style={{ fontSize: "clamp(4rem, 12vw, 280px)" }}
      >
        {lines.map((line, li) => (
          <span key={li} className="block">
            {line.split("").map((char, ci) => (
              <span key={`${li}-${ci}`} className="scroll-char inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default ScrollFloat;
