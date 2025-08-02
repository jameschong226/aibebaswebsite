
import React, { useState, useCallback } from 'react';
import { generateAutomationWorkflow } from '../services/geminiService';
import type { WorkflowStep } from '../types';
import { WorkflowIcon } from '../types';

const IconMap: Record<WorkflowIcon, React.ReactNode> = {
    [WorkflowIcon.INPUT]: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    [WorkflowIcon.PROCESS]: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    [WorkflowIcon.DECISION]: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    [WorkflowIcon.OUTPUT]: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>,
    [WorkflowIcon.HUMAN]: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    [WorkflowIcon.DATABASE]: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4M4 7s0 0 0 0" /><path d="M12 11c4.418 0 8-1.79 8-4" /></svg>,
    [WorkflowIcon.API]: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
};

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center space-x-2">
    <div className="w-4 h-4 rounded-full bg-indigo-400 animate-pulse"></div>
    <div className="w-4 h-4 rounded-full bg-indigo-400 animate-pulse" style={{animationDelay: '0.2s'}}></div>
    <div className="w-4 h-4 rounded-full bg-indigo-400 animate-pulse" style={{animationDelay: '0.4s'}}></div>
    <p className="text-slate-300">AI is thinking...</p>
  </div>
);

const WorkflowResult: React.FC<{ steps: WorkflowStep[] }> = ({ steps }) => (
    <div className="mt-8 space-y-4">
        {steps.map((step, index) => (
            <div key={index} className="relative pl-14 group">
                <div className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 border border-slate-600 text-indigo-400 group-hover:bg-indigo-600/20 group-hover:border-indigo-500/50 transition-all duration-300">
                    {IconMap[step.icon] || IconMap[WorkflowIcon.PROCESS]}
                </div>
                {index < steps.length - 1 && <div className="absolute left-5 top-12 h-full w-px bg-slate-700"></div>}
                <h4 className="font-bold text-slate-100">{step.title}</h4>
                <p className="text-slate-400">{step.description}</p>
            </div>
        ))}
    </div>
);


export const InteractiveDemo: React.FC = () => {
    const [task, setTask] = useState('');
    const [workflow, setWorkflow] = useState<WorkflowStep[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = useCallback(async (event: React.FormEvent) => {
        event.preventDefault();
        if (!task.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);
        setWorkflow(null);
        
        try {
            const result = await generateAutomationWorkflow(task);
            setWorkflow(result);
        } catch (e: any) {
            setError(e.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [task, isLoading]);
    
    const setExample = (exampleTask: string) => {
        setTask(exampleTask);
        setWorkflow(null);
        setError(null);
    }

    return (
        <section id="demo" className="py-20 sm:py-32 relative overflow-hidden bg-slate-900">
             <div className="absolute -top-48 -right-48 w-96 h-96 bg-[radial-gradient(circle_at_center,_rgba(129,140,248,0.1)_0%,_rgba(129,140,248,0)_60%)]"></div>
             <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.1)_0%,_rgba(99,102,241,0)_60%)]"></div>

            <div className="container mx-auto px-6 relative">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white">Experience the Future of Automation</h2>
                    <p className="mt-4 text-lg text-slate-400">Describe a repetitive business task, and our AI will instantly design a high-level automation workflow for you.</p>
                </div>

                <div className="max-w-3xl mx-auto bg-slate-800/50 rounded-2xl border border-slate-700 p-8 shadow-2xl backdrop-blur-sm">
                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            placeholder="e.g., 'Summarize daily customer feedback emails and post key themes to Slack'"
                            className="w-full h-24 p-4 bg-slate-900/70 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors"
                            disabled={isLoading}
                        />
                         <div className="mt-2 text-sm text-slate-400 space-x-2">
                             <span>Try an example:</span>
                             <button type="button" onClick={() => setExample('Generate weekly sales reports from Salesforce data')} className="hover:text-indigo-400 underline">Sales Reports</button>
                             <button type="button" onClick={() => setExample('Onboard new employees by creating accounts in multiple systems')} className="hover:text-indigo-400 underline">HR Onboarding</button>
                         </div>
                        <button
                            type="submit"
                            className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-indigo-600/30 transition-all duration-300 transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed"
                            disabled={isLoading || !task.trim()}
                        >
                            {isLoading ? 'Generating...' : 'Generate Workflow'}
                        </button>
                    </form>
                    
                    <div className="mt-6 min-h-[16rem] flex flex-col justify-center">
                        {isLoading && <LoadingSpinner />}
                        {error && <div className="text-center text-red-400 bg-red-900/30 p-4 rounded-lg">{error}</div>}
                        {workflow && <WorkflowResult steps={workflow} />}
                        {!isLoading && !error && !workflow && (
                            <div className="text-center text-slate-500">
                                <p>Your generated workflow will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
