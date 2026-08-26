'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { TopAppBar } from '@/components/layout/TopAppBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { useCartStore } from '@/lib/store/cart-store';
import type { NavItem } from '@/components/layout/BottomNav';
import { toast } from 'sonner';

// Mock restaurant data - in real app this would come from API
const restaurantsData: Record<string, any> = {
  '1': {
    id: '1',
    name: 'The Smashed Patty',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1HXervz8JH-FrvTBzvQssE17h33O3G1paUkNxWRJi1s2sRqmivkkWTkZIPUZ6czX8pZiW4S1meE6Ifz8D4vttCf7PQZHNsnMXSXf_9RBZDrvggigHGuit9yYxLjYXbKCsuaDfdthh3byp8xIA5M5jg52UfepJYQz2BQojr1ii-JFzblWlpmjtg_MzTzs3JoU2sUBrvDzYhx_fditSl0xJE7-U-f20uQh-Gzbi3pOg7zpR3SU2b7T3Cg',
    rating: 4.9,
    cuisine: 'American • Burgers • Comfort Food',
    deliveryTime: '20-30 min',
    deliveryFee: '$2.99',
    description: 'Premium artisanal burgers with the finest ingredients. Every patty is hand-crafted and smashed to perfection for maximum flavor.',
  },
  '2': {
    id: '2',
    name: 'Okinawa Sushi Bar',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC37CdES3Ld-DStTokzKzMC88xAuNlCXpA2pboQsV6wITzHzQgz4yi5y_Vk39Die4ZfAhRJGnwO27nMkSSmE_T0nGU_cTS5bTe5CJTRvguejuX4gVp_015DFKeZV25bCpnhlM0rAFkNpr9PHA2sF9a1vB1vud5P0zVXaP-dCzNcaGhJIjnRS4IlnJtAPP7uFjC4FAJIF_ESawxfWAWJeTrLouHlBzFq9J6fFU_cgaQ4v9EPdv-eaY7AqQ',
    rating: 4.7,
    cuisine: 'Japanese • Sushi • Asian',
    deliveryTime: '35-45 min',
    deliveryFee: '$0.00 (Free)',
    description: 'Authentic Japanese cuisine with the freshest fish flown in daily. Experience the art of sushi.',
  },
  '3': {
    id: '3',
    name: 'Vesuvio Pizzeria',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqkDiZ8PndcpUxwJA6ebMI6EZ1r-ZSZfoBINHE-Yh33CfJLFETe2C5Plz1oSkSVVjf7zo0cbDK97Er82yLUhKMVcZxh1KiWKr1LgT7efou-JtmLJ-q0GBAOVMdvPUnr-ZMlSlql75VcUbTpg3QNT-hIEqoeh3KNDydmxAu-oJs3mwgaXtdocTaJ5PhQmb0nFpqHLLOv6Uk9TUSRVHX8IUeBjmwRsJw8UD4RG1cH8cm2Krg76iPwMWg2g',
    rating: 4.8,
    cuisine: 'Italian • Pizza • Authentic',
    deliveryTime: '25-40 min',
    deliveryFee: '$1.49',
    description: 'Traditional Neapolitan pizza made with love. Wood-fired oven, imported Italian ingredients.',
  },
};

