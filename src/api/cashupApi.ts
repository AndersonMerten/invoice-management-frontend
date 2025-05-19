import { apiDelete, apiGet, apiPost, apiPut } from "./axios";
import { CashUp } from "./types/cashup";

export const CashUpApi = {
  getAll: async (): Promise<CashUp[]> => {
    return apiGet("/cash-ups");
  },

  getById: async (id: string): Promise<CashUp> => {
    return apiGet(`/cash-ups/${id}`);
  },

  create: async (cashupData: Omit<CashUp, "id">): Promise<CashUp> => {
    return apiPost("/cash-ups", cashupData);
  },

  update: async (id: string, updates: Partial<CashUp>): Promise<CashUp> => {
    return apiPut(`/cash-ups/${id}`, updates);
  },

  delete: async (id: string): Promise<void> => {
    return apiDelete(`/cash-ups/${id}`);
  },
};
