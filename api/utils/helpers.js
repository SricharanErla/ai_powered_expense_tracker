import { z } from 'zod';

export const expenseSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2),
  amount: z.union([z.number(), z.string()]).transform((value) => Number(value)).pipe(z.number().positive()),
  categoryName: z.string().min(2),
  date: z.string().min(1),
  paymentMethod: z.string().min(1),
  notes: z.string().optional().default('')
});

export const todoSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2),
  description: z.string().optional().default(''),
  dueDate: z.string().min(1),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).default('TODO'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM')
});

export const parseJsonBody = (event) => {
  if (!event?.body) {
    return {};
  }

  try {
    return JSON.parse(event.body);
  } catch {
    return {};
  }
};

export const readRequestBody = (req) => {
  if (!req?.body) {
    return {};
  }

  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  return req.body;
};

export const toNumber = (value) => Number(value || 0);

export const serializeCategory = (category) =>
  category
    ? {
        ...category,
        createdAt: category.createdAt?.toISOString?.() || category.createdAt,
        updatedAt: category.updatedAt?.toISOString?.() || category.updatedAt
      }
    : null;

export const serializeExpense = (expense) => ({
  ...expense,
  amount: Number(expense.amount),
  date: expense.date.toISOString(),
  createdAt: expense.createdAt.toISOString(),
  updatedAt: expense.updatedAt.toISOString(),
  category: serializeCategory(expense.category)
});

export const serializeTodo = (todo) => ({
  ...todo,
  dueDate: todo.dueDate.toISOString(),
  createdAt: todo.createdAt.toISOString(),
  updatedAt: todo.updatedAt.toISOString()
});

export const sendJson = (res, statusCode, payload) => {
  res.status(statusCode).setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  return res.json(payload);
};

export const allowCors = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }

  return false;
};