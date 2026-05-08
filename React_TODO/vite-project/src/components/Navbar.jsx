import React from "react";

const Navbar = () => {
  return (
    <nav className="flex bg-[#242424] text-white justify-between items-center h-12">
      <div className="logo">
        <span className="font-bold text-2xl mx-8 tracking-widest">iTask</span>
      </div>
      <ul className="flex gap-9 text-lg mx-9 font-semibold">
        <li>Home</li>
        <li>Your Tasks</li>
      </ul>
    </nav>
  );
};

export default Navbar;
