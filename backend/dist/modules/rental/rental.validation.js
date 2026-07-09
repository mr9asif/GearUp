"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalValidation = void 0;
const zod_1 = require("zod");
const createRentalSchema = zod_1.z.object({
    gearId: zod_1.z.string().min(1, "Gear ID is required"),
    quantity: zod_1.z.coerce
        .number()
        .int()
        .positive("Quantity must be greater than 0"),
    startDate: zod_1.z.coerce.date(),
    endDate: zod_1.z.coerce.date(),
});
exports.RentalValidation = {
    createRentalSchema,
};
