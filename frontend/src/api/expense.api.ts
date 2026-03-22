import { api } from "../lib/api";
import {
  createExpense,
  createExpenseResponse,
  Expense,
  GetExpenseResponse,
  updateExpense,
  updateExpenseResponse,
} from "../types/expense.types";

export const CreateExpense = async (data: createExpense): Promise<Expense> => {
  const res = await api.post<createExpenseResponse>("/expense/create", data);
  return res.data.expense;
};

export const getExpense = async (): Promise<Expense[]> => {
  const res = await api.get<GetExpenseResponse>("/expense/get");
  console.log("res:", res);

  return res.data.expense;
};

type updateExpensePayload = {
  id: string;
  data: updateExpense;
};
export const UpdateExpense = async ({
  id,
  data,
}: updateExpensePayload): Promise<Expense> => {
  const res = await api.patch<updateExpenseResponse>(`/expense/${id}`, data);

  return res.data.expense;
};
