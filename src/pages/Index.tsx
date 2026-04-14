import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import Pillars from "@/components/landing/Pillars";
import BigScroll from "@/components/landing/BigScroll";
import Marquee from "@/components/landing/Marquee";
import Demo from "@/components/landing/Demo";
import UseCases from "@/components/landing/UseCases";
import Trust from "@/components/landing/Trust";
import Thesis from "@/components/landing/Thesis";
import Waitlist from "@/components/landing/Waitlist";
import Footer from "@/components/landing/Footer";
import GrainOverlay from "@/components/landing/GrainOverlay";
import IntroReveal from "@/components/landing/IntroReveal";

const Index = () => {
  return (
    <div className="relative bg-background text-foreground">
      <IntroReveal />
      <GrainOverlay />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Problem />
        <Pillars />
        <BigScroll />
        <Demo />
        <UseCases />
        <Trust />
        <Thesis />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
