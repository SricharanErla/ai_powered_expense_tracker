import { prisma } from '../utils/prisma.js';
import { allowCors, sendJson } from '../utils/helpers.js';

const currentMonthKey = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

const monthKey = (value) => {
  const date = new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

export default async function handler(req, res) {
  if (allowCors(req, res)) {
    return;
  }

  if (req.method !== 'GET') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  const [expenses, todos] = await Promise.all([
    prisma.expense.findMany({ include: { category: true }, orderBy: { date: 'desc' } }),
    prisma.todo.findMany({ orderBy: { dueDate: 'asc' } })
  ]);

  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const currentMonthExpenses = expenses.filter((expense) => monthKey(expense.date) === currentMonthKey());
  const currentMonthTotal = currentMonthExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const previousMonthTotal = expenses
    .filter((expense) => {
      const date = new Date(expense.date);
      const previous = new Date();
      previous.setMonth(previous.getMonth() - 1);
      return monthKey(expense.date) === `${previous.getFullYear()}-${String(previous.getMonth() + 1).padStart(2, '0')}`;
    })
    .reduce((sum, expense) => sum + Number(expense.amount), 0);

  const categoryTotals = expenses.reduce((map, expense) => {
    const name = expense.category?.name || 'Other';
    map.set(name, (map.get(name) || 0) + Number(expense.amount));
    return map;
  }, new Map());

  const sortedCategories = [...categoryTotals.entries()].sort((left, right) => right[1] - left[1]);
  const topCategory = sortedCategories[0]?.[0] || 'Other';
  const topCategoryValue = sortedCategories[0]?.[1] || 0;
  const pendingTodos = todos.filter((todo) => todo.status !== 'DONE').length;
  const highPriorityOpen = todos.filter((todo) => todo.status !== 'DONE' && todo.priority === 'HIGH').length;
  const completedRate = todos.length ? Math.round((todos.filter((todo) => todo.status === 'DONE').length / todos.length) * 100) : 0;
  const variation = previousMonthTotal ? Math.round(((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100) : 0;

  const insights = [
    `You spent ${Math.abs(variation)}% ${variation >= 0 ? 'more' : 'less'} than last month.`,
    `Your biggest category is ${topCategory} at $${topCategoryValue.toFixed(0)}.`,
    pendingTodos ? `${pendingTodos} todos are still open, including ${highPriorityOpen} high-priority items.` : 'All todos are completed, which keeps the workflow clean.',
    completedRate > 0 ? `Todo completion is at ${completedRate}%.` : 'Set one weekly budgeting task to build momentum.'
  ];

  try {
    await prisma.analyticsSnapshot.create({
      data: {
        type: 'insights',
        payload: {
          totalExpenses,
          currentMonthTotal,
          variation,
          topCategory,
          completedRate
        }
      }
    });
  } catch {
    // Snapshot persistence is best-effort.
  }

  return sendJson(res, 200, {
    insights,
    summary: {
      totalExpenses,
      currentMonthTotal,
      variation,
      topCategory,
      pendingTodos,
      highPriorityOpen,
      completedRate
    }
  });
}