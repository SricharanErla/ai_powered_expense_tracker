import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { useApp } from '../context/AppContext';
import { downloadCsv } from '../utils/report';

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { expenses } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
        <main className="min-h-screen flex-1 px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-5">
            <Topbar title="Expense Intelligence" subtitle="Modern financial control center" onExport={() => downloadCsv(expenses)} />
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}