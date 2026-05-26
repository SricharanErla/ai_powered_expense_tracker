import AppRouter from './routes/AppRouter';
import { AppProvider } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';

export default function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </ToastProvider>
  );
}