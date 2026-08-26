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
      
      {/* Main Content */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-margin-mobile pt-lg pb-32 flex flex-col gap-xl relative">
        {/* Page Title */}
        <div>
          <h2 className="text-headline-lg-mobile text-foreground">Your Order</h2>
          <p className="text-sm text-secondary mt-1">Review items before checkout</p>
        </div>

        {/* Cart Items List */}
        <section className="flex flex-col gap-md">
          {items.length === 0 ? (
            /* Empty Cart State */
            <div className="text-center py-16 bg-surface-lowest rounded-xl shadow-card">
              <span className="material-symbols-outlined text-7xl text-surface-highest mb-4 block">
                shopping_cart
              </span>
              <h3 className="font-semibold text-foreground mb-2 text-lg">Your cart is empty</h3>
              <p className="text-sm text-secondary mb-6 max-w-xs mx-auto">
                Looks like you haven't added any items yet. Let's fix that!
              </p>
              <button
                onClick={handleContinueShopping}
                className="
                  bg-primary text-on-primary font-semibold px-6 py-3 rounded-full
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
              /* Cart Item */
              <article
                key={item.id}
                className="flex gap-md bg-surface p-sm rounded-xl shadow-card border border-surface-variant animate-slide-up"
              >
                {/* Item Image */}
                <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden relative bg-surface-low cursor-pointer" onClick={() => alert(`View ${item.name} details`)}>
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
                    <div className="cursor-pointer" onClick={() => alert(`View ${item.name} details`)}>
                      <h3 className="font-semibold text-foreground line-clamp-1 text-base">
                        {item.name}
                      </h3>
                      <p className="text-xs text-secondary line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                    <span className="font-semibold text-foreground text-base shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Actions Row */}
                  <div className="flex justify-between items-center mt-2">
                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-secondary hover:text-error transition-colors text-xs font-semibold flex items-center gap-1"
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
                        disabled={item.quantity <= 1}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                          remove
                        </span>
                      </button>
                      
                      <span className="font-semibold text-sm w-4 text-center text-foreground">
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
            <h3 className="font-semibold text-foreground mb-4 text-base flex items-center gap-2">
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
                className={`
                  flex-grow border rounded-lg px-4 py-3 text-sm transition-all
                  ${promoApplied 
                    ? 'bg-surface-high border-success/30 text-success' 
                    : 'bg-background border-surface-variant text-foreground placeholder:text-secondary focus:border-primary focus:ring-1 focus:ring-primary'
                  }
                `}
              />
              <button
                onClick={handleApplyPromo}
                disabled={promoApplied || !promoCode.trim()}
                className={`
                  font-semibold px-6 py-3 rounded-lg whitespace-nowrap active:scale-95 transition-all
                  ${promoApplied 
                    ? 'bg-success/10 text-success' 
                    : 'bg-surface-high text-on-surface hover:bg-surface-variant'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                {promoApplied ? '✓ Applied' : 'Apply'}
              </button>
            </div>
            
            {/* Promo Hints */}
            <div className="mt-3 flex gap-2 flex-wrap">
              {['SAVE10', 'FREESHIP', 'FIRST20'].map((code) => (
                <button
                  key={code}
                  onClick={() => {
                    setPromoCode(code);
                    setPromoApplied(false);
                  }}
                  className="text-xs bg-background px-2 py-1 rounded-full text-secondary hover:text-primary hover:bg-primary/5 transition-colors"
                >
                  Try &quot;{code}&quot;
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Order Summary - Only show if cart has items */}
        {items.length > 0 && (
          <section className="bg-surface rounded-xl p-lg shadow-card border border-surface-variant">
            <h3 className="font-semibold text-foreground mb-4 text-base">Order Summary</h3>
            
            <div className="flex flex-col gap-3 text-sm">
              {/* Subtotal */}
              <div className="flex justify-between items-center text-secondary">
                <span>Subtotal ({items.length} item{items.length > 1 ? 's' : ''})</span>
                <span className="text-foreground">${subtotal.toFixed(2)}</span>
              </div>
              
              {/* Delivery Fee */}
              <div className="flex justify-between items-center text-secondary">
                <span>Delivery Fee</span>
                <span className={deliveryFee === 0 ? 'text-success font-medium' : 'text-foreground'}>
                  {deliveryFee === 0 ? '✓ Free' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              
              {/* Free delivery threshold */}
              {deliveryFee > 0 && subtotal < 50 && (
                <p className="text-xs text-primary">
                  Add ${(50 - subtotal).toFixed(2)} more for free delivery!
                </p>
              )}
              
              {/* Taxes & Fees */}
              <div className="flex justify-between items-center text-secondary">
                <span>Taxes & Fees</span>
                <span className="text-foreground">${tax.toFixed(2)}</span>
              </div>
              
              {/* Divider */}
              <div className="h-px bg-surface-variant my-2 w-full" />
              
              {/* Total */}
              <div className="flex justify-between items-center font-bold text-foreground">
                <span>Total</span>
                <span className="text-primary text-2xl">${total.toFixed(2)}</span>
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
            className="text-error hover:bg-error-container transition-colors font-semibold py-2 rounded-lg text-center text-sm"
          >
            🗑️ Clear Cart
          </button>
        )}
      </main>

      {/* Fixed Bottom Checkout Button - Only show if cart has items */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full glass border-t border-surface-variant p-margin-mobile z-40 shadow-floating">
          <div className="max-w-3xl mx-auto w-full space-y-2">
            {/* Quick total preview */}
            <div className="flex justify-between items-center text-sm px-2">
              <span className="text-secondary">Total:</span>
              <span className="font-bold text-primary text-lg">${total.toFixed(2)}</span>
            </div>
            
            <button
              onClick={handleCheckout}
              className="
                w-full bg-primary text-on-primary font-bold py-4 rounded-xl 
                shadow-md hover:bg-surface-tint transition-colors active:scale-[0.98] 
                flex items-center justify-center gap-2 text-base
              "
            >
              <span>Go to Checkout</span>
              <span className="material-symbols-outlined">arrow_forward</span>
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
