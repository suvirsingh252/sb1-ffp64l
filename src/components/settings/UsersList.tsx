import { useState } from 'react';
import { UserPlus, Users, Wrench, GraduationCap } from 'lucide-react';
import { useUserStore } from '../../store/users';
import { UserRole } from '../../types/auth';
import AddUserModal from '../users/AddUserModal';
import { cn } from '../../lib/utils';

const ROLE_SECTIONS: { role: UserRole; title: string; icon: any; description: string }[] = [
  { 
    role: 'ENERGY_ADVISOR', 
    title: 'Energy Advisors',
    icon: Users,
    description: 'Team members who conduct energy audits and assessments'
  },
  { 
    role: 'TECH_TEAM', 
    title: 'Tech Team',
    icon: Wrench,
    description: 'Technical specialists who review and approve energy recommendations'
  },
  { 
    role: 'TRAINEE', 
    title: 'Trainees',
    icon: GraduationCap,
    description: 'Energy advisors in training'
  }
];

export default function UsersList() {
  const { users, addUser } = useUserStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleAddClick = (role: UserRole) => {
    setSelectedRole(role);
    setShowAddModal(true);
  };

  const handleAddUser = async (userData: any) => {
    try {
      await addUser({
        ...userData,
        role: selectedRole || 'ENERGY_ADVISOR'
      });
      setShowAddModal(false);
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  return (
    <div className="space-y-8">
      {ROLE_SECTIONS.map(({ role, title, icon: Icon, description }) => {
        const roleUsers = users.filter(user => user.role === role);
        
        return (
          <div key={role} className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className={cn(
                    'p-2 rounded-full mr-4',
                    role === 'ENERGY_ADVISOR' && 'bg-blue-100',
                    role === 'TECH_TEAM' && 'bg-purple-100',
                    role === 'TRAINEE' && 'bg-green-100'
                  )}>
                    <Icon className={cn(
                      'h-6 w-6',
                      role === 'ENERGY_ADVISOR' && 'text-blue-600',
                      role === 'TECH_TEAM' && 'text-purple-600',
                      role === 'TRAINEE' && 'text-green-600'
                    )} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleAddClick(role)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add {title.slice(0, -1)}
                </button>
              </div>
            </div>

            <div className="p-6">
              {roleUsers.length > 0 ? (
                <div className="grid gap-6">
                  {roleUsers.map(user => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50"
                    >
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{user.name}</h4>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                        <button
                          onClick={() => {/* Handle edit */}}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">Edit</span>
                          {/* Add edit icon */}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  No {title.toLowerCase()} added yet
                </div>
              )}
            </div>
          </div>
        );
      })}

      {showAddModal && selectedRole && (
        <AddUserModal
          onClose={() => {
            setShowAddModal(false);
            setSelectedRole(null);
          }}
          onAdd={handleAddUser}
          defaultRole={selectedRole}
        />
      )}
    </div>
  );
}