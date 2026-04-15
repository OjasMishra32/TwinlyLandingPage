const items = [
  { dot: "a", text: "Filing 2025 taxes" },
  { dot: "g", text: "Booking Tokyo · 8 days" },
  { dot: "", text: "Drafting research paper" },
  { dot: "g", text: "Cancelled 9 subscriptions" },
  { dot: "a", text: "FAFSA form · 82% complete" },
  { dot: "", text: "Replying in your voice" },
  { dot: "r", text: "Approval requested" },
  { dot: "g", text: "Saved $247 / month" },
  { dot: "a", text: "Chasing the Delta refund" },
  { dot: "", text: "Handle it" },
];

const dotColor: Record<string, string> = {
  a: "hsl(var(--ember))",
  g: "hsl(var(--accent))",
  r: "hsl(var(--ember))",
  "": "hsl(var(--fg-3))",
};

export default function Marquee() {
  const row = items.concat(items);
  return (
    <section
      aria-hidden
      className="relative bg-bg overflow-hidden"
      style={{
        borderTop: "1px solid hsl(var(--rule))",
        borderBottom: "1px solid hsl(var(--rule))",
      }}
    >
      <div
        className="inline-flex whitespace-nowrap animate-marq"
        style={{ gap: 56, padding: "20px 0", willChange: "transform" }}
      >
        {row.map((it, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-[14px] f-mono text-[0.72rem] font-medium tracking-[0.18em] uppercase"
          >
            <i
              className="inline-block w-[7px] h-[7px] rounded-full shrink-0"
              style={{ background: dotColor[it.dot] }}
            />
            <span className="text-fg-2">{it.text}</span>
            <span className="text-fg-4">—</span>
          </span>
        ))}
      </div>
      {/* Edge fades */}
      <div
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-[14%] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--bg)) 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute right-0 top-0 bottom-0 w-[14%] pointer-events-none"
        style={{
          background:
            "linear-gradient(270deg, hsl(var(--bg)) 0%, transparent 100%)",
        }}
      />
    </section>
  );
}
