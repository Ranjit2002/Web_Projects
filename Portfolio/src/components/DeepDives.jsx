import React, { useState } from 'react';
import { GitBranch, GitPullRequest, GitMerge, Search, Play, Bug, Smartphone, LayoutGrid, Gauge, CheckCircle2, ArrowRight } from 'lucide-react';

export default function DeepDives({ selectedTab = 'github', setSelectedTab }) {
  const [internalTab, setInternalTab] = useState('github');
  const currentTab = setSelectedTab ? selectedTab : internalTab;
  const changeTab = setSelectedTab ? setSelectedTab : setInternalTab;

  const topics = {
    github: {
      badge: 'VERSION_CONTROL_SYSTEM',
      title: 'Git & GitHub Workflows',
      subtitle: 'Mastering distributed version control, collaborative team workflows, and automated CI/CD pipelines.',
      cards: [
        {
          tag: 'INIT',
          icon: <GitBranch className="w-8 h-8 text-amber-400" />,
          title: 'Atomic Version Control',
          desc: 'Structuring granular, well-documented atomic commits, logical feature branching, and meticulous staging isolation.',
          bullets: ['Granular commits with conventional messages', 'Feature, bugfix, and release branch strategies', 'Local rebasing for clean linearized history'],
        },
        {
          tag: 'PUSH',
          icon: <GitPullRequest className="w-8 h-8 text-amber-400" />,
          title: 'Seamless Collaboration',
          desc: 'Collaborating effectively via GitHub Pull Requests, constructive peer reviews, and zero-loss merge conflict resolution.',
          bullets: ['Peer reviews with actionable feedback', 'Squash & merge vs rebase workflows', 'Protection rules for main and staging branches'],
        },
        {
          tag: 'MRGE',
          icon: <GitMerge className="w-8 h-8 text-amber-400" />,
          title: 'CI / CD & Integrity',
          desc: 'Integrating automated linter checks, test suites, and continuous delivery pipelines to guarantee deploy stability.',
          bullets: ['GitHub Actions continuous integration', 'Automated linting and test validation', 'Instant static & preview deployments'],
        },
      ],
    },
    problem: {
      badge: 'LOGIC_ARCHITECTURE',
      title: 'Algorithmic Problem Solving',
      subtitle: 'Combining hardware fault-finding diagnostics with structured algorithmic decomposition to write robust code.',
      cards: [
        {
          tag: '01',
          icon: <Search className="w-8 h-8 text-amber-400" />,
          title: 'Analyze & Deconstruct',
          desc: 'Dissecting convoluted product requirements into clear state graphs, data flow pipelines, and edge-case definitions.',
          bullets: ['Input/output boundary mapping', 'Time and space complexity profiling', 'Modularity and boundary decoupling'],
        },
        {
          tag: '02',
          icon: <Play className="w-8 h-8 text-amber-400" />,
          title: 'Execute & Implement',
          desc: 'Writing clean, idiomatic algorithms using modern JavaScript, Python, or Java to build fast, reliable systems.',
          bullets: ['Optimized data structures selection', 'Declarative, maintainable logic flows', 'Defensive programming and input validation'],
        },
        {
          tag: '03',
          icon: <Bug className="w-8 h-8 text-amber-400" />,
          title: 'Diagnostic Debugging',
          desc: 'Applying oscilloscope-level hardware isolation methodology to rapidly locate memory leaks, race conditions, and bottlenecks.',
          bullets: ['Binary search style fault isolation', 'Chrome DevTools profiling & heap audits', 'Fast root-cause triage under pressure'],
        },
      ],
    },
    responsive: {
      badge: 'UI_ENGINEERING',
      title: 'Responsive UI Engineering',
      subtitle: 'Ensuring pixel-perfect aesthetics, fluid layouts, and 60fps rendering across all modern mobile and desktop devices.',
      cards: [
        {
          tag: '01',
          icon: <Smartphone className="w-8 h-8 text-amber-400" />,
          title: 'Mobile-First Philosophy',
          desc: 'Designing core ergonomics for smaller touch screens first, guaranteeing instantaneous initial paints and rapid interactions.',
          bullets: ['Touch-friendly hit targets (minimum 44px)', 'Critical CSS rendering path priority', 'Adaptive typography scaling with clamp()'],
        },
        {
          tag: '02',
          icon: <LayoutGrid className="w-8 h-8 text-amber-400" />,
          title: 'Fluid Grid Systems',
          desc: 'Harnessing dynamic CSS Grid and Flexbox mechanics to let layouts naturally reshape without visual fragmentation.',
          bullets: ['Tailwind CSS responsive breakpoint modifiers', 'Intrinsic grid auto-fit and minmax layouts', 'Consistent spacing tokens and rhythm'],
        },
        {
          tag: '03',
          icon: <Gauge className="w-8 h-8 text-amber-400" />,
          title: '60 FPS Performance',
          desc: 'Hardware-accelerated CSS transforms, lightweight DOM trees, and zero layout shift (CLS) for silky smooth experiences.',
          bullets: ['Composite-only GPU animations (transform, opacity)', 'Lazy loading and responsive image sources', 'Lighthouse 95+ performance scores'],
        },
      ],
    },
  };

  const activeTopic = topics[currentTab] || topics.github;

  return (
    <section id="deep-dives" className="relative py-24 md:py-32 overflow-hidden border-t border-zinc-900/60">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-amber-500/10 via-yellow-400/5 to-transparent blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-xs rounded-full uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span>{activeTopic.badge}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
            Engineering{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-amber-600">
              Deep Dives
            </span>
          </h2>
          <p className="text-zinc-400 text-base md:text-lg font-light leading-relaxed">
            {activeTopic.subtitle}
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full mt-6 mx-auto shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
        </div>

        {/* Interactive Topic Tab Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-zinc-950/80 border border-zinc-800 rounded-2xl md:rounded-full backdrop-blur-xl flex-wrap justify-center gap-1.5">
            <button
              onClick={() => changeTab('github')}
              className={`px-6 py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                currentTab === 'github'
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-lg shadow-amber-400/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              Git &amp; GitHub
            </button>
            <button
              onClick={() => changeTab('problem')}
              className={`px-6 py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                currentTab === 'problem'
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-lg shadow-amber-400/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              Problem Solving
            </button>
            <button
              onClick={() => changeTab('responsive')}
              className={`px-6 py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                currentTab === 'responsive'
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-lg shadow-amber-400/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              Responsive UI
            </button>
          </div>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activeTopic.cards.map((card, idx) => (
            <div
              key={card.title}
              className="group bg-zinc-950/70 backdrop-blur-xl border border-zinc-800/80 rounded-[2.5rem] p-8 md:p-10 hover:border-amber-400/50 hover:shadow-[0_0_35px_rgba(251,191,36,0.12)] hover:-translate-y-2 transition-all duration-500 shadow-2xl relative overflow-hidden flex flex-col justify-between"
            >
              {/* Top linear gradient border highlight */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Big Watermark Tag in Corner */}
              <span className="absolute -bottom-6 -right-2 text-7xl md:text-8xl font-black text-zinc-900/40 select-none pointer-events-none group-hover:scale-110 group-hover:text-zinc-800/50 transition-all duration-700 font-mono uppercase tracking-tighter">
                {card.tag}
              </span>

              <div className="relative z-10">
                {/* Icon Container */}
                <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mb-8 group-hover:border-amber-400/50 group-hover:bg-amber-400/10 transition-all shadow-md">
                  {card.icon}
                </div>

                {/* Card Title */}
                <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-4 group-hover:text-amber-300 transition-colors">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="text-zinc-400 leading-relaxed font-light mb-6 text-sm md:text-base">
                  {card.desc}
                </p>

                {/* Key Bullet Points */}
                <ul className="space-y-2.5 pt-4 border-t border-zinc-900">
                  {card.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs text-zinc-400">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
