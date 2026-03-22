"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.financeEngine = void 0;
const db_1 = require("../../config/db");
const burn_calculator_1 = require("./burn.calculator");
const mrr_calculator_1 = require("./mrr.calculator");
const profit_calculator_1 = require("./profit.calculator");
const runway_calculator_1 = require("./runway.calculator");
const financeEngine = async (userId) => {
    const [subscription, expense, financialProfile] = await Promise.all([
        db_1.prisma.subscription.findMany({
            where: { userId },
        }),
        db_1.prisma.expense.findMany({
            where: { userId },
        }),
        db_1.prisma.financialProfile.findUnique({
            where: { userId },
        }),
    ]);
    const mrr = (0, mrr_calculator_1.calculateMrr)(subscription);
    const burn = (0, burn_calculator_1.calculateBurn)(expense);
    const runway = (0, runway_calculator_1.calculateRunway)(financialProfile, burn);
    const profitOrloss = (0, profit_calculator_1.calculateProfitOrLoss)(mrr, burn);
    const arr = mrr * 12;
    return {
        mrr,
        burn,
        runway,
        profitOrloss,
        arr,
        subscription,
        expense,
        financialProfile,
    };
};
exports.financeEngine = financeEngine;
