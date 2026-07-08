import httpStatus from "http-status";

import { prisma } from "../../config/prisma";
import AppError from "../../error/Apperror";
import { RentalStatus } from "../../generated/prisma";
import { stripe } from "./stripe/stripe";

const createCheckoutSession = async (
  customerId: string,
  orderId: string
) => {
  // Find Order
  const order = await prisma.rentalOrder.findFirst({
    where: {
      id: orderId,
      customerId,
    },
    include: {
      gear: true,
      payment: true,
    },
  });

  if (!order) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Rental order not found"
    );
  }

  // Must be confirmed
  if (order.status !== RentalStatus.CONFIRMED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only confirmed rentals can be paid"
    );
  }

  // Already paid?
  if (order.payment) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Payment already exists"
    );
  }

  // Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    payment_method_types: ["card"],

    customer_email: undefined,

    line_items: [
      {
        quantity: 1,

        price_data: {
          currency: "usd",

          unit_amount: Number(order.totalAmount) * 100,

          product_data: {
            name: order.gear.name,

            description: order.gear.description,
          },
        },
      },
    ],

    metadata: {
      orderId: order.id,
      customerId,
    },

    success_url: `${process.env.SERVER_URL}/api/payments/success?session_id={CHECKOUT_SESSION_ID}`,

    cancel_url: `${process.env.SERVER_URL}/api/payments/cancel`,
  });

  return {
    sessionId: session.id,
    checkoutUrl: session.url,
  };
};

// cofirm payment
import Stripe from "stripe";

import {
    PaymentProvider,
    PaymentStatus
} from "../../generated/prisma";

const confirmPayment = async (
  signature: string,
  payload: Buffer
) => {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Invalid Stripe webhook signature"
    );
  }

  if (event.type !== "checkout.session.completed") {
    return {
      received: true,
    };
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const orderId = session.metadata?.orderId;

  if (!orderId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Order ID not found in Stripe metadata"
    );
  }

  const order = await prisma.rentalOrder.findUnique({
    where: {
      id: orderId,
    },
    include: {
      payment: true,
    },
  });

  if (!order) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Rental order not found"
    );
  }

  // Prevent duplicate webhook processing
  if (order.payment) {
    return {
      received: true,
    };
  }

  await prisma.$transaction(async (tx) => {
    await tx.payment.create({
      data: {
        orderId: order.id,
        transactionId: session.payment_intent as string,
        amount: order.totalAmount,
        provider: PaymentProvider.STRIPE,
        status: PaymentStatus.COMPLETED,
        paidAt: new Date(),
      },
    });

    await tx.rentalOrder.update({
      where: {
        id: order.id,
      },
      data: {
        status: RentalStatus.PAID,
      },
    });
  });

  return {
    received: true,
  };
};


const getMyPayments = async (customerId: string) => {
  const payments = await prisma.payment.findMany({
    where: {
      order: {
        customerId,
      },
    },
    include: {
      order: {
        include: {
          gear: {
            include: {
              category: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return payments;
};

const getPaymentById = async (
  customerId: string,
  paymentId: string
) => {
  const payment = await prisma.payment.findFirst({
    where: {
      id: paymentId,
      order: {
        customerId,
      },
    },
    include: {
      order: {
        include: {
          gear: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });

  if (!payment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Payment not found"
    );
  }

  return payment;
};

export const PaymentService = {
  createCheckoutSession,
  confirmPayment,
  getMyPayments,
  getPaymentById
};