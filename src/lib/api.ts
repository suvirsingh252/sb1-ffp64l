import { mockLogin } from './mockAuth';
import { MOCK_ENERGY_ADVISORS, MOCK_PARTICIPANTS } from './mockData';
import { ParticipantStatus } from '../types/participant';
import { EnergyAdvisor } from '../types/team';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class Api {
  participants = {
    getAll: async () => {
      return { data: MOCK_PARTICIPANTS };
    },
    updateStatus: async (id: string, status: ParticipantStatus) => {
      return { data: { success: true } };
    },
    toggleHold: async (id: string) => {
      return { data: { success: true } };
    }
  };

  advisors = {
    getAll: async () => {
      return { data: MOCK_ENERGY_ADVISORS };
    },
    getAvailable: async ({ location, program }: { location: string; program: string }) => {
      const availableAdvisors = MOCK_ENERGY_ADVISORS.filter(
        advisor => 
          advisor.serviceAreas.includes(location) &&
          advisor.programsTrainedIn.includes(program) &&
          advisor.totalContractUnits > 0
      );
      return { data: availableAdvisors };
    },
    updateUnits: async (advisorId: string, units: number) => {
      return { data: { success: true } };
    }
  };

  async login(email: string, password: string) {
    try {
      const user = await mockLogin(email, password);
      return { data: user };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Login failed' };
    }
  }
}

export const api = new Api();