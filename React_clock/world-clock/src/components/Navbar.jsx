import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ["Home", "About", "Services", "Contact"];

  return (
    // 'sticky top-0 w-full' makes it touch the top and span the entire width
    <nav className="sticky top-0 w-full z-50 bg-slate-900/85 backdrop-blur-xl border-b border-slate-700 shadow-xl font-sans">
      {/* Inner container to keep content neatly aligned on huge monitors */}
      <div className="flex justify-between items-center px-4 sm:px-8 py-3 w-full max-w-7xl mx-auto">
        {/* Logo Section */}
        <a href="#" className="flex items-center gap-3 group">
          <img
            src="./img/clock.png"
            alt="clock"
            className="w-8 h-8 group-hover:-rotate-12 group-hover:scale-110 transition-all duration-300"
          />
          <span className="text-2xl font-black tracking-widest text-white group-hover:text-blue-400 transition-colors duration-300">
            CLOCK
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="relative px-5 py-2 text-sm font-medium text-gray-300 rounded-full group overflow-hidden transition-colors"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                {link}
              </span>
              <div className="absolute inset-0 bg-white/10 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 rounded-full z-0"></div>
            </a>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full hover:bg-slate-800 transition-colors z-50"
        >
          <span
            className={`block w-5 h-0.5 bg-white rounded-full transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1"}`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-white rounded-full transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
          ></span>
          <span
            className={`block w-5 h-0.5 bg-white rounded-full transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1"}`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu (Slides down from the navbar) */}
      <div
        className={`absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-slate-700 shadow-2xl overflow-hidden transition-all duration-400 ease-out md:hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col p-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 text-gray-300 font-medium hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
