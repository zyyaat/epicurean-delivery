'use client';

import React from 'react';

export interface SearchCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface CategoryGridProps {
  categories: SearchCategory[];
  activeCategory?: string;
  onSelect?: (id: string) => void;
}

export function CategoryGrid({ 
  categories, 
  activeCategory, 
  onSelect 
}: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect?.(category.id)}
          className={`
            bg-surface-lowest rounded-xl p-md flex flex-col items-center justify-center gap-sm
            shadow-card hover:bg-surface-low active:scale-95 transition-all group
            border border-transparent hover:border-surface-variant
            ${activeCategory === category.id ? 'bg-primary/10 border-primary/20' : ''}
          `}
        >
          <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors`}>
            <span className="material-symbols-outlined">{category.icon}</span>
          </div>
          <span className="font-title-lg-custom text-foreground">{category.name}</span>
        </button>
      ))}
    </div>
  );
}
