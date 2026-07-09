import { z } from "zod";

const createGearValidationSchema = z.object({
  categoryId: z
    .string()
    .uuid("Invalid category id"),

  name: z
    .string()
    .trim()
    .min(2, "Gear name must be at least 2 characters")
    .max(100, "Gear name cannot exceed 100 characters"),

  brand: z
    .string()
    .trim()
    .min(2, "Brand name must be at least 2 characters")
    .max(50, "Brand name cannot exceed 50 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description cannot exceed 1000 characters"),

  pricePerDay: z.coerce
    .number()
    .positive("Price per day must be greater than 0"),

  stock: z.coerce
    .number()
    .int("Stock must be an integer")
    .min(1, "Stock must be at least 1"),
});

const updateGearValidationSchema = z.object({
  categoryId: z
    .string()
    .uuid("Invalid category id")
    .optional(),

  name: z
    .string()
    .trim()
    .min(2, "Gear name must be at least 2 characters")
    .max(100, "Gear name cannot exceed 100 characters")
    .optional(),

  brand: z
    .string()
    .trim()
    .min(2, "Brand name must be at least 2 characters")
    .max(50, "Brand name cannot exceed 50 characters")
    .optional(),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description cannot exceed 1000 characters")
    .optional(),

  pricePerDay: z.coerce
    .number()
    .positive("Price per day must be greater than 0")
    .optional(),

  stock: z.coerce
    .number()
    .int("Stock must be an integer")
    .min(1, "Stock must be at least 1")
    .optional(),

  isAvailable: z.coerce
    .boolean()
    .optional(),
});

export const GearValidation = {
  createGearValidationSchema,
  updateGearValidationSchema,
};