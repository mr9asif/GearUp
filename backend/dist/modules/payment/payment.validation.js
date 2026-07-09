"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentValidation = void 0;
const zod_1 = require("zod");
const createPaymentSchema = zod_1.z.object({
    orderId: zod_1.z
        .string()
        .min(1, "Order ID is required"),
});
exports.PaymentValidation = {
    createPaymentSchema,
};
