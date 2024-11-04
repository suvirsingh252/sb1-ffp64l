import { create } from 'zustand';
import { User, UserRole } from '../types/auth';

interface UserStore {
  users: User[];
  loading: boolean;
  error: string | null;
  addUser: (user: Omit<User, 'id'>) => Promise<void>;
  updateUser: (id: string, updates: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

// Test data
const TEST_USERS: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'ENERGY_ADVISOR',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    role: 'BOOKING_AGENT',
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'mike.w@example.com',
    role: 'TECH_TEAM',
  },
];

export const useUserStore = create<UserStore>((set) => ({
  users: TEST_USERS,
  loading: false,
  error: null,
  addUser: async (userData) => {
    try {
      // In a real app, this would make an API call
      const newUser = {
        ...userData,
        id: String(Date.now()),
      };
      set((state) => ({
        users: [...state.users, newUser],
      }));
    } catch (error) {
      set({ error: 'Failed to add user' });
    }
  },
  updateUser: async (id, updates) => {
    try {
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? { ...user, ...updates } : user
        ),
      }));
    } catch (error) {
      set({ error: 'Failed to update user' });
    }
  },
  deleteUser: async (id) => {
    try {
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
      }));
    } catch (error) {
      set({ error: 'Failed to delete user' });
    }
  },
}));