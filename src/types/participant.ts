export enum ParticipantStatus {
  READY_FOR_BOOKING = 'READY_FOR_BOOKING',
  AUDIT_SCHEDULED = 'AUDIT_SCHEDULED',
  INITIAL_AUDIT_COMPLETED = 'INITIAL_AUDIT_COMPLETED',
  READY_FOR_TECH_REVIEW = 'READY_FOR_TECH_REVIEW',
  READY_FOR_CONTRACTOR_QUOTE = 'READY_FOR_CONTRACTOR_QUOTE',
  WORKORDERS_SENT = 'WORKORDERS_SENT',
  READY_FOR_FINAL_AUDIT = 'READY_FOR_FINAL_AUDIT',
  FINAL_AUDIT_SCHEDULED = 'FINAL_AUDIT_SCHEDULED',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD'
}

// Map program steps to their corresponding statuses
export const STEP_STATUS_MAP = {
  booking: [ParticipantStatus.READY_FOR_BOOKING, ParticipantStatus.AUDIT_SCHEDULED],
  initialAudit: [ParticipantStatus.INITIAL_AUDIT_COMPLETED],
  techReview: [ParticipantStatus.READY_FOR_TECH_REVIEW],
  quoteGeneration: [ParticipantStatus.READY_FOR_CONTRACTOR_QUOTE],
  workOrders: [ParticipantStatus.WORKORDERS_SENT],
  finalAudit: [ParticipantStatus.READY_FOR_FINAL_AUDIT, ParticipantStatus.FINAL_AUDIT_SCHEDULED]
} as const;

export interface ParticipantStatusUpdate {
  status: ParticipantStatus;
  assignedTo?: string;
  notes?: string;
  updatedAt: string;
  updatedBy: string;
}

export interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  program: string;
  status: ParticipantStatus;
  createdAt: string;
  propertyType: string;
  notes: string;
  assignedAdvisor?: string;
  onHold: boolean;
  statusHistory?: ParticipantStatusUpdate[];
  initialAuditDate?: string;
  finalAuditDate?: string;
  reportUploaded?: boolean;
  completedAt?: string;
  priority?: 'high' | 'medium' | 'low';
}