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

  pricePerDay: z
    .number()
    .positive("Price per day must be greater than 0"),

  stock: z
    .number()
    .int("Stock must be an integer")
    .min(1, "Stock must be at least 1"),

  images: z
    .array(z.string().url("Each image must be a valid URL"))
    .min(1, "At least one image is required")
    .max(5, "Maximum 5 images are allowed"),
});

const updateGearValidationSchema = z.object({
  categoryId: z
    .string()
    .uuid("Invalid category id")
    .optional(),

  name: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .optional(),

  brand: z
    .string()
    .trim()
    .min(2)
    .max(50)
    .optional(),

  description: z
    .string()
    .trim()
    .min(10)
    .max(1000)
    .optional(),

  pricePerDay: z
    .number()
    .positive()
    .optional(),

  stock: z
    .number()
    .int()
    .min(1)
    .optional(),

  images: z
    .array(z.string().url())
    .min(1)
    .max(5)
    .optional(),

  isAvailable: z
    .boolean()
    .optional(),
});

export const GearValidation = {
  createGearValidationSchema,
  updateGearValidationSchema,
};