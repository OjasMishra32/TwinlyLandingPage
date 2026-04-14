export default function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] mix-blend-overlay opacity-[0.09]"
      style={{
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260' viewBox='0 0 260 260'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.6' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.95'/></svg>\")",
        backgroundSize: "260px 260px",
      }}
    />
  );
}
