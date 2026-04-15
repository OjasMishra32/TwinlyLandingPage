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

// Site background (warm obsidian) — video blends into this at every edge
const SITE_BG = "#0e0d0a";

// Timing (24fps, 192 frame source)
// 0-70    video plays, sphere intact, explosion begins
// 70-96   twin spheres forming — word builds letter by letter
// 96-144  held at full
// 144-180 drifts up a touch, label fades in underneath
// 180-192 gentle fade out
export const HeroReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const letters = WORD.split("");

  const containerOpacity = interpolate(
    frame,
    [68, 82, 176, 190],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const containerY = interpolate(
    frame,
    [68, 96, 144, 190],
    [84, 0, 0, -54],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const colorMix = interpolate(frame, [80, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const color = `hsl(${interpolate(colorMix, [0, 1], [28, 72])}, ${interpolate(
    colorMix,
    [0, 1],
    [85, 78]
  )}%, ${interpolate(colorMix, [0, 1], [64, 62])}%)`;

  const kickerOpacity = interpolate(frame, [120, 140, 176, 190], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const kickerY = interpolate(frame, [120, 140], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowOpacity = interpolate(
    frame,
    [72, 110, 150, 190],
    [0, 0.55, 0.4, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: SITE_BG }}>
      {/* The Veo-generated source video, lanczos-upscaled to 3840×2160
          with a subtle unsharp mask. The source footage is still 720p
          underneath, but every Remotion-drawn element (wordmark, vignette,
          gradients) renders natively at 4K on top. */}
      <OffthreadVideo src={staticFile("source-4k.mp4")} />

      {/* Warm color grade — pulls the video's cold blue-black toward the
          site's warm obsidian. Multiply blend darkens + warms */}
      <AbsoluteFill
        style={{
          background: "rgb(40, 28, 14)",
          mixBlendMode: "multiply",
          opacity: 0.35,
          pointerEvents: "none",
        }}
      />

      {/* Warm highlight on screen blend — adds amber glow to the bright areas */}
      <AbsoluteFill
        style={{
          background: "rgb(30, 22, 10)",
          mixBlendMode: "screen",
          opacity: 0.12,
          pointerEvents: "none",
        }}
      />

      {/* Strong edge vignette — fades every edge to the exact site bg
          so the video can sit edge-to-edge without a hard border */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 72% 72% at 50% 48%, transparent 22%, ${SITE_BG}cc 78%, ${SITE_BG} 100%)`,
          pointerEvents: "none",
        }}
      />

      {/* Bottom gradient cover — specifically obliterates the Veo watermark
          which lives in the bottom portion of the frame */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, transparent 0%, transparent 78%, ${SITE_BG}b3 90%, ${SITE_BG} 100%)`,
          pointerEvents: "none",
        }}
      />

      {/* Left gradient cover — for the other common Veo watermark position */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(90deg, ${SITE_BG} 0%, ${SITE_BG}80 4%, transparent 10%)`,
          pointerEvents: "none",
        }}
      />

      {/* Right gradient cover — same for symmetry */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(270deg, ${SITE_BG} 0%, ${SITE_BG}80 4%, transparent 10%)`,
          pointerEvents: "none",
        }}
      />

      {/* Top gradient cover — matches */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(0deg, transparent 0%, transparent 88%, ${SITE_BG}80 96%, ${SITE_BG} 100%)`,
          pointerEvents: "none",
        }}
      />

      {/* Radial bloom that amplifies the twin-birth moment — warmer now */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 52%, hsl(72 80% 58% / ${
            glowOpacity * 0.28
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
            const letterDelay = 72 + i * 3;
            const y = spring({
              frame: frame - letterDelay,
              fps,
              config: { damping: 20, stiffness: 90, mass: 0.6 },
              from: 240,
              to: 0,
            });
            const blur = interpolate(
              frame - letterDelay,
              [0, 14],
              [42, 0],
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
                  fontSize: 696,
                  lineHeight: 0.88,
                  letterSpacing: "-0.04em",
                  color,
                  transform: `translateY(${y}px)`,
                  filter: `blur(${blur}px) drop-shadow(0 60px 150px hsl(72 80% 58% / 0.28))`,
                  opacity,
                  willChange: "transform",
                }}
              >
                {char}
              </span>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 90,
            opacity: kickerOpacity,
            transform: `translateY(${kickerY}px)`,
            display: "flex",
            alignItems: "center",
            gap: 54,
          }}
        >
          <span
            style={{
              width: 132,
              height: 3,
              background: "hsl(72 78% 62%)",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 51,
              fontWeight: 500,
              letterSpacing: "0.32em",
              color: "hsl(44 28% 94%)",
              textTransform: "uppercase",
            }}
          >
            Meet your twin
          </span>
          <span
            style={{
              width: 132,
              height: 3,
              background: "hsl(72 78% 62%)",
              display: "inline-block",
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
