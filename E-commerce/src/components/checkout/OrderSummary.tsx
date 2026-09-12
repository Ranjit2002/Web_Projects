'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Tag, ShieldCheck, ArrowRight, Lock, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/utils/currency';

interface OrderSummaryProps {
  isSubmitting: boolean;
  onPlaceOrder: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ isSubmitting, onPlaceOrder }) => {
  const {
    items,
    itemCount,
    subtotal,
    discountAmount,
    shippingCost,
    taxAmount,
    totalAmount,
    appliedPromo,
    applyPromo,
    removePromo,
    shippingMethod,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError('');
      setPromoInput('');
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-6 sticky top-24">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <h3 className="text-base font-bold text-white">Order Summary</h3>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Item thumbnails list */}
      <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-zinc-900 border border-white/10 flex-shrink-0">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
              <span className="absolute bottom-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-tl-lg">
                x{item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-zinc-100 truncate">{item.name}</h4>
              <p className="text-[11px] text-zinc-400 truncate">
                {item.selectedColor || 'Standard'} {item.selectedSize ? `• ${item.selectedSize}` : ''}
              </p>
            </div>
            <span className="text-xs font-bold text-zinc-100">
              {formatINR(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Promo Code Input */}
      <div className="pt-2 border-t border-white/10">
        {appliedPromo ? (
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-emerald-300">
                {appliedPromo.code} applied! (-{formatINR(discountAmount)})
              </span>
            </div>
            <button
              type="button"
              onClick={removePromo}
              className="text-zinc-400 hover:text-rose-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
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
                  setPromoError('');
                }}
                placeholder="Promo code (e.g. TECH20, SAVE1000)"
                className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white uppercase placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
              >
                Apply
              </button>
            </div>
            {promoError && (
              <p className="text-[11px] text-rose-400 pl-1">{promoError}</p>
            )}
          </form>
        )}
      </div>

      {/* Pricing Calculation Breakdown */}
      <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs">
        <div className="flex justify-between text-zinc-400">
          <span>Subtotal</span>
          <span className="text-zinc-200 font-medium">{formatINR(subtotal)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-400 font-medium">
            <span>Promotional Discount</span>
            <span>-{formatINR(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between text-zinc-400">
          <span>
            Shipping (
            {shippingMethod === 'standard'
              ? 'Standard'
              : shippingMethod === 'express'
              ? 'Express'
              : 'Overnight'}
            )
          </span>
          <span className="text-zinc-200 font-medium">
            {shippingCost === 0 ? 'FREE' : formatINR(shippingCost)}
          </span>
        </div>

        <div className="flex justify-between text-zinc-400">
          <span>Estimated GST (18%)</span>
          <span className="text-zinc-200 font-medium">{formatINR(taxAmount)}</span>
        </div>

        <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-white/10">
          <span>Grand Total</span>
          <span className="text-gradient">{formatINR(totalAmount)}</span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        disabled={isSubmitting || items.length === 0}
        onClick={onPlaceOrder}
        className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-xl transition-all duration-200 ${
          isSubmitting || items.length === 0
            ? 'bg-zinc-700 cursor-not-allowed text-zinc-400'
            : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-95'
        }`}
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Lock className="w-4 h-4" />
            Complete Order • {formatINR(totalAmount)}
            <ArrowRight className="w-4 h-4 ml-1" />
          </>
        )}
      </button>

      {/* Guarantee & Safety note */}
      <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-400">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>30-Day Money-Back Guarantee & Free Returns</span>
      </div>
    </div>
  );
};
