import { useCallback } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const NAV_ITEMS = ["TWINLY", "MANIFESTO", "ENGINEERING", "BUILD"];

const PetalLogo = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5 transition-transform duration-500 group-hover:rotate-90"
    fill="currentColor"
  >
    <ellipse cx="12" cy="6" rx="3" ry="5.5" />
    <ellipse cx="12" cy="18" rx="3" ry="5.5" />
    <ellipse cx="6" cy="12" rx="5.5" ry="3" />
    <ellipse cx="18" cy="12" rx="5.5" ry="3" />
  </svg>
);

const PillNav = () => {
  const handleClick = useCallback((item: string) => {
    if (item === "TWINLY") {
      gsap.to(window, { scrollTo: 0, duration: 1.5, ease: "power3.inOut" });
    } else if (item === "MANIFESTO") {
      gsap.to(window, {
        scrollTo: document.body.scrollHeight,
        duration: 1.5,
        ease: "power3.inOut",
      });
    }
  }, []);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="glass-blur rounded-full px-2 py-2 flex items-center gap-1">
        <button className="group px-3 py-2" onClick={() => handleClick("TWINLY")}>
          <PetalLogo />
        </button>
        {NAV_ITEMS.map((item) => (
          <button
            key={item}
            onClick={() => handleClick(item)}
            className="px-4 py-2 text-xs font-sans tracking-[0.15em] text-foreground/70 hover:text-foreground transition-colors duration-200"
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default PillNav;
