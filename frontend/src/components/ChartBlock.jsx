import { AreaChart, Area, BarChart, Bar, Cell, PieChart, Pie, ResponsiveContainer, CartesianGrid, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import GlassCard from './GlassCard';
import { categoryPalette, formatCurrency, monthLabel, toMonthKey } from '../utils/format';

const tooltipStyle = {
  background: 'rgba(15, 23, 42, 0.95)',
  border: '1px solid rgba(148, 163, 184, 0.18)',
  borderRadius: 16,
  color: '#fff'
};

export function buildCategoryData(expenses) {
  const bucket = new Map();
  expenses.forEach((expense) => {
    const categoryName = expense.category?.name || expense.categoryName || 'Other';
    bucket.set(categoryName, (bucket.get(categoryName) || 0) + Number(expense.amount || 0));
  });
  return [...bucket.entries()].map(([name, value]) => ({ name, value }));
}

export function buildMonthlyData(expenses) {
  const bucket = new Map();
  expenses.forEach((expense) => {
    const key = toMonthKey(expense.date);
    bucket.set(key, (bucket.get(key) || 0) + Number(expense.amount || 0));
  });
  return [...bucket.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([month, value]) => ({ month: monthLabel(`${month}-01`), amount: value }));
}

export default function ChartBlock({ expenses }) {
  const categoryData = buildCategoryData(expenses);
  const monthlyData = buildMonthlyData(expenses);

  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <GlassCard className="xl:col-span-1">
        <h3 className="text-lg font-semibold text-white">Category Breakdown</h3>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={72} outerRadius={112} paddingAngle={4}>
                {categoryData.map((entry) => (
                  <Cell key={entry.name} fill={categoryPalette[entry.name] || '#60a5fa'} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(value) => formatCurrency(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard className="xl:col-span-2">
        <h3 className="text-lg font-semibold text-white">Monthly Spending Trend</h3>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.36} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={tooltipStyle} formatter={(value) => formatCurrency(value)} />
              <Area type="monotone" dataKey="amount" stroke="#38bdf8" fill="url(#trendFill)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard className="xl:col-span-3">
        <h3 className="text-lg font-semibold text-white">Expense by Category</h3>
        <div className="mt-4 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={tooltipStyle} formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="value" radius={[14, 14, 0, 0]}>
                {categoryData.map((entry) => (
                  <Cell key={entry.name} fill={categoryPalette[entry.name] || '#60a5fa'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
}