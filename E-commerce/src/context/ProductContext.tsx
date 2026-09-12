'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductFilters } from '@/types/product';
import { MOCK_PRODUCTS } from '@/data/mockProducts';

interface ProductContextType {
  products: Product[];
  categories: string[];
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;
  reduceStock: (productId: string, quantity: number) => void;
  resetInventory: () => void;
  filterProducts: (filters: ProductFilters) => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const PRODUCTS_STORAGE_KEY = 'aether_products_catalog_v3';

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  useEffect(() => {
    try {
      // Clear legacy storage caches
      localStorage.removeItem('aether_products_catalog');
      localStorage.removeItem('aether_products_catalog_v2');

      const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (stored) {
        setProducts(JSON.parse(stored));
      } else {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(MOCK_PRODUCTS));
      }
    } catch (e) {
      console.error('Error loading products from storage', e);
    }
  }, []);

  const saveProducts = (updated: Product[]) => {
    setProducts(updated);
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving products to storage', e);
    }
  };

  const getProductBySlug = (slug: string) => {
    return products.find((p) => p.slug === slug);
  };

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  const reduceStock = (productId: string, quantity: number) => {
    const updated = products.map((p) => {
      if (p.id === productId) {
        const newStock = Math.max(0, p.stockCount - quantity);
        return {
          ...p,
          stockCount: newStock,
          inStock: newStock > 0,
        };
      }
      return p;
    });
    saveProducts(updated);
  };

  const resetInventory = () => {
    saveProducts(MOCK_PRODUCTS);
  };

  const categories = ['All', ...Array.from(new Set(MOCK_PRODUCTS.map((p) => p.category)))];

  const filterProducts = (filters: ProductFilters): Product[] => {
    return products.filter((item) => {
      // Category filter
      if (filters.category && filters.category !== 'All') {
        if (item.category.toLowerCase() !== filters.category.toLowerCase()) {
          return false;
        }
      }

      // Search query
      if (filters.searchQuery && filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchTagline = item.tagline.toLowerCase().includes(q);
        const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
        const matchCategory = item.category.toLowerCase().includes(q);
        if (!matchName && !matchTagline && !matchTags && !matchCategory) {
          return false;
        }
      }

      // In-stock only
      if (filters.inStockOnly && !item.inStock) {
        return false;
      }

      // Price range
      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        if (item.price < min || item.price > max) {
          return false;
        }
      }

      // Min rating
      if (filters.minRating && item.rating < filters.minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        case 'featured':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        getProductBySlug,
        getProductById,
        reduceStock,
        resetInventory,
        filterProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
