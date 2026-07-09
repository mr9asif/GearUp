import express from "express";
import { GearController } from "./gear.controller";

const router = express.Router();

router.get("/", GearController.getAllGear);
router.get("/all", GearController.getAllGearFilter);
router.get("/:id", GearController.getSingleGear);

export const GearRoutes = router;