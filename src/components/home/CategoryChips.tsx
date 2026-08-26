'use client';

import React from 'react';
// Using standard img tag for better compatibility
// import Image from 'next/image';

export interface Category {
  id: string;
  name: string;
  image: string; // Local image path
  color?: string;
}

interface CategoryChipsProps {
  categories: Category[];
  activeCategory?: string;
  onSelect?: (id: string) => void;
}

// Local professional AI-generated images
const defaultCategories: Category[] = [
  { 
    id: 'burgers', 
    name: 'Burgers',
    image: '/categories/burgers.jpg',
    color: '#ff6b35'
  },
  { 
    id: 'pizza', 
    name: 'Pizza',
    image: '/categories/pizza.jpg',
    color: '#d41b3c'
  },
  { 
    id: 'sushi', 
    name: 'Sushi',
    image: '/categories/sushi.jpg',
    color: '#f59e0b'
  },
  { 
    id: 'dessert', 
    name: 'Dessert',
    image: '/categories/dessert.jpg',
    color: '#ec4899'
  },
  { 
    id: 'asian', 
    name: 'Asian',
    image: '/categories/asian.jpg',
    color: '#8b5cf6'
  },
  { 
    id: 'cafe', 
    name: 'Cafe',
    image: '/categories/cafe.jpg',
    color: '#10b981'
  },
];

export function CategoryChips({ 
  categories = defaultCategories, 
  activeCategory,
  onSelect 
}: CategoryChipsProps) {
  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 pt-2 -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        const categoryColor = category.color || '#d41b3c';
        
        return (
          <button
            key={category.id}
            onClick={() => onSelect?.(category.id)}
            className={`
              flex flex-col items-center justify-center gap-2.5
              bg-surface-container-lowest hover:bg-surface-container-low
              transition-all duration-300 ease-out
              rounded-2xl px-4 py-3 min-w-[90px]
              press-effect relative overflow-hidden
              border-2 ${isActive ? 'border-primary/40 shadow-glow' : 'border-transparent shadow-modern'}
              group
            `}
            aria-label={category.name}
            aria-pressed={isActive}
          >
            {/* Background glow effect when active */}
            {isActive && (
              <span 
                className="absolute inset-0 opacity-[0.08] animate-fade-in"
                style={{ background: `linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}99 100%)` }}
              />
            )}
            
            {/* Image Container - Circular with shadow */}
            <div 
              className={`
                w-16 h-16 rounded-2xl overflow-hidden relative
                transition-all duration-500 ease-out
                ${isActive ? 'shadow-glow scale-105 ring-2 ring-offset-2' : 'shadow-md group-hover:scale-105 group-hover:shadow-lg'}
              `}
              style={{ 
                ringColor: isActive ? categoryColor : 'transparent',
                boxShadow: isActive 
                  ? `0 8px 24px ${categoryColor}40` 
                  : '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="eager"
                decoding="async"
              />
              
              {/* Subtle gradient overlay for depth */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors rounded-2xl" />
            </div>
            
            {/* Label */}
            <span className={`
              font-label-md text-[11px] whitespace-nowrap transition-all duration-300
              ${isActive ? 'text-on-background font-bold' : 'text-secondary font-medium'}
            `}>
              {category.name}
            </span>

            {/* Active indicator dot */}
            {isActive && (
              <span 
                className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full animate-scale-in"
                style={{ backgroundColor: categoryColor }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
