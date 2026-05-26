import { NavLink } from 'react-router-dom';
import { BarChart3, FolderKanban, Gauge, Sparkles, Settings, Wallet, ClipboardList, PanelLeftOpen } from 'lucide-react';
import { classNames } from '../utils/format';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: Gauge },
  { to: '/expenses', label: 'Expenses', icon: Wallet },
  { to: '/todos', label: 'Todos', icon: ClipboardList },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/insights', label: 'AI Insights', icon: Sparkles },
  { to: '/settings', label: 'Settings', icon: Settings }
];

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <aside className={classNames('glass-strong flex h-screen flex-col border-r border-white/5 px-4 py-5 transition-all', collapsed ? 'w-[92px]' : 'w-[280px]')}>
      <div className="mb-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-sky-400 to-emerald-400 text-slate-950 shadow-glow">
            <FolderKanban className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Expense Tracker</p>
              <p className="text-sm font-medium text-white">Fintech Dashboard</p>
            </div>
          )}
        </div>
        <button onClick={onToggle} className="rounded-xl border border-white/10 p-2 text-slate-400 transition hover:text-white">
          <PanelLeftOpen className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              classNames(
                'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-all',
                isActive ? 'bg-white/10 text-white shadow-glow' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              )
            }
          >
            <Icon className="h-4 w-4" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {!collapsed && (
        <div className="mt-6 rounded-3xl bg-gradient-to-br from-sky-500/20 to-emerald-500/20 p-4 text-sm text-slate-300">
          <p className="font-semibold text-white">Smart budgeting</p>
          <p className="mt-2 text-slate-400">Track spending, manage tasks, and surface actionable insights from your financial data.</p>
        </div>
      )}
    </aside>
  );
}