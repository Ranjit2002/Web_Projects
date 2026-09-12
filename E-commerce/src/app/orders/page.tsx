'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  Receipt,
  Search,
} from 'lucide-react';
import { useOrders } from '@/context/OrderContext';
import { useAuth } from '@/context/AuthContext';
import { Order, OrderStatus } from '@/types/order';
import { InvoiceModal } from '@/components/orders/InvoiceModal';
import { formatINR } from '@/utils/currency';

export default function OrdersPage() {
  const { orders } = useOrders();
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  // Filter orders by active user if authenticated, or show all for demo
  const userOrders = user
    ? orders.filter((o) => o.userId === user.id || o.customerEmail === user.email)
    : orders;

  const filteredOrders = (userOrders.length > 0 ? userOrders : orders).filter((order) => {
    if (statusFilter !== 'all' && order.status !== statusFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = order.id.toLowerCase().includes(q);
      const matchTracking = order.trackingNumber.toLowerCase().includes(q);
      const matchItem = order.items.some((i) => i.name.toLowerCase().includes(q));
      if (!matchId && !matchTracking && !matchItem) return false;
    }
    return true;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'shipped':
      case 'out_for_delivery':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
      case 'processing':
      case 'placed':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      case 'cancelled':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      default:
        return 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Orders & Transaction Ledger
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span className="text-xs text-zinc-400">Carrier Logistics Sync</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Order History & Live Tracking
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Monitor real-time fulfillment milestones and access itemized tax invoices.
          </p>
        </div>

        <Link
          href="/catalog"
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/10 self-start sm:self-auto transition-colors"
        >
          Browse Equipment
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass p-4 rounded-2xl border border-white/10">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'placed', label: 'Placed' },
            { id: 'processing', label: 'Processing' },
            { id: 'shipped', label: 'Shipped' },
            { id: 'delivered', label: 'Delivered' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                statusFilter === tab.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search by Order ID or Tracking */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Order ID or tracking..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Order Cards List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="glass-card rounded-3xl p-6 border border-white/10 space-y-6 hover:border-indigo-500/30 transition-all duration-200"
            >
              {/* Order Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-white font-mono">{order.id}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      {order.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Placed on {new Date(order.createdAt).toLocaleDateString()} • {order.items.length}{' '}
                    {order.items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setSelectedInvoiceOrder(order)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Receipt className="w-3.5 h-3.5" />
                    Invoice Receipt
                  </button>

                  <Link
                    href={`/orders/${order.id}`}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-colors"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    Track Shipment
                  </Link>
                </div>
              </div>

              {/* Items Preview Row */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-white/5 border border-white/10 p-2 rounded-2xl pr-4"
                    >
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-900 flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="max-w-[180px]">
                        <h4 className="text-xs font-semibold text-zinc-100 truncate">{item.name}</h4>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          Qty: {item.quantity} • {formatINR(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-right self-end md:self-center">
                  <span className="text-xs text-zinc-400 block">Total Amount</span>
                  <span className="text-lg font-bold text-white font-mono">
                    {formatINR(order.pricing.total)}
                  </span>
                </div>
              </div>

              {/* Courier and Destination Footer Bar */}
              <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between text-xs text-zinc-400 gap-2">
                <div>
                  Carrier: <strong className="text-zinc-200">{order.carrier}</strong> • Tracking Code:{' '}
                  <span className="font-mono text-indigo-400">{order.trackingNumber}</span>
                </div>
                <div>
                  Deliver to: <span className="text-zinc-200">{order.shippingAddress.city}, {order.shippingAddress.state}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 text-center rounded-3xl glass border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 mx-auto">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No Orders Found</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            You currently have no recorded orders matching this filter. Browse our catalog to place your first order.
          </p>
          <Link
            href="/catalog"
            className="inline-block px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
          >
            Explore Hardware Catalog
          </Link>
        </div>
      )}

      {/* Printable Invoice Modal */}
      {selectedInvoiceOrder && (
        <InvoiceModal
          order={selectedInvoiceOrder}
          isOpen={!!selectedInvoiceOrder}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      )}
    </div>
  );
}
