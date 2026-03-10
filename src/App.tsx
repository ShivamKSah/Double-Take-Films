import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { FeaturedWork } from "./components/FeaturedWork";
import { HighlightReel } from "./components/HighlightReel";
import { About } from "./components/About";
import { Portfolio } from "./components/Portfolio";
import { Services } from "./components/Services";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-brand-black text-brand-white selection:bg-white selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <About />
        <FeaturedWork />
        <HighlightReel />
        <Portfolio />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
