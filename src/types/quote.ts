export interface QuoteLineItem {
  id: string;
  upgradeId: string;
  description: string;
  category: string;
  specifications: string;
  quantity: number;
  unit: string;
  approvedAmount?: number;
  notes?: string;
}

export interface QuoteRequest {
  id: string;
  projectId: string;
  contractorId: string;
  status: 'DRAFT' | 'SENT' | 'RECEIVED' | 'APPROVED' | 'REJECTED';
  lineItems: QuoteLineItem[];
  totalAmount?: number;
  createdAt: string;
  sentAt?: string;
  receivedAt?: string;
  notes?: string;
  validUntil?: string;
}

export interface ContractorQuoteTemplate {
  id: string;
  contractorId: string;
  projectId: string;
  clientInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  lineItems: QuoteLineItem[];
  terms: string[];
  validityPeriod: number; // in days
  notes?: string;
  createdAt: string;
  status: 'DRAFT' | 'SENT' | 'RECEIVED' | 'APPROVED' | 'REJECTED';
}