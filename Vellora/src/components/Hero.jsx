export default function Hero() {
  return (
    <div className="relative w-full h-[75vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1920"
          alt="Premium lifestyle store"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/40"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mt-12">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
          Elevate Your Style.
        </h1>
        <p className="text-lg md:text-xl text-gray-100 mb-10 font-medium drop-shadow-md">
          Discover our newly curated collection of premium essentials designed
          for the modern lifestyle.
        </p>
        <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-2xl">
          Shop the Collection
        </button>
      </div>
    </div>
  );
}
