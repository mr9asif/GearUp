"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = require("../../config/prisma");
const Apperror_1 = __importDefault(require("../../error/Apperror"));
const prisma_2 = require("../../generated/prisma");
const getAllUsers = async (query) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = query.search || "";
    const role = query.role;
    const status = query.status;
    const where = {};
    if (search) {
        where.OR = [
            {
                name: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                email: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                phone: {
                    contains: search,
                    mode: "insensitive",
                },
            },
        ];
    }
    if (role) {
        where.role = role;
    }
    if (status) {
        where.status = status;
    }
    const users = await prisma_1.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
            createdAt: "desc",
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
    const total = await prisma_1.prisma.user.count({
        where,
    });
    return {
        meta: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit),
        },
        data: users,
    };
};
const getSingleUser = async (id) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id },
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
const updateUserStatus = async (id, payload) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id },
    });
    if (!user) {
        throw new Apperror_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    if (user.role === prisma_2.Role.ADMIN) {
        throw new Apperror_1.default(http_status_1.default.FORBIDDEN, "Admin account cannot be updated.");
    }
    const updatedUser = await prisma_1.prisma.user.update({
        where: { id },
        data: {
            status: payload.status,
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
    return updatedUser;
};
// get all geaar 
const getAllGear = async () => {
    const gear = await prisma_1.prisma.gearItem.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            category: true,
            provider: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    profileImage: true,
                },
            },
        },
    });
    return gear;
};
// get all rentals
const getAllRentals = async () => {
    const rentals = await prisma_1.prisma.rentalOrder.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            customer: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    profileImage: true,
                },
            },
            gear: {
                include: {
                    category: true,
                    provider: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            },
            payment: true,
        },
    });
    return rentals;
};
exports.AdminService = {
    getAllUsers,
    getSingleUser,
    updateUserStatus,
    getAllGear,
    getAllRentals
};
