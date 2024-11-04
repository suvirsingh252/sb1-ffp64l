import { create } from 'zustand';
import { api } from '../lib/api';
import { Participant, ParticipantStatus } from '../types/participant';
import { emailService } from '../services/email';
import { MOCK_PARTICIPANTS } from '../lib/mockData';

interface ParticipantStore {
  participants: Participant[];
  loading: boolean;
  error: string | null;
  fetchParticipants: () => Promise<void>;
  updateParticipantStatus: (id: string, status: ParticipantStatus, notes?: string) => Promise<void>;
  toggleParticipantHold: (id: string) => Promise<void>;
  addParticipant: (participant: Omit<Participant, 'id'>) => Promise<void>;
  assignToAdvisor: (participantId: string, advisorId: string) => Promise<void>;
  updatePriority: (participantId: string, priority: 'high' | 'medium' | 'low') => Promise<void>;
}

export const useParticipantStore = create<ParticipantStore>((set, get) => ({
  participants: MOCK_PARTICIPANTS, // Initialize with mock data
  loading: false,
  error: null,

  fetchParticipants: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.participants.getAll();
      if (response.data) {
        set({ participants: response.data });
      }
    } catch (error) {
      set({ error: 'Failed to fetch participants' });
    } finally {
      set({ loading: false });
    }
  },

  updateParticipantStatus: async (id: string, status: ParticipantStatus, notes?: string) => {
    try {
      await api.participants.updateStatus(id, status);
      
      set((state) => {
        const updatedParticipants = state.participants.map((p) => {
          if (p.id === id) {
            const statusUpdate = {
              status,
              notes,
              updatedAt: new Date().toISOString(),
              updatedBy: 'current-user-id', // In real app, get from auth
            };
            
            const updatedParticipant = {
              ...p,
              status,
              statusHistory: [...(p.statusHistory || []), statusUpdate],
              completedAt: status === ParticipantStatus.COMPLETED ? new Date().toISOString() : p.completedAt
            };

            // Send status update notification
            emailService.sendStatusUpdateNotification(
              updatedParticipant,
              status,
              updatedParticipant.assignedAdvisor
            ).catch(console.error);

            return updatedParticipant;
          }
          return p;
        });

        return { participants: updatedParticipants };
      });
    } catch (error) {
      set({ error: 'Failed to update participant status' });
    }
  },

  toggleParticipantHold: async (id: string) => {
    try {
      await api.participants.toggleHold(id);
      set((state) => ({
        participants: state.participants.map((p) =>
          p.id === id ? { ...p, onHold: !p.onHold } : p
        ),
      }));
    } catch (error) {
      set({ error: 'Failed to toggle participant hold status' });
    }
  },

  addParticipant: async (participantData: Omit<Participant, 'id'>) => {
    try {
      const newParticipant: Participant = {
        ...participantData,
        id: `p${Date.now()}`,
        status: ParticipantStatus.READY_FOR_BOOKING,
        createdAt: new Date().toISOString(),
        onHold: false,
        reportUploaded: false,
      };

      set((state) => ({
        participants: [...state.participants, newParticipant],
      }));

      // Send welcome email to new participant
      await emailService.sendStatusUpdateNotification(
        newParticipant,
        'READY_FOR_BOOKING',
        undefined
      );
    } catch (error) {
      set({ error: 'Failed to add participant' });
    }
  },

  assignToAdvisor: async (participantId: string, advisorId: string) => {
    try {
      set((state) => ({
        participants: state.participants.map((p) =>
          p.id === participantId ? { ...p, assignedAdvisor: advisorId } : p
        ),
      }));

      // Get participant and advisor details
      const participant = get().participants.find(p => p.id === participantId);
      if (participant) {
        // Send assignment notification
        await emailService.sendStatusUpdateNotification(
          participant,
          'ASSIGNED',
          advisorId
        );
      }
    } catch (error) {
      set({ error: 'Failed to assign advisor' });
    }
  },

  updatePriority: async (participantId: string, priority: 'high' | 'medium' | 'low') => {
    try {
      set((state) => ({
        participants: state.participants.map((p) =>
          p.id === participantId ? { ...p, priority } : p
        ),
      }));
    } catch (error) {
      set({ error: 'Failed to update priority' });
    }
  },
}));