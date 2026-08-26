'use client';

import React, { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onFilterClick?: () => void;
  showFilter?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export function SearchBar({
  placeholder = 'Search dishes, restaurants, or cuisines',
  onSearch,
  onFilterClick,
  showFilter = true,
  value: controlledValue,
  onChange
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  const value = controlledValue ?? internalValue;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!controlledValue) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className={`
        relative w-full rounded-2xl group transition-all duration-300
        ${isFocused 
          ? 'shadow-glow scale-[1.01]' 
          : 'shadow-search hover:shadow-modern'
        }
      `}>
        {/* Search Icon - Animated */}
        <span 
          className={`
            material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 
            transition-all duration-300 z-10
            ${isFocused ? 'text-primary scale-110' : 'text-secondary'}
          `}
          style={{ fontVariationSettings: isFocused ? "'FILL' 1" : "'FILL' 0" }}
        >
          search
        </span>
        
        {/* Input - Modern styling */}
        <input
          type="text"
          value={value}
          onChange={(e) => {
            handleChange(e);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="
            w-full pl-12 pr-14 py-4.5 
            rounded-2xl 
            border-2 border-surface-container-high 
            bg-surface-container-lowest 
            font-body-lg text-body-lg text-on-surface 
            placeholder:text-secondary/70 
            focus:outline-none focus:border-primary/40 focus:bg-white
            transition-all duration-300 relative z-0
            selection:bg-primary/10
          "
          dir="rtl"
        />
        
        {/* Filter Button - Modern pill style */}
        {showFilter && (
          <button
            type="button"
            onClick={onFilterClick}
            className="
              absolute right-2 top-1/2 -translate-y-1/2 
              bg-gradient-to-br from-surface-container to-surface-container-high
              p-2.5 rounded-xl text-on-surface-variant 
              hover:from-primary/10 hover:to-primary/5 hover:text-primary
              transition-all duration-300 press-effect
              border border-transparent hover:border-primary/20
            "
            aria-label="Filter"
          >
            <span className="material-symbols-outlined text-[20px]" data-icon="tune">tune</span>
          </button>
        )}

        {/* Focus ring animation */}
        <div className={`
          absolute inset-0 rounded-2xl pointer-events-none
          transition-all duration-300
          ${isFocused ? 'ring-4 ring-primary/10' : 'ring-0'}
        `} />
      </div>
    </form>
  );
}
