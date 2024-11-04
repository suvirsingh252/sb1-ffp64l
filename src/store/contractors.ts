import { create } from 'zustand';
import { Contractor } from '../types/team';

interface ContractorStore {
  contractors: Contractor[];
  loading: boolean;
  error: string | null;
  addContractor: (contractor: Omit<Contractor, 'id'>) => Promise<void>;
  updateContractor: (id: string, updates: Partial<Contractor>) => Promise<void>;
  deleteContractor: (id: string) => Promise<void>;
  togglePreferred: (id: string) => Promise<void>;
}

// Mock data for testing
const MOCK_CONTRACTORS: Contractor[] = [
  {
    id: '1',
    name: 'GreenTech Solutions',
    contactPerson: 'John Miller',
    phone: '(416) 555-0101',
    email: 'john@greentech.com',
    servicesOffered: ['HVAC Installation', 'Insulation', 'Air Sealing'],
    areasServiced: ['Toronto Downtown', 'North York', 'Etobicoke'],
    isPreferred: true,
    status: 'ACTIVE'
  },
  {
    id: '2',
    name: 'EcoHome Improvements',
    contactPerson: 'Sarah Lee',
    phone: '(416) 555-0102',
    email: 'sarah@ecohome.com',
    servicesOffered: ['Window Replacement', 'Door Installation', 'Insulation'],
    areasServiced: ['Scarborough', 'Markham', 'Richmond Hill'],
    isPreferred: true,
    status: 'ACTIVE'
  }
];

export const useContractorStore = create<ContractorStore>((set) => ({
  contractors: MOCK_CONTRACTORS,
  loading: false,
  error: null,
  addContractor: async (contractor) => {
    try {
      const newContractor = {
        ...contractor,
        id: String(Date.now())
      };
      set((state) => ({
        contractors: [...state.contractors, newContractor]
      }));
    } catch (error) {
      set({ error: 'Failed to add contractor' });
    }
  },
  updateContractor: async (id, updates) => {
    try {
      set((state) => ({
        contractors: state.contractors.map((c) =>
          c.id === id ? { ...c, ...updates } : c
        )
      }));
    } catch (error) {
      set({ error: 'Failed to update contractor' });
    }
  },
  deleteContractor: async (id) => {
    try {
      set((state) => ({
        contractors: state.contractors.filter((c) => c.id !== id)
      }));
    } catch (error) {
      set({ error: 'Failed to delete contractor' });
    }
  },
  togglePreferred: async (id) => {
    try {
      set((state) => ({
        contractors: state.contractors.map((c) =>
          c.id === id ? { ...c, isPreferred: !c.isPreferred } : c
        )
      }));
    } catch (error) {
      set({ error: 'Failed to toggle preferred status' });
    }
  }
}));