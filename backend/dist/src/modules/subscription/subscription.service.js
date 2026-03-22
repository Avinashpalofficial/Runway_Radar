"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubscription = exports.getSubscription = exports.createSubscription = void 0;
const db_1 = require("../../config/db");
const client_1 = require("@prisma/client");
const createSubscription = async (userId, name, currency, price, billingType) => {
    return db_1.prisma.subscription.create({
        data: {
            userId,
            name,
            currency,
            price: new client_1.Prisma.Decimal(price),
            billingType,
            status: client_1.Status.ACTIVE,
        },
    });
};
exports.createSubscription = createSubscription;
/**
 * Get all subscription
 */
const getSubscription = async (userId) => {
    return db_1.prisma.subscription.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });
};
exports.getSubscription = getSubscription;
/**
 * updateSubscription
 */
const updateSubscription = async (userId, subscriptionId, price, status) => {
    return db_1.prisma.subscription.updateMany({
        where: {
            id: subscriptionId,
            userId,
        },
        data: {
            ...(price !== undefined && { price: new client_1.Prisma.Decimal(price) }),
            ...(status !== undefined && { status }),
        },
    });
};
exports.updateSubscription = updateSubscription;
