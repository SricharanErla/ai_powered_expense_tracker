export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});

export const formatCurrency = (amount, currency = 'USD') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(Number(amount || 0));

export const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

export const monthLabel = (dateValue) =>
  new Date(dateValue).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

export const toMonthKey = (dateValue) => {
  const date = new Date(dateValue);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

export const startOfMonth = () => {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
};

export const classNames = (...parts) => parts.filter(Boolean).join(' ');

export const categoryPalette = {
  Food: '#f97316',
  Housing: '#3b82f6',
  Shopping: '#ec4899',
  Travel: '#14b8a6',
  Health: '#22c55e',
  Work: '#eab308',
  Bills: '#8b5cf6',
  Education: '#06b6d4',
  Other: '#94a3b8'
};