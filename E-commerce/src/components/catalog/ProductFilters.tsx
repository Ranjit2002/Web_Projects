'use client';

import React from 'react';
import { Search, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';
import { ProductFilters as FiltersType, SortOption } from '@/types/product';

interface ProductFiltersProps {
  categories: string[];
  filters: FiltersType;
  onFilterChange: (updated: FiltersType) => void;
  onReset: () => void;
  totalResults: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  filters,
  onFilterChange,
  onReset,
  totalResults,
}) => {
  return (
    <div className="w-full space-y-6">
      {/* Top control bar with Search & Sort */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass p-4 rounded-2xl border border-white/10">
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={filters.searchQuery || ''}
            onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
            placeholder="Search audio, titanium watches, accessories..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Results count & Sort select */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <span className="text-xs font-medium text-zinc-400">
            Showing <strong className="text-zinc-200">{totalResults}</strong> items
          </span>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 hidden sm:inline">Sort:</span>
            <select
              value={filters.sortBy || 'featured'}
              onChange={(e) =>
                onFilterChange({ ...filters, sortBy: e.target.value as SortOption })
              }
              aria-label="Sort products by"
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-medium text-zinc-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="featured" className="bg-zinc-900 text-white">Featured</option>
              <option value="newest" className="bg-zinc-900 text-white">Newest</option>
              <option value="price-asc" className="bg-zinc-900 text-white">Price: Low to High</option>
              <option value="price-desc" className="bg-zinc-900 text-white">Price: High to Low</option>
              <option value="rating" className="bg-zinc-900 text-white">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Tabs & Quick Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => {
            const isSelected = (filters.category || 'All') === cat;
            return (
              <button
                key={cat}
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    category: cat === 'All' ? undefined : cat,
                  })
                }
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Quick Toggles */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer select-none bg-white/5 px-3 py-1.5 rounded-full border border-white/5 hover:border-white/10 transition-colors">
            <input
              type="checkbox"
              checked={filters.inStockOnly || false}
              onChange={(e) =>
                onFilterChange({ ...filters, inStockOnly: e.target.checked })
              }
              className="sr-only"
            />
            <div
              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                filters.inStockOnly
                  ? 'bg-indigo-600 border-indigo-600 text-white'
                  : 'border-zinc-500 bg-transparent'
              }`}
            >
              {filters.inStockOnly && <Check className="w-3 h-3" />}
            </div>
            <span className="text-xs font-medium text-zinc-300">In Stock Only</span>
          </label>

          {(filters.category ||
            filters.searchQuery ||
            filters.inStockOnly ||
            filters.sortBy !== 'featured') && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-400 hover:text-zinc-200 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
