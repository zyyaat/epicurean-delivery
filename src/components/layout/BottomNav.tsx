'use client';

import React from 'react';

export type NavItem = 'home' | 'search' | 'orders' | 'account';

interface BottomNavProps {
  activeItem?: NavItem;
  onNavigate?: (item: NavItem) => void;
}

const navItems = [
  { 
    id: 'home' as NavItem, 
    icon: 'home', 
    label: 'Home',
    filledIcon: true
  },
  { 
    id: 'search' as NavItem, 
    icon: 'search', 
    label: 'Search',
    filledIcon: false
  },
  { 
    id: 'orders' as NavItem, 
    icon: 'receipt_long', 
    label: 'Orders',
    filledIcon: false
  },
  { 
    id: 'account' as NavItem, 
    icon: 'person', 
    label: 'Account',
    filledIcon: false
  },
];

export function BottomNav({ activeItem = 'home', onNavigate }: BottomNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 flex justify-around items-center h-20 px-4 glass border-t border-surface-variant rounded-t-xl shadow-nav pb-safe">
      {navItems.map((item) => {
        const isActive = activeItem === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate?.(item.id)}
            className={`
              flex flex-col items-center justify-center 
              transition-all duration-150 p-2 rounded-xl
              ${isActive 
                ? 'text-primary' 
                : 'text-secondary hover:bg-surface-container-low'
              }
              active:scale-90
            `}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            <span 
              className={`material-symbols-outlined mb-1 text-[24px] ${
                isActive ? 'animate-scale-in' : ''
              }`}
              data-icon={item.icon}
              style={item.filledIcon && isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {item.icon}
            </span>
            <span className={`font-label-md text-label-md ${isActive ? 'font-semibold' : ''}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
