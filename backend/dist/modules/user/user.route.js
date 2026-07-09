"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRoute = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const multer_1 = require("../../middleware/multer");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.patch("/updateProfile", (0, auth_1.default)(client_1.Role.CUSTOMER, client_1.Role.PROVIDER, client_1.Role.ADMIN), multer_1.upload.single("profileImage"), user_controller_1.UserController.updateProfile);
exports.ProfileRoute = router;
