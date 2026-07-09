"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const registerValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        error: "Name is required",
    })
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name cannot exceed 50 characters"),
    email: zod_1.z
        .email("Invalid email address"),
    password: zod_1.z
        .string({
        error: "Password is required",
    })
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password cannot exceed 20 characters"),
    phone: zod_1.z
        .string({
        error: "Phone number is required",
    })
        .min(11, "Phone number must be at least 11 digits")
        .max(15, "Phone number is too long"),
    role: zod_1.z.enum(["CUSTOMER", "PROVIDER"]).optional(),
});
const loginValidationSchema = zod_1.z.object({
    email: zod_1.z
        .email("Invalid email address"),
    password: zod_1.z
        .string({
        error: "Password is required",
    })
        .min(6, "Password must be at least 6 characters"),
});
exports.AuthValidation = {
    registerValidationSchema,
    loginValidationSchema,
};