const menuItemsByRestaurant: Record<string, any[]> = {
  '1': [
    {
      id: 'item-1-1',
      name: 'Signature Wagyu Burger',
      description: 'A5 Wagyu beef, caramelized onions, special sauce, brioche bun',
      price: 24.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA136ow7Jmia34BeGN8-5MwCxwZUoQWT4ppwvzXhwTXl_Ds8uoW3vxqH3OnfQRtgzVMmblZYOu_XtqPmTPaqpdl9Je7qfDh_NdjKBW7K_9Xmmpcel0yrEE2OihLxpKIbQfJom_h4gsBu4ImXlkN-2kTWOgAXSjDS4tSX4q_TZim3tJnxwzE3j-pxTa66i9mBWwTS4cZZ3AwBVGowenKzl2sMoWyFa3-HdS6NjmQH0IEwIQHHIKxfLX9NA',
      popular: true,
    },
    {
      id: 'item-1-2',
      name: 'Classic Cheeseburger',
      description: 'Angus beef, cheddar cheese, lettuce, tomato, pickles',
      price: 16.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA136ow7Jmia34BeGN8-5MwCxwZUoQWT4ppwvzXhwTXl_Ds8uoW3vxqH3OnfQRtgzVMmblZYOu_XtqPmTPaqpdl9Je7qfDh_NdjKBW7K_9Xmmpcel0yrEE2OihLxpKIbQfJom_h4gsBu4ImXlkN-2kTWOgAXSjDS4tSX4q_TZim3tJnxwzE3j-pxTa66i9mBWwTS4cZZ3AwBVGowenKzl2sMoWyFa3-HdS6NjmQH0IEwIQHHIKxfLX9NA',
      popular: false,
    },
    {
      id: 'item-1-3',
      name: 'Truffle Mushroom Burger',
      description: 'Wagyu blend, truffle aioli, portobello mushrooms, gruyere',
      price: 28.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA136ow7Jmia34BeGN8-5MwCxwZUoQWT4ppwvzXhwTXl_Ds8uoW3vxqH3OnfQRtgzVMmblZYOu_XtqPmTPaqpdl9Je7qfDh_NdjKBW7K_9Xmmpcel0yrEE2OihLxpKIbQfJom_h4gsBu4ImXlkN-2kTWOgAXSjDS4tSX4q_TZim3tJnxwzE3j-pxTa66i9mBWwTS4cZZ3AwBVGowenKzl2sMoWyFa3-HdS6NjmQH0IEwIQHHIKxfLX9NA',
      popular: true,
    },
  ],
  '2': [
    {
      id: 'item-2-1',
      name: 'Omakase Sushi Platter',
      description: "Chef's selection of 12 premium nigiri pieces",
      price: 45.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC37CdES3Ld-DStTokzKzMC88xAuNlCXpA2pboQsV6wITzHzQgz4yi5y_Vk39Die4ZfAhRJGnwO27nMkSSmE_T0nGU_cTS5bTe5CJTRvguejuX4gVp_015DFKeZV25bCpnhlM0rAFkNpr9PHA2sF9a1vB1vud5P0zVXaP-dCzNcaGhJIjnRS4IlnJtAPP7uFjC4FAJIF_ESawxfWAWJeTrLouHlBzFq9J6fFU_cgaQ4v9EPdv-eaY7AqQ',
      popular: true,
    },
    {
      id: 'item-2-2',
      name: 'Dragon Roll',
      description: 'Shrimp tempura, avocado, eel sauce, tobiko',
      price: 18.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC37CdES3Ld-DStTokzKzMC88xAuNlCXpA2pboQsV6wITzHzQgz4yi5y_Vk39Die4ZfAhRJGnwO27nMkSSmE_T0nGU_cTS5bTe5CJTRvguejuX4gVp_015DFKeZV25bCpnhlM0rAFkNpr9PHA2sF9a1vB1vud5P0zVXaP-dCzNcaGhJIjnRS4IlnJtAPP7uFjC4FAJIF_ESawxfWAWJeTrLouHlBzFq9J6fFU_cgaQ4v9EPdv-eaY7AqQ',
      popular: false,
    },
  ],
  '3': [
    {
      id: 'item-3-1',
      name: 'Margherita Pizza',
      description: 'San Marzano tomatoes, fresh mozzarella, basil',
      price: 14.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqkDiZ8PndcpUxwJA6ebMI6EZ1r-ZSZfoBINHE-Yh33CfJLFETe2C5Plz1oSkSVVjf7zo0cbDK97Er82yLUhKMVcZxh1KiWKr1LgT7efou-JtmLJ-q0GBAOVMdvPUnr-ZMlSlql75VcUbTpg3QNT-hIEqoeh3KNDydmxAu-oJs3mwgaXtdocTaJ5PhQmb0nFpqHLLOv6Uk9TUSRVHX8IUeBjmwRsJw8UD4RG1cH8cm2Krg76iPwMWg2g',
      popular: true,
    },
    {
      id: 'item-3-2',
      name: 'Quattro Formaggi',
      description: 'Mozzzarella, gorgonzola, parmesan, fontina',
      price: 17.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqkDiZ8PndcpUxwJA6ebMI6EZ1r-ZSZfoBINHE-Yh33CfJLFETe2C5Plz1oSkSVVjf7zo0cbDK97Er82yLUhKMVcZxh1KiWKr1LgT7efou-JtmLJ-q0GBAOVMdvPUnr-ZMlSlql75VcUbTpg3QNT-hIEqoeh3KNDydmxAu-oJs3mwgaXtdocTaJ5PhQmb0nFpqHLLOv6Uk9TUSRVHX8IUeBjmwRsJw8UD4RG1cH8cm2Krg76iPwMWg2g',
      popular: false,
    },
  ],
};

