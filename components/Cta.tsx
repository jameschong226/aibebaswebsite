
import React from 'react';

interface CtaProps {
  onPrimaryClick: () => void;
}

export const Cta: React.FC<CtaProps> = ({ onPrimaryClick }) => {
    return (
        <section id="contact" className="py-20 sm:py-24 bg-slate-900">
            <div className="container mx-auto px-6">
                <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl shadow-indigo-600/30 overflow-hidden p-10 md:p-16">
                    <div className="absolute top-0 left-0 w-full h-full bg-black/20 opacity-30"></div>
                     <div className="relative z-10 text-center">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white">Ready to Transform Your Business?</h2>
                        <p className="mt-4 text-lg max-w-2xl mx-auto text-indigo-200">
                            Let's talk about how our custom AI solutions can solve your unique challenges and drive growth. Schedule a free, no-obligation consultation with our experts today.
                        </p>
                        <div className="mt-8">
                            <button onClick={onPrimaryClick} className="bg-white hover:bg-slate-200 text-indigo-600 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
                                Schedule a Free Consultation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
