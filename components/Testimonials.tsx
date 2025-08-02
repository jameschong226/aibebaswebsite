
import React from 'react';

interface TestimonialCardProps {
    quote: string;
    name: string;
    title: string;
    imgSrc: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, title, imgSrc }) => (
    <div className="bg-slate-800 p-8 rounded-xl border border-slate-700/50 h-full flex flex-col">
        <div className="flex-grow mb-6">
            <p className="text-slate-300 before:content-['“'] before:mr-1 before:text-4xl before:text-indigo-500 before:font-serif before:leading-none after:content-['”'] after:ml-1 after:text-4xl after:text-indigo-500 after:font-serif after:leading-none">
                {quote}
            </p>
        </div>
        <div className="flex items-center">
            <img className="w-12 h-12 rounded-full mr-4 object-cover" src={imgSrc} alt={name} />
            <div>
                <p className="font-bold text-white">{name}</p>
                <p className="text-sm text-slate-400">{title}</p>
            </div>
        </div>
    </div>
);

const testimonialData = [
    {
        quote: "The AI automation solution they built for us cut our data processing time by 90%. It's been a complete game-changer for our operations team.",
        name: 'Sarah Johnson',
        title: 'COO, DataDriven Inc.',
        imgSrc: 'https://picsum.photos/id/1027/100/100'
    },
    {
        quote: "We were struggling with scaling our customer support. Their AI chatbot now handles 75% of incoming queries, freeing up our agents for complex issues.",
        name: 'Michael Chen',
        title: 'Head of Support, ConnectSphere',
        imgSrc: 'https://picsum.photos/id/1005/100/100'
    },
    {
        quote: "The workflow automation they implemented has eliminated countless hours of manual work and reduced human error significantly. Our investment paid for itself in months.",
        name: 'Emily Rodriguez',
        title: 'CEO, Growthify Solutions',
        imgSrc: 'https://picsum.photos/id/1011/100/100'
    }
];

export const Testimonials: React.FC = () => {
    return (
        <section id="testimonials" className="py-20 sm:py-32 bg-slate-900/70">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white">Trusted by Industry Leaders</h2>
                    <p className="mt-4 text-lg text-slate-400">See what our clients are saying about the transformative impact of our AI solutions.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonialData.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};
