export interface Expense {
  id: string;
  title: string;
  currency: string;
  amount: number;
  category: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface createExpense {
  title: string;
  currency: string;
  amount: number;
  category: string;
}

export interface createExpenseResponse {
  success: boolean;
  expense: Expense;
}

export interface GetExpenseResponse {
  success: boolean;
  expense: Expense[];
}

export interface updateExpense {
  amount?: number;
  category?: string;
}

export interface updateExpenseResponse {
  success: boolean;
  expense: Expense;
}
