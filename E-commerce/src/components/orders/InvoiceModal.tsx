'use client';

import React from 'react';
import { X, Printer, Sparkles, CheckCircle2 } from 'lucide-react';
import { Order } from '@/types/order';
import { formatINR } from '@/utils/currency';

interface InvoiceModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-zinc-950 border border-white/20 rounded-3xl p-6 sm:p-10 text-zinc-100 shadow-2xl max-h-[90vh] overflow-y-auto print:p-0 print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Actions bar (hidden in print) */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 print:hidden">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Official Purchase Receipt & Tax Invoice
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Header */}
        <div className="py-6 flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-wider">AETHER ATELIER</span>
            </div>
            <p className="text-xs text-zinc-400">
              Hardware Systems & Precision Living
              <br />
              VAT ID: US-94820194 • support@aether.store
            </p>
          </div>

          <div className="sm:text-right space-y-1">
            <h2 className="text-lg font-bold text-indigo-400 font-mono">{order.id}</h2>
            <p className="text-xs text-zinc-400">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p className="text-xs text-zinc-400">Status: <span className="font-semibold text-emerald-400 uppercase">{order.status}</span></p>
            <p className="text-xs text-zinc-400 font-mono">TXN: {order.payment.transactionId}</p>
          </div>
        </div>

        {/* Recipient & Payment Method info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-y border-white/10 text-xs">
          <div>
            <span className="font-bold text-zinc-300 uppercase tracking-wider block mb-2">
              Billed & Shipped To:
            </span>
            <p className="font-semibold text-zinc-100">{order.customerName}</p>
            <p className="text-zinc-400">{order.shippingAddress.street1}</p>
            {order.shippingAddress.street2 && (
              <p className="text-zinc-400">{order.shippingAddress.street2}</p>
            )}
            <p className="text-zinc-400">
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
            </p>
            <p className="text-zinc-400">{order.shippingAddress.country}</p>
            <p className="text-zinc-400 mt-1">Contact: {order.customerEmail}</p>
          </div>

          <div className="sm:text-right">
            <span className="font-bold text-zinc-300 uppercase tracking-wider block mb-2">
              Payment Information:
            </span>
            <p className="font-semibold text-zinc-100">
              {order.payment.method === 'card'
                ? `${order.payment.cardBrand || 'Card'} (ending in ${order.payment.last4 || '4242'})`
                : order.payment.method === 'upi'
                ? `Instant UPI (${order.payment.upiId || 'Verified'})`
                : 'Cash on Delivery (Pending)'}
            </p>
            <p className="text-zinc-400">Authorization Status: {order.payment.status.toUpperCase()}</p>
            <p className="text-zinc-400">Carrier: {order.carrier}</p>
            <p className="text-zinc-400 font-mono">Tracking: {order.trackingNumber}</p>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="py-6">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400">
                <th className="py-2 font-medium">Item Description</th>
                <th className="py-2 font-medium text-center">Qty</th>
                <th className="py-2 font-medium text-right">Price</th>
                <th className="py-2 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {order.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-3">
                    <p className="font-semibold text-zinc-100">{item.name}</p>
                    <p className="text-[11px] text-zinc-400">
                      {item.selectedColor ? `Color: ${item.selectedColor}` : ''}
                      {item.selectedSize ? ` • Size: ${item.selectedSize}` : ''}
                    </p>
                  </td>
                  <td className="py-3 text-center text-zinc-300">{item.quantity}</td>
                  <td className="py-3 text-right text-zinc-300">{formatINR(item.price)}</td>
                  <td className="py-3 text-right font-semibold text-zinc-100">
                    {formatINR(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pricing totals */}
        <div className="border-t border-white/10 pt-4 flex justify-end">
          <div className="w-full sm:w-64 space-y-2 text-xs">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal:</span>
              <span className="text-zinc-200">{formatINR(order.pricing.subtotal)}</span>
            </div>
            {order.pricing.discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount:</span>
                <span>-{formatINR(order.pricing.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-zinc-400">
              <span>Shipping:</span>
              <span className="text-zinc-200">
                {order.pricing.shipping === 0 ? 'FREE' : formatINR(order.pricing.shipping)}
              </span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Estimated GST (18%):</span>
              <span className="text-zinc-200">{formatINR(order.pricing.tax)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
              <span>Grand Total:</span>
              <span className="text-indigo-400 font-mono">{formatINR(order.pricing.total)}</span>
            </div>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="mt-8 pt-4 border-t border-white/10 text-center text-[11px] text-zinc-500">
          Thank you for choosing Aether Atelier. All hardware components include our 2-Year Limited Manufacturer Warranty.
        </div>
      </div>
    </div>
  );
};
