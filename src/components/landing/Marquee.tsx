const words = [
  "reply in your voice",
  "reschedule Thursday",
  "follow up with the vendor",
  "compare flights for May",
  "return the order",
  "draft the email",
  "organize my morning",
  "remind me on Monday",
  "find a window with Lena",
  "handle it",
];

export default function Marquee() {
  const row = words.concat(words);
  return (
    <section aria-hidden className="relative py-8 border-y border-white/5 bg-white/[0.01] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-background via-transparent to-background z-10" />
      <div className="flex gap-12 animate-marquee whitespace-nowrap will-change-transform">
        {row.map((w, i) => (
          <div key={i} className="flex items-center gap-12 text-[clamp(1.75rem,3.4vw,2.6rem)] font-semibold tracking-[-0.02em]">
            <span className="text-white/70">{w}</span>
            <span className="font-serif-accent text-twin-cyan/70">·</span>
          </div>
        ))}
      </div>
    </section>
  );
}
