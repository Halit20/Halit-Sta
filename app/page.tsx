import { BackgroundScene } from "@/components/BackgroundScene";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { IdentityReveal } from "@/components/sections/IdentityReveal";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Creative } from "@/components/sections/Creative";
import { SocialMedia } from "@/components/sections/SocialMedia";
import { DyshjaNatyre } from "@/components/sections/DyshjaNatyre";
import { CreatorRoots } from "@/components/sections/CreatorRoots";
import { Vision } from "@/components/sections/Vision";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-ink-950 text-mist-300">
      {/* Animated digital atmosphere — fixed, full-screen, behind everything */}
      <BackgroundScene />

      {/* All content sits above the background */}
      <div className="relative z-10">
        <ScrollProgress />
        <Header />
        <main>
          <Hero />
          <IdentityReveal />
          <ProofStrip />
          <Services />
          <Projects />
          <Process />
          <About />
          <Experience />
          <Skills />
          <Education />
          <Creative />
          <SocialMedia />
          <DyshjaNatyre />
          <CreatorRoots />
          <Vision />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
