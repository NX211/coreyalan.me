import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { z } from 'zod';

/**
 * Theme state schema
 */
export const themeSchema = z.object({
  theme: z.enum(['light', 'dark']),
  setTheme: z.function().args(z.enum(['light', 'dark'])).returns(z.void())
});

export type ThemeState = z.infer<typeof themeSchema>;

/**
 * Theme store with persistence
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
); 