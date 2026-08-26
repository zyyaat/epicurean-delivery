'use client';

import React, { useState } from 'react';
import { TopAppBar } from '@/components/layout/TopAppBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { useCartStore } from '@/lib/store/cart-store';
import type { NavItem } from '@/components/layout/BottomNav';

// Mock restaurant data
const restaurantData = {
  id: '1',
  name: 'The Smashed Patty',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1HXervz8JH-FrvTBzvQssE17h33O3G1paUkNxWRJi1s2sRqmivkkWTkZIPUZ6czX8pZiW4S1meE6Ifz8D4vttCf7PQZHNsnMXSXf_9RBZDrvggigHGuit9yYxLjYXbKCsuaDfdthh3byp8xIA5M5jg52UfepJYQz2BQojr1ii-JFzblWlpmjtg_MzTzs3JoU2sUBrvDzYhx_fditSl0xJE7-U-f20uQh-Gzbi3pOg7zpR3SU2b7T3Cg',
  rating: 4.9,
  cuisine: 'American • Burgers • Comfort Food',
  deliveryTime: '20-30 min',
  deliveryFee: '$2.99',
  description: 'Premium artisanal burgers with the finest ingredients. Every patty is hand-crafted and smashed to perfection for maximum flavor.',
};

const menuItems = [
  {
    id: 'item-1',
    name: 'Signature Wagyu Burger',
    description: 'A5 Wagyu beef, caramelized onions, special sauce, brioche bun',
    price: 24.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA136ow7Jmia34BeGN8-5MwCxwZUoQWT4ppwvzXhwTXl_Ds8uoW3vxqH3OnfQRtgzVMmblZYOu_XtqPmTPaqpdl9Je7qfDh_NdjKBW7K_9Xmmpcel0yrEE2OihLxpKIbQfJom_h4gsBu4ImXlkN-2kTWOgAXSjDS4tSX4q_TZim3tJnxwzE3j-pxTa66i9mBWwTS4cZZ3AwBVGowenKzl2sMoWyFa3-HdS6NjmQH0IEwIQHHIKxfLX9NA',
    popular: true,
  },
  {
    id: 'item-2',
    name: 'Classic Cheeseburger',
    description: 'Angus beef, cheddar cheese, lettuce, tomato, pickles',
    price: 16.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA136ow7Jmia34BeGN8-5MwCxwZUoQWT4ppwvzXhwTXl_Ds8uoW3vxqH3OnfQRtgzVMmblZYOu_XtqPmTPaqpdl9Je7qfDh_NdjKBW7K_9Xmmpcel0yrEE2OihLxpKIbQfJom_h4gsBu4ImXlkN-2kTWOgAXSjDS4tSX4q_TZim3tJnxwzE3j-pxTa66i9mBWwTS4cZZ3AwBVGowenKzl2sMoWyFa3-HdS6NjmQH0IEwIQHHIKxfLX9NA',
    popular: false,
  },
  {
    id: 'item-3',
    name: 'Truffle Mushroom Burger',
    description: 'Wagyu blend, truffle aioli, portobello mushrooms, gruyere',
    price: 28.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA136ow7Jmia34BeGN8-5MwCxwZUoQWT4ppwvzXhwTXl_Ds8uoW3vxqH3OnfQRtgzVMmblZYOu_XtqPmTPaqpdl9Je7qfDh_NdjKBW7K_9Xmmpcel0yrEE2OihLxpKIbQfJom_h4gsBu4ImXlkN-2kTWOgAXSjDS4tSX4q_TZim3tJnxwzE3j-pxTa66i9mBWwTS4cZZ3AwBVGowenKzl2sMoWyFa3-HdS6NjmQH0IEwIQHHIKxfLX9NA',
    popular: true,
  },
];

