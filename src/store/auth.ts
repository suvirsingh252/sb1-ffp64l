import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'BOOKING_AGENT' | 'ENERGY_ADVISOR' | 'TECH_TEAM' | 'ADMIN' | 'TRAINEE';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

// Auto-login admin user for testing
const defaultUser: User = {
  id: '1',
  name: 'Suvir Singh',
  email: 'suvir.singh@gmail.com',
  role: 'ADMIN',
};

export const useAuthStore = create<AuthState>(() => ({
  user: defaultUser,
  isAuthenticated: true, // Always authenticated for testing
  isLoading: false,
  error: null,
  login: async () => {}, // No-op for testing
  logout: async () => {}, // No-op for testing
}));