'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TopAppBar } from '@/components/layout/TopAppBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { SearchBar } from '@/components/search/SearchBar';
import { CategoryGrid } from '@/components/search/CategoryGrid';
import { searchCategories, featuredRestaurants } from '@/lib/data/mock-data';
import type { NavItem } from '@/components/layout/BottomNav';
import { RestaurantCard } from '@/components/home/RestaurantCard';

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeNav] = useState<NavItem>('search');
  const [activeCategory, setActiveCategory] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState('');

  // Get initial query from URL
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleCategorySelect = (id: string) => {
    setActiveCategory(activeCategory === id ? undefined : id);
  };

  const handleRestaurantClick = (id: string) => {
    router.push(`/restaurant/${id}`);
  };

  const handleNavClick = (item: NavItem) => {
    switch (item) {
      case 'home':
        router.push('/');
        break;
      case 'search':
        // Already here
        break;
      case 'orders':
        console.log('Navigate to orders');
        break;
      case 'account':
        console.log('Navigate to account');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top App Bar */}
      <TopAppBar 
        onMenuClick={() => console.log('Menu')}
        onCartClick={() => router.push('/cart')}
      />
      
      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-xl pb-24 md:pb-xl flex flex-col gap-xl">
        {/* Search Section */}
        <section className="w-full relative">
          <SearchBar 
            value={searchQuery}
            onSearch={handleSearch}
            onFilterClick={() => console.log('Filter clicked')}
          />
        </section>

        {/* Featured Promo Banner */}
        <section 
          className="w-full rounded-xl overflow-hidden relative h-48 shadow-search isolate group cursor-pointer"
          onClick={() => alert('Trending items would show here 🔥')}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500 -z-10"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAgTN6qls2werQbQTHRTDPhIokaEP_NCqEgeoP8eMLvLhfkqeagywr8O6cuwcc5HtrkUQ8mxZsIE4hVGAHdUir3011I4SoGviRIilsXBRoKDzg0cS3G50Vsb6BR2lWb2P4dq2gueOuscxRNMvHNGzmQrWq89Dd0YCYgO6mzfgvFHBd6q0lFcnqLBEWKxc8N8NL8wXf2oSIBWoMn0LDn2y9x-hyowYjM9reGlimuhmjue-EH_0oz7YKDIA')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent -z-10" />
          <div className="h-full flex flex-col justify-center p-lg w-2/3">
            <span className="inline-block bg-primary text-on-primary font-label-md px-2 py-1 rounded-full w-max mb-sm uppercase tracking-wider text-[10px]">
              Trending
            </span>
            <h2 className="text-2xl font-bold text-foreground mb-1">Fresh Bowls</h2>
            <p className="text-sm text-secondary">Discover vibrant, healthy options near you.</p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="w-full flex flex-col gap-md">
          <h2 className="text-2xl font-bold text-foreground">Explore Categories</h2>
          <CategoryGrid 
            categories={searchCategories}
            activeCategory={activeCategory}
            onSelect={handleCategorySelect}
          />
        </section>

        {/* Show restaurants when searching or category selected */}
        {(searchQuery || activeCategory) && (
          <section className="flex flex-col gap-lg">
            <h2 className="text-2xl font-bold text-foreground">
              {searchQuery ? `Results for "${searchQuery}"` : 'Restaurants'}
            </h2>
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
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav 
        activeItem={activeNav}
        onNavigate={handleNavClick}
      />
    </div>
  );
}
