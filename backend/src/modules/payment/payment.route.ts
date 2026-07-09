import express from "express";

import { Role } from "../../generated/prisma";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { PaymentController } from "./payment.controller";
import { PaymentValidation } from "./payment.validation";

const router = express.Router();
const confirmPayment = async (req: Request, res: Response) => {
  console.log("🔥 Webhook controller reached");

  
};
/**
 * Customer
 */

// Create Stripe Checkout Session / Payment Intent
router.post(
  "/create",
  auth(Role.CUSTOMER),
  validateRequest(PaymentValidation.createPaymentSchema),
  PaymentController.createPayment
);

// Confirm Payment (Webhook / Callback)
router.post(
  "/confirm",
  PaymentController.confirmPayment
);

router.get("/success", (req, res) => {
  res.send("Payment successful!");
});

router.get("/cancel", (req, res) => {
  res.send("Payment cancelled!");
});

// Get Logged-in User Payment History
router.get(
  "/",
  auth(Role.CUSTOMER),
  PaymentController.getMyPayments
);

// Get Single Payment Details
router.get(
  "/:id",
  auth(Role.CUSTOMER),
  PaymentController.getPaymentById
);

export const PaymentRoutes = router;