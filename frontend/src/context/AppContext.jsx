import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createExpense, createTodo, deleteExpense, deleteTodo, fetchExpenses, fetchInsights, fetchTodos, updateExpense, updateTodo } from '../services/api';
import { demoExpenses, demoInsights, demoTodos } from '../data/demo';
import { useToast } from './ToastContext';
import { toMonthKey } from '../utils/format';

const AppContext = createContext(null);

const sortByLatest = (items, key = 'date') => [...items].sort((left, right) => new Date(right[key]) - new Date(left[key]));

export function AppProvider({ children }) {
  const { pushToast } = useToast();
  const [expenses, setExpenses] = useState(demoExpenses);
  const [todos, setTodos] = useState(demoTodos);
  const [insights, setInsights] = useState(demoInsights);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [expenseResponse, todoResponse, insightResponse] = await Promise.allSettled([
        fetchExpenses(),
        fetchTodos(),
        fetchInsights()
      ]);

      if (expenseResponse.status === 'fulfilled') {
        setExpenses(sortByLatest(expenseResponse.value.data.items || []));
      }

      if (todoResponse.status === 'fulfilled') {
        setTodos(sortByLatest(todoResponse.value.data.items || [], 'dueDate'));
      }

      if (insightResponse.status === 'fulfilled') {
        setInsights(insightResponse.value.data.insights || demoInsights);
      }
    } catch {
      pushToast('Offline demo mode active. Backend data could not be loaded.', 'info');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const metrics = useMemo(() => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
    const monthlyExpenses = expenses
      .filter((expense) => toMonthKey(expense.date) === toMonthKey(new Date()))
      .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
    const completedTodos = todos.filter((todo) => todo.status === 'DONE').length;
    const income = Math.round(totalExpenses * 1.4);

    return {
      totalExpenses,
      monthlyExpenses,
      income,
      totalTodos: todos.length,
      completedTodos
    };
  }, [expenses, todos]);

  const persistExpense = async (payload, method) => {
    setSyncing(true);
    try {
      if (method === 'create') {
        const response = await createExpense(payload);
        const created = response.data.expense || payload;
        setExpenses((current) => sortByLatest([created, ...current]));
        pushToast('Expense created successfully.', 'success');
      }

      if (method === 'update') {
        const response = await updateExpense(payload);
        const updated = response.data.expense || payload;
        setExpenses((current) => sortByLatest(current.map((expense) => (expense.id === updated.id ? updated : expense))));
        pushToast('Expense updated successfully.', 'success');
      }

      if (method === 'delete') {
        await deleteExpense(payload);
        setExpenses((current) => current.filter((expense) => expense.id !== payload.id));
        pushToast('Expense removed.', 'success');
      }
    } catch {
      if (method === 'create') {
        const fallback = { ...payload, id: crypto.randomUUID(), date: payload.date || new Date().toISOString(), category: { id: payload.categoryId || 'local', name: payload.categoryName || 'Other' } };
        setExpenses((current) => sortByLatest([fallback, ...current]));
      }

      if (method === 'update') {
        setExpenses((current) => sortByLatest(current.map((expense) => (expense.id === payload.id ? { ...expense, ...payload } : expense))));
      }

      if (method === 'delete') {
        setExpenses((current) => current.filter((expense) => expense.id !== payload.id));
      }

      pushToast('Saved locally. Connect Neon and Vercel functions to persist remotely.', 'info');
    } finally {
      setSyncing(false);
    }
  };

  const persistTodo = async (payload, method) => {
    setSyncing(true);
    try {
      if (method === 'create') {
        const response = await createTodo(payload);
        const created = response.data.todo || payload;
        setTodos((current) => sortByLatest([created, ...current], 'dueDate'));
        pushToast('Todo created successfully.', 'success');
      }

      if (method === 'update') {
        const response = await updateTodo(payload);
        const updated = response.data.todo || payload;
        setTodos((current) => sortByLatest(current.map((todo) => (todo.id === updated.id ? updated : todo)), 'dueDate'));
        pushToast('Todo updated successfully.', 'success');
      }

      if (method === 'delete') {
        await deleteTodo(payload);
        setTodos((current) => current.filter((todo) => todo.id !== payload.id));
        pushToast('Todo removed.', 'success');
      }
    } catch {
      if (method === 'create') {
        setTodos((current) => sortByLatest([{ ...payload, id: crypto.randomUUID() }, ...current], 'dueDate'));
      }

      if (method === 'update') {
        setTodos((current) => sortByLatest(current.map((todo) => (todo.id === payload.id ? { ...todo, ...payload } : todo)), 'dueDate'));
      }

      if (method === 'delete') {
        setTodos((current) => current.filter((todo) => todo.id !== payload.id));
      }

      pushToast('Saved locally. Backend unavailable.', 'info');
    } finally {
      setSyncing(false);
    }
  };

  const toggleTodoStatus = (todo) => {
    const nextStatus = todo.status === 'DONE' ? 'TODO' : 'DONE';
    return persistTodo({ ...todo, status: nextStatus }, 'update');
  };

  return (
    <AppContext.Provider
      value={{
        expenses,
        todos,
        insights,
        loading,
        syncing,
        metrics,
        loadData,
        setInsights,
        createExpense: (payload) => persistExpense(payload, 'create'),
        updateExpense: (payload) => persistExpense(payload, 'update'),
        deleteExpense: (payload) => persistExpense(payload, 'delete'),
        createTodo: (payload) => persistTodo(payload, 'create'),
        updateTodo: (payload) => persistTodo(payload, 'update'),
        deleteTodo: (payload) => persistTodo(payload, 'delete'),
        toggleTodoStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};