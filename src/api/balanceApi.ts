import { apiGet } from "./axios";
import { Balance } from "./types/balance";

export const BalanceApi = {
  getAll: async (): Promise<Balance[]> => {
    return apiGet("/balances");
  }
}