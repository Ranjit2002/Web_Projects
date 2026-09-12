'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShoppingBag,
  ArrowLeft,
  Tag,
  ShieldCheck,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/utils/currency';

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    discountAmount,
    shippingCost,
    taxAmount,
    totalAmount,
    updateQuantity,
    removeFromCart,
    clearCart,
    appliedPromo,
    applyPromo,
    removePromo,
    shippingMethod,
    setShippingMethod,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState<{ text: string; error: boolean } | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    setPromoMsg({ text: res.message, error: !res.success });
    if (res.success) setPromoInput('');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Your Shopping Bag is Empty</h1>
          <p className="text-sm text-zinc-400 max-w-sm mx-auto">
            Explore our curated catalog of precision audio devices, titanium smartwatches, and desktop interfaces.
          </p>
        </div>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Shopping Bag</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Review your items and proceed to client-validated checkout.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-zinc-400 hover:text-rose-400 transition-colors flex items-center gap-1.5"
        >
          <Trash2 className="w-3.5 h-3.5" /> Empty Bag
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Cart items list */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-3xl glass border border-white/10 divide-y divide-white/5 overflow-hidden">
            {items.map((item) => (
              <div key={item.id} className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                {/* Product thumbnail */}
                <Link
                  href={`/product/${item.slug}`}
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 flex-shrink-0 group"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </Link>

                {/* Info & variant */}
                <div className="flex-1 min-w-0 space-y-1">
                  <Link
                    href={`/product/${item.slug}`}
                    className="text-base font-bold text-white hover:text-indigo-300 transition-colors block"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-zinc-400">
                    {item.selectedColor ? `Finish: ${item.selectedColor}` : 'Standard'}
                    {item.selectedSize ? ` • Size: ${item.selectedSize}` : ''}
                  </p>
                  <p className="text-xs text-emerald-400 font-medium">
                    Stock Verified ({item.stockCount} Available)
                  </p>
                </div>

                {/* Quantity adjuster */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-lg text-zinc-400 hover:text-white"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-semibold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stockCount}
                      className="p-1 rounded-lg text-zinc-400 hover:text-white disabled:opacity-30"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line total */}
                  <div className="text-right min-w-[80px]">
                    <span className="text-base font-bold text-white">
                      {formatINR(item.price * item.quantity)}
                    </span>
                    <p className="text-[10px] text-zinc-500">{formatINR(item.price)} each</p>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 rounded-lg text-zinc-500 hover:text-rose-400 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary & Checkout CTA */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-6">
            <h3 className="text-base font-bold text-white pb-3 border-b border-white/10">
              Cart Breakdown
            </h3>

            {/* Promo Code Box */}
            <div>
              {appliedPromo ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold text-emerald-300">
                      {appliedPromo.code} Active (-{formatINR(discountAmount)})
                    </span>
                  </div>
                  <button
                    onClick={removePromo}
                    className="text-zinc-400 hover:text-rose-400 text-xs"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value);
                        setPromoMsg(null);
                      }}
                      placeholder="Promo code (TECH20, SAVE1000)"
                      className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white uppercase placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMsg && (
                    <p
                      className={`text-[11px] ${
                        promoMsg.error ? 'text-rose-400' : 'text-emerald-400'
                      }`}
                    >
                      {promoMsg.text}
                    </p>
                  )}
                </form>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-2.5 text-xs border-t border-white/10 pt-4">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal ({itemCount} items)</span>
                <span className="text-zinc-200 font-medium">{formatINR(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Promotional Savings</span>
                  <span>-{formatINR(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-zinc-400">
                <span>Shipping Estimate</span>
                <span className="text-zinc-200 font-medium">
                  {shippingCost === 0 ? 'FREE' : formatINR(shippingCost)}
                </span>
              </div>

              <div className="flex justify-between text-zinc-400">
                <span>Estimated GST (18%)</span>
                <span className="text-zinc-200 font-medium">{formatINR(taxAmount)}</span>
              </div>

              <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-white/10">
                <span>Total Amount</span>
                <span className="text-gradient">{formatINR(totalAmount)}</span>
              </div>
            </div>

            {/* Proceed to checkout button */}
            <Link
              href="/checkout"
              className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-95"
            >
              Proceed to Client Checkout
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Full 256-Bit SSL Protection Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
