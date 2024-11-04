import { useState } from 'react';
import { useAuthStore } from '../../store/auth';
import { LogOut } from 'lucide-react';
import Sidebar from './Sidebar';
import { UserRole } from '../../types/auth';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuthStore();
  const [currentRole, setCurrentRole] = useState<UserRole>(user?.role || 'ENERGY_ADVISOR');

  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentRole={currentRole} onRoleChange={handleRoleChange} />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="h-16 flex items-center justify-between px-6">
            <h1 className="text-xl font-bold text-green-600">Energy Audit Portal</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{user?.name}</span>
              <button
                onClick={logout}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Sign out
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}