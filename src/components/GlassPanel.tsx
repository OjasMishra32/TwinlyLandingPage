import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_ITEMS = [
  "PURDUE ENGINEERING",
  "HARVARD",
  "GEORGIA TECH",
  "U FLORIDA",
  "UIUC",
  "CMU",
];

const GlassPanel = () => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    gsap.fromTo(
      panel,
      { yPercent: 100 },
      {
        yPercent: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "85% bottom",
          end: "bottom bottom",
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={panelRef}
      className="absolute bottom-0 left-0 right-0 z-20 glass-blur min-h-screen flex flex-col justify-center items-center px-6 py-20"
      style={{ borderRadius: "2rem 2rem 0 0" }}
    >
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-sans">
          The New Standard of Agency
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans font-light leading-tight">
          We build{" "}
          <span className="font-serif-accent">autonomous twins</span> for
          high-growth teams. Move beyond vibecoding with production-grade AI
          that handles the{" "}
          <span className="font-serif-accent">heavy lifting</span>.
          Engineered for the{" "}
          <span className="font-serif-accent">future</span>.
        </h2>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-12 left-0 right-0 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="mx-8 text-sm font-sans opacity-30 tracking-[0.2em]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlassPanel;
