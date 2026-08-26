'use client';

import React, { useState, useEffect } from 'react';
import { useLocationStore, type LocationData } from '@/lib/store/location-store';

interface LocationPickerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LocationPicker({ isOpen, onClose }: LocationPickerProps) {
  const {
    currentLocation,
    savedAddresses,
    isLocating,
    setLocation,
    removeSavedAddress,
    detectCurrentLocation,
  } = useLocationStore();

  const [customAddress, setCustomAddress] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCustomAddress('');
      setError(null);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleDetectLocation = async () => {
    setError(null);
    try {
      await detectCurrentLocation();
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('User denied') || err.message.includes('Geolocation request denied')) {
          setError('تم رفض الوصول للموقع. يرجى تفعيله من إعدادات المتصفح');
        } else if (err.message.includes('not supported')) {
          setError('متصفحك لا يدعم تحديد الموقع');
        } else {
          setError('فشل في تحديد الموقع. حاول مرة أخرى');
        }
      }
    }
  };

  const handleSelectAddress = (address: LocationData) => {
    setLocation(address);
    onClose();
  };

  const handleUseCustomAddress = () => {
    if (customAddress.trim()) {
      setLocation({ address: customAddress.trim() });
      setCustomAddress('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full sm:max-w-lg sm:mx-auto bg-background rounded-t-3xl sm:rounded-3xl max-h-[85vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-surface-container">
          <h2 className="font-title-xl text-title-xl text-on-background">
            📍 موقع التوصيل
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-on-background">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Current Location Button */}
          <button
            onClick={handleDetectLocation}
            disabled={isLocating}
            className="
              w-full p-4 rounded-2xl 
              gradient-primary text-white
              font-label-lg font-semibold
              flex items-center justify-center gap-3
              hover:opacity-90 transition-opacity
              disabled:opacity-70 disabled:cursor-not-allowed
              shadow-glow
            "
          >
            {isLocating ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                جاري تحديد الموقع...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">my_location</span>
                تحديد موقعي الحالي
              </>
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-xl bg-error/10 text-error text-center font-body-md">
              {error}
            </div>
          )}

          {/* Custom Address Input */}
          <div className="space-y-3">
            <label className="font-label-md text-secondary uppercase tracking-wider">
              أو أدخل عنوانك يدوياً
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={customAddress}
                onChange={(e) => setCustomAddress(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUseCustomAddress()}
                placeholder="مثال: شارع التحرير، القاهرة"
                className="
                  flex-1 px-4 py-3 rounded-xl
                  bg-surface-container
                  border border-outline/20 focus:border-primary
                  outline-none
                  font-body-md text-on-background
                  placeholder:text-secondary/60
                  transition-colors
                "
              />
              <button
                onClick={handleUseCustomAddress}
                disabled={!customAddress.trim()}
                className="
                  px-5 py-3 rounded-xl
                  bg-primary text-on-primary
                  font-label-lg font-semibold
                  hover:bg-primary-container transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                تأكيد
              </button>
            </div>
          </div>

          {/* Saved Addresses */}
          {savedAddresses.length > 0 && (
            <div className="space-y-3">
              <label className="font-label-md text-secondary uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">history</span>
                العناوين المحفوظة
              </label>
              
              <div className="space-y-2">
                {savedAddresses.map((address, index) => (
                  <div
                    key={index}
                    className="
                      group flex items-center gap-4 p-4
                      bg-surface-container hover:bg-surface-container-high
                      rounded-xl cursor-pointer
                      transition-all duration-200
                      border border-transparent hover:border-primary/20
                    "
                    onClick={() => handleSelectAddress(address)}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <span className="material-symbols-outlined text-primary">location_on</span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-body-md text-on-background truncate">
                        {address.address}
                      </p>
                      {address.city && (
                        <p className="font-body-sm text-secondary">
                          {address.area && `${address.area}, `}{address.city}
                        </p>
                      )}
                    </div>

                    {/* Active indicator */}
                    {currentLocation?.address === address.address && (
                      <span className="material-symbols-outlined text-success">check_circle</span>
                    )}

                    {/* Delete button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSavedAddress(index);
                      }}
                      className="
                        opacity-0 group-hover:opacity-100
                        w-8 h-8 rounded-full
                        bg-error/10 hover:bg-error/20
                        flex items-center justify-center
                        transition-all duration-200
                      "
                    >
                      <span className="material-symbols-outlined text-error text-sm">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {savedAddresses.length === 0 && (
            <div className="text-center py-8 space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl text-secondary">location_off</span>
              </div>
              <p className="font-body-md text-secondary">
                لا توجد عناوين محفوظة
              </p>
              <p className="font-body-sm text-secondary/70">
                حدد موقعك الحالي أو أدخل عنوانك يدوياً
              </p>
            </div>
          )}
        </div>

        {/* Footer - Current Selection */}
        {currentLocation && (
          <div className="p-6 border-t border-surface-container bg-success/5">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-success">check_circle</span>
              <div className="flex-1 min-w-0">
                <p className="font-label-md text-success font-medium">الموقع المختار:</p>
                <p className="font-body-md text-on-background truncate">
                  {currentLocation.address}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
