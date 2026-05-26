export const demoExpenses = [
  {
    id: 'exp-1',
    title: 'Adobe Creative Cloud',
    amount: 59,
    category: { id: 'cat-1', name: 'Work' },
    date: new Date().toISOString(),
    paymentMethod: 'Card',
    notes: 'Design subscription'
  },
  {
    id: 'exp-2',
    title: 'Groceries',
    amount: 120,
    category: { id: 'cat-2', name: 'Food' },
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    paymentMethod: 'Debit Card',
    notes: 'Weekly supermarket run'
  },
  {
    id: 'exp-3',
    title: 'Ride sharing',
    amount: 32,
    category: { id: 'cat-3', name: 'Travel' },
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    paymentMethod: 'Wallet',
    notes: 'Airport commute'
  }
];

export const demoTodos = [
  {
    id: 'todo-1',
    title: 'Review monthly budget',
    description: 'Check category limits and adjust savings rate.',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    status: 'IN_PROGRESS',
    priority: 'HIGH'
  },
  {
    id: 'todo-2',
    title: 'Upload receipts',
    description: 'Save all business receipts before Friday.',
    dueDate: new Date(Date.now() + 86400000 * 4).toISOString(),
    status: 'TODO',
    priority: 'MEDIUM'
  },
  {
    id: 'todo-3',
    title: 'Cancel unused subscription',
    description: 'Remove the duplicate analytics plan.',
    dueDate: new Date(Date.now() - 86400000).toISOString(),
    status: 'DONE',
    priority: 'LOW'
  }
];

export const demoInsights = [
  'You spent 18% more on shopping this month than last month.',
  'Your food expenses are trending downward, which is improving cash flow.',
  'Consider setting a weekly travel cap to control ride-sharing spikes.'
];