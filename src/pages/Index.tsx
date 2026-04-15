import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import SlideVoice from "@/components/landing/SlideVoice";
import SlideParallel from "@/components/landing/SlideParallel";
import SlideApproval from "@/components/landing/SlideApproval";
import SlideCode from "@/components/landing/SlideCode";
import SlideHomework from "@/components/landing/SlideHomework";
import SlideTax from "@/components/landing/SlideTax";
import SlideTrip from "@/components/landing/SlideTrip";
import SlideNumbers from "@/components/landing/SlideNumbers";
import Waitlist from "@/components/landing/Waitlist";
import Footer from "@/components/landing/Footer";
import GrainOverlay from "@/components/landing/GrainOverlay";
import AmbientMesh from "@/components/landing/AmbientMesh";
import Loader from "@/components/landing/Loader";
import Reticle from "@/components/landing/Reticle";

const Index = () => {
  return (
    <div className="relative bg-bg text-fg min-h-screen">
      <Loader />
      <Reticle />
      <AmbientMesh />
      <GrainOverlay />
      <Nav />
      <main className="relative z-[2]">
        <Hero />
        <SlideVoice />
        <SlideParallel />
        <SlideApproval />
        <SlideCode />
        <SlideHomework />
        <SlideTax />
        <SlideTrip />
        <SlideNumbers />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
