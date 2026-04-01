import { z } from "zod";

export const departmentSchema = z.object({
  name: z
    .string()
    .min(1, "Department name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(5, "Description must be at least 5 characters")
    .max(200, "Description cannot exceed 200 characters"),
});
