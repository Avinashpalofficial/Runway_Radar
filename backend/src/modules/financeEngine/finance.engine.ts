import { prisma } from "../../config/db";
import { calculateBurn } from "./burn.calculator";
import { calculateMrr } from "./mrr.calculator";
import { calculateProfitOrLoss } from "./profit.calculator";
import { calculateRunway } from "./runway.calculator";

export const financeEngine = async (userId: string) => {
  const [subscription, expense, financialProfile] = await Promise.all([
    prisma.subscription.findMany({
      where: { userId },
    }),
    prisma.expense.findMany({
      where: { userId },
    }),
    prisma.financialProfile.findUnique({
      where: { userId },
    }),
  ]);
  const mrr = calculateMrr(subscription);
  const burn = calculateBurn(expense);
  const runway = calculateRunway(financialProfile, burn);
  const profitOrloss = calculateProfitOrLoss(mrr, burn);
  const arr = mrr * 12;
  return {
    mrr,
    burn,
    runway,
    profitOrloss,
    arr,
    subscription,
    expense,
    financialProfile,
  };
};
