'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Truck,
  Package,
  Home,
  Copy,
  Check,
  PlayCircle,
  ExternalLink,
} from 'lucide-react';
import { Order, OrderStatus } from '@/types/order';
import { useOrders } from '@/context/OrderContext';
import { useToast } from '@/context/ToastContext';

interface OrderTimelineProps {
  order: Order;
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ order }) => {
  const { advanceOrderStatus } = useOrders();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyTracking = () => {
    navigator.clipboard.writeText(order.trackingNumber);
    setCopied(true);
    toast('Tracking number copied to clipboard', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'placed':
        return Clock;
      case 'processing':
        return Package;
      case 'shipped':
        return Truck;
      case 'out_for_delivery':
        return Truck;
      case 'delivered':
        return Home;
      default:
        return CheckCircle2;
    }
  };

  const isCurrentOrPast = (eventCompleted: boolean) => eventCompleted;

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-8">
      {/* Top Header with Tracking Number and Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white">Tracking & Fulfillment</h2>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                order.status === 'delivered'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : order.status === 'cancelled'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
              }`}
            >
              {order.status.replace(/_/g, ' ')}
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Carrier: <strong className="text-zinc-200">{order.carrier}</strong> • Est. Arrival: <strong className="text-zinc-200">{order.estimatedDelivery}</strong>
          </p>
        </div>

        {/* Tracking number badge & Advance Demo Button */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-mono text-zinc-200">
            <span>{order.trackingNumber}</span>
            <button
              onClick={copyTracking}
              className="text-zinc-400 hover:text-white transition-colors"
              title="Copy tracking number"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {order.status !== 'delivered' && order.status !== 'cancelled' && (
            <button
              onClick={() => {
                advanceOrderStatus(order.id);
                toast('Advanced fulfillment status to next milestone!', 'success');
              }}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-md transition-all active:scale-95"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              Simulate Next Status
            </button>
          )}
        </div>
      </div>

      {/* Visual Step Progress Bar */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-white/10">
        {order.timeline.map((event, idx) => {
          const Icon = getStatusIcon(event.status);
          const isDone = event.completed;

          return (
            <div key={idx} className="relative flex items-start gap-4">
              {/* Timeline marker icon */}
              <div
                className={`absolute -left-6 sm:-left-8 top-0 w-6 sm:w-8 h-6 sm:h-8 rounded-full border flex items-center justify-center transition-all ${
                  isDone
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-zinc-900 border-white/10 text-zinc-600'
                }`}
              >
                <Icon className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              </div>

              {/* Event Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4
                    className={`text-sm font-semibold ${
                      isDone ? 'text-zinc-100' : 'text-zinc-500'
                    }`}
                  >
                    {event.label}
                  </h4>
                  <span
                    className={`text-[11px] font-mono ${
                      isDone ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                  >
                    {event.timestamp}
                  </span>
                </div>
                <p
                  className={`text-xs mt-1 leading-relaxed ${
                    isDone ? 'text-zinc-400' : 'text-zinc-600'
                  }`}
                >
                  {event.description}
                </p>
                {event.location && (
                  <span className="inline-block text-[11px] text-indigo-400/80 mt-1">
                    📍 {event.location}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
