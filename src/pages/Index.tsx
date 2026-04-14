import ScrollVideo from "@/components/ScrollVideo";
import ScrollFloat from "@/components/ScrollFloat";
import GlassPanel from "@/components/GlassPanel";
import PillNav from "@/components/PillNav";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_143803_f635b644-d959-4f16-9d29-cedaeb5c6de0.mp4";

const Index = () => {
  return (
    <div className="bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <ScrollVideo src={VIDEO_SRC} />
      <PillNav />

      <div className="relative h-[500vh]">
        <ScrollFloat>{"Your Digital\nTwin Awaits"}</ScrollFloat>
        <GlassPanel />
      </div>
    </div>
  );
};

export default Index;