export default function RestaurantPage() {
  const router = useRouter();
  const params = useParams();
  const [activeTab, setActiveTab] = useState<'menu' | 'reviews' | 'info'>('menu');
  const [activeNav] = useState<NavItem>('home');
  
  const addItem = useCartStore((state) => state.addItem);
  const totalItems = useCartStore((state) => state.getTotalItems());

  const restaurantId = params.id as string;
  const restaurant = restaurantsData[restaurantId] || restaurantsData['1'];
  const menuItems = menuItemsByRestaurant[restaurantId] || menuItemsByRestaurant['1'];

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
    });
    
    // Show subtle toast notification instead of alert
    toast.success(`تمت الإضافة: ${item.name}`, {
      duration: 2000,
      position: 'bottom-center',
      style: {
        background: '#b90027',
        color: '#ffffff',
        borderRadius: '12px',
        fontFamily: 'Inter, sans-serif',
      },
    });
  };

  const handleBack = () => {
    router.back();
  };

  const handleNavClick = (item: NavItem) => {
    switch (item) {
      case 'home':
        router.push('/');
        break;
      case 'search':
        router.push('/search');
        break;
      case 'orders':
        console.log('Navigate to orders');
        break;
      case 'account':
        console.log('Navigate to account');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top App Bar */}
      <TopAppBar 
        cartItemCount={totalItems}
        onMenuClick={() => console.log('Menu')}
        onCartClick={() => router.push('/cart')}
      />
      
      {/* Main Content */}
      <main className="flex-1 pb-24 md:pb-xl">
        {/* Hero Image Section */}
        <div className="relative w-full h-64 md:h-80 overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Back Button */}
          <button 
            onClick={handleBack}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-on-surface">arrow_forward</span>
          </button>
          
          {/* Restaurant Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-lg text-white">
            <div className="flex items-center gap-2 mb-2">
              <span 
                className="material-symbols-outlined text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span className="font-bold">{restaurant.rating}</span>
              <span className="text-white/70">•</span>
              <span className="text-white/70">{restaurant.deliveryTime}</span>
              <span className="text-white/70">•</span>
              <span className="text-white/70">{restaurant.deliveryFee} delivery</span>
            </div>
            <h1 className="text-headline-lg-mobile md:text-2xl font-bold text-white">
              {restaurant.name}
            </h1>
            <p className="text-body-md-custom text-white/80 mt-1">
              {restaurant.cuisine}
            </p>
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-lg">
          {/* Description */}
          <p className="text-sm text-secondary mb-lg leading-relaxed">
            {restaurant.description}
          </p>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-surface-variant mb-lg">
            {(['menu', 'reviews', 'info'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  pb-3 px-2 uppercase tracking-wider transition-colors relative text-xs font-semibold
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
                          <h3 className="font-semibold text-foreground line-clamp-1">
                            {item.name}
                          </h3>
                          <span className="font-semibold text-primary whitespace-nowrap">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-xs text-secondary line-clamp-2 mt-1">
                          {item.description}
                        </p>
                      </div>

                      {/* Add Button & Popular Badge */}
                      <div className="flex items-center justify-between mt-2">
                        {item.popular && (
                          <span className="bg-error-container text-primary px-2 py-0.5 rounded-full text-[10px] font-semibold">
                            🔥 Popular
                          </span>
                        )}
                        {!item.popular && <span />}
                        
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="
                            bg-primary text-on-primary px-4 py-2 rounded-full
                            hover:bg-primary-container transition-colors active:scale-95
                            flex items-center gap-1 text-xs font-semibold
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
            <div className="text-center py-16 bg-surface-lowest rounded-xl shadow-card">
              <span className="material-symbols-outlined text-5xl text-surface-highest mb-4 block">rate_review</span>
              <h3 className="font-semibold text-foreground mb-2">Reviews Coming Soon!</h3>
              <p className="text-sm text-secondary">Customer reviews will appear here.</p>
              
              {/* Sample Reviews Preview */}
              <div className="mt-8 space-y-4 max-w-md mx-auto text-right">
                <div className="bg-background p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">A</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">Ahmed M.</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-primary text-xs">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-secondary">"Best burger I've ever had! The wagyu is incredible."</p>
                </div>
                
                <div className="bg-background p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">S</span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">Sarah K.</p>
                      <div className="flex items-center gap-1">
                        {[...Array(4)].map((_, i) => (
                          <span key={i} className="text-primary text-xs">★</span>
                        ))}
                        <span className="text-surface-highest text-xs">★</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-secondary">"Great food, fast delivery! Will order again."</p>
                </div>
              </div>
            </div>
          )}

          {/* Info Tab */}
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div className="bg-surface-lowest rounded-xl p-4 shadow-card">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  📍 Address
                </h3>
                <p className="text-sm text-secondary">123 Food Street, Culinary District, Downtown</p>
              </div>
              
              <div className="bg-surface-lowest rounded-xl p-4 shadow-card">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  ⏰ Hours
                </h3>
                <div className="space-y-1 text-sm text-secondary">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-foreground">11:00 AM - 11:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday - Sunday</span>
                    <span className="text-foreground">10:00 AM - 12:00 AM</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-surface-lowest rounded-xl p-4 shadow-card">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  📞 Contact
                </h3>
                <p className="text-sm text-secondary">(555) 123-4567</p>
                <p className="text-sm text-secondary">hello@{restaurant.name.toLowerCase().replace(/\s+/g, '')}.com</p>
              </div>
              
              <div className="bg-surface-lowest rounded-xl p-4 shadow-card">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  💳 Payment Methods
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {['Visa', 'Mastercard', 'Cash', 'Apple Pay'].map((method) => (
                    <span key={method} className="bg-background px-3 py-1 rounded-full text-xs text-secondary border border-surface-variant">
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav 
        activeItem={activeNav}
        onNavigate={handleNavClick}
      />
    </div>
  );
}
