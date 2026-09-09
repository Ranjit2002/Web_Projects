import React from 'react';
import { Download, ArrowRight, Mail, Sparkles, Terminal, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons.jsx';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[450px] bg-gradient-to-br from-amber-500/15 via-yellow-400/10 to-transparent blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 right-[-10%] w-[400px] h-[400px] bg-amber-600/10 blur-[160px] rounded-full pointer-events-none z-0" />

      {/* Grid Pattern with Vignette */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_45%,#000_65%,transparent_100%)] opacity-25 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Details */}
          <div className="lg:col-span-7 text-center lg:text-left pt-6 lg:pt-0">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-amber-400/15 to-yellow-400/5 border border-amber-400/30 text-amber-300 font-mono text-xs md:text-sm rounded-full shadow-[0_0_20px_rgba(251,191,36,0.12)] mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
              </span>
              <span className="tracking-wider uppercase font-semibold">Available for Opportunities</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400 font-normal">FULL_STACK_DEVELOPER</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-black text-white leading-none uppercase tracking-tighter mb-8">
              <span className="block text-zinc-100 hover:text-white transition-colors duration-300">
                Code<span className="text-amber-400">.</span>
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-amber-600 drop-shadow-[0_0_35px_rgba(251,191,36,0.35)] py-1">
                Create<span className="text-white">.</span>
              </span>
              <span className="block text-zinc-100 hover:text-white transition-colors duration-300">
                Deploy<span className="text-amber-400">.</span>
              </span>
            </h1>

            {/* Sub-headline description */}
            <div className="relative pl-0 lg:pl-6 py-2 mb-10 text-center lg:text-left">
              <div className="hidden lg:block absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-amber-400 via-yellow-500 to-amber-600 rounded-full shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
              <p className="text-lg md:text-xl text-zinc-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Hi, I'm <span className="text-white font-bold tracking-tight">Ranjeet Vishwakarma</span>. I architect and engineer high-performance web applications, translating intricate requirements into resilient, pixel-perfect digital experiences.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12">
              <a
                href="/PDF/My Resume.pdf"
                download="Ranjeet_Vishwakarma_Resume.pdf"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black font-extrabold uppercase text-sm tracking-widest rounded-full shadow-[0_0_25px_rgba(251,191,36,0.35)] hover:shadow-[0_0_40px_rgba(251,191,36,0.6)] hover:-translate-y-1 transition-all duration-300"
              >
                <span>Download CV</span>
                <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-zinc-950/80 text-amber-400 font-bold uppercase text-sm tracking-widest rounded-full border border-amber-400/60 hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all duration-300 hover:-translate-y-1 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(251,191,36,0.3)] backdrop-blur-md"
              >
                <span>Contact Me</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Social & Verification Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 border-t border-zinc-900 pt-8">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Connect:</span>
              
              <a
                href="https://github.com/Ranjit2002/Web_Projects.git"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 px-4 py-2 bg-zinc-900/60 border border-zinc-800 rounded-full text-zinc-400 hover:text-amber-400 hover:border-amber-400/50 hover:bg-zinc-900 transition-all duration-300"
              >
                <GithubIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-mono">GitHub</span>
              </a>

              <a
                href="https://linkedin.com/in/ranjeet-vishwakarma-5008262a5"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 px-4 py-2 bg-zinc-900/60 border border-zinc-800 rounded-full text-zinc-400 hover:text-amber-400 hover:border-amber-400/50 hover:bg-zinc-900 transition-all duration-300"
              >
                <LinkedinIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-mono">LinkedIn</span>
              </a>

              <a
                href="mailto:vishwakarmaranjit8109@gmail.com"
                className="group flex items-center gap-2 px-4 py-2 bg-zinc-900/60 border border-zinc-800 rounded-full text-zinc-400 hover:text-amber-400 hover:border-amber-400/50 hover:bg-zinc-900 transition-all duration-300"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-mono">Email</span>
              </a>
            </div>

          </div>

          {/* Right Hero Visual: Orbital Avatar System */}
          <div className="lg:col-span-5 flex justify-center items-center mt-6 lg:mt-0">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 group">
              
              {/* Outer Radiant Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/25 via-yellow-400/20 to-transparent rounded-full blur-3xl group-hover:blur-2xl group-hover:bg-amber-400/35 transition-all duration-700 pointer-events-none" />

              {/* Orbital Ring 1: Dashed Clockwise */}
              <div className="absolute inset-[-18px] sm:inset-[-26px] border-2 border-dashed border-amber-400/40 rounded-full animate-[spin_24s_linear_infinite] group-hover:border-amber-400/80 transition-colors duration-500 pointer-events-none" />

              {/* Orbital Ring 2: Thin Counter-Clockwise */}
              <div className="absolute inset-[-9px] sm:inset-[-14px] border border-zinc-700/80 rounded-full animate-[spin_18s_linear_infinite_reverse] group-hover:border-amber-300/60 transition-colors duration-500 pointer-events-none" />

              {/* Profile Image Container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-zinc-900 shadow-[0_0_50px_rgba(0,0,0,0.9)] z-10 bg-zinc-950">
                <img
                  src="/img/Ranjit.jpg"
                  alt="Ranjeet Vishwakarma"
                  className="w-full h-full object-cover rounded-full transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = '/img/Ranjit.jpg';
                  }}
                />
                
                {/* Subtle Gradient Vignette on Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              {/* Floating Pill Badge 1: Clean Code */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-2 sm:-left-6 bg-zinc-950/90 border border-zinc-800 text-zinc-300 px-4 py-2.5 rounded-2xl shadow-xl backdrop-blur-xl flex items-center gap-3 z-20 hover:border-amber-400/60 transition-colors">
                <div className="p-1.5 bg-amber-400/10 text-amber-400 rounded-lg">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Core Focus</div>
                  <div className="text-xs font-bold text-white">Full Stack Architecture</div>
                </div>
              </div>

              {/* Floating Pill Badge 2: Verified */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-zinc-950/90 border border-zinc-800 text-zinc-300 px-4 py-2 rounded-2xl shadow-xl backdrop-blur-xl flex items-center gap-2.5 z-20 hover:border-amber-400/60 transition-colors">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span className="text-xs font-bold text-zinc-100">Ready to Ship</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
