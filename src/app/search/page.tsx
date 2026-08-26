'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TopAppBar } from '@/components/layout/TopAppBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { SearchBar } from '@/components/search/SearchBar';
import { CategoryGrid } from '@/components/search/CategoryGrid';
import { searchCategories, featuredRestaurants } from '@/lib/data/mock-data';
import type { NavItem } from '@/components/layout/BottomNav';
import { RestaurantCard } from '@/components/home/RestaurantCard';

// Filter options
const cuisineTypes = [
  'all', 'american', 'italian', 'japanese', 'chinese', 'indian', 'mexican', 'french', 'thai', 'korean'
];

const sortOptions = [
  { id: 'rating', label: 'التقييم' },
  { id: 'delivery_time', label: 'وقت التوصيل' },
  { id: 'price_low', label: 'السعر: منخفض' },
  { id: 'price_high', label: 'السعر: مرتفع' },
];

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeNav] = useState<NavItem>('search');
  const [activeCategory, setActiveCategory] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  
  // New filter states
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [selectedSort, setSelectedSort] = useState('rating');
  const [freeDeliveryOnly, setFreeDeliveryOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [priceRange, setPriceRange] = useState<[number, number]>(1, 4);

  // Get initial query from URL
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearchQuery(q);
    
    // Get filters from URL if any
    const cuisine = searchParams.get('cuisine');
    if (cuisine) setSelectedCuisine(cuisine);
  }, [searchParams]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}&cuisine=${selectedCuisine}`);
    }
  };

  const handleCategorySelect = (id: string) => {
    setActiveCategory(activeCategory === id ? undefined : id);
  };

  const handleRestaurantClick = (id: string) => {
    router.push(`/restaurant/${id}`);
  };

  // Apply all filters to restaurants
  const getFilteredRestaurants = () => {
    let filtered = [...featuredRestaurants];
    
    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r => 
        r.name.toLowerCase().includes(query) || 
        r.cuisine.toLowerCase().includes(query) ||
        r.tags.some(t => t.toLowerCase().includes(query))
      );
    }
    
    // Category filter (if active)
    if (activeCategory) {
      const categoryMap: Record<string, string> = {
        'halal': 'american',
        'asian': 'japanese',
        'healthy': 'american',
        'fast-food': 'american',
        'desserts': 'italian',
        'drinks': 'japanese',
      };
      const mappedCuisine = categoryMap[activeCategory];
      if (mappedCuisine && selectedCuisine === 'all') {
        filtered = filtered.filter(r => r.cuisine.toLowerCase().includes(mappedCuisine));
      }
    }
    
    // Cuisine type filter
    if (selectedCuisine !== 'all') {
      filtered = filtered.filter(r => 
        r.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase())
      );
    }
    
    // Free delivery filter
    if (freeDeliveryOnly) {
      filtered = filtered.filter(r => r.hasFreeDelivery || r.deliveryFee === 0);
    }
    
    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter(r => r.rating >= minRating);
    }
    
    // Price range filter (mock - using delivery fee as proxy)
    // In real app, would use restaurant.priceRange
    
    // Sort results
    switch (selectedSort) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'delivery_time':
        // Parse "20-30 min" format and sort by min time
        filtered.sort((a, b) => {
          const aMin = parseInt(a.deliveryTime.split('-')[0]) || 30;
          const bMin = parseInt(b.deliveryTime.split('-')[0]) || 30;
          return aMin - bMin;
        });
        break;
      case 'price_low':
        filtered.sort((a, b) => a.deliveryFee - b.deliveryFee);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.deliveryFee - a.deliveryFee);
        break;
    }
    
    return filtered;
  };

  const filteredRestaurants = getFilteredRestaurants();
  const hasActiveFilters = searchQuery || activeCategory || selectedCuisine !== 'all' || freeDeliveryOnly || minRating > 0;

  const clearAllFilters = () => {
    setSearchQuery('');
    setActiveCategory(undefined);
    setSelectedCuisine('all');
    setSelectedSort('rating');
    setFreeDeliveryOnly(false);
    setMinRating(0);
    setPriceRange([1, 4]);
    router.push('/search');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top App Bar */}
      <TopAppBar 
        onMenuClick={() => console.log('Menu')}
        onCartClick={() => router.push('/cart')}
      />
      
      {/* Main Content - Extra top padding for breathing room */}
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop pt-8 md:pt-12 pb-24 md:pb-xl flex flex-col gap-8 md:gap-10">
        {/* Search Section */}
        <section className="w-full relative mt-4 md:mt-6">
          <SearchBar 
            value={searchQuery}
            onSearch={handleSearch}
            onFilterClick={() => setShowFilters(!showFilters)}
          />
        </section>

        {/* Filters Panel */}
        {showFilters && (
          <section className="bg-surface rounded-xl p-4 border border-surface-variant animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-title-lg text-title-lg text-on-background">فلتر النتائج</h3>
              <button
                onClick={clearAllFilters}
                className="text-sm text-primary hover:text-primary-container font-semibold"
              >
                مسح الكل
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Cuisine Type */}
              <div>
                <label className="font-label-md text-label-md text-on-surface-variant block mb-2">نوع المطبخ</label>
                <select
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-surface-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                >
                  {cuisineTypes.map(cuisine => (
                    <option key={cuisine} value={cuisine}>
                      {cuisine === 'all' ? 'الكل' : cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="font-label-md text-label-md text-on-surface-variant block mb-2">ترتيب حسب</label>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-surface-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="font-label-md text-label-md text-on-surface-variant block mb-2">التقييم الأدنى</label>
                <div className="flex gap-2">
                  {[0, 3, 4, 4.5].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`flex-1 py-2 rounded-lg border text-xs font-medium transition-all ${
                        minRating === rating
                          ? 'border-primary bg-primary text-on-primary'
                          : 'border-surface-variant hover:border-surface-container-high'
                      }`}
                    >
                      {rating === 0 ? 'الكل' : `${rating}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Filters */}
              <div>
                <label className="font-label-md text-label-md text-on-surface-variant block mb-2">فلاتر سريعة</label>
                <button
                  onClick={() => setFreeDeliveryOnly(!freeDeliveryOnly)}
                  className={`w-full py-2 px-3 rounded-lg border text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    freeDeliveryOnly
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-surface-variant hover:border-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">
                    {freeDeliveryOnly ? 'check_circle' : 'local_shipping'}
                  </span>
                  توصيل مجاني فقط
                </button>
              </div>
            </div>

            {/* Active Filters Summary */}
            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t border-surface-variant">
                <p className="text-sm text-secondary mb-2">
                  تم العثور على <strong>{filteredRestaurants.length}</strong> مطعم
                </p>
                <div className="flex flex-wrap gap-2">
                  {searchQuery && (
                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      بحث: "{searchQuery}"
                      <button onClick={() => setSearchQuery('')} className="hover:text-error">×</button>
                    </span>
                  )}
                  {activeCategory && (
                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      {activeCategory}
                      <button onClick={() => setActiveCategory(undefined)} className="hover:text-error">×</button>
                    </span>
                  )}
                  {selectedCuisine !== 'all' && (
                    <span className="bg-secondary/10 text-secondary text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      {selectedCuisine}
                      <button onClick={() => setSelectedCuisine('all')} className="hover:text-error">×</button>
                    </span>
                  )}
                  {freeDeliveryOnly && (
                    <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      مجاني
                      <button onClick={() => setFreeDeliveryOnly(false)} className="hover:text-red-500">×</button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Featured Promo Banner - Dark Frosted Glass Design */}
        <section 
          className="w-full rounded-2xl overflow-hidden relative h-72 md:h-80 shadow-[0_8px_30px_0_rgba(0,0,0,0.3)] isolate group cursor-pointer mb-10 md:mb-12"
          onClick={() => router.push('/search?category=trending')}
        >
          {/* Background Image - Full Coverage */}
          <div 
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-1000 ease-out"
            style={{
              backgroundImage: `url('/images/fresh-bowls-banner.jpg')`
            }}
          />
          
          {/* Dark Semi-transparent Overlay - Lighter Effect */}
          <div className="absolute inset-0 bg-black/40 -z-0" />
          
          {/* Subtle gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-gray-900/20 -z-0" />
          
          {/* Content Layer - White text on dark with better spacing */}
          <div className="relative h-full flex flex-col justify-center p-8 md:p-10">
            <span className="inline-block gradient-primary text-white font-label-lg text-label-lg px-5 py-2.5 rounded-full w-max mb-5 uppercase tracking-wider shadow-glow animate-pulse">
              🔥 Trending Now
            </span>
            <h2 className="font-headline-xl-mobile md:font-headline-xl text-white mb-4 drop-shadow-lg">
              Fresh & Delicious
            </h2>
            <p className="font-body-lg text-body-lg text-white/80 max-w-md leading-relaxed">
              اكتشف أطباق طازجة ولذيذة قريب منك 🍽️
            </p>
            
            {/* Decorative element */}
            <div className="absolute bottom-8 right-8 md:bottom-10 md:right-10 opacity-10">
              <span className="material-symbols-outlined text-[120px] md:text-[160px] text-white">restaurant</span>
            </div>
          </div>
        </section>

        {/* Categories Grid - Only show if categories exist */}
        {searchCategories.length > 0 && (
          <section className="w-full flex flex-col gap-md">
            <h2 className="font-headline-md text-headline-md text-on-background">
              Explore Categories
            </h2>
            <CategoryGrid 
              categories={searchCategories}
              activeCategory={activeCategory}
              onSelect={handleCategorySelect}
            />
          </section>
        )}

        {/* Results Section */}
        <section className="flex flex-col gap-xl mt-6">
          <div className="flex justify-between items-end">
            <h2 className="font-headline-md text-headline-md text-on-background">
              {hasActiveFilters ? 'نتائج البحث' : 'المطاعم المميزة'}
            </h2>
            
            {/* Results count & view toggle */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-secondary">
                {filteredRestaurants.length} مطعم
              </span>
              <div className="hidden md:flex gap-2">
                <button className="p-2 rounded-lg bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-lg">grid_view</span>
                </button>
                <button className="p-2 rounded-lg hover:bg-surface-container-high text-secondary">
                  <span className="material-symbols-outlined text-lg">list</span>
                </button>
              </div>
            </div>
          </div>

          {/* Restaurants Grid or Empty State */}
          {filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={handleRestaurantClick}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 bg-surface-container-lowest rounded-xl">
              <span className="material-symbols-outlined text-7xl text-surface-container-highest mb-4 block">
                search_off
              </span>
              <h3 className="font-title-lg text-title-lg text-on-background mb-2">
                لا توجد نتائج
              </h3>
              <p className="font-body-md text-body-md text-secondary mb-6 max-w-md mx-auto">
                لم نتمكن من العثور على أي مطاعم تطابق معايير البحث.
                جرب تغيير الفلترات أو البحث بكلمات مختلفة.
              </p>
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center gap-2 bg-primary text-on-primary font-semibold px-6 py-3 rounded-full hover:bg-primary-container transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">refresh</span>
                مسح الفلترات
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeItem="search" />
    </div>
  );
}

// Loading fallback for Suspense
function SearchLoading() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopAppBar onMenuClick={() => {}} />
      <main className="flex-1 max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-xl">
        <div className="animate-pulse space-y-8">
          {/* Search skeleton */}
          <div className="h-14 bg-surface-container-low rounded-xl" />
          {/* Banner skeleton */}
          <div className="h-48 bg-surface-container-low rounded-xl" />
          {/* Categories skeleton */}
          <div>
            <div className="h-8 bg-surface-container-low rounded w-48 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-24 bg-surface-container-low rounded-xl" />
              ))}
            </div>
          </div>
          {/* Results skeleton */}
          <div>
            <div className="h-8 bg-surface-container-low rounded w-32 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-surface-container-low rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </main>
      <BottomNav activeItem="search" onNavigate={() => {}} />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchContent />
    </Suspense>
  );
}
