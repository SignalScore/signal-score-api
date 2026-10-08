# Signal Score API

A backend API project integrating Next.js API routes with NestJS scaffolding and Prisma ORM for data management.

## Project Overview

Signal Score API is a backend service handling user authentication, profile management, and idea sharing, designed and built on the Stellar wave. It operates as a hybrid architecture containing both Next.js App Router API routes (`route.ts`) and a NestJS application structure. Data persistence is managed via PostgreSQL and the Prisma ORM.

The system is intended to serve as the backend for an application where users can register, manage their profiles, create crypto/trading ideas, vote on ideas, and leave comments.

## Table of Contents

- [Key Features](#key-features)
- [Built With / Technology Stack](#built-with--technology-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Testing](#testing)
- [API](#api)
- [Database / Data Storage](#database--data-storage)
- [Security](#security)

## Key Features

- **User Authentication:** Registration, login, logout, password reset via JWT and Passport.
- **Content Management:** Create, view, and interact with ideas and comments.
- **Voting System:** Endpoints to support voting on published ideas.
- **Relational Data Persistence:** Structured schemas for users, sessions, ideas, categories, tags, comments, votes, follows, bookmarks, subscriptions, and more.

## Built With / Technology Stack

**Backend**
- [Next.js](https://nextjs.org/) (App Router for API Endpoints)
- [NestJS](https://nestjs.com/) (Application scaffolding)
- [TypeScript](https://www.typescriptlang.org/)

**Database & ORM**
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)

**Authentication & Security**
- Passport
- bcrypt (Password hashing)
- zod (Data validation)

**Testing**
- Jest
- Supertest

## Architecture

The project contains a dual-framework setup:
1. **Next.js API Routes:** Located in `src/api/`, utilizing the App Router `route.ts` convention for handling HTTP requests.
2. **NestJS Scaffold:** Located at the root of `src/` (`main.ts`, `app.module.ts`), providing alternative server initialization.

Shared utilities such as database clients, rate limiting, and validators are located in `src/lib/`.

## Project Structure

```text
.
├── src/
│   ├── api/          # Next.js API routes (auth, ideas, users)
│   ├── lib/          # Shared utilities (db, auth, rate-limit, requests)
│   ├── prisma/       # Prisma schema (schema.prisma)
│   ├── main.ts       # NestJS application entry point
│   ├── app.module.ts # NestJS root module
│   └── app.controller.ts # NestJS base controller
├── test/             # e2e test configuration and suites
├── next.config.mjs   # Next.js configuration
├── nest-cli.json     # NestJS CLI configuration
└── package.json      # Dependencies and scripts
```

## Prerequisites

- Node.js
- PostgreSQL database
- npm

## Installation

1. Clone the repository and navigate into the project:
   ```sh
   git clone https://github.com/SignalScore/signal-score-api.git
   cd signal-score-api
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

## Environment Variables

Copy `.env.example` to `.env` and configure the required variables. Some of the primary variables include:

- `DATABASE_URL`: Connection string for PostgreSQL.
- `JWT_SECRET`: Secret key for JWT signing.
- `STRIPE_SECRET_KEY` / `STRIPE_PUBLISHABLE_KEY`: Keys for Stripe integrations.
- `COINGECKO_API_KEY` / `COINMARKETCAP_API_KEY`: External market data APIs.
- `SMTP_*`: Email server configuration.
- `AWS_*`: S3 File upload configuration.
- `REDIS_URL`: Redis caching URL.

*Note: Never expose `.env` in public repositories.*

## Running the Project

Because the project contains both NestJS and Next.js structures, you can run the application depending on your targeted framework:

**For NestJS:**
```sh
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run build
npm run start:prod
```

**For Next.js API Routes:**
```sh
npx next dev
```

## Testing

The project uses Jest for unit and end-to-end testing.

```sh
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## API

The following API routes are implemented under the Next.js API structure (`src/api/`):

### Auth
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication
- `POST /api/auth/logout` - Terminate session
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Users
- `/api/users/[id]` - User profile operations

### Ideas
- `/api/ideas` - Core idea management
- `/api/ideas/[id]/vote` - Vote on an idea
- `/api/ideas/[id]/comments` - Comment on an idea

## Database / Data Storage

The project uses Prisma to interact with a PostgreSQL database. The schema (`src/prisma/schema.prisma`) includes the following core models:

- **User**: Core user profiles, authentication state, and relations to interactions.
- **Idea**: User-generated market ideas and posts.
- **Comment** & **Vote**: User interactions with ideas.
- **Category** & **Tag**: Content categorization.
- **Subscription**: Premium access management.
- **MarketData**: Cryptocurrency price feeds and metadata.

## Security

- Passwords are cryptographically hashed using `bcrypt` before storage.
- Request validation is implemented via `zod` to ensure strict schema enforcement.
- Rate limiting middleware exists in `src/lib/rate-limit.ts` to prevent abuse.
- Next.js Middleware (`src/api/middleware/security.ts` and `src/api/middleware.ts`) is present for request interception and security headers.
