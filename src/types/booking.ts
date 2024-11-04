export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookingDetails {
  participantId: string;
  advisorId: string;
  date: string;
  timeSlot: string;
  visitType: 'INITIAL_AUDIT' | 'FINAL_AUDIT';
  notes: string;
}