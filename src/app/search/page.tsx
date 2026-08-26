'use client';

import React, { useState } from 'react';
import { TopAppBar } from '@/components/layout/TopAppBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { SearchBar } from '@/components/search/SearchBar';
import { CategoryGrid } from '@/components/search/CategoryGrid';
import { searchCategories } from '@/lib/data/mock-data';
import type { NavItem } from '@/components/layout/BottomNav';

export default function SearchPage() {
  const [activeNav] = useState<NavItem>('search');
  const [activeCategory, setActiveCategory] = useState<string | undefined>();

  const handleSearch = (query: string) => {
    console.log('Search:', query);
  };

  const handleCategorySelect = (id: string) => {
    setActiveCategory(activeCategory === id ? undefined : id);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top App Bar */}
      <TopAppBar onMenuClick={() => console.log('Menu')} />
      
      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-xl pb-24 md:pb-xl flex flex-col gap-xl">
        {/* Search Section */}
        <section className="w-full relative">
          <SearchBar 
            onSearch={handleSearch}
            onFilterClick={() => console.log('Filter')}
          />
        </section>

        {/* Featured Promo Banner */}
        <section className="w-full rounded-xl overflow-hidden relative h-48 shadow-search isolate group cursor-pointer">
          <div 
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500 -z-10"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAgTN6qls2werQbQTHRTDPhIokaEP_NCqEgeoP8eMLvLhfkqeagywr8O6cuwcc5HtrkUQ8mxZsIE4hVGAHdUir3011I4SoGviRIilsXBRoKDzg0cS3G50Vsb6BR2lWb2P4dq2gueOuscxRNMvHNGzmQrWq89Dd0YCYgO6mzfgvFHBd6q0lFcnqLBEWKxc8N8NL8wXf2oSIBWoMn0LDn2y9x-hyowYjM9reGlimuhmjue-EH_0oz7YKDIA')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent -z-10" />
          <div className="h-full flex flex-col justify-center p-lg w-2/3">
            <span className="inline-block bg-primary text-on-primary font-label-md px-2 py-1 rounded-full w-max mb-sm uppercase tracking-wider">
              Trending
            </span>
            <h2 className="text-headline-md-custom text-foreground mb-xs">Fresh Bowls</h2>
            <p className="text-body-md-custom text-secondary">Discover vibrant, healthy options near you.</p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="w-full flex flex-col gap-md">
          <h2 className="text-headline-md-custom text-foreground">Explore Categories</h2>
          <CategoryGrid 
            categories={searchCategories}
            activeCategory={activeCategory}
            onSelect={handleCategorySelect}
          />
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNav 
        activeItem={activeNav}
        onNavigate={(item) => console.log('Navigate to:', item)}
      />
    </div>
  );
}
