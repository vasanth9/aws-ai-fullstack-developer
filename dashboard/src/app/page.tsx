'use client';

import { useState, useMemo } from 'react';
import projectsDataRaw from './projects.json';

// --- Types ---
type Project = {
  id: number;
  title: string;
  tech: string[];
  status: string;
  summary: string;
  outcomes: string[];
  learningPoints: string[];
};

type Phase = {
  phase: string;
  projects: Project[];
};

type PlanKey = 'industrial' | 'productivity' | 'fintech' | 'ecommerce';

const projectsData = projectsDataRaw as Record<PlanKey, Phase[]>;

// --- Components ---

const ProgressBar = ({ progress, color }: { progress: number, color: string }) => (
  <div className="mt-4 w-full bg-slate-100 rounded-full h-2.5 overflow-hidden shadow-inner">
    <div 
      className={`h-full transition-all duration-1000 ease-out ${color}`}
      style={{ width: `${progress}%` }}
    />
  </div>
);

const StatCard = ({ title, value, subtext, active }: { title: string, value: string | number, subtext: string, active: boolean }) => (
  <div className={`bg-white p-6 rounded-3xl transition-all duration-500 border ${
    active ? 'border-slate-200 shadow-xl scale-[1.02]' : 'border-slate-100 shadow-sm opacity-80'
  }`}>
    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{title}</h3>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-black text-slate-900">{value}</span>
      <span className="text-slate-400 text-xs font-bold uppercase">{subtext}</span>
    </div>
  </div>
);

