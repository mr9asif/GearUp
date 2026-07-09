import express from "express";
import auth from "../../../middleware/auth";
import validateRequest from "../../../middleware/validateRequest";
import { RentalValidation } from "../rental.validation";

import { Role } from "../../../generated/prisma";
import { CustomerRentalController } from "./customer.rental.controller";

const router = express.Router();

// Customer places a rental order
router.post(
  "/",
  auth(Role.CUSTOMER),
  validateRequest(RentalValidation.createRentalSchema),
  CustomerRentalController.createRental
);

// Customer's rental history
router.get(
  "/my-orders",
  auth(Role.CUSTOMER),
  CustomerRentalController.getMyOrders
);

// Single rental details
router.get(
  "/my-orders/:id",
  auth(Role.CUSTOMER),
  CustomerRentalController.getMyOrderById
);

// Cancel rental
router.patch(
  "/:id/cancel",
  auth(Role.CUSTOMER),
  CustomerRentalController.cancelRental
);

// status trace
router.get(
  "/:id/rental-status",
  auth(Role.CUSTOMER),
  CustomerRentalController.getRentalStatus
);

// payment status 
router.get(
  "/:id/payment-status",
  auth(Role.CUSTOMER),
  CustomerRentalController.getPaymentStatus
);


export const CustomerRentalRoutes = router;