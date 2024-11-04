import { create } from 'zustand';
import { User } from '../types/auth';
import { api } from '../lib/api';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.login(email, password);
      if (response.error) throw new Error(response.error);
      if (!response.data) throw new Error('Login failed');
      set({ user: response.data, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Login failed', isLoading: false });
    }
  },
  logout: () => {
    set({ user: null, error: null });
  },
}));