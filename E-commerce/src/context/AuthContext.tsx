'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Address } from '@/types/user';
import { MOCK_USERS } from '@/data/mockUsers';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<Omit<User, 'id' | 'role' | 'addresses'>>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  switchDemoUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'aether_user_auth_session_v3';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage (default to unauthenticated/guest)
  useEffect(() => {
    try {
      // Clean up legacy auto-seeded session keys if present
      localStorage.removeItem('aether_user_session');
      localStorage.removeItem('aether_user_auth_session');
      localStorage.removeItem('aether_user_auth_session_v2');

      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        setUser(null);
      }
    } catch (e) {
      console.error('Error loading auth from localStorage', e);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUser = (updated: User | null) => {
    setUser(updated);
    if (updated) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  };

  const login = async (email: string, _pass: string) => {
    const found = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      saveUser(found);
      return { success: true };
    }
    // Create quick session for new email
    const cleanName = email.split('@')[0];
    const capitalizedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: capitalizedName,
      email: email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
      role: 'customer',
      addresses: [],
      createdAt: new Date().toISOString(),
    };
    saveUser(newUser);
    return { success: true };
  };

  const register = async (name: string, email: string, _pass: string) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
      role: 'customer',
      addresses: [],
      createdAt: new Date().toISOString(),
    };
    saveUser(newUser);
    return { success: true };
  };

  const logout = () => {
    saveUser(null);
  };

  const switchDemoUser = (userId: string) => {
    const target = MOCK_USERS.find((u) => u.id === userId);
    if (target) {
      saveUser(target);
    }
  };

  const updateProfile = (data: Partial<Omit<User, 'id' | 'role' | 'addresses'>>) => {
    if (!user) return;
    const updated: User = { ...user, ...data };
    saveUser(updated);
  };

  const addAddress = (addressData: Omit<Address, 'id'>) => {
    if (!user) return;
    const newAddress: Address = {
      ...addressData,
      id: `addr-${Date.now()}`,
      isDefault: user.addresses.length === 0 || addressData.isDefault,
    };

    let updatedAddresses = [...user.addresses];
    if (newAddress.isDefault) {
      updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefault: false }));
    }
    updatedAddresses.push(newAddress);

    saveUser({ ...user, addresses: updatedAddresses });
  };

  const updateAddress = (id: string, addressData: Partial<Address>) => {
    if (!user) return;
    let updatedAddresses = user.addresses.map((addr) => {
      if (addr.id === id) {
        return { ...addr, ...addressData };
      }
      if (addressData.isDefault) {
        return { ...addr, isDefault: false };
      }
      return addr;
    });
    saveUser({ ...user, addresses: updatedAddresses });
  };

  const deleteAddress = (id: string) => {
    if (!user) return;
    const filtered = user.addresses.filter((a) => a.id !== id);
    if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
      filtered[0].isDefault = true;
    }
    saveUser({ ...user, addresses: filtered });
  };

  const setDefaultAddress = (id: string) => {
    if (!user) return;
    const updatedAddresses = user.addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    saveUser({ ...user, addresses: updatedAddresses });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        switchDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
