import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import AppError from "../error/Apperror";
import { verifyToken } from "../utils/jwt";

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "Access token is missing"
        );
      }

      const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

      const decoded = verifyToken(
        token,
        process.env.JWT_ACCESS_SECRET!
      );

      req.user = decoded;

      if (
        requiredRoles.length &&
        !requiredRoles.includes(decoded.role)
      ) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          "Forbidden access"
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;