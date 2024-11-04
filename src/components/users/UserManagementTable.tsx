import { useState } from 'react';
import { User, UserRole } from '../../types/auth';
import { Edit2, Trash2, Lock } from 'lucide-react';
import { useUserStore } from '../../store/users';
import ResetPasswordModal from './ResetPasswordModal';

interface UserManagementTableProps {
  users: User[];
}

const ROLE_COLORS: Record<UserRole, string> = {
  ADMIN: 'bg-purple-100 text-purple-800',
  ENERGY_ADVISOR: 'bg-blue-100 text-blue-800',
  BOOKING_AGENT: 'bg-green-100 text-green-800',
  TECH_TEAM: 'bg-orange-100 text-orange-800',
  TRAINEE: 'bg-yellow-100 text-yellow-800',
};

export default function UserManagementTable({ users }: UserManagementTableProps) {
  const { deleteUser } = useUserStore();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
    }
  };

  const handleResetPassword = (id: string) => {
    setSelectedUser(id);
    setShowResetModal(true);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  ROLE_COLORS[user.role]
                }`}>
                  {user.role.replace(/_/g, ' ')}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleResetPassword(user.id)}
                    className="text-blue-600 hover:text-blue-900"
                    title="Reset Password"
                  >
                    <Lock className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Delete User"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showResetModal && selectedUser && (
        <ResetPasswordModal
          userId={selectedUser}
          onClose={() => {
            setShowResetModal(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}