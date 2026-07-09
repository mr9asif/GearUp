import { z } from "zod";

const createReviewSchema = z.object({
  rentalId: z.string().uuid("Invalid rental ID"),

  rating: z
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),

  comment: z
    .string()
    .trim()
    .min(1, "Comment cannot be empty"),
});
const updateReviewSchema = z
  .object({
    rating: z
      .number()
      .int()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot exceed 5")
      .optional(),

    comment: z
      .string()
      .trim()
      .min(1, "Comment cannot be empty")
      .optional(),
  })
  .refine(
    (data) => data.rating !== undefined || data.comment !== undefined,
    {
      message: "At least one field is required to update",
    }
  );

export const ReviewValidation = {
  createReviewSchema,
  updateReviewSchema,
};