<div align="center">

# SMASH
### Premium Badminton E-commerce Platform

> A full-stack, high-performance e-commerce platform built for the serious badminton athlete.

[![CI](https://github.com/LuciferVid/smashMart/actions/workflows/ci.yml/badge.svg)](https://github.com/LuciferVid/smashMart/actions/workflows/ci.yml)
[![CD](https://github.com/LuciferVid/smashMart/actions/workflows/cd.yml/badge.svg)](https://github.com/LuciferVid/smashMart/actions/workflows/cd.yml)
![Node](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-d4f000)

</div>

---

## Overview

**SMASH** is a luxury badminton gear store with a minimalist black-and-white aesthetic, neon lime accents, and a full shopping experience — from browsing to checkout. Built with React on the frontend and Node.js/Express + MongoDB on the backend.

---

## Features

| Feature | Description |
|---|---|
| 🛍️ Dynamic Shop | Category filtering, live stock, product search |
| 🛒 Shopping Cart | Persistent cart with quantity management and live totals |
| 🔐 Auth System | JWT-based login/signup + Google OAuth |
| 📦 Order Management | Place and track orders per user |
| 📱 Responsive UI | Mobile-first, minimalist design with Public Sans & Outfit fonts |
| 🚨 Error Handling | Global error boundary + toast/modal notification system |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Plain CSS |
| Backend | Node.js, Express 5 |
| ORM | Prisma |
| Database | MongoDB Atlas |
| Auth | JWT, Google OAuth (`@react-oauth/google`) |
| Deployment | Vercel (frontend) |
| CI/CD | GitHub Actions |

---

## 📁 Project Structure

```
smashMart/
├── .github/
│   └── workflows/
│       ├── ci.yml          # Lint, build & schema check on every push
│       └── cd.yml          # Auto-deploy to Vercel on main
├── frontend/
│   ├── public/images/      # Product images & video assets
│   └── src/
│       ├── components/     # Header, Footer, GlobalUI, ErrorBoundary
│       ├── context/        # AppContext (cart/auth), UIContext (modals/toasts)
│       ├── pages/          # Home, Shop, Cart, Login, Signup, Orders, Contact
│       ├── utils/          # Image mapping helpers
│       └── api.js          # Centralized fetch utility
├── backend/
│   ├── prisma/
│   │   └── schema.prisma   # MongoDB models: User, Product, Category, Cart, Order
│   └── src/
│       ├── controllers/    # authController, productController, cartController, orderController
│       ├── middleware/      # JWT auth middleware
│       ├── routes/         # auth, products, categories, cart, orders
│       └── server.js       # Express app entry point
└── vercel.json             # Vercel build & rewrite config
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB Atlas account (or local MongoDB)

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/smashmart
JWT_SECRET=your_jwt_secret
PORT=5000
```

```bash
node seed-native.js   # Seed initial categories & products
npm run dev           # Starts on http://localhost:5000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev           # Starts on http://localhost:5173
```

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/signup` | Register new user | — |
| `POST` | `/api/auth/login` | Login with email/password | — |
| `POST` | `/api/auth/google` | Google OAuth login | — |
| `GET` | `/api/products` | List all products | — |
| `GET` | `/api/categories` | List all categories | — |
| `GET` | `/api/cart` | Get user's cart | ✅ JWT |
| `POST` | `/api/cart` | Add item to cart | ✅ JWT |
| `GET` | `/api/orders` | Get user's orders | ✅ JWT |
| `POST` | `/api/orders` | Place an order | ✅ JWT |

---

## 🗄️ Data Models

```
User       — id, email, password, googleId, name, role
Product    — id, name, description, price, image, stock, categoryId
Category   — id, name, image
Cart       — id, userId, items[ { productId, quantity } ]
Order      — id, userId, items[ { productId, name, price, quantity } ], total, status
```

---

## ⚙️ CI/CD Pipeline

This project uses **GitHub Actions** for automated testing and deployment.

### CI — Every push & pull request

**File:** `.github/workflows/ci.yml`

```
Push / PR
    │
    ├── Frontend Job
    │     ├── npm ci
    │     ├── eslint .
    │     └── vite build
    │
    └── Backend Job
          ├── npm ci
          └── prisma generate
```

### CD — Push to `main` only

**File:** `.github/workflows/cd.yml`

```
Push to main
    │
    └── Deploy Job
          ├── checkout
          ├── install vercel cli
          └── vercel --prod
```

### Required GitHub Secrets

> **Settings → Secrets and variables → Actions**

| Secret | Description |
|---|---|
| `VERCEL_TOKEN` | Vercel account token |
| `VERCEL_ORG_ID` | From `.vercel/project.json` → `orgId` |
| `VERCEL_PROJECT_ID` | From `.vercel/project.json` → `projectId` |
| `DATABASE_URL` | MongoDB connection string |

---

## 🎨 UI Design Tokens

| Token | Value | Preview |
|---|---|---|
| Primary | `#000000` | ⬛ Black |
| Background | `#FFFFFF` | ⬜ White |
| Accent | `#d4f000` | 🟨 Neon Lime |
| Display Font | `Outfit` | — |
| Body Font | `Public Sans` | — |

---

## 📄 License

MIT © [LuciferVid](https://github.com/LuciferVid)
