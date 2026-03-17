import { z } from "zod";

export const createFinancialProfileSchema = z.object({
  cashAvailable: z.coerce.number().positive("Cash must be greater than 0"),
});

export const updateFinancialProfileSchema = z.object({
  cashAvailable: z.coerce.number().positive("Cash must be greater than 0"),
});
