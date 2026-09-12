'use client';

import React from 'react';
import { CreditCard, Smartphone, Banknote, ShieldCheck, Lock, Sparkles } from 'lucide-react';
import { CheckoutFormData, CheckoutFormErrors, PaymentMethodType } from '@/types/checkout';

interface PaymentFormProps {
  formData: CheckoutFormData;
  errors: CheckoutFormErrors;
  onChange: (field: keyof CheckoutFormData, value: any) => void;
  onFillDemoCard: () => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  formData,
  errors,
  onChange,
  onFillDemoCard,
}) => {
  // Format card number with 4-digit chunks
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    onChange('cardNumber', formatted);
  };

  // Format expiry date MM/YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }
    onChange('cardExpiry', val);
  };

  // Format CVV
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    onChange('cardCvv', val);
  };

  // Detect card brand based on prefix
  const getCardBrand = (num: string) => {
    const clean = num.replace(/\s/g, '');
    if (clean.startsWith('4')) return 'Visa';
    if (clean.startsWith('51') || clean.startsWith('52') || clean.startsWith('53') || clean.startsWith('54') || clean.startsWith('55')) return 'Mastercard';
    if (clean.startsWith('34') || clean.startsWith('37')) return 'Amex';
    return null;
  };

  const detectedBrand = getCardBrand(formData.cardNumber);

  return (
    <div className="space-y-6">
      {/* Payment Method Selector Tabs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            Payment Method
          </h3>
          <span className="text-[11px] text-zinc-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            256-Bit Encrypted
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'card' as PaymentMethodType, label: 'Credit Card', icon: CreditCard },
            { id: 'upi' as PaymentMethodType, label: 'Instant UPI', icon: Smartphone },
            { id: 'cod' as PaymentMethodType, label: 'Cash on Delivery', icon: Banknote },
          ].map((tab) => {
            const isSelected = formData.paymentMethod === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onChange('paymentMethod', tab.id)}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
                  isSelected
                    ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                    : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? 'text-indigo-400' : 'text-zinc-400'}`} />
                <span className="text-xs font-semibold">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Credit / Debit Card Form */}
      {formData.paymentMethod === 'card' && (
        <div className="space-y-4 p-5 rounded-2xl glass border border-white/10">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-xs font-medium text-zinc-400">Card Credentials</span>
            <button
              type="button"
              onClick={onFillDemoCard}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 transition-colors"
            >
              <Sparkles className="w-3 h-3" />
              Autofill Test Card
            </button>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Name on Card <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={formData.cardholderName}
              onChange={(e) => onChange('cardholderName', e.target.value)}
              placeholder="Alex Mercer"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                errors.cardholderName
                  ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                  : 'border-white/10 focus:border-indigo-500'
              }`}
            />
            {errors.cardholderName && (
              <p className="text-xs text-rose-400 mt-1">{errors.cardholderName}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-zinc-400">
                Card Number <span className="text-rose-400">*</span>
              </label>
              {detectedBrand && (
                <span className="text-[11px] font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  {detectedBrand}
                </span>
              )}
            </div>
            <div className="relative">
              <input
                type="text"
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
                placeholder="4242  4242  4242  4242"
                maxLength={19}
                className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border text-sm font-mono tracking-wider text-white placeholder-zinc-600 focus:outline-none transition-all ${
                  errors.cardNumber
                    ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                    : 'border-white/10 focus:border-indigo-500'
                }`}
              />
              <CreditCard className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            </div>
            {errors.cardNumber && (
              <p className="text-xs text-rose-400 mt-1">{errors.cardNumber}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                Expiration Date <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.cardExpiry}
                onChange={handleExpiryChange}
                placeholder="MM/YY"
                maxLength={5}
                className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border text-sm font-mono text-white placeholder-zinc-600 focus:outline-none transition-all ${
                  errors.cardExpiry
                    ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                    : 'border-white/10 focus:border-indigo-500'
                }`}
              />
              {errors.cardExpiry && (
                <p className="text-xs text-rose-400 mt-1">{errors.cardExpiry}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                Security Code (CVV) <span className="text-rose-400">*</span>
              </label>
              <input
                type="password"
                value={formData.cardCvv}
                onChange={handleCvvChange}
                placeholder="•••"
                maxLength={4}
                className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border text-sm font-mono text-white placeholder-zinc-600 focus:outline-none transition-all ${
                  errors.cardCvv
                    ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                    : 'border-white/10 focus:border-indigo-500'
                }`}
              />
              {errors.cardCvv && (
                <p className="text-xs text-rose-400 mt-1">{errors.cardCvv}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* UPI Payment Form */}
      {formData.paymentMethod === 'upi' && (
        <div className="space-y-4 p-5 rounded-2xl glass border border-white/10">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Virtual Payment Address (UPI ID) <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={formData.upiId}
              onChange={(e) => onChange('upiId', e.target.value)}
              placeholder="alex@okhdfcbank or username@upi"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                errors.upiId
                  ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                  : 'border-white/10 focus:border-indigo-500'
              }`}
            />
            {errors.upiId && (
              <p className="text-xs text-rose-400 mt-1">{errors.upiId}</p>
            )}
            <p className="text-[11px] text-zinc-500 mt-2">
              A payment authorization prompt will be dispatched instantly to your UPI application.
            </p>
          </div>
        </div>
      )}

      {/* Cash on Delivery Form */}
      {formData.paymentMethod === 'cod' && (
        <div className="p-5 rounded-2xl glass border border-white/10 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Banknote className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-zinc-100">Pay Upon Physical Arrival</h4>
              <p className="text-[11px] text-zinc-400">
                Please ensure exact cash or card machine payment is ready at delivery time.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Additional Notes */}
      <div>
        <label className="block text-xs font-medium text-zinc-400 mb-1.5">
          Delivery Instructions & Concierge Notes (Optional)
        </label>
        <textarea
          rows={2}
          value={formData.orderNotes}
          onChange={(e) => onChange('orderNotes', e.target.value)}
          placeholder="e.g. Leave with building front desk concierge or ring chime twice."
          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-all resize-none"
        />
      </div>
    </div>
  );
};
