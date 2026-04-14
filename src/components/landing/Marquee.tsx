const items = [
  { dot: "a", text: "REPLY IN YOUR VOICE" },
  { dot: "g", text: "RESCHEDULE THURSDAY" },
  { dot: "", text: "FOLLOW UP WITH VENDOR" },
  { dot: "a", text: "COMPARE FLIGHTS · MAY" },
  { dot: "g", text: "RETURN THE ORDER" },
  { dot: "", text: "DRAFT THE EMAIL" },
  { dot: "r", text: "URGENT · APPROVAL REQ" },
  { dot: "g", text: "ORGANIZE THE MORNING" },
  { dot: "", text: "HANDLE IT" },
];

const dotColor: Record<string, string> = {
  a: "#fbbf24",
  g: "#4ade80",
  r: "#ff6b7a",
  "": "hsl(var(--accent))",
};

export default function Marquee() {
  const row = items.concat(items);
  return (
    <section
      aria-hidden
      className="relative bg-ink text-paper overflow-hidden"
      style={{
        borderTop: "1.5px solid hsl(var(--ink))",
        borderBottom: "1.5px solid hsl(var(--ink))",
      }}
    >
      <div
        className="inline-flex whitespace-nowrap animate-marq"
        style={{ gap: 64, padding: "22px 0", willChange: "transform" }}
      >
        {row.map((it, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-[14px] f-mono text-[0.8rem] font-medium tracking-[0.08em] uppercase"
          >
            <i
              className="inline-block w-[7px] h-[7px] rounded-full shrink-0"
              style={{ background: dotColor[it.dot] }}
            />
            <b className="text-white font-bold">{it.text}</b>
            <span className="text-ink-4">·</span>
          </span>
        ))}
      </div>
    </section>
  );
}
