'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { TopAppBar } from '@/components/layout/TopAppBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { SearchBar } from '@/components/search/SearchBar';
import { CategoryChips } from '@/components/home/CategoryChips';
import { RestaurantCard } from '@/components/home/RestaurantCard';
import { useCartStore } from '@/lib/store/cart-store';
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
      
      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl flex flex-col gap-xl pb-24 md:pb-xl">
        
        {/* Location & Search Section */}
        <section className="flex flex-col gap-md">
          {/* Location Selector */}
          <div 
            className="flex items-center gap-sm text-secondary hover:text-foreground transition-colors cursor-pointer w-fit"
            onClick={() => alert('Location picker would open here 📍')}
          >
            <span 
              className="material-symbols-outlined text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              location_on
            </span>
            <div className="flex flex-col">
              <span className="font-label-md text-secondary uppercase text-[10px]">Delivering to</span>
              <span className="text-base font-semibold text-foreground flex items-center gap-xs">
                124 Main Street
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </span>
            </div>
          </div>
          
          {/* Search Bar */}
          <SearchBar 
            onSearch={handleSearch}
            onFilterClick={() => router.push('/search')}
          />
        </section>

        {/* Categories Section */}
        <section className="flex flex-col gap-md">
          <h2 className="text-headline-lg-mobile font-bold text-foreground text-[28px] leading-[36px]">
            Cravings
          </h2>
          <CategoryChips 
            categories={categories}
            activeCategory={activeCategory}
            onSelect={handleCategorySelect}
          />
        </section>

        {/* Featured Restaurants Section */}
        <section className="flex flex-col gap-lg">
          {/* Section Header */}
          <div className="flex justify-between items-end">
            <h2 className="text-headline-lg-mobile font-bold text-foreground text-[28px] leading-[36px]">
              Featured Spots
            </h2>
            <button 
              onClick={() => router.push('/search')}
              className="text-primary hover:text-primary-container transition-colors uppercase tracking-wider flex items-center gap-xs text-xs font-semibold"
            >
              See All 
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          
          {/* Restaurant Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {featuredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onClick={handleRestaurantClick}
              />
            ))}
          </div>
        </section>

        {/* Promo Banner Section */}
        <section 
          className="w-full rounded-xl overflow-hidden relative h-48 shadow-search isolate group cursor-pointer"
          onClick={() => router.push('/search?category=bowls')}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500 -z-10"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAgTN6qls2werQbQTHRTDPhIokaEP_NCqEgeoP8eMLvLhfkqeagywr8O6cuwcc5HtrkUQ8mxZsIE4hVGAHdUir3011I4SoGviRIilsXBRoKDzg0cS3G50Vsb6BR2lWb2P4dq2gueOuscxRNMvHNGzmQrWq89Dd0YCYgO6mzfgvFHBd6q0lFcnqLBEWKxc8N8NL8wXf2oSIBWoMn0LDn2y9x-hyowYjM9reGlimuhmjue-EH_0oz7YKDIA')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-background/90 via-background/50 to-transparent -z-10" />
          <div className="h-full flex flex-col justify-center p-lg w-2/3">
            <span className="inline-block bg-primary text-on-primary font-label-md px-2 py-1 rounded-full w-max mb-sm uppercase tracking-wider text-[10px]">
              Trending
            </span>
            <h2 className="text-2xl font-bold text-foreground mb-1">
              Fresh Bowls
            </h2>
            <p className="text-sm text-secondary">
              Discover vibrant, healthy options near you.
            </p>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNav 
        activeItem={activeNav}
        onNavigate={handleNavClick}
      />
    </div>
  );
}
