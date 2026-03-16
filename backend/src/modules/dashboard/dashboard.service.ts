import { financeEngine } from "../financeEngine/finance.engine";

export const getDashboardMetrics = async (userId: string) => {
  const finance = await financeEngine(userId);

  return {
    revenue: {
      mrr: finance.mrr,
      arr: finance.arr,
    },
    finance: {
      burn: finance.burn,
      runway: finance.runway,
      profitOrloss: finance.profitOrloss,
    },
    cash: finance.financialProfile
      ? Number(finance.financialProfile.cashAvailable)
      : 0,
  };
};
