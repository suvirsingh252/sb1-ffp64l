import { create } from 'zustand';
import { Program } from '../types/program';

// Mock initial programs
const MOCK_PROGRAMS: Program[] = [
  {
    id: '1',
    name: 'Residential Energy Savings',
    abbreviation: 'RES',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    isActive: true,
    dataCollection: {
      method: 'form',
      config: {
        tableName: 'residential_savings',
      },
    },
    steps: {
      booking: true,
      initialAudit: true,
      techReview: true,
      quoteGeneration: true,
      workOrders: true,
      finalAudit: true,
    },
  },
  {
    id: '2',
    name: 'Low Income Support',
    abbreviation: 'LIS',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    isActive: true,
    dataCollection: {
      method: 'form',
      config: {
        tableName: 'low_income_support',
      },
    },
    steps: {
      booking: true,
      initialAudit: true,
      techReview: false,
      quoteGeneration: true,
      workOrders: true,
      finalAudit: true,
    },
  },
  {
    id: '3',
    name: 'Commercial Retrofit',
    abbreviation: 'CR',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    isActive: true,
    dataCollection: {
      method: 'excel',
      config: {
        tableName: 'commercial_retrofit',
      },
    },
    steps: {
      booking: true,
      initialAudit: true,
      techReview: true,
      quoteGeneration: true,
      workOrders: true,
      finalAudit: true,
    },
  },
  {
    id: '4',
    name: 'Green Business Initiative',
    abbreviation: 'GBI',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    isActive: false,
    dataCollection: {
      method: 'csv',
      config: {
        tableName: 'green_business',
      },
    },
    steps: {
      booking: true,
      initialAudit: true,
      techReview: true,
      quoteGeneration: false,
      workOrders: false,
      finalAudit: true,
    },
  },
];

interface ProgramStore {
  programs: Program[];
  loading: boolean;
  error: string | null;
  addProgram: (program: Omit<Program, 'id'>) => Promise<void>;
  updateProgram: (id: string, updates: Partial<Program>) => Promise<void>;
  deleteProgram: (id: string) => Promise<void>;
  toggleProgramStatus: (id: string) => Promise<void>;
}

export const useProgramStore = create<ProgramStore>((set) => ({
  programs: MOCK_PROGRAMS, // Initialize with mock data
  loading: false,
  error: null,

  addProgram: async (programData) => {
    try {
      const newProgram: Program = {
        ...programData,
        id: Date.now().toString(),
      };
      set((state) => ({
        programs: [...state.programs, newProgram],
      }));
    } catch (error) {
      set({ error: 'Failed to add program' });
    }
  },

  updateProgram: async (id, updates) => {
    try {
      set((state) => ({
        programs: state.programs.map((program) =>
          program.id === id ? { ...program, ...updates } : program
        ),
      }));
    } catch (error) {
      set({ error: 'Failed to update program' });
    }
  },

  deleteProgram: async (id) => {
    try {
      set((state) => ({
        programs: state.programs.filter((program) => program.id !== id),
      }));
    } catch (error) {
      set({ error: 'Failed to delete program' });
    }
  },

  toggleProgramStatus: async (id) => {
    try {
      set((state) => ({
        programs: state.programs.map((program) =>
          program.id === id ? { ...program, isActive: !program.isActive } : program
        ),
      }));
    } catch (error) {
      set({ error: 'Failed to toggle program status' });
    }
  },
}));