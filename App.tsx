
import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { InteractiveDemo } from './components/InteractiveDemo';
import { Testimonials } from './components/Testimonials';
import { Cta } from './components/Cta';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="bg-slate-900 text-slate-200 font-sans leading-relaxed">
      <Header onNavigate={scrollTo} />
      <main>
        <Hero onPrimaryClick={() => scrollTo('demo')} />
        <Features />
        <HowItWorks />
        <InteractiveDemo />
        <Testimonials />
        <Cta onPrimaryClick={() => scrollTo('contact')} />
      </main>
      <Footer onNavigate={scrollTo} />
    </div>
  );
};

export default App;
