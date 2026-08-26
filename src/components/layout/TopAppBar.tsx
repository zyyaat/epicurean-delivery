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
    <header className="glass-strong w-full sticky top-0 z-50 shadow-modern">
      <div className="flex justify-between items-center px-margin-mobile h-[72px] w-full max-w-7xl mx-auto">
        {/* Menu Button - Modern icon button */}
        <button
          onClick={onMenuClick}
          className="icon-btn rounded-2xl"
          aria-label="Menu"
        >
          <span className="material-symbols-outlined text-[24px]" data-icon="menu">menu</span>
        </button>

        {/* Logo - Modern gradient text */}
        <h1 className="font-display-lg text-display-lg truncate mx-4 select-none">
          Epicurean
        </h1>

        {/* Cart Button with Badge - Modern with glow effect */}
        <button
          onClick={onCartClick}
          className="relative icon-btn hover-glow rounded-2xl"
          aria-label="Cart"
        >
          <span 
            className="material-symbols-outlined text-[24px] text-primary" 
            data-icon="shopping_cart"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            shopping_cart
          </span>
          {cartItemCount > 0 && (
            <span className="
              absolute -top-1 -right-1 
              gradient-primary text-white 
              text-[11px] font-bold 
              w-6 h-6 rounded-full 
              flex items-center justify-center 
              shadow-glow animate-scale-in
              border-2 border-white
            ">
              {cartItemCount > 9 ? '9+' : cartItemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
