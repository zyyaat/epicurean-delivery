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
        shadow-card hover:shadow-card-hover transition-all duration-300 
        group cursor-pointer flex flex-col
        hover-lift active:scale-[0.98]
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
        
        {/* Rating Badge */}
        <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <span 
            className="material-symbols-outlined text-primary text-sm"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
          <span className="font-label-md text-on-surface">{restaurant.rating.toFixed(1)}</span>
        </div>
        
        {/* Free Delivery Badge */}
        {restaurant.hasFreeDelivery && (
          <div className="absolute top-4 right-4 bg-primary text-on-primary font-label-md px-2 py-1 rounded-full shadow-sm">
            Free Delivery
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-grow">
        {/* Header Row */}
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-title-lg text-foreground line-clamp-1">
            {restaurant.name}
          </h3>
          <span className="bg-surface-container-high text-on-surface font-label-md px-2 py-1 rounded-md whitespace-nowrap text-xs">
            {restaurant.deliveryTime}
          </span>
        </div>
        
        {/* Cuisine & Tags */}
        <p className="font-body-md-secondary text-secondary line-clamp-1">
          {restaurant.cuisine} • {restaurant.tags.join(' • ')}
        </p>
        
        {/* Footer Info */}
        <div className="mt-auto pt-2 flex items-center gap-3 text-secondary text-sm">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">delivery_dining</span>
            {restaurant.deliveryFee === 0 ? 'Free' : `$${restaurant.deliveryFee.toFixed(2)}`}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
            ${restaurant.minOrder} Min
          </span>
        </div>
      </div>
    </article>
  );
}
