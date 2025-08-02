import React from 'react';

interface FooterProps {
    onNavigate: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    const navLinks = [
        { id: 'features', label: 'Features' },
        { id: 'how-it-works', label: 'How It Works' },
        { id: 'demo', label: 'Demo' },
        { id: 'testimonials', label: 'Testimonials' },
        { id: 'contact', label: 'Contact' },
    ];
    return (
        <footer className="bg-slate-800 border-t border-slate-700">
            <div className="container mx-auto px-6 py-12">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                         <div 
                            className="flex items-center cursor-pointer" 
                            onClick={() => onNavigate('hero')} 
                            aria-label="Bebas AI"
                        >
                            <span className="bg-blue-600 text-white text-xl font-bold px-3 py-1 rounded-lg">Bebas</span>
                            <span className="text-white text-xl font-bold ml-2">AI</span>
                        </div>
                         <p className="mt-2 text-slate-400 max-w-xs">AI-powered automation for forward-thinking businesses.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-slate-300 uppercase">Quick Links</h2>
                            <ul className="text-slate-400">
                                {navLinks.slice(0, 3).map(link => (
                                     <li key={link.id} className="mb-4">
                                        <button onClick={() => onNavigate(link.id)} className="hover:text-indigo-400 transition-colors">{link.label}</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         <div>
                            <h2 className="mb-6 text-sm font-semibold text-slate-300 uppercase">Company</h2>
                            <ul className="text-slate-400">
                                <li className="mb-4"><a href="#" className="hover:text-indigo-400 transition-colors">About Us</a></li>
                                <li className="mb-4"><a href="#" className="hover:text-indigo-400 transition-colors">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-slate-300 uppercase">Legal</h2>
                            <ul className="text-slate-400">
                                <li className="mb-4"><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                 <hr className="my-6 border-slate-700 sm:mx-auto lg:my-8" />
                <div className="text-center text-slate-500">
                    © {new Date().getFullYear()} Bebas AI. All rights reserved.
                </div>
            </div>
        </footer>
    );
};