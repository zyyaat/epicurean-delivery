'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Error Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-error-container rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-error text-6xl">error</span>
          </div>
        </div>

        {/* Message */}
        <h2 className="font-headline-md text-headline-md text-on-background mb-3">
          حدث خطأ ما! 😅
        </h2>
        <p className="font-body-lg text-body-lg text-secondary mb-8">
          عذراً، حدثت مشكلة غير متوقعة. نعمل على إصلاحها في أقرب وقت.
        </p>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-xl font-bold shadow-[0_4px_20px_0_rgba(185,0,39,0.3)] hover:bg-primary-container transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined">refresh</span>
            حاول مرة أخرى
          </button>

          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 text-primary hover:text-primary-container font-semibold transition-colors"
          >
            <span className="material-symbols-outlined">home</span>
            العودة للرئيسية
          </button>
        </div>

        {/* Contact Support */}
        <div className="mt-12 pt-8 border-t border-surface-variant">
          <p className="text-sm text-secondary mb-4">المشكلة مستمرة؟ تواصل معنا:</p>
          <a
            href="mailto:support@epicurean.com"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-container font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-lg">mail</span>
            support@epicurean.com
          </a>
        </div>
      </div>
    </div>
  );
}
