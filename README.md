# Runway Dashboard (SaaS Analytics Platform)

A fully production-ready SaaS financial analytics system designed to track, analyze, and visualize key business metrics like MRR, ARR, churn, subscriptions, and growth.

This project follows industry-level backend architecture, clean code practices, and scalability patterns used in real-world SaaS products.

---

#  Table of Contents

* Overview
* Features
* Tech Stack
* System Architecture
* Project Structure
* Getting Started
* Environment Variables
* API Documentation
* Core Business Logic
* Authentication & Security
* Error Handling Strategy
* Database Design (Prisma)
* Performance & Scalability
* Future Roadmap


---

# Overview

Runway Dashboard enables founders and developers to monitor SaaS health in real-time by aggregating subscription and financial data.

It is built with a modular, scalable backend architecture and is ready to be deployed in production environments.

---

#  Features

### Core Features

*  Real-time SaaS metrics (MRR, ARR, churn rate)
*  Secure authentication (JWT-based)
*  Subscription management system
*  Financial insights & analytics
*  RESTful API (clean & structured)

### Production-Level Features

*  Modular architecture
*  Service layer abstraction
*  Secure middleware handling
*  Centralized error handling
*  Scalable codebase

---

#  Tech Stack

### Backend

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* PostgreSQL (NeonDB)

### Tooling

* ESLint
* Prettier


---

#  System Architecture

This project follows a layered architecture:

```
Controller → Service → Prisma (DB)
```

### Layers Explained

* **Controller Layer** → Handles request/response
* **Service Layer** → Business logic
* **Data Layer (Prisma)** → Database queries

---

#  Project Structure

```
backend/
├── src/
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── catchAsync.ts
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.routes.ts
│   │   │
│   │   ├── dashboard/
│   │   │   ├── dashboard.controller.ts
│   │   │   └── dashboard.service.ts
│   │   │
│   │   ├── expense/
│   │   │   ├── expense.controller.ts
│   │   │   └── expense.service.ts
│   │   │
│   │   ├── financeEngine/
│   │   │   ├── finance.engine.ts
│   │   │   ├── burn.calculator.ts
│   │   │   ├── mrr.calculator.ts
│   │   │   ├── profit.calculator.ts
│   │   │   └── runway.calculator.ts
│   │   │
│   │   ├── financialProfile/
│   │   │   ├── financialProfile.controller.ts
│   │   │   └── financialProfile.service.ts
│   │   │
│   │   ├── subscription/
│   │   │   ├── subscription.controller.ts
│   │   │   ├── subscription.service.ts
│   │   │   └── subscription.routes.ts
│   │
│   ├── routes/
│   │   └── index.ts
│   │
│   ├── lib/
│   │   └── prisma.ts
│   │
│   ├── utils/
│   │
│   ├── app.ts
│   └── server.ts
│
├── prisma/
│   └── schema.prisma
│
├── .env
├── package.json
└── tsconfig.json
```

###  Architecture Insight

* **modules/** → Feature-based modular design (scalable)
* **financeEngine/** → Core business logic (separated for reusability)
* **middlewares/** → Centralized request handling & security
* **routes/** → Single entry point for all APIs


---

#  Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/Avinashpalofficial/ecommerce-mern-.git

cd runway-dashboard/backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create `.env` file:

```
DATABASE_URL=your_database_url
JWT_SECRET=your_super_secret_key
PORT=5000
```

### 4. Setup Database

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Run Server

```bash
npm run dev
```

---

#  API Documentation

## Base URL

```
http://localhost:5000/api
```

## Auth Routes

* POST `/auth/register`
* POST `/auth/login`

## Dashboard Routes

* GET `/dashboard`

## Subscription Routes

* POST `/subscription`
* GET `/subscription`

## Expense Routes
   POST `/expense`
   GET  `/expense`
   PATCH `/expense`

## financialRoutes
  POST `/finance`
  GET  `/finance`

---

#  Core Business Logic

### MRR (Monthly Recurring Revenue)

Sum of all active subscription monthly prices

### ARR (Annual Recurring Revenue)

```
ARR = MRR × 12
```

### Churn Rate

```
Churn = (Lost Customers / Total Customers) × 100     (in future)
```

---

#  Authentication & Security

* JWT-based authentication
* Protected routes using middleware
* Password hashing (bcrypt recommended)
* Token validation on each request

---

#  Error Handling Strategy

* Centralized error middleware
* Async error wrapper (catchAsync)
* Standard API response format

Example:

```json
{
  "success": false,
  "message": "Error message"
}
```

---

#  Database Design (Prisma)

### Key Models

* User
* Subscription
* Expense
* financialProfile
* Plan (optional extension)


---


---

#  Performance & Scalability

* Modular codebase
* Efficient DB queries via Prisma
* Stateless backend (horizontal scaling ready)
* Clean separation of concerns

---

#  Future Roadmap

*  Stripe integration
*  Advanced analytics dashboard (charts)
*  Export reports (CSV/PDF)
*  Swagger API docs
*  Forcasting



If this project helps you, consider giving it a star!
