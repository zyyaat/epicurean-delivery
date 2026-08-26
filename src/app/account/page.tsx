'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { TopAppBar } from '@/components/layout/TopAppBar';
import { BottomNav } from '@/components/layout/BottomNav';

// Demo user data (no auth dependency)
const demoUser = {
  id: '1',
  name: 'أحمد محمد',
  email: 'demo@epicurean.com',
  phone: '+966501234567',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
  addresses: [
    {
      id: 'addr-1',
      label: 'المنزل',
      address: '124 Main Street, Downtown',
      apartment: 'شقة 5، الطابق 3',
      isDefault: true,
    },
    {
      id: 'addr-2',
      label: 'العمل',
      address: 'Business Tower, King Fahd Road',
      isDefault: false,
    },
  ],
  createdAt: '2024-01-15T10:00:00Z',
};

export default function AccountPage() {
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'settings'>('profile');
  const [user, setUser] = useState(demoUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<typeof demoUser>>({});
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: '',
    address: '',
    apartment: '',
    isDefault: false,
  });

  const handleLogout = () => {
    toast.success('تم تسجيل الخروج (تجريبي)', {
      style: {
        background: '#5f5e5e',
        color: '#ffffff',
        borderRadius: '12px',
      },
    });
    router.push('/');
  };

  const handleSaveProfile = () => {
    setUser(prev => ({ ...prev, ...editForm }));
    setIsEditing(false);
    toast.success('تم تحديث الملف الشخصي', {
      style: {
        background: '#b90027',
        color: '#ffffff',
        borderRadius: '12px',
      },
    });
  };

  const handleAddAddress = () => {
    if (!newAddress.label || !newAddress.address) {
      toast.error('يرجى ملء جميع الحقول');
      return;
    }
    
    const addressToAdd = { ...newAddress, id: `addr-${Date.now()}` };
    
    setUser(prev => ({
      ...prev,
      addresses: [...prev.addresses, addressToAdd]
    }));
    
    setNewAddress({ label: '', address: '', apartment: '', isDefault: false });
    setShowAddAddress(false);
    toast.success('تمت إضافة العنوان', {
      style: {
        background: '#b90027',
        color: '#ffffff',
        borderRadius: '12px',
      },
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top App Bar */}
      <TopAppBar 
        onMenuClick={() => {}}
        onCartClick={() => router.push('/cart')}
      />
      
      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-margin-mobile md:px-margin-desktop py-xl pb-24">
        {/* Profile Header */}
        <section className="flex items-center gap-4 mb-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined text-primary text-4xl">person</span>
            )}
          </div>
          
          {/* User Info */}
          <div className="flex-1">
            <h1 className="font-headline-md text-headline-md text-on-background">
              {user.name}
            </h1>
            <p className="font-body-md text-body-md text-secondary">{user.email}</p>
            {user.phone && (
              <p className="font-body-md text-body-md text-secondary">{user.phone}</p>
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="p-3 rounded-full hover:bg-surface-container-high transition-colors text-error"
            aria-label="تسجيل الخروج"
          >
            <span className="material-symbols-outlined">logout</span>
          </button>
        </section>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-surface-variant mb-6 overflow-x-auto">
          {[
            { id: 'profile' as const, label: 'الملف الشخصي', icon: 'person' },
            { id: 'addresses' as const, label: 'العناوين', icon: 'location_on' },
            { id: 'settings' as const, label: 'الإعدادات', icon: 'settings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-3 whitespace-nowrap transition-colors
                font-label-md text-label-md
                ${activeTab === tab.id 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-secondary hover:text-on-surface'
                }
              `}
            >
              <span className="material-symbols-outlined text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <section className="space-y-6">
            {!isEditing ? (
              /* View Mode */
              <div className="bg-surface rounded-xl p-6 space-y-4 border border-surface-variant">
                <div className="flex justify-between items-start">
                  <h3 className="font-title-lg text-title-lg text-on-background">معلومات شخصية</h3>
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setEditForm({
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                      });
                    }}
                    className="text-primary hover:text-primary-container font-label-md text-label-md flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">edit</span>
                    تعديل
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-surface-variant">
                    <span className="text-secondary">الاسم</span>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-surface-variant">
                    <span className="text-secondary">البريد الإلكتروني</span>
                    <span className="font-medium" dir="ltr">{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex justify-between py-2 border-b border-surface-variant">
                      <span className="text-secondary">الهاتف</span>
                      <span className="font-medium" dir="ltr">{user.phone}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2">
                    <span className="text-secondary">تاريخ التسجيل</span>
                    <span className="font-medium">
                      {new Date(user.createdAt).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              /* Edit Mode */
              <form onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }} className="bg-surface rounded-xl p-6 space-y-4 border border-surface-variant">
                <h3 className="font-title-lg text-title-lg text-on-background">تعديل المعلومات</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="font-label-md text-label-md text-on-surface-variant block mb-2">الاسم</label>
                    <input
                      type="text"
                      value={editForm.name || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-surface-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label className="font-label-md text-label-md text-on-surface-variant block mb-2">البريد الإلكتروني</label>
                    <input
                      type="email"
                      value={editForm.email || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      dir="ltr"
                      className="w-full px-4 py-3 rounded-lg border border-surface-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label className="font-label-md text-label-md text-on-surface-variant block mb-2">الهاتف</label>
                    <input
                      type="tel"
                      value={editForm.phone || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                      dir="ltr"
                      className="w-full px-4 py-3 rounded-lg border border-surface-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-on-primary py-3 rounded-lg font-semibold hover:bg-primary-container transition-colors"
                  >
                    حفظ التغييرات
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-surface-container-high text-on-surface py-3 rounded-lg font-semibold hover:bg-surface-variant transition-colors"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/orders"
                className="bg-surface rounded-xl p-4 border border-surface-variant hover:bg-surface-container-high transition-colors flex flex-col items-center gap-2"
              >
                <span className="material-symbols-outlined text-primary text-3xl">receipt_long</span>
                <span className="font-body-md text-body-md text-on-surface">طلباتي</span>
              </Link>
              
              <Link
                href="/cart"
                className="bg-surface rounded-xl p-4 border border-surface-variant hover:bg-surface-container-high transition-colors flex flex-col items-center gap-2"
              >
                <span className="material-symbols-outlined text-primary text-3xl">shopping_cart</span>
                <span className="font-body-md text-body-md text-on-surface">سلتي</span>
              </Link>
            </div>
          </section>
        )}

        {activeTab === 'addresses' && (
          <section className="space-y-6">
            {/* Addresses List */}
            <div className="space-y-4">
              {user.addresses.length === 0 ? (
                <div className="bg-surface rounded-xl p-8 text-center border border-surface-variant">
                  <span className="material-symbols-outlined text-5xl text-surface-container-highest mb-4 block">location_off</span>
                  <h3 className="font-title-lg text-title-lg text-on-background mb-2">لا توجد عناوين محفوظة</h3>
                  <p className="font-body-md text-body-md text-secondary">أضف عنوانك الأول لتسهيل عملية التوصيل</p>
                </div>
              ) : (
                user.addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`bg-surface rounded-xl p-4 border ${
                      address.isDefault ? 'border-primary bg-primary/5' : 'border-surface-variant'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="material-symbols-outlined text-primary text-sm">
                            {address.label === 'المنزل' ? 'home' : address.label === 'العمل' ? 'work' : 'location_on'}
                          </span>
                          <span className="font-semibold text-on-background">{address.label}</span>
                          {address.isDefault && (
                            <span className="bg-primary text-on-primary text-[10px] px-2 py-0.5 rounded-full font-label-md">
                              الافتراضي
                            </span>
                          )}
                        </div>
                        <p className="text-on-surface text-sm">{address.address}</p>
                        {address.apartment && (
                          <p className="text-secondary text-xs mt-1">{address.apartment}</p>
                        )}
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        {!address.isDefault && (
                          <button
                            onClick={() => setDefaultAddress(address.id)}
                            className="p-2 text-secondary hover:text-primary transition-colors"
                            title="تعيين كافتراضي"
                          >
                            <span className="material-symbols-outlined text-lg">check_circle</span>
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (confirm('حذف هذا العنوان؟')) {
                              removeAddress(address.id);
                              toast.success('تم حذف العنوان');
                            }
                          }}
                          className="p-2 text-secondary hover:text-error transition-colors"
                          title="حذف"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add Address Button */}
            <button
              onClick={() => setShowAddAddress(!showAddAddress)}
              className="w-full bg-surface-container-lowest border-2 border-dashed border-surface-variant rounded-xl p-4 text-secondary hover:text-primary hover:border-primary transition-colors flex items-center justify-center gap-2 font-label-md"
            >
              <span className="material-symbols-outlined">add</span>
              إضافة عنوان جديد
            </button>

            {/* Add Address Form */}
            {showAddAddress && (
              <form onSubmit={(e) => { e.preventDefault(); handleAddAddress(); }} className="bg-surface rounded-xl p-6 space-y-4 border border-surface-variant">
                <h3 className="font-title-lg text-title-lg text-on-background">عنوان جديد</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-label-md text-label-md text-on-surface-variant block mb-2">التسمية *</label>
                    <select
                      value={newAddress.label}
                      onChange={(e) => setNewAddress(prev => ({ ...prev, label: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-surface-variant bg-surface-container-lowest focus:border-primary"
                    >
                      <option value="">اختر...</option>
                      <option value="المنزل">المنزل</option>
                      <option value="العمل">العمل</option>
                      <option value="عائلة">عائلة</option>
                      <option value="أخرى">أخرى</option>
                    </select>
                  </div>
                  
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newAddress.isDefault}
                        onChange={(e) => setNewAddress(prev => ({ ...prev, isDefault: e.target.checked }))}
                        className="w-5 h-5 rounded text-primary"
                      />
                      <span className="text-sm">جعله الافتراضي</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="font-label-md text-label-md text-on-surface-variant block mb-2">العنوان *</label>
                  <input
                    type="text"
                    value={newAddress.address}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="الشارع، المدينة، الرمز البريدي"
                    className="w-full px-4 py-3 rounded-lg border border-surface-variant bg-surface-container-lowest focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-label-md text-label-md text-on-surface-variant block mb-2">الشقة/المبنى (اختياري)</label>
                  <input
                    type="text"
                    value={newAddress.apartment}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, apartment: e.target.value }))}
                    placeholder="شقة 5، الطابق 3"
                    className="w-full px-4 py-3 rounded-lg border border-surface-variant bg-surface-container-lowest focus:border-primary"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-on-primary py-3 rounded-lg font-semibold hover:bg-primary-container transition-colors"
                  >
                    حفظ العنوان
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddAddress(false)}
                    className="flex-1 bg-surface-container-high text-on-surface py-3 rounded-lg font-semibold hover:bg-surface-variant transition-colors"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            )}
          </section>
        )}

        {activeTab === 'settings' && (
          <section className="space-y-4">
            <div className="bg-surface rounded-xl border border-surface-variant divide-y divide-surface-variant">
              {/* Notifications */}
              <button 
                onClick={() => toast.info('إعدادات الإشعارات قريباً!')}
                className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">notifications</span>
                  <span>الإشعارات</span>
                </div>
                <span className="material-symbols-outlined text-secondary">chevron_left</span>
              </button>

              {/* Language */}
              <button 
                onClick={() => toast.info('تغيير اللغة قريباً!')}
                className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">language</span>
                  <span>اللغة</span>
                </div>
                <div className="flex items-center gap-2 text-secondary">
                  <span className="text-sm">العربية</span>
                  <span className="material-symbols-outlined text-secondary">chevron_left</span>
                </div>
              </button>

              {/* Dark Mode */}
              <button 
                onClick={() => toast.info('الوضع الداكن قريباً!')}
                className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">dark_mode</span>
                  <span>الوضع الداكن</span>
                </div>
                <span className="material-symbols-outlined text-secondary">chevron_left</span>
              </button>

              {/* Help & Support */}
              <button 
                onClick={() => toast.info('الدعم الفني قريباً!')}
                className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">help</span>
                  <span>المساعدة والدعم</span>
                </div>
                <span className="material-symbols-outlined text-secondary">chevron_left</span>
              </button>

              {/* About */}
              <button 
                onClick={() => toast.info('Epicurean v1.0.0')}
                className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">info</span>
                  <span>حول التطبيق</span>
                </div>
                <div className="flex items-center gap-2 text-secondary">
                  <span className="text-sm">v1.0.0</span>
                  <span className="material-symbols-outlined text-secondary">chevron_left</span>
                </div>
              </button>
            </div>

            {/* Danger Zone */}
            <div className="bg-error-container/30 rounded-xl p-4 border border-error/20">
              <h3 className="font-title-lg text-title-lg text-error mb-2">منطقة الخطر</h3>
              <button
                onClick={() => {
                  if (confirm('هل أنت متأكد من حذف حسابك؟ لا يمكن التراجع عن هذا الإجراء.')) {
                    toast.error('تم حذف الحساب (تجريبي)');
                    logout();
                    router.push('/');
                  }
                }}
                className="w-full bg-error text-on-error py-3 rounded-lg font-semibold hover:bg-error/90 transition-colors"
              >
                حذف الحساب
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeItem="account" />
    </div>
  );
}
