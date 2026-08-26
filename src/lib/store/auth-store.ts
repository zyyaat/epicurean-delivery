'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  addresses: UserAddress[];
  createdAt: string;
}

export interface UserAddress {
  id: string;
  label: string; // Home, Work, etc.
  address: string;
  apartment?: string;
  isDefault: boolean;
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  addAddress: (address: Omit<UserAddress, 'id'>) => void;
  removeAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
}

// Mock users for demo
const mockUsers: Record<string, { password: string; user: UserProfile }> = {
  'demo@epicurean.com': {
    password: 'demo123',
    user: {
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
    },
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser = mockUsers[email];
        
        if (mockUser && mockUser.password === password) {
          set({
            user: mockUser.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          set({ isLoading: false });
          throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        }
      },

      register: async (name: string, email: string, password: string, phone?: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Check if user already exists
        if (mockUsers[email]) {
          set({ isLoading: false });
          throw new Error('هذا البريد الإلكتروني مسجل بالفعل');
        }
        
        const newUser: UserProfile = {
          id: `user-${Date.now()}`,
          name,
          email,
          phone,
          addresses: [],
          createdAt: new Date().toISOString(),
        };
        
        // Add to mock users
        mockUsers[email] = { password, user: newUser };
        
        set({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      updateProfile: (data) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...data };
          set({ user: updatedUser });
          
          // Update mock data
          if (mockUsers[currentUser.email]) {
            mockUsers[currentUser.email].user = updatedUser;
          }
        }
      },

      addAddress: (addressData) => {
        const currentUser = get().user;
        if (currentUser) {
          const newAddress: UserAddress = {
            ...addressData,
            id: `addr-${Date.now()}`,
          };
          
          const addresses = [...currentUser.addresses, newAddress];
          
          // If this is the first address or marked as default, make it default
          if (addressData.isDefault || addresses.length === 1) {
            addresses.forEach(a => a.isDefault = a.id === newAddress.id);
          }
          
          get().updateProfile({ addresses });
        }
      },

      removeAddress: (addressId) => {
        const currentUser = get().user;
        if (currentUser) {
          const addresses = currentUser.addresses.filter(a => a.id !== addressId);
          get().updateProfile({ addresses });
        }
      },

      setDefaultAddress: (addressId) => {
        const currentUser = get().user;
        if (currentUser) {
          const addresses = currentUser.addresses.map(a => ({
            ...a,
            isDefault: a.id === addressId,
          }));
          get().updateProfile({ addresses });
        }
      },
    }),
    {
      name: 'epicurean-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
