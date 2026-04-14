const items = [
  { dot: "a", text: "Reply in your voice" },
  { dot: "g", text: "Reschedule Thursday" },
  { dot: "", text: "Follow up with vendor" },
  { dot: "a", text: "Compare flights · May" },
  { dot: "g", text: "Return the order" },
  { dot: "", text: "Draft the email" },
  { dot: "r", text: "Approval requested" },
  { dot: "g", text: "Organize the morning" },
  { dot: "", text: "Handle it" },
];

const dotColor: Record<string, string> = {
  a: "hsl(var(--ember))",
  g: "hsl(var(--accent))",
  r: "hsl(var(--red))",
  "": "hsl(var(--fg-3))",
};

export default function Marquee() {
  const row = items.concat(items);
  return (
    <section
      aria-hidden
      className="relative bg-bg-2 text-fg overflow-hidden"
      style={{
        borderTop: "1px solid hsl(var(--rule))",
        borderBottom: "1px solid hsl(var(--rule))",
      }}
    >
      <div
        className="inline-flex whitespace-nowrap animate-marq"
        style={{ gap: 64, padding: "22px 0", willChange: "transform" }}
      >
        {row.map((it, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-[14px] f-mono text-[0.82rem] font-medium tracking-[0.04em] uppercase"
          >
            <i
              className="inline-block w-[8px] h-[8px] rounded-full shrink-0"
              style={{ background: dotColor[it.dot], boxShadow: `0 0 10px ${dotColor[it.dot]}` }}
            />
            <b className="text-fg font-medium">{it.text}</b>
            <span className="text-fg-4">—</span>
          </span>
        ))}
      </div>
    </section>
  );
}
