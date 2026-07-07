import { prisma } from "../../config/prisma";

export const registerUserService = async (payload: {
  name: string;
  email: string;
  password: string;
  phone:string;
}) => {
  console.log(payload)
  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      phone:payload.phone
    },

  });

  return user;
};


const createCategory = async (payload: {
  name: string;
  description?: string;
}) => {
  const category = await prisma.category.create({
    data: {
      name: payload.name,
      description: payload.description,
    },
  });

  return category;
};

export const CategoryService = {
  createCategory,
};