import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateExpense, getExpense, UpdateExpense } from "../api/expense.api";
import { Expense } from "../types/expense.types";

export const useExpense = () => {
  const queryClient = useQueryClient();
  const createExpenseMutation = useMutation({
    mutationFn: CreateExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
  const { data, isLoading } = useQuery<Expense[]>({
    queryKey: ["expenses"],
    queryFn: getExpense,
  });
  const updateExpenseMutation = useMutation({
    mutationFn: UpdateExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
  return {
    createExpenseMutation,
    data,
    isLoading,
    updateExpenseMutation,
  };
};
