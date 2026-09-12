'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Star,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Minus,
  Plus,
  ArrowLeft,
  Share2,
  Lock,
} from 'lucide-react';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { ProductCard } from '@/components/catalog/ProductCard';
import { formatINR } from '@/utils/currency';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { getProductBySlug, products } = useProducts();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const product = getProductBySlug(resolvedParams.slug);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors?.[0]?.name
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-sm text-zinc-400">
          The hardware reference you requested does not exist or has been retired.
        </p>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Catalog
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!product.inStock || product.stockCount <= 0) return;
    addToCart(product, quantity, selectedColor, selectedSize);
    setIsAdded(true);
    toast(`Added ${quantity}x "${product.name}" to your bag`, 'success');
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!product.inStock || product.stockCount <= 0) return;
    addToCart(product, quantity, selectedColor, selectedSize);
    router.push('/checkout');
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Back button & breadcrumbs */}
      <div className="flex items-center justify-between">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Catalog
        </Link>
        <span className="text-xs font-mono text-zinc-500">SKU: {product.sku}</span>
      </div>

      {/* Main product showcase grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Gallery column (Left) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-card border border-white/10 bg-zinc-900/60">
            <Image
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              fill
              priority
              className="object-cover object-center transition-all duration-300"
            />

            {/* In stock badge overlay */}
            <div className="absolute top-4 left-4 z-10">
              {product.stockCount > 5 ? (
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  In Stock ({product.stockCount} Available)
                </span>
              ) : product.stockCount > 0 ? (
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  Limited Stock: Only {product.stockCount} left
                </span>
              ) : (
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 backdrop-blur-md">
                  Currently Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* Thumbnail strip */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-24 h-20 rounded-2xl overflow-hidden flex-shrink-0 border transition-all ${
                    selectedImageIndex === idx
                      ? 'border-indigo-500 ring-2 ring-indigo-500/40'
                      : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Actions column (Right) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-1.5">
              <span>{product.category}</span>
              <span>•</span>
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-zinc-200">{product.rating}</span>
                <span className="text-zinc-500 font-normal">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
              {product.tagline}
            </p>
          </div>

          {/* Pricing display */}
          <div className="p-4 rounded-2xl glass border border-white/10 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-white">{formatINR(product.price)}</span>
            {product.originalPrice && (
              <span className="text-base text-zinc-500 line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
            {product.originalPrice && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Save {formatINR(product.originalPrice - product.price)}
              </span>
            )}
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2.5">
                Color Finish: <span className="text-indigo-400 font-medium">{selectedColor}</span>
              </label>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`p-1 rounded-full border transition-all ${
                      selectedColor === c.name
                        ? 'border-indigo-500 ring-2 ring-indigo-500/40'
                        : 'border-transparent hover:border-white/20'
                    }`}
                    title={c.name}
                  >
                    <span
                      className="block w-6 h-6 rounded-full border border-white/20"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size / Dimension Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2.5">
                Chassis Dimension: <span className="text-indigo-400 font-medium">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                      selectedSize === s
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'bg-white/5 border-white/10 text-zinc-300 hover:border-white/20'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity selector */}
          {product.inStock && product.stockCount > 0 && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2.5">
                Order Quantity
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white disabled:opacity-30"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-semibold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    disabled={quantity >= product.stockCount}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white disabled:opacity-30"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-zinc-400">
                  Maximum {product.stockCount} units per order
                </span>
              </div>
            </div>
          )}

          {/* Call to action buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock || product.stockCount <= 0}
              className={`w-full py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-xl transition-all duration-200 ${
                !product.inStock || product.stockCount <= 0
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5'
                  : isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 active:scale-95'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  Added to Bag
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  Add to Shopping Bag
                </>
              )}
            </button>

            {product.inStock && product.stockCount > 0 && (
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 rounded-2xl text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/15 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Lock className="w-4 h-4 text-emerald-400" />
                Instant Express Checkout
              </button>
            )}
          </div>

          {/* Trust props */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-indigo-400" />
              <span>Complimentary Courier</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-sky-400" />
              <span>30-Day Hassle Free Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Overview, Specifications & Features */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 border-t border-white/10">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-xl font-bold text-white">Engineering Overview</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">{product.description}</p>

          {product.features && product.features.length > 0 && (
            <div className="pt-4">
              <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider mb-3">
                Key Features
              </h3>
              <ul className="space-y-2.5">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <Check className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Technical specs table */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-xl font-bold text-white">Technical Specifications</h2>
          {product.specs ? (
            <div className="rounded-2xl glass border border-white/10 overflow-hidden divide-y divide-white/5 text-xs">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="p-3.5 flex justify-between gap-4">
                  <span className="font-semibold text-zinc-400">{key}</span>
                  <span className="text-zinc-200 text-right font-mono">{val}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-zinc-500">Standard factory specifications apply.</p>
          )}
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="pt-12 border-t border-white/10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Verified Customer Reviews</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Overall score: <strong className="text-zinc-200">{product.rating} / 5.0</strong> based on {product.reviewCount} customer evaluations.
            </p>
          </div>
        </div>

        {product.reviews && product.reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.reviews.map((rev) => (
              <div key={rev.id} className="p-5 rounded-2xl glass border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{rev.userName}</span>
                    {rev.verifiedPurchase && (
                      <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">{rev.comment}</p>
                <span className="text-[10px] text-zinc-500 font-mono block">{rev.date}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl glass border border-white/10 text-center text-xs text-zinc-400">
            No public reviews have been submitted for this recent batch yet.
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-white/10 space-y-6">
          <h2 className="text-xl font-bold text-white">Complementary Ecosystem Hardware</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
