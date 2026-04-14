import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/InstrumentSerif";

const { fontFamily } = loadFont();

const WORD = "twinly";

// Timing (24fps, 192 frame source)
// 0-70    video plays, sphere intact, explosion begins
// 70-96   twin spheres forming — word builds letter by letter
// 96-144  held at full
// 144-180 drifts up a touch, label fades in underneath
// 180-192 gentle fade out

export const HeroReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const letters = WORD.split("");

  // Overall container reveal
  const containerOpacity = interpolate(
    frame,
    [68, 82, 176, 190],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Slight upward drift after the big hold
  const containerY = interpolate(
    frame,
    [68, 96, 144, 190],
    [28, 0, 0, -18],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Ember → lime color lerp as the twins stabilize
  const colorMix = interpolate(frame, [80, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const color = `hsl(${interpolate(colorMix, [0, 1], [30, 72])}, ${interpolate(
    colorMix,
    [0, 1],
    [95, 100]
  )}%, ${interpolate(colorMix, [0, 1], [64, 58])}%)`;

  // Kicker label (mono tag under the wordmark)
  const kickerOpacity = interpolate(frame, [120, 140, 176, 190], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const kickerY = interpolate(frame, [120, 140], [8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Vignette glow that blooms when the twins connect
  const glowOpacity = interpolate(
    frame,
    [72, 110, 150, 190],
    [0, 0.7, 0.55, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#05060a" }}>
      {/* The Veo-generated source video */}
      <OffthreadVideo src={staticFile("source.mp4")} />

      {/* Radial bloom that amplifies the twin-birth moment */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 52%, hsl(72 100% 58% / ${
            glowOpacity * 0.35
          }) 0%, transparent 55%)`,
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />

      {/* Centered wordmark — appears when twins are born */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: containerOpacity,
          transform: `translateY(${containerY}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            gap: "0.02em",
          }}
        >
          {letters.map((char, i) => {
            // Each letter rises on its own spring, staggered
            const letterDelay = 72 + i * 3;
            const y = spring({
              frame: frame - letterDelay,
              fps,
              config: { damping: 20, stiffness: 90, mass: 0.6 },
              from: 80,
              to: 0,
            });
            const blur = interpolate(
              frame - letterDelay,
              [0, 14],
              [18, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const opacity = interpolate(
              frame - letterDelay,
              [0, 10],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  fontFamily,
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 232,
                  lineHeight: 0.88,
                  letterSpacing: "-0.04em",
                  color,
                  transform: `translateY(${y}px)`,
                  filter: `blur(${blur}px) drop-shadow(0 20px 50px hsl(72 100% 58% / 0.35))`,
                  opacity,
                  willChange: "transform",
                }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Kicker tagline under the wordmark */}
        <div
          style={{
            marginTop: 30,
            opacity: kickerOpacity,
            transform: `translateY(${kickerY}px)`,
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <span
            style={{
              width: 44,
              height: 1,
              background: "hsl(72 100% 58%)",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 17,
              fontWeight: 500,
              letterSpacing: "0.32em",
              color: "hsl(44 35% 96%)",
              textTransform: "uppercase",
            }}
          >
            Meet your twin
          </span>
          <span
            style={{
              width: 44,
              height: 1,
              background: "hsl(72 100% 58%)",
              display: "inline-block",
            }}
          />
        </div>
      </AbsoluteFill>

      {/* Subtle grain overlay for that film feel */}
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(circle at 30% 30%, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.35) 90%)",
          mixBlendMode: "multiply",
        }}
      />
    </AbsoluteFill>
  );
};
