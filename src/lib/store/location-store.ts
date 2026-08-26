import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LocationData {
  address: string;
  lat?: number;
  lng?: number;
  city?: string;
  area?: string;
}

interface LocationState {
  currentLocation: LocationData | null;
  savedAddresses: LocationData[];
  isLocating: boolean;
  
  // Actions
  setLocation: (location: LocationData) => void;
  clearLocation: () => void;
  addSavedAddress: (address: LocationData) => void;
  removeSavedAddress: (index: number) => void;
  detectCurrentLocation: () => Promise<void>;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set, get) => ({
      currentLocation: null,
      savedAddresses: [
        { address: '124 Main Street', city: 'Cairo', area: 'Downtown' },
        { address: '45 Nile Avenue', city: 'Giza', area: 'Zamalek' },
      ],
      isLocating: false,

      setLocation: (location) => {
        set({ currentLocation: location });
        
        // Add to saved if not already there
        const { savedAddresses } = get();
        const exists = savedAddresses.some(
          (addr) => addr.address === location.address
        );
        if (!exists && location.address) {
          set({
            savedAddresses: [location, ...savedAddresses].slice(0, 5),
          });
        }
      },

      clearLocation: () => {
        set({ currentLocation: null });
      },

      addSavedAddress: (address) => {
        const { savedAddresses } = get();
        if (!savedAddresses.some((addr) => addr.address === address.address)) {
          set({ savedAddresses: [address, ...savedAddresses] });
        }
      },

      removeSavedAddress: (index) => {
        const { savedAddresses } = get();
        set({
          savedAddresses: savedAddresses.filter((_, i) => i !== index),
        });
      },

      detectCurrentLocation: async () => {
        set({ isLocating: true });
        
        try {
          if (!navigator.geolocation) {
            throw new Error('Geolocation not supported');
          }

          const position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000, // 5 minutes cache
              });
            }
          );

          const { latitude, longitude } = position.coords;
          
          // Reverse geocode using OpenStreetMap (free, no API key needed)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`
          );
          
          const data = await response.json();
          
          const location: LocationData = {
            address: data.display_name?.split(',').slice(0, 3).join(',') || 
                     `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            lat: latitude,
            lng: longitude,
            city: data.address?.city || data.address?.town || data.address?.village,
            area: data.address?.suburb || data.address?.neighbourhood,
          };

          get().setLocation(location);
        } catch (error) {
          console.error('Location detection failed:', error);
          throw error;
        } finally {
          set({ isLocating: false });
        }
      },
    }),
    {
      name: 'location-storage',
      partialize: (state) => ({
        currentLocation: state.currentLocation,
        savedAddresses: state.savedAddresses,
      }),
    }
  )
);
