import httpStatus from "http-status";
import { prisma } from "../../../config/prisma";
import AppError from "../../../error/Apperror";
import { RentalStatus } from "../../../generated/prisma";
import { CreateRentalPayload } from "../rental.interface";


const createRental = async (
  customerId: string,
  payload: CreateRentalPayload
) => {
  const { gearId, quantity, startDate, endDate } = payload;

  // Find gear
  const gear = await prisma.gearItem.findUnique({
    where: {
      id: gearId,
    },
  });

  if (!gear) {
    throw new AppError(httpStatus.NOT_FOUND, "Gear not found");
  }

  // Provider can't rent own gear
  if (gear.providerId === customerId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You cannot rent your own gear"
    );
  }

  // Check availability
  if (!gear.isAvailable) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Gear is not available"
    );
  }

  // Stock check
  if (quantity > gear.stock) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Only ${gear.stock} item(s) available`
    );
  }

  // Date validation
  if (startDate >= endDate) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "End date must be after start date"
    );
  }

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  if (startDate < today) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Start date cannot be in the past"
    );
  }

  // Calculate rental days
  const diffTime = endDate.getTime() - startDate.getTime();

  const totalDays = Math.ceil(
    diffTime / (1000 * 60 * 60 * 24)
  );

  // Calculate amount
  const totalAmount = Number(gear.pricePerDay) * quantity * totalDays;

  // Create rental
  const rental = await prisma.rentalOrder.create({
    data: {
      customerId,
      gearId,
      quantity,
      startDate,
      endDate,
      totalAmount,
    },
    include: {
      gear: true,
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return rental;
};

// getMyorder
const getMyOrders = async (customerId: string) => {
  const rentals = await prisma.rentalOrder.findMany({
    where: {
      customerId,
    },
    include: {
      gear: {
        include: {
          category: true,
          provider: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              profileImage: true,
            },
          },
        },
      },
      payment: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return rentals;
};

// getOrderById


const getMyOrderById = async (
  customerId: string,
  orderId: string
) => {
  const rental = await prisma.rentalOrder.findFirst({
    where: {
      id: orderId,
      customerId,
    },
    include: {
      gear: {
        include: {
          category: true,
          provider: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              profileImage: true,
            },
          },
        },
      },
      payment: true,
    },
  });

  if (!rental) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Rental order not found"
    );
  }

  return rental;
};


// censel Order


const cancelRental = async (
  customerId: string,
  orderId: string
) => {
  const rental = await prisma.rentalOrder.findFirst({
    where: {
      id: orderId,
      customerId,
    },
  });

  if (!rental) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Rental order not found"
    );
  }

  if (rental.status !== RentalStatus.PLACED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only placed orders can be cancelled"
    );
  }

  const updatedRental = await prisma.rentalOrder.update({
    where: {
      id: orderId,
    },
    data: {
      status: RentalStatus.CANCELLED,
    },
    include: {
      gear: true,
      payment: true,
    },
  });

  return updatedRental;
};

// track status
const getRentalStatus = async (
  customerId: string,
  rentalId: string
) => {
  const rental = await prisma.rentalOrder.findFirst({
    where: {
      id: rentalId,
      customerId,
    },
    include: {
      gear: {
        select: {
          id: true,
          name: true,
          images: true,
        },
      },
      payment: {
        select: {
          id: true,
          status: true,
          amount: true,
          provider: true,
          paidAt: true,
        },
      },
    },
  });

  if (!rental) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Rental not found"
    );
  }

  return {
    rentalId: rental.id,
    rentalStatus: rental.status,
    paymentStatus: rental.payment?.status ?? "PENDING",
    gear: rental.gear,
    payment: rental.payment,
  };
};


// payment status
const getPaymentStatus = async (
  customerId: string,
  rentalId: string
) => {
  const rental = await prisma.rentalOrder.findFirst({
    where: {
      id: rentalId,
      customerId,
    },
    include: {
      payment: {
        select: {
          id: true,
          transactionId: true,
          amount: true,
          provider: true,
          status: true,
          paidAt: true,
          createdAt: true,
        },
      },
    },
  });

  if (!rental) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Rental not found"
    );
  }

  if (!rental.payment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Payment not found"
    );
  }

  return rental.payment;
};

export const CustomerRentalService = {
  createRental,
  getMyOrders,
getMyOrderById,
cancelRental,
getRentalStatus,
  getPaymentStatus,
};