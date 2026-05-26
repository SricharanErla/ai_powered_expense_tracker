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