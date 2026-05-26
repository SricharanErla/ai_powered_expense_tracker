import { prisma } from '../utils/prisma.js';
import { allowCors, expenseSchema, readRequestBody, sendJson, serializeExpense } from '../utils/helpers.js';

export default async function handler(req, res) {
  if (allowCors(req, res)) {
    return;
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  const body = expenseSchema.parse(readRequestBody(req));
  const category = await prisma.category.upsert({
    where: { name: body.categoryName },
    update: {},
    create: { name: body.categoryName }
  });

  const expense = await prisma.expense.create({
    data: {
      title: body.title,
      amount: body.amount,
      date: new Date(body.date),
      paymentMethod: body.paymentMethod,
      notes: body.notes || null,
      categoryId: category.id
    },
    include: { category: true }
  });

  return sendJson(res, 201, { expense: serializeExpense(expense) });
}