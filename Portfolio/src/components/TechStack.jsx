import React, { useState } from 'react';
import { Cpu, CheckCircle2, Layers, Sparkles } from 'lucide-react';

export default function TechStack() {
  const [activeFilter, setActiveFilter] = useState('all');

  const skills = [
    {
      name: 'HTML5',
      category: 'frontend',
      percent: 95,
      level: 'Mastery',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
      desc: 'Semantic architecture, accessibility (WCAG), SEO metadata optimization',
    },
    {
      name: 'CSS3 / Modern Styling',
      category: 'frontend',
      percent: 95,
      level: 'Mastery',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
      desc: 'Grid, Flexbox, keyframe animations, responsive media queries',
    },
    {
      name: 'JavaScript (ES6+)',
      category: 'frontend',
      percent: 92,
      level: 'Advanced',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
      desc: 'Asynchronous flows, Promises, closures, DOM manipulation, APIs',
    },
    {
      name: 'Tailwind CSS',
      category: 'frontend',
      percent: 95,
      level: 'Mastery',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
      desc: 'Utility-first styling, JIT compilation, custom theming, dark mode',
    },
    {
      name: 'React.js',
      category: 'frontend',
      percent: 85,
      level: 'Advanced',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
      desc: 'Hooks, state management, component lifecycles, Vite SPA bundling',
    },
    {
      name: 'Python',
      category: 'languages',
      percent: 90,
      level: 'Advanced',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
      desc: 'Data structures, algorithm design, script automation, backend APIs',
    },
    {
      name: 'Node.js',
      category: 'backend',
      percent: 78,
      level: 'Proficient',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
      desc: 'Express.js, RESTful microservices, authentication, middleware',
    },
    {
      name: 'MongoDB',
      category: 'backend',
      percent: 72,
      level: 'Proficient',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
      desc: 'NoSQL schema design, aggregation pipelines, Mongoose ODM',
    },
    {
      name: 'Java',
      category: 'languages',
      percent: 65,
      level: 'Intermediate',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
      desc: 'OOP concepts, type safety, data modeling, concurrency basics',
    },
    {
      name: 'Git & GitHub',
      category: 'tools',
      percent: 88,
      level: 'Advanced',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
      desc: 'Branching strategies, merge conflict resolution, pull request review',
    },
  ];

  const filterTabs = [
    { id: 'all', label: 'All Technologies' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend & DB' },
    { id: 'languages', label: 'Languages' },
    { id: 'tools', label: 'DevOps & Tools' },
  ];

  const filteredSkills =
    activeFilter === 'all'
      ? skills
      : skills.filter((skill) => skill.category === activeFilter);

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden border-t border-zinc-900/60">
      {/* Ambient background illumination */}
      <div className="absolute top-1/3 right-0 w-[550px] h-[550px] bg-yellow-500/10 blur-[170px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-xs rounded-full uppercase tracking-widest mb-4">
              <Cpu className="w-3.5 h-3.5" />
              <span>Skill Matrix</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tighter">
              Technical{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-amber-600">
                Proficiency
              </span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full mt-4 shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  activeFilter === tab.id
                    ? 'bg-amber-400 text-black font-bold shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="group p-6 rounded-[2rem] bg-zinc-950/60 border border-zinc-800/80 hover:border-amber-400/50 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 shadow-xl relative overflow-hidden"
            >
              {/* Subtle top edge gradient highlight */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500/0 via-amber-400/0 to-amber-500/0 group-hover:from-amber-500/80 group-hover:via-amber-400 group-hover:to-amber-500/80 transition-all duration-500" />

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 p-2.5 flex items-center justify-center group-hover:border-amber-400/50 group-hover:shadow-[0_0_15px_rgba(251,191,36,0.25)] transition-all">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                      {skill.level}
                    </span>
                  </div>
                </div>

                <span className="text-2xl font-black text-amber-400 tracking-tight font-mono">
                  {skill.percent}%
                </span>
              </div>

              <p className="text-xs text-zinc-400 mb-4 font-light leading-relaxed">
                {skill.desc}
              </p>

              {/* Linear Gradient Progress Bar */}
              <div className="w-full bg-zinc-900 border border-zinc-800/80 h-3 rounded-full overflow-hidden p-[1px]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-amber-400 to-amber-600 shadow-[0_0_12px_rgba(251,191,36,0.5)] transition-all duration-1000 ease-out"
                  style={{ width: `${skill.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
