'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TopAppBar } from '@/components/layout/TopAppBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { useCartStore } from '@/lib/store/cart-store';
import type { NavItem } from '@/components/layout/BottomNav';

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
      alert(`✅ Promo code "${promoCode}" applied! (Demo)`);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    // Show checkout confirmation
    const confirmed = confirm(`Proceed to checkout?\n\nTotal: $${total.toFixed(2)}\n\nItems: ${items.length}`);
    
    if (confirmed) {
      alert('🎉 Order placed successfully!\n\nThis is a demo - in production this would redirect to payment.');
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
      
      {/* Main Content - Matching Original Design Exactly */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-margin-mobile pt-lg pb-32 flex flex-col gap-xl relative">
        {/* Page Title */}
        <div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-background">
            Your Order
          </h2>
          <p className="font-body-md text-body-md text-secondary mt-1">
            Review items before checkout
          </p>
        </div>

        {/* Cart Items List */}
        <section className="flex flex-col gap-md">
          {items.length === 0 ? (
            /* Empty Cart State */
            <div className="text-center py-16 bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.03)]">
              <span className="material-symbols-outlined text-7xl text-surface-container-highest mb-4 block">
                shopping_cart
              </span>
              <h3 className="font-title-lg text-title-lg text-on-background mb-2">
                Your cart is empty
              </h3>
              <p className="font-body-md text-body-md text-secondary mb-6 max-w-xs mx-auto">
                Looks like you haven't added any items yet. Let's fix that!
              </p>
              <button
                onClick={handleContinueShopping}
                className="
                  bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded-full
                  hover:bg-primary-container transition-colors active:scale-95
                  inline-flex items-center gap-2
                "
              >
                <span className="material-symbols-outlined text-[18px]">restaurant</span>
                Browse Restaurants
              </button>
            </div>
          ) : (
            items.map((item) => (
              /* Cart Item - Matching Original Design Exactly */
              <article
                key={item.id}
                className="flex gap-md bg-surface p-sm rounded-xl shadow-[0_4px_20px_0_rgba(0,0,0,0.03)] border border-surface-variant"
              >
                {/* Item Image */}
                <div 
                  className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden relative bg-surface-container-low cursor-pointer"
                  onClick={() => alert(`View ${item.name} details`)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Item Details */}
                <div className="flex flex-col justify-between flex-grow py-1">
                  {/* Name & Price Row */}
                  <div className="flex justify-between items-start gap-2">
                    <div 
                      className="cursor-pointer"
                      onClick={() => alert(`View ${item.name} details`)}
                    >
                      <h3 className="font-title-lg text-title-lg text-on-background line-clamp-1 text-base">
                        {item.name}
                      </h3>
                      <p className="font-body-md text-body-md text-secondary line-clamp-1 text-xs mt-0.5">
                        {item.description}
                      </p>
                    </div>
                    <span className="font-title-lg text-title-lg text-on-background text-base shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Actions Row */}
                  <div className="flex justify-between items-center mt-2">
                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-secondary hover:text-error transition-colors text-xs font-label-md text-label-md flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                        delete
                      </span>
                      Remove
                    </button>

                    {/* Quantity Control - Matching Original Design */}
                    <div className="flex items-center bg-surface-container-low rounded-full px-2 py-1 gap-3 border border-surface-variant">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-on-surface hover:text-primary transition-colors flex items-center justify-center w-6 h-6 rounded-full active:scale-90"
                        disabled={item.quantity <= 1}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                          remove
                        </span>
                      </button>
                      
                      <span className="font-title-lg text-title-lg text-sm w-4 text-center text-on-surface">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-on-surface hover:text-primary transition-colors flex items-center justify-center w-6 h-6 rounded-full active:scale-90"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                          add
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>

        {/* Promotions Section - Only show if cart has items - Matching Original Design */}
        {items.length > 0 && (
          <section className="bg-surface rounded-xl p-lg shadow-[0_4px_20px_0_rgba(0,0,0,0.03)] border border-surface-variant">
            <h3 className="font-title-lg text-title-lg text-on-background mb-4 text-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">local_offer</span>
              Promotions
            </h3>
            <div className="flex gap-2">
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
                  flex-grow bg-background border border-surface-variant rounded-lg px-4 py-3 
                  font-body-md text-body-md text-on-background placeholder:text-secondary 
                  focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all
                "
              />
              <button
                onClick={handleApplyPromo}
                disabled={promoApplied || !promoCode.trim()}
                className="
                  bg-surface-container-high text-on-surface font-label-md text-label-md px-6 py-3 rounded-lg 
                  hover:bg-surface-variant transition-colors whitespace-nowrap active:scale-95
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {promoApplied ? '✓ Applied' : 'Apply'}
              </button>
            </div>
          </section>
        )}

        {/* Order Summary - Only show if cart has items - Matching Original Design */}
        {items.length > 0 && (
          <section className="bg-surface rounded-xl p-lg shadow-[0_4px_20px_0_rgba(0,0,0,0.03)] border border-surface-variant">
            <h3 className="font-title-lg text-title-lg text-on-background mb-4 text-lg">
              Order Summary
            </h3>
            
            <div className="flex flex-col gap-3 font-body-md text-body-md">
              {/* Subtotal */}
              <div className="flex justify-between items-center text-secondary">
                <span>Subtotal ({items.length} item{items.length > 1 ? 's' : ''})</span>
                <span className="text-on-background">${subtotal.toFixed(2)}</span>
              </div>
              
              {/* Delivery Fee */}
              <div className="flex justify-between items-center text-secondary">
                <span>Delivery Fee</span>
                <span className="text-on-background">
                  {deliveryFee === 0 ? '$0.00' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              
              {/* Taxes & Fees */}
              <div className="flex justify-between items-center text-secondary">
                <span>Taxes & Fees</span>
                <span className="text-on-background">${tax.toFixed(2)}</span>
              </div>
              
              {/* Divider */}
              <div className="h-px bg-surface-variant my-2 w-full"></div>
              
              {/* Total - Matching Original Design */}
              <div className="flex justify-between items-center font-title-lg text-title-lg text-on-background">
                <span>Total</span>
                <span className="text-primary font-bold text-2xl">${total.toFixed(2)}</span>
              </div>
            </div>
          </section>
        )}

        {/* Clear Cart Button - Only show if cart has items */}
        {items.length > 0 && (
          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear your cart?')) {
                clearCart();
              }
            }}
            className="text-error hover:bg-error-container transition-colors font-label-md text-label-md py-2 rounded-lg text-center"
          >
            🗑️ Clear Cart
          </button>
        )}
      </main>

      {/* Fixed Bottom Checkout Button - Only show if cart has items - Matching Original Design */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-md border-t border-surface-variant p-margin-mobile z-40 shadow-[0_-8px_30px_0_rgba(0,0,0,0.08)]">
          <div className="max-w-3xl mx-auto w-full">
            <button
              onClick={handleCheckout}
              className="
                w-full bg-primary text-on-primary font-title-lg text-title-lg py-4 rounded-xl 
                shadow-md hover:bg-surface-tint transition-colors active:scale-[0.98] 
                flex items-center justify-center gap-2
              "
            >
              <span>Go to Checkout</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation - Hide when cart has items */}
      {items.length === 0 && (
        <BottomNav 
          activeItem={activeNav}
          onNavigate={handleNavClick}
        />
      )}
    </div>
  );
}
