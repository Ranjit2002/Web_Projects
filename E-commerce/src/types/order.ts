import { Address } from './user';

export type OrderStatus =
  | 'placed'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface OrderTimelineEvent {
  status: OrderStatus;
  label: string;
  description: string;
  timestamp: string;
  completed: boolean;
  location?: string;
}

export interface OrderItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface OrderPricing {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  promoCode?: string;
}

export interface PaymentDetails {
  method: 'card' | 'upi' | 'cod';
  transactionId: string;
  status: 'paid' | 'pending';
  last4?: string;
  cardBrand?: string;
  upiId?: string;
  paidAt?: string;
}

export interface Order {
  id: string; // e.g. ORD-2026-7842
  userId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  shippingAddress: Address;
  shippingMethod: 'standard' | 'express' | 'overnight';
  shippingCost: number;
  payment: PaymentDetails;
  pricing: OrderPricing;
  status: OrderStatus;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  timeline: OrderTimelineEvent[];
  createdAt: string;
  notes?: string;
}
