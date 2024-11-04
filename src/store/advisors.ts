import { create } from 'zustand';
import { api } from '../lib/api';
import { MOCK_ENERGY_ADVISORS } from '../lib/mockData';
import { EnergyAdvisor } from '../types/team';

interface AdvisorStore {
  advisors: EnergyAdvisor[];
  loading: boolean;
  error: string | null;
  fetchAdvisors: () => Promise<void>;
  getAvailableAdvisors: (location: string, program: string) => Promise<EnergyAdvisor[]>;
  updateAdvisorUnits: (advisorId: string, units: number) => Promise<void>;
}

export const useAdvisorStore = create<AdvisorStore>((set, get) => ({
  advisors: MOCK_ENERGY_ADVISORS,
  loading: false,
  error: null,
  fetchAdvisors: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.advisors.getAll();
      if (response.data) {
        set({ advisors: response.data });
      }
    } catch (error) {
      set({ error: 'Failed to fetch advisors' });
    } finally {
      set({ loading: false });
    }
  },
  getAvailableAdvisors: async (location: string, program: string) => {
    try {
      const response = await api.advisors.getAvailable({ location, program });
      return response.data || [];
    } catch (error) {
      set({ error: 'Failed to get available advisors' });
      return [];
    }
  },
  updateAdvisorUnits: async (advisorId: string, units: number) => {
    try {
      await api.advisors.updateUnits(advisorId, units);
      set((state) => ({
        advisors: state.advisors.map((a) =>
          a.id === advisorId ? { ...a, totalContractUnits: units } : a
        ),
      }));
    } catch (error) {
      set({ error: 'Failed to update advisor units' });
    }
  },
}));