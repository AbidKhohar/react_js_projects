import { z } from "zod";

export const employeeSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  designation: z
    .string()
    .min(2, "Designation must be at least 2 characters")
    .max(100, "Designation must not exceed 100 characters"),
  salary: z
    .number({ invalid_type_error: "Salary must be a number" })
    .min(0, "Salary must be positive")
    .max(9999999, "Salary is too high"),
});
