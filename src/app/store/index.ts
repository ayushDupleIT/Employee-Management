import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
export const useAuthStore = create<any>(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      setAuthToken: (accessToken: string) => set({ isAuthenticated: true, accessToken }),
      setUserDetails: (userDetails: any) => set({ user: userDetails }),
      logout: () => set({ isAuthenticated: false, user: null, accessToken: null }),
    }),
    {
      name: 'Job Portal',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useAuthStore;