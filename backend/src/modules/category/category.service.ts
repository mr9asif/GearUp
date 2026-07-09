import httpStatus from "http-status";
import { prisma } from "../../config/prisma";
import AppError from "../../error/Apperror";

const createCategory = async (payload: { name: string, description?:string }) => {
  const categoryName = payload.name.trim();

  const existingCategory = await prisma.category.findFirst({
    where: {
      name: {
        equals: categoryName,
        mode: "insensitive",
      },
    },
  });

  if (existingCategory) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Category already exists."
    );
  }

  const result = await prisma.category.create({
    data: {
      name: categoryName,
      description:payload.description
    },
  });

  return result;
};

const getAllCategories = async (query: Record<string, any>) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const search = query.search || "";

  const where: any = {};

  if (search) {
    where.name = {
      contains: search,
      mode: "insensitive",
    };
  }

  const categories = await prisma.category.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  const total = await prisma.category.count({
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

const getSingleCategory = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!category) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Category not found."
    );
  }

  return category;
};

const updateCategory = async (
  id: string,
  payload: { name?: string }
) => {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!category) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Category not found."
    );
  }

  if (payload.name) {
    const duplicate = await prisma.category.findFirst({
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
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Category already exists."
      );
    }
  }

  const result = await prisma.category.update({
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

const deleteCategory = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!category) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Category not found."
    );
  }

  const result = await prisma.category.delete({
    where: {
      id,
    },
  });

  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};