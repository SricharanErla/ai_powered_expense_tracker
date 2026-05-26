import { prisma } from '../utils/prisma.js';
import { allowCors, expenseSchema, readRequestBody, sendJson, serializeExpense } from '../utils/helpers.js';

export default async function handler(req, res) {
  if (allowCors(req, res)) {
    return;
  }

  if (req.method !== 'PUT') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  const body = expenseSchema.parse(readRequestBody(req));
  if (!body.id) {
    return sendJson(res, 400, { error: 'Expense id is required' });
  }

  const category = await prisma.category.upsert({
    where: { name: body.categoryName },
    update: {},
    create: { name: body.categoryName }
  });

  const expense = await prisma.expense.update({
    where: { id: body.id },
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

  return sendJson(res, 200, { expense: serializeExpense(expense) });
}