'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/auth-store';
import { useCartStore } from '@/lib/store/cart-store';
import { toast } from 'sonner';
import { TopAppBar } from '@/components/layout/TopAppBar';
import { BottomNav } from '@/components/layout/BottomNav';

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-001',
    restaurantName: 'The Smashed Patty',
    date: '2024-08-26T14:30:00Z',
    status: 'delivered' as const,
    items: [
      { name: 'Signature Wagyu Burger', quantity: 2, price: 24.00 },
      { name: 'Classic Cheeseburger', quantity: 1, price: 16.00 },
    ],
    subtotal: 64.00,
    deliveryFee: 2.99,
    tax: 7.88,
    total: 74.87,
    address: '124 Main Street, Downtown',
  },
  {
    id: 'ORD-002',
    restaurantName: 'Okinawa Sushi Bar',
    date: '2024-08-24T19:15:00Z',
    status: 'delivered' as const,
    items: [
      { name: 'Omakase Sushi Platter', quantity: 1, price: 45.00 },
      { name: 'Dragon Roll', quantity: 2, price: 18.00 },
    ],
    subtotal: 81.00,
    deliveryFee: 0.00,
    tax: 9.52,
    total: 90.52,
    address: 'Business Tower, King Fahd Road',
  },
  {
    id: 'ORD-003',
    restaurantName: 'Vesuvio Pizzeria',
    date: '2024-08-26T12:45:00Z',
    status: 'in_progress' as const,
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 14.00 },
      { name: 'Quattro Formaggi', quantity: 1, price: 17.00 },
    ],
    subtotal: 31.00,
    deliveryFee: 1.49,
    tax: 3.65,
    total: 36.14,
    address: '124 Main Street, Downtown',
  },
];

type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'on_the_way' | 'delivered' | 'cancelled';

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: string }> = {
  pending: { label: 'قيد الانتظار', color: 'bg-yellow-100 text-yellow-800', icon: 'schedule' },
  confirmed: { label: 'تم التأكيد', color: 'bg-blue-100 text-blue-800', icon: 'check_circle' },
  preparing: { label: 'قيد التحضير', color: 'bg-orange-100 text-orange-800', icon: 'restaurant' },
  on_the_way: { label: 'في الطريق', color: 'bg-purple-100 text-purple-800', icon: 'local_shipping' },
  delivered: { label: 'تم التوصيل', color: 'bg-green-100 text-green-800', icon: 'done_all' },
  cancelled: { label: 'ملغي', color: 'bg-red-100 text-red-800', icon: 'cancel' },
};

export default function OrdersPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const addItem = useCartStore((state) => state.addItem);
  
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | OrderStatus>('all');
  const [mounted, setMounted] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Handle hydration - wait for client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check auth after mount
  useEffect(() => {
    if (mounted && !isAuthenticated) {
      setShouldRedirect(true);
      router.push('/login');
    }
  }, [mounted, isAuthenticated, router]);

  const handleReorder = (orderId: string) => {
    const order = mockOrders.find(o => o.id === orderId);
    if (!order) return;

    order.items.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        addItem({
          id: `${order.id}-${item.name}-${i}`,
          name: item.name,
          description: '',
          price: item.price,
          image: '',
        });
      }
    });

    toast.success(`تمت إضافة ${order.items.length} منتجات للسلة`, {
      style: {
        background: '#b90027',
        color: '#ffffff',
        borderRadius: '12px',
      },
    });
    
    setTimeout(() => {
      router.push('/cart');
    }, 1500);
  };

  const filteredOrders = activeFilter === 'all' 
    ? mockOrders 
    : mockOrders.filter(o => o.status === activeFilter);

  // Show nothing while redirecting
  if (!mounted || shouldRedirect) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top App Bar */}
      <TopAppBar 
        onMenuClick={() => {}}
        onCartClick={() => router.push('/cart')}
      />
      
      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-margin-mobile md:px-margin-desktop py-xl pb-24">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="font-headline-md text-headline-md text-on-background mb-2">
            طلباتي 📋
          </h1>
          <p className="font-body-md text-body-md text-secondary">
            تابع وتصفح جميع طلباتك السابقة
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-6">
          {[
            { id: 'all' as const, label: 'الكل' },
            ...Object.entries(statusConfig).map(([id, config]) => ({ id: id as OrderStatus, label: config.label })),
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`
                px-4 py-2 rounded-full whitespace-nowrap font-label-md text-label-md transition-all
                ${activeFilter === filter.id
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-high text-secondary hover:bg-surface-variant'
                }
              `}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            /* Empty State */
            <div className="bg-surface rounded-xl p-8 text-center border border-surface-variant">
              <span className="material-symbols-outlined text-5xl text-surface-container-highest mb-4 block">receipt_long</span>
              <h3 className="font-title-lg text-title-lg text-on-background mb-2">لا توجد طلبات</h3>
              <p className="font-body-md text-body-md text-secondary mb-6">
                لم تقم بأي طلبات بعد. ابدأ بالطلب الآن!
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-full font-semibold hover:bg-primary-container transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">restaurant</span>
                تصفح المطاعم
              </Link>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                isExpanded={selectedOrder === order.id}
                onToggle={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                onReorder={() => handleReorder(order.id)}
              />
            ))
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeItem="orders" />
    </div>
  );
}

