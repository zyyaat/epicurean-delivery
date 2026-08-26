'use client';

import React from 'react';

interface TopAppBarProps {
  onMenuClick?: () => void;
  onCartClick?: () => void;
  cartItemCount?: number;
}

export function TopAppBar({ 
  onMenuClick, 
  onCartClick, 
  cartItemCount = 0 
}: TopAppBarProps) {
  return (
    <header className="bg-surface w-full sticky top-0 z-50 shadow-sm">
      <div className="flex justify-between items-center px-margin-mobile h-16 w-full max-w-7xl mx-auto">
        {/* Menu Button */}
        <button
          onClick={onMenuClick}
          className="text-primary hover:bg-surface-container-high transition-colors active:scale-95 duration-150 p-2 rounded-full flex items-center justify-center"
          aria-label="Menu"
        >
          <span className="material-symbols-outlined" data-icon="menu">menu</span>
        </button>

        {/* Logo - Matching Original Design */}
        <h1 className="font-display-lg text-display-lg font-black text-primary truncate mx-4">
          Epicurean
        </h1>

        {/* Cart Button with Badge */}
        <button
          onClick={onCartClick}
          className="text-primary hover:bg-surface-container-high transition-colors active:scale-95 duration-150 p-2 rounded-full flex items-center justify-center relative"
          aria-label="Cart"
        >
          <span 
            className="material-symbols-outlined" 
            data-icon="shopping_cart"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            shopping_cart
          </span>
          {cartItemCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-primary text-on-primary text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
              {cartItemCount > 9 ? '9+' : cartItemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
