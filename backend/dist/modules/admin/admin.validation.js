"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../../generated/prisma");
const updateUserStatusValidationSchema = zod_1.z.object({
    status: zod_1.z.enum([prisma_1.UserStatus.ACTIVE, prisma_1.UserStatus.SUSPENDED]),
});
exports.AdminValidation = {
    updateUserStatusValidationSchema,
};
