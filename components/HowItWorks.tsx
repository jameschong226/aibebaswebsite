
import React from 'react';

interface StepProps {
    number: string;
    title: string;
    description: string;
    isLast?: boolean;
}

const HowItWorksStep: React.FC<StepProps> = ({ number, title, description, isLast = false }) => (
    <div className="relative flex items-start">
        <div className="flex flex-col items-center mr-6">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-2xl font-bold text-indigo-400">
                {number}
            </div>
            {!isLast && <div className="w-px h-24 bg-slate-700 mt-4"></div>}
        </div>
        <div className="pt-2">
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-slate-400">{description}</p>
        </div>
    </div>
);


export const HowItWorks: React.FC = () => {
    const steps = [
        {
            number: '01',
            title: 'Discovery & Analysis',
            description: 'We dive deep into your current processes to identify the best opportunities for automation and impact.'
        },
        {
            number: '02',
            title: 'Custom Solution Design',
            description: 'Our experts design a bespoke AI automation strategy and architecture tailored to your specific goals.'
        },
        {
            number: '03',
            title: 'Seamless Implementation',
            description: 'We handle the complete development and integration of the AI solution into your existing technology stack.'
        },
        {
            number: '04',
            title: 'Optimization & Support',
            description: 'Post-launch, we continuously monitor, optimize, and provide ongoing support to ensure peak performance.'
        }
    ];

    return (
        <section id="how-it-works" className="py-20 sm:py-32 bg-slate-900/70">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white">Our Path to Your Success</h2>
                    <p className="mt-4 text-lg text-slate-400">A clear, collaborative process designed for maximum impact and minimal disruption.</p>
                </div>
                <div className="max-w-2xl mx-auto">
                    {steps.map((step, index) => (
                        <HowItWorksStep
                            key={index}
                            number={step.number}
                            title={step.title}
                            description={step.description}
                            isLast={index === steps.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
