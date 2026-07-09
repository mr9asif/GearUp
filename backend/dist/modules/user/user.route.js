"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRoute = void 0;
const express_1 = require("express");
const prisma_1 = require("../../generated/prisma");
const auth_1 = __importDefault(require("../../middleware/auth"));
const multer_1 = require("../../middleware/multer");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.patch("/updateProfile", (0, auth_1.default)(prisma_1.Role.CUSTOMER, prisma_1.Role.PROVIDER, prisma_1.Role.ADMIN), multer_1.upload.single("profileImage"), user_controller_1.UserController.updateProfile);
exports.ProfileRoute = router;
