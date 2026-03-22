"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFinancialProfile = exports.getFinancialProfile = exports.createFinancialProfile = void 0;
const db_1 = require("../../config/db");
const createFinancialProfile = async (userId, cashAvailable) => {
    return db_1.prisma.financialProfile.create({
        data: {
            userId,
            cashAvailable,
        },
    });
};
exports.createFinancialProfile = createFinancialProfile;
const getFinancialProfile = async (userId) => {
    return db_1.prisma.financialProfile.findUnique({
        where: { userId },
    });
};
exports.getFinancialProfile = getFinancialProfile;
const updateFinancialProfile = async (userId, cashAvailable) => {
    return db_1.prisma.financialProfile.update({
        where: { userId },
        data: {
            cashAvailable,
        },
    });
};
exports.updateFinancialProfile = updateFinancialProfile;
