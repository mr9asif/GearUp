"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const prisma_1 = require("../../config/prisma");
const prisma_2 = require("../../generated/prisma");
const getProviderDashboard = async (providerId) => {
    const [gearStats, rentalStats, paymentStats, reviewStats,] = await Promise.all([
        prisma_1.prisma.gearItem.aggregate({
            where: {
                providerId,
            },
            _count: {
                id: true,
            },
        }),
        prisma_1.prisma.rentalOrder.findMany({
            where: {
                gear: {
                    providerId,
                },
            },
            select: {
                status: true,
            },
        }),
        prisma_1.prisma.payment.aggregate({
            where: {
                status: prisma_2.PaymentStatus.COMPLETED,
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
        prisma_1.prisma.review.aggregate({
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
    const availableGears = await prisma_1.prisma.gearItem.count({
        where: {
            providerId,
            isAvailable: true,
        },
    });
    const activeRentals = rentalStats.filter((rental) => rental.status === prisma_2.RentalStatus.PICKED_UP).length;
    const completedRentals = rentalStats.filter((rental) => rental.status === prisma_2.RentalStatus.RETURNED).length;
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
const getCustomerDashboard = async (customerId) => {
    const [activeRentals, completedRentals, paymentStats, totalReviews,] = await Promise.all([
        prisma_1.prisma.rentalOrder.count({
            where: {
                customerId,
                status: prisma_2.RentalStatus.PICKED_UP,
            },
        }),
        prisma_1.prisma.rentalOrder.count({
            where: {
                customerId,
                status: prisma_2.RentalStatus.RETURNED,
            },
        }),
        prisma_1.prisma.payment.aggregate({
            where: {
                status: prisma_2.PaymentStatus.COMPLETED,
                order: {
                    customerId,
                },
            },
            _sum: {
                amount: true,
            },
        }),
        prisma_1.prisma.review.count({
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
exports.DashboardService = {
    getProviderDashboard,
    getCustomerDashboard
};
