import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Experience from "./sections/Experience";
import Academic from "./sections/Academic"; // <-- SUBSTITUI O FEATURED
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Activities from "./sections/Activities";
import Footer from "./sections/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen bg-zinc-950 font-sans selection:bg-blue-500/30 overflow-x-hidden text-zinc-100">
      
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/15 via-zinc-950 to-zinc-950 pointer-events-none" />
      
      <div className="relative z-10">
        <Navbar />
        <main id="hero">
          <Hero />
          <Experience />
          <Academic />  
          <Projects />
          <Activities />
        </main>
        <Footer />
      </div>

    </div>
  );
}