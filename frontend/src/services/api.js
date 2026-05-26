import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchExpenses = (params) => api.get('/expenses/getAll', { params });
export const createExpense = (payload) => api.post('/expenses/create', payload);
export const updateExpense = (payload) => api.put('/expenses/update', payload);
export const deleteExpense = (payload) => api.delete('/expenses/delete', { data: payload });

export const fetchTodos = (params) => api.get('/todos/getAll', { params });
export const createTodo = (payload) => api.post('/todos/create', payload);
export const updateTodo = (payload) => api.put('/todos/update', payload);
export const deleteTodo = (payload) => api.delete('/todos/delete', { data: payload });

export const fetchInsights = () => api.get('/analytics/insights');

export default api;