'use client';

import React from 'react';

export interface Category {
  id: string;
  name: string;
  icon: string;
  color?: string; // Optional gradient color
}

interface CategoryChipsProps {
  categories: Category[];
  activeCategory?: string;
  onSelect?: (id: string) => void;
}

const defaultCategories: Category[] = [
  { id: 'burgers', name: 'Burgers', icon: 'lunch_dining', color: '#ff6b35' },
  { id: 'pizza', name: 'Pizza', icon: 'local_pizza', color: '#d41b3c' },
  { id: 'sushi', name: 'Sushi', icon: 'set_meal', color: '#f59e0b' },
  { id: 'dessert', name: 'Dessert', icon: 'cake', color: '#ec4899' },
  { id: 'asian', name: 'Asian', icon: 'ramen_dining', color: '#8b5cf6' },
  { id: 'cafe', name: 'Cafe', icon: 'local_cafe', color: '#10b981' },
];

export function CategoryChips({ 
  categories = defaultCategories, 
  activeCategory,
  onSelect 
}: CategoryChipsProps) {
  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-3 pt-2 -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
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
              rounded-[20px] px-5 py-4 min-w-[100px]
              press-effect relative overflow-hidden
              border-2 ${isActive ? 'border-primary/30 shadow-glow' : 'border-transparent shadow-modern'}
              group
            `}
            aria-label={category.name}
            aria-pressed={isActive}
          >
            {/* Background glow effect when active */}
            {isActive && (
              <span 
                className="absolute inset-0 opacity-10 animate-fade-in"
                style={{ background: `linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}99 100%)` }}
              />
            )}
            
            {/* Icon Circle - Modern gradient background */}
            <span 
              className={`
                w-14 h-14 rounded-2xl flex items-center justify-center
                transition-all duration-500 ease-out
                ${isActive ? 'shadow-glow scale-110' : 'group-hover:scale-105'}
              `}
              style={{ 
                background: isActive 
                  ? `linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}cc 100%)`
                  : `linear-gradient(135deg, ${categoryColor}20 0%, ${categoryColor}10 100%)`
              }}
            >
              <span 
                className="material-symbols-outlined text-[28px] transition-colors"
                style={{ 
                  color: isActive ? '#ffffff' : categoryColor,
                  fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0"
                }}
              >
                {category.icon}
              </span>
            </span>
            
            {/* Label */}
            <span className={`
              font-label-md text-label-md whitespace-nowrap transition-all duration-300
              ${isActive ? 'text-on-background font-bold' : 'text-secondary'}
            `}>
              {category.name}
            </span>

            {/* Active indicator dot */}
            {isActive && (
              <span 
                className="absolute bottom-2 w-1.5 h-1.5 rounded-full animate-scale-in"
                style={{ backgroundColor: categoryColor }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
