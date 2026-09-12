'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
  Zap,
  Star,
  ShoppingBag,
} from 'lucide-react';
import { useProducts } from '@/context/ProductContext';
import { ProductCard } from '@/components/catalog/ProductCard';
import { formatINR } from '@/utils/currency';

export default function HomePage() {
  const { products } = useProducts();

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNewArrival || p.stockCount < 10).slice(0, 4);

  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-12">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/20 via-sky-500/15 to-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-indigo-500/30 text-xs font-semibold text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Next-Gen Acoustic & Hardware Release 2026</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Engineered for <br />
              <span className="text-gradient">Pure Precision.</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Architectural electronics, aerospace-grade titanium timepieces, and tactile mechanical workstations calibrated for the uncompromising modern creator.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/catalog"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all duration-200"
              >
                <ShoppingBag className="w-4 h-4" />
                Explore Catalog
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <Link
                href="/orders"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl glass hover:bg-white/10 text-zinc-200 font-semibold text-sm flex items-center justify-center gap-2 border border-white/10 transition-colors"
              >
                Track Live Order
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-bold text-white">45mm</p>
                <p className="text-xs text-zinc-400">Beryllium Drivers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">Grade 5</p>
                <p className="text-xs text-zinc-400">Aerospace Titanium</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">100%</p>
                <p className="text-xs text-zinc-400">Verified Stock Sync</p>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Spotlight */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden glass-card border border-white/20 p-4 shadow-2xl group">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&auto=format&fit=crop&q=80"
                  alt="Aether Lumina Headphones"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Floating Product Highlight Card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass border border-white/20 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                      Flagship Audio
                    </span>
                    <h3 className="text-sm font-bold text-white">Aether Lumina Spatial ANC</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-white">{formatINR(28999)}</span>
                    <p className="text-[10px] text-emerald-400 font-semibold">18 Units In Stock</p>
                  </div>
                </div>
                <Link
                  href="/product/lumina-anc-headphones"
                  className="mt-3 w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  Inspect Specifications <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">
            Curated Disciplines
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-white">
            Precision Systems for Work & Sanctuary
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              name: 'Acoustics & Audio',
              category: 'Audio',
              desc: 'Spatial ANC & Reference Earbuds',
              icon: Zap,
              count: '2 Models',
              img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
            },
            {
              name: 'Titanium Wearables',
              category: 'Wearables',
              desc: 'ECG AMOLED Chronographs',
              icon: ShieldCheck,
              count: '1 Model',
              img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
            },
            {
              name: 'Custom Computing',
              category: 'Computing',
              desc: 'Gasket Keyboards & Ergonomics',
              icon: Cpu,
              count: '2 Models',
              img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
            },
            {
              name: 'Architectural Living',
              category: 'Living',
              desc: 'CRI 98 Gesture Luminaires',
              icon: Layers,
              count: '1 Model',
              img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80',
            },
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.category}
                href={`/catalog?category=${cat.category}`}
                className="group relative rounded-3xl overflow-hidden glass-card border border-white/10 p-6 flex flex-col justify-between min-h-[220px] hover:border-indigo-500/50 transition-all duration-300"
              >
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mt-4">{cat.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1">{cat.desc}</p>
                </div>
                <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-[11px] font-semibold text-zinc-500 group-hover:text-indigo-300 transition-colors">
                    {cat.count}
                  </span>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 group-hover:text-white transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Hardware Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">
              Featured Flagships
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-white">
              Surgical Craftsmanship & Live Inventory
            </p>
          </div>
          <Link
            href="/catalog"
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
          >
            View Complete Catalog ({products.length} Products) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Craftsmanship Narrative Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden glass border border-white/10 p-8 sm:p-14">
          <div className="max-w-2xl space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              The Aether Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Hardware designed to disappear into your focus.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              We eliminate decorative noise. Every chassis is CNC-milled from solid monolithic billets, finished with tactile sandblast textures, and calibrated to provide instantaneous physical satisfaction with each interaction.
            </p>
            <div className="pt-2">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/10 transition-colors"
              >
                Browse All In-Stock Equipment <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
