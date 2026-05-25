cat > README.md << 'EOF'
# Brown Shop Authentication System

## Overview

Brown Shop is a secure full-stack shopping platform built using Next.js App Router.

The project demonstrates:

- Authentication
- Authorization
- JWT security
- OTP verification
- Cloudflare Turnstile verification
- Protected routes
- Admin/User roles
- Product CRUD system
- CI/CD workflow
- Vercel deployment

The application uses a brown and white luxury UI design and simulates a real production-ready authentication architecture without a database.

---

# Technologies Used

## Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS

## Backend

- Next.js API Routes
- JWT Authentication
- bcryptjs
- Nodemailer
- Cloudflare Turnstile

## Deployment

- GitHub
- GitHub Actions CI
- Vercel

---

# Features

## Authentication

- Email/password login
- bcrypt password hashing
- JWT token authentication
- HTTP-only authentication cookies
- OTP verification system
- Gmail OTP email sending
- Cloudflare Turnstile human verification

---

## Authorization

Two roles:

### Admin

Can:
- Add products
- Edit products
- Delete products

### User

Can:
- Login
- View products

Users can see management buttons but cannot use them.

---

# Security Features

- JWT verification
- Protected middleware routes
- HTTP-only cookies
- Turnstile verification
- OTP expiration system
- Server-side authorization
- bcrypt password hashing

---

# Project Structure

src/
│
├── app/
│   ├── api/
│   │   ├── auth/
│   │   └── products/
│   │
│   ├── login/
│   ├── otp/
│   └── shop/
│
├── components/
│   └── products/
│
├── lib/
│
├── types/
│
└── middleware.ts

---

# Authentication Flow

User opens /login
↓
Cloudflare Turnstile verification
↓
Email/password validation
↓
OTP generated
↓
OTP sent by Gmail
↓
User enters OTP
↓
JWT token created
↓
JWT stored in HTTP-only cookie
↓
Middleware protects /shop
↓
User enters system

---

# Product Authorization Flow

Admin login
↓
Buttons enabled
↓
Can create/update/delete

User login
↓
Buttons visible but disabled
↓
API still blocks unauthorized actions

---

# Middleware Flow

User requests /shop
↓
middleware.ts runs first
↓
JWT cookie checked
↓
JWT verified
↓
Allow or redirect

---

# Environment Variables

Create .env.local

EMAIL_USER=
EMAIL_APP_PASSWORD=

JWT_SECRET=

NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

---

# Installation

## Clone repository

git clone <repository-url>

---

## Install dependencies

npm install

---

## Run development server

npm run dev

---

# Build Commands

## Run lint

npm run lint

## Production build

npm run build

---

# CI/CD Workflow

The project uses GitHub Actions CI pipeline.

Pipeline steps:

git push
↓
GitHub Actions
↓
npm ci
↓
npm run lint
↓
npm run build
↓
Pass or fail

Production deployment is handled automatically by Vercel.

---

# Deployment

The application is deployed using Vercel.

Deployment flow:

Push to GitHub
↓
Vercel detects changes
↓
Automatic deployment
↓
Production website updates

---

# Cloudflare Turnstile

Cloudflare Turnstile is used to verify human users before login.

Flow:

User completes widget
↓
Frontend receives token
↓
Backend verifies token with Cloudflare
↓
Login allowed or denied

---

# OTP System

The OTP system uses:

- Nodemailer
- Gmail App Password
- In-memory OTP storage

Flow:

User logs in
↓
OTP generated
↓
OTP emailed
↓
OTP verified
↓
JWT created

---

# Git Workflow

## Developer branch

Used for:
- development
- testing
- feature work

## Main branch

Used for:
- production
- deployment

---

# Future Improvements

- Database integration
- Persistent product storage
- Refresh tokens
- Better dashboard UI
- Toast notifications
- Product image uploads
- User registration
- Password reset system

---

# Production URL

https://moemenfinal.vercel.app

---

# Author

Moemen Hafez
EOF