"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRunway = void 0;
const calculateRunway = (financialProfile, burn) => {
    if (!financialProfile || burn <= 0) {
        return null;
    }
    const cash = Number(financialProfile.cashAvailable);
    return cash / burn;
};
exports.calculateRunway = calculateRunway;
