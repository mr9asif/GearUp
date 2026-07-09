"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const createReviewSchema = zod_1.z.object({
    rentalId: zod_1.z.string().uuid("Invalid rental ID"),
    rating: zod_1.z
        .number()
        .int()
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot exceed 5"),
    comment: zod_1.z
        .string()
        .trim()
        .min(1, "Comment cannot be empty"),
});
const updateReviewSchema = zod_1.z
    .object({
    rating: zod_1.z
        .number()
        .int()
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot exceed 5")
        .optional(),
    comment: zod_1.z
        .string()
        .trim()
        .min(1, "Comment cannot be empty")
        .optional(),
})
    .refine((data) => data.rating !== undefined || data.comment !== undefined, {
    message: "At least one field is required to update",
});
exports.ReviewValidation = {
    createReviewSchema,
    updateReviewSchema,
};
