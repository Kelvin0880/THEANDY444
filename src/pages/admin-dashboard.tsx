import { Toaster } from 'sonner';
import { DataProvider } from '../contexts/DataContext';
import { AdminDashboard } from '../components/Admin/Dashboard';

export default function AdminDashboardPage() {
  return (
    <DataProvider>
      <AdminDashboard />
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid #00ff7f',
          },
        }}
      />
    </DataProvider>
  );
}
