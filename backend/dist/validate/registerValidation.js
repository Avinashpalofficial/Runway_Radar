"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(4, "Name must be at least 4 character")
        .max(50, "Name cannot be exceed 50 character")
        .trim(),
    email: zod_1.z.string().email("Invalid email format").toLowerCase().trim(),
    phoneNumber: zod_1.z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number"),
    password: zod_1.z.string().min(8, "password must be at least 8 characters"),
});
