import { useEffect, useState } from "react";

export default function Loader() {
  const [mounted, setMounted] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    setMounted(true);
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const already = sessionStorage.getItem("twinly-loader") === "1";
    if (reduced || already) {
      setGone(true);
      return;
    }
    sessionStorage.setItem("twinly-loader", "1");
    const t = window.setTimeout(() => setGone(true), 900);
    return () => window.clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden={gone || undefined}
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-bg"
      style={{
        opacity: gone ? 0 : 1,
        visibility: gone ? "hidden" : "visible",
        pointerEvents: gone ? "none" : "auto",
        transition: "opacity 0.55s cubic-bezier(.7,0,.3,1), visibility 0.55s step-end",
      }}
    >
      <div className="relative flex flex-col items-center gap-5">
        <div
          className="font-serif italic text-fg glow-accent"
          style={{
            fontSize: "clamp(3.2rem,10vw,9rem)",
            lineHeight: 0.9,
            animation: "lo-rise 0.9s cubic-bezier(.22,1,.36,1) 0.05s both",
          }}
        >
          twinly
        </div>
        <div
          className="h-[1px] w-[140px] bg-fg-4 overflow-hidden"
          style={{ animation: "lo-fade 0.6s ease-out 0.1s both" }}
        >
          <div
            className="h-full bg-accent"
            style={{
              transformOrigin: "left",
              animation: "lo-bar 0.75s cubic-bezier(.65,0,.35,1) 0.15s both",
            }}
          />
        </div>
      </div>
      <style>{`
        @keyframes lo-rise {
          0%   { opacity: 0; transform: translateY(18px); filter: blur(6px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes lo-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes lo-bar {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
