import React from 'react';
import { ExternalLink, Sparkles, FolderGit2, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons.jsx';

export default function Projects() {
  const projects = [
    {
      title: 'Full Stack Web Platform',
      category: 'Full Stack Engineering',
      desc: 'High-performance web applications built with a component-driven frontend and robust REST API services, implementing secure auth and NoSQL database management.',
      tags: ['React.js', 'Tailwind CSS', 'Node.js', 'MongoDB', 'REST APIs'],
      github: 'https://github.com/Ranjit2002/Web_Projects.git',
      demo: '#',
      featured: true,
      stats: '60 FPS / Lighthouse 98',
    },
    {
      title: 'Interactive UI Systems & Component Suite',
      category: 'UI / UX Engineering',
      desc: 'Precision micro-interactions, dark mode glassmorphism, responsive fluid grids, and accessible components crafted with zero external CSS overhead.',
      tags: ['React 19', 'Tailwind CSS v4', 'Vite', 'Lucide Icons'],
      github: 'https://github.com/Ranjit2002/Web_Projects.git',
      demo: '#',
      featured: true,
      stats: '100% Responsive',
    },
    {
      title: 'Algorithmic Logic & Automation Engine',
      category: 'Core Logic & Scripting',
      desc: 'Modular problem-solving routines and automation scripts designed in Python and modern JavaScript, solving data flow pipelines and state validations.',
      tags: ['Python', 'JavaScript', 'Data Structures', 'Git Automation'],
      github: 'https://github.com/Ranjit2002/Web_Projects.git',
      demo: '#',
      featured: false,
      stats: 'Optimized Time Complexity',
    },
    {
      title: 'Distributed Version Control Workspace',
      category: 'DevOps & Tooling',
      desc: 'Standardized multi-repository template featuring automated GitHub Actions, commit linting, branch protection rules, and continuous delivery configuration.',
      tags: ['Git', 'GitHub Actions', 'CI/CD Pipelines', 'Shell'],
      github: 'https://github.com/Ranjit2002/Web_Projects.git',
      demo: '#',
      featured: false,
      stats: 'Automated CI/CD',
    },
  ];

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden border-t border-zinc-900/60">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-500/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-xs rounded-full uppercase tracking-widest mb-4">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Featured Creations</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tighter">
              Highlighted{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-amber-600">
                Projects
              </span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full mt-4 shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
          </div>

          <a
            href="https://github.com/Ranjit2002/Web_Projects.git"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-mono text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-widest"
          >
            <span>View All on GitHub</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group relative rounded-[2.5rem] bg-zinc-950/70 border border-zinc-800/80 hover:border-amber-400/50 backdrop-blur-xl p-8 md:p-10 shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
            >
              {/* Top gradient strip */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Ambient card corner glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl group-hover:bg-amber-400/20 transition-all duration-500 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold px-3 py-1 bg-amber-400/10 border border-amber-400/20 rounded-full">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">
                    {project.stats}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-3 group-hover:text-amber-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light mb-6">
                  {project.desc}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs rounded-full font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-zinc-900">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-amber-400 transition-colors group/link"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Repository</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-link:translate-x-0.5" />
                </a>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-amber-400/10 hover:bg-amber-400 hover:text-black text-amber-400 text-xs font-bold uppercase tracking-widest rounded-full border border-amber-400/30 transition-all duration-300"
                >
                  Explore Code
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
