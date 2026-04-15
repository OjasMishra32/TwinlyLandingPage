import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import Marquee from "@/components/landing/Marquee";
import Problem from "@/components/landing/Problem";
import UseCases from "@/components/landing/UseCases";
import TwinEdge from "@/components/landing/TwinEdge";
import TwinReveal from "@/components/landing/TwinReveal";
import Trust from "@/components/landing/Trust";
import Waitlist from "@/components/landing/Waitlist";
import Footer from "@/components/landing/Footer";
import GrainOverlay from "@/components/landing/GrainOverlay";
import AmbientMesh from "@/components/landing/AmbientMesh";
import Loader from "@/components/landing/Loader";
import Reticle from "@/components/landing/Reticle";
import TimelineBadge from "@/components/landing/TimelineBadge";

const Index = () => {
  return (
    <div className="relative bg-bg text-fg min-h-screen">
      <Loader />
      <Reticle />
      <AmbientMesh />
      <GrainOverlay />
      <TimelineBadge />
      <Nav />
      <main className="relative z-[2]">
        <Hero />
        <Marquee />
        <TwinReveal />
        <Problem />
        <UseCases />
        <TwinEdge />
        <Trust />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
