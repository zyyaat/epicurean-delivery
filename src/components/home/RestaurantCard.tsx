'use client';

import React from 'react';

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  cuisine: string;
  tags: string[];
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  isFeatured?: boolean;
  hasFreeDelivery?: boolean;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick?: (id: string) => void;
}

export function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <article
      onClick={() => onClick?.(restaurant.id)}
      className="
        bg-surface-container-lowest rounded-xl overflow-hidden 
        shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] 
        hover:shadow-[0_8px_30px_0_rgba(0,0,0,0.08)] transition-shadow duration-300 
        group cursor-pointer flex flex-col
      "
    >
      {/* Image Container */}
      <div className="relative w-full aspect-video overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Rating Badge - Top Right for RTL */}
        <div className="absolute top-4 right-4 bg-surface-container-lowest/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <span 
            className="material-symbols-outlined text-primary text-sm"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
          <span className="font-label-md text-label-md text-on-surface">{restaurant.rating.toFixed(1)}</span>
        </div>
        
        {/* Free Delivery Badge - Top Left for RTL */}
        {restaurant.hasFreeDelivery && (
          <div className="absolute top-4 left-4 bg-primary text-on-primary font-label-md text-label-md px-2 py-1 rounded-full shadow-sm">
            Free Delivery
          </div>
        )}
      </div>
      
      {/* Content - Matching Original Design */}
      <div className="p-4 flex flex-col gap-sm flex-grow">
        {/* Header Row */}
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-title-lg text-title-lg text-on-background line-clamp-1">
            {restaurant.name}
          </h3>
          <span className="bg-surface-container-high text-on-surface font-label-md text-label-md px-2 py-1 rounded-md whitespace-nowrap">
            {restaurant.deliveryTime}
          </span>
        </div>
        
        {/* Cuisine & Tags */}
        <p className="font-body-md text-body-md text-secondary line-clamp-1">
          {restaurant.cuisine} • {restaurant.tags.join(' • ')}
        </p>
        
        {/* Footer Info - Matching Original Design Exactly */}
        <div className="mt-auto pt-sm flex items-center gap-sm text-secondary font-body-md text-body-md">
          <span className="flex items-center gap-xs">
            <span className="material-symbols-outlined text-[16px]">delivery_dining</span>
            {restaurant.deliveryFee === 0 ? '$0.00' : `$${restaurant.deliveryFee.toFixed(2)}`}
          </span>
          <span>•</span>
          <span className="flex items-center gap-xs">
            <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
            ${restaurant.minOrder} Min
          </span>
        </div>
      </div>
    </article>
  );
}
