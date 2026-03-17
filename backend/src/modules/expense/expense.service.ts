import { prisma } from "../../config/db";
import { Prisma } from "@prisma/client";

export const createExpense = async (
  userId: string,
  title: string,
  currency: string,
  amount: number | string,
  category: string,
) => {
  return prisma.expense.create({
    data: {
      userId,
      title,
      currency,
      amount: new Prisma.Decimal(amount),
      category,
    },
  });
};
/**
 * Get expenses
 */

export const getExpense = async (userId: string) => {
  return prisma.expense.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

/**
 * Update Expenses
 */

export const updateExpense = async (
  userId: string,
  expenseId: string,
  amount?: number | string,
  category?: string,
) => {
  return prisma.expense.update({
    where: {
      id: expenseId,
      userId,
    },

    data: {
      ...(amount !== undefined && { amount: new Prisma.Decimal(amount) }),
      ...(category !== undefined && { category }),
    },
  });
};
