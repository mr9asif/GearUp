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





// accept order 
const acceptRental = async (
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
      "Only placed orders can be accepted"
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

// reject
const rejectRental = async (
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
      "Only placed orders can be rejected"
    );
  }

  const updatedOrder = await prisma.rentalOrder.update({
    where: {
      id: orderId,
    },
    data: {
      status: RentalStatus.CANCELLED,
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

// start rental || customer paid 

const startRental = async (
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

  if (order.status !== RentalStatus.PAID) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only paid rentals can be started"
    );
  }

  const updatedOrder = await prisma.rentalOrder.update({
    where: {
      id: orderId,
    },
    data: {
      status: RentalStatus.PICKED_UP,
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

// complete rental
const completeRental = async (
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

  if (order.status !== RentalStatus.PICKED_UP) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only picked up rentals can be completed"
    );
  }

  const updatedOrder = await prisma.rentalOrder.update({
    where: {
      id: orderId,
    },
    data: {
      status: RentalStatus.RETURNED,
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


// get incomming order service
const getIncomingOrders = async (providerId: string) => {
  const orders = await prisma.rentalOrder.findMany({
    where: {
      gear: {
        providerId,
      },

      status: {
        in: [
          RentalStatus.PLACED,
          RentalStatus.CONFIRMED,
          RentalStatus.PAID,
        ],
      },
    },

    orderBy: {
      createdAt: "desc",
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

  return orders;
};

export const ProviderRentalService = {
  getProviderOrders,
  getProviderOrderById,
getIncomingOrders,
 acceptRental,
 rejectRental,
 startRental,
 completeRental

};