import { z } from "zod";

const createRentalSchema = z.object({
  body: z.object({
    gearId: z
      .string()
      .min(1, "Gear ID is required"),

    quantity: z.coerce
      .number()
      .int()
      .positive("Quantity must be greater than 0"),

    startDate: z.coerce.date(),

    endDate: z.coerce.date(),
  }),
});

export const RentalValidation = {
  createRentalSchema,
};