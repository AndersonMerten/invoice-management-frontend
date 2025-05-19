import { apiDelete, apiGet, apiPost, apiPut } from "./axios";
import { Invoice } from "./types/invoice";

export const InvoiceApi = {
  getAll: async (): Promise<Invoice[]> => {
    return apiGet("/invoices");
  },

  getById: async (id: string): Promise<Invoice> => {
    return apiGet(`/invoices/${id}`);
  },

  create: async (invoiceData: Omit<Invoice, "id">): Promise<Invoice> => {
    return apiPost("/invoices", invoiceData);
  },

  update: async (id: string, updates: Partial<Invoice>): Promise<Invoice> => {
    return apiPut(`/invoices/${id}`, updates);
  },

  delete: async (id: string): Promise<void> => {
    return apiDelete(`/invoices/${id}`);
  },
};
