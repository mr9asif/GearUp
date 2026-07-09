"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = require("../../config/prisma");
const Apperror_1 = __importDefault(require("../../error/Apperror"));
const prisma_2 = require("../../generated/prisma");
const stripe_1 = require("./stripe/stripe");
const createCheckoutSession = async (customerId, orderId) => {
    // Find Order
    const order = await prisma_1.prisma.rentalOrder.findFirst({
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
        throw new Apperror_1.default(http_status_1.default.NOT_FOUND, "Rental order not found");
    }
    // Must be confirmed
    if (order.status !== prisma_2.RentalStatus.CONFIRMED) {
        throw new Apperror_1.default(http_status_1.default.BAD_REQUEST, "Only confirmed rentals can be paid");
    }
    // Already paid?
    if (order.payment) {
        throw new Apperror_1.default(http_status_1.default.BAD_REQUEST, "Payment already exists");
    }
    // Stripe Checkout Session
    const session = await stripe_1.stripe.checkout.sessions.create({
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
const confirmPayment = async (signature, payload) => {
    let event;
    try {
        event = stripe_1.stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);
    }
    catch (error) {
        throw new Apperror_1.default(http_status_1.default.BAD_REQUEST, "Invalid Stripe webhook signature");
    }
    if (event.type !== "checkout.session.completed") {
        return {
            received: true,
        };
    }
    const session = event.data.object;
    const orderId = session.metadata?.orderId;
    if (!orderId) {
        throw new Apperror_1.default(http_status_1.default.BAD_REQUEST, "Order ID not found in Stripe metadata");
    }
    const order = await prisma_1.prisma.rentalOrder.findUnique({
        where: {
            id: orderId,
        },
        include: {
            payment: true,
        },
    });
    if (!order) {
        throw new Apperror_1.default(http_status_1.default.NOT_FOUND, "Rental order not found");
    }
    // Prevent duplicate webhook processing
    if (order.payment) {
        return {
            received: true,
        };
    }
    await prisma_1.prisma.$transaction(async (tx) => {
        await tx.payment.create({
            data: {
                orderId: order.id,
                transactionId: session.payment_intent,
                amount: order.totalAmount,
                provider: prisma_2.PaymentProvider.STRIPE,
                status: prisma_2.PaymentStatus.COMPLETED,
                paidAt: new Date(),
            },
        });
        await tx.rentalOrder.update({
            where: {
                id: order.id,
            },
            data: {
                status: prisma_2.RentalStatus.PAID,
            },
        });
    });
    return {
        received: true,
    };
};
const getMyPayments = async (customerId) => {
    const payments = await prisma_1.prisma.payment.findMany({
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
const getPaymentById = async (customerId, paymentId) => {
    const payment = await prisma_1.prisma.payment.findFirst({
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
        throw new Apperror_1.default(http_status_1.default.NOT_FOUND, "Payment not found");
    }
    return payment;
};
exports.PaymentService = {
    createCheckoutSession,
    confirmPayment,
    getMyPayments,
    getPaymentById
};
