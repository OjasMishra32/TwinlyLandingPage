import { useEffect, useState } from "react";

const TOTAL_MS = 2400;

/**
 * Loader — minimal boot reveal. Centered lime dot blooms into a
 * hairline, a Fraunces "twinly." wordmark rises through blur, a
 * tagline fades in below. No cut-off labels, no grid chrome, no
 * random mono text. Session-gated so returning visitors skip it.
 */
export default function Loader() {
  const [mounted, setMounted] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    setMounted(true);
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")
      .matches;
    const already = sessionStorage.getItem("twinly-loader") === "1";
    if (reduced || already) {
      setGone(true);
      return;
    }
    sessionStorage.setItem("twinly-loader", "1");
    const t = window.setTimeout(() => setGone(true), TOTAL_MS);
    return () => window.clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden={gone || undefined}
      className="fixed inset-0 z-[2000] flex items-center justify-center overflow-hidden"
      style={{
        background: "hsl(var(--bg))",
        opacity: gone ? 0 : 1,
        visibility: gone ? "hidden" : "visible",
        pointerEvents: gone ? "none" : "auto",
        transition:
          "opacity 0.75s cubic-bezier(.7,0,.3,1), visibility 0.75s step-end",
      }}
    >
      {/* Warm radial backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 48%, hsl(var(--accent) / 0.07) 0%, transparent 65%)",
        }}
      />

      {/* Main stack */}
      <div className="relative flex flex-col items-center">
        {/* Dot that blooms into a hairline */}
        <div className="relative flex items-center justify-center mb-10 h-[2px]">
          <span
            className="absolute h-px bg-accent"
            style={{
              width: "240px",
              transform: "scaleX(0)",
              transformOrigin: "center",
              animation:
                "lo-rule 1.4s cubic-bezier(.22,1,.36,1) 0.35s forwards",
              boxShadow: "0 0 16px hsl(var(--accent) / 0.5)",
            }}
          />
          <span
            className="relative w-[7px] h-[7px] rounded-full bg-accent"
            style={{
              opacity: 0,
              animation: "lo-dot 0.9s cubic-bezier(.7,0,.3,1) 0.1s forwards",
              boxShadow:
                "0 0 14px hsl(var(--accent) / 0.75), 0 0 38px hsl(var(--accent) / 0.35)",
            }}
          />
        </div>

        {/* Wordmark */}
        <div className="relative overflow-hidden px-[0.25em]" style={{ paddingBottom: "0.12em" }}>
          <h1
            className="text-fg"
            style={{
              fontFamily: "'Fraunces', serif",
              fontOpticalSizing: "auto",
              fontVariationSettings: "'SOFT' 50, 'WONK' 0",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(4rem, 13vw, 12rem)",
              lineHeight: 1,
              letterSpacing: "-0.035em",
              display: "inline-flex",
              alignItems: "baseline",
              transform: "translateY(110%)",
              opacity: 0,
              filter: "blur(18px)",
              animation:
                "lo-word 1.35s cubic-bezier(.22,1,.36,1) 0.65s forwards",
            }}
          >
            twinly
            <span
              className="text-accent"
              style={{ marginLeft: "-0.06em" }}
            >
              .
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <div
          className="mt-10 md:mt-12 f-mono text-[0.56rem] md:text-[0.62rem] font-medium tracking-[0.3em] uppercase text-fg-3"
          style={{
            opacity: 0,
            transform: "translateY(10px)",
            animation: "lo-tag 0.9s cubic-bezier(.22,1,.36,1) 1.55s forwards",
            whiteSpace: "nowrap",
          }}
        >
          A personal operator
        </div>
      </div>

      <style>{`
        @keyframes lo-dot {
          0%   { opacity: 0; transform: scale(0.3); }
          60%  { opacity: 1; transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes lo-rule {
          0%   { transform: scaleX(0); opacity: 0; }
          30%  { opacity: 1; }
          100% { transform: scaleX(1); opacity: 1; }
        }
        @keyframes lo-word {
          0%   { transform: translateY(110%); opacity: 0; filter: blur(18px); }
          60%  { opacity: 1; filter: blur(0px); }
          100% { transform: translateY(0); opacity: 1; filter: blur(0px); }
        }
        @keyframes lo-tag {
          0%   { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
