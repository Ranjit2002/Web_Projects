'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Printer,
  Receipt,
  MapPin,
  CreditCard,
  Phone,
  Mail,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { useOrders } from '@/context/OrderContext';
import { OrderTimeline } from '@/components/orders/OrderTimeline';
import { InvoiceModal } from '@/components/orders/InvoiceModal';
import { formatINR } from '@/utils/currency';

interface OrderTrackingPageProps {
  params: Promise<{ id: string }>;
}

export default function OrderTrackingPage({ params }: OrderTrackingPageProps) {
  const resolvedParams = use(params);
  const { getOrderById } = useOrders();
  const [invoiceOpen, setInvoiceOpen] = useState(false);

  const order = getOrderById(resolvedParams.id);

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Order Record Not Found</h2>
        <p className="text-sm text-zinc-400">
          We could not locate transaction records for order reference: {resolvedParams.id}
        </p>
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> View All Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Bar with back link and print invoice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <Link
            href="/orders"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Order History
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-white tracking-tight font-mono">
              {order.id}
            </h1>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              Verified Order
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Confirmed on {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        <button
          onClick={() => setInvoiceOpen(true)}
          className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-2 border border-white/10 transition-colors self-start sm:self-auto shadow-sm"
        >
          <Receipt className="w-4 h-4 text-indigo-400" />
          View Tax Invoice & Receipt
        </button>
      </div>

      {/* Main Fulfillment Timeline Section */}
      <OrderTimeline order={order} />

      {/* Order Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Items Purchased */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white pb-3 border-b border-white/10">
              Purchased Equipment ({order.items.length})
            </h3>

            <div className="divide-y divide-white/5">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <Link
                        href={`/product/${item.slug}`}
                        className="text-sm font-semibold text-zinc-100 hover:text-indigo-300 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {item.selectedColor ? `Finish: ${item.selectedColor}` : 'Standard'}
                        {item.selectedSize ? ` • Size: ${item.selectedSize}` : ''}
                      </p>
                      <span className="text-[11px] text-zinc-500 font-mono">
                        Qty: {item.quantity} • {formatINR(item.price)} each
                      </span>
                    </div>
                  </div>

                  <span className="text-sm font-bold text-white font-mono">
                    {formatINR(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing Ledger */}
            <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal:</span>
                <span className="text-zinc-200">{formatINR(order.pricing.subtotal)}</span>
              </div>
              {order.pricing.discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Promotional Discount:</span>
                  <span>-{formatINR(order.pricing.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>Carrier Transit ({order.shippingMethod}):</span>
                <span className="text-zinc-200">
                  {order.pricing.shipping === 0 ? 'FREE' : formatINR(order.pricing.shipping)}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Estimated GST (18%):</span>
                <span className="text-zinc-200">{formatINR(order.pricing.tax)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                <span>Total Settled:</span>
                <span className="text-gradient">{formatINR(order.pricing.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Destination & Payment Meta */}
        <div className="lg:col-span-5 space-y-6">
          {/* Shipping Address */}
          <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4" /> Destination Address
            </div>
            <div className="text-xs text-zinc-300 space-y-1">
              <p className="font-bold text-white text-sm">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.street1}</p>
              {order.shippingAddress.street2 && <p>{order.shippingAddress.street2}</p>}
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.country}</p>
              <p className="text-zinc-400 pt-1">Contact: {order.shippingAddress.phone}</p>
            </div>
          </div>

          {/* Payment Details */}
          <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <CreditCard className="w-4 h-4" /> Settlement Details
            </div>
            <div className="text-xs text-zinc-300 space-y-1">
              <p className="font-semibold text-white">
                {order.payment.method === 'card'
                  ? `Card ending in ${order.payment.last4 || '4242'}`
                  : order.payment.method === 'upi'
                  ? `UPI ID: ${order.payment.upiId || 'Verified'}`
                  : 'Cash on Delivery'}
              </p>
              <p className="text-zinc-400 font-mono text-[11px]">
                Transaction ID: {order.payment.transactionId}
              </p>
              <p className="text-emerald-400 font-semibold uppercase text-[11px]">
                Status: {order.payment.status}
              </p>
            </div>
          </div>

          {/* Support Assist */}
          <div className="p-5 rounded-2xl glass border border-white/5 text-xs text-zinc-400 space-y-2">
            <div className="flex items-center gap-2 text-zinc-200 font-semibold">
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              Need Assistance with this Shipment?
            </div>
            <p className="text-[11px] leading-relaxed">
              Our concierge team is available 24/7 for rerouting requests, delivery signature modifications, or warranty inquiries.
            </p>
          </div>
        </div>
      </div>

      {/* Invoice Receipt Modal */}
      <InvoiceModal
        order={order}
        isOpen={invoiceOpen}
        onClose={() => setInvoiceOpen(false)}
      />
    </div>
  );
}
