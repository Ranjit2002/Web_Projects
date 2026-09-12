'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sparkles, RefreshCw, PackageX } from 'lucide-react';
import { useProducts } from '@/context/ProductContext';
import { ProductCard } from '@/components/catalog/ProductCard';
import { ProductFilters } from '@/components/catalog/ProductFilters';
import { ProductFilters as FiltersType } from '@/types/product';
import { useToast } from '@/context/ToastContext';

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || undefined;

  const { categories, filterProducts, resetInventory } = useProducts();
  const { toast } = useToast();

  const [filters, setFilters] = useState<FiltersType>({
    category: initialCategory,
    searchQuery: '',
    inStockOnly: false,
    sortBy: 'featured',
  });

  useEffect(() => {
    if (initialCategory) {
      setFilters((prev) => ({ ...prev, category: initialCategory }));
    }
  }, [initialCategory]);

  const filteredProducts = filterProducts(filters);

  const handleResetFilters = () => {
    setFilters({
      category: undefined,
      searchQuery: '',
      inStockOnly: false,
      sortBy: 'featured',
    });
  };

  const handleResetInventory = () => {
    resetInventory();
    toast('Product inventory stock counts have been reset to default', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Complete Equipment Roster
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span className="text-xs text-zinc-400">Live Inventory Synchronized</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Hardware & Acoustic Catalog
          </h1>
          <p className="text-sm text-zinc-400 mt-1 max-w-xl">
            Browse our full range of audiophile listening systems, machined titanium watches, and ergonomic computer interfaces.
          </p>
        </div>

        {/* Demo reset inventory button */}
        <button
          onClick={handleResetInventory}
          className="self-start md:self-auto px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-1.5"
          title="Reset all product stock levels back to default"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Demo Inventory
        </button>
      </div>

      {/* Filter and Control Toolbar */}
      <ProductFilters
        categories={categories}
        filters={filters}
        onFilterChange={setFilters}
        onReset={handleResetFilters}
        totalResults={filteredProducts.length}
      />

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="p-16 text-center rounded-3xl glass border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 mx-auto">
            <PackageX className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">No products match your criteria</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Try loosening your search keywords, disabling the "In Stock Only" toggle, or switching categories.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-zinc-400">Loading catalog...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
