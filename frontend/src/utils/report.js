import { formatDate } from './format';

export const downloadCsv = (expenses) => {
  const rows = [
    ['Title', 'Amount', 'Category', 'Date', 'Payment Method', 'Notes'],
    ...expenses.map((expense) => [
      expense.title,
      expense.amount,
      expense.category?.name || expense.categoryName || 'Other',
      formatDate(expense.date),
      expense.paymentMethod || '',
      (expense.notes || '').replace(/\n/g, ' ')
    ])
  ];

  const blob = new Blob([rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n')], {
    type: 'text/csv;charset=utf-8;'
  });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `expense-report-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
};