"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidation = void 0;
const zod_1 = require("zod");
const createCategoryValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        error: "Category name is required",
    })
        .trim()
        .min(2, "Category name must be at least 2 characters")
        .max(50, "Category name cannot exceed 50 characters"),
    description: zod_1.z
        .string()
        .trim()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
});
const updateCategoryValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        error: "Category name is required",
    })
        .trim()
        .min(2, "Category name must be at least 2 characters")
        .max(50, "Category name cannot exceed 50 characters")
        .optional(),
    description: zod_1.z
        .string()
        .trim()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
});
exports.CategoryValidation = {
    createCategoryValidationSchema,
    updateCategoryValidationSchema,
};
