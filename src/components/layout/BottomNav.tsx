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
  },
  { 
    id: 'search' as NavItem, 
    icon: 'search', 
    label: 'البحث',
  },
  { 
    id: 'orders' as NavItem, 
    icon: 'receipt_long', 
    label: 'طلباتي',
  },
  { 
    id: 'account' as NavItem, 
    icon: 'person', 
    label: 'حسابي',
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
    <nav className="md:hidden fixed bottom-0 w-full z-50 flex justify-around items-center h-20 px-4 bg-surface/80 backdrop-blur-md rounded-t-xl shadow-[0_-4px_20px_0_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = activeItem === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleNavigate(item.id)}
            className={`
              flex flex-col items-center justify-center 
              ${isActive 
                ? 'text-on-background' 
                : 'text-secondary hover:bg-surface-container-low'
              }
              transition-all active:scale-90 p-2 rounded-xl
            `}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            <span 
              className={`material-symbols-outlined mb-1 text-[24px] ${
                isActive ? 'text-primary' : ''
              }`}
              data-icon={item.icon}
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {item.icon}
            </span>
            <span className={`font-label-md text-label-md ${isActive ? 'text-primary' : ''}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
