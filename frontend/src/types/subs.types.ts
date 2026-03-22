export type BillingType = "MONTHLY" | "YEARLY";
export interface Subscription {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingType: BillingType;
  status: "ACTIVE" | "CANCELLED";
  userId: string;
  createdAt: string;
  updatedAt: string;
}
