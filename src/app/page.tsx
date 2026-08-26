'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { TopAppBar } from '@/components/layout/TopAppBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { SearchBar } from '@/components/search/SearchBar';
import { CategoryChips } from '@/components/home/CategoryChips';
import { RestaurantCard } from '@/components/home/RestaurantCard';
import { useCartStore } from '@/lib/store/cart-store';
import { toast } from 'sonner';
import { 
  featuredRestaurants, 
  categories,
} from '@/lib/data/mock-data';
import type { NavItem } from '@/components/layout/BottomNav';

export default function HomePage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string | undefined>();
  const [activeNav, setActiveNav] = useState<NavItem>('home');
  const totalItems = useCartStore((state) => state.getTotalItems());
  
  const handleRestaurantClick = useCallback((id: string) => {
    router.push(`/restaurant/${id}`);
  }, [router]);
  
  const handleCategorySelect = useCallback((id: string) => {
    setActiveCategory(activeCategory === id ? undefined : id);
  }, [activeCategory]);
  
  const handleSearch = useCallback((query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  }, [router]);

  const handleNavClick = useCallback((item: NavItem) => {
    setActiveNav(item);
    switch (item) {
      case 'home':
        router.push('/');
        break;
      case 'search':
        router.push('/search');
        break;
      case 'orders':
        // TODO: Add orders page
        console.log('Navigate to orders');
        break;
      case 'account':
        // TODO: Add account page
        console.log('Navigate to account');
        break;
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top App Bar */}
      <TopAppBar 
        cartItemCount={totalItems}
        onMenuClick={() => console.log('Menu clicked')}
        onCartClick={() => router.push('/cart')}
      />
      
      {/* Main Content - Matching Original Design Exactly */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl flex flex-col gap-xl pb-24 md:pb-xl">
        
        {/* Location & Search Section */}
        <section className="flex flex-col gap-md">
          {/* Location Selector */}
          <div 
            className="flex items-center gap-sm text-secondary hover:text-on-background transition-colors cursor-pointer w-fit press-effect"
            onClick={() => toast.info('Location picker coming soon! 📍', {
              duration: 2000,
              position: 'bottom-center',
              style: {
                background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                color: '#ffffff',
                borderRadius: '14px',
                fontFamily: 'Inter, sans-serif',
              },
            })}
          >
            <span 
              className="material-symbols-outlined text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              location_on
            </span>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md uppercase text-secondary">Delivering to</span>
              <span className="font-title-lg text-title-lg text-on-background flex items-center gap-xs">
                124 Main Street
                <span className="material-symbols-outlined">expand_more</span>
              </span>
            </div>
          </div>
          
          {/* Search Bar */}
          <SearchBar 
            placeholder="Search for restaurants, cuisines, or dishes..."
            onSearch={handleSearch}
            onFilterClick={() => router.push('/search')}
          />
        </section>

        {/* Categories Section - Matching Original Design */}
        <section className="flex flex-col gap-md">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background">
            Cravings
          </h2>
          <CategoryChips 
            categories={categories}
            activeCategory={activeCategory}
            onSelect={handleCategorySelect}
          />
        </section>

        {/* Featured Restaurants Section - Matching Original Design */}
        <section className="flex flex-col gap-xl">
          {/* Section Header */}
          <div className="flex justify-between items-end">
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background">
              Featured Spots
            </h2>
            <button 
              onClick={() => router.push('/search')}
              className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors uppercase tracking-wider flex items-center gap-xs"
            >
              See All 
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          
          {/* Restaurant Grid - Generous spacing for breathing room */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onClick={handleRestaurantClick}
              />
            ))}
          </div>
        </section>

        {/* Spacer for mobile nav */}
        <div className="h-8 md:hidden"></div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav 
        activeItem={activeNav}
      />
    </div>
  );
}
