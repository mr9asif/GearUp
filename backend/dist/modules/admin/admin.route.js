"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const prisma_1 = require("../../generated/prisma");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const admin_controller_1 = require("./admin.controller");
const admin_validation_1 = require("./admin.validation");
const router = express_1.default.Router();
// Get all users
router.get("/users", (0, auth_1.default)(prisma_1.Role.ADMIN), admin_controller_1.AdminController.getAllUsers);
// Get single user
router.get("/users/:id", (0, auth_1.default)(prisma_1.Role.ADMIN), admin_controller_1.AdminController.getSingleUser);
// Update user status
router.patch("/users/:id/status", (0, auth_1.default)(prisma_1.Role.ADMIN), (0, validateRequest_1.default)(admin_validation_1.AdminValidation.updateUserStatusValidationSchema), admin_controller_1.AdminController.updateUserStatus);
// admin.route.ts
router.get("/gear", (0, auth_1.default)(prisma_1.Role.ADMIN), admin_controller_1.AdminController.getAllGear);
router.get("/rentals", (0, auth_1.default)(prisma_1.Role.ADMIN), admin_controller_1.AdminController.getAllRentals);
exports.AdminRoutes = router;
