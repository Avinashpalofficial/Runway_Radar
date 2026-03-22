"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBurn = void 0;
const calculateBurn = (expense) => {
    return expense.reduce((total, exp) => {
        const price = Number(exp.amount);
        return total + price;
    }, 0);
};
exports.calculateBurn = calculateBurn;
