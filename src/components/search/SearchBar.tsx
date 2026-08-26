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
  placeholder = 'Search for restaurants, cuisines, or dishes...',
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
    <form onSubmit={handleSubmit} className="relative w-full group">
      {/* Search Icon */}
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
        <span className="material-symbols-outlined text-secondary group-focus-within:text-primary transition-colors">
          search
        </span>
      </div>
      
      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="
          w-full pr-12 pl-4 py-4 
          bg-surface-container-lowest 
          border border-surface-variant 
          rounded-xl 
          focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary 
          text-base text-foreground 
          placeholder:text-secondary 
          transition-all 
          shadow-search
        "
        dir="rtl"
      />
      
      {/* Filter Button */}
      {showFilter && (
        <button
          type="button"
          onClick={onFilterClick}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-surface-container p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors"
          aria-label="Filter"
        >
          <span className="material-symbols-outlined text-[20px]" data-icon="tune">
            tune
          </span>
        </button>
      )}
    </form>
  );
}
