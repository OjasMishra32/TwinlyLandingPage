import { useEffect, useState } from "react";

const channels = [
  { k: "MEMORY", start: 0, end: 100, dur: 1.15 },
  { k: "VOICE", start: 0, end: 100, dur: 1.3 },
  { k: "ACTION", start: 0, end: 100, dur: 1.45 },
  { k: "APPROVAL", start: 0, end: 100, dur: 1.6 },
];

const logLines = [
  "> boot twinly.operator       · streaming",
  "> calibrate tone.matrix      · ok",
  "> sync memory.kernel         · ok",
  "> prime approval.gate        · ok",
  "> handshake /v1/twin         · locked",
];

export default function Loader() {
  const [mounted, setMounted] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    setMounted(true);
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const already = sessionStorage.getItem("twinly-loader-shown") === "1";
    if (reduced || already) {
      setGone(true);
      return;
    }
    sessionStorage.setItem("twinly-loader-shown", "1");
    const hideT = window.setTimeout(() => setGone(true), 2600);
    return () => window.clearTimeout(hideT);
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden={gone || undefined}
      className="fixed inset-0 z-[2000] flex flex-col overflow-hidden bg-paper"
      style={{
        padding: "26px clamp(24px,4vw,56px) 22px",
        opacity: gone ? 0 : 1,
        visibility: gone ? "hidden" : "visible",
        transition: "opacity 0.9s cubic-bezier(.7,0,.3,1), visibility 0.9s step-end",
      }}
    >
      {/* Grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--ink) / 0.06) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--ink) / 0.06) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 55%, rgba(0,0,0,1) 18%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.05) 100%)",
          maskImage:
            "radial-gradient(ellipse at 50% 55%, rgba(0,0,0,1) 18%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.05) 100%)",
          animation: "lo-grid-in 1.4s cubic-bezier(.7,0,.3,1) 0.1s forwards",
          opacity: 0,
        }}
      />
      {/* Sweeping scan line */}
      <div
        aria-hidden
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(var(--accent) / 0.55) 20%, hsl(var(--accent) / 0.85) 50%, hsl(var(--accent) / 0.55) 80%, transparent)",
          boxShadow: "0 0 18px 2px hsl(var(--accent) / 0.35)",
          animation: "lo-sweep-y 2.8s cubic-bezier(.65,0,.35,1) 0.3s infinite",
        }}
      />
      {/* Corner registration marks */}
      {[
        ["top-[20px] left-[20px] border-r-0 border-b-0", "tl"],
        ["top-[20px] right-[20px] border-l-0 border-b-0", "tr"],
        ["bottom-[20px] left-[20px] border-r-0 border-t-0", "bl"],
        ["bottom-[20px] right-[20px] border-l-0 border-t-0", "br"],
      ].map(([cls, k]) => (
        <span
          key={k}
          className={`absolute w-[22px] h-[22px] border-[1.5px] border-ink ${cls}`}
          style={{ animation: "lo-corner-in 0.55s cubic-bezier(.7,0,.3,1) 0.35s forwards", opacity: 0 }}
        />
      ))}

      {/* Top row */}
      <div
        className="relative z-[2] flex justify-between items-center f-mono text-[0.64rem] font-medium tracking-[0.16em] uppercase text-ink-3"
        style={{ animation: "lo-fade-in 0.7s cubic-bezier(.7,0,.3,1) 0.25s forwards", opacity: 0 }}
      >
        <span>
          <b className="text-ink font-bold">TWINLY</b>
          <span className="px-2 text-rule-hi">/</span>
          OPERATOR BOOT
          <span className="px-2 text-rule-hi">/</span>
          <span className="text-ink-4">REV · 01</span>
        </span>
        <span className="flex items-center gap-[10px] text-ink font-bold">
          <span className="diamond" /> STATUS · CALIBRATING
        </span>
      </div>

      {/* Middle */}
      <div className="relative z-[2] flex-1 flex flex-col justify-center max-w-[1100px] w-full mx-auto">
        <div className="relative inline-block self-start">
          <div
            className="font-black text-ink whitespace-nowrap"
            style={{
              fontSize: "clamp(3.5rem,12.5vw,13.5rem)",
              lineHeight: 0.84,
              letterSpacing: "-0.06em",
              fontStretch: "75%",
            }}
          >
            twin
            <span className="text-accent font-medium mx-[0.04em]">/</span>
            ly
          </div>
          <span
            aria-hidden
            className="absolute -top-[6px] -bottom-[6px] w-[2px]"
            style={{
              left: "-3%",
              background: "hsl(var(--accent))",
              boxShadow: "0 0 16px 3px hsl(var(--accent) / 0.55)",
              opacity: 0,
              animation: "lo-mark-scan 2.1s cubic-bezier(.65,0,.35,1) 0.6s 2",
            }}
          />
        </div>

        <div
          className="mt-[18px] mb-[40px] f-mono text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-ink-2"
          style={{ animation: "lo-fade-in 0.6s cubic-bezier(.7,0,.3,1) 0.5s forwards", opacity: 0 }}
        >
          <span className="text-accent px-[10px]">/</span>
          BOOTING YOUR OPERATOR
          <span className="text-accent px-[10px]">/</span>
          <span className="text-ink font-bold">PHASE · INIT</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-[22px] gap-x-[64px] max-w-[960px]">
          {channels.map((c, i) => (
            <div
              key={c.k}
              className="opacity-0"
              style={{
                animation: `lo-ch-in 0.55s cubic-bezier(.7,0,.3,1) ${0.55 + i * 0.11}s forwards`,
              }}
            >
              <div className="flex justify-between items-baseline mb-[7px] f-mono tracking-[0.16em] uppercase">
                <span className="text-[0.6rem] font-medium text-ink-2">{c.k}</span>
                <span className="text-[0.68rem] font-bold text-ink">
                  <CountUp to={100} dur={c.dur} delayS={0.7 + i * 0.11} />%
                </span>
              </div>
              <div className="relative h-[2px] bg-ink/10 overflow-hidden">
                <div
                  className="absolute inset-0 bg-accent origin-left"
                  style={{
                    transform: "scaleX(0)",
                    animation: `lo-bar-fill ${c.dur}s cubic-bezier(.65,0,.35,1) ${0.7 + i * 0.11}s forwards`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Log panel */}
      <div
        className="relative z-[2] mt-[24px] pt-[14px] border-t border-rule f-mono text-[0.6rem] font-medium tracking-[0.06em] text-ink-3 flex flex-col gap-[2px]"
        style={{ height: "4.2em", overflow: "hidden" }}
      >
        {logLines.map((l, i) => (
          <div
            key={l}
            className="opacity-0 whitespace-nowrap"
            style={{
              animation: `lo-line-in 0.35s cubic-bezier(.7,0,.3,1) ${0.7 + i * 0.22}s forwards`,
            }}
          >
            <Colorize line={l} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes lo-grid-in { to { opacity: 1; } }
        @keyframes lo-sweep-y {
          0%   { top: 0%;   opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes lo-corner-in {
          0%   { opacity: 0; transform: scale(0.55); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes lo-fade-in { to { opacity: 1; } }
        @keyframes lo-mark-scan {
          0%   { left: -3%;  opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { left: 103%; opacity: 0; }
        }
        @keyframes lo-ch-in { to { opacity: 1; transform: translateY(0); } }
        @keyframes lo-bar-fill { to { transform: scaleX(1); } }
        @keyframes lo-line-in {
          0%   { opacity: 0; transform: translateX(-6px); }
          100% { opacity: 0.92; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

function CountUp({ to, dur, delayS }: { to: number; dur: number; delayS: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now() + delayS * 1000;
    let raf = 0;
    const tick = (t: number) => {
      const e = Math.min(1, Math.max(0, (t - start) / (dur * 1000)));
      const eased = 1 - Math.pow(1 - e, 3);
      setV(Math.round(eased * to));
      if (e < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, dur, delayS]);
  return <>{v.toString().padStart(3, "0")}</>;
}

function Colorize({ line }: { line: string }) {
  const parts = line.split(/(·|ok|locked|streaming)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p === "ok" || p === "locked") return <b key={i} className="text-accent font-bold">{p}</b>;
        if (p === "·") return <em key={i} className="not-italic text-ink-4">·</em>;
        if (p === "streaming") return <u key={i} className="no-underline text-ink font-bold">{p}</u>;
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}
