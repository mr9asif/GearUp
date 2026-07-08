import { z } from "zod";

const createPaymentSchema = z.object({
  body: z.object({
    orderId: z
      .string()
      .min(1, "Order ID is required"),
  }),
});

export const PaymentValidation = {
  createPaymentSchema,
};