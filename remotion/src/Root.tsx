import { Composition } from "remotion";
import { HeroReveal } from "./HeroReveal";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="HeroReveal"
        component={HeroReveal}
        durationInFrames={192}
        fps={24}
        width={1280}
        height={720}
      />
    </>
  );
};
