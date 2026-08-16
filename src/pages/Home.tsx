import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../sections/Hero";
import { Intro } from "../sections/Intro";
import { Services } from "../sections/Services";
import { SelectedWork } from "../sections/SelectedWork";
import { Process } from "../sections/Process";
import { About } from "../sections/About";
import { Capabilities } from "../sections/Capabilities";
import { SystemVisualization } from "../sections/SystemVisualization";
import { Testimonials } from "../sections/Testimonials";
import { Insights } from "../sections/Insights";
import { FinalCTA } from "../sections/FinalCTA";

export function Home() {
  return (
    <>
      <Navbar variant="home" />
      <main id="main-content">
        <Hero />
        <Intro />
        <Services />
        <SelectedWork />
        <Process />
        <About />
        <Capabilities />
        <SystemVisualization />
        <Testimonials />
        <Insights />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
