"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMrr = void 0;
const calculateMrr = (subscription) => {
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
exports.calculateMrr = calculateMrr;
