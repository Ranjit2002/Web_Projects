'use client';

import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { ProductProvider } from '@/context/ProductContext';
import { CartProvider } from '@/context/CartContext';
import { OrderProvider } from '@/context/OrderContext';
import { ToastProvider } from '@/context/ToastContext';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ProductProvider>
          <AuthProvider>
            <CartProvider>
              <OrderProvider>{children}</OrderProvider>
            </CartProvider>
          </AuthProvider>
        </ProductProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};
