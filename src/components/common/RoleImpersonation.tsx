import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useUserStore } from '../../store/users';
import { UserRole } from '../../types/auth';
import { cn } from '../../lib/utils';

interface RoleImpersonationProps {
  currentRole: UserRole;
  roleType: UserRole;
  onUserChange: (userId: string) => void;
}

export default function RoleImpersonation({ currentRole, roleType, onUserChange }: RoleImpersonationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { users } = useUserStore();

  // Filter users by the specified role
  const roleUsers = users.filter(user => user.role === roleType);

  if (currentRole !== 'ADMIN') return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-between w-64 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        <span>Viewing as: {roleUsers[0]?.name || 'Select user'}</span>
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-64 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="py-1">
            {roleUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => {
                  onUserChange(user.id);
                  setIsOpen(false);
                }}
                className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
              >
                {user.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}