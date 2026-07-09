"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalRoutes = void 0;
const express_1 = __importDefault(require("express"));
const customer_rental_route_1 = require("./customer/customer.rental.route");
const provider_rental_route_1 = require("./provider/provider.rental.route");
const router = express_1.default.Router();
router.use("/customer", customer_rental_route_1.CustomerRentalRoutes);
router.use("/provider", provider_rental_route_1.ProviderRentalRoutes);
exports.RentalRoutes = router;
