export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-4 flex items-center justify-between transition-all">
      {/* Logo */}
      <div className="text-2xl font-black tracking-tighter text-gray-900">
        VELLORA
      </div>

      {/* Links */}
      <ul className="hidden md:flex gap-8 text-sm font-semibold text-gray-500">
        <li className="hover:text-gray-900 transition-colors cursor-pointer">
          Shop
        </li>
        <li className="hover:text-gray-900 transition-colors cursor-pointer">
          Collections
        </li>
        <li className="hover:text-gray-900 transition-colors cursor-pointer">
          About
        </li>
      </ul>

      {/* Cart Button */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 text-sm font-medium text-white bg-gray-900 px-5 py-2.5 rounded-full hover:bg-gray-800 transition-all shadow-md hover:shadow-lg">
          Cart
          <span className="bg-white text-gray-900 px-2 py-0.5 rounded-full text-xs font-bold">
            0
          </span>
        </button>
      </div>
    </nav>
  );
}
