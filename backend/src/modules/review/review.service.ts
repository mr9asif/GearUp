import httpStatus from "http-status";
import { prisma } from "../../config/prisma";
import AppError from "../../error/Apperror";
import { PaymentStatus, RentalStatus } from "../../generated/prisma";


const createReview = async (
  customerId: string,
  payload: {
    rentalId: string;
    rating: number;
    comment: string;
  }
) => {
  const rental = await prisma.rentalOrder.findUnique({
    where: {
      id: payload.rentalId,
    },
    include: {
      payment: true,
      gear: true,
    },
  });

  if (!rental) {
    throw new AppError(httpStatus.NOT_FOUND, "Rental not found");
  }

  if (rental.customerId !== customerId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized to review this rental"
    );
  }

  if (rental.status !== RentalStatus.RETURNED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You can only review returned rentals"
    );
  }

  if (!rental.payment || rental.payment.status !== PaymentStatus.COMPLETED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Payment must be completed before leaving a review"
    );
  }

  const existingReview = await prisma.review.findUnique({
    where: {
      rentalId: payload.rentalId,
    },
  });

  if (existingReview) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have already reviewed this rental"
    );
  }

  const review = await prisma.review.create({
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
const getGearReviews = async (gearId: string) => {
  const reviews = await prisma.review.findMany({
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
const getMyReviews = async (customerId: string) => {
  const reviews = await prisma.review.findMany({
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
const updateReview = async (
  customerId: string,
  reviewId: string,
  payload: {
    rating?: number;
    comment?: string;
  }
) => {
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!review) {
    throw new AppError(httpStatus.NOT_FOUND, "Review not found");
  }

  if (review.customerId !== customerId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized to update this review"
    );
  }

  const updatedReview = await prisma.review.update({
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
const deleteReview = async (
  customerId: string,
  reviewId: string
) => {
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!review) {
    throw new AppError(httpStatus.NOT_FOUND, "Review not found");
  }

  if (review.customerId !== customerId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized to delete this review"
    );
  }

  await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });

  return null;
};

export const ReviewService = {
  createReview,
  getGearReviews,
  getMyReviews,
  updateReview,
  deleteReview
};