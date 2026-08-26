'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth-store';

export type NavItem = 'home' | 'search' | 'orders' | 'account';

interface BottomNavProps {
  activeItem?: NavItem;
}

const navItems = [
  { 
    id: 'home' as NavItem, 
    icon: 'home', 
    label: 'الرئيسية',
    iconFilled: 'home',
  },
  { 
    id: 'search' as NavItem, 
    icon: 'search', 
    label: 'البحث',
    iconFilled: 'search',
  },
  { 
    id: 'orders' as NavItem, 
    icon: 'receipt_long', 
    label: 'طلباتي',
    iconFilled: 'receipt_long',
  },
  { 
    id: 'account' as NavItem, 
    icon: 'person', 
    label: 'حسابي',
    iconFilled: 'person',
  },
];

export function BottomNav({ activeItem = 'home' }: BottomNavProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleNavigate = (item: NavItem) => {
    switch (item) {
      case 'home':
        router.push('/');
        break;
      case 'search':
        router.push('/search');
        break;
      case 'orders':
        if (!isAuthenticated) {
          router.push('/login');
        } else {
          router.push('/orders');
        }
        break;
      case 'account':
        if (!isAuthenticated) {
          router.push('/login');
        } else {
          router.push('/account');
        }
        break;
    }
  };

  return (
    <nav className="
      md:hidden fixed bottom-4 left-4 right-4 z-50 
      glass-strong rounded-[28px] shadow-modern-xl
      flex justify-around items-center h-[72px] px-2
      border border-white/40
    ">
      {navItems.map((item) => {
        const isActive = activeItem === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleNavigate(item.id)}
            className={`
              relative flex flex-col items-center justify-center 
              w-16 h-16 rounded-2xl
              transition-all duration-300 ease-out
              ${isActive 
                ? 'text-primary' 
                : 'text-secondary hover:text-on-surface-variant'
              }
              press-effect
            `}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            {/* Active indicator background */}
            {isActive && (
              <span className="
                absolute inset-0 bg-primary/8 rounded-2xl
                animate-scale-in
              " />
            )}
            
            {/* Icon */}
            <span 
              className={`material-symbols-outlined text-[24px] mb-0.5 relative z-10 transition-all duration-300 ${
                isActive ? '' : ''
              }`}
              data-icon={item.icon}
              style={isActive ? { fontVariationSettings: "'FILL' 1", fontWeight: 500 } : {}}
            >
              {item.icon}
            </span>
            
            {/* Label */}
            <span className={`
              font-label-md text-[10px] relative z-10 transition-all duration-300
              ${isActive ? 'text-primary font-bold' : ''}
            `}>
              {item.label}
            </span>

            {/* Active dot indicator */}
            {isActive && (
              <span className="
                absolute -bottom-1 w-1 h-1 rounded-full gradient-primary
                animate-scale-in
              " />
            )}
          </button>
        );
      })}
    </nav>
  );
}
