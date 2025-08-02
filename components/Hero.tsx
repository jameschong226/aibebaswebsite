
import React from 'react';

interface HeroProps {
  onPrimaryClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPrimaryClick }) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0 bg-grid-slate-800/40 [mask-image:linear-gradient(to_bottom,white_5%,transparent_100%)]"></div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.15)_0%,_rgba(99,102,241,0)_50%)]"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400 mb-6 animate-fade-in-down">
          Automate Your Business. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Amplify Your Growth.</span>
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-400 mb-10 animate-fade-in-up">
          We build custom AI solutions that streamline your operations, eliminate repetitive tasks, and unlock new levels of efficiency, so you can focus on what truly matters.
        </p>
        <div className="flex justify-center space-x-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <button onClick={onPrimaryClick} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-indigo-600/30 transition-all duration-300 transform hover:scale-105">
            See It In Action
          </button>
          <button className="bg-slate-700/50 hover:bg-slate-700 text-slate-200 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};
