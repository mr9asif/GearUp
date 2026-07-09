import httpStatus from "http-status";
import { prisma } from "../../config/prisma";
import AppError from "../../error/Apperror";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
const updateProfile = async (
  userId: string,
  payload: any,
  file?: Express.Multer.File
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const updateData: any = {
    ...payload,
  };

  if (file) {
    const uploadedImage = await uploadToCloudinary(
      file,
      "gearup/profile"
    );

    updateData.profileImage = uploadedImage.secure_url;
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,

      profileImage: true,
      role: true,
    },
  });

  return updatedUser;
};

export const UserService = {
  updateProfile,
};