// Order Card Component
interface OrderCardProps {
  order: typeof mockOrders[0];
  isExpanded: boolean;
  onToggle: () => void;
  onReorder: () => void;
}

function OrderCard({ order, isExpanded, onToggle, onReorder }: OrderCardProps) {
  const status = statusConfig[order.status];
  const orderDate = new Date(order.date);
  
  return (
    <article className="bg-surface rounded-xl overflow-hidden border border-surface-variant shadow-[0_4px_20px_0_rgba(0,0,0,0.03)]">
      {/* Order Header - Clickable to expand */}
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors"
      >
        <div className="flex items-center gap-4">
          {/* Restaurant Icon */}
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">restaurant</span>
          </div>
          
          {/* Order Info */}
          <div className="text-right">
            <h3 className="font-semibold text-on-background">{order.restaurantName}</h3>
            <p className="text-sm text-secondary">
              {orderDate.toLocaleDateString('ar-SA')} • {order.id}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Badge */}
          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${status.color}`}>
            <span className="material-symbols-outlined text-sm">{status.icon}</span>
            {status.label}
          </span>
          
          {/* Expand Icon */}
          <span className={`material-symbols-outlined text-secondary transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            expand_more
          </span>
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-surface-variant pt-4">
          {/* Items List */}
          <div className="space-y-2">
            <h4 className="font-label-md text-label-md text-on-surface-variant uppercase">المنتجات</h4>
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-on-surface">
                  {item.quantity}x {item.name}
                </span>
                <span className="text-secondary">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-surface-container-low rounded-lg p-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-secondary">المجموع الفرعي</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">رسوم التوصيل</span>
              <span>{order.deliveryFee === 0 ? 'مجاني' : `$${order.deliveryFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">الضرائب</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-surface-variant font-bold text-base">
              <span>الإجمالي</span>
              <span className="text-primary">${order.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="flex items-start gap-2 text-sm">
            <span className="material-symbols-outlined text-secondary text-lg">location_on</span>
            <div>
              <p className="text-secondary text-xs">عنوان التوصيل</p>
              <p className="text-on-surface">{order.address}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            {order.status === 'delivered' && (
              <button
                onClick={onReorder}
                className="flex-1 bg-primary text-on-primary py-3 rounded-lg font-semibold hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">replay</span>
                إعادة الطلب
              </button>
            )}
            
            {(order.status === 'in_progress' || order.status === 'on_the_way') && (
              <button
                onClick={() => toast.info('تتبع الطلب قريباً!')}
                className="flex-1 bg-surface-container-high text-on-surface py-3 rounded-lg font-semibold hover:bg-surface-variant transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">track_changes</span>
                تتبع الطلب
              </button>
            )}

            <button
              onClick={() => toast.info('تفاصيل الطلب قريباً!')}
              className="px-4 py-3 rounded-lg border border-surface-variant text-secondary hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-lg">info</span>
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
