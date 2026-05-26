# Expense Tracker

A modern serverless AI-powered expense tracker built with React, Vite, Tailwind CSS, Node.js serverless functions, Prisma, and Neon PostgreSQL.

## Features

- Expense CRUD with search, filters, sorting, pagination, and export
- Todo CRUD with priorities, status, and filtering
- Fintech-style dashboard with charts and summary cards
- AI-inspired spending insights endpoint
- Serverless API architecture for Vercel
- Prisma ORM with Neon PostgreSQL

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router DOM, Axios, Framer Motion, Recharts
- Backend: Node.js serverless functions
- Database: Neon PostgreSQL
- ORM: Prisma

## Setup

1. Copy `.env.example` to `.env` and set your Neon database URL.
2. Install dependencies with `npm install`.
3. Generate Prisma client with `npm run prisma:generate`.
4. Run migrations with `npm run prisma:migrate`.
5. Start the app with `npm run dev`.

## Deployment

Deploy the repository to Vercel with the default build command `npm run build`.
Set `DATABASE_URL` in the Vercel environment variables.
The backend is deployed from the `api/` folder as Vercel Serverless Functions, so each route is available directly under `/api/*` in production.

Before deploying, ensure Prisma is generated during install and the Neon schema has been applied with `prisma db push` or your preferred migration flow.

### Production backend checklist

1. Set `DATABASE_URL` in Vercel.
2. Set `OPENAI_API_KEY` if you later connect a real AI provider.
3. Deploy the repository to Vercel so the `api/` folder becomes the backend.
4. Run `prisma db push` against Neon before the first production request.

## API Routes

- `GET /api/expenses/getAll`
- `POST /api/expenses/create`
- `PUT /api/expenses/update`
- `DELETE /api/expenses/delete`
- `GET /api/todos/getAll`
- `POST /api/todos/create`
- `PUT /api/todos/update`
- `DELETE /api/todos/delete`
- `GET /api/analytics/insights`