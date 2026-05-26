import { useMemo, useState } from 'react';
import { CheckCircle2, CircleDashed, Plus, Search, Trash2, Pencil } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SectionHeading from '../components/SectionHeading';
import { useApp } from '../context/AppContext';
import { formatDate } from '../utils/format';

const emptyTodo = {
  title: '',
  description: '',
  dueDate: new Date().toISOString().slice(0, 10),
  status: 'TODO',
  priority: 'MEDIUM'
};

export default function TodosPage() {
  const { todos, createTodo, updateTodo, deleteTodo, toggleTodoStatus } = useApp();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [editingTodo, setEditingTodo] = useState(null);
  const [form, setForm] = useState(emptyTodo);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesQuery = [todo.title, todo.description, todo.priority].join(' ').toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === 'All' || todo.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [todos, query, status]);

  const openCreate = () => {
    setForm(emptyTodo);
    setEditingTodo(null);
  };

  const openEdit = (todo) => {
    setEditingTodo(todo);
    setForm({
      title: todo.title,
      description: todo.description || '',
      dueDate: todo.dueDate?.slice(0, 10),
      status: todo.status,
      priority: todo.priority
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editingTodo) {
      await updateTodo({ ...editingTodo, ...form });
    } else {
      await createTodo(form);
    }
    openCreate();
  };

  return (
    <div className="space-y-8 pb-10">
      <GlassCard>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionHeading eyebrow="Todo management" title="Keep financial tasks on track" description="Track planning tasks, deadlines, priorities, and completion status." />
          <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950">
            <Plus className="h-4 w-4" /> New todo
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
            <Search className="h-4 w-4" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search todos" className="w-full border-0 bg-transparent p-0 text-sm text-white focus:ring-0" />
          </label>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white">
            <option>All</option>
            <option>TODO</option>
            <option>IN_PROGRESS</option>
            <option>DONE</option>
          </select>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredTodos.map((todo) => (
            <article key={todo.id} className="rounded-3xl border border-white/8 bg-white/5 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-white">{todo.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{todo.description}</p>
                </div>
                <button onClick={() => toggleTodoStatus(todo)} className="rounded-xl border border-white/10 bg-white/5 p-2 text-emerald-300">
                  {todo.status === 'DONE' ? <CheckCircle2 className="h-4 w-4" /> : <CircleDashed className="h-4 w-4" />}
                </button>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-300">
                <span className="rounded-full bg-white/10 px-3 py-1">{todo.priority}</span>
                <span className="rounded-full bg-white/10 px-3 py-1">{todo.status}</span>
                <span className="rounded-full bg-white/10 px-3 py-1">Due {formatDate(todo.dueDate)}</span>
              </div>
              <div className="mt-5 flex gap-2">
                <button onClick={() => openEdit(todo)} className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 hover:text-white">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => deleteTodo({ id: todo.id })} className="rounded-xl border border-white/10 bg-white/5 p-2 text-rose-300 hover:text-rose-200">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <SectionHeading eyebrow={editingTodo ? 'Update todo' : 'Create todo'} title={editingTodo ? 'Refine an existing task' : 'Add a new task'} description="Use the form below to manage financial and planning work." />
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required placeholder="Task title" className="rounded-2xl border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500" />
          <input value={form.dueDate} onChange={(event) => setForm({ ...form, dueDate: event.target.value })} required type="date" className="rounded-2xl border-white/10 bg-white/5 px-4 py-3 text-white" />
          <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} className="rounded-2xl border-white/10 bg-white/5 px-4 py-3 text-white">
            <option>TODO</option>
            <option>IN_PROGRESS</option>
            <option>DONE</option>
          </select>
          <select value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value })} className="rounded-2xl border-white/10 bg-white/5 px-4 py-3 text-white">
            <option>LOW</option>
            <option>MEDIUM</option>
            <option>HIGH</option>
          </select>
          <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Description" className="min-h-28 rounded-2xl border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 md:col-span-2 xl:col-span-3" />
          <div className="md:col-span-2 xl:col-span-3">
            <button type="submit" className="rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950">
              {editingTodo ? 'Save changes' : 'Create todo'}
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}