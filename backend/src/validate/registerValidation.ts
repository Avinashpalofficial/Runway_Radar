import { email, z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(4, "Name must be at least 4 character")
    .max(50, "Name cannot be exceed 50 character")
    .trim(),

  email: z.string().email("Invalid email format").toLowerCase().trim(),

  phoneNumber: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number"),

  password: z.string().min(8, "password must be at least 8 characters"),
});
