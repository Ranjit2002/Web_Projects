import React from 'react';
import { Cpu, Code2, Sparkles, CheckCircle, Layers, Zap, Terminal, ArrowRight } from 'lucide-react';

export default function About({ onSelectDeepDive }) {
  const highlights = [
    {
      icon: <Code2 className="w-5 h-5 text-amber-400" />,
      title: 'Modern Architecture',
      desc: 'Building component-driven frontends with React & Tailwind CSS paired with high-throughput Node.js micro-services.',
    },
    {
      icon: <Cpu className="w-5 h-5 text-amber-400" />,
      title: 'Hardware & Logic Acumen',
      desc: 'Root-cause diagnostic mindset from hardware troubleshooting applied directly to systematic software debugging.',
    },
    {
      icon: <Layers className="w-5 h-5 text-amber-400" />,
      title: 'Scalable & Clean Code',
      desc: 'Adhering to strict DRY principles, atomic commit histories, modular design patterns, and maintainable type structures.',
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      title: 'Peak Performance',
      desc: 'Ensuring sub-second load times, 60fps animations, optimized DOM trees, and zero layout shifting across viewports.',
    },
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden border-t border-zinc-900/60">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-amber-500/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-xs rounded-full uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Developer Overview</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tighter">
            Engineering with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-amber-600">
              Purpose &amp; Precision
            </span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full mt-4 mx-auto md:mx-0 shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Glass Card Bio */}
          <div className="lg:col-span-6">
            <div className="relative p-8 md:p-10 rounded-[2.5rem] bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-2xl shadow-2xl group hover:border-amber-400/40 transition-all duration-500 overflow-hidden">
              
              {/* Subtle top accent gradient */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 opacity-90 group-hover:opacity-100 transition-opacity" />
              
              {/* Status Beacon */}
              <div className="flex items-center justify-between gap-4 pb-6 mb-8 border-b border-zinc-800/80">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                    SYSTEM.ONLINE // READY
                  </span>
                </div>
                <span className="text-xs font-mono text-zinc-500">v2.4_PROD</span>
              </div>

              {/* Bio Narrative */}
              <div className="space-y-6 text-zinc-300 text-base sm:text-lg font-light leading-relaxed">
                <p>
                  I am a passionate <strong className="text-white font-semibold">Full Stack Developer</strong> dedicated to turning complex requirements into seamless, resilient digital products.
                </p>
                <p>
                  Whether crafting high-performance frontends with <span className="text-amber-300 font-medium">React &amp; Tailwind CSS</span> or engineering backend architectures with <span className="text-amber-300 font-medium">Node.js and MongoDB</span>, I prioritize performance, accessibility, and pixel-precision.
                </p>
                <p>
                  My experience is bolstered by hands-on hardware troubleshooting—providing me with a rare, low-level intuition for how computing machines process instructions, handle memory, and manage system I/O.
                </p>
              </div>

              {/* Quick Topic Switchers */}
              <div className="pt-8 mt-6 border-t border-zinc-800/80">
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">Explore Specialties:</p>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={() => onSelectDeepDive('github')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/80 hover:bg-amber-400 hover:text-black border border-zinc-800 text-zinc-300 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 group/btn"
                  >
                    <span>Git &amp; GitHub</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>

                  <button
                    onClick={() => onSelectDeepDive('problem')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/80 hover:bg-amber-400 hover:text-black border border-zinc-800 text-zinc-300 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 group/btn"
                  >
                    <span>Problem Solving</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>

                  <button
                    onClick={() => onSelectDeepDive('responsive')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/80 hover:bg-amber-400 hover:text-black border border-zinc-800 text-zinc-300 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 group/btn"
                  >
                    <span>Responsive UI</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Key Philosophy Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-[2rem] bg-zinc-950/50 border border-zinc-800/80 hover:border-amber-400/40 hover:bg-zinc-900/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 shadow-lg relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/5 rounded-bl-full pointer-events-none group-hover:bg-amber-400/10 transition-colors" />
                
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-5 group-hover:border-amber-400/50 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.2)] transition-all">
                  {item.icon}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
