'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, OrderStatus, OrderTimelineEvent } from '@/types/order';
import { MOCK_ORDERS } from '@/data/mockOrders';
import { useProducts } from './ProductContext';

interface CreateOrderPayload {
  userId: string;
  customerName: string;
  customerEmail: string;
  items: Order['items'];
  shippingAddress: Order['shippingAddress'];
  shippingMethod: Order['shippingMethod'];
  shippingCost: number;
  payment: Order['payment'];
  pricing: Order['pricing'];
  notes?: string;
}

interface OrderContextType {
  orders: Order[];
  createOrder: (payload: CreateOrderPayload) => Order;
  getOrderById: (id: string) => Order | undefined;
  getUserOrders: (userId: string) => Order[];
  advanceOrderStatus: (orderId: string) => void;
  cancelOrder: (orderId: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const ORDERS_STORAGE_KEY = 'aether_orders_store_v3';

const STATUS_PROGRESSION: OrderStatus[] = [
  'placed',
  'processing',
  'shipped',
  'out_for_delivery',
  'delivered',
];

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const { reduceStock } = useProducts();

  useEffect(() => {
    try {
      localStorage.removeItem('aether_orders_store');
      localStorage.removeItem('aether_orders_store_v2');
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (stored) {
        setOrders(JSON.parse(stored));
      } else {
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(MOCK_ORDERS));
      }
    } catch (e) {
      console.error('Failed to load orders from storage', e);
    }
  }, []);

  const saveOrders = (updated: Order[]) => {
    setOrders(updated);
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save orders to storage', e);
    }
  };

  const createOrder = (payload: CreateOrderPayload): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `ORD-2026-${randomSuffix}`;

    // Indian Delivery Partners
    const carrier =
      payload.shippingMethod === 'express'
        ? 'Blue Dart Apex Air'
        : payload.shippingMethod === 'overnight'
        ? 'DTDC Priority Air Same-Day'
        : 'Delhivery Surface Express';

    const trackingPrefix =
      payload.shippingMethod === 'express'
        ? 'BD'
        : payload.shippingMethod === 'overnight'
        ? 'DTDC'
        : 'DLV';

    const trackingNum = `${trackingPrefix}-${Math.floor(100000000 + Math.random() * 900000000)}`;

    const now = new Date();
    const estDelivery = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const timeline: OrderTimelineEvent[] = [
      {
        status: 'placed',
        label: 'Order Confirmed',
        description: 'Payment authorized and receipt dispatched to email',
        timestamp: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
        completed: true,
        location: `${payload.shippingAddress.city}, ${payload.shippingAddress.state}`,
      },
      {
        status: 'processing',
        label: 'Quality Inspection & Packaging',
        description: 'Eco-packaged with verified serial tracking',
        timestamp: 'Estimated within 12 hours',
        completed: false,
      },
      {
        status: 'shipped',
        label: 'Handed to Carrier',
        description: `Dispatched via ${carrier}`,
        timestamp: 'Pending dispatch',
        completed: false,
      },
      {
        status: 'out_for_delivery',
        label: 'Out for Delivery',
        description: 'Loaded onto local courier vehicle for delivery',
        timestamp: 'Pending dispatch',
        completed: false,
      },
      {
        status: 'delivered',
        label: 'Delivered',
        description: 'Delivered to recipient address',
        timestamp: 'Pending arrival',
        completed: false,
      },
    ];

    const newOrder: Order = {
      id: orderId,
      userId: payload.userId,
      customerName: payload.customerName,
      customerEmail: payload.customerEmail,
      items: payload.items,
      shippingAddress: payload.shippingAddress,
      shippingMethod: payload.shippingMethod,
      shippingCost: payload.shippingCost,
      payment: payload.payment,
      pricing: payload.pricing,
      status: 'placed',
      trackingNumber: trackingNum,
      carrier: carrier,
      estimatedDelivery: estDelivery,
      timeline,
      createdAt: now.toISOString(),
      notes: payload.notes,
    };

    // Deduct stock for each ordered item in real-time!
    payload.items.forEach((item) => {
      reduceStock(item.productId, item.quantity);
    });

    const updated = [newOrder, ...orders];
    saveOrders(updated);
    return newOrder;
  };

  const getOrderById = (id: string) => {
    return orders.find((o) => o.id === id);
  };

  const getUserOrders = (userId: string) => {
    return orders.filter((o) => o.userId === userId);
  };

  const advanceOrderStatus = (orderId: string) => {
    const updated = orders.map((order) => {
      if (order.id !== orderId) return order;

      const currentIdx = STATUS_PROGRESSION.indexOf(order.status);
      if (currentIdx === -1 || currentIdx >= STATUS_PROGRESSION.length - 1) {
        return order; // Already at delivered
      }

      const nextStatus = STATUS_PROGRESSION[currentIdx + 1];
      const now = new Date();
      const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      const updatedTimeline = order.timeline.map((evt) => {
        if (evt.status === nextStatus) {
          return {
            ...evt,
            completed: true,
            timestamp: timeStr,
          };
        }
        return evt;
      });

      return {
        ...order,
        status: nextStatus,
        timeline: updatedTimeline,
      };
    });

    saveOrders(updated);
  };

  const cancelOrder = (orderId: string) => {
    const updated = orders.map((order) => {
      if (order.id !== orderId) return order;
      return {
        ...order,
        status: 'cancelled' as OrderStatus,
      };
    });
    saveOrders(updated);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrderById,
        getUserOrders,
        advanceOrderStatus,
        cancelOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
