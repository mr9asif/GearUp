
import { z } from "zod";
import { UserStatus } from "../../generated/prisma";

const updateUserStatusValidationSchema = z.object({
  status: z.enum([UserStatus.ACTIVE, UserStatus.SUSPENDED]),
});

export const AdminValidation = {
  updateUserStatusValidationSchema,
};