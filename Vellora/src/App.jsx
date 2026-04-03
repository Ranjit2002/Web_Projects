import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";

export default function App() {
  const products = [
    {
      id: 1,
      name: "Minimalist Watch",
      price: "1800.00",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      name: "Wireless Earbuds",
      price: "2500.00",
      image:
        "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      name: "Leather Wallet",
      price: "450.00",
      image:
        "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 4,
      name: "Smart Speaker",
      price: "700.00",
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=80",
    },
  ];

  return (
    <div className="min-h-screen font-sans bg-white">
      <Navbar />
      <Hero />

      <main className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Trending Now</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
