"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFinancialProfileSchema = exports.createFinancialProfileSchema = void 0;
const zod_1 = require("zod");
exports.createFinancialProfileSchema = zod_1.z.object({
    cashAvailable: zod_1.z.coerce.number().positive("Cash must be greater than 0"),
});
exports.updateFinancialProfileSchema = zod_1.z.object({
    cashAvailable: zod_1.z.coerce.number().positive("Cash must be greater than 0"),
});
