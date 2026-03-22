"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardMetrics = void 0;
const finance_engine_1 = require("../financeEngine/finance.engine");
const getDashboardMetrics = async (userId) => {
    const finance = await (0, finance_engine_1.financeEngine)(userId);
    return {
        revenue: {
            mrr: finance.mrr,
            arr: finance.arr,
        },
        finance: {
            burn: finance.burn,
            runway: finance.runway,
            profitOrloss: finance.profitOrloss,
        },
        cash: finance.financialProfile
            ? Number(finance.financialProfile.cashAvailable)
            : 0,
    };
};
exports.getDashboardMetrics = getDashboardMetrics;
