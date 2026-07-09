"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = require("../../config/prisma");
const Apperror_1 = __importDefault(require("../../error/Apperror"));
const jwt_1 = require("../../utils/jwt");
const prisma_2 = require("../../generated/prisma");
const register = async (payload) => {
    // Check if email already exists
    const existingEmail = await prisma_1.prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (existingEmail) {
        throw new Apperror_1.default(http_status_1.default.BAD_REQUEST, "Email already exists");
    }
    // Check if phone already exists
    const existingPhone = await prisma_1.prisma.user.findUnique({
        where: {
            phone: payload.phone,
        },
    });
    if (existingPhone) {
        throw new Apperror_1.default(http_status_1.default.BAD_REQUEST, "Phone number already exists");
    }
    // Hash password
    const hashedPassword = await bcrypt_1.default.hash(payload.password, Number(process.env.BCRYPT_SALT_ROUNDS));
    // Create user
    const user = await prisma_1.prisma.user.create({
        data: {
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            password: hashedPassword,
            profileImage: payload.profileImage,
            role: payload.role
        },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            status: true,
            profileImage: true,
            createdAt: true,
        },
    });
    return user;
};
const login = async (payload) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (!user) {
        throw new Apperror_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (user.status === prisma_2.UserStatus.SUSPENDED) {
        throw new Apperror_1.default(http_status_1.default.FORBIDDEN, "Your account has been suspended");
    }
    const isPasswordMatched = await bcrypt_1.default.compare(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new Apperror_1.default(http_status_1.default.UNAUTHORIZED, "Invalid email or password");
    }
    const jwtPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, jwt_1.createToken)(jwtPayload, process.env.JWT_ACCESS_SECRET, process.env.JWT_ACCESS_EXPIRES_IN);
    const refreshToken = (0, jwt_1.createToken)(jwtPayload, process.env.JWT_REFRESH_SECRET, process.env.JWT_REFRESH_EXPIRES_IN);
    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            status: user.status,
            profileImage: user.profileImage,
        },
    };
};
const refreshToken = async (token) => {
    if (!token) {
        throw new Apperror_1.default(http_status_1.default.UNAUTHORIZED, "Refresh token is required");
    }
    const decoded = (0, jwt_1.verifyToken)(token, process.env.JWT_REFRESH_SECRET);
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            id: decoded.id,
        },
    });
    if (!user) {
        throw new Apperror_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (user.status === prisma_2.UserStatus.SUSPENDED) {
        throw new Apperror_1.default(http_status_1.default.FORBIDDEN, "Your account has been suspended");
    }
    const jwtPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, jwt_1.createToken)(jwtPayload, process.env.JWT_ACCESS_SECRET, process.env.JWT_ACCESS_EXPIRES_IN);
    return {
        accessToken,
    };
};
const getMe = async (userId) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            status: true,
            profileImage: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    if (!user) {
        throw new Apperror_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    return user;
};
exports.AuthService = {
    register,
    login,
    refreshToken,
    getMe
};
