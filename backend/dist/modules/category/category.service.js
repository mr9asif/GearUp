"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = require("../../config/prisma");
const Apperror_1 = __importDefault(require("../../error/Apperror"));
const createCategory = async (payload) => {
    const categoryName = payload.name.trim();
    const existingCategory = await prisma_1.prisma.category.findFirst({
        where: {
            name: {
                equals: categoryName,
                mode: "insensitive",
            },
        },
    });
    if (existingCategory) {
        throw new Apperror_1.default(http_status_1.default.BAD_REQUEST, "Category already exists.");
    }
    const result = await prisma_1.prisma.category.create({
        data: {
            name: categoryName,
            description: payload.description
        },
    });
    return result;
};
const getAllCategories = async (query) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = query.search || "";
    const where = {};
    if (search) {
        where.name = {
            contains: search,
            mode: "insensitive",
        };
    }
    const categories = await prisma_1.prisma.category.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
            createdAt: "desc",
        },
    });
    const total = await prisma_1.prisma.category.count({
        where,
    });
    return {
        meta: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit),
        },
        data: categories,
    };
};
const getSingleCategory = async (id) => {
    const category = await prisma_1.prisma.category.findUnique({
        where: {
            id,
        },
    });
    if (!category) {
        throw new Apperror_1.default(http_status_1.default.NOT_FOUND, "Category not found.");
    }
    return category;
};
const updateCategory = async (id, payload) => {
    const category = await prisma_1.prisma.category.findUnique({
        where: {
            id,
        },
    });
    if (!category) {
        throw new Apperror_1.default(http_status_1.default.NOT_FOUND, "Category not found.");
    }
    if (payload.name) {
        const duplicate = await prisma_1.prisma.category.findFirst({
            where: {
                name: {
                    equals: payload.name.trim(),
                    mode: "insensitive",
                },
                NOT: {
                    id,
                },
            },
        });
        if (duplicate) {
            throw new Apperror_1.default(http_status_1.default.BAD_REQUEST, "Category already exists.");
        }
    }
    const result = await prisma_1.prisma.category.update({
        where: {
            id,
        },
        data: {
            ...payload,
            name: payload.name?.trim(),
        },
    });
    return result;
};
const deleteCategory = async (id) => {
    const category = await prisma_1.prisma.category.findUnique({
        where: {
            id,
        },
    });
    if (!category) {
        throw new Apperror_1.default(http_status_1.default.NOT_FOUND, "Category not found.");
    }
    const result = await prisma_1.prisma.category.delete({
        where: {
            id,
        },
    });
    return result;
};
exports.CategoryService = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory,
};
