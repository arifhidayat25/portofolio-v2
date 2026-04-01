import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    fetch("http://localhost:3001/profile")
      .then(res => res.json())
      .then(data => {
        if (data?.name) {
          document.title = `Portofolio | ${data.name}`;
        }
      })
      .catch(error => console.error("Error fetching profile for title:", error));
  }, []);

  return (
    <div className="size-full">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
