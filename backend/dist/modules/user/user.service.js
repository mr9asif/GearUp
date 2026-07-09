"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = require("../../config/prisma");
const Apperror_1 = __importDefault(require("../../error/Apperror"));
const uploadToCloudinary_1 = require("../../utils/uploadToCloudinary");
const updateProfile = async (userId, payload, file) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new Apperror_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const updateData = {
        ...payload,
    };
    if (file) {
        const uploadedImage = await (0, uploadToCloudinary_1.uploadToCloudinary)(file, "gearup/profile");
        updateData.profileImage = uploadedImage.secure_url;
    }
    const updatedUser = await prisma_1.prisma.user.update({
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
exports.UserService = {
    updateProfile,
};
