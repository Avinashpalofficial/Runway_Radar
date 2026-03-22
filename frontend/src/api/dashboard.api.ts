import { api } from "../lib/api";
import { DashboardResponse } from "../types/dashboard.types";

export const getDashboardData = async (): Promise<DashboardResponse> => {
  const res = await api.get("/dashboard/summary");
  const apiData = res.data.data;
  console.log("alpi:", apiData);

  return {
    metrics: {
      mrr: apiData.revenue.mrr,
      arr: apiData.revenue.arr,
      burn: apiData.finance.burn,
      runway: apiData.finance.runway,
      profitOrloss: apiData.finance.profitOrloss,
    },
    data: {
      subscription: [],
      expense: [],
      finance: apiData.finance,
    },
  };
};
