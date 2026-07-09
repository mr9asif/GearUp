"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderRentalService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = require("../../../config/prisma");
const Apperror_1 = __importDefault(require("../../../error/Apperror"));
const prisma_2 = require("../../../generated/prisma");
const getProviderOrders = async (providerId) => {
    const orders = await prisma_1.prisma.rentalOrder.findMany({
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
const getProviderOrderById = async (providerId, orderId) => {
    const order = await prisma_1.prisma.rentalOrder.findFirst({
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
        throw new Apperror_1.default(http_status_1.default.NOT_FOUND, "Rental order not found");
    }
    return order;
};
// accept order 
const acceptRental = async (providerId, orderId) => {
    const order = await prisma_1.prisma.rentalOrder.findFirst({
        where: {
            id: orderId,
            gear: {
                providerId,
            },
        },
    });
    if (!order) {
        throw new Apperror_1.default(http_status_1.default.NOT_FOUND, "Rental order not found");
    }
    if (order.status !== prisma_2.RentalStatus.PLACED) {
        throw new Apperror_1.default(http_status_1.default.BAD_REQUEST, "Only placed orders can be accepted");
    }
    const updatedOrder = await prisma_1.prisma.rentalOrder.update({
        where: {
            id: orderId,
        },
        data: {
            status: prisma_2.RentalStatus.CONFIRMED,
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
const rejectRental = async (providerId, orderId) => {
    const order = await prisma_1.prisma.rentalOrder.findFirst({
        where: {
            id: orderId,
            gear: {
                providerId,
            },
        },
    });
    if (!order) {
        throw new Apperror_1.default(http_status_1.default.NOT_FOUND, "Rental order not found");
    }
    if (order.status !== prisma_2.RentalStatus.PLACED) {
        throw new Apperror_1.default(http_status_1.default.BAD_REQUEST, "Only placed orders can be rejected");
    }
    const updatedOrder = await prisma_1.prisma.rentalOrder.update({
        where: {
            id: orderId,
        },
        data: {
            status: prisma_2.RentalStatus.CANCELLED,
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
const startRental = async (providerId, orderId) => {
    const order = await prisma_1.prisma.rentalOrder.findFirst({
        where: {
            id: orderId,
            gear: {
                providerId,
            },
        },
    });
    if (!order) {
        throw new Apperror_1.default(http_status_1.default.NOT_FOUND, "Rental order not found");
    }
    if (order.status !== prisma_2.RentalStatus.PAID) {
        throw new Apperror_1.default(http_status_1.default.BAD_REQUEST, "Only paid rentals can be started");
    }
    const updatedOrder = await prisma_1.prisma.rentalOrder.update({
        where: {
            id: orderId,
        },
        data: {
            status: prisma_2.RentalStatus.PICKED_UP,
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
const completeRental = async (providerId, orderId) => {
    const order = await prisma_1.prisma.rentalOrder.findFirst({
        where: {
            id: orderId,
            gear: {
                providerId,
            },
        },
    });
    if (!order) {
        throw new Apperror_1.default(http_status_1.default.NOT_FOUND, "Rental order not found");
    }
    if (order.status !== prisma_2.RentalStatus.PICKED_UP) {
        throw new Apperror_1.default(http_status_1.default.BAD_REQUEST, "Only picked up rentals can be completed");
    }
    const updatedOrder = await prisma_1.prisma.rentalOrder.update({
        where: {
            id: orderId,
        },
        data: {
            status: prisma_2.RentalStatus.RETURNED,
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
const getIncomingOrders = async (providerId) => {
    const orders = await prisma_1.prisma.rentalOrder.findMany({
        where: {
            gear: {
                providerId,
            },
            status: {
                in: [
                    prisma_2.RentalStatus.PLACED,
                    prisma_2.RentalStatus.CONFIRMED,
                    prisma_2.RentalStatus.PAID,
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
exports.ProviderRentalService = {
    getProviderOrders,
    getProviderOrderById,
    getIncomingOrders,
    acceptRental,
    rejectRental,
    startRental,
    completeRental
};
