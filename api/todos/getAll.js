import { prisma } from '../utils/prisma.js';
import { allowCors, sendJson, serializeTodo } from '../utils/helpers.js';

export default async function handler(req, res) {
  if (allowCors(req, res)) {
    return;
  }

  const {
    search = '',
    status = '',
    priority = '',
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
            { description: { contains: String(search), mode: 'insensitive' } }
          ]
        }
      : {}),
    ...(status && status !== 'All' ? { status: String(status) } : {}),
    ...(priority && priority !== 'All' ? { priority: String(priority) } : {}),
    ...(from || to
      ? {
          dueDate: {
            ...(from ? { gte: new Date(String(from)) } : {}),
            ...(to ? { lte: new Date(String(to)) } : {})
          }
        }
      : {})
  };

  const orderBy =
    sort === 'priority'
      ? { priority: String(order).toLowerCase() === 'asc' ? 'asc' : 'desc' }
      : { dueDate: String(order).toLowerCase() === 'asc' ? 'asc' : 'desc' };

  const take = Math.max(1, Number(limit) || 100);
  const skip = (Math.max(1, Number(page) || 1) - 1) * take;

  const [items, total] = await Promise.all([
    prisma.todo.findMany({ where, orderBy, skip, take }),
    prisma.todo.count({ where })
  ]);

  sendJson(res, 200, {
    items: items.map(serializeTodo),
    total,
    page: Number(page) || 1,
    limit: take
  });
}