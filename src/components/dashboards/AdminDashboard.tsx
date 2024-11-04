import { useState } from 'react';
import { Users, UserPlus, Settings } from 'lucide-react';
import UserManagementTable from '../users/UserManagementTable';
import AddUserModal from '../users/AddUserModal';
import { useUserStore } from '../../store/users';
import { cn } from '../../lib/utils';

const TABS = ['Users', 'Settings'] as const;
type Tab = typeof TABS[number];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('Users');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const { users, addUser } = useUserStore();

  const handleAddUser = async (userData: any) => {
    try {
      await addUser(userData);
      // In a real app, this would trigger an email to the user
      console.log('Email would be sent to:', userData.email);
      setShowAddUserModal(false);
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <button
          onClick={() => setShowAddUserModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'py-4 px-6 text-sm font-medium border-b-2',
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                {tab === 'Users' ? (
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Users
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </div>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'Users' && <UserManagementTable users={users} />}
          {activeTab === 'Settings' && (
            <div className="text-center text-gray-500 py-8">
              Settings panel coming soon
            </div>
          )}
        </div>
      </div>

      {showAddUserModal && (
        <AddUserModal
          onClose={() => setShowAddUserModal(false)}
          onAdd={handleAddUser}
        />
      )}
    </div>
  );
}