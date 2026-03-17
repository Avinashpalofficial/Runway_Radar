import { Expense } from "@prisma/client";

export const calculateBurn = (expense: Expense[]) => {
  return expense.reduce((total, exp) => {
    const price = Number(exp.amount);
    return total + price;
  }, 0);
};
