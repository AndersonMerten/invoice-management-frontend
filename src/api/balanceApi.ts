import { apiGet, apiPost } from "./axios";
import { Balance } from "./types/balance";

export const BalanceApi = {
  getAll: async (): Promise<Balance[]> => {
    return apiGet("/balances");
  },

  closeMonth: async (): Promise<Balance> => {
    return apiPost("/balances/close-month");
  },
}