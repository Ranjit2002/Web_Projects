'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { formatINR } from '@/utils/currency';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [added, setAdded] = React.useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock || product.stockCount <= 0) return;

    const defaultColor = product.colors?.[0]?.name;
    const defaultSize = product.sizes?.[0];
    addToCart(product, 1, defaultColor, defaultSize);

    setAdded(true);
    toast(`Added "${product.name}" to your bag`, 'success');
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="group rounded-2xl glass-card overflow-hidden transition-all duration-300 flex flex-col justify-between border border-white/10 hover:border-indigo-500/40 hover:-translate-y-1">
      <Link href={`/product/${product.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-zinc-900/60">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.tags.slice(0, 1).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-black/60 backdrop-blur-md text-zinc-200 border border-white/10 shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Inventory Status Badge */}
        <div className="absolute top-3 right-3 z-10">
          {product.stockCount > 5 ? (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              In Stock ({product.stockCount})
            </span>
          ) : product.stockCount > 0 ? (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              Only {product.stockCount} left!
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 backdrop-blur-md">
              Out of Stock
            </span>
          )}
        </div>
      </Link>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
            <span className="uppercase font-semibold tracking-wider text-indigo-400">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-zinc-200">{product.rating}</span>
              <span className="text-zinc-500">({product.reviewCount})</span>
            </div>
          </div>

          <Link href={`/product/${product.slug}`} className="block group-hover:text-indigo-300 transition-colors">
            <h3 className="text-base font-semibold text-zinc-100 line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Pricing & Add to Cart button */}
        <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-white">{formatINR(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-zinc-500 line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock || product.stockCount <= 0}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${
              !product.inStock || product.stockCount <= 0
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5'
                : added
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md hover:shadow-indigo-600/25 active:scale-95'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
