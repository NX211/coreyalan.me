'use client';

import { useState, useEffect, useCallback } from 'react';
import { invoiceNinjaService } from '@/lib/invoice-ninja';
import { InvoiceNinjaToken, InvoiceNinjaUser } from '@/types/invoice-ninja';
import { TokenStorage } from '@/lib/invoice-ninja/token-storage';

interface UseInvoiceNinjaResult {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: InvoiceNinjaUser | null;
  token: InvoiceNinjaToken | null;
  login: (email: string, password: string, otp?: string) => Promise<InvoiceNinjaUser>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
}

/**
 * React hook for interacting with Invoice Ninja API
 * Provides authentication state and methods
 */
export function useInvoiceNinja(): UseInvoiceNinjaResult {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<InvoiceNinjaUser | null>(null);
  const [token, setToken] = useState<InvoiceNinjaToken | null>(null);
  
  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Load token from storage
        const storedToken = TokenStorage.loadToken();
        if (storedToken) {
          // Set token in service
          invoiceNinjaService.setToken(
            storedToken.access_token, 
            storedToken.refresh_token
          );
          
          setToken(storedToken);
          
          // Try to get user profile
          try {
            const userProfile = await invoiceNinjaService.getUserProfile();
            if (userProfile) {
              setUser(userProfile);
            }
          } catch (error) {
            console.error('Failed to get user profile:', error);
            // Clear token if unauthorized
            invoiceNinjaService.setToken(null);
            setToken(null);
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  // Login method
  const login = useCallback(async (
    email: string, 
    password: string,
    otp?: string
  ): Promise<InvoiceNinjaUser> => {
    setIsLoading(true);
    try {
      const user = await invoiceNinjaService.authenticateUser(email, password, otp);
      setUser(user);
      setToken(invoiceNinjaService.getToken());
      return user;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Logout method
  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Clear token in service
      invoiceNinjaService.setToken(null);
      
      // Call logout API
      await fetch('/api/auth/logout', { method: 'POST' });
      
      // Clear local state
      setUser(null);
      setToken(null);
      
      // Clear from storage
      TokenStorage.clearToken();
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Refresh token method
  const refreshToken = useCallback(async (): Promise<boolean> => {
    try {
      const success = await invoiceNinjaService.refreshToken();
      if (success) {
        setToken(invoiceNinjaService.getToken());
      }
      return success;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  }, []);
  
  return {
    isAuthenticated: !!user && !!token,
    isLoading,
    user,
    token,
    login,
    logout,
    refreshToken,
  };
} 