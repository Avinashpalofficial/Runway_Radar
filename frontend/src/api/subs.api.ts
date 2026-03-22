import { api } from "../lib/api";
import { Subscription } from "../types/subs.types";

export const createSubscription = async (data: {
  name: string;
  currency: string;
  price: number;
  billingType: "MONTHLY" | "YEARLY";
}): Promise<Subscription> => {
  const res = await api.post("/subscription", data);
  return res.data.subscription;
};
export const getSubscription = async (): Promise<Subscription[]> => {
  const res = await api.get("/subscription/all-subscription");
  return res.data.allsubs;
};
