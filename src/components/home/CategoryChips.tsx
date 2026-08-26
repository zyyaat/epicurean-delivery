'use client';

import React from 'react';

export interface Category {
  id: string;
  name: string;
  image?: string;
  icon?: string;
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

// Icon fallback mapping
const iconMap: Record<string, string> = {
  lunch_dining: '🍔',
  local_pizza: '🍕',
  set_meal: '🍣',
  cake: '🍰',
  ramen_dining: '🥡',
  local_cafe: '☕',
};

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
        const hasImage = category.image && category.image.startsWith('/');
        
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
            
            {/* Image/Icon Container */}
            <div 
              className={`
                w-16 h-16 rounded-2xl overflow-hidden relative flex items-center justify-center
                transition-all duration-500 ease-out
                ${isActive ? 'shadow-glow scale-105 ring-2 ring-offset-2' : 'shadow-md group-hover:scale-105 group-hover:shadow-lg'}
              `}
              style={{ 
                ringColor: isActive ? categoryColor : 'transparent',
                boxShadow: isActive 
                  ? `0 8px 24px ${categoryColor}40` 
                  : '0 4px 12px rgba(0,0,0,0.1)',
                backgroundColor: `${categoryColor}15`
              }}
            >
              {hasImage ? (
                // Use img tag for maximum compatibility
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                  onError={(e) => {
                    // Fallback to emoji if image fails
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const emoji = document.createElement('span');
                      emoji.className = 'text-3xl';
                      emoji.textContent = iconMap[category.icon || ''] || '🍽️';
                      parent.appendChild(emoji);
                    }
                  }}
                />
              ) : (
                // Emoji fallback
                <span className="text-3xl">
                  {iconMap[category.icon || ''] || '🍽️'}
                </span>
              )}
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
