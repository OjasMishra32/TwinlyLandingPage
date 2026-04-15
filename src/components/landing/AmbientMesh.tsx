/**
 * AmbientMesh — 3 slowly drifting warm radial gradient orbs that sit
 * behind the whole page and fill the black space with atmosphere.
 * Pure CSS, GPU-accelerated, zero JS runtime cost.
 */
export default function AmbientMesh() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ opacity: 0.55 }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 44% 34% at 18% 22%, hsl(74 74% 62% / 0.09) 0%, transparent 62%)",
          animation: "mesh-drift-a 28s ease-in-out infinite alternate",
          willChange: "transform",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 56% 40% at 84% 72%, hsl(22 86% 58% / 0.07) 0%, transparent 60%)",
          animation: "mesh-drift-b 36s ease-in-out infinite alternate",
          willChange: "transform",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 30% at 62% 34%, hsl(44 60% 82% / 0.035) 0%, transparent 55%)",
          animation: "mesh-drift-c 44s ease-in-out infinite alternate",
          willChange: "transform",
        }}
      />
      <style>{`
        @keyframes mesh-drift-a {
          0%   { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(6%, 4%, 0) scale(1.12); }
        }
        @keyframes mesh-drift-b {
          0%   { transform: translate3d(0, 0, 0) scale(1.05); }
          100% { transform: translate3d(-5%, -3%, 0) scale(0.94); }
        }
        @keyframes mesh-drift-c {
          0%   { transform: translate3d(0, 0, 0) scale(0.98); }
          100% { transform: translate3d(3%, -5%, 0) scale(1.08); }
        }
      `}</style>
    </div>
  );
}
