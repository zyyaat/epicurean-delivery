'use client';

import React from 'react';
import Image from 'next/image';

export interface Category {
  id: string;
  name: string;
  image: string; // Professional image URL
  icon?: string; // Fallback icon (optional)
  color?: string; // Accent color
}

interface CategoryChipsProps {
  categories: Category[];
  activeCategory?: string;
  onSelect?: (id: string) => void;
}

// Professional food photography images (like Talabat/Deliveroo)
const defaultCategories: Category[] = [
  { 
    id: 'burgers', 
    name: 'Burgers',
    image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f93f6c0e43fe.jpg',
    color: '#ff6b35'
  },
  { 
    id: 'pizza', 
    name: 'Pizza',
    image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/358a85647974.jpeg',
    color: '#d41b3c'
  },
  { 
    id: 'sushi', 
    name: 'Sushi',
    image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d58b691c1c9b.jpg',
    color: '#f59e0b'
  },
  { 
    id: 'dessert', 
    name: 'Dessert',
    image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7213c2e11ac8.jpg',
    color: '#ec4899'
  },
  { 
    id: 'asian', 
    name: 'Asian',
    image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8fa7c2e5ec65.jpg',
    color: '#8b5cf6'
  },
  { 
    id: 'cafe', 
    name: 'Cafe',
    image: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5e8a9ff61344.jpg',
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
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="64px"
                loading="lazy"
              />
              
              {/* Subtle gradient overlay for text readability if needed */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
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
