'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/auth-store';
import { toast } from 'sonner';
import { TopAppBar } from '@/components/layout/TopAppBar';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const { register, isLoading, isAuthenticated } = useAuthStore();

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('كلمتا المرور غير متطابقتين');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    if (!acceptTerms) {
      toast.error('يجب الموافقة على الشروط والأحكام');
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password, formData.phone);
      toast.success('تم إنشاء الحساب بنجاح! 🎉', {
        duration: 2000,
        position: 'bottom-center',
        style: {
          background: '#b90027',
          color: '#ffffff',
          borderRadius: '12px',
          fontFamily: 'Inter, sans-serif',
        },
      });
      router.push('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'حدث خطأ في إنشاء الحساب', {
        duration: 3000,
        position: 'bottom-center',
        style: {
          background: '#ba1a1a',
          color: '#ffffff',
          borderRadius: '12px',
          fontFamily: 'Inter, sans-serif',
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top App Bar */}
      <TopAppBar 
        onMenuClick={() => {}}
        onCartClick={() => {}}
      />
      
      {/* Main Content */}
      <main className="flex-1 px-4 py-8 overflow-y-auto pb-8">
        <div className="w-full max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-headline-md text-headline-md text-on-background mb-2">
              إنشاء حساب جديد 🍽️
            </h1>
            <p className="font-body-md text-body-md text-secondary">
              انضم إلينا واستمتع بتجربة توصيل استثنائية
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                الاسم الكامل *
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-secondary">
                  person
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="أحمد محمد"
                  className="
                    w-full pr-12 pl-4 py-4 rounded-xl
                    border border-surface-variant bg-surface-container-lowest
                    font-body-lg text-on-surface placeholder:text-secondary
                    focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                    transition-all
                  "
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                البريد الإلكتروني *
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-secondary">
                  mail
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  dir="ltr"
                  className="
                    w-full pr-12 pl-4 py-4 rounded-xl
                    border border-surface-variant bg-surface-container-lowest
                    font-body-lg text-on-surface placeholder:text-secondary
                    focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                    transition-all
                  "
                />
              </div>
            </div>

            {/* Phone Input */}
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                رقم الهاتف
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-secondary">
                  phone
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+966 5XX XXX XXXX"
                  dir="ltr"
                  className="
                    w-full pr-12 pl-4 py-4 rounded-xl
                    border border-surface-variant bg-surface-container-lowest
                    font-body-lg text-on-surface placeholder:text-secondary
                    focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                    transition-all
                  "
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                كلمة المرور *
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-secondary">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  dir="ltr"
                  className="
                    w-full pr-12 pl-12 py-4 rounded-xl
                    border border-surface-variant bg-surface-container-lowest
                    font-body-lg text-on-surface placeholder:text-secondary
                    focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                    transition-all
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full ${
                          i < Math.min(4, Math.ceil(formData.password.length / 2))
                            ? formData.password.length >= 8
                              ? 'bg-green-500'
                              : formData.password.length >= 6
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            : 'bg-surface-variant'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-secondary">
                    {formData.password.length < 6
                      ? 'ضعيف - استخدم 6 أحرف على الأقل'
                      : formData.password.length < 8
                        ? 'متوسط - أضف رموز أو أرقام'
                        : 'قوي! 🎉'}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                تأكيد كلمة المرور *
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-secondary">
                  verified_user
                </span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  dir="ltr"
                  className="
                    w-full pr-12 pl-4 py-4 rounded-xl
                    border border-surface-variant bg-surface-container-lowest
                    font-body-lg text-on-surface placeholder:text-secondary
                    focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                    transition-all
                  "
                />
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-error">كلمتا المرور غير متطابقتين</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-surface-variant text-primary focus:ring-primary"
              />
              <label htmlFor="terms" className="text-sm text-secondary cursor-pointer">
                أوافق على{' '}
                <button type="button" className="text-primary hover:underline">
                  الشروط والأحكام
                </button>{' '}
                و{' '}
                <button type="button" className="text-primary hover:underline">
                  سياسة الخصوصية
                </button>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="
                w-full bg-primary text-on-primary font-title-lg text-title-lg py-4 rounded-xl
                shadow-[0_4px_20px_0_rgba(185,0,39,0.3)]
                hover:bg-primary-container transition-all active:scale-[0.98]
                disabled:opacity-70 disabled:cursor-not-allowed
                flex items-center justify-center gap-2
              "
            >
              {isLoading ? (
                <>
                  <span className="animate-spin material-symbols-outlined">progress_activity</span>
                  جاري إنشاء الحساب...
                </>
              ) : (
                <>
                  إنشاء حساب
                  <span className="material-symbols-outlined">person_add</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-surface-variant" />
            <span className="text-xs text-secondary">أو</span>
            <div className="flex-1 h-px bg-surface-variant" />
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            {/* Google Register */}
            <button
              type="button"
              onClick={() => toast.info('التسجيل بقوقل قريباً!')}
              className="
                w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl
                border border-surface-variant bg-surface-container-lowest
                hover:bg-surface-container-high transition-colors
                font-body-md text-on-surface
              "
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              التسجيل بواسطة Google
            </button>

            {/* Apple Register */}
            <button
              type="button"
              onClick={() => toast.info('التسجيل بـ Apple قريباً!')}
              className="
                w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl
                border border-surface-variant bg-surface-container-lowest
                hover:bg-surface-container-high transition-colors
                font-body-md text-on-surface
              "
            >
              <span className="material-symbols-outlined">apple</span>
              التسجيل بواسطة Apple
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center mt-6 font-body-md text-body-md text-secondary">
            لديك حساب بالفعل؟{' '}
            <Link 
              href="/login" 
              className="text-primary hover:text-primary-container font-semibold transition-colors"
            >
              تسجيل الدخول
            </Link>
          </p>

          {/* Back to Home */}
          <div className="text-center mt-4">
            <Link 
              href="/" 
              className="text-sm text-secondary hover:text-on-surface transition-colors inline-flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
