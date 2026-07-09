
import { Router } from "express";
import { Role } from "../../generated/prisma";
import auth from "../../middleware/auth";
import { upload } from "../../middleware/multer";
import { UserController } from "./user.controller";

const router =Router();
router.patch(
  "/updateProfile",
  auth(Role.CUSTOMER, Role.PROVIDER, Role.ADMIN),
  upload.single("profileImage"),
  UserController.updateProfile
);


export const ProfileRoute = router;