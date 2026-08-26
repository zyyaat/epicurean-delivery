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
        card-modern overflow-hidden 
        group cursor-pointer flex flex-col
        hover-lift
      "
    >
      {/* Image Container with gradient overlay */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-[20px]">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        
        {/* Gradient overlay for depth */}
        <div className="
          absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-500
        " />

        {/* Rating Badge - Modern glass style */}
        <div className="absolute top-3 right-3 glass-strong px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-modern">
          <span 
            className="material-symbols-outlined text-[18px] text-warning"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
          <span className="font-label-md text-label-md text-on-background font-bold">
            {restaurant.rating.toFixed(1)}
          </span>
        </div>
        
        {/* Free Delivery Badge - Gradient style */}
        {restaurant.hasFreeDelivery && (
          <div className="
            absolute top-3 left-3 
            gradient-primary text-white 
            font-label-md text-label-md font-semibold
            px-3 py-1.5 rounded-full 
            shadow-glow flex items-center gap-1
          ">
            <span className="material-symbols-outlined text-[16px]">local_shipping</span>
            Free
          </div>
        )}

        {/* Quick action buttons on hover */}
        <div className="
          absolute bottom-3 left-3 right-3
          flex justify-center gap-2
          opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0
          transition-all duration-300 ease-out
        ">
          <button className="
            glass-strong w-10 h-10 rounded-full 
            flex items-center justify-center
            hover-glow press-effect
          ">
            <span className="material-symbols-outlined text-[20px] text-on-background">favorite</span>
          </button>
        </div>
      </div>
      
      {/* Content - Modern spacing and typography */}
      <div className="p-5 flex flex-col gap-3 flex-grow">
        {/* Header Row */}
        <div className="flex justify-between items-start gap-3">
          <h3 className="font-title-lg text-title-lg text-on-background line-clamp-1 group-hover:text-primary transition-colors">
            {restaurant.name}
          </h3>
          <span className="
            badge-modern badge-success whitespace-nowrap
          ">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            {restaurant.deliveryTime}
          </span>
        </div>
        
        {/* Cuisine & Tags - Subtle styling */}
        <p className="font-body-md text-body-md text-secondary line-clamp-1">
          {restaurant.cuisine} • {restaurant.tags.join(' • ')}
        </p>
        
        {/* Footer Info - Modern icon styling */}
        <div className="mt-auto pt-3 border-t border-surface-container flex items-center gap-4 text-secondary font-body-md text-body-md">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-primary/70">delivery_dining</span>
            <span className="font-medium">{restaurant.deliveryFee === 0 ? 'Free' : `$${restaurant.deliveryFee.toFixed(2)}`}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-primary/70">shopping_bag</span>
            <span className="font-medium">${restaurant.minOrder}</span> min
          </span>
        </div>
      </div>
    </article>
  );
}
