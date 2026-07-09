"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardRoutes = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middleware/auth"));
const dashboard_controller_1 = require("./dashboard.controller");
const router = express_1.default.Router();
// Provider Dashboard
router.get("/provider", (0, auth_1.default)(client_1.Role.PROVIDER), dashboard_controller_1.DashboardController.getProviderDashboard);
// Customer Dashboard (We'll implement next)
router.get("/customer", (0, auth_1.default)(client_1.Role.CUSTOMER), dashboard_controller_1.DashboardController.getCustomerDashboard);
exports.DashboardRoutes = router;
