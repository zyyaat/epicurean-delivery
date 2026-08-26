'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart-store';
import { useAuthStore } from '@/lib/store/auth-store';
import { toast } from 'sonner';
import { TopAppBar } from '@/components/layout/TopAppBar';

type CheckoutStep = 'address' | 'delivery' | 'payment' | 'review';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getDeliveryFee, getTax, getTotal, clearCart } = useCartStore();
  const { user, isAuthenticated, addAddress } = useAuthStore();
  
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('address');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form states
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [newAddress, setNewAddress] = useState({
    label: '',
    address: '',
    apartment: '',
    isDefault: false,
  });
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  
  const [deliveryOption, setDeliveryOption] = useState<'asap' | 'scheduled'>('asap');
  const [scheduledTime, setScheduledTime] = useState('');
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'apple_pay'>('card');
  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [driverTip, setDriverTip] = useState<number>(0);

  // Redirect if cart is empty or not authenticated
  React.useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
    if (!isAuthenticated) {
      router.push('/login?redirect=/checkout');
    }
  }, [items.length, isAuthenticated, router]);

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const tax = getTax();
  const total = getTotal() + driverTip;

  const steps: { id: CheckoutStep; label: string; icon: string }[] = [
    { id: 'address', label: 'العنوان', icon: 'location_on' },
    { id: 'delivery', label: 'التوصيل', icon: 'schedule' },
    { id: 'payment', label: 'الدفع', icon: 'payment' },
    { id: 'review', label: 'المراجعة', icon: 'fact_check' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id);
    }
  };

  const handleAddNewAddress = () => {
    if (!newAddress.label || !newAddress.address) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    
    addAddress(newAddress);
    setNewAddress({ label: '', address: '', apartment: '', isDefault: false });
    setShowNewAddressForm(false);
    toast.success('تمت إضافة العنوان');
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    
    toast.success('تم تأكيد طلبك بنجاح! 🎉', {
      duration: 3000,
      style: {
        background: '#b90027',
        color: '#ffffff',
        borderRadius: '12px',
      },
    });
    
    clearCart();
    
    setTimeout(() => {
      router.push('/orders');
    }, 2000);
  };

  if (items.length === 0 || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top App Bar */}
      <TopAppBar 
        onMenuClick={() => {}}
        onCartClick={() => router.push('/cart')}
      />
      
      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-margin-mobile md:px-margin-desktop py-xl pb-32">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="font-headline-md text-headline-md text-on-background mb-2">
            إتمام الطلب 💳
          </h1>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-6 relative">
            {/* Progress Line Background */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-surface-variant" />
            {/* Progress Line Filled */}
            <div 
              className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-300"
              style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
            />
            
            {steps.map((step, index) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <div 
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all
                    ${index <= currentStepIndex 
                      ? 'bg-primary border-primary text-on-primary' 
                      : 'bg-surface border-surface-variant text-secondary'
                    }
                  `}
                >
                  {index < currentStepIndex ? (
                    <span className="material-symbols-outlined text-lg">check</span>
                  ) : (
                    <span className="material-symbols-outlined">{step.icon}</span>
                  )}
                </div>
                <span className={`text-xs mt-2 font-label-md ${index <= currentStepIndex ? 'text-primary font-semibold' : 'text-secondary'}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-surface rounded-xl p-6 border border-surface-variant mb-6">
          {/* Step 1: Address */}
          {currentStep === 'address' && (
            <div className="space-y-4">
              <h2 className="font-title-lg text-title-lg text-on-background mb-4">اختر عنوان التوصيل</h2>
              
              {/* Saved Addresses */}
              {user?.addresses && user.addresses.length > 0 && (
                <div className="space-y-3 mb-4">
                  {user.addresses.map((address) => (
                    <label
                      key={address.id}
                      className={`
                        flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all
                        ${selectedAddressId === address.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-surface-variant hover:border-surface-container-high'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="address"
                        value={address.id}
                        checked={selectedAddressId === address.id}
                        onChange={() => setSelectedAddressId(address.id)}
                        className="mt-1 w-5 h-5 text-primary"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm text-secondary">
                            {address.label === 'المنزل' ? 'home' : address.label === 'العمل' ? 'work' : 'location_on'}
                          </span>
                          <span className="font-semibold">{address.label}</span>
                          {address.isDefault && (
                            <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full">افتراضي</span>
                          )}
                        </div>
                        <p className="text-sm text-secondary mt-1">{address.address}</p>
                        {address.apartment && (
                          <p className="text-xs text-secondary mt-0.5">{address.apartment}</p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {/* Add New Address */}
              {!showNewAddressForm ? (
                <button
                  onClick={() => setShowNewAddressForm(true)}
                  className="w-full py-3 border-2 border-dashed border-surface-variant rounded-lg text-secondary hover:text-primary hover:border-primary transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">add</span>
                  إضافة عنوان جديد
                </button>
              ) : (
                <div className="bg-surface-container-low rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold">عنوان جديد</h3>
                  
                  <select
                    value={newAddress.label}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, label: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-surface-variant focus:border-primary"
                  >
                    <option value="">التسمية...</option>
                    <option value="المنزل">المنزل</option>
                    <option value="العمل">العمل</option>
                    <option value="أخرى">أخرى</option>
                  </select>

                  <input
                    type="text"
                    placeholder="العنوان *"
                    value={newAddress.address}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-surface-variant focus:border-primary"
                  />

                  <input
                    type="text"
                    placeholder="الشقة/المبنى (اختياري)"
                    value={newAddress.apartment}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, apartment: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-surface-variant focus:border-primary"
                  />

                  <div className="flex gap-3">
                    <button
                      onClick={handleAddNewAddress}
                      className="flex-1 bg-primary text-on-primary py-3 rounded-lg font-semibold"
                    >
                      حفظ
                    </button>
                    <button
                      onClick={() => setShowNewAddressForm(false)}
                      className="flex-1 bg-surface-container-high text-on-surface py-3 rounded-lg font-semibold"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Delivery Options */}
          {currentStep === 'delivery' && (
            <div className="space-y-4">
              <h2 className="font-title-lg text-title-lg text-on-background mb-4">خيارات التوصيل</h2>
              
              {/* Delivery Time */}
              <div className="space-y-3">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                  وقت التوصيل
                </label>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setDeliveryOption('asap')}
                    className={`p-4 rounded-lg border transition-all ${
                      deliveryOption === 'asap'
                        ? 'border-primary bg-primary/5'
                        : 'border-surface-variant hover:border-surface-container-high'
                    }`}
                  >
                    <span className="material-symbols-outlined text-primary text-2xl block mb-2">flash_on</span>
                    <span className="font-semibold">في أقرب وقت</span>
                    <p className="text-xs text-secondary mt-1">25-45 دقيقة</p>
                  </button>
                  
                  <button
                    onClick={() => setDeliveryOption('scheduled')}
                    className={`p-4 rounded-lg border transition-all ${
                      deliveryOption === 'scheduled'
                        ? 'border-primary bg-primary/5'
                        : 'border-surface-variant hover:border-surface-container-high'
                    }`}
                  >
                    <span className="material-symbols-outlined text-primary text-2xl block mb-2">schedule</span>
                    <span className="font-semibold">جدولة لاحقاً</span>
                    <p className="text-xs text-secondary mt-1">اختر الوقت</p>
                  </button>
                </div>

                {deliveryOption === 'scheduled' && (
                  <input
                    type="datetime-local"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    min={new Date(Date.now() + 3600000).toISOString().slice(0, 16)}
                    className="w-full px-4 py-3 rounded-lg border border-surface-variant focus:border-primary"
                  />
                )}
              </div>

              {/* Special Instructions */}
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                  تعليمات خاصة (اختياري)
                </label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="مثال: اتصل عند الوصول، اترك الباب..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-surface-variant focus:border-primary resize-none"
                />
              </div>

              {/* Driver Tip */}
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                  إكرامية السائق
                </label>
                <div className="flex gap-2">
                  {[0, 2, 5, 10].map((tip) => (
                    <button
                      key={tip}
                      onClick={() => setDriverTip(tip)}
                      className={`flex-1 py-2 rounded-lg border font-semibold transition-all ${
                        driverTip === tip
                          ? 'border-primary bg-primary text-on-primary'
                          : 'border-surface-variant hover:border-surface-container-high'
                      }`}
                    >
                      {tip === 0 ? 'بدون' : `$${tip}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Payment Method */}
          {currentStep === 'payment' && (
            <div className="space-y-4">
              <h2 className="font-title-lg text-title-lg text-on-background mb-4">طريقة الدفع</h2>
              
              {/* Payment Options */}
              <div className="space-y-3">
                <label
                  className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-primary bg-primary/5'
                      : 'border-surface-variant hover:border-surface-container-high'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="w-5 h-5 text-primary"
                  />
                  <span className="material-symbols-outlined text-primary text-2xl">credit_card</span>
                  <div className="flex-1">
                    <span className="font-semibold">بطاقة ائتمان/خصم</span>
                    <p className="text-xs text-secondary">Visa, Mastercard, Mada</p>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                    paymentMethod === 'cash'
                      ? 'border-primary bg-primary/5'
                      : 'border-surface-variant hover:border-surface-container-high'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                    className="w-5 h-5 text-primary"
                  />
                  <span className="material-symbols-outlined text-primary text-2xl">payments</span>
                  <div className="flex-1">
                    <span className="font-semibold">الدفع عند الاستلام</span>
                    <p className="text-xs text-secondary">نقدياً عند الاستلام</p>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${
                    paymentMethod === 'apple_pay'
                      ? 'border-primary bg-primary/5'
                      : 'border-surface-variant hover:border-surface-container-high'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="apple_pay"
                    checked={paymentMethod === 'apple_pay'}
                    onChange={() => setPaymentMethod('apple_pay')}
                    className="w-5 h-5 text-primary"
                  />
                  <span className="material-symbols-outlined text-primary text-2xl">apple</span>
                  <div className="flex-1">
                    <span className="font-semibold">Apple Pay</span>
                    <p className="text-xs text-secondary">دفع سريع وآمن</p>
                  </div>
                </label>
              </div>

              {/* Card Form (if card selected) */}
              {paymentMethod === 'card' && (
                <div className="bg-surface-container-low rounded-lg p-4 space-y-3 mt-4">
                  <h3 className="font-semibold">بيانات البطاقة</h3>
                  
                  <input
                    type="text"
                    placeholder="رقم البطاقة"
                    value={cardInfo.number}
                    onChange={(e) => setCardInfo(prev => ({ ...prev, number: e.target.value }))}
                    dir="ltr"
                    maxLength={19}
                    className="w-full px-4 py-3 rounded-lg border border-surface-variant focus:border-primary"
                  />
                  
                  <input
                    type="text"
                    placeholder="اسم حامل البطاقة"
                    value={cardInfo.name}
                    onChange={(e) => setCardInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-surface-variant focus:border-primary"
                  />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardInfo.expiry}
                      onChange={(e) => setCardInfo(prev => ({ ...prev, expiry: e.target.value }))}
                      dir="ltr"
                      maxLength={5}
                      className="px-4 py-3 rounded-lg border border-surface-variant focus:border-primary"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      value={cardInfo.cvv}
                      onChange={(e) => setCardInfo(prev => ({ ...prev, cvv: e.target.value }))}
                      dir="ltr"
                      maxLength={4}
                      className="px-4 py-3 rounded-lg border border-surface-variant focus:border-primary"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Review & Confirm */}
          {currentStep === 'review' && (
            <div className="space-y-4">
              <h2 className="font-title-lg text-title-lg text-on-background mb-4">مراجعة الطلب النهائي</h2>
              
              {/* Order Items Summary */}
              <div className="bg-surface-container-low rounded-lg p-4 space-y-2">
                <h3 className="font-semibold mb-2">المنتجات ({items.length})</h3>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Delivery Info */}
              <div className="bg-surface-container-low rounded-lg p-4 space-y-2">
                <h3 className="font-semibold mb-2">معلومات التوصيل</h3>
                <div className="flex items-start gap-2 text-sm">
                  <span className="material-symbols-outlined text-secondary">location_on</span>
                  <span>{user?.addresses.find(a => a.id === selectedAddressId)?.address || 'عنوان محدد'}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="material-symbols-outlined text-secondary">schedule</span>
                  <span>{deliveryOption === 'asap' ? 'في أقرب وقت' : scheduledTime}</span>
                </div>
                {specialInstructions && (
                  <div className="flex items-start gap-2 text-sm">
                    <span className="material-symbols-outlined text-secondary">note</span>
                    <span>{specialInstructions}</span>
                  </div>
                )}
              </div>

              {/* Payment Method Summary */}
              <div className="bg-surface-container-low rounded-lg p-4">
                <h3 className="font-semibold mb-2">طريقة الدفع</h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-secondary">
                    {paymentMethod === 'card' ? 'credit_card' : paymentMethod === 'cash' ? 'payments' : 'apple'}
                  </span>
                  <span>
                    {paymentMethod === 'card' ? 'بطاقة ائتمان' : paymentMethod === 'cash' ? 'الدفع عند الاستلام' : 'Apple Pay'}
                  </span>
                </div>
              </div>

              {/* Final Total */}
              <div className="bg-primary/5 rounded-lg p-4 space-y-2 border border-primary/20">
                <div className="flex justify-between text-sm">
                  <span>المجموع الفرعي</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>رسوم التوصيل</span>
                  <span>{deliveryFee === 0 ? 'مجاني' : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>الضرائب</span>
                  <span>$${tax.toFixed(2)}</span>
                </div>
                {driverTip > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>إكرامية السائق</span>
                    <span>$${driverTip.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-primary/20 font-bold text-lg">
                  <span>الإجمالي</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          {currentStepIndex > 0 && (
            <button
              onClick={handlePrevStep}
              className="px-6 py-4 rounded-xl border border-surface-variant font-semibold hover:bg-surface-container-high transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
              السابق
            </button>
          )}
          
          {currentStepIndex < steps.length - 1 ? (
            <button
              onClick={handleNextStep}
              className="flex-1 bg-primary text-on-primary py-4 rounded-xl font-bold shadow-[0_4px_20px_0_rgba(185,0,39,0.3)] hover:bg-primary-container transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
            >
              التالي
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          ) : (
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="flex-1 bg-primary text-on-primary py-4 rounded-xl font-bold shadow-[0_4px_20px_0_rgba(185,0,39,0.3)] hover:bg-primary-container transition-colors active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <span className="animate-spin material-symbols-outlined">progress_activity</span>
                  جاري تأكيد الطلب...
                </>
              ) : (
                <>
                  تأكيد الطلب
                  <span className="material-symbols-outlined">check_circle</span>
                </>
              )}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
