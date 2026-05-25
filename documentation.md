cat > DOCUMENTATION.md << 'EOF'
# Brown Shop Technical Documentation

# Introduction

Brown Shop is a full-stack secure shopping platform developed using Next.js App Router.

The project demonstrates a professional authentication and authorization architecture using:

- JWT Authentication
- OTP Email Verification
- Cloudflare Turnstile
- Protected Middleware
- Admin/User Authorization
- API Routes Backend
- CI/CD Pipeline
- Vercel Deployment

The project was built without a database and uses in-memory storage for educational purposes.

---

# System Architecture

Frontend and backend are both handled inside the Next.js application.

Architecture flow:

Browser
↓
Next.js Frontend
↓
API Routes Backend
↓
Authentication / Authorization Logic
↓
JWT Cookies
↓
Middleware Protection
↓
Protected Shop System

---

# Frontend Architecture

Frontend responsibilities:

- Login UI
- OTP Verification UI
- Product Display
- Product CRUD Forms
- User Interaction
- Cloudflare Widget Rendering

Main frontend folders:

src/app/
src/components/

---

# Backend Architecture

Backend responsibilities:

- Login Validation
- Password Comparison
- OTP Generation
- OTP Verification
- JWT Creation
- Authorization
- Product CRUD APIs
- Turnstile Verification

Main backend folders:

src/app/api/
src/lib/

---

# Authentication Architecture

Authentication flow:

User enters email/password
↓
Cloudflare Turnstile verification
↓
Backend validates credentials
↓
bcrypt compares password hash
↓
OTP generated
↓
OTP emailed
↓
User submits OTP
↓
JWT token generated
↓
JWT stored in HTTP-only cookie
↓
Middleware protects routes

---

# Authorization Architecture

Two roles exist:

## Admin

Permissions:
- Create products
- Update products
- Delete products

## User

Permissions:
- View products only

Users can see buttons but cannot execute restricted actions.

Authorization exists:
- in frontend UI
- in backend APIs

---

# JWT Architecture

JWT payload contains:

- email
- role

JWT flow:

OTP verified
↓
JWT created
↓
Cookie stored
↓
Middleware validates token
↓
Protected route access granted

Cookie security:

- HTTP-only
- SameSite=lax
- Secure in production

---

# OTP System

OTP flow:

Login success
↓
6-digit OTP generated
↓
OTP stored temporarily in memory
↓
OTP emailed with Nodemailer
↓
User enters OTP
↓
OTP verified
↓
JWT issued

Current OTP storage:
- in-memory object storage

Production recommendation:
- Redis
- Database
- Expiration cleanup system

---

# Cloudflare Turnstile

Purpose:
- prevent bots
- verify human users

Flow:

Frontend widget
↓
Token generated
↓
Token sent to backend
↓
Backend calls Cloudflare Siteverify API
↓
Human verified or rejected

---

# Middleware Protection

Middleware file:

src/middleware.ts

Responsibilities:

- Read JWT cookie
- Verify token
- Protect routes
- Redirect unauthorized users

Protected routes:

/shop

Middleware flow:

Request
↓
Middleware executes
↓
JWT validated
↓
Allow or redirect

---

# Product CRUD System

Products API:

/api/products

Methods:

GET
POST
PUT
DELETE

Admin-only methods:
- POST
- PUT
- DELETE

Authorization validation occurs server-side.

---

# CI/CD Documentation

The project uses GitHub Actions CI.

Pipeline file:

.github/workflows/ci.yml

CI steps:

Push code
↓
Install dependencies
↓
Run lint
↓
Run build
↓
Pass or fail

Deployment handled by Vercel.

Deployment flow:

Push to main
↓
Vercel detects changes
↓
Automatic deployment
↓
Production updated

---

# Environment Variables

.env.local

Variables:

EMAIL_USER=
EMAIL_APP_PASSWORD=

JWT_SECRET=

NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

Purpose:

EMAIL_USER
- Gmail sender account

EMAIL_APP_PASSWORD
- Gmail App Password for SMTP

JWT_SECRET
- JWT signing secret

NEXT_PUBLIC_TURNSTILE_SITE_KEY
- frontend Turnstile widget key

TURNSTILE_SECRET_KEY
- backend Turnstile verification key

---

# Folder Documentation

## src/app

Contains:
- routes
- layouts
- pages
- API routes

---

## src/app/api

Contains backend API endpoints.

Examples:
- login
- verify-otp
- logout
- products

---

## src/components

Reusable frontend UI components.

Example:
- ProductsClient

---

## src/lib

Core backend/business logic.

Contains:
- JWT helpers
- email helpers
- OTP storage
- product storage
- Turnstile verification
- authentication helpers

---

## src/types

TypeScript shared types/interfaces.

Examples:
- Product
- User
- Role

---

# Security Measures

Implemented security:

- bcrypt password hashing
- JWT authentication
- HTTP-only cookies
- Middleware protection
- Cloudflare Turnstile
- OTP verification
- Role authorization
- Server-side access control

---

# Production Deployment

Deployment platform:
- Vercel

Production URL:

https://moemenfinal.vercel.app

Production flow:

GitHub push
↓
Vercel auto deploy
↓
Online production update

---

# Future Improvements

Potential upgrades:

- Database integration
- MongoDB/PostgreSQL
- Persistent sessions
- Refresh tokens
- Registration system
- Password reset
- Admin dashboard improvements
- Image upload system
- Product categories
- Search/filter system
- Rate limiting
- Logging system

---

# Conclusion

Brown Shop demonstrates a production-style authentication architecture using Next.js full-stack capabilities.

The project combines:
- frontend
- backend
- authentication
- authorization
- middleware
- cloud security
- CI/CD
- deployment

inside one modern full-stack application.

EOF