import { prisma } from "../../config/db";
import { Prisma, BillingType, Status } from "@prisma/client";
export const createSubscription = async (
  userId: string,
  name: string,
  currency: string,
  price: number | string,
  billingType: BillingType,
) => {
  return prisma.subscription.create({
    data: {
      userId,
      name,
      currency,
      price: new Prisma.Decimal(price),
      billingType,
      status: Status.ACTIVE,
    },
  });
};

/**
 * Get all subscription
 */

export const getSubscription = async (userId: string) => {
  return prisma.subscription.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

/**
 * updateSubscription
 */
export const updateSubscription = async (
  userId: string,
  subscriptionId: string,
  price?: number | string,
  status?: Status,
) => {
  return prisma.subscription.updateMany({
    where: {
      id: subscriptionId,
      userId,
    },
    data: {
      ...(price !== undefined && { price: new Prisma.Decimal(price) }),
      ...(status !== undefined && { status }),
    },
  });
};
