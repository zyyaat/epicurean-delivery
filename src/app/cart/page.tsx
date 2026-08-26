'use client';

import React, { useState } from 'react';
import { TopAppBar } from '@/components/layout/TopAppBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { useCartStore } from '@/lib/store/cart-store';
import type { NavItem } from '@/components/layout/BottomNav';

export default function CartPage() {
  const [activeNav] = useState<NavItem>('home');
  const [promoCode, setPromoCode] = useState('');
  
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
    console.log('Apply promo code:', promoCode);
    // In a real app, validate and apply promo code
  };

  const handleCheckout = () => {
    console.log('Proceed to checkout');
    alert('Checkout functionality would be implemented here! 💳');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top App Bar */}
      <TopAppBar onMenuClick={() => console.log('Menu')} />
      
      {/* Main Content */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-margin-mobile pt-lg pb-32 flex flex-col gap-xl relative">
        {/* Page Title */}
        <div>
          <h2 className="text-headline-lg-mobile text-foreground">Your Order</h2>
          <p className="text-body-md-custom text-secondary mt-1">Review items before checkout</p>
        </div>

        {/* Cart Items List */}
        <section className="flex flex-col gap-md">
          {items.length === 0 ? (
            /* Empty Cart State */
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-6xl text-surface-highest mb-4 block">
                shopping_cart
              </span>
              <h3 className="text-title-lg-custom text-foreground mb-2">Your cart is empty</h3>
              <p className="text-body-md-custom text-secondary">
                Add some delicious items to get started!
              </p>
            </div>
          ) : (
            items.map((item) => (
              /* Cart Item */
              <article
                key={item.id}
                className="flex gap-md bg-surface p-sm rounded-xl shadow-card border border-surface-variant"
              >
                {/* Item Image */}
                <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden relative bg-surface-low">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Item Details */}
                <div className="flex flex-col justify-between flex-grow py-1">
                  {/* Name & Price Row */}
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-title-lg-custom text-foreground line-clamp-1 text-base">
                        {item.name}
                      </h3>
                      <p className="text-body-md-custom text-secondary line-clamp-1 text-xs mt-0.5">
                        {item.description}
                      </p>
                    </div>
                    <span className="font-title-lg-custom text-foreground text-base shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Actions Row */}
                  <div className="flex justify-between items-center mt-2">
                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-secondary hover:text-error transition-colors text-xs font-label-md flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                        delete
                      </span>
                      Remove
                    </button>

                    {/* Quantity Control */}
                    <div className="flex items-center bg-surface-low rounded-full px-2 py-1 gap-3 border border-surface-variant">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-on-surface hover:text-primary transition-colors flex items-center justify-center w-6 h-6 rounded-full active:scale-90"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                          remove
                        </span>
                      </button>
                      
                      <span className="font-title-lg-custom text-sm w-4 text-center">
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

        {/* Promotions Section - Only show if cart has items */}
        {items.length > 0 && (
          <section className="bg-surface rounded-xl p-lg shadow-card border border-surface-variant">
            <h3 className="font-title-lg-custom text-foreground mb-4 text-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">local_offer</span>
              Promotions
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="
                  flex-grow bg-background border border-surface-variant rounded-lg px-4 py-3 
                  font-body-md-custom text-foreground placeholder:text-secondary 
                  focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all
                "
              />
              <button
                onClick={handleApplyPromo}
                className="
                  bg-surface-high text-on-surface font-label-md px-6 py-3 rounded-lg 
                  hover:bg-surface-variant transition-colors whitespace-nowrap active:scale-95
                "
              >
                Apply
              </button>
            </div>
          </section>
        )}

        {/* Order Summary - Only show if cart has items */}
        {items.length > 0 && (
          <section className="bg-surface rounded-xl p-lg shadow-card border border-surface-variant">
            <h3 className="font-title-lg-custom text-foreground mb-4 text-lg">Order Summary</h3>
            
            <div className="flex flex-col gap-3 font-body-md-custom text-body-md-custom">
              {/* Subtotal */}
              <div className="flex justify-between items-center text-secondary">
                <span>Subtotal ({items.length} item{items.length > 1 ? 's' : ''})</span>
                <span className="text-foreground">${subtotal.toFixed(2)}</span>
              </div>
              
              {/* Delivery Fee */}
              <div className="flex justify-between items-center text-secondary">
                <span>Delivery Fee</span>
                <span className="text-foreground">
                  {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              
              {/* Taxes & Fees */}
              <div className="flex justify-between items-center text-secondary">
                <span>Taxes & Fees</span>
                <span className="text-foreground">${tax.toFixed(2)}</span>
              </div>
              
              {/* Divider */}
              <div className="h-px bg-surface-variant my-2 w-full" />
              
              {/* Total */}
              <div className="flex justify-between items-center font-title-lg-custom text-foreground">
                <span>Total</span>
                <span className="text-primary font-bold text-2xl">${total.toFixed(2)}</span>
              </div>
            </div>
          </section>
        )}

        {/* Clear Cart Button - Only show if cart has items */}
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-error hover:bg-error-container transition-colors font-label-md py-2 rounded-lg text-center"
          >
            Clear Cart
          </button>
        )}
      </main>

      {/* Fixed Bottom Checkout Button - Only show if cart has items */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full glass border-t border-surface-variant p-margin-mobile z-40 shadow-floating">
          <div className="max-w-3xl mx-auto w-full">
            <button
              onClick={handleCheckout}
              className="
                w-full bg-primary text-on-primary font-title-lg-custom py-4 rounded-xl 
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

      {/* Bottom Navigation - Hide when cart has items (checkout button takes its place) */}
      {items.length === 0 && (
        <BottomNav 
          activeItem={activeNav}
          onNavigate={(item) => console.log('Navigate:', item)}
        />
      )}
    </div>
  );
}
