export default function ProductCard({ name, price, image }) {
  return (
    <div className="group cursor-pointer flex flex-col gap-4">
      {/* Image Container with Hover Effects */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
        />

        {/* Hidden Quick Add Button that appears on hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button className="w-full bg-white/90 backdrop-blur-sm text-gray-900 font-bold py-3 rounded-xl shadow-lg hover:bg-white transition-colors">
            Quick Add
          </button>
        </div>
      </div>

      {/* Text Details */}
      <div className="flex justify-between items-start px-1">
        <div>
          <h3 className="text-base font-bold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Premium Quality
          </p>
        </div>
        <p className="text-lg font-extrabold text-gray-900">₹{price}</p>
      </div>
    </div>
  );
}
