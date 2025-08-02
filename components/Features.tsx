
import React from 'react';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50 transition-all duration-300 hover:border-indigo-500/50 hover:bg-slate-800 hover:-translate-y-1">
        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-600/20 text-indigo-400 mb-4 border border-indigo-500/30">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400">{description}</p>
    </div>
);

const featureData = [
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-6m-6 6V7m-3 6h3m3 0h3m-3 0h3m-6 0h3m6 0h3M4 7h16" /></svg>,
        title: 'Intelligent Data Processing',
        description: 'Automate data extraction, cleaning, and analysis from any source, turning raw information into actionable insights.'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h2m6-1a1 1 0 00-1-1H9a1 1 0 00-1 1v11a1 1 0 001 1h2l4 4V18h2a1 1 0 001-1V8z" /></svg>,
        title: 'Automated Customer Support',
        description: 'Deploy smart chatbots and AI agents that provide instant, 24/7 support, resolving queries and improving customer satisfaction.'
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
        title: 'Streamlined Workflows',
        description: 'Connect disparate apps and services to create seamless, automated workflows for everything from onboarding to reporting.'
    }
];


export const Features: React.FC = () => {
    return (
        <section id="features" className="py-20 sm:py-32 bg-slate-900">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white">Transform Every Facet of Your Business</h2>
                    <p className="mt-4 text-lg text-slate-400">Our AI solutions are designed to integrate seamlessly into your existing operations, bringing intelligent automation to where you need it most.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {featureData.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};
