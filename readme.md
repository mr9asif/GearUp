# 🏋️ GearUp API

> **Rent Sports & Outdoor Gear Instantly**

A production-ready RESTful backend API for a sports and outdoor equipment rental platform. GearUp allows customers to rent sports equipment, providers to manage their rental inventory, and administrators to oversee the entire platform.

---

## 🚀 Live Demo
```
https://gearup-tz3a.onrender.com
```
### API Base URL

```
https://gearup-tz3a.onrender.com
```

### Postman Documentation

```
https://documenter.getpostman.com/view/38315131/2sBY4LS2ZQ
```

---

# 📖 Project Overview

GearUp is a multi-role equipment rental management system built with **Node.js**, **Express.js**, **TypeScript**, **Prisma ORM**, and **PostgreSQL**.

The platform supports three different user roles:

- 👤 Customer
- 🏪 Provider
- 👑 Admin

Customers can browse sports gear, rent equipment, complete secure payments using Stripe, track rental status, and leave reviews.

Providers manage their gear inventory, receive rental requests, and update rental progress.

Administrators manage users, categories, gear listings, and monitor the overall platform.

---

# ✨ Features

## 🌍 Public Features

- Browse all available gear
- Search by name
- Filter by
  - Category
  - Brand
  - Price Range
  - Availability
- View gear details

---

## 👤 Customer Features

- Register/Login
- JWT Authentication
- View own profile
- Update profile
- Place rental orders
- Stripe Checkout Payment
- View payment history
- Track rental status
- Cancel pending rental
- Leave reviews after completed rental

---

## 🏪 Provider Features

- Register/Login
- Add new gear
- Update gear
- Delete gear
- Manage inventory
- View incoming rental requests
- Accept orders
- Reject orders
- Mark order as Picked Up
- Mark order as Returned
- Dashboard statistics

---

## 👑 Admin Features

- View all users
- Suspend/Activate users
- View all gear
- View all rental orders
- Manage categories
- Dashboard statistics

---

# 🔐 Authentication

Authentication is handled using:

- JWT Access Token
- JWT Refresh Token
- HTTP Only Cookies
- Role Based Authorization

Supported Roles

- CUSTOMER
- PROVIDER
- ADMIN

---

# 💳 Payment Integration

Integrated with

- Stripe Checkout Session
- Stripe Webhook
- Payment Verification

Payment Status

- Pending
- Completed
- Failed

---

# 📦 Tech Stack

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- PostgreSQL
- Prisma ORM

## Authentication

- JWT
- bcrypt

## Validation

- Zod

## File Upload

- Multer
- Cloudinary

## Payment

- Stripe

## Development Tools

- Prisma Studio
- Postman
- ESLint
- Prettier
- ts-node-dev

---

# 🗂️ Project Structure

```
src
│
├── app
│   ├── config
│   ├── middlewares
│   ├── modules
│   │   ├── auth
│   │   ├── user
│   │   ├── category
│   │   ├── gear
│   │   ├── rental
│   │   ├── payment
│   │   ├── review
│   │   ├── provider
│   │   └── admin
│   │
│   ├── routes
│   ├── utils
│   ├── interfaces
│   └── errors
│
├── prisma
│
├── server.ts
└── app.ts
```

---

# 🗃️ Database Schema

Main Models

- User
- Category
- GearItem
- RentalOrder
- Payment
- Review

Relationships

```
User
 ├── GearItems
 ├── RentalOrders
 └── Reviews

Category
 └── GearItems

GearItem
 ├── RentalOrders
 └── Reviews

RentalOrder
 └── Payment
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register |
| POST | /api/auth/login | Login |
| POST | /api/auth/logout | Logout |
| POST | /api/auth/refresh-token | Refresh Token |
| GET | /api/auth/me | Current User |

---

## Categories

| Method | Endpoint |
|---------|----------|
| GET | /api/categories |
| POST | /api/categories |
| PATCH | /api/categories/:id |
| DELETE | /api/categories/:id |

---

## Gear

### Public

| Method | Endpoint |
|---------|----------|
| GET | /api/gear |
| GET | /api/gear/:id |

### Provider

| Method | Endpoint |
|---------|----------|
| POST | /api/provider/gear |
| PUT | /api/provider/gear/:id |
| DELETE | /api/provider/gear/:id |

---

## Rentals

### Customer

| Method | Endpoint |
|---------|----------|
| POST | /api/rentals/customer |
| GET | /api/rentals/customer/my-orders |
| GET | /api/rentals/customer/my-orders/:id |
| PATCH | /api/rentals/customer/:id/cancel |

### Provider

| Method | Endpoint |
|---------|----------|
| GET | /api/provider/orders |
| GET | /api/provider/orders/:id |
| GET | /api/provider/orders/incoming-orders|
| PATCH | /api/provider/orders/:id/accept |
| PATCH | /api/provider/orders/:id/reject |
| PATCH | /api/provider/orders/:id/start |
| PATCH | /api/provider/orders/:id/complete |

---

## Payments

| Method | Endpoint |
|---------|----------|
| POST | /api/payments/create |
| POST | /api/payments/confirm |
| GET | /api/payments |
| GET | /api/payments/:id |

---

## Reviews

| Method | Endpoint |
|---------|----------|
| POST | /api/reviews |

---

## Admin

| Method | Endpoint |
|---------|----------|
| GET | /api/admin/users |
| PATCH | /api/admin/users/:id |
| GET | /api/admin/gear |
| GET | /api/admin/rentals |

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

NODE_ENV=development

DATABASE_URL=

JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES_IN=

JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRES_IN=

BCRYPT_SALT_ROUNDS=

COOKIE_SECRET=

CLIENT_URL=
SERVER_URL=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

# 🛠️ Installation

Clone the repository

```bash
git clone https://github.com/mr9asif/GearUp.git
```

Move into project

```bash
cd gearup-api
```

Install dependencies

```bash
npm install
```

Generate Prisma Client

```bash
npx prisma generate
```

Run Migration

```bash
npx prisma migrate dev
```

Start Development Server

```bash
npm run dev
```

Build

```bash
npm run build
```

Production

```bash
npm start
```

---

# 🧪 Testing

You can test the API using

- Postman
- Thunder Client
- Insomnia

---

# 📈 Future Improvements

- Email Notifications
- Wishlist
- Coupons & Discounts
- Provider Analytics
- Image Optimization
- Multi Payment Gateway
- Real-time Notifications
- Rental Extensions
- Refund Management

---

# 🔒 Security Features

- Password Hashing
- JWT Authentication
- Refresh Token
- Role Based Access Control
- Input Validation using Zod
- Global Error Handling
- HTTP Only Cookies
- Secure Stripe Webhooks

---

# 👨‍💻 Author

**mr9asif**

Backend Developer

GitHub

```
https://github.com/mr9asif
```

LinkedIn

```
https://linkedin.com/in/mr9asif
```

---

# 📄 License

This project was developed for educational purposes as part of a Backend Development Assignment.

© 2026 mr9asif
