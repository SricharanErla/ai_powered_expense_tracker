import { useMemo, useState } from 'react';
import { Filter, Plus, Search, SlidersHorizontal, Trash2, Pencil } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SectionHeading from '../components/SectionHeading';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate } from '../utils/format';

const emptyExpense = {
  title: '',
  amount: '',
  categoryName: 'Other',
  date: new Date().toISOString().slice(0, 10),
  paymentMethod: 'Card',
  notes: ''
};

export default function ExpensesPage() {
  const { expenses, createExpense, updateExpense, deleteExpense } = useApp();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sortMode, setSortMode] = useState('latest');
  const [editingExpense, setEditingExpense] = useState(null);
  const [form, setForm] = useState(emptyExpense);

  const categories = ['All', ...new Set(expenses.map((expense) => expense.category?.name || expense.categoryName || 'Other'))];

  const filteredExpenses = useMemo(() => {
    const next = expenses.filter((expense) => {
      const categoryName = expense.category?.name || expense.categoryName || 'Other';
      const matchesQuery = [expense.title, expense.notes, categoryName].join(' ').toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === 'All' || categoryName === category;
      return matchesQuery && matchesCategory;
    });

    if (sortMode === 'amount') {
      return [...next].sort((left, right) => right.amount - left.amount);
    }

    return [...next].sort((left, right) => new Date(right.date) - new Date(left.date));
  }, [expenses, query, category, sortMode]);

  const openCreate = () => {
    setForm(emptyExpense);
    setEditingExpense(null);
  };

  const openEdit = (expense) => {
    setEditingExpense(expense);
    setForm({
      title: expense.title,
      amount: expense.amount,
      categoryName: expense.category?.name || expense.categoryName || 'Other',
      date: expense.date.slice(0, 10),
      paymentMethod: expense.paymentMethod || 'Card',
      notes: expense.notes || ''
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      amount: Number(form.amount),
      categoryName: form.categoryName
    };

    if (editingExpense) {
      await updateExpense({ ...editingExpense, ...payload });
    } else {
      await createExpense(payload);
    }

    setForm(emptyExpense);
    setEditingExpense(null);
  };

  return (
    <div className="space-y-8 pb-10">
      <GlassCard>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionHeading eyebrow="Expense management" title="Create, track, and refine spending" description="Search, filter, sort, and manage expenses with a clean workflow." />
          <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950">
            <Plus className="h-4 w-4" /> New expense
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
            <Search className="h-4 w-4" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search expenses" className="w-full border-0 bg-transparent p-0 text-sm text-white focus:ring-0" />
          </label>
          <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
            <Filter className="h-4 w-4" />
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="w-full border-0 bg-transparent p-0 text-sm text-white focus:ring-0">
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
            <SlidersHorizontal className="h-4 w-4" />
            <select value={sortMode} onChange={(event) => setSortMode(event.target.value)} className="w-full border-0 bg-transparent p-0 text-sm text-white focus:ring-0">
              <option value="latest">Sort by latest</option>
              <option value="amount">Sort by amount</option>
            </select>
          </label>
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-400">
            Showing {filteredExpenses.length} of {expenses.length} expenses
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-white/8">
          <table className="min-w-full divide-y divide-white/8 text-left text-sm">
            <thead className="bg-white/5 text-slate-400">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Payment</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8 bg-slate-950/40">
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="transition hover:bg-white/5">
                  <td className="px-4 py-4 text-white">{expense.title}</td>
                  <td className="px-4 py-4 text-slate-300">{expense.category?.name || expense.categoryName || 'Other'}</td>
                  <td className="px-4 py-4 font-semibold text-white">{formatCurrency(expense.amount)}</td>
                  <td className="px-4 py-4 text-slate-300">{formatDate(expense.date)}</td>
                  <td className="px-4 py-4 text-slate-300">{expense.paymentMethod}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(expense)} className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 hover:text-white">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => deleteExpense({ id: expense.id })} className="rounded-xl border border-white/10 bg-white/5 p-2 text-rose-300 hover:text-rose-200">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <GlassCard>
        <SectionHeading eyebrow={editingExpense ? 'Update expense' : 'Create expense'} title={editingExpense ? 'Edit an existing transaction' : 'Add a new expense'} description="Use the form below to create or update spending records." />
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required placeholder="Expense title" className="rounded-2xl border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500" />
          <input value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} required type="number" min="0" placeholder="Amount" className="rounded-2xl border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500" />
          <input value={form.categoryName} onChange={(event) => setForm({ ...form, categoryName: event.target.value })} required placeholder="Category" className="rounded-2xl border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500" />
          <input value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} required type="date" className="rounded-2xl border-white/10 bg-white/5 px-4 py-3 text-white" />
          <input value={form.paymentMethod} onChange={(event) => setForm({ ...form, paymentMethod: event.target.value })} required placeholder="Payment method" className="rounded-2xl border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500" />
          <input value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} placeholder="Notes" className="rounded-2xl border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500" />
          <div className="md:col-span-2 xl:col-span-3">
            <button type="submit" className="rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950">
              {editingExpense ? 'Save changes' : 'Create expense'}
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}