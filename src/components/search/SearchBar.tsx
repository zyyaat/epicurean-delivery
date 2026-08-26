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
      <div className="relative w-full shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] rounded-xl group">
        {/* Search Icon - Left side for RTL compatibility */}
        <span 
          className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors z-10"
        >
          search
        </span>
        
        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="
            w-full pl-12 pr-4 py-4 
            rounded-xl 
            border border-surface-variant 
            bg-surface-container-lowest 
            font-body-lg text-body-lg text-on-surface 
            placeholder:text-secondary 
            focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary 
            transition-all relative z-0
          "
          dir="rtl"
        />
        
        {/* Filter Button - Right side for RTL */}
        {showFilter && (
          <button
            type="button"
            onClick={onFilterClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-surface-container p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors"
            aria-label="Filter"
          >
            <span className="material-symbols-outlined text-[20px]">
              tune
            </span>
          </button>
        )}
      </div>
    </form>
  );
}
