import { email, z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email format").toLowerCase(),

  password: z.string().min(8, "password must be at least 8 characters"),
});
