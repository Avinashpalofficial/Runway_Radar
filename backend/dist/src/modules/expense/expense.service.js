"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExpense = exports.getExpense = exports.createExpense = void 0;
const db_1 = require("../../config/db");
const client_1 = require("@prisma/client");
const createExpense = async (userId, title, currency, amount, category) => {
    return db_1.prisma.expense.create({
        data: {
            userId,
            title,
            currency,
            amount: new client_1.Prisma.Decimal(amount),
            category,
        },
    });
};
exports.createExpense = createExpense;
/**
 * Get expenses
 */
const getExpense = async (userId) => {
    return db_1.prisma.expense.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });
};
exports.getExpense = getExpense;
/**
 * Update Expenses
 */
const updateExpense = async (userId, expenseId, amount, category) => {
    return db_1.prisma.expense.update({
        where: {
            id: expenseId,
            userId,
        },
        data: {
            ...(amount !== undefined && { amount: new client_1.Prisma.Decimal(amount) }),
            ...(category !== undefined && { category }),
        },
    });
};
exports.updateExpense = updateExpense;