export default function RestaurantPage() {
  const [activeTab, setActiveTab] = useState<'menu' | 'reviews' | 'info'>('menu');
  const [activeNav] = useState<NavItem>('home');
  const addItem = useCartStore((state) => state.addItem);
  const totalItems = useCartStore((state) => state.getTotalItems());

  const handleAddToCart = (item: typeof menuItems[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top App Bar */}
      <TopAppBar 
        cartItemCount={totalItems}
        onMenuClick={() => console.log('Menu')}
        onCartClick={() => console.log('Cart')}
      />
      
      {/* Main Content */}
      <main className="flex-1 pb-24 md:pb-xl">
        {/* Hero Image Section */}
        <div className="relative w-full h-64 md:h-80 overflow-hidden">
          <img
            src={restaurantData.image}
            alt={restaurantData.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Back Button */}
          <button 
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
            onClick={() => console.log('Go back')}
          >
            <span className="material-symbols-outlined text-on-surface">arrow_forward</span>
          </button>
          
          {/* Restaurant Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-lg text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="font-bold">{restaurantData.rating}</span>
              <span className="text-white/70">•</span>
              <span className="text-white/70">{restaurantData.deliveryTime}</span>
              <span className="text-white/70">•</span>
              <span className="text-white/70">{restaurantData.deliveryFee} delivery</span>
            </div>
            <h1 className="text-headline-lg-mobile md:text-headline-lg-custom font-bold text-white">
              {restaurantData.name}
            </h1>
            <p className="text-body-md-custom text-white/80 mt-1">
              {restaurantData.cuisine}
            </p>
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-lg">
          {/* Description */}
          <p className="text-body-md-custom text-secondary mb-lg">
            {restaurantData.description}
          </p>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-surface-variant mb-lg">
            {(['menu', 'reviews', 'info'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  pb-3 px-2 font-label-md uppercase tracking-wider transition-colors relative
                  ${activeTab === tab ? 'text-primary' : 'text-secondary hover:text-foreground'}
                `}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          {activeTab === 'menu' && (
            <div className="grid grid-cols-1 gap-4">
              {menuItems.map((item) => (
                <article
                  key={item.id}
                  className="bg-surface-lowest rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group"
                >
                  <div className="flex gap-4 p-4">
                    {/* Item Image */}
                    <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-surface-low">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-title-lg-custom text-foreground line-clamp-1">
                            {item.name}
                          </h3>
                          <span className="font-title-lg-custom text-primary whitespace-nowrap">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-body-md-custom text-secondary line-clamp-2 mt-1 text-xs">
                          {item.description}
                        </p>
                      </div>

                      {/* Add Button & Popular Badge */}
                      <div className="flex items-center justify-between mt-2">
                        {item.popular && (
                          <span className="bg-error-container text-primary font-label-md px-2 py-0.5 rounded-full text-[10px]">
                            🔥 Popular
                          </span>
                        )}
                        {!item.popular && <span />}
                        
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="
                            bg-primary text-on-primary font-label-md px-4 py-2 rounded-full
                            hover:bg-primary-container transition-colors active:scale-95
                            flex items-center gap-1
                          "
                        >
                          <span className="material-symbols-outlined text-[16px]">add</span>
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Reviews Tab Placeholder */}
          {activeTab === 'reviews' && (
            <div className="text-center py-12 text-secondary">
              <span className="material-symbols-outlined text-4xl mb-4 block">rate_review</span>
              <p>Customer reviews coming soon!</p>
            </div>
          )}

          {/* Info Tab Placeholder */}
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div className="bg-surface-lowest rounded-xl p-4 shadow-card">
                <h3 className="font-title-lg-custom text-foreground mb-2">📍 Address</h3>
                <p className="text-body-md-custom text-secondary">123 Food Street, Culinary District</p>
              </div>
              <div className="bg-surface-lowest rounded-xl p-4 shadow-card">
                <h3 className="font-title-lg-custom text-foreground mb-2">⏰ Hours</h3>
                <p className="text-body-md-custom text-secondary">Mon-Sun: 11:00 AM - 11:00 PM</p>
              </div>
              <div className="bg-surface-lowest rounded-xl p-4 shadow-card">
                <h3 className="font-title-lg-custom text-foreground mb-2">📞 Contact</h3>
                <p className="text-body-md-custom text-secondary">(555) 123-4567</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav 
        activeItem={activeNav}
        onNavigate={(item) => console.log('Navigate:', item)}
      />
    </div>
  );
}
