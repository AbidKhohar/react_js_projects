import { z } from "zod";

export const insuranceSchema = z.object({
  id: z.number().optional(),
  insuranceName: z
    .string()
    .min(2, "Insurance Name must be at least 2 characters")
    .max(100, "Insurance Name must not exceed 100 characters"),
  insuranceType: z
    .string()
    .min(2, "Insurance Type must be at least 2 characters")
    .max(100, "Insurance Type must not exceed 100 characters"),
  amount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .min(0.01, "Amount must be greater than 0")
    .max(9999999, "Amount is too high"),
});
