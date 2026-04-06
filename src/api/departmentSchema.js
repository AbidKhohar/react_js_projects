import { z } from "zod";

export const departmentSchema = z.object({
  name: z
    .string()
    .trim() // automatically trims whitespace
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .regex(/^[a-zA-Z0-9\s]+$/, "Name can only contain letters, numbers and spaces"),
  
  description: z
    .string()
    .trim()
    .min(5, "Description must be at least 5 characters")
    .max(200, "Description cannot exceed 200 characters"),
  
  code: z
    .string()
    .trim()
    .min(2, "Code must be at least 2 characters")
    .max(10, "Code cannot exceed 10 characters")
    .regex(/^[A-Z0-9]+$/, "Code must be uppercase letters or numbers"),

  isActive: z
    .boolean()
    .optional() // default can be true in your backend if not provided
});