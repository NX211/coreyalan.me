import { InvoiceNinjaToken } from '@/types/invoice-ninja';

const TOKEN_STORAGE_KEY = 'invoice_ninja_token';

/**
 * Token storage utility to persist Invoice Ninja tokens between page reloads
 * This implementation uses localStorage for client-side persistence
 * In a production environment, consider using a more secure approach like HttpOnly cookies
 */
export const TokenStorage = {
  /**
   * Save token to storage
   * @param token Token to save
   */
  saveToken(token: InvoiceNinjaToken | null): void {
    if (typeof window === 'undefined') return;
    
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token));
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  },
  
  /**
   * Load token from storage
   * @returns Stored token or null
   */
  loadToken(): InvoiceNinjaToken | null {
    if (typeof window === 'undefined') return null;
    
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!storedToken) return null;
    
    try {
      const token = JSON.parse(storedToken) as InvoiceNinjaToken;
      
      // Check if token is expired
      const expiryTime = new Date(Date.now() - 60000); // 1 minute ago
      const tokenCreatedAt = localStorage.getItem(`${TOKEN_STORAGE_KEY}_created`);
      
      if (tokenCreatedAt) {
        const createdTime = new Date(tokenCreatedAt);
        const expiresAt = new Date(createdTime.getTime() + (token.expires_in * 1000));
        
        if (expiresAt < expiryTime) {
          // Token is expired, remove it
          localStorage.removeItem(TOKEN_STORAGE_KEY);
          localStorage.removeItem(`${TOKEN_STORAGE_KEY}_created`);
          return null;
        }
      }
      
      return token;
    } catch (error) {
      console.error('Failed to parse stored token:', error);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      return null;
    }
  },
  
  /**
   * Clear token from storage
   */
  clearToken(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(`${TOKEN_STORAGE_KEY}_created`);
  }
}; 