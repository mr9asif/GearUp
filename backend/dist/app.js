"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const prisma_1 = require("./config/prisma");
const globlalErrorHandler_1 = __importDefault(require("./error/globlalErrorHandler"));
const admin_route_1 = require("./modules/admin/admin.route");
const auth_route_1 = require("./modules/auth/auth.route");
const category_route_1 = require("./modules/category/category.route");
const dashboard_route_1 = require("./modules/dashboard/dashboard.route");
const gear_route_1 = require("./modules/gear/gear.route");
const providerGear_route_1 = require("./modules/gear/providerGear.route");
const payment_route_1 = require("./modules/payment/payment.route");
const rental_route_1 = require("./modules/rental/rental.route");
const review_route_1 = require("./modules/review/review.route");
const user_route_1 = require("./modules/user/user.route");
const app = (0, express_1.default)();
// middleware
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use("/api/payments/confirm", express_1.default.raw({ type: "application/json" }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/", (_, res) => {
    res.json({
        success: true,
        message: "GearUp API is running 🚀",
    });
});
app.use('/api/auth', auth_route_1.AuthRoutes);
app.use('/api/admin', admin_route_1.AdminRoutes);
app.use("/api/categories", category_route_1.CategoryRoutes);
app.use("/api/gear", gear_route_1.GearRoutes);
app.use("/api/provider/gear", providerGear_route_1.ProviderGearRoutes);
app.use("/api/payments", payment_route_1.PaymentRoutes);
app.use("/api/rentals", rental_route_1.RentalRoutes);
app.use("/api/reviews", review_route_1.ReviewRoutes);
app.use("/api/dashboard", dashboard_route_1.DashboardRoutes);
app.use("/api/profile", user_route_1.ProfileRoute);
app.use(globlalErrorHandler_1.default);
const startServer = async () => {
    try {
        await prisma_1.prisma.$connect();
        console.log(process.env.DATABASE_URL);
        console.log("✅ PostgreSQL Connected");
    }
    catch (error) {
        console.error("❌ Database Connection Failed");
        console.error(error);
        process.exit(1);
    }
};
exports.startServer = startServer;
exports.default = app;
