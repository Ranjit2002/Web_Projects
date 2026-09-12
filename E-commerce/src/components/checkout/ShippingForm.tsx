'use client';

import React from 'react';
import { Truck, MapPin, User as UserIcon, Mail, Phone, BookmarkPlus } from 'lucide-react';
import { CheckoutFormData, CheckoutFormErrors, ShippingMethodId } from '@/types/checkout';
import { useAuth } from '@/context/AuthContext';
import { Address } from '@/types/user';

interface ShippingFormProps {
  formData: CheckoutFormData;
  errors: CheckoutFormErrors;
  onChange: (field: keyof CheckoutFormData, value: any) => void;
  onAutofillAddress: (address: Address) => void;
}

export const ShippingForm: React.FC<ShippingFormProps> = ({
  formData,
  errors,
  onChange,
  onAutofillAddress,
}) => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Autofill from saved profile address button if available */}
      {user && user.addresses && user.addresses.length > 0 && (
        <div className="glass p-4 rounded-2xl border border-indigo-500/20 bg-indigo-500/5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <div>
                <span className="text-xs font-semibold text-zinc-100">
                  Saved Addresses Available
                </span>
                <p className="text-[11px] text-zinc-400">
                  Select a saved location from your profile to autofill all shipping fields.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {user.addresses.map((addr) => (
                <button
                  key={addr.id}
                  type="button"
                  onClick={() => onAutofillAddress(addr)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-indigo-600 text-zinc-200 hover:text-white border border-white/10 hover:border-indigo-500 transition-all flex items-center gap-1.5"
                >
                  <BookmarkPlus className="w-3 h-3" />
                  Use {addr.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contact Information */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2 mb-4">
          <Mail className="w-4 h-4 text-indigo-400" />
          Contact Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Email Address <span className="text-rose-400">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="alex.mercer@example.com"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                errors.email
                  ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                  : 'border-white/10 focus:border-indigo-500'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-rose-400 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Phone Number <span className="text-rose-400">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              placeholder="+91 98200 12345"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                errors.phone
                  ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                  : 'border-white/10 focus:border-indigo-500'
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Shipping Destination */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2 mb-4">
          <MapPin className="w-4 h-4 text-indigo-400" />
          Shipping Address
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Recipient Full Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
              placeholder="Alex Mercer"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                errors.fullName
                  ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                  : 'border-white/10 focus:border-indigo-500'
              }`}
            />
            {errors.fullName && (
              <p className="text-xs text-rose-400 mt-1">{errors.fullName}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                Street Address Line 1 <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.street1}
                onChange={(e) => onChange('street1', e.target.value)}
                placeholder="Flat 1402, Sea Breeze Towers, Bandra West"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                  errors.street1
                    ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                    : 'border-white/10 focus:border-indigo-500'
                }`}
              />
              {errors.street1 && (
                <p className="text-xs text-rose-400 mt-1">{errors.street1}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                Apartment, Suite, Landmark (Optional)
              </label>
              <input
                type="text"
                value={formData.street2}
                onChange={(e) => onChange('street2', e.target.value)}
                placeholder="Near Mehboob Studio, BJ Road"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                City <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => onChange('city', e.target.value)}
                placeholder="Mumbai"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                  errors.city
                    ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                    : 'border-white/10 focus:border-indigo-500'
                }`}
              />
              {errors.city && (
                <p className="text-xs text-rose-400 mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                State / Region <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => onChange('state', e.target.value)}
                placeholder="Maharashtra"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                  errors.state
                    ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                    : 'border-white/10 focus:border-indigo-500'
                }`}
              />
              {errors.state && (
                <p className="text-xs text-rose-400 mt-1">{errors.state}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                PIN Code <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.postalCode}
                onChange={(e) => onChange('postalCode', e.target.value)}
                placeholder="400050"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-white/5 border text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                  errors.postalCode
                    ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                    : 'border-white/10 focus:border-indigo-500'
                }`}
              />
              {errors.postalCode && (
                <p className="text-xs text-rose-400 mt-1">{errors.postalCode}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                Country <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.country}
                onChange={(e) => onChange('country', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="India">India</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="Singapore">Singapore</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2.5 pt-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.saveAddressToProfile}
              onChange={(e) => onChange('saveAddressToProfile', e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-white/5 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-xs text-zinc-300">
              Save this delivery address to my account profile for future purchases
            </span>
          </label>
        </div>
      </div>

      {/* Shipping Method Selection */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2 mb-4">
          <Truck className="w-4 h-4 text-indigo-400" />
          Delivery Speed & Indian Delivery Partner
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              id: 'standard' as ShippingMethodId,
              title: 'Delhivery Surface Express',
              time: '3-4 Business Days (Pan-India)',
              priceText: 'Free',
            },
            {
              id: 'express' as ShippingMethodId,
              title: 'Blue Dart Apex Air',
              time: '1-2 Business Days (Priority Air)',
              priceText: '₹499',
            },
            {
              id: 'overnight' as ShippingMethodId,
              title: 'DTDC Priority Air Same-Day',
              time: 'Next Morning (Mumbai Metro & Express)',
              priceText: '₹999',
            },
          ].map((method) => {
            const isSelected = formData.shippingMethod === method.id;
            return (
              <label
                key={method.id}
                onClick={() => onChange('shippingMethod', method.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10'
                    : 'border-white/10 bg-white/[0.02] hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white">{method.title}</span>
                  <span
                    className={`text-xs font-semibold ${
                      method.id === 'standard' ? 'text-emerald-400' : 'text-zinc-200'
                    }`}
                  >
                    {method.priceText}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400">{method.time}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};
