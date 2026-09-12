import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-zinc-950/80 text-zinc-400 mt-20">
      {/* Value props banner */}
      <div className="border-b border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-100">Expedited Global Delivery</h4>
              <p className="text-xs text-zinc-400 mt-1">
                Complimentary standard transit on all domestic orders over ₹4,999.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-100">Encrypted Transactions</h4>
              <p className="text-xs text-zinc-400 mt-1">
                256-bit SSL checkout processing. Your payment credentials are secure.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-100">30-Day Evaluation Period</h4>
              <p className="text-xs text-zinc-400 mt-1">
                Full refund or exchange if you are not 100% satisfied with the craftsmanship.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-100">Certified Authentic</h4>
              <p className="text-xs text-zinc-400 mt-1">
                Every hardware unit is verified with genuine cryptographic serial signatures.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold tracking-wider text-white">AETHER</span>
          </div>
          <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
            Crafting architectural electronics, precision mechanical devices, and ergonomic objects
            engineered for elevated human performance.
          </p>
          <div className="pt-2">
            <p className="text-xs text-zinc-500">
              © {new Date().getFullYear()} Aether Atelier Inc. All rights reserved.
            </p>
          </div>
        </div>

        <div>
          <h5 className="text-xs font-bold text-zinc-200 uppercase tracking-widest mb-4">
            Catalog Collections
          </h5>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/catalog?category=Audio" className="hover:text-white transition-colors">
                Acoustics & Audio
              </Link>
            </li>
            <li>
              <Link href="/catalog?category=Wearables" className="hover:text-white transition-colors">
                Titanium Wearables
              </Link>
            </li>
            <li>
              <Link href="/catalog?category=Computing" className="hover:text-white transition-colors">
                Custom Computing
              </Link>
            </li>
            <li>
              <Link href="/catalog?category=Living" className="hover:text-white transition-colors">
                Architectural Living
              </Link>
            </li>
            <li>
              <Link href="/catalog?category=Accessories" className="hover:text-white transition-colors">
                Desk Accessories
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-xs font-bold text-zinc-200 uppercase tracking-widest mb-4">
            Customer Portal
          </h5>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/orders" className="hover:text-white transition-colors">
                Order Tracking & History
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-white transition-colors">
                Profile & Addresses
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-white transition-colors">
                Shopping Cart
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="hover:text-white transition-colors">
                Secure Checkout
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-xs font-bold text-zinc-200 uppercase tracking-widest mb-4">
            Newsletter
          </h5>
          <p className="text-xs text-zinc-400 mb-3">
            Receive private releases and firmware drop dispatches.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email address..."
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 flex-1"
            />
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-3.5 py-2 rounded-lg transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
