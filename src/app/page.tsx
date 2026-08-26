'use client';

import React, { useState, useCallback } from 'react';
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
  const [activeCategory, setActiveCategory] = useState<string | undefined>();
  const [activeNav, setActiveNav] = useState<NavItem>('home');
  const cartItems = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) => state.getTotalItems());
  
  const handleRestaurantClick = useCallback((id: string) => {
    console.log('Navigate to restaurant:', id);
    // In a real app: router.push(`/restaurant/${id}`);
  }, []);
  
  const handleCategorySelect = useCallback((id: string) => {
    setActiveCategory(activeCategory === id ? undefined : id);
    console.log('Filter by category:', id);
  }, [activeCategory]);
  
  const handleSearch = useCallback((query: string) => {
    console.log('Search for:', query);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top App Bar */}
      <TopAppBar 
        cartItemCount={totalItems}
        onMenuClick={() => console.log('Menu clicked')}
        onCartClick={() => console.log('Cart clicked')}
      />
      
      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl flex flex-col gap-xl pb-24 md:pb-xl">
        
        {/* Location & Search Section */}
        <section className="flex flex-col gap-md">
          {/* Location Selector */}
          <div className="flex items-center gap-sm text-secondary hover:text-foreground transition-colors cursor-pointer w-fit">
            <span 
              className="material-symbols-outlined text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              location_on
            </span>
            <div className="flex flex-col">
              <span className="font-label-md text-secondary uppercase">Delivering to</span>
              <span className="font-title-lg text-foreground flex items-center gap-xs">
                124 Main Street
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </span>
            </div>
          </div>
          
          {/* Search Bar */}
          <SearchBar 
            onSearch={handleSearch}
            onFilterClick={() => console.log('Filter clicked')}
          />
        </section>

        {/* Categories Section */}
        <section className="flex flex-col gap-md">
          <h2 className="text-headline-lg-mobile md:text-headline-lg-custom font-bold text-foreground">
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
            <h2 className="text-headline-lg-mobile md:text-headline-lg-custom font-bold text-foreground">
              Featured Spots
            </h2>
            <button 
              className="font-label-md text-primary hover:text-primary-container transition-colors uppercase tracking-wider flex items-center gap-xs"
              onClick={() => console.log('See all')}
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

        {/* Promo Banner Section - Optional Enhancement */}
        <section className="w-full rounded-xl overflow-hidden relative h-48 shadow-search isolate group cursor-pointer">
          <div 
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500 -z-10"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAgTN6qls2werQbQTHRTDPhIokaEP_NCqEgeoP8eMLvLhfkqeagywr8O6cuwcc5HtrkUQ8mxZsIE4hVGAHdUir3011I4SoGviRIilsXBRoKDzg0cS3G50Vsb6BR2lWb2P4dq2gueOuscxRNMvHNGzmQrWq89Dd0YCYgO6mzfgvFHBd6q0lFcnqLBEWKxc8N8NL8wXf2oSIBWoMn0LDn2y9x-hyowYjM9reGlimuhmjue-EH_0oz7YKDIA')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-background/90 via-background/50 to-transparent -z-10" />
          <div className="h-full flex flex-col justify-center p-lg w-2/3">
            <span className="inline-block bg-primary text-on-primary font-label-md px-2 py-1 rounded-full w-max mb-sm uppercase tracking-wider">
              Trending
            </span>
            <h2 className="text-headline-md-custom text-foreground mb-xs">
              Fresh Bowls
            </h2>
            <p className="text-body-md-custom text-secondary">
              Discover vibrant, healthy options near you.
            </p>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNav 
        activeItem={activeNav}
        onNavigate={(item) => {
          setActiveNav(item);
          console.log('Navigate to:', item);
        }}
      />
    </div>
  );
}
