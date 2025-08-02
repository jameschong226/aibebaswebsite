import React, { useState, useEffect } from 'react';

interface HeaderProps {
    onNavigate: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { id: 'features', label: 'Features' },
        { id: 'how-it-works', label: 'How It Works' },
        { id: 'demo', label: 'Demo' },
        { id: 'testimonials', label: 'Testimonials' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => onNavigate('hero')}
                    aria-label="Bebas AI"
                >
                    <span className="bg-blue-600 text-white text-xl font-bold px-3 py-1 rounded-lg">Bebas</span>
                    <span className="text-white text-xl font-bold ml-2">AI</span>
                </div>
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map(link => (
                         <button key={link.id} onClick={() => onNavigate(link.id)} className="text-slate-300 hover:text-indigo-400 transition-colors duration-300">
                           {link.label}
                        </button>
                    ))}
                </nav>
                <button onClick={() => onNavigate('contact')} className="hidden md:block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
                    Contact Us
                </button>
            </div>
        </header>
    );
};