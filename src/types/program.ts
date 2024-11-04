export interface Program {
  id: string;
  name: string;
  abbreviation: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  dataCollection: {
    method: 'csv' | 'excel' | 'form';
    config?: {
      tableName: string;
      fields?: Array<{
        id: string;
        label: string;
        type: string;
        required: boolean;
        options?: string[];
      }>;
    };
  };
  steps: {
    booking: boolean;
    initialAudit: boolean;
    techReview: boolean;
    quoteGeneration: boolean;
    workOrders: boolean;
    finalAudit: boolean;
  };
}

export const DATA_COLLECTION_METHODS = [
  { value: 'csv', label: 'CSV Upload' },
  { value: 'excel', label: 'Excel Upload' },
  { value: 'form', label: 'Custom Form' },
] as const;

export const AVAILABLE_STEPS = [
  { id: 'booking', label: 'Booking', description: 'Allow scheduling appointments' },
  { id: 'initialAudit', label: 'Initial Audit', description: 'First on-site assessment' },
  { id: 'techReview', label: 'Technical Review', description: 'Review by technical team' },
  { id: 'quoteGeneration', label: 'Quote Generation', description: 'Generate contractor quotes' },
  { id: 'workOrders', label: 'Work Orders', description: 'Create and manage work orders' },
  { id: 'finalAudit', label: 'Final Audit', description: 'Final verification assessment' },
] as const;

export type DataCollectionMethod = typeof DATA_COLLECTION_METHODS[number]['value'];
export type ProgramStep = typeof AVAILABLE_STEPS[number]['id'];

export interface ProgramField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'textarea';
  required: boolean;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}