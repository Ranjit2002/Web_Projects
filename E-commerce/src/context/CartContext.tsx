'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Product } from '@/types/product';
import { CartItem, ShippingMethodId } from '@/types/checkout';

interface PromoCode {
  code: string;
  discountPercent?: number;
  fixedDiscount?: number;
  freeShipping?: boolean;
}

const AVAILABLE_PROMOS: Record<string, PromoCode> = {
  TECH20: { code: 'TECH20', discountPercent: 20 },
  SAVE1000: { code: 'SAVE1000', fixedDiscount: 1000 },
  FREESHIP: { code: 'FREESHIP', freeShipping: true },
};

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  taxAmount: number;
  totalAmount: number;
  shippingMethod: ShippingMethodId;
  appliedPromo: PromoCode | null;
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setShippingMethod: (method: ShippingMethodId) => void;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'aether_cart_items';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethodId>('standard');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const isLoaded = useRef(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    } finally {
      isLoaded.current = true;
    }
  }, []);

  // Sync to localStorage whenever items state changes (pure effect)
  useEffect(() => {
    if (!isLoaded.current) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [items]);

  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    const compositeId = `${product.id}-${color || 'default'}-${size || 'default'}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === compositeId);
      if (existingIndex > -1) {
        const existing = prev[existingIndex];
        const newQty = Math.min(product.stockCount, existing.quantity + quantity);
        const updated = [...prev];
        updated[existingIndex] = { ...existing, quantity: newQty };
        return updated;
      } else {
        const newItem: CartItem = {
          id: compositeId,
          productId: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.images[0],
          quantity: Math.min(product.stockCount, quantity),
          stockCount: product.stockCount,
          selectedColor: color,
          selectedSize: size,
        };
        return [...prev, newItem];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.min(item.stockCount, quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
  };

  const applyPromo = (codeStr: string) => {
    const cleanCode = codeStr.trim().toUpperCase();
    const found = AVAILABLE_PROMOS[cleanCode];
    if (found) {
      setAppliedPromo(found);
      return { success: true, message: `Promo code "${cleanCode}" applied successfully!` };
    }
    return { success: false, message: 'Invalid promo code. Try TECH20, SAVE1000, or FREESHIP' };
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  // Pricing calculations
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountPercent) {
      discountAmount = Math.round((subtotal * appliedPromo.discountPercent) / 100);
    } else if (appliedPromo.fixedDiscount) {
      discountAmount = Math.min(subtotal, appliedPromo.fixedDiscount);
    }
  }

  let rawShipping = 0;
  if (shippingMethod === 'express') rawShipping = 499;
  if (shippingMethod === 'overnight') rawShipping = 999;
  if (appliedPromo?.freeShipping) rawShipping = 0;
  const shippingCost = rawShipping;

  const taxAmount = Math.round((subtotal - discountAmount) * 0.18);
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingCost + taxAmount);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        discountAmount,
        shippingCost,
        taxAmount,
        totalAmount,
        shippingMethod,
        appliedPromo,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setShippingMethod,
        applyPromo,
        removePromo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
