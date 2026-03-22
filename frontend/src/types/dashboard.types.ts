import { Expense } from "./expense.types";
import { FinanceProfile } from "./financial.profile.types";
import { Subscription } from "./subs.types";

export interface DashboardMetrics {
  mrr: string;
  burn: string;
  runway: string;
  profitOrloss: string;
  arr: string;
}

export interface DashboardData {
  subscription: Subscription[];
  expense: Expense[];
  finance: FinanceProfile;
}

export interface DashboardResponse {
  metrics: DashboardMetrics;
  data: DashboardData;
}
