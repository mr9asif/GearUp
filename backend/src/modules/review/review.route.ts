
import express from "express";

import { Role } from "../../generated/prisma";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { ReviewController } from "./review.controller";
import { ReviewValidation } from "./review.validation";

const router = express.Router();

// Customer Routes
router.post(
  "/",
  auth(Role.CUSTOMER),
  validateRequest(ReviewValidation.createReviewSchema),
  ReviewController.createReview
);

router.get(
  "/my",
  auth(Role.CUSTOMER),
  ReviewController.getMyReviews
);

router.patch(
  "/:id",
  auth(Role.CUSTOMER),
  validateRequest(ReviewValidation.updateReviewSchema),
  ReviewController.updateReview
);

router.delete(
  "/:id",
  auth(Role.CUSTOMER),
  ReviewController.deleteReview
);

// Public Route
router.get(
  "/gear/:gearId",
  ReviewController.getGearReviews
);

export const ReviewRoutes = router;