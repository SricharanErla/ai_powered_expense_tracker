import { Bell, Search, Download } from 'lucide-react';
import { formatCurrency } from '../utils/format';
import { useApp } from '../context/AppContext';

export default function Topbar({ title, subtitle, onExport }) {
  const { metrics } = useApp();

  return (
    <header className="glass-strong flex flex-wrap items-center justify-between gap-4 rounded-3xl px-5 py-4 shadow-glow">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{title}</p>
        <h1 className="mt-1 text-2xl font-semibold text-white">{subtitle}</h1>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-400 md:flex">
          <Search className="h-4 w-4" />
          <span>Quick search across expenses and todos</span>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
          Monthly: {formatCurrency(metrics.monthlyExpenses)}
        </div>
        <button onClick={onExport} className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]">
          <Download className="h-4 w-4" />
          Export CSV
        </button>
        <button className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:text-white">
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}