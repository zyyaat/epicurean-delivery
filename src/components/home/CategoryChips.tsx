'use client';

import React from 'react';

export interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoryChipsProps {
  categories: Category[];
  activeCategory?: string;
  onSelect?: (id: string) => void;
}

const defaultCategories: Category[] = [
  { id: 'burgers', name: 'Burgers', icon: 'lunch_dining' },
  { id: 'pizza', name: 'Pizza', icon: 'local_pizza' },
  { id: 'sushi', name: 'Sushi', icon: 'set_meal' },
  { id: 'dessert', name: 'Dessert', icon: 'cake' },
  { id: 'asian', name: 'Asian', icon: 'ramen_dining' },
  { id: 'cafe', name: 'Cafe', icon: 'local_cafe' },
];

export function CategoryChips({ 
  categories = defaultCategories, 
  activeCategory,
  onSelect 
}: CategoryChipsProps) {
  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect?.(category.id)}
          className={`
            flex flex-col items-center justify-center gap-2 
            bg-surface-container-highest hover:bg-surface-variant 
            transition-colors rounded-xl px-lg py-md min-w-[100px] 
            active:scale-95 duration-150
            border border-transparent
            ${activeCategory === category.id ? 'bg-primary/10 border-primary/20' : ''}
          `}
          aria-label={category.name}
          aria-pressed={activeCategory === category.id}
        >
          <span className="material-symbols-outlined text-primary text-[32px]">
            {category.icon}
          </span>
          <span className="font-label-md text-on-surface whitespace-nowrap">
            {category.name}
          </span>
        </button>
      ))}
    </div>
  );
}
