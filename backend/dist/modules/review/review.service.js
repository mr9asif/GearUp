"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = require("../../config/prisma");
const Apperror_1 = __importDefault(require("../../error/Apperror"));
const prisma_2 = require("../../generated/prisma");
const createReview = async (customerId, payload) => {
    const rental = await prisma_1.prisma.rentalOrder.findUnique({
        where: {
            id: payload.rentalId,
        },
        include: {
            payment: true,
            gear: true,
        },
    });
    if (!rental) {
        throw new Apperror_1.default(http_status_1.default.NOT_FOUND, "Rental not found");
    }
    if (rental.customerId !== customerId) {
        throw new Apperror_1.default(http_status_1.default.FORBIDDEN, "You are not authorized to review this rental");
    }
    if (rental.status !== prisma_2.RentalStatus.RETURNED) {
        throw new Apperror_1.default(http_status_1.default.BAD_REQUEST, "You can only review returned rentals");
    }
    if (!rental.payment || rental.payment.status !== prisma_2.PaymentStatus.COMPLETED) {
        throw new Apperror_1.default(http_status_1.default.BAD_REQUEST, "Payment must be completed before leaving a review");
    }
    const existingReview = await prisma_1.prisma.review.findUnique({
        where: {
            rentalId: payload.rentalId,
        },
    });
    if (existingReview) {
        throw new Apperror_1.default(http_status_1.default.BAD_REQUEST, "You have already reviewed this rental");
    }
    const review = await prisma_1.prisma.review.create({
        data: {
            customerId,
            gearId: rental.gearId,
            rentalId: rental.id,
            rating: payload.rating,
            comment: payload.comment,
        },
        include: {
            customer: {
                select: {
                    id: true,
                    name: true,
                    profileImage: true,
                },
            },
            gear: {
                select: {
                    id: true,
                    name: true,
                    images: true,
                },
            },
        },
    });
    return review;
};
// getGear-review
const getGearReviews = async (gearId) => {
    const reviews = await prisma_1.prisma.review.findMany({
        where: {
            gearId,
        },
        include: {
            customer: {
                select: {
                    id: true,
                    name: true,
                    profileImage: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return reviews;
};
// getMy-review
const getMyReviews = async (customerId) => {
    const reviews = await prisma_1.prisma.review.findMany({
        where: {
            customerId,
        },
        include: {
            gear: {
                select: {
                    id: true,
                    name: true,
                    images: true,
                    pricePerDay: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return reviews;
};
// update review
const updateReview = async (customerId, reviewId, payload) => {
    const review = await prisma_1.prisma.review.findUnique({
        where: {
            id: reviewId,
        },
    });
    if (!review) {
        throw new Apperror_1.default(http_status_1.default.NOT_FOUND, "Review not found");
    }
    if (review.customerId !== customerId) {
        throw new Apperror_1.default(http_status_1.default.FORBIDDEN, "You are not authorized to update this review");
    }
    const updatedReview = await prisma_1.prisma.review.update({
        where: {
            id: reviewId,
        },
        data: payload,
        include: {
            customer: {
                select: {
                    id: true,
                    name: true,
                    profileImage: true,
                },
            },
            gear: {
                select: {
                    id: true,
                    name: true,
                    images: true,
                },
            },
        },
    });
    return updatedReview;
};
// delete review
const deleteReview = async (customerId, reviewId) => {
    const review = await prisma_1.prisma.review.findUnique({
        where: {
            id: reviewId,
        },
    });
    if (!review) {
        throw new Apperror_1.default(http_status_1.default.NOT_FOUND, "Review not found");
    }
    if (review.customerId !== customerId) {
        throw new Apperror_1.default(http_status_1.default.FORBIDDEN, "You are not authorized to delete this review");
    }
    await prisma_1.prisma.review.delete({
        where: {
            id: reviewId,
        },
    });
    return null;
};
exports.ReviewService = {
    createReview,
    getGearReviews,
    getMyReviews,
    updateReview,
    deleteReview
};
