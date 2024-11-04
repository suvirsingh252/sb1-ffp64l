import { create } from 'zustand';
import { QuoteRequest, QuoteLineItem, ContractorQuoteTemplate } from '../types/quote';

interface QuoteStore {
  quoteRequests: QuoteRequest[];
  quoteTemplates: ContractorQuoteTemplate[];
  loading: boolean;
  error: string | null;
  createQuoteRequest: (projectId: string, contractorId: string, lineItems: QuoteLineItem[]) => Promise<void>;
  updateQuoteStatus: (quoteId: string, status: QuoteRequest['status']) => Promise<void>;
  addLineItem: (quoteId: string, lineItem: Omit<QuoteLineItem, 'id'>) => Promise<void>;
  updateLineItem: (quoteId: string, lineItemId: string, updates: Partial<QuoteLineItem>) => Promise<void>;
  generateQuoteTemplate: (quoteId: string) => Promise<void>;
}

export const useQuoteStore = create<QuoteStore>((set, get) => ({
  quoteRequests: [],
  quoteTemplates: [],
  loading: false,
  error: null,

  createQuoteRequest: async (projectId, contractorId, lineItems) => {
    try {
      const newQuote: QuoteRequest = {
        id: Date.now().toString(),
        projectId,
        contractorId,
        status: 'DRAFT',
        lineItems,
        createdAt: new Date().toISOString()
      };

      set((state) => ({
        quoteRequests: [...state.quoteRequests, newQuote]
      }));
    } catch (error) {
      set({ error: 'Failed to create quote request' });
    }
  },

  updateQuoteStatus: async (quoteId, status) => {
    try {
      set((state) => ({
        quoteRequests: state.quoteRequests.map((quote) =>
          quote.id === quoteId
            ? {
                ...quote,
                status,
                ...(status === 'SENT' ? { sentAt: new Date().toISOString() } : {}),
                ...(status === 'RECEIVED' ? { receivedAt: new Date().toISOString() } : {})
              }
            : quote
        )
      }));
    } catch (error) {
      set({ error: 'Failed to update quote status' });
    }
  },

  addLineItem: async (quoteId, lineItem) => {
    try {
      set((state) => ({
        quoteRequests: state.quoteRequests.map((quote) =>
          quote.id === quoteId
            ? {
                ...quote,
                lineItems: [
                  ...quote.lineItems,
                  { ...lineItem, id: Date.now().toString() }
                ]
              }
            : quote
        )
      }));
    } catch (error) {
      set({ error: 'Failed to add line item' });
    }
  },

  updateLineItem: async (quoteId, lineItemId, updates) => {
    try {
      set((state) => ({
        quoteRequests: state.quoteRequests.map((quote) =>
          quote.id === quoteId
            ? {
                ...quote,
                lineItems: quote.lineItems.map((item) =>
                  item.id === lineItemId ? { ...item, ...updates } : item
                )
              }
            : quote
        )
      }));
    } catch (error) {
      set({ error: 'Failed to update line item' });
    }
  },

  generateQuoteTemplate: async (quoteId) => {
    try {
      const quote = get().quoteRequests.find(q => q.id === quoteId);
      if (!quote) throw new Error('Quote not found');

      // Generate contractor quote template
      const template: ContractorQuoteTemplate = {
        id: Date.now().toString(),
        contractorId: quote.contractorId,
        projectId: quote.projectId,
        clientInfo: {
          name: '', // This would come from the project details
          address: '',
          phone: '',
          email: ''
        },
        lineItems: quote.lineItems,
        terms: [
          'Quote valid for 30 days',
          'Payment terms: Net 30',
          'Work to be completed within 60 days of acceptance'
        ],
        validityPeriod: 30,
        createdAt: new Date().toISOString(),
        status: 'DRAFT'
      };

      set((state) => ({
        quoteTemplates: [...state.quoteTemplates, template]
      }));
    } catch (error) {
      set({ error: 'Failed to generate quote template' });
    }
  }
}));