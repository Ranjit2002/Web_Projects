import React from 'react';
import { ArrowUp, Mail, Heart, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons.jsx';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#060608] border-t border-zinc-900 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-zinc-900/80">
          
          {/* Brand Logo & Tagline */}
          <div className="text-center md:text-left">
            <a href="#home" className="text-2xl font-black uppercase tracking-tighter text-white">
              Ranjeet<span className="text-amber-400">.</span>
            </a>
            <p className="text-xs font-mono text-zinc-500 mt-2 tracking-wider">
              FULL_STACK_DEVELOPER // UI_ENGINEER
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Ranjit2002/Web_Projects.git"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-400/50 hover:bg-zinc-800 transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href="https://linkedin.com/in/ranjeet-vishwakarma-5008262a5"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-400/50 hover:bg-zinc-800 transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href="mailto:vishwakarmaranjit8109@gmail.com"
              className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-400/50 hover:bg-zinc-800 transition-all duration-300"
              aria-label="Email Me"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="group p-2.5 rounded-full bg-amber-400/10 hover:bg-amber-400 text-amber-400 hover:text-black border border-amber-400/40 transition-all duration-300 ml-2"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>

        </div>

        {/* Bottom Credits & Built With */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-mono text-zinc-500">
          <p>© {new Date().getFullYear()} Ranjeet Vishwakarma. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Built with React + Vite &amp; Tailwind CSS</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
