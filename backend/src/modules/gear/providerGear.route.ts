import express from "express";
import { Role } from "../../generated/prisma";

import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";

import { upload } from "../../middleware/multer";
import { GearController } from "./gear.controller";
import { GearValidation } from "./gear.validation";

const router = express.Router();

router.post(
  "/",
  auth(Role.PROVIDER),
    upload.array("images", 5),
  validateRequest(GearValidation.createGearValidationSchema),
  GearController.createGear
);

router.get("/", auth(Role.PROVIDER), GearController.getMyGear);

router.get("/:id", auth(Role.PROVIDER), GearController.getMySingleGear);

router.patch(
  "/:id",
  auth(Role.PROVIDER),
  validateRequest(GearValidation.updateGearValidationSchema),
  GearController.updateGear
);

router.delete("/:id", auth(Role.PROVIDER), GearController.deleteGear);

export const ProviderGearRoutes = router;