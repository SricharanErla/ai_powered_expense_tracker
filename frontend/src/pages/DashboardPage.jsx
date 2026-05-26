import { AlertTriangle, CircleCheckBig, CreditCard, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatCard from '../components/StatCard';
import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';
import ChartBlock from '../components/ChartBlock';
import { formatCurrency, formatDate } from '../utils/format';

export default function DashboardPage() {
  const { metrics, expenses, todos, insights } = useApp();

  const recentTransactions = [...expenses].slice(0, 5);
  const todoSummary = {
    done: todos.filter((todo) => todo.status === 'DONE').length,
    pending: todos.filter((todo) => todo.status !== 'DONE').length
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total expenses" value={formatCurrency(metrics.totalExpenses)} description="All-time spend tracked across categories." icon={CreditCard} />
        <StatCard label="Total income" value={formatCurrency(metrics.income)} description="Projected income benchmark for comparison." icon={TrendingUp} accent="from-emerald-400 to-lime-300" />
        <StatCard label="Monthly expenses" value={formatCurrency(metrics.monthlyExpenses)} description="Current month burn rate." icon={AlertTriangle} accent="from-orange-400 to-amber-300" />
        <StatCard label="Todos completed" value={`${todoSummary.done}/${todos.length}`} description="Task progress at a glance." icon={CircleCheckBig} accent="from-cyan-400 to-sky-300" />
      </div>

      <ChartBlock expenses={expenses} />

      <div className="grid gap-6 xl:grid-cols-3">
        <GlassCard className="xl:col-span-2">
          <SectionHeading
            eyebrow="Recent transactions"
            title="Latest spending activity"
            description="The newest expenses are surfaced here for quick review and editing."
          />
          <div className="mt-6 space-y-3">
            {recentTransactions.map((expense) => (
              <div key={expense.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/5 px-4 py-4">
                <div>
                  <p className="font-medium text-white">{expense.title}</p>
                  <p className="text-sm text-slate-400">
                    {expense.category?.name || expense.categoryName || 'Other'} · {formatDate(expense.date)}
                  </p>
                </div>
                <p className="text-base font-semibold text-white">{formatCurrency(expense.amount)}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <SectionHeading eyebrow="Todo summary" title="Task health" description="A concise view of high-priority work remaining." />
          <div className="mt-6 space-y-4 text-sm text-slate-300">
            <div className="rounded-2xl bg-white/5 px-4 py-4">
              <p className="text-slate-400">Completed tasks</p>
              <p className="mt-2 text-2xl font-semibold text-white">{todoSummary.done}</p>
            </div>
            <div className="rounded-2xl bg-white/5 px-4 py-4">
              <p className="text-slate-400">Open tasks</p>
              <p className="mt-2 text-2xl font-semibold text-white">{todoSummary.pending}</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-sky-500/20 to-emerald-500/20 px-4 py-4">
              <p className="text-slate-300">AI insight</p>
              <p className="mt-2 text-base text-white">{insights[0]}</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}