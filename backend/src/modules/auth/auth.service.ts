import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { prisma } from "../../config/prisma";
import AppError from "../../error/Apperror";
import { createToken, verifyToken } from "../../utils/jwt";
import { IRegisterUser } from "./auth.interface";

import { SignOptions } from "jsonwebtoken";
import { UserStatus } from "../../generated/prisma";



const register = async (payload:IRegisterUser) => {
  // Check if email already exists
  const existingEmail = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (existingEmail) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Email already exists"
    );
  }

  // Check if phone already exists
  const existingPhone = await prisma.user.findUnique({
    where: {
      phone: payload.phone,
    },
  });

  if (existingPhone) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Phone number already exists"
    );
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(process.env.BCRYPT_SALT_ROUNDS)
  );

  // Create user
  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      password: hashedPassword,
      profileImage: payload.profileImage,
      role:payload.role
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


const login = async (payload: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User not found"
    );
  }

  if (user.status === UserStatus.SUSPENDED) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Your account has been suspended"
    );
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Invalid email or password"
    );
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    process.env.JWT_ACCESS_SECRET!,
    process.env.JWT_ACCESS_EXPIRES_IN! as SignOptions["expiresIn"]
  );

  const refreshToken = createToken(
    jwtPayload,
    process.env.JWT_REFRESH_SECRET!,
    process.env.JWT_REFRESH_EXPIRES_IN! as SignOptions["expiresIn"]
  );

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


const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Refresh token is required"
    );
  }

  const decoded = verifyToken(
    token,
    process.env.JWT_REFRESH_SECRET!
  );

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
  });

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User not found"
    );
  }

  if (user.status === UserStatus.SUSPENDED) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Your account has been suspended"
    );
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    process.env.JWT_ACCESS_SECRET!,
    process.env.JWT_ACCESS_EXPIRES_IN! as SignOptions["expiresIn"]
  );

  return {
    accessToken,
  };
};

const getMe = async (userId: string) => {
  const user = await prisma.user.findUnique({
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
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User not found"
    );
  }

  return user;
};


export const AuthService = {
  register,
  login,
  refreshToken,
  getMe
}