import { prisma } from '../utils/prisma.js';
import { allowCors, sendJson, serializeExpense } from '../utils/helpers.js';

export default async function handler(req, res) {
  if (allowCors(req, res)) {
    return;
  }

  const {
    search = '',
    category = '',
    from = '',
    to = '',
    sort = 'latest',
    order = 'desc',
    page = '1',
    limit = '100'
  } = req.query || {};

  const where = {
    ...(search
      ? {
          OR: [
            { title: { contains: String(search), mode: 'insensitive' } },
            { notes: { contains: String(search), mode: 'insensitive' } },
            { category: { name: { contains: String(search), mode: 'insensitive' } } }
          ]
        }
      : {}),
    ...(category && category !== 'All' ? { category: { name: { equals: String(category), mode: 'insensitive' } } } : {}),
    ...(from || to
      ? {
          date: {
            ...(from ? { gte: new Date(String(from)) } : {}),
            ...(to ? { lte: new Date(String(to)) } : {})
          }
        }
      : {})
  };

  const orderBy =
    sort === 'amount'
      ? { amount: String(order).toLowerCase() === 'asc' ? 'asc' : 'desc' }
      : { date: String(order).toLowerCase() === 'asc' ? 'asc' : 'desc' };

  const take = Math.max(1, Number(limit) || 100);
  const skip = (Math.max(1, Number(page) || 1) - 1) * take;

  const [items, total] = await Promise.all([
    prisma.expense.findMany({
      where,
      include: { category: true },
      orderBy,
      skip,
      take
    }),
    prisma.expense.count({ where })
  ]);

  sendJson(res, 200, {
    items: items.map(serializeExpense),
    total,
    page: Number(page) || 1,
    limit: take
  });
}