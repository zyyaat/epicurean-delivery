'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TopAppBar } from '@/components/layout/TopAppBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { useCartStore } from '@/lib/store/cart-store';
import type { NavItem } from '@/components/layout/BottomNav';
import { toast } from 'sonner';

export default function CartPage() {
  const router = useRouter();
  const [activeNav] = useState<NavItem>('home');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  
  const {
    items,
    removeItem,
    updateQuantity,
    getSubtotal,
    getDeliveryFee,
    getTax,
    getTotal,
    clearCart
  } = useCartStore();

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const tax = getTax();
  const total = getTotal();

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      setPromoApplied(true);
      toast.success(`تم تطبيق الكود: ${promoCode}`, {
        duration: 2000,
        position: 'bottom-center',
        style: {
          background: 'linear-gradient(135deg, #ff2d55 0%, #d41b3c 100%)',
          color: '#ffffff',
          borderRadius: '16px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          boxShadow: '0 8px 24px rgba(212, 27, 60, 0.3)',
        },
      });
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    // Show checkout confirmation
    const confirmed = confirm(`متابعة للدفع؟\n\nالإجمالي: $${total.toFixed(2)}\n\nعدد المنتجات: ${items.length}`);
    
    if (confirmed) {
      toast.success('تم الطلب بنجاح! 🎉', {
        duration: 3000,
        position: 'bottom-center',
        style: {
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: '#ffffff',
          borderRadius: '16px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
        },
      });
      clearCart();
      router.push('/');
    }
  };

  const handleContinueShopping = () => {
    router.push('/');
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
        onMenuClick={() => console.log('Menu')}
        onCartClick={() => {}}
      />
      
      {/* Main Content - Modern Design */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-margin-mobile pt-lg pb-36 flex flex-col gap-xl relative">
        {/* Page Title - Modern gradient accent */}
        <div className="relative">
          <div className="absolute -left-4 top-0 w-1.5 h-10 gradient-primary rounded-full" />
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-background pl-4">
            Your Order
          </h2>
          <p className="font-body-md text-body-md text-secondary mt-2 pl-4">
            Review items before checkout
          </p>
        </div>

        {/* Cart Items List */}
        <section className="flex flex-col gap-4">
          {items.length === 0 ? (
            /* Empty Cart State - Modern friendly design */
            <div className="
              text-center py-20 
              card-modern p-10
              animate-fade-in
            ">
              {/* Animated empty cart icon */}
              <div className="relative inline-block mb-6">
                <span className="
                  material-symbols-outlined text-[80px] 
                  bg-gradient-to-br from-surface-container-high to-surface-container 
                  text-secondary block animate-float
                " style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
                  shopping_cart
                </span>
                <span className="absolute -top-2 -right-2 text-3xl animate-pulse-soft">😋</span>
              </div>
              
              <h3 className="font-headline-md text-headline-md text-on-background mb-3">
                Your cart is empty
              </h3>
              <p className="font-body-lg text-body-lg text-secondary mb-8 max-w-sm mx-auto leading-relaxed">
                Looks like you haven't added any delicious items yet. Let's explore some amazing food!
              </p>
              
              <button
                onClick={handleContinueShopping}
                className="
                  btn-primary inline-flex items-center gap-3
                  text-base px-8 py-4
                "
              >
                <span className="material-symbols-outlined text-[22px]">restaurant</span>
                Browse Restaurants
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              /* Cart Item - Fixed layout with proper text display */
              <article
                key={item.id}
                className="
                  bg-white rounded-[20px] p-4 
                  shadow-card hover:shadow-card-hover
                  border border-surface-container/50
                  transition-all duration-300 ease-out
                  hover-lift animate-slide-up
                "
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Header Row: Name + Price */}
                <div className="flex justify-between items-start gap-3 mb-2">
                  {/* Name & Description - Gets priority space */}
                  <div className="flex-1 min-w-0" style={{ direction: 'ltr' }}>
                    <h3 
                      className="font-title-lg text-title-lg text-on-background font-semibold 
                        truncate"
                      title={item.name}
                    >
                      {item.name}
                    </h3>
                    <p 
                      className="font-body-md text-body-md text-secondary mt-0.5 truncate"
                      title={item.description}
                    >
                      {item.description}
                    </p>
                  </div>
                  {/* Price - Fixed, won't push content */}
                  <span className="text-primary text-lg font-bold shrink-0 tabular-nums font-title-lg ml-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                {/* Bottom Row: Image + Actions */}
                <div className="flex items-center gap-3">
                  {/* Item Image - Smaller size */}
                  <div 
                    className="w-[72px] h-[72px] flex-shrink-0 rounded-xl overflow-hidden relative 
                      bg-gradient-to-br from-surface-container-low to-surface-container"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* Remove Button */}
                  <button
                    onClick={() => {
                      removeItem(item.id);
                      toast.error('تم الحذف', {
                        duration: 1500,
                        position: 'bottom-center',
                        style: {
                          background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                          color: '#ffffff',
                          borderRadius: '14px',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 600,
                          boxShadow: '0 8px 24px rgba(220, 38, 38, 0.25)',
                        },
                      });
                    }}
                    className="
                      text-secondary hover:text-error 
                      transition-colors text-xs font-label-md 
                      flex items-center gap-1 px-2.5 py-1.5 rounded-xl
                      hover:bg-red-50 press-effect
                    "
                  >
                    <span className="material-symbols-outlined text-[18px]">delete_outline</span>
                    <span>حذف</span>
                  </button>

                  {/* Quantity Control */}
                  <div className="
                    flex items-center bg-gray-50 rounded-full px-2 py-1 gap-0.5
                    border border-gray-200
                  ">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="
                        w-8 h-8 flex items-center justify-center rounded-full
                        text-gray-600 hover:text-primary hover:bg-red-50
                        transition-all active:scale-90
                      "
                      disabled={item.quantity <= 1}
                    >
                      <span className="material-symbols-outlined text-[20px]">remove</span>
                    </button>
                    
                    <span className="w-6 text-center font-bold text-on-background text-sm tabular-nums">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="
                        w-8 h-8 flex items-center justify-center rounded-full
                        text-gray-600 hover:text-primary hover:bg-red-50
                        transition-all active:scale-90
                      "
                    >
                      <span className="material-symbols-outlined text-[20px]">add</span>
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>

        {/* Promotions Section - Modern card */}
        {items.length > 0 && (
          <section className="card-modern p-6 animate-slide-up">
            <h3 className="font-title-lg text-title-lg text-on-background mb-4 text-lg flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-warning text-[22px]" data-icon="local_offer" style={{ fontVariationSettings: "'FILL' 1" }}>local_offer</span>
              </span>
              Promotions
            </h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value);
                  setPromoApplied(false);
                }}
                placeholder="Enter promo code"
                disabled={promoApplied}
                className="
                  flex-grow bg-surface-container-lowest border-2 border-surface-container-high rounded-2xl px-5 py-3.5 
                  font-body-md text-body-md text-on-background placeholder:text-secondary/60 
                  focus:outline-none focus:border-primary/40 focus:bg-white focus:shadow-search
                  transition-all duration-300 disabled:opacity-60
                "
              />
              <button
                onClick={handleApplyPromo}
                disabled={promoApplied || !promoCode.trim()}
                className={`
                  font-label-md text-label-md px-7 py-3.5 rounded-2xl whitespace-nowrap
                  transition-all duration-300 press-effect
                  ${promoApplied 
                    ? 'bg-success-light text-success font-bold border-2 border-success/30' 
                    : 'gradient-primary text-white hover:shadow-glow active:scale-95'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none
                `}
              >
                {promoApplied ? (
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]" data-icon="check_circle" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    Applied
                  </span>
                ) : 'Apply'}
              </button>
            </div>
          </section>
        )}

        {/* Order Summary - Modern card with visual hierarchy */}
        {items.length > 0 && (
          <section className="card-modern p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <h3 className="font-title-lg text-title-lg text-on-background mb-5 text-lg flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[22px]" data-icon="receipt" style={{ fontVariationSettings: "'FILL' 1" }}>receipt</span>
              </span>
              Order Summary
            </h3>
            
            <div className="flex flex-col gap-4 font-body-md text-body-md">
              {/* Subtotal */}
              <div className="flex justify-between items-center text-secondary">
                <span className="flex items-center gap-2">
                  Subtotal
                  <span className="text-xs bg-surface-container-high px-2 py-0.5 rounded-full">
                    {items.length} item{items.length > 1 ? 's' : ''}
                  </span>
                </span>
                <span className="text-on-background font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              {/* Delivery Fee */}
              <div className="flex justify-between items-center text-secondary">
                <span className="flex items-center gap-2">
                  Delivery Fee
                  <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                </span>
                <span className={`font-medium ${deliveryFee === 0 ? 'text-success' : 'text-on-background'}`}>
                  {deliveryFee === 0 ? 'Free!' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              
              {/* Taxes & Fees */}
              <div className="flex justify-between items-center text-secondary">
                <span className="flex items-center gap-2">
                  Taxes & Fees
                  <span className="material-symbols-outlined text-[14px]">receipt_long</span>
                </span>
                <span className="text-on-background font-medium">${tax.toFixed(2)}</span>
              </div>
              
              {/* Divider - Gradient */}
              <div className="h-px bg-gradient-to-r from-transparent via-surface-container to-transparent my-2"></div>
              
              {/* Total - Prominent display */}
              <div className="flex justify-between items-center pt-2">
                <span className="font-title-lg text-title-lg text-on-background text-lg font-bold">
                  Total
                </span>
                <div className="text-right">
                  <span className="text-primary font-black text-3xl tabular-nums block">
                    ${total.toFixed(2)}
                  </span>
                  <span className="text-xs text-secondary font-label-md">
                    Including all fees
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Clear Cart Button - Modern danger style */}
        {items.length > 0 && (
          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear your cart?')) {
                clearCart();
                toast.info('تم مسح السلة', {
                  duration: 2000,
                  position: 'bottom-center',
                  style: {
                    background: '#6b7280',
                    color: '#ffffff',
                    borderRadius: '14px',
                  },
                });
              }
            }}
            className="
              text-error hover:bg-error-container/50 
              transition-all duration-300 font-label-md text-label-md 
              py-3 rounded-2xl text-center flex items-center justify-center gap-2
              border border-error/20 hover:border-error/40 press-effect
            "
          >
            <span className="material-symbols-outlined text-[18px]" data-icon="delete_sweep">delete_sweep</span>
            Clear Cart
          </button>
        )}
      </main>

      {/* Fixed Bottom Checkout Button - Modern gradient */}
      {items.length > 0 && (
        <div className="
          fixed bottom-0 left-0 right-0 
          glass-strong border-t border-white/30
          p-margin-mobile z-40 shadow-floating
          md:left-0 md:right-0
        ">
          <div className="max-w-3xl mx-auto w-full">
            <button
              onClick={handleCheckout}
              className="
                w-full btn-primary py-5 text-lg
                flex items-center justify-center gap-3
                relative overflow-hidden group
              "
            >
              {/* Shimmer effect on hover */}
              <span className="
                absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700
              " />
              
              <span>Go to Checkout</span>
              <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform" data-icon="arrow_forward">arrow_forward</span>
            </button>
            
            {/* Secure checkout indicator */}
            <div className="flex items-center justify-center gap-2 mt-2 text-secondary">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              <span className="text-xs font-label-md">Secure Checkout</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation - Hide when cart has items */}
      {items.length === 0 && (
        <BottomNav 
          activeItem={activeNav}
        />
      )}
    </div>
  );
}
