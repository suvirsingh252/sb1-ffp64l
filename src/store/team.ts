import { create } from 'zustand';
import { EnergyAdvisor, BookingAgent, TechTeamMember } from '../types/team';
import { MOCK_ENERGY_ADVISORS, MOCK_BOOKING_AGENTS, MOCK_TECH_TEAM } from '../lib/mockData';

interface TeamStore {
  energyAdvisors: EnergyAdvisor[];
  bookingAgents: BookingAgent[];
  techTeam: TechTeamMember[];
  loading: boolean;
  error: string | null;
  addEnergyAdvisor: (advisor: Omit<EnergyAdvisor, 'id'>) => Promise<void>;
  addBookingAgent: (agent: Omit<BookingAgent, 'id'>) => Promise<void>;
  addTechMember: (member: Omit<TechTeamMember, 'id'>) => Promise<void>;
  updateTeamMember: (type: 'EA' | 'BA' | 'TECH', id: string, updates: any) => Promise<void>;
  deleteTeamMember: (type: 'EA' | 'BA' | 'TECH', id: string) => Promise<void>;
}

export const useTeamStore = create<TeamStore>((set) => ({
  energyAdvisors: MOCK_ENERGY_ADVISORS,
  bookingAgents: MOCK_BOOKING_AGENTS,
  techTeam: MOCK_TECH_TEAM,
  loading: false,
  error: null,

  addEnergyAdvisor: async (advisor) => {
    try {
      const newAdvisor = {
        ...advisor,
        id: String(Date.now())
      };
      set((state) => ({
        energyAdvisors: [...state.energyAdvisors, newAdvisor]
      }));
    } catch (error) {
      set({ error: 'Failed to add energy advisor' });
    }
  },

  addBookingAgent: async (agent) => {
    try {
      const newAgent = {
        ...agent,
        id: String(Date.now())
      };
      set((state) => ({
        bookingAgents: [...state.bookingAgents, newAgent]
      }));
    } catch (error) {
      set({ error: 'Failed to add booking agent' });
    }
  },

  addTechMember: async (member) => {
    try {
      const newMember = {
        ...member,
        id: String(Date.now())
      };
      set((state) => ({
        techTeam: [...state.techTeam, newMember]
      }));
    } catch (error) {
      set({ error: 'Failed to add tech team member' });
    }
  },

  updateTeamMember: async (type, id, updates) => {
    try {
      set((state) => {
        switch (type) {
          case 'EA':
            return {
              energyAdvisors: state.energyAdvisors.map((ea) =>
                ea.id === id ? { ...ea, ...updates } : ea
              )
            };
          case 'BA':
            return {
              bookingAgents: state.bookingAgents.map((ba) =>
                ba.id === id ? { ...ba, ...updates } : ba
              )
            };
          case 'TECH':
            return {
              techTeam: state.techTeam.map((tm) =>
                tm.id === id ? { ...tm, ...updates } : tm
              )
            };
          default:
            return state;
        }
      });
    } catch (error) {
      set({ error: 'Failed to update team member' });
    }
  },

  deleteTeamMember: async (type, id) => {
    try {
      set((state) => {
        switch (type) {
          case 'EA':
            return {
              energyAdvisors: state.energyAdvisors.filter((ea) => ea.id !== id)
            };
          case 'BA':
            return {
              bookingAgents: state.bookingAgents.filter((ba) => ba.id !== id)
            };
          case 'TECH':
            return {
              techTeam: state.techTeam.filter((tm) => tm.id !== id)
            };
          default:
            return state;
        }
      });
    } catch (error) {
      set({ error: 'Failed to delete team member' });
    }
  }
}));