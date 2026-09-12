export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface ProductAttribute {
  name: string;
  values: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: 'Audio' | 'Wearables' | 'Computing' | 'Accessories' | 'Living';
  tags: string[];
  images: string[];
  stockCount: number;
  inStock: boolean;
  sku: string;
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  specs?: Record<string, string>;
  features?: string[];
  reviews?: ProductReview[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
}

export type SortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'newest';

export interface ProductFilters {
  category?: string;
  searchQuery?: string;
  priceRange?: [number, number];
  inStockOnly?: boolean;
  minRating?: number;
  sortBy?: SortOption;
}