export default function Dashboard() {
  const [activePlan, setActivePlan] = useState<PlanKey>('industrial');
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const currentPhases = useMemo(() => projectsData[activePlan] || [], [activePlan]);

  const stats = useMemo(() => {
    const flat = currentPhases.flatMap(p => p.projects);
    const total = flat.length;
    const completed = flat.filter(pr => pr.status === 'Completed').length;
    const inProgress = flat.filter(pr => pr.status === 'In Progress').length;
    return {
      total,
      completed,
      inProgress,
      percent: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }, [currentPhases]);

  const planConfig = {
    industrial: { 
      label: 'Industrial AI', 
      icon: '🏭', 
      desc: 'Enterprise SaaS & Ops', 
      theme: 'bg-indigo-600', 
      text: 'text-indigo-600',
      border: 'border-indigo-100',
      light: 'bg-indigo-50',
      gradient: 'from-indigo-600 to-blue-600'
    },
    productivity: { 
      label: 'Productivity AI', 
      icon: '🧠', 
      desc: 'Cognitive Optimization', 
      theme: 'bg-emerald-600', 
      text: 'text-emerald-600',
      border: 'border-emerald-100',
      light: 'bg-emerald-50',
      gradient: 'from-emerald-600 to-teal-600'
    },
    fintech: { 
      label: 'Fintech AI', 
      icon: '📈', 
      desc: 'Quantitative Trading', 
      theme: 'bg-amber-600', 
      text: 'text-amber-600',
      border: 'border-amber-100',
      light: 'bg-amber-50',
      gradient: 'from-amber-600 to-orange-600'
    },
    ecommerce: { 
      label: 'E-commerce AI', 
      icon: '🛒', 
      desc: 'High-Scale Retail', 
      theme: 'bg-rose-600', 
      text: 'text-rose-600',
      border: 'border-rose-100',
      light: 'bg-rose-50',
      gradient: 'from-rose-600 to-pink-600'
    }
  };

  const currentTheme = planConfig[activePlan];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      
      {/* Premium Sticky Nav */}
      <nav className="sticky top-6 z-50 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-[2.5rem] p-2 flex items-center justify-between">
           <div className="flex items-center gap-4 px-4">
              <div className={`w-10 h-10 rounded-2xl ${currentTheme.theme} text-white flex items-center justify-center shadow-lg transform transition-transform duration-500 rotate-12`}>
                <span className="text-xl -rotate-12">{currentTheme.icon}</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter leading-none mb-1">Active Career Path</p>
                <p className="text-sm font-black text-slate-900 uppercase leading-none">{currentTheme.label}</p>
              </div>
           </div>
           
           <div className="flex bg-slate-100 p-1.5 rounded-[2rem] gap-1">
              {(Object.keys(planConfig) as PlanKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => { setActivePlan(key); setExpandedId(1); }}
                  className={`relative group flex items-center gap-2 px-5 py-2.5 rounded-[1.5rem] text-xs font-black transition-all duration-500 ${
                    activePlan === key 
                      ? 'bg-white text-slate-900 shadow-lg scale-105' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <span className="text-sm">{planConfig[key].icon}</span>
                  <span className="hidden lg:inline uppercase tracking-widest">{planConfig[key].label.split(' ')[0]}</span>
                  {activePlan === key && (
                    <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${planConfig[key].theme} animate-ping`} />
                  )}
                </button>
              ))}
           </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-24">
        
        {/* Dynamic Hero Section */}
        <header className="mb-20 text-center sm:text-left flex flex-col sm:flex-row items-end justify-between gap-12">
          <div className="flex-1">
            <h1 className="text-6xl font-[1000] tracking-tighter text-slate-900 leading-[0.9] uppercase mb-6">
              The AI <br/>
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.gradient}`}>
                {currentTheme.label.split(' ')[0]}
              </span> Masterclass
            </h1>
            <p className="text-xl text-slate-400 font-medium max-w-xl leading-relaxed">
              {currentTheme.desc} • {stats.total} Industrial-grade sprints spanning 120 days of deep AWS architecture.
            </p>
          </div>
          
          <div className="flex items-center gap-8 bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100 relative overflow-hidden group">
             <div className={`absolute inset-0 opacity-5 ${currentTheme.theme}`} />
             <div className="text-center relative z-10">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Milestones</p>
                <p className="text-4xl font-black text-slate-900">{stats.completed}</p>
             </div>
             <div className="h-12 w-px bg-slate-100 relative z-10" />
             <div className="text-center relative z-10">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Growth</p>
                <p className={`text-4xl font-black ${currentTheme.text}`}>{stats.percent}%</p>
             </div>
          </div>
        </header>

        {/* Roadmap Timeline */}
        <div className="space-y-32">
          {currentPhases.map((phase, phaseIdx) => (
            <section key={phaseIdx}>
              <div className="flex items-center gap-6 mb-12">
                <div className={`w-16 h-16 rounded-[2rem] ${currentTheme.theme} text-white flex items-center justify-center text-2xl font-black shadow-2xl shadow-slate-200`}>
                  {phaseIdx + 1}
                </div>
                <div>
                   <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{phase.phase}</h2>
                   <div className={`h-1.5 w-24 rounded-full mt-2 bg-gradient-to-r ${currentTheme.gradient}`} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {phase.projects.map((project) => (
                  <div 
                    key={project.id} 
                    className={`group bg-white rounded-[2.5rem] border-2 transition-all duration-500 overflow-hidden ${
                      expandedId === project.id 
                        ? `${currentTheme.border} shadow-2xl shadow-slate-200 translate-x-4` 
                        : 'border-slate-50 hover:border-slate-200 shadow-sm opacity-90'
                    }`}
                  >
                    <div 
                      className="p-10 cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-8"
                      onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${
                            project.id > 30 
                            ? `bg-slate-900 text-white border-slate-900` 
                            : `${currentTheme.light} ${currentTheme.text} ${currentTheme.border}`
                          }`}>
                            {project.id > 30 ? 'Elite Capstone' : 'Industrial Sprint'} {project.id}
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                            {project.status}
                          </span>
                        </div>
                        <h3 className={`text-3xl font-black leading-none transition-colors ${
                           expandedId === project.id ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'
                        }`}>
                          {project.title}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-2 lg:justify-end max-w-sm">
                        {project.tech.map((t, i) => (
                          <span key={i} className="text-[10px] font-black bg-slate-50 text-slate-500 px-4 py-1.5 rounded-full uppercase tracking-tighter border border-slate-100">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {expandedId === project.id && (
                      <div className="px-10 pb-12 pt-4 animate-in fade-in slide-in-from-left-4 duration-700">
                        <div className="h-px bg-slate-100 w-full mb-10" />
                        <p className="text-xl text-slate-500 leading-relaxed max-w-4xl font-medium mb-12">
                          {project.summary}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <div className={`${currentTheme.light} p-8 rounded-[2rem] border-2 ${currentTheme.border}`}>
                            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                              <span className={`w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-200`} />
                              Measurable Outcomes
                            </h4>
                            <ul className="space-y-5">
                              {project.outcomes.map((outcome, i) => (
                                <li key={i} className="flex items-start gap-4 text-slate-600 text-sm font-bold leading-tight">
                                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                  {outcome}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className={`${currentTheme.light} p-8 rounded-[2rem] border-2 ${currentTheme.border}`}>
                            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                              <span className={`w-3 h-3 rounded-full bg-amber-500 shadow-lg shadow-amber-200`} />
                              Architectural Growth
                            </h4>
                            <ul className="space-y-5">
                              {project.learningPoints.map((point, i) => (
                                <li key={i} className="flex items-start gap-4 text-slate-600 text-sm font-bold leading-tight">
                                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                  </svg>
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-12 flex justify-end">
                          <button className={`px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl hover:-translate-y-2 active:scale-95 ${
                            project.id > 30 ? 'bg-slate-900 text-white shadow-slate-300' : `${currentTheme.theme} text-white shadow-slate-200`
                          }`}>
                             Deploy System Architecture →
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-40 text-center opacity-30">
          <p className="text-[10px] font-black uppercase tracking-[1em] text-slate-900">
            AWS AI Fullstack Developer Command Center
          </p>
        </footer>
      </div>
    </div>
  );
}
