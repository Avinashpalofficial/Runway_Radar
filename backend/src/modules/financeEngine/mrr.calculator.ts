import { Subscription } from "@prisma/client";

export const calculateMrr = (subscription: Subscription[]) => {
  return subscription
    .filter((sub) => sub.status === "ACTIVE")
    .reduce((total, sub) => {
      const price = Number(sub.price);
      if (sub.billingType === "YEARLY") {
        return total + price / 12;
      }
      return total + price;
    }, 0);
};
