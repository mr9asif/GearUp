
import { prisma } from "../../config/prisma";
import { PaymentStatus, RentalStatus } from "../../generated/prisma";

const getProviderDashboard = async (providerId: string) => {
  const [
    gearStats,
    rentalStats,
    paymentStats,
    reviewStats,
  ] = await Promise.all([
    prisma.gearItem.aggregate({
      where: {
        providerId,
      },
      _count: {
        id: true,
      },
    }),

    prisma.rentalOrder.findMany({
      where: {
        gear: {
          providerId,
        },
      },
      select: {
        status: true,
      },
    }),

    prisma.payment.aggregate({
      where: {
        status: PaymentStatus.COMPLETED,
        order: {
          gear: {
            providerId,
          },
        },
      },
      _sum: {
        amount: true,
      },
    }),

    prisma.review.aggregate({
      where: {
        gear: {
          providerId,
        },
      },
      _count: {
        id: true,
      },
      _avg: {
        rating: true,
      },
    }),
  ]);

  const availableGears = await prisma.gearItem.count({
    where: {
      providerId,
      isAvailable: true,
    },
  });

  const activeRentals = rentalStats.filter(
    (rental) => rental.status === RentalStatus.PICKED_UP
  ).length;

  const completedRentals = rentalStats.filter(
    (rental) => rental.status === RentalStatus.RETURNED
  ).length;

  return {
    totalGears: gearStats._count.id,
    availableGears,
    activeRentals,
    completedRentals,
    totalRevenue: paymentStats._sum.amount ?? 0,
    totalReviews: reviewStats._count.id,
    averageRating: reviewStats._avg.rating ?? 0,
  };
};



const getCustomerDashboard = async (customerId: string) => {
  const [
    activeRentals,
    completedRentals,
    paymentStats,
    totalReviews,
  ] = await Promise.all([
    prisma.rentalOrder.count({
      where: {
        customerId,
        status: RentalStatus.PICKED_UP,
      },
    }),

    prisma.rentalOrder.count({
      where: {
        customerId,
        status: RentalStatus.RETURNED,
      },
    }),

    prisma.payment.aggregate({
      where: {
        status: PaymentStatus.COMPLETED,
        order: {
          customerId,
        },
      },
      _sum: {
        amount: true,
      },
    }),

    prisma.review.count({
      where: {
        customerId,
      },
    }),
  ]);

  return {
    activeRentals,
    completedRentals,
    totalSpent: paymentStats._sum.amount ?? 0,
    totalReviews,
  };
};



export const DashboardService={
    getProviderDashboard,
    getCustomerDashboard
}