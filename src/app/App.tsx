import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useEffect } from 'react';
import db from '../data/db.json';

export default function App() {
  useEffect(() => {
    if (db.profile?.name) {
      document.title = `Portofolio | ${db.profile.name}`;
    }
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
