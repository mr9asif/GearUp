"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GearValidation = void 0;
const zod_1 = require("zod");
const createGearValidationSchema = zod_1.z.object({
    categoryId: zod_1.z
        .string()
        .uuid("Invalid category id"),
    name: zod_1.z
        .string()
        .trim()
        .min(2, "Gear name must be at least 2 characters")
        .max(100, "Gear name cannot exceed 100 characters"),
    brand: zod_1.z
        .string()
        .trim()
        .min(2, "Brand name must be at least 2 characters")
        .max(50, "Brand name cannot exceed 50 characters"),
    description: zod_1.z
        .string()
        .trim()
        .min(10, "Description must be at least 10 characters")
        .max(1000, "Description cannot exceed 1000 characters"),
    pricePerDay: zod_1.z.coerce
        .number()
        .positive("Price per day must be greater than 0"),
    stock: zod_1.z.coerce
        .number()
        .int("Stock must be an integer")
        .min(1, "Stock must be at least 1"),
});
const updateGearValidationSchema = zod_1.z.object({
    categoryId: zod_1.z
        .string()
        .uuid("Invalid category id")
        .optional(),
    name: zod_1.z
        .string()
        .trim()
        .min(2, "Gear name must be at least 2 characters")
        .max(100, "Gear name cannot exceed 100 characters")
        .optional(),
    brand: zod_1.z
        .string()
        .trim()
        .min(2, "Brand name must be at least 2 characters")
        .max(50, "Brand name cannot exceed 50 characters")
        .optional(),
    description: zod_1.z
        .string()
        .trim()
        .min(10, "Description must be at least 10 characters")
        .max(1000, "Description cannot exceed 1000 characters")
        .optional(),
    pricePerDay: zod_1.z.coerce
        .number()
        .positive("Price per day must be greater than 0")
        .optional(),
    stock: zod_1.z.coerce
        .number()
        .int("Stock must be an integer")
        .min(1, "Stock must be at least 1")
        .optional(),
    isAvailable: zod_1.z.coerce
        .boolean()
        .optional(),
});
exports.GearValidation = {
    createGearValidationSchema,
    updateGearValidationSchema,
};
