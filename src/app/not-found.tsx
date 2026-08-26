'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-[120px] font-black text-primary leading-none">404</h1>
          <div className="flex justify-center gap-2 mt-4">
            <span className="w-12 h-1 bg-primary rounded-full animate-pulse" />
            <span className="w-8 h-1 bg-primary/60 rounded-full animate-pulse delay-100" />
            <span className="w-4 h-1 bg-primary/30 rounded-full animate-pulse delay-200" />
          </div>
        </div>

        {/* Message */}
        <h2 className="font-headline-md text-headline-md text-on-background mb-3">
          الصفحة غير موجودة! 🤔
        </h2>
        <p className="font-body-lg text-body-lg text-secondary mb-8">
          عذراً، يبدو أنك ضللت الطريق. الصفحة التي تبحث عنها تم نقلها أو حذفها.
        </p>

        {/* Actions */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-xl font-bold shadow-[0_4px_20px_0_rgba(185,0,39,0.3)] hover:bg-primary-container transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined">home</span>
            العودة للرئيسية
          </Link>

          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-container font-semibold transition-colors"
          >
            <span className="material-symbols-outlined">search</span>
            البحث عن مطاعم
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-surface-variant">
          <p className="text-sm text-secondary mb-4">قد تبحث عن:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: 'المطاعم', href: '/search' },
              { label: 'السلة', href: '/cart' },
              { label: 'طلباتي', href: '/orders' },
              { label: 'حسابي', href: '/account' },
              { label: 'تسجيل الدخول', href: '/login' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full bg-surface-container-high text-secondary hover:bg-surface-variant hover:text-on-surface transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
