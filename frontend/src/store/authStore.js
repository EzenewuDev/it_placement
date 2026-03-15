import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

export const api = axios.create({ baseURL: 'http://localhost:5001/api' });

// Re-attach token on page load if it exists in localStorage
const storedToken = localStorage.getItem('token');
if (storedToken) {
  api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
}

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      // ─── Login ──────────────────────────────────────────────────────────
      login: async (email, password) => {
        try {
          const response = await api.post('/auth/login', {
            email: email.trim().toLowerCase(),
            password
          });
          const token = response.data.access_token;
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          localStorage.setItem('token', token);
          set({ user: response.data.user, isAuthenticated: true });
          return { success: true };
        } catch (error) {
          const msg = error.response?.data?.error || 'Login failed. Check your credentials.';
          return { success: false, error: msg };
        }
      },

      // ─── Register ───────────────────────────────────────────────────────
      register: async (email, password, role = 'student') => {
        try {
          if (!email || !password) {
            return { success: false, error: 'Email and password are required.' };
          }
          if (password.length < 6) {
            return { success: false, error: 'Password must be at least 6 characters.' };
          }
          await api.post('/auth/register', {
            email: email.trim().toLowerCase(),
            password,
            role
          });
          return { success: true };
        } catch (error) {
          const msg = error.response?.data?.error || 'Registration failed. Please try again.';
          return { success: false, error: msg };
        }
      },

      // ─── Google OAuth ───────────────────────────────────────────────────
      googleLogin: async (credential, role = 'student') => {
        try {
          const response = await api.post('/auth/google', { credential, role });
          const token = response.data.access_token;
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          localStorage.setItem('token', token);
          set({ user: response.data.user, isAuthenticated: true });
          return { success: true };
        } catch (error) {
          console.error('[Google Auth Error]', error.response?.data);
          const msg = error.response?.data?.error || 'Google Authentication failed.';
          return { success: false, error: msg };
        }
      },

      // ─── Logout ─────────────────────────────────────────────────────────
      logout: () => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        set({ user: null, isAuthenticated: false });
      },

      // ─── Refresh user from token ────────────────────────────────────────
      refreshUser: async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await api.get('/auth/me');
          set({ user: response.data.user, isAuthenticated: true });
        } catch {
          // Token expired or invalid — log out
          localStorage.removeItem('token');
          delete api.defaults.headers.common['Authorization'];
          set({ user: null, isAuthenticated: false });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

export default useAuthStore;
