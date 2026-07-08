import httpStatus from "http-status";
import { prisma } from "../../../config/prisma";
import AppError from "../../../error/Apperror";
import { RentalStatus } from "../../../generated/prisma";




const getProviderOrders = async (providerId: string) => {
  const orders = await prisma.rentalOrder.findMany({
    where: {
      gear: {
        providerId,
      },
    },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          profileImage: true,
        },
      },
      gear: {
        include: {
          category: true,
        },
      },
      payment: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};

// getProvider by id


const getProviderOrderById = async (
  providerId: string,
  orderId: string
) => {
  const order = await prisma.rentalOrder.findFirst({
    where: {
      id: orderId,
      gear: {
        providerId,
      },
    },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          profileImage: true,
        },
      },
      gear: {
        include: {
          category: true,
        },
      },
      payment: true,
    },
  });

  if (!order) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Rental order not found"
    );
  }

  return order;
};


// confirm order


const confirmRental = async (
  providerId: string,
  orderId: string
) => {
  const order = await prisma.rentalOrder.findFirst({
    where: {
      id: orderId,
      gear: {
        providerId,
      },
    },
  });

  if (!order) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Rental order not found"
    );
  }

  if (order.status !== RentalStatus.PLACED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only placed orders can be confirmed"
    );
  }

  const updatedOrder = await prisma.rentalOrder.update({
    where: {
      id: orderId,
    },
    data: {
      status: RentalStatus.CONFIRMED,
    },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          profileImage: true,
        },
      },
      gear: {
        include: {
          category: true,
        },
      },
      payment: true,
    },
  });

  return updatedOrder;
};

export const ProviderRentalService = {
  getProviderOrders,
  getProviderOrderById
};