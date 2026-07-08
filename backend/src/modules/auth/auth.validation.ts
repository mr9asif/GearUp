import { z } from "zod";

const registerValidationSchema = z.object({
  name: z
    .string({
      error: "Name is required",
    })
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),

  email: z
    .email("Invalid email address"),

  password: z
    .string({
      error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters"),

  phone: z
    .string({
      error: "Phone number is required",
    })
    .min(11, "Phone number must be at least 11 digits")
    .max(15, "Phone number is too long"),

    role: z.enum(["CUSTOMER", "PROVIDER"]).optional(),
});

const loginValidationSchema = z.object({
  email: z
    .email("Invalid email address"),

  password: z
    .string({
      error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters"),
});

export const AuthValidation = {
  registerValidationSchema,
  loginValidationSchema,
};