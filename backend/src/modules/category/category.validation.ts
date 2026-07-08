import { z } from "zod";

const createCategoryValidationSchema = z.object({
  name: z
    .string({
      error: "Category name is required",
    })
    .trim()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name cannot exceed 50 characters"),
});

const updateCategoryValidationSchema = z.object({
  name: z
    .string({
      error: "Category name is required",
    })
    .trim()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name cannot exceed 50 characters")
    .optional(),
});

export const CategoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